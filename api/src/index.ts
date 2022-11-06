import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";

import { errorHandler } from "./middleware/errorMiddleware";
import game from "./controllers/gameController";
import users from "./controllers/usersControler";
import { notFoundHandler } from "./middleware/notFoundMiddleware";
import { pool } from "./database";
import { PoolConnection } from "mysql2";
import authenticationMiddleware from "./middleware/authenticationMiddleware";

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(express.json());

pool.getConnection((err, connection: PoolConnection) => {
  if (err) throw err;
  console.log("DB connected successfully");
  connection.release();
});

app.use(authenticationMiddleware);

// routers
app.use("/users", users);
app.use("/game", game);

app.use(errorHandler);
app.use(notFoundHandler);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
