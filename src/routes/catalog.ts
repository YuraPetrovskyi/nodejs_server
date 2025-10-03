import { Router } from "express";

import { getActiveProducts } from "../store/db";

const router = Router();

router.get("/", (req, res) => {
  // GET /catalog?page=1&limit=10

  const page = Math.max(1, Number(req.query.page ?? 1));
  const limit = Math.max(1, Math.min(100, Number(req.query.limit ?? 10)));
  const all = getActiveProducts();

  const start = (page - 1) * limit;

  const items = all.slice(start, start + limit).map((p) => ({
    ...p,
    isAvailable: p.inventory > 0,
  }));

  res.json({ items, page, limit, total: all.length });
});

export default router;

// Міні-приклад
// Нехай all = [A,B,C,D,E,F], limit=2:
// page=1 → start=(1-1)*2=0 → slice(0,2) → [A,B]
// page=2 → start=2 → slice(2,4) → [C,D]
// page=3 → start=4 → slice(4,6) → [E,F]
// page=4 → start=6 → slice(6,8) → [] (порожньо)
