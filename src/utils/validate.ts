import { z } from "zod";

export const emailSchema = z.object({
  email: z.string().email(),
});

export const tokenSchema = z.object({
  code: z.string().min(3),
});
