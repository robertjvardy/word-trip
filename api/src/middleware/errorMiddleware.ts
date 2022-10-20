import HttpException from "../common/httpExceptions";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const status = error.statusCode || error.status || 500;

  console.log(error.message);
  response.status(status).send(error);
};
