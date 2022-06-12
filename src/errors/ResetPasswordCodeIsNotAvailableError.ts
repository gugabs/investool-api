export default class ResetPasswordCodeIsNotAvailableError extends Error {
  constructor() {
    super();

    this.name = "ResetPasswordCodeIsNotAvailableError";
    this.message = "Reset password code already was used";
  }
}
