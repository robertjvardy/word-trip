import HttpException from "../common/httpExceptions";
import ApplicationError from "../common/applicationError";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: HttpException | ApplicationError,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const status = error.statusCode || 500;

  console.log(error.message);
  response.status(status).send(error.error);
};
