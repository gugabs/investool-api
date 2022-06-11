import bcrypt from "bcrypt";

import prisma from "@config/prismaClient";

import { User } from "@prisma/client";

import { NewUser } from "@interfaces/AuthTypes";

import EmailConflictError from "@errors/EmailConflictError";

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
}
