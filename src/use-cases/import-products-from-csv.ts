import { bulkCreateFromCsv } from "@repositories/product-repository/bulk-create-from-csv";
import type { ImportProductsFromCsv } from "./interfaces";

interface ImportProductsFromCsvDependencies {
    processCsvFile: ImportProductsFromCsv
}

export const importProductsFromCsvFactory =  
({processCsvFile}:ImportProductsFromCsvDependencies ) => 
    async (urlOfCsvFile: string): Promise<boolean> => {
    processCsvFile(urlOfCsvFile)
    return true
}

export const importProductsFromCsv = importProductsFromCsvFactory({processCsvFile: bulkCreateFromCsv})
