export default class InactiveUserError extends Error {
  constructor() {
    super();

    this.name = "InactiveUserError";
    this.message = "User isn't active";
  }
}
