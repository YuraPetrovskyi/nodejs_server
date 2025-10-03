import express from "express";
import cors from "cors";

import catalogRouter from "./routes/catalog";
import { basicLimiter } from "./middleware/rateLimiter";
import { httpLogger, requestID } from "./middleware/logging";

export const app = express();

app.set("trust proxy", 1); // if behind a proxy (e.g. Heroku, Bluemix)
app.use(cors());
app.use(express.json());
app.use(basicLimiter);
app.use(requestID);
app.use(httpLogger);

app.get("/ping", (_req, res) => {
  res.json({ ok: true }); // Test endpoint to check if the server is running);
});

app.use("/catalog", catalogRouter);
