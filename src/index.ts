import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

const app = express();
const PORT = Number(process.env.PORT ?? 3000);

app.set("trust proxy", 1); // if behind a proxy (e.g. Heroku, Bluemix)
app.use(cors());
app.use(express.json());

app.get("/ping", (_req, res) => {
  res.json({ ok: true }); // Test endpoint to check if the server is running);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
