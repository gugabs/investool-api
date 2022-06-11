import { NextFunction, Request, Response } from "express";

import EmailConflictError from "@errors/EmailConflictError";

export default function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err.name === "EmailConflictError") {
    return res.status(409).send({ error: `[${err.name}] ${err.message}` });
  }

  return res.sendStatus(500);
}
