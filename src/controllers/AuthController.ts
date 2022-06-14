import { NextFunction, Request, Response } from "express";

import { formatInTimeZone } from "date-fns-tz";

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

      const createdAt = formatInTimeZone(new Date(), process.env.TZ!, "yyyy-MM-dd HH:mm:ssXXX");

      const response = {
        email: createdUser.email,
        createdAt,
      };

      return res.status(201).send(response);
    } catch (err) {
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
      next(err);
    }
  }

  public static async activateAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const { code } = req.params;

      const activatedUser = await authService.activateAccount(code);

      const activatedAt = formatInTimeZone(new Date(), process.env.TZ!, "yyyy-MM-dd HH:mm:ssXXX");

      const response = {
        email: activatedUser.email,
        activatedAt,
      };

      return res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  }

  public static async requestPasswordReset(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;

      await authService.requestPasswordReset(email);

      return res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }

  public static async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { code } = req.params;
      const { newPassword } = req.body;

      await authService.resetPassword(code, newPassword);

      return res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }
}
