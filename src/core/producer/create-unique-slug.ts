import type { Producer } from "./types";

export const createUniqueSlug = (producer: Omit<Producer, '_id'>) => {
    const {country, region, name} = producer

    if (!country && !region) { 
        return name
    }

    if (!country) {
        return `${region}-${name}`
    }

    if (!region) {
        return `${country}-${name}`
    }

    return  `${country}-${region}-${name}`
}
