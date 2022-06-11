import { NextFunction, Request, Response } from "express";

import { sendErrorResponse } from "@/utils/messages";

export default function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err.name === "EmailConflictError")
    return res.status(409).send(sendErrorResponse(err.name, err.message));

  if (err.name === "UnregisteredUserError")
    return res.status(404).send(sendErrorResponse(err.name, err.message));

  if (err.name === "IncorrectCredentialsError")
    return res.status(422).send(sendErrorResponse(err.name, err.message));

  return res.sendStatus(500);
}
