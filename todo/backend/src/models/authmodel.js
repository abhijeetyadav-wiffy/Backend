import prisma from "../config/prisma.js";

export const findUserByEmail = async (email) => {
  return prisma.users.findUnique({
    where: { email },
  });
};

export const createAuthUser = async ({ name, email, password }) => {
  return prisma.users.create({
    data: {
      name,
      email,
      password,
    },
  });
};
