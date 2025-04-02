import { PrismaClient } from "@prisma/client";

declare global {
  const __db: PrismaClient | undefined;
}

export {};
