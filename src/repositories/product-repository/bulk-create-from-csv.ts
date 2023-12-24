import axios from 'axios'
import {type Product} from '@core/product/types'
import {type Producer} from '@core/producer/types'
import {type CsvProduct} from '@core/product/csv/types'
import {fromCsv} from '@core/product/csv/from-csv'
import {createProductsWithProducer} from '@services/product-service'
import {createGroupingKey} from '@core/producer/create-grouping-key'
import {
	type BatchItem,
	processCsvFromStream,
} from '@libs/csv/batch-csv-processor'

const upsertBatch = async (
	items: Array<
		BatchItem<
			Omit<Product, '_id' | 'producerId' | 'producer'> & {
				producer: Omit<Producer, '_id'>
			}
		>
	>,
) => {
	const products = items.map((i) => i.data)
	await createProductsWithProducer(products)
}

export const url = 'https://api.frw.co.uk/feeds/all_listings.csv'

export const bulkCreateFromCsv = async (
	csvUrl: string,
	batchSize = 100,
): Promise<void> => {
	try {
		const response = await axios.get<NodeJS.ReadableStream>(csvUrl, {
			responseType: 'stream',
		})

		await processCsvFromStream<
			CsvProduct,
			Omit<Product, '_id' | 'producerId' | 'producer'> & {
				producer: Omit<Producer, '_id'>
			}
		>(
			response.data,
			(item: CsvProduct) => {
				const product = fromCsv(item)
				const key = createGroupingKey(product)

				return {key, data: product}
			},
			upsertBatch,
			batchSize,
		)
	} catch (error) {
		console.error('Error processing CSV in the background:', error)
	}
}
