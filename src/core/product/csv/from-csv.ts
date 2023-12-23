import { Product } from "../types";
import { CsvProduct } from "./types";

export const fromCsv = (data: CsvProduct): Omit<Product, '_id' | 'producerId'> => ({
    name: data['Product Name'],
    vintage: data.Vintage,
    producer: {
        name: data.Producer,
        country: data.Country,
        region: data.Region,
    } as Product['producer']
})
