import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLNonNull,
	GraphQLInputObjectType,
} from 'graphql'

const ProducerType = new GraphQLObjectType({
	name: 'Producer',
	description: 'This represents a producer of a product',
	fields: () => ({
		_id: {type: GraphQLID, description: 'Unique identifier'},
		name: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'Producer name',
		},
		country: {type: GraphQLString, description: 'Producer country'},
		region: {type: GraphQLString, description: 'Producer region'},
	}),
})

const CreateProducerInputType = new GraphQLInputObjectType({
	name: 'CreateProducerInput',
	description: 'This represents the input to create a producer',
	fields: () => ({
		name: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'Producer name',
		},
		country: {type: GraphQLString, description: 'Producer country'},
		region: {type: GraphQLString, description: 'Producer region'},
	}),
})

export {ProducerType, CreateProducerInputType}
