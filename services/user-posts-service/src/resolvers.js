import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    getPostDetails: async (_, { postId }) => {
      try {
        const post = await prisma.post.findUnique({ where: { id: postId } });

        if (!post) {
          return { statusCode: 404, message: "Post not found" };
        }

        return { statusCode: 200, message: "Post fetched successfully", post };
      } catch (err) {
        console.log("🚀 ~ getPostDetails ~ err:", err);
        return { statusCode: 500, message: "Failed to fetch post" };
      }
    },

    getPostsByUserId: async (_, { userId }) => {
      try {
        const posts = await prisma.post.findMany({ where: { userId } });

        return {
          statusCode: 200,
          message: "Posts fetched successfully",
          posts,
        };
      } catch (err) {
        console.log("🚀 ~ getPostsByUserId ~ err:", err);
        return { statusCode: 500, message: "Failed to fetch posts" };
      }
    },
  },

  Mutation: {
    createPost: async (
      _,
      {
        itemName,
        description,
        imageUrl,
        category,
        address,
        phoneNumber,
        email,
        userId,
      }
    ) => {
      try {
        const post = await prisma.post.create({
          data: {
            itemName,
            description,
            imageUrl,
            category,
            address,
            phoneNumber,
            email,
            userId,
          },
        });

        return {
          statusCode: 201,
          message: "Post created successfully",
          post,
        };
      } catch (err) {
        console.log("🚀 ~ createPost ~ err:", err);
        return { statusCode: 500, message: "Failed to create post" };
      }
    },
  },
};
