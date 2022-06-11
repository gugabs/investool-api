export function sendErrorResponse(errName: string, errMessage: string) {
  return {
    error: `[${errName}] ${errMessage}`,
  };
}
