import { NextFunction, Request, Response } from "express";

import httpStatus from "http-status-codes";

import { ApplicationError } from "@interfaces/ErrorTypes";

import { sendErrorResponse } from "@utils/httpResponses";

export default function errorHandler(
  err: ApplicationError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.log(err);

  if (err.status === httpStatus.UNAUTHORIZED) {
    return res.status(err.status).send(sendErrorResponse(err.name, err.message));
  }

  if (err.status === httpStatus.NOT_FOUND) {
    return res.status(err.status).send(sendErrorResponse(err.name, err.message));
  }

  if (err.status === httpStatus.CONFLICT) {
    return res.status(err.status).send(sendErrorResponse(err.name, err.message));
  }

  if (err.status === httpStatus.UNPROCESSABLE_ENTITY) {
    return res.status(err.status).send(sendErrorResponse(err.name, err.message));
  }

  return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
}
