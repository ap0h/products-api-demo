import type { Product } from "@core/product/types";

export type GetProduct = (id: string) => Promise<Product>