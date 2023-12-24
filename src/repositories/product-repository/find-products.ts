import {type Product} from '@core/product/types'
import {InternalError} from '@libs/errors'
import {ProductModel} from '@libs/models'

export type FindProducts = (
	filter: Partial<Omit<Product, '_id' | 'producer'>>,
) => Promise<Product[]>

export const findProducts: FindProducts = async (filter) => {
	try {
		return await ProductModel.find(filter, null, {lean: true})
	} catch (error: unknown) {
		throw new InternalError((error as Error).message, 'DB_GET_PRODUCT_ERROR')
	}
}
