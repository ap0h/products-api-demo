import { Producer } from "@core/producer/types";
import type { Product } from "@core/product/types";

export type GetProduct = (id: string) => Promise<Product>

export type GetProductsByProducer = (input:{producerId: string}) => Promise<Product[]>

type ProductInput = Omit<Product, '_id' | 'producer' | 'producerId'> & { producer: Omit<Producer, '_id'> };
export type CreateProductsWithProducer =  (products: ProductInput[]) => Promise<Product[]>

export type UpdateProduct = (id: string, updatedProduct: Partial<Omit<Product, '_id'>>) => Promise<Product>

export type DeleteProducts = (ids: string[]) => Promise<number>

export type ImportProductsFromCsv = (urlOfCsvFile: string) => Promise<void>