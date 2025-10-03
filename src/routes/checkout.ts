import { Router } from "express";
import { checkoutSchema } from "../utils/validate";
import { findProduct, reserveInventory } from "../store/db";
import { calculateTotal } from "../services/calculate";
import crypto from "node:crypto";

const router = Router();

router.post("/", (req, res, next) => {
  try {
    const { items } = checkoutSchema.parse(req.body);

    const priced = items.map((item) => {
      const p = findProduct(item.id);
      if (!p) {
        const e: any = new Error(`Product not found: ${item.id}`);
        e.statusCode = 404;
        throw e;
      }
      if (p.status !== "active") {
        const e: any = new Error(`Inactive product: ${item.id}`);
        e.statusCode = 400;
        throw e;
      }
      return { id: item.id, qty: item.qty, price: p.price, title: p.title };
    });

    const amount = calculateTotal(
      priced.map((p) => ({ price: p.price, qty: p.qty }))
    );

    reserveInventory(items);

    const paymentIntent = {
      id: "pi_" + crypto.randomBytes(6).toString("hex"),
      clientSecret: "secret_" + crypto.randomBytes(8).toString("hex"),
      amount,
      currency: "usd",
      status: "requires_confirmation",
    };

    // Тут буде логіка оформлення замовлення
    res.status(201).json({ paymentIntent, items: priced, amount });
  } catch (err) {
    next(err);
  }
});

export default router;
