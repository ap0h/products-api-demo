import * as productRepository from '@repositories/product-repository'
import {type Product} from '@core/product/types'
import type {GetProduct} from './interfaces'

interface GetProductDependencies {
	getProduct: GetProduct
}

export type GetProductFactory = (
	dependencies: GetProductDependencies,
) => (id: string) => Promise<Product>

export const getProductFactory: GetProductFactory =
	({getProduct}) =>
	async (id) => {
		return getProduct(id)
	}

export const getProduct = getProductFactory({
	getProduct: productRepository.getProduct,
})
