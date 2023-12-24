import {createUniqueSlug} from '@core/producer/create-unique-slug'
import {type Producer} from '@core/producer/types'
import {type Product} from '@core/product/types'
import {createProducers} from '@repositories/producer-repository'
import {createProducts} from '@repositories/product-repository'

type ProducerInput = Omit<Producer, '_id'>
type ProductInput = Omit<Product, '_id' | 'producer' | 'producerId'> & {
	producer: ProducerInput
}

export const createProductsWithProducer = async (products: ProductInput[]) => {
	const producersMap = Object.fromEntries(
		products.map(({producer}) => [createUniqueSlug(producer), producer]),
	)
	const uniqueProducers = Object.values(producersMap)

	const producers = await createProducers(uniqueProducers)
	const producersSlugToIdMap = Object.fromEntries(
		producers.map((producer) => [createUniqueSlug(producer), producer._id]),
	)

	const productsWithProducerIds = products.map((product) => ({
		name: product.name,
		vintage: product.vintage,
		producerId: producersSlugToIdMap[createUniqueSlug(product.producer)],
	}))

	return createProducts(productsWithProducerIds)
}
