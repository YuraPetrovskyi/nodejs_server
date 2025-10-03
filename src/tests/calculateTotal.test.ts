import { calculateTotal } from "../services/calculate";

describe("calculateTotal", () => {
  it("sums items with cent rounding", () => {
    const total = calculateTotal([
      { price: 10.0, qty: 2 },
      { price: 5.55, qty: 1 },
    ]);
    expect(total).toBe(10 * 2 + 5.55 * 1);
  });
});
