import {type Product} from '@core/product/types'
import {InternalError, NotFoundError} from '@libs/errors'
import {BaseError} from '@libs/errors/base-error'
import {ProducerModel} from '@libs/models'

export type GetProducer = (id: string) => Promise<Product>

export const getProducer: GetProducer = async (id) => {
	try {
		const producer = await ProducerModel.findById(id)

		if (!producer) {
			throw new NotFoundError(
				`Producer with id '${id.toString()}' not found`,
				'PRODUCER_NOT_FOUND',
			)
		}

		return await producer.toObject()
	} catch (error: unknown) {
		if (error instanceof BaseError) {
			throw error
		}

		throw new InternalError((error as Error).message, 'DB_GET_PRODUCER_ERROR')
	}
}
