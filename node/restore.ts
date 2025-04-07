import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";

const prisma = new PrismaClient();

async function main() {
  const data = JSON.parse(await fs.readFile("backup.json", "utf8"));

  for (const item of data.songs) {
    await prisma.song.create({ data: item });
  }

  console.log("✅ 데이터 복원 완료!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
