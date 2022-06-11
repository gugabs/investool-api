export default class UnregisteredUserError extends Error {
  constructor() {
    super();

    this.name = "UnregisteredUserError";
    this.message = `Unregistered user`;
  }
}
