import type {Product} from '@core/product/types'
import * as productRepository from '@repositories/product-repository'
import type {GetProductsByProducer} from './interfaces'

interface GetProductByProducerDependencies {
	getProductsByProducer: GetProductsByProducer
}

export type GetProductByProducerFactory = (
	dependencies: GetProductByProducerDependencies,
) => (producerId: string) => Promise<Product[]>

export const getProductByProducerFactory: GetProductByProducerFactory =
	({getProductsByProducer}) =>
	async (producerId) => {
		return getProductsByProducer({producerId})
	}

export const getProductsByProducer = getProductByProducerFactory({
	getProductsByProducer: productRepository.findProducts,
})
