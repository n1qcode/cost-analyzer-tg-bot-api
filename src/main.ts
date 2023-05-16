import express, { Express } from "express";
import config from "config";

import costRouter from "../routes/cost.routes";

const PORT = config.get("HOST_PORT");

const app: Express = express();

app.use("/api", costRouter);

app.listen(PORT, () =>
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
);
