import { ApplicationError } from "@interfaces/ErrorTypes";

import httpStatus from "http-status-codes";

export default class InactiveUserError implements ApplicationError {
  status = httpStatus.UNAUTHORIZED;
  name = "InactiveUserError";
  message = "User isn't active";
}
