import { fromCsv } from "./from-csv";
import { csvProductData } from "./csv-product-fixtures";

describe("fromCsv", () => {
    it("should convert CsvProduct to Product", () => {
        const expectedProduct = {
            vintage: csvProductData.Vintage,
            name: csvProductData["Product Name"],
            producer: {
                name: csvProductData["Product Name"],
                country: csvProductData.Country,
            },         
        };

        const result = fromCsv(csvProductData);
        
        expect(result).toEqual(expectedProduct);
    });
});
