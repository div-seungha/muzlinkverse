// scripts/enrich-melon-interval.ts

import { prisma } from "../app/.server/db";
import { getMelonSearchResult } from "../app/.server/search";

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

async function wait(ms: number) {
  return new Promise((res) => setTimeout(res, 500));
}

async function enrichMelonSongsRandomOrder() {
  const melonSongs = await prisma.song.findMany({
    where: {
      id: {
        gte: 1601,
        lte: 1626,
      },
    },
    orderBy: {
      id: "asc",
    },
  });

  console.log(melonSongs.length);
  console.log(melonSongs);

  for (let i = 0; i < melonSongs.length; i++) {
    const song = melonSongs[i];
    const title = song.title;
    const artist = song.artist;
    const url = song.melonUrl || "";

    try {
      //   const existing = await prisma.song.findFirst({
      //     where: { title, artist },
      //   });
      //   if (existing) {
      //     console.log(
      //       `⏭️ [${i + 1}/${melonSongs.length}] 이미 존재: ${title} - ${artist}`
      //     );
      //   } else {
      await getMelonSearchResult({ title, artist, melonUrl: url });
      console.log(
        `✅ [${i + 1}/${melonSongs.length}] 처리됨: ${title} - ${artist}`
      );
      //   }
    } catch (err) {
      console.error(
        `❌ [${i + 1}/${melonSongs.length}] 실패: ${title} - ${artist}`,
        err
      );
    }

    // if (i < melonSongs.length - 1) {
    //   console.log("⏳ 1분 대기...");
    //   await wait(500);
    // }
  }

  await prisma.$disconnect();
  console.log("🎉 랜덤 처리 완료");
}

enrichMelonSongsRandomOrder();
