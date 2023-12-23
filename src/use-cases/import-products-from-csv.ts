import { bulkCreateFromCsv } from "@repositories/product-repository/bulk-create-from-csv";

interface ImportProductsFromCsvDependencies {
    processCsvFile: (urlOfCsvFile: string) => Promise<void>
}

export const importProductsFromCsvFactory =  
({processCsvFile}:ImportProductsFromCsvDependencies ) => 
    async (urlOfCsvFile: string): Promise<boolean> => {
    processCsvFile(urlOfCsvFile)
    return true
}

export const importProductsFromCsv = importProductsFromCsvFactory({processCsvFile: bulkCreateFromCsv})
