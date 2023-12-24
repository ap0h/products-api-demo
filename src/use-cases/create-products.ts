import {type Product} from '@core/product/types'
import {type Producer} from '@core/producer/types'
import {createProductsWithProducer} from '@services/product-service'
import {type CreateProductsWithProducer} from './interfaces'

interface CreateProductsDependencies {
	createProductsWithProducer: CreateProductsWithProducer
}

type ProductInput = Omit<Product, '_id' | 'producer' | 'producerId'> & {
	producer: Omit<Producer, '_id'>
}

export type CreateProductsFactory = (
	dependencies: CreateProductsDependencies,
) => (products: ProductInput[]) => Promise<Product[]>

export const createProductsFactory: CreateProductsFactory =
	({createProductsWithProducer}) =>
	async (products) => {
		return createProductsWithProducer(products)
	}

export const createProducts = createProductsFactory({
	createProductsWithProducer,
})
