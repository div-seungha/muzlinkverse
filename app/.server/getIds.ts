import { prisma } from "./db";

export const getIds = async () => {
  const items = await prisma.song.findMany({
    select: { id: true },
  });
  return items.map((item) => item.id);
};
