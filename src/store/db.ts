import fs from "node:fs";
import path from "node:path";

export interface Variant {
  id: string;
  title: string;
}
export interface Product {
  id: string;
  title: string;
  status: "active" | "draft";
  price: number;
  inventory: number;
  variants: Variant[];
}

const dbPath = path.join(process.cwd(), "src", "data", "products.json");
// console.log("DB Path:", dbPath);

const pruducts: Product[] = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
// console.log("Loaded products:", pruducts);

let productMap = new Map<string, Product>(
  pruducts.map((p) => [p.id, { ...p }])
);
// console.log("Product map initialized with", productMap);

export function getActiveProducts(): Product[] {
  return [...productMap.values()].filter((p) => p.status === "active");
}
export function findProduct(id: string): Product | undefined {
  const p = productMap.get(id);
  return p ? { ...p } : undefined;
}
