import { ProducerModel } from "@libs/models";
import { InternalError } from "@libs/errors";
import type { Producer } from "@core/producer/types";

export type CreateProducers = (producers: Omit<Producer, '_id'>[]) => Promise<Producer[]>;

export const createProducers: CreateProducers = async (producers) => {
    try {
        const createdProducers = await ProducerModel.insertMany(producers, { lean: true })        
        return createdProducers as unknown as Producer[]
    } catch (error: unknown) {
        throw new InternalError((error as Error).message, 'DB_CREATE_PRODUCERS_ERROR');
    }
};
