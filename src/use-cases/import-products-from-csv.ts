import {bulkCreateFromCsv} from '@repositories/product-repository/bulk-create-from-csv'
import type {ImportProductsFromCsv} from './interfaces'

interface ImportProductsFromCsvDependencies {
	processCsvFile: ImportProductsFromCsv
}

export type ImportProductsFromCsvFactory = ({
	processCsvFile,
}: ImportProductsFromCsvDependencies) => (
	urlOfCsvFile: string,
) => Promise<boolean>

export const importProductsFromCsvFactory: ImportProductsFromCsvFactory =
	({processCsvFile}) =>
	async (urlOfCsvFile): Promise<boolean> => {
		void processCsvFile(urlOfCsvFile)
		return true
	}

export const importProductsFromCsv = importProductsFromCsvFactory({
	processCsvFile: bulkCreateFromCsv,
})
