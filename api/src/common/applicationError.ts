export default class ApplicationError extends Error {
  statusCode: 500;
  message: "Opps, we messed something up on our side...";
  error: string;

  constructor(error: string) {
    super();
    this.error = error;
  }
}
