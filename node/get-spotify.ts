import { prisma } from "../app/.server/db.ts";
import { getSpotify } from "../app/.server/search.ts";

const updateEmptySpotifyUrls = async () => {
  // Url이 비어있는 song 레코드들 가져오기
  const songs = await prisma.song.findMany({
    where: {
      OR: [{ spotifyUrl: "" }, { spotifyUrl: null }],
    },
    select: {
      id: true,
      title: true,
      artist: true,
    },
  });

  console.log(songs.length);

  for (const song of songs) {
    const spotifyResult = await getSpotify({
      title: song.title,
      artist: song.artist,
    });
    if (spotifyResult?.id) {
      await prisma.song.update({
        where: { id: song.id },
        data: {
          releaseDate: spotifyResult.album.release_date,
          spotifyUrl: spotifyResult.id,
        },
      });

      console.log(`Updated song "${song.title}" with spotify URL.`);
    } else {
      console.log(`No result for "${song.artist} - ${song.title}"`);
    }
  }
};

// 실행
updateEmptySpotifyUrls()
  .then(() => {
    console.log("URL 업데이트 완료");
    prisma.$disconnect();
  })
  .catch((error) => {
    console.error("에러 발생:", error);
    prisma.$disconnect();
  });
