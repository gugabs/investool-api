import { ApplicationError } from "@interfaces/ErrorTypes";

import httpStatus from "http-status-codes";

export default class IncorrectCredentialsError implements ApplicationError {
  status = httpStatus.UNAUTHORIZED;
  name = "IncorrectCredentialsError";
  message = "Incorrect credentials";
}
