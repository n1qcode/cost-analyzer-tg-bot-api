import { Request, Response, NextFunction } from "express";

const loggerMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const day = currentDate.getDate();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  const monthFixed = `${+month + 1 < 11 ? "0" : ""}${month + 1}`;

  console.log(
    `LOGGER::[${year}.${monthFixed}.${day} ${hours}:${minutes}:${seconds}] --- ${request.method} ${request.path}`
  );
  next();
};

export default loggerMiddleware;
