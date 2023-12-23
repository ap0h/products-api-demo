import { Product } from "../types";
import { CsvProduct } from "./types";

export const fromCsv = (data: CsvProduct): Product => ({
    vintage: data.Vintage,
    name: data['Product Name'],
    producer: {
        name: data.Producer,
        country: data.Country
    },
})



