
import axios from "axios";
import { CsvProduct } from "@core/product/csv/types";
import { fromCsv } from '@core/product/csv/from-csv'
import { Product } from "@core/product/types";
import {processCsvFromStream, type BatchItem} from "@libs/csv/batch-csv-processor";
import { ProductModel } from "@libs/models";

const upsertBatch = async (item: BatchItem<Product>[]) => {
    const products = item.map((i) => i.data);
    const keys = item.map((i) => i.key);
    await ProductModel.bulkWrite(
        products.map((product, index) => ({
            updateOne: {
                filter: { _id: keys[index] },
                update: product,
                upsert: true,
            },
        }))
    );
};

export const url = 'https://api.frw.co.uk/feeds/all_listings.csv'

export const bulkCreateFromCsv = async (csvUrl: string, batchSize = 100): Promise<void> => {
  try {
    const response = await axios.get(csvUrl, { responseType: 'stream' });

    await processCsvFromStream(response.data, (item: CsvProduct)=> {
        const product = fromCsv(item);
        const key = `${product.vintage}-${product.name}-${product.producer?.name}`;
        return { key, data: product };
    }, upsertBatch, batchSize);

  } catch (error) {
    console.error('Error processing CSV in the background:', error);
  }
};

