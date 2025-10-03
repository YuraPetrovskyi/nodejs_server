import { Router } from "express";
import { emailSchema, tokenSchema } from "../utils/validate";
import crypto from "node:crypto";
import { generateToken } from "../utils/jwt";

const router = Router();
const codeStore = new Map<string, string>();

router.post("/login", (req, res, next) => {
  try {
    const { email } = emailSchema.parse(req.body);
    const code = "auth_" + crypto.randomBytes(4).toString("hex");
    codeStore.set(code, email);
    console.log(`Login code for ${code}: ${email}`);
    res.json({ code });
  } catch (err) {
    next(err);
  }
});

router.post("/token", (req, res, next) => {
  try {
    const { code } = tokenSchema.parse(req.body);
    const email = codeStore.get(code);
    if (!email) {
      return res.status(400).json({ error: "Invalid authorization code" });
    }
    codeStore.delete(code);
    const expiresIn = 60 * 60 * 24 * 7; // 7 days
    const accessToken = generateToken({ sub: email }, expiresIn);

    res.json({ accessToken, tokenType: "Bearer", expiresIn });
  } catch (err) {
    next(err);
  }
});

export default router;
