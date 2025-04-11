import { prisma } from "../app/.server/db";
import axios from "axios";

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

const updateEmptyYoutubeUrls = async () => {
  // youtubeUrl이 비어있는 song 레코드들 가져오기
  const songs = await prisma.song.findMany({
    where: {
      youtubeUrl: "",
    },
    select: {
      id: true,
      title: true,
      artist: true,
    },
  });

  console.log(songs.length);

  for (const song of songs) {
    const videoId = await getYoutubeVideo(`${song.artist} ${song.title}`);
    if (videoId) {
      await prisma.song.update({
        where: { id: song.id },
        data: {
          youtubeUrl: videoId,
        },
      });

      console.log(`Updated song "${song.title}" with YouTube URL.`);
    } else {
      console.log(`No YouTube result for "${song.artist} - ${song.title}"`);
    }
  }
};

// 실행
updateEmptyYoutubeUrls()
  .then(() => {
    console.log("YouTube URL 업데이트 완료");
    prisma.$disconnect();
  })
  .catch((error) => {
    console.error("에러 발생:", error);
    prisma.$disconnect();
  });
