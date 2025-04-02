import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

console.log("🧪 DATABASE_URL:", process.env.DATABASE_URL);

declare global {
  const __db: PrismaClient | undefined;
}

if (!global.__db) {
  global.__db = new PrismaClient();
}

prisma = global.__db;

export { prisma };
