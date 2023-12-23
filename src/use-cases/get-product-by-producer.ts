import type { Product } from "@core/product/types"
import type { GetProductByField } from "./interfaces"
import * as  productRepository  from "@repositories/product-repository"

interface GetProductByProducerDependencies {
    getProductByField: GetProductByField
}


export type GetProductByProducerFactory = (dependencies: GetProductByProducerDependencies) => (producerId: string) => Promise<Product>

export const getProductByProducerFactory: GetProductByProducerFactory = ({
    getProductByField
}) => async (producerId) => {
    const product = await getProductByField('producerId', producerId)
    return product
}

export const getProductByProducer = getProductByProducerFactory({
    getProductByField: productRepository.getProductByField
})
