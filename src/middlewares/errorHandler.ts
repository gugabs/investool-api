import { NextFunction, Request, Response } from "express";

import { sendErrorResponse } from "@utils/httpResponses";

export default function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.log(err);

  if (err.name === "EmailConflictError")
    return res.status(409).send(sendErrorResponse(err.name, err.message));

  if (err.name === "UnregisteredUserError")
    return res.status(404).send(sendErrorResponse(err.name, err.message));

  if (err.name === "InactiveUserError")
    return res.status(401).send(sendErrorResponse(err.name, err.message));

  if (err.name === "IncorrectCredentialsError")
    return res.status(422).send(sendErrorResponse(err.name, err.message));

  if (err.name === "ActivationCodeNotFoundError")
    return res.status(404).send(sendErrorResponse(err.name, err.message));

  if (err.name === "ResetPasswordCodeNotFoundError")
    return res.status(404).send(sendErrorResponse(err.name, err.message));

  if (err.name === "ResetPasswordCodeIsNotAvailableError")
    return res.status(422).send(sendErrorResponse(err.name, err.message));

  if (err.name === "AlreadyHasAvailableCodeError")
    return res.status(401).send(sendErrorResponse(err.name, err.message));

  return res.sendStatus(500);
}
