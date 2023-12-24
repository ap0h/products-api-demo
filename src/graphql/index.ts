import {GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull}  from 'graphql'
import { CreateProductInputType, ProductOutputType, DeleteProductsOutputType, ProductByProducer, ProductType, UpdateProductInputType } from './product';
import { getProduct } from "@use-cases/get-product";
import { createProducts } from "@use-cases/create-products";
import { ProductModel } from '@libs/models';
import { getProductsByProducer } from '@use-cases/get-product-by-producer';
import { updateProduct } from '@use-cases/update-product';
import { deleteProducts } from '@use-cases/delete-products';
    
  const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: {
        products: { // Added for testing purposes, remove later
            type: new GraphQLList(ProductType),
            resolve: async () => {              
              return  ProductModel.find({}, null, { lean: true })
            },
        },
      product: {
        type: ProductType,
        args: { _id: { type: GraphQLString } },
        resolve: async (_, { _id }) => {
          return getProduct(_id);
        },
      },
      productsByProducer: {
        type: new GraphQLList(ProductByProducer),
        args: { producerId: { type: GraphQLString } },
        resolve: (_, { producerId }) => {        
          return  getProductsByProducer(producerId)
        },
      },
    },
  });
  
  const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: {
      createProducts: {
        type: new GraphQLList(ProductOutputType),
        args: {
          products: { type: new GraphQLList(new GraphQLNonNull(CreateProductInputType)) },
        },
        resolve: async (_, { products: newProducts }) => {
          return createProducts(newProducts);
        },
      },
      updateProduct: {
        type: ProductOutputType,
        args: {
          _id: { type: new GraphQLNonNull(GraphQLString) },
          updates: { type: new GraphQLNonNull(UpdateProductInputType) },
        },
        resolve: async (_, { _id, updates }) => {         
          return updateProduct({id: _id, updateBody: updates})
        },
      },
      deleteProducts: {
        type: DeleteProductsOutputType,
        args: {
          ids: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))) },
        },
        resolve: async (_, { ids }) => {
         return  deleteProducts(ids)
        },
      },
    },
  });

export {
    RootQueryType,
    RootMutationType
}