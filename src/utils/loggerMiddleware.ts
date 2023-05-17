import { Request, Response, NextFunction } from "express";

const loggerMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log(`LOGGER --- ${request.method} ${request.path}`);
  next();
};

export default loggerMiddleware;
