import { Request, Response } from "express";

import authService from "@services/AuthService";

import { NewUser } from "@interfaces/AuthTypes";

export default class AuthController {
  public static async signUp(req: Request, res: Response) {
    const { firstName, surname, email, password } = req.body;

    const newUser: NewUser = {
      firstName,
      surname,
      email,
      password,
    };

    const createdUser = await authService.signUp(newUser);

    if (!createdUser) return res.sendStatus(500);

    const createdAt = new Date().toISOString();

    const response = {
      email: createdUser.email,
      createdAt,
    };

    return res.status(200).send(response);
  }
}
