import axios from "axios";
import { prisma } from "./db";

type SearchParams = {
  title: string;
  artist: string;
};

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

let spotifyToken: string | null = null;
let tokenExpiresAt: number | null = null;

const getSpotifyAccessToken = async () => {
  const now = Date.now();

  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({ grant_type: "client_credentials" }),
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
        ).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const { access_token, expires_in } = response.data;

  // 토큰과 만료 시간 저장
  spotifyToken = access_token;
  tokenExpiresAt = now + expires_in * 1000 - 60 * 1000; // 1분

  return response.data.access_token;
};

setInterval(getSpotifyAccessToken, 3600000);

export const getSpotify = async (params: SearchParams) => {
  const accessToken = await getSpotifyAccessToken();

  const { title, artist } = params;
  const url = "https://api.spotify.com/v1/search";

  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      q: `track:${title}, artist:${artist}`,
      type: "track",
      limit: 10,
    },
  });
  const tracks = res.data.tracks.items;

  const normalize = (str: string) =>
    str
      .toLowerCase()
      .replace(/[\s\-’'".,!?]/g, "")
      .trim();

  const normalizedTitle = normalize(title);
  const normalizedArtist = normalize(artist);

  const matched = tracks.find((track: any) => {
    const trackTitle = normalize(track.name);
    const trackArtist = normalize(track.artists[0]?.name || "");
    return (
      trackTitle.includes(normalizedTitle) &&
      trackArtist.includes(normalizedArtist)
    );
  });

  return matched ? [matched] : tracks.flat(Infinity)[0];
};

const getAppleTokenFromLambda = async () => {
  const res = await fetch(
    "https://jmj1zlude4.execute-api.ap-northeast-2.amazonaws.com/default/apple-token-generator"
  );
  const data = await res.json();
  return data.token;
};

const getAppleMusic = async (title: string, artist: string) => {
  const url = `https://api.music.apple.com/v1/catalog/kr/search`;
  const token = await getAppleTokenFromLambda();

  const query = `${artist} ${title}`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      term: query,
      types: "songs",
      limit: 10,
    },
  });

  const songs = response.data.results.songs?.data || [];

  const normalize = (str: string) =>
    str
      .toLowerCase()
      .replace(/[\s\-]+/g, "")
      .trim();

  const normalizedTitle = normalize(title);
  const normalizedArtist = normalize(artist);

  const matched = songs.find((song: any) => {
    const songTitle = normalize(song.attributes.name);
    const songArtist = normalize(song.attributes.artistName);
    return (
      songTitle.includes(normalizedTitle) &&
      songArtist.includes(normalizedArtist)
    );
  });

  return matched || songs[0];
};

const getYoutubeVideo = async (query: string) => {
  const url = "https://www.googleapis.com/youtube/v3/search";
  const res = await axios.get(url, {
    params: {
      key: process.env.YOUTUBE_API_KEY,
      part: "snippet",
      q: query,
      type: "video",
      maxResults: 1,
    },
  });

  const video = res.data.items[0];
  return video ? video.id.videoId : null;
};

const getMelonUrl = async (title: string, artist: string) => {
  const result = await prisma.melonCrawling.findFirst({
    where: {
      title,
      artists: {
        has: artist,
      },
    },
    select: {
      url: true,
    },
  });

  return result?.url ?? null;
};

export const getSearchResult = async (params: SearchParams) => {
  const { title, artist } = params;

  // DB에 이미 저장된 곡이 있는지 먼저 확인
  const existingSong = await prisma.song.findFirst({
    where: {
      title,
      artist,
    },
  });

  // 있으면 바로 반환
  if (existingSong) {
    return existingSong;
  }

  const spotifyResult = await getSpotify(params);
  let appleMusicResult = await getAppleMusic(title, artist);
  const youtubeVideoResult = await getYoutubeVideo(`${artist} ${title}`);

  let titleResult = capitalizeFirstLetter(title);
  let artistResult = capitalizeFirstLetter(artist);

  if (title !== titleResult || artist !== artistResult) {
    const existingSong = await prisma.song.findFirst({
      where: {
        title: titleResult,
        artist: artistResult,
      },
    });

    if (existingSong) {
      return existingSong;
    }
  }

  const melonUrl = await getMelonUrl(title, artist);

  const songInfo = await prisma.song.create({
    data: {
      title: titleResult,
      artist: artistResult,
      popularity: spotifyResult?.popularity || null,
      bgColor: appleMusicResult?.attributes?.artwork?.bgColor || "",
      releaseDate: appleMusicResult?.attributes?.release_date || "",
      rawArtwork:
        appleMusicResult?.attributes?.artwork?.url &
        appleMusicResult?.attributes?.artwork?.url.endsWith("jpg")
          ? appleMusicResult.attributes.artwork.url.replace(
              /\.jpg\/.*$/,
              ".jpg"
            ) + "/500x500bb.jpg"
          : spotifyResult?.album?.images[0]?.url
          ? spotifyResult.album.images[0].url
          : "",
      spotifyUrl: spotifyResult.id || "",
      appleMusicUrl: appleMusicResult.attributes?.url || "",
      youtubeUrl: youtubeVideoResult || "",
      melonUrl: melonUrl || "",
    },
  });

  return songInfo;
};

export const getMelonSearchResult = async (
  params: SearchParams & { melonUrl: string }
) => {
  const { title, artist, melonUrl } = params;
  // DB에 이미 저장된 곡이 있는지 먼저 확인
  const existingSong = await prisma.song.findFirst({
    where: {
      title,
      artist,
    },
  });

  // 있으면 바로 반환
  if (existingSong) {
    return existingSong;
  }

  const spotifyResult = await getSpotify(params);
  let appleMusicResult = await getAppleMusic(title, artist);
  // const youtubeVideoResult = await getYoutubeVideo(`${artist} ${title}`);

  let titleResult = capitalizeFirstLetter(title);
  let artistResult = capitalizeFirstLetter(artist);

  if (title !== titleResult || artist !== artistResult) {
    const existingSong = await prisma.song.findFirst({
      where: {
        title: titleResult,
        artist: artistResult,
      },
    });

    if (existingSong) {
      return existingSong;
    }
  }

  const songInfo = await prisma.song.create({
    data: {
      title: titleResult,
      artist: artistResult,
      popularity: spotifyResult?.popularity || null,
      bgColor: appleMusicResult?.attributes?.artwork?.bgColor || "",
      releaseDate: appleMusicResult?.attributes?.release_date || "",
      rawArtwork:
        appleMusicResult?.attributes?.artwork?.url &
        appleMusicResult?.attributes?.artwork?.url.endsWith("jpg")
          ? appleMusicResult.attributes.artwork.url.replace(
              /\.jpg\/.*$/,
              ".jpg"
            ) + "/500x500bb.jpg"
          : spotifyResult?.album?.images[0]?.url
          ? spotifyResult.album.images[0].url
          : "",
      spotifyUrl: spotifyResult.id || "",
      appleMusicUrl: appleMusicResult.attributes?.url || "",
      youtubeUrl: "",
      // youtubeUrl: youtubeVideoResult || "",
      melonUrl: melonUrl || "",
    },
  });

  return songInfo;
};

function capitalizeFirstLetter(sentence: string) {
  return sentence.replace(/(^\s*[a-zA-Z])/, (match) => match.toUpperCase());
}
