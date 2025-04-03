import { json } from "@remix-run/node";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const loader = async () => {
  console.log("✅ DATABASE_URL in Railway:", process.env.DATABASE_URL);
  try {
    const data = await prisma.$queryRaw`SELECT NOW()`;
    return json({ dbStatus: "connected", now: data });
  } catch (err: any) {
    return json({ dbStatus: "error", error: err.message }, { status: 500 });
  }
};
