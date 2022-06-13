export default class AlreadyHasAvailableCodeError extends Error {
  constructor() {
    super();

    this.name = "AlreadyHasAvailableCodeError";
    this.message = "You already have an available code to use";
  }
}
