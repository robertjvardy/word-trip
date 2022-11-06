import { Request, Response, NextFunction } from "express";

export const notFoundHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const message = "You sure about that? Resource not found";

  response.status(404).send(message);
};
