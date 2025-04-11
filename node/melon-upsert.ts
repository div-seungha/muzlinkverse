import {
  getAppleMusic,
  getMelonSearchResult,
  getSpotify,
  getYoutubeVideo,
} from "../app/.server/search.ts";
import { prisma } from "../app/.server/db.ts";

async function wait(ms: number) {
  return new Promise((res) => setTimeout(res, 500));
}

async function main() {
  const songs = await prisma.song.findMany({
    where: {
      OR: [
        { spotifyUrl: "" },
        { spotifyUrl: null },
        { appleMusicUrl: "" },
        { appleMusicUrl: null },
      ],
    },
    select: {
      id: true,
      title: true,
      artist: true,
      melonUrl: true,
    },
  });

  console.log(`🎧 "곡 ${songs.length}개 찾음`);

  for (let i = 0; i < songs.length; i++) {
    console.log(
      `🔄 처리 중: [${songs[i].id}] ${songs[i].artist} - ${songs[i].title}`
    );

    try {
      const [spotifyRes, appleMusicRes, youtubeRes] = await Promise.allSettled([
        getSpotify({ title: songs[i].title, artist: songs[i].artist }),
        getAppleMusic(songs[i].title, songs[i].artist),
        // getMelonUrl(title, artist),
        getYoutubeVideo(`${songs[i].artist} ${songs[i].title}`),
      ]);

      const spotifyResult =
        spotifyRes.status === "fulfilled" ? spotifyRes.value : null;
      const appleMusicResult =
        appleMusicRes.status === "fulfilled" ? appleMusicRes.value : null;
      // const melonUrl = melonRes.status === "fulfilled" ? melonRes.value : "";
      const youtubeVideoResult =
        youtubeRes.status === "fulfilled" ? youtubeRes.value : "";

      await prisma.song.update({
        where: { id: songs[i].id },
        data: {
          spotifyUrl: spotifyResult?.id || "",
          appleMusicUrl: appleMusicResult?.attributes?.url || "",
          youtubeUrl: youtubeVideoResult || "",
          popularity: spotifyResult?.popularity || null,
          releaseDate:
            appleMusicResult?.attributes?.releaseDate ||
            spotifyResult?.album?.releaseDate ||
            "",
          bgColor: appleMusicResult?.attributes?.artwork?.bgColor || "",
          rawArtwork:
            appleMusicResult?.attributes?.artwork?.url &&
            appleMusicResult?.attributes?.artwork?.url.endsWith("jpg")
              ? appleMusicResult.attributes.artwork.url.replace(
                  /\.jpg\/.*$/,
                  ".jpg"
                ) + "/500x500bb.jpg"
              : spotifyResult?.album?.images[0]?.url
              ? spotifyResult.album.images[0].url
              : "",
        },
      });

      console.log(`✅ 업데이트 완료: ${songs[i].title}`);

      if (i < songs.length - 1) {
        console.log("⏳ 1분 대기...");
        await wait(500);
      }
    } catch (err) {
      console.error(`❌ 실패: ${songs[i].title}`, err);
    }
  }

  await prisma.$disconnect();
  console.log("🏁 모든 곡 처리 완료!");
}

main();
