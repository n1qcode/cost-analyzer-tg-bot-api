import express, { Express } from "express";
import config from "config";

import costRouter from "./routes/cost.routes";
import TranslationRouter from "./routes/translation.routes";
import FrequencyRouter from "./routes/frequency.routes";
import MoneyBoxRouter from "./routes/moneyBox.routes";
import PocketMoneyRouter from "./routes/pocketMoney.routes";
import MoneyRotationRouter from "./routes/moneyRotation.routes";
import UsersRouter from "./routes/users.routes";
import loggerMiddleware from "./utils/loggerMiddleware";

const PORT = config.get("HOST_PORT");
const MODE = config.get("MODE");

const app: Express = express();

app.use(loggerMiddleware);
app.use(express.json());
app.use("/api", costRouter);
app.use("/api", TranslationRouter);
app.use("/api", FrequencyRouter);
app.use("/api", MoneyBoxRouter);
app.use("/api", PocketMoneyRouter);
app.use("/api", MoneyRotationRouter);
app.use("/api", UsersRouter);

app.listen(PORT, () =>
  console.log(`⚡️[server]: Server is running at port: ${PORT} in ${MODE} mode`)
);
