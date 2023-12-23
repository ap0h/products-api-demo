import type { Product } from "@core/product/types";

export type GetProduct = (id: string) => Promise<Product>

export type GetProductByField = <T extends keyof Omit<Product, 'producer' | '_id'>>(field: T, value: Product[T]) => Promise<Product>

export type CreateProducts = (products: Omit<Product, '_id'>[]) => Promise<string[]>

export type UpdateProduct = (id: string, updatedProduct: Partial<Omit<Product, '_id'>>) => Promise<Product>

export type DeleteProducts = (ids: string[]) => Promise<number>

export type ImportProductsFromCsv = (urlOfCsvFile: string) => Promise<void>