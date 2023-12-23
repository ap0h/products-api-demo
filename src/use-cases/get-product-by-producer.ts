import type { Product } from "@core/product/types"
import type { GetProductByField } from "./interfaces"
import * as  productRepository  from "@repositories/product-repository"

interface GetProductByProducerDependencies {
    getProductByProducer: GetProductByField
}


export type GetProductByProducerFactory = (dependencies: GetProductByProducerDependencies) => (producerId: string) => Promise<Product>

export const getProductByProducerFactory: GetProductByProducerFactory = ({
    getProductByProducer
}) => async (producerId) => {
    const product = await getProductByProducer('producerId', producerId)
    return product
}

export const getProductByProducer = getProductByProducerFactory({
    getProductByProducer: productRepository.getProductByField
})
