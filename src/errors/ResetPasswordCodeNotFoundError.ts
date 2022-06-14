import { ApplicationError } from "@interfaces/ErrorTypes";

import httpStatus from "http-status-codes";

export default class ResetPasswordCodeNotFoundError implements ApplicationError {
  status = httpStatus.NOT_FOUND;
  name = "ResetPasswordCodeNotFoundError";
  message = "Reset password code doesn't exist";
}
