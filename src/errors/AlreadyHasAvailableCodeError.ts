import { ApplicationError } from "@interfaces/ErrorTypes";

import httpStatus from "http-status-codes";

export default class AlreadyHasAvailableCodeError implements ApplicationError {
  status = httpStatus.UNAUTHORIZED;
  name = "AlreadyHasAvailableCodeError";
  message = "You already have an available code to use";
}
