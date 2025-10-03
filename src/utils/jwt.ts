import jwt from "jsonwebtoken";

export function generateToken(payload: object, expiresInSec = 3600): string {
  const secret = process.env.JWT_SECRET || "default_secret_do_not_use_in_prod";
  return jwt.sign(payload, secret, { expiresIn: expiresInSec });
}
