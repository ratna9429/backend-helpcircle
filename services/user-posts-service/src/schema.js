import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Post {
    id: ID!
    itemName: String!
    description: String!
    imageUrl: String!
    category: String!
    address: String!
    phoneNumber: String!
    email: String!
    userId: Int!
    createdAt: String!
    updatedAt: String!
  }

  type PostResponse {
    statusCode: Int
    message: String
    post: Post
  }

  type PostsListResponse {
    statusCode: Int
    message: String
    posts: [Post]
  }

  type Mutation {
    createPost(
      itemName: String!
      description: String!
      imageUrl: String!
      category: String!
      address: String!
      phoneNumber: String!
      email: String!
      userId: Int!
    ): PostResponse
  }

  type Query {
    getPostDetails(postId: Int!): PostResponse
    getPostsByUserId(userId: Int!): PostsListResponse
  }
`;
