// backup.ts
import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";

const prisma = new PrismaClient();

async function main() {
  const songs = await prisma.song.findMany();

  const backup = { songs };

  await fs.writeFile("backup.json", JSON.stringify(backup, null, 2));
  console.log("✅ Backup saved to backup.json");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
