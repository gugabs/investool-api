export default class EmailConflictError extends Error {
  constructor(email: string) {
    super();

    this.name = "EmailConflictError";
    this.message = `${email} already is registered`;
  }
}
