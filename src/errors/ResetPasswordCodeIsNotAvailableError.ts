import { ApplicationError } from "@interfaces/ErrorTypes";

import httpStatus from "http-status-codes";

export default class ResetPasswordCodeIsNotAvailableError implements ApplicationError {
  status = httpStatus.UNPROCESSABLE_ENTITY;
  name = "ResetPasswordCodeIsNotAvailableError";
  message = "Reset password code already was used";
}
