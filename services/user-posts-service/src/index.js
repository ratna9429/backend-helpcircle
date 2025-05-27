import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express4";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const server = new ApolloServer({ typeDefs, resolvers });
await server.start();

app.use(
  "/graphql",
  expressMiddleware(server, {
    context: async ({ req }) => {
      const token = req.headers.authorization || "";
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        return { userId: decoded.userId };
      } catch {
        return {};
      }
    },
  })
);

app.listen(4001, () => {
  console.log("🚀 Server ready at http://localhost:4001/graphql");
});
