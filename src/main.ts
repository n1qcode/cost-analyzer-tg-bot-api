import express, { Express } from "express";
import config from "config";

import userRouter from "../routes/user.routes";
import costRouter from "../routes/cost.routes";

import loggerMiddleware from "./utils/loggerMiddleware";

const PORT = config.get("HOST_PORT");

const app: Express = express();

app.use(loggerMiddleware);
app.use(express.json());
app.use("/api", userRouter);
app.use("/api", costRouter);

app.listen(PORT, () =>
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
);
