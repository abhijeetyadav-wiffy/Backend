import { PrismaClient } from "@prisma/client";

// Reuse one Prisma client instance across the app.
const prisma = new PrismaClient();

export default prisma;
