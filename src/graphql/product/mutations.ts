import {
	GraphQLBoolean,
	GraphQLList,
	GraphQLNonNull,
	GraphQLString,
	type ThunkObjMap,
	type GraphQLFieldConfig,
} from 'graphql'
import {type ProductInput} from '@use-cases/interfaces'
import {type Product} from '@core/product/types'
import {type CreateProductsFactory} from '@use-cases/create-products'
import {type UpdateProductFactory} from '@use-cases/update-product'
import {
	type DeleteProductsFactory,
	deleteProducts,
} from '@use-cases/delete-products'
import {type ImportProductsFromCsvFactory} from '@use-cases/import-products-from-csv'
import {
	CreateProductInputType,
	DeleteProductsOutputType,
	ProductOutputType,
	UpdateProductInputType,
} from './types'

interface ProductMutationResolvers {
	createProducts: ReturnType<CreateProductsFactory>
	deleteProducts: ReturnType<DeleteProductsFactory>
	importProductsFromCsv: ReturnType<ImportProductsFromCsvFactory>
	updateProduct: ReturnType<UpdateProductFactory>
}

type ProductMutationsFactory = (
	resolvers: ProductMutationResolvers,
) => ThunkObjMap<GraphQLFieldConfig<any, any>>

const productMutationsFactory: ProductMutationsFactory = ({
	importProductsFromCsv,
	createProducts,
	updateProduct,
}) => {
	const productMutations: ThunkObjMap<GraphQLFieldConfig<any, any>> = {
		importProducts: {
			type: GraphQLBoolean,
			args: {
				url: {type: new GraphQLNonNull(GraphQLString)},
			},
			async resolve(_: any, {url}: {url: string}) {
				return importProductsFromCsv(url)
			},
		},
		createProducts: {
			type: new GraphQLList(ProductOutputType),
			args: {
				products: {
					type: new GraphQLList(new GraphQLNonNull(CreateProductInputType)),
				},
			},
			async resolve(
				_: any,
				{products: newProducts}: {products: ProductInput[]},
			) {
				return createProducts(newProducts)
			},
		},
		updateProduct: {
			type: ProductOutputType,
			args: {
				_id: {type: new GraphQLNonNull(GraphQLString)},
				updates: {type: new GraphQLNonNull(UpdateProductInputType)},
			},
			async resolve(
				_: any,
				{_id, updates}: {_id: string; updates: Partial<Omit<Product, '_id'>>},
			) {
				return updateProduct({id: _id, updateBody: updates})
			},
		},
		deleteProducts: {
			type: DeleteProductsOutputType,
			args: {
				ids: {
					type: new GraphQLNonNull(
						new GraphQLList(new GraphQLNonNull(GraphQLString)),
					),
				},
			},
			async resolve(_: any, {ids}: {ids: string[]}) {
				return deleteProducts(ids)
			},
		},
	}
	return productMutations
}

export {productMutationsFactory}
