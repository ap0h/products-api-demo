import {
	type GraphQLFieldConfig,
	GraphQLList,
	GraphQLString,
	type ThunkObjMap,
} from 'graphql'
import {
	type GetProductByProducerFactory,
	getProductsByProducer,
} from '@use-cases/get-product-by-producer'
import {ProductModel} from '@libs/models'
import {getProduct} from '@repositories/product-repository'
import {type GetProductFactory} from '@use-cases/get-product'
import {ProductByProducer, ProductType} from './types'

interface ProductQueryResolvers {
	getProduct: ReturnType<GetProductFactory>
	getProductsByProducer: ReturnType<GetProductByProducerFactory>
}

type ProductQueryFactory = (
	resolvers: ProductQueryResolvers,
) => ThunkObjMap<GraphQLFieldConfig<any, any>>

const productQueriesFactory: ProductQueryFactory = ({
	getProduct,
	getProductsByProducer,
}) => {
	const productQueries: ThunkObjMap<GraphQLFieldConfig<any, any>> = {
		product: {
			type: ProductType,
			args: {_id: {type: GraphQLString}},
			async resolve(_: any, {_id}: {_id: string}) {
				return getProduct(_id)
			},
		},
		productsByProducer: {
			type: new GraphQLList(ProductByProducer),
			args: {producerId: {type: GraphQLString}},
			async resolve(_: any, {producerId}: {producerId: string}) {
				return getProductsByProducer(producerId)
			},
		},
	}
	return productQueries
}

export {productQueriesFactory}
