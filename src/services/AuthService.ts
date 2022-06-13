import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { add } from "date-fns";
import { v4 as uuid } from "uuid";

import prisma from "@config/prismaClient";
import redis from "@config/redisClient";

import { User } from "@prisma/client";

import { NewUser, UserCredentials } from "@interfaces/AuthTypes";

import EmailConflictError from "@errors/EmailConflictError";
import UnregisteredUserError from "@errors/UnregisteredUserError";
import InactiveUserError from "@errors/InactiveUserError";
import IncorrectCredentialsError from "@errors/IncorrectCredentialsError";
import ActivationCodeNotFoundError from "@errors/ActivationCodeNotFoundError";
import ResetPasswordCodeNotFoundError from "@errors/ResetPasswordCodeNotFoundError";
import ResetPasswordCodeIsNotAvailableError from "@errors/ResetPasswordCodeIsNotAvailableError";
import AlreadyHasAvailableCodeError from "@errors/AlreadyHasAvailableCodeError";

import { sendActivationCode, sendResetPasswordSteps } from "@utils/emails";

export default class AuthService {
  public static async signUp(newUser: NewUser): Promise<User> {
    const { email, password } = newUser;

    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userAlreadyExists) throw new EmailConflictError(email);

    const passwordHash = bcrypt.hashSync(password, 10);

    const activationCode = uuid();

    const user = await prisma.user.create({
      data: {
        ...newUser,
        password: passwordHash,
        activationCodes: {
          create: [{ code: activationCode }],
        },
      },
    });

    await sendActivationCode(user.email, activationCode);

    return user;
  }

  public static async signIn(userCredentials: UserCredentials): Promise<string> {
    const { email, password } = userCredentials;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) throw new UnregisteredUserError();
    if (!user.isActive) throw new InactiveUserError();

    const correctPassword = bcrypt.compareSync(password, user.password);

    if (!correctPassword) throw new IncorrectCredentialsError();

    const tokenPayload = {};
    const tokenSecret = process.env.JWT_SECRET!;
    const tokenOptions = { expiresIn: "3h" };

    const sessionToken = jwt.sign(tokenPayload, tokenSecret, tokenOptions);

    const sessionOwner = {
      id: user.id,
      name: user.firstName,
      email: user.email,
    };

    await redis.set(`session-${sessionToken}`, JSON.stringify(sessionOwner));

    return sessionToken;
  }

  public static async activateAccount(code: string): Promise<User> {
    const activationCode = await prisma.activationCode.findFirst({
      where: { code },
      include: { user: true },
    });

    if (!activationCode) throw new ActivationCodeNotFoundError();

    await prisma.user.update({
      where: { id: activationCode.userId },
      data: {
        isActive: true,
      },
    });

    return activationCode.user;
  }

  public static async requestPasswordReset(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        ResetPasswordCodes: true,
      },
    });

    if (!user) throw new UnregisteredUserError();

    const alreadyHasAvailableCode = user.ResetPasswordCodes.some((code) => code.isAvailable);

    if (alreadyHasAvailableCode) throw new AlreadyHasAvailableCodeError();

    const resetPasswordCode = uuid();
    const expireAt = add(new Date(), { minutes: 30 });

    await prisma.resetPasswordCode.create({
      data: {
        code: resetPasswordCode,
        expireAt,
        userId: user.id,
      },
    });

    await sendResetPasswordSteps(email);
  }

  public static async resetPassword(code: string, newPassword: string) {
    const resetPasswordCode = await prisma.resetPasswordCode.findUnique({
      where: { code },
    });

    if (!resetPasswordCode) throw new ResetPasswordCodeNotFoundError();
    if (!resetPasswordCode.isAvailable) throw new ResetPasswordCodeIsNotAvailableError();

    const passwordHash = bcrypt.hashSync(newPassword, 10);

    await prisma.resetPasswordCode.update({
      where: { code },
      data: {
        isAvailable: false,
        user: {
          update: {
            password: passwordHash,
          },
        },
      },
    });
  }
}
