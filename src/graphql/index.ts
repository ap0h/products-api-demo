import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLNonNull,
	GraphQLBoolean,
} from 'graphql'
import {getProduct} from '@use-cases/get-product'
import {createProducts} from '@use-cases/create-products'
import {ProductModel} from '@libs/models'
import {getProductsByProducer} from '@use-cases/get-product-by-producer'
import {updateProduct} from '@use-cases/update-product'
import {deleteProducts} from '@use-cases/delete-products'
import {type ProductInput} from '@use-cases/interfaces'
import {type Product} from '@core/product/types'
import {importProductsFromCsv} from '@use-cases/import-products-from-csv'
import {
	CreateProductInputType,
	ProductOutputType,
	DeleteProductsOutputType,
	ProductByProducer,
	ProductType,
	UpdateProductInputType,
} from './product'

const RootQueryType = new GraphQLObjectType({
	name: 'Query',
	description: 'Root Query',
	fields: {
		products: {
			// Added for testing purposes, remove later
			type: new GraphQLList(ProductType),
			async resolve() {
				return ProductModel.find({}, null, {lean: true})
			},
		},
		product: {
			type: ProductType,
			args: {_id: {type: GraphQLString}},
			async resolve(_, {_id}: {_id: string}) {
				return getProduct(_id)
			},
		},
		productsByProducer: {
			type: new GraphQLList(ProductByProducer),
			args: {producerId: {type: GraphQLString}},
			async resolve(_, {producerId}: {producerId: string}) {
				return getProductsByProducer(producerId)
			},
		},
	},
})

const RootMutationType = new GraphQLObjectType({
	name: 'Mutation',
	description: 'Root Mutation',
	fields: {
		importProducts: {
			type: GraphQLBoolean,
			args: {
				url: {type: new GraphQLNonNull(GraphQLString)},
			},
			async resolve(_, {url}: {url: string}) {
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
			async resolve(_, {products: newProducts}: {products: ProductInput[]}) {
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
				_,
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
			async resolve(_, {ids}: {ids: string[]}) {
				return deleteProducts(ids)
			},
		},
	},
})

export {RootQueryType, RootMutationType}
