import type {Producer} from '@core/producer/types'
import {model, Schema} from 'mongoose'

const ProducerSchema = new Schema<Producer>(
	{
		name: {type: String, required: true},
		country: {type: String},
		region: {type: String},
	},
	{timestamps: false},
)

export const ProducerModel = model<Producer>('Producer', ProducerSchema)
