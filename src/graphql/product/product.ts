import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLNonNull,
	GraphQLInputObjectType,
	GraphQLList,
	GraphQLInt,
} from 'graphql'
import {type Product} from '@core/product/types'
import {getProducer} from '@repositories/producer-repository'
import {CreateProducerInputType, ProducerType} from '../producer'

const ProductType = new GraphQLObjectType({
	name: 'Product',
	description: 'This represents a product',
	fields: () => ({
		_id: {type: GraphQLID, description: 'Unique identifier'},
		vintage: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'Product vintage',
		},
		name: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'Product name',
		},
		producerId: {type: GraphQLID, description: 'ID of the associated producer'},
		producer: {
			type: ProducerType,
			async resolve(parent: Product) {
				console.log('PRODUCT-PRODUCER-RESOLVER')
				return getProducer(parent.producerId)
			},
		},
	}),
})

const ProductByProducer = new GraphQLObjectType({
	name: 'ProductByProducer',
	description: 'This represents a product',
	fields: () => ({
		_id: {type: GraphQLID, description: 'Unique identifier'},
		vintage: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'Product vintage',
		},
		name: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'Product name',
		},
		producerId: {
			type: GraphQLString,
			description: 'ID of the associated producer',
		},
	}),
})

const CreateProductInputType = new GraphQLInputObjectType({
	name: 'CreateProductInput',
	description: 'This represents the input to create a product',
	fields: () => ({
		vintage: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'Product vintage',
		},
		name: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'Product name',
		},
		producer: {
			type: new GraphQLNonNull(CreateProducerInputType),
			description: 'Producer',
		},
	}),
})

const ProductOutputType = new GraphQLObjectType({
	name: 'CreateProductOutput',
	description: 'This represents the output of creating a product',
	fields: () => ({
		_id: {type: GraphQLString, description: 'Unique identifier'},
		vintage: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'Product vintage',
		},
		name: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'Product name',
		},
		producerId: {
			type: GraphQLString,
			description: 'ID of the associated producer',
		},
	}),
})

const UpdateProductInputType = new GraphQLInputObjectType({
	name: 'UpdateProductInput',
	description: 'This represents the input to update a product',
	fields: () => ({
		vintage: {type: GraphQLString, description: 'Product vintage'},
		name: {type: GraphQLString, description: 'Product name'},
		producerId: {
			type: GraphQLString,
			description: 'ID of the associated producer',
		},
	}),
})

const DeleteProductsInputType = new GraphQLInputObjectType({
	name: 'DeleteProductsInput',
	description: 'This represents the input to delete multiple products',
	fields: () => ({
		productIds: {
			type: new GraphQLList(GraphQLID),
			description: 'Product IDs to delete',
		},
	}),
})

const DeleteProductsOutputType = new GraphQLObjectType({
	name: 'DeleteProductsOutput',
	description: 'This represents the output of deleting multiple products',
	fields: () => ({
		deletedCount: {type: GraphQLInt, description: 'Number of deleted products'},
	}),
})

export {
	ProductType,
	ProductByProducer,
	CreateProductInputType,
	ProductOutputType,
	UpdateProductInputType,
	DeleteProductsInputType,
	DeleteProductsOutputType,
}
