export default class ActivationCodeNotFoundError extends Error {
  constructor() {
    super();

    this.name = "ActivationCodeNotFoundError";
    this.message = "Activation code doesn't exist";
  }
}
