import { gql } from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
  }

  type AuthPayload {
    statusCode: Int
    message: String
    token: String
    user: User
  }

  type deleteResponse {
    statusCode: Int!
    message: String!
  }

  type Query {
    _: Boolean
  }

  type Mutation {
    signup(email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    deleteAccount(userId: Int!): deleteResponse
  }
`;
