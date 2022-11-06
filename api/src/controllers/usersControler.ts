import { Router } from "express";
import bcrypt from "bcrypt";

import { makeDbQuery } from "../database";
import HttpException from "../common/httpExceptions";
import ApplicationError from "../common/applicationError";
import generateAccessToken from "../utils/generateAccessToken";

const router = Router();

const userSearch = "SELECT * FROM  users WHERE username = ?";
const userInsert = "INSERT INTO users VALUES (0,?,?,?,?)";

const invalidCredsError = new HttpException(401, "Invalid credentials!");

type UserCreationType = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
};

type UserAuthenticationType = {
  username: string;
  password: string;
};

router.post(
  "/createUser",
  async (req: { body: UserCreationType }, res, next) => {
    const username = req.body.username;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    await makeDbQuery({
      sql: userSearch,
      params: username,
      onSuccess: async (rows) => {
        if (rows.length != 0) {
          const error = new HttpException(
            409,
            "User already exists with username: " + username
          );
          next(error);
        } else {
          await makeDbQuery({
            sql: userInsert,
            params: [username, hashedPassword, firstName, lastName],
            onSuccess: () => {
              res.sendStatus(201);
            },
          });
        }
      },
    });
  }
);

router.post(
  "/login",
  async (req: { body: UserAuthenticationType }, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    await makeDbQuery({
      sql: userSearch,
      params: username,
      onSuccess: async (rows) => {
        switch (true) {
          case rows.length == 0: {
            next(invalidCredsError);
          }
          case rows.length > 1: {
            next(
              new ApplicationError(
                "Unique username policy violated for username: " +
                  rows[0].username
              )
            );
          }
          default: {
            const hashedPassword = rows[0].password;
            if (await bcrypt.compare(password, hashedPassword)) {
              const token = generateAccessToken(username);
              res.json({ accessToken: token });
            } else {
              next(invalidCredsError);
            }
            break;
          }
        }
      },
    });
  }
);

export default router;
