import type { Product } from "@core/product/types";
import { model, Schema } from "mongoose";

const ProductSchema = new Schema<Product>({
    name: { type: String, required: true },
    vintage: { type: String, required: true },
    producerId: { type: String, required: true, ref: 'Producer' },
}, { timestamps: false,  });


export const ProductModel = model<Product>('Product', ProductSchema);
