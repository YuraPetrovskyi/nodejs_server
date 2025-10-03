import { z } from "zod";

export const emailSchema = z.object({
  email: z.string().email(),
});

export const tokenSchema = z.object({
  code: z.string().min(3),
});

export const checkoutSchema = z.object({
  items: z
    .array(
      z.object({
        id: z.string().min(1),
        qty: z.number().int().positive(),
      })
    )
    .min(1),
});

export type CheckoutRequest = z.infer<typeof checkoutSchema>;
