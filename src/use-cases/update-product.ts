import type { Product } from "@core/product/types";
import * as productRepository from '@repositories/product-repository'
import type { UpdateProduct } from "./interfaces";
interface UpdateProductDependencies {
    updateProduct: UpdateProduct;
}
interface UpdateProductInput {
    id: string;
    updateBody: Partial<Omit<Product, '_id'>>;
}
export type UpdateProductFactory = (dependencies: UpdateProductDependencies) => (input: UpdateProductInput) => Promise<Product>;

export const updateProductFactory:UpdateProductFactory = ({updateProduct}) => async ({id, updateBody}) => {
    const updatedProduct = await updateProduct(id, updateBody)
    console.log(updatedProduct, '🚀 - updated')
    return updatedProduct
}

export const updateProduct = updateProductFactory({
    updateProduct: productRepository.updateProduct
})
