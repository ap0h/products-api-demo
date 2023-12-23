import type { Product } from "@core/product/types";
import { InternalError } from "@libs/errors";
import { ProductModel } from "@libs/models";

export type CreateProducts = (products: Omit<Product, '_id'>[]) => Promise<Product[]>;

export const createProducts: CreateProducts = async (products) => {
    try {        
        const createdProducts = await ProductModel.insertMany(products, {lean: true })                        
        // Force to unknown and then to Product[] to avoid type error regarding _id ObjectId
        // We could map the result to a Product[] but it would be a waste of resources (time and memory)
        return createdProducts as unknown as Product[]
    } catch (error: unknown) {
        throw new InternalError((error as Error).message, 'DB_CREATE_PRODUCTS_ERROR');
    }
};
