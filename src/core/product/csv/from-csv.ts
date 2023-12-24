import {type Producer} from '@core/producer/types'
import {type Product} from '../types'
import {type CsvProduct} from './types'

type FromCsv = (data: CsvProduct) => Omit<
	Product,
	'producer' | 'producerId' | '_id'
> & {
	producer: Omit<Producer, '_id'>
}

export const fromCsv: FromCsv = (data) => ({
	name: data['Product Name'],
	vintage: data.Vintage,
	producer: {
		name: data.Producer,
		country: data.Country,
		region: data.Region,
	},
})
