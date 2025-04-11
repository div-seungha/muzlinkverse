import { prisma } from "../app/.server/db";

async function migrateArtists() {
  console.log("🚀 아티스트 마이그레이션 시작");

  const songs = await prisma.song.findMany({
    where: {
      NOT: [{ artist: "" }],
    },
  });

  console.log(`🎵 총 ${songs.length}곡에서 아티스트 추출 시작`);

  let processedSongs = 0;

  for (const song of songs) {
    processedSongs++;

    if (!song.artist) continue;

    const artistNames = song.artist.split(",").map((name) => name.trim());

    console.log(
      `🔍 [${processedSongs}/${songs.length}] "${
        song.title
      }" → ${artistNames.join(", ")}`
    );

    for (const name of artistNames) {
      let foundArtist = await prisma.artist.findFirst({
        where: {
          name: {
            equals: name,
            mode: "insensitive",
          },
        },
      });

      if (!foundArtist) {
        foundArtist = await prisma.artist.create({
          data: {
            name,
            artistId: `manual-${name}-${Math.random()
              .toString(36)
              .substring(2, 8)}`,
            genres: [],
            song_id: 0, // 최신 곡으로 나중에 대체
          },
        });

        console.log(`  ➕ 아티스트 추가됨: ${foundArtist.name}`);
      }

      const existingLink = await prisma.song_artists.findFirst({
        where: {
          song_id: song.id,
          artist_id: foundArtist.id,
        },
      });

      if (!existingLink) {
        await prisma.song_artists.create({
          data: {
            song_id: song.id,
            artist_id: foundArtist.id,
          },
        });

        console.log(`  🔗 연결됨: "${song.title}" ↔ ${foundArtist.name}`);
      }
    }
  }

  console.log("✅ 아티스트 ↔ 곡 관계 생성 완료");

  // 최신 곡 기준으로 대표곡 지정
  const allArtists = await prisma.artist.findMany();
  console.log(`📌 총 ${allArtists.length}명의 아티스트 대표곡 지정 시작`);

  let updatedCount = 0;

  for (const artist of allArtists) {
    const latestSong = await prisma.song.findFirst({
      where: {
        song_artists: {
          some: {
            artist_id: artist.id,
          },
        },
      },
      orderBy: {
        releaseDate: "desc", // 최신곡
      },
    });

    if (latestSong && latestSong.id !== artist.song_id) {
      await prisma.artist.update({
        where: { id: artist.id },
        data: {
          song_id: latestSong.id,
        },
      });

      console.log(`  🆙 대표곡 설정: ${artist.name} → "${latestSong.title}"`);
      updatedCount++;
    }
  }

  console.log(`🎯 대표곡 설정 완료 (${updatedCount}명 업데이트됨)`);
  console.log("🏁 마이그레이션 전체 완료!");
}

migrateArtists()
  .catch((e) => {
    console.error("❌ 마이그레이션 실패:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
