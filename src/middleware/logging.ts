import morgan from "morgan";
import { RequestHandler } from "express";
import { randomUUID } from "crypto";

export const requestID: RequestHandler = (req, _res, next) => {
  if (!req.headers["x-request-id"]) {
    req.headers["x-request-id"] = randomUUID();
  }
  next();
};

export const httpLogger = morgan(
  ":method :url :status :response-time ms [rid=:req[x-request-id]]"
);
