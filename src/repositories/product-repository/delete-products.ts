import {InternalError} from '@libs/errors'
import {ProductModel} from '@libs/models'

export type DeleteProducts = (productIds: string[]) => Promise<number>

export const deleteProducts: DeleteProducts = async (productIds) => {
	try {
		const {deletedCount} = await ProductModel.deleteMany({
			_id: {$in: productIds},
		})

		return deletedCount
	} catch (error: unknown) {
		throw new InternalError(
			(error as Error).message,
			'DB_DELETE_PRODUCTS_ERROR',
		)
	}
}
