import type { ErrorRequestHandler, RequestHandler } from "express";

export const notFoundHandler: RequestHandler = (_req, res, _next) => {
  res.status(404).json({ error: "Not Found" });
};

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  const status = (err as any).statusCode ?? 500;

  const rid = req.headers["x-request-id"];
  console.error(`[rid=${rid}]`, status, err?.message);

  res.status(status).json({ error: err?.message ?? "Internal Server Error" });
};
