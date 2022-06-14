import { ApplicationError } from "@interfaces/ErrorTypes";

import httpStatus from "http-status-codes";

export default class ActivationCodeNotFoundError implements ApplicationError {
  status = httpStatus.NOT_FOUND;
  name = "ActivationCodeNotFoundError";
  message = "Activation code doesn't exist";
}
