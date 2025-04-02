import axios from "axios";
import jwt from "jsonwebtoken";
// import fs from "fs";
import { prisma } from "./db";

type SearchParams = {
  title: string;
  artist: string;
};

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

const getSpotifyAccessToken = async () => {
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

  return response.data.access_token;
};

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
      limit: 5,
    },
  });

  return res.data.tracks.items;
};

const APPLE_TEAM_ID = process.env.APPLE_TEAM_ID;
const APPLE_KEY_ID = process.env.APPLE_KEY_ID;
// const APPLE_PRIVATE_KEY =
//   process.env.APPLE_PRIVATE_KEY?.replace(/\\n/g, "\n") || "";

const APPLE_PRIVATE_KEY = JSON.parse(`"${process.env.APPLE_PRIVATE_KEY}"`);

console.log(APPLE_PRIVATE_KEY);

const appleAccessToken = jwt.sign({}, APPLE_PRIVATE_KEY, {
  algorithm: "ES256",
  expiresIn: "180d", // 최대 6개월까지
  issuer: APPLE_TEAM_ID,
  header: {
    alg: "ES256",
    kid: APPLE_KEY_ID,
  },
});

const getAppleMusic = async (query: string) => {
  const url = `https://api.music.apple.com/v1/catalog/kr/search`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${appleAccessToken}`,
    },
    params: {
      term: query,
      types: "songs",
      limit: 5,
    },
  });

  return response.data.results.songs;
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
  const appleMusicResult = await getAppleMusic(`${artist} ${title}`);
  const youtubeVideoResult = await getYoutubeVideo(`${artist} ${title}`);

  const songInfo = await prisma.song.create({
    data: {
      title,
      artist,
      bgColor: appleMusicResult.data[0].attributes.artwork.bgColor,
      releaseDate: appleMusicResult.data[0].attributes.releaseDate,
      artwork:
        appleMusicResult.data[0].attributes.artwork.url.replace(
          /\.jpg\/.*$/,
          ".jpg"
        ) + "/120x120bb.jpg",
      spotifyUrl: spotifyResult[0].id,
      appleMusicUrl: appleMusicResult.data[0].attributes.url,
      youtubeUrl: youtubeVideoResult,
    },
  });

  return songInfo;
};
