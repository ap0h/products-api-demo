import { type Product } from "@core/product/types"
import { InternalError, NotFoundError } from "@libs/errors"
import { BaseError } from "@libs/errors/base-error"
import { ProductModel } from "@libs/models"

export type GetProductByField = <T extends keyof Omit<Product, '_id' | 'producer'>>(field: T, value: Product[T]) => Promise<Product>

export const getProductByField: GetProductByField = async (field, value ) => {
    try {
        const product = await ProductModel.findOne({
            [field]: value
        }).lean()

        if(!product) {
            throw new NotFoundError(`Product with ${field}:'${value}' not found`, 'PRODUCT_NOT_FOUND')
        }

        return product
    } catch (error: unknown) {
        if ((error instanceof BaseError)) {
            throw error
        }
        throw new InternalError((error as Error).message, 'DB_GET_PRODUCT_ERROR')
    }
}

