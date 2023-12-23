import { createUniqueSlug } from "./create-unique-slug"

describe('createUniqueSlug', () => {
    it('should return the name if no country or region is provided', () => {    
        expect(createUniqueSlug({name: 'producer-name'})).toBe('producer-name')
    })
    it('should return the region and name if no country is provided', () => {
        expect(createUniqueSlug({name: 'producer-name', region: 'west'})).toBe('west-producer-name')
    })

    it('should return the country and name if no region is provided', () => {
        expect(createUniqueSlug({name: 'producer-name', country: 'france'})).toBe('france-producer-name')
    })
    it('should return the country, region and name if all are provided', () => {
        expect(createUniqueSlug({name: 'producer-name', country: 'france', region: 'west'})).toBe('france-west-producer-name')
    })
})