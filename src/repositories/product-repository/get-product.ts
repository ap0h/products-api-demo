import {type Product} from '@core/product/types'
import {InternalError, NotFoundError} from '@libs/errors'
import {BaseError} from '@libs/errors/base-error'
import {ProductModel} from '@libs/models'

export type GetProduct = (id: string) => Promise<Product>

export const getProduct: GetProduct = async (id) => {
	try {
		const product = await ProductModel.findById(id).lean()

		if (!product) {
			throw new NotFoundError(
				`Product with id '${id.toString()}' not found`,
				'PRODUCT_NOT_FOUND',
			)
		}

		return product
	} catch (error: unknown) {
		if (error instanceof BaseError) {
			throw error
		}

		throw new InternalError((error as Error).message, 'DB_GET_PRODUCT_ERROR')
	}
}
