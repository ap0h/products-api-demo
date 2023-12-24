import * as productRepository from "@repositories/product-repository";
import type { GetProduct } from "./interfaces";
import { Product } from "@core/product/types";

interface GetProductDependencies {
    getProduct: GetProduct
}

export type GetProductFactory = (dependencies: GetProductDependencies) => (id: string) => Promise<Product>

export const getProductFactory: GetProductFactory = ({getProduct}) => async (id) => {
    return getProduct(id)
}


export const getProduct = getProductFactory({
    getProduct: productRepository.getProduct
})
