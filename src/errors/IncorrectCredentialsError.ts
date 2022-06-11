export default class IncorrectCredentialsError extends Error {
  constructor() {
    super();

    this.name = "IncorrectCredentialsError";
    this.message = `Incorrect credentials`;
  }
}
