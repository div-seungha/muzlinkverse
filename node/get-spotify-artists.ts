import { prisma } from "../app/.server/db";
import { getSpotifyAccessToken } from "../app/.server/search";
import axios from "axios";
import fs from "fs";

async function fetchTrackArtists(trackId: string) {
  const accessToken = await getSpotifyAccessToken();

  // 트랙에서 아티스트 ID만 먼저 가져옴
  const trackRes = await axios.get(
    `https://api.spotify.com/v1/tracks/${trackId}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  const artistIds: string[] = trackRes.data.artists.map((a: any) => a.id);

  // 병렬로 아티스트 정보 모두 가져오기
  const artistResponses = await Promise.all(
    artistIds.map((id) =>
      axios.get(`https://api.spotify.com/v1/artists/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
    )
  );

  return artistResponses.map((res) => {
    const a = res.data;
    return {
      name: a.name,
      genres: a.genres ? a.genres : null,
      href: a.href,
      artistId: a.id,
      popularity: a.popularity,
      artistUrl: a.uri,
      image: a.images?.[0]?.url || null,
    };
  });
}

async function main() {
  const errorArtists: { id: string; name?: string; songTitle: string }[] = [];

  const songs = await prisma.song.findMany({
    where: {
      spotifyUrl: { not: null },
      song_artists: {
        none: {}, // 아직 연결된 아티스트가 없는 곡만 가져오기
      },
    },
  });

  for (const song of songs) {
    console.log("song:", song.artist);
    try {
      const artists = await fetchTrackArtists(song.spotifyUrl!);

      for (const artist of artists) {
        try {
          // 1. 아티스트 upsert
          const savedArtist = await prisma.artist.upsert({
            where: { artistId: artist.artistId },
            update: {
              name: artist.name,
              genres: artist.genres,
              href: artist.href,
              popularity: artist.popularity,
              artistUrl: artist.artistUrl,
              image: artist.image,
            },
            create: {
              song_id: song.id,
              name: artist.name,
              artistId: artist.artistId,
              genres: artist.genres,
              href: artist.href,
              popularity: artist.popularity,
              artistUrl: artist.artistUrl,
              image: artist.image,
            },
          });

          // 2. 연결 정보 upsert (song_artists)
          await prisma.song_artists.upsert({
            where: {
              song_id_artist_id: {
                song_id: song.id,
                artist_id: savedArtist.id,
              },
            },
            update: {},
            create: {
              song_id: song.id,
              artist_id: savedArtist.id,
            },
          });
        } catch (err) {
          console.error(`❌ Error saving artist: ${artist.name}`);
          errorArtists.push({
            id: artist.artistId,
            name: artist.name,
            songTitle: song.title,
          });
        }
      }

      console.log(`✅ Updated song "${song.title}" with artists`);
    } catch (err) {
      console.error(`❌ Error processing song "${song.title}"`);
    }
  }

  if (errorArtists.length > 0) {
    fs.writeFileSync(
      "error_artists.json",
      JSON.stringify(errorArtists, null, 2)
    );
    console.log("⚠️ Wrote error_artists.json with problematic entries.");
  }

  await prisma.$disconnect();
  console.log("🎉 Done!");
}

main();
