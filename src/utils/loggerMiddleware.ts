import { Request, Response, NextFunction } from "express";

const _fix = (value: number) => {
  return String(value).padStart(2, "0");
};

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

  console.log(
    `LOGGER::[${year}.${_fix(month + 1)}.${_fix(day)} ${_fix(hours)}:${_fix(
      minutes
    )}:${_fix(seconds)}]::["user-agent": ${request.headers["user-agent"]}]::[${
      request.method
    }: ${request.path}]`
  );
  next();
};

export default loggerMiddleware;
