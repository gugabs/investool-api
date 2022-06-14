import { ApplicationError } from "@interfaces/ErrorTypes";

import httpStatus from "http-status-codes";

export default class UnregisteredUserError implements ApplicationError {
  status = httpStatus.NOT_FOUND;
  name = "UnregisteredUserError";
  message = "Unregistered user";
}
