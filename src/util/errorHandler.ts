import { IS_DEV } from "@src/contants";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import logger from "./logger";
import createResponse from "./response";

const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logger.err(err);
  res.status(500).send(
    createResponse({
      msg: "There was some error",
      status: false,
      err: IS_DEV
        ? {
            msg: err.message,
            stack: err.stack,
          }
        : null,
    })
  );
};

export default errorHandler;
