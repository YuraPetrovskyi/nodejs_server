import requst from "supertest";
import { app } from "../app";

describe("GET /catalog", () => {
  it("returns active products with pagination and transformation", async () => {
    const res = await requst(app).get("/catalog?page=1&limit=10");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("items");
    expect(res.body).toHaveProperty("page", 1);
    expect(res.body).toHaveProperty("limit", 10);
    expect(res.body).toHaveProperty("total");
    expect(res.body.items[0]).toHaveProperty("isAvailable");
    expect(res.body.items.every((p: any) => p.status === "active")).toBe(true);
  });
});
