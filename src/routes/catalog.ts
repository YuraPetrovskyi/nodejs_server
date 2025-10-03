import { Router } from "express";

import { getActiveProducts } from "../store/db";

const router = Router();

router.get("/", (_req, res) => {
  const products = getActiveProducts();
  res.json(products);
});

export default router;
