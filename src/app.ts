import express from "express";
import cors from "cors";

import catalogRouter from "./routes/catalog";

export const app = express();

app.set("trust proxy", 1); // if behind a proxy (e.g. Heroku, Bluemix)
app.use(cors());
app.use(express.json());

app.get("/ping", (_req, res) => {
  res.json({ ok: true }); // Test endpoint to check if the server is running);
});

app.use("/catalog", catalogRouter);
