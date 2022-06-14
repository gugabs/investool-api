import { ApplicationError } from "@interfaces/ErrorTypes";

import httpStatus from "http-status-codes";

export default class EmailConflictError implements ApplicationError {
  status = httpStatus.CONFLICT;
  name = "EmailConflictError";
  message = `User already is registered`;
}
