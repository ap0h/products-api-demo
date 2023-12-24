import * as csv from 'fast-csv'

const DEFAULT_BATCH_SIZE = 100

export interface BatchItem<ProccessedItem> {
	key: string
	data: ProccessedItem
}

export const processCsvFromStream = async <
	RawItem = unknown,
	ProccessedItem = any,
>(
	stream: NodeJS.ReadableStream,
	processItem: (item: RawItem) => BatchItem<ProccessedItem>,
	processBatch: (batch: Array<BatchItem<ProccessedItem>>) => Promise<void>,
	batchSize = DEFAULT_BATCH_SIZE,
): Promise<void> => {
	return new Promise((resolve, reject) => {
		let batch: Array<BatchItem<ProccessedItem>> = []
		let batchCount = 0
		let duplicates = 0
		let uniqueCount = 0

		csv
			.parseStream(stream, {headers: true})
			.on('data', (data: any) => {
				const {key, data: item} = processItem(data as RawItem)

				const existingIndex = batch.findIndex((item) => item.key === key)
				const doesExistsInCurrentBatch = existingIndex !== -1

				if (doesExistsInCurrentBatch) {
					batch[existingIndex].data = item
					duplicates++
				} else {
					batch.push({key, data: item})
					uniqueCount++
				}

				const isBatchFull = batch.length % batchSize === 0

				if (isBatchFull) {
					void processBatch(batch)
					batchCount++
					batch = []
				}
			})
			.on('end', (rowCount: number) => {
				if (batch.length > 0) {
					batchCount++
					void processBatch(batch)
					console.log('Processing completed.')
					console.log('Total rows read:', rowCount)
					console.log(
						`Successfully upserted ${
							batchSize * (batchCount - 1) + batch.length
						} products. \n There were ${duplicates} duplicates.`,
					)
					console.log(
						`duplicates + upserted = ${
							duplicates + batchSize * (batchCount - 1) + batch.length
						}`,
					)
				}

				resolve()
			})
			.on('error', (error) => {
				console.error('CSV processing error:', error)
				reject(error)
			})
	})
}
