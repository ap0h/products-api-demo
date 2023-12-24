import {GraphQLObjectType, GraphQLSchema} from 'graphql'
import {createProducts} from '@use-cases/create-products'
import {deleteProducts} from '@use-cases/delete-products'
import {importProductsFromCsv} from '@use-cases/import-products-from-csv'
import {updateProduct} from '@use-cases/update-product'
import {getProduct} from '@use-cases/get-product'
import {getProductsByProducer} from '@use-cases/get-product-by-producer'
import {productMutationsFactory, productQueriesFactory} from './product'

const RootQueryType = new GraphQLObjectType({
	name: 'Query',
	description: 'Root Query',
	fields: productQueriesFactory({getProduct, getProductsByProducer}),
})

const RootMutationType = new GraphQLObjectType({
	name: 'Mutation',
	description: 'Root Mutation',
	fields: productMutationsFactory({
		createProducts,
		deleteProducts,
		importProductsFromCsv,
		updateProduct,
	}),
})

const schema = new GraphQLSchema({
	query: RootQueryType,
	mutation: RootMutationType,
})

export default schema
