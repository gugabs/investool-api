import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import prisma from "@config/prismaClient";
import redis from "@config/redisClient";

import { User } from "@prisma/client";

import { NewUser, UserCredentials } from "@interfaces/AuthTypes";

import EmailConflictError from "@errors/EmailConflictError";
import UnregisteredUserError from "@errors/UnregisteredUserError";
import IncorrectCredentialsError from "@errors/IncorrectCredentialsError";

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

    const user = await prisma.user.create({
      data: { ...newUser, password: passwordHash },
    });

    return user;
  }

  public static async signIn(userCredentials: UserCredentials): Promise<string> {
    const { email, password } = userCredentials;

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (!userExists) throw new UnregisteredUserError();

    const correctPassword = bcrypt.compareSync(password, userExists.password);

    if (!correctPassword) throw new IncorrectCredentialsError();

    const tokenPayload = {};
    const tokenSecret = process.env.JWT_SECRET!;
    const tokenOptions = { expiresIn: "3h" };

    const sessionToken = jwt.sign(tokenPayload, tokenSecret, tokenOptions);

    const sessionOwner = {
      id: userExists.id,
      name: userExists.firstName,
      email: userExists.email,
    };

    await redis.set(`session-${sessionToken}`, JSON.stringify(sessionOwner));

    return sessionToken;
  }
}
