export function calculateTotal(
  items: { price: number; qty: number }[]
): number {
  const cents = items.reduce(
    (sum, item) => sum + Math.round(item.price * 100) * item.qty,
    0
  );
  return cents / 100;
}
