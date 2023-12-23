
import type { DeleteProducts } from "./interfaces"
import * as productRepository from "@repositories/product-repository"

interface DeleteProductsDependencies {
    deleteProducts: DeleteProducts
}

export type DeleteProductsFactory = (dependencies: DeleteProductsDependencies) => (ids: string[]) => Promise<{deletedCount: number}>

export const deleteProductsFactory: DeleteProductsFactory = ({deleteProducts}) => async (ids) => {
    const deletedCount = await deleteProducts(ids)
    return {deletedCount}
}

export const deleteProducts = deleteProductsFactory({
    deleteProducts: productRepository.deleteProducts
})
