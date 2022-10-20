import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import { errorHandler } from "./middleware/errorMiddleware";

import game from "./routes/game";
import { notFoundHandler } from "./middleware/notFoundMiddleware";
import HttpException from "./common/httpExceptions";

dotenv.config();
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const port = process.env.PORT;

app.use("/game", game);

// example of how to throw an error
app.get("/error", (req, res, next) => {
  const error = new HttpException(501, "error123");
  next(error);
});

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
