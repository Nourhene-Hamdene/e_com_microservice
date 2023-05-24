

const { gql } = require('apollo-server-express');

const typeDefs = `#graphql
  type Product {
    id: ID!
    name: String!
    price: Float!
    description: String
  }

  type Order {
    id: ID!
    productId: ID!
    userId: ID!
    quantity: Int!
  }

  type User {
    id: Int!
    name: String!
    email: String!
    address: String!
    phone: String!
  }

  type Query {
    getProducts: [Product]
    getProduct(id: ID!): Product
    getOrders: [Order]
    getOrder(id: ID!): Order
    getUsers: [User]
    getUser(id: ID!): User
  }

  type Mutation {
    createProduct(input: CreateProductInput!): Product
    updateProduct(id: ID!, input: UpdateProductInput!): Product
    deleteProduct(id: ID!): String
    createOrder(input: CreateOrderInput!): Order
    updateOrder(id: ID!, input: UpdateOrderInput!): Order
    deleteOrder(id: ID!): String
    createUser(input: CreateUserInput!): User
    updateUser(id: ID!, input: UpdateUserInput!): User
    deleteUser(id: ID!): String
  }

  input CreateProductInput {
    name: String!
    price: Float!
    description: String
  }

  input UpdateProductInput {
    name: String
    price: Float
    description: String
  }

  input CreateOrderInput {
    productId: ID!
    userId: ID!
    quantity: Int!
  }

  input UpdateOrderInput {
    quantity: Int
  }

  input CreateUserInput {
    name: String!
    email: String!
    address: String!
    phone: String!
  }

  input UpdateUserInput {
    name: String
    email: String
    address: String
    phone: String
  }
`;

module.exports = {
  typeDefs,
};
