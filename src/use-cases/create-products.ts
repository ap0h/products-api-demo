import { Product } from "@core/product/types"
import type { CreateProducts } from "./interfaces"
import * as productRepository from "@repositories/product-repository"

interface CreateProductsDependencies {
    createProducts: CreateProducts
}

export type CreateProductsFactory = 
    (dependencies:CreateProductsDependencies ) => 
    (products: Omit<Product, '_id'>[]) => Promise<string[]>

export const createProductsFactory: CreateProductsFactory = ({createProducts}) => async (products) => {
    return createProducts(products)
}

export const createProducts = createProductsFactory({
    createProducts: productRepository.createProducts
})
