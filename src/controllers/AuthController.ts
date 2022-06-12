import { NextFunction, Request, Response } from "express";

import authService from "@services/AuthService";

import { NewUser, UserCredentials } from "@interfaces/AuthTypes";

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

      return res.status(201).send(response);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  public static async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const userCredentials: UserCredentials = {
        email,
        password,
      };

      const sessionToken = await authService.signIn(userCredentials);

      const response = {
        token: sessionToken,
      };

      return res.status(200).send(response);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  public static async activateAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const { code } = req.body;

      const activatedUser = await authService.activateAccount(code);

      const activatedAt = new Date().toISOString();

      const response = {
        email: activatedUser.email,
        activatedAt,
      };

      return res.status(200).send(response);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}
