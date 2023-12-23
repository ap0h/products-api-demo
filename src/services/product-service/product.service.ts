import { createUniqueSlug } from "@core/producer/create-unique-slug";
import { Producer } from "@core/producer/types";
import { Product } from "@core/product/types";
import { createProducers } from "@repositories/producer-repository";
import { createProducts } from "@repositories/product-repository";

type ProducerInput = Omit<Producer, '_id'>;
type ProductInput = Omit<Product, '_id' | 'producer' | 'producerId'> & { producer: ProducerInput };

export const createProductsWithProducer = async (products: ProductInput[]) => {
    const producersMap = products.reduce((all, {producer}) => ({...all, [createUniqueSlug(producer)]: producer}), {} as Record<string, ProducerInput>)
    const uniqueProducers = Object.values(producersMap)

    const producersSlugToIdMap = (await createProducers(uniqueProducers)).reduce((all, producer) => ({...all, [createUniqueSlug(producer)]: producer._id}), {} as Record<string, string>)
    
    const productsWithProducerIds = products.map((product) => ({
        name: product.name,
        vintage: product.vintage,        
        producerId: producersSlugToIdMap[createUniqueSlug(product.producer)]
    }));

    return createProducts(productsWithProducerIds)
};
