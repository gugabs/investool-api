export default class ResetPasswordCodeNotFoundError extends Error {
  constructor() {
    super();

    this.name = "ResetPasswordCodeNotFoundError";
    this.message = "Reset password code doesn't exist";
  }
}
