import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import HttpException from "../common/httpExceptions";

const invalidAuthException = new HttpException(
  403,
  "Missing or expired autherntication token."
);

const authenticationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.path === "/users/login") {
    next();
  } else {
    try {
      const token = req.headers.authorization;
      if (token == null) {
        next(invalidAuthException);
      }
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
          next(invalidAuthException);
        } else {
          next();
        }
      });
    } catch (error: any) {}
  }
};

export default authenticationMiddleware;
