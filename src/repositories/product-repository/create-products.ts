import type { Product } from "@core/product/types";
import { InternalError } from "@libs/errors";
import { ProductModel } from "@libs/models";

export type CreateProducts = (products: Omit<Product, '_id'>[]) => Promise<string[]>;

export const createProducts: CreateProducts = async (products) => {
    try {        
        const createdProducts = await ProductModel.insertMany(products, {lean: true})       
                 
        return createdProducts.map((product) => product._id.toString());
    } catch (error: unknown) {
        throw new InternalError((error as Error).message, 'DB_CREATE_PRODUCTS_ERROR');
    }
};
