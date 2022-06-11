import bcrypt from "bcrypt";

import prisma from "@config/prismaClient";

import { User } from "@prisma/client";

import { NewUser } from "@interfaces/AuthTypes";

export default class AuthService {
  public static async signUp(newUser: NewUser): Promise<User | null> {
    const { email, password } = newUser;

    try {
      const userAlreadyExists = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (userAlreadyExists) return null;

      const passwordHash = bcrypt.hashSync(password, 10);

      const user = await prisma.user.create({
        data: { ...newUser, password: passwordHash },
      });

      return user;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
