export default class HttpException extends Error {
  statusCode?: number;
  message: string;
  error: string | null;

  constructor(statusCode: number, error: string, message?: string | null) {
    super(message);

    this.statusCode = statusCode;
    this.error = error;
    this.message = message || error;
  }
}
