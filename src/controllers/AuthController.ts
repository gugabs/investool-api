import { NextFunction, Request, Response } from "express";

import authService from "@services/AuthService";

import { NewUser } from "@interfaces/AuthTypes";

export default class AuthController {
  public static async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const { firstName, surname, email, password } = req.body;

      const newUser: NewUser = {
        firstName,
        surname,
        email,
        password,
      };

      const createdUser = await authService.signUp(newUser);

      const createdAt = new Date().toISOString();

      const response = {
        email: createdUser.email,
        createdAt,
      };

      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  }
}
