import type { Producer } from '@core/producer/types';
import { model, Schema } from 'mongoose';

const ProducerSchema = new Schema<Producer>({
    name: { type: String, required: true },
    country: { type: String, required: true },
}, { timestamps: false, });

export const ProducerModel = model<Producer>('Producer', ProducerSchema);
