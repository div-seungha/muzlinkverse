// scripts/enrich-melon-interval.ts

import { prisma } from "../app/.server/db";
import { getMelonSearchResult, getSearchResult } from "../app/.server/search";

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
  const melonSongsRaw = await prisma.melonCrawling.findMany();
  const melonSongs = shuffleArray(melonSongsRaw);

  for (let i = 0; i < melonSongs.length; i++) {
    const song = melonSongs[i];
    const title = song.title;
    const artist = song.artists[0];
    const url = song.url;

    try {
      const existing = await prisma.song.findFirst({
        where: { title, artist },
      });
      if (existing) {
        console.log(
          `⏭️ [${i + 1}/${melonSongs.length}] 이미 존재: ${title} - ${artist}`
        );
      } else {
        await getMelonSearchResult({ title, artist, melonUrl: url });
        console.log(
          `✅ [${i + 1}/${melonSongs.length}] 처리됨: ${title} - ${artist}`
        );
      }
    } catch (err) {
      console.error(
        `❌ [${i + 1}/${melonSongs.length}] 실패: ${title} - ${artist}`,
        err
      );
    }

    if (i < melonSongs.length - 1) {
      console.log("⏳ 1분 대기...");
      await wait(60 * 1000);
    }
  }

  await prisma.$disconnect();
  console.log("🎉 랜덤 처리 완료");
}

enrichMelonSongsRandomOrder();
