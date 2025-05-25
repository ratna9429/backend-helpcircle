import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const resolvers = {
  Mutation: {
    signup: async (_, { email, password }) => {
      try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user without token first
        const user = await prisma.user.create({
          data: {
            email: email,
            password: hashedPassword,
          },
        });

        // Generate token using user.id
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

        // Update user with the generated token
        await prisma.user.update({
          where: { id: user.id },
          data: { token },
        });

        return { statusCode: 200, message: "Signup Successful", token, user };
      } catch (err) {
        console.log("🚀 ~ signup: ~ err: ====>", err);
        return { statusCode: 400, message: "Signup Failed" };
      }
    },

    login: async (_, { email, password }) => {
      try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
          return { statusCode: 400, message: "User not found" };
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
          return { statusCode: 400, message: "Invalid password" };
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
        return { statusCode: 200, message: "Login Successful", token, user };
      } catch (err) {
        return { statusCode: 400, message: "Login Failed" };
      }
    },

    deleteAccount: async (_, { userId }) => {
      try {
        let res = await prisma.user.delete({ where: { id: userId } });

        if (res) {
          return { statusCode: 200, message: "Account Deleted Successfuly." };
        } else {
          return { statusCode: 400, message: "Failed To Delete Account." };
        }
      } catch (err) {
        return { statusCode: 400, message: "Failed To Delete Account." };
      }
    },
  },
};
