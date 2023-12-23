import type { Product } from "@core/product/types";
import { InternalError, NotFoundError } from "@libs/errors";
import { BaseError } from "@libs/errors/base-error";
import { ProductModel } from "@libs/models";

export type UpdateProduct = (id: string, updatedProduct: Partial<Omit<Product, '_id'>>) => Promise<Product>;

export const updateProduct: UpdateProduct = async (id, updatedProduct) => {
    try {
        const product = await ProductModel.findByIdAndUpdate(id, updatedProduct, {lean: true, populate: 'producer'});
        if (!product) {
            throw new NotFoundError(`Product with id ${id} not found`, 'PRODUCT_NOT_FOUND_DURING_UPDATE');
        }
        
        return product;
    } catch (error: unknown) {
        if(error instanceof BaseError) {
            throw error;
        }

        throw new InternalError((error as Error).message, 'DB_UPDATE_PRODUCT_ERROR');
    }
};
