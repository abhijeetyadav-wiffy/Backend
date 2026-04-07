import prisma from "../config/prisma.js";

export const createUser = async (name) => {
  return await prisma.users.create({
    data: {
      name,
    },
  });
};
