import { prisma } from "~/.server/db";
import { json, LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { MetaFunction, useLoaderData, useRouteError } from "@remix-run/react";
import TrackContainer from "~/components/TrackContainer";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const id = Number(params.id);
  if (isNaN(id)) {
    throw new Response("Invalid ID", { status: 400 });
  }

  // 현재 곡 + 참여한 아티스트 정보 포함
  const data = await prisma.song.findUnique({
    where: { id },
    include: {
      song_artists: {
        include: {
          artist: true,
        },
      },
    },
  });

  if (!data) {
    throw new Response("Song not found", { status: 404 });
  }

  const artistIds = data.song_artists.map((sa) => sa.artist_id);

  // 같은 artist가 참여한 다른 곡의 song_id 목록
  const relatedSongLinks = await prisma.song_artists.findMany({
    where: {
      artist_id: { in: artistIds },
      song_id: { not: data.id },
    },
    select: {
      song_id: true,
    },
    distinct: ["song_id"],
  });

  const relatedSongIds = relatedSongLinks.map((link) => link.song_id);

  // 관련 곡 정보 가져오기 (최신순 정렬 + 최대 10개)
  const relatedSongs = await prisma.song.findMany({
    where: {
      id: { in: relatedSongIds },
    },
    include: {
      song_artists: {
        include: {
          artist: true,
        },
      },
    },
    orderBy: {
      releaseDate: "desc",
    },
    take: 5,
  });

  return json({
    ...data,
    relatedSongs: relatedSongs ?? [],
  });
};

export const links: LinksFunction = () => {
  return [
    {
      rel: "canonical",
      href: "https://muzlinkverse.com/search",
      type: "image/png",
    },
  ];
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data?.title + "-" + data?.artist },
    {
      name: "description",
      content: data?.title + "-" + data?.artist,
    },
    {
      property: "og:image",
      content: data?.s3_url || data?.rawArtwork,
    },
  ];
};

const TrackPage = () => {
  const data = useLoaderData<SearchResultPage>();

  const releaseDate = data.releaseDate;
  const apple = data.appleMusicUrl;
  const youtubeUrl = data.youtubeUrl;
  const youtubeLink = `https://www.youtube.com/watch?v=${data.youtubeUrl}`;
  const youtubeMusic = `https://music.youtube.com/watch?v=${data.youtubeUrl}`;
  const floUrl = data.floUrl || "";
  const naverVibeUrl = data.naverVibeUrl || "";
  const melonUrl = data.melonUrl || "";
  const bugsUrl = data.bugsUrl || "";

  const coverImgUrl = data.s3_url || data.rawArtwork;

  return (
    <TrackContainer
      isSearch={false}
      id={data.id}
      title={data.title}
      artist={data.artist}
      artistImg={data.artist_profile_img}
      coverImgUrl={coverImgUrl}
      bgColor={data.bgColor}
      youtubeLink={youtubeLink}
      apple={apple}
      spotifyId={data.spotifyUrl}
      releaseDate={releaseDate}
      youtubeMusic={youtubeMusic}
      youtubeUrl={youtubeUrl}
      melonUrl={melonUrl}
      bugsUrl={bugsUrl}
      floUrl={floUrl}
      naverVibeUrl={naverVibeUrl}
      relatedSongs={data.relatedSongs}
    />
  );
};

export default TrackPage;

export const ErrorBoundary = () => {
  const error: any = useRouteError();

  return (
    <div className="py-[60px] px-[20px]">
      <img
        src="/error.webp"
        alt="에러 발생"
        width={200}
        style={{ margin: "20px auto" }}
      />
      <h2
        className="error-title text-center text-[24px] my-[20px]"
        style={{ fontWeight: 800 }}
      >
        Oops! Something is wrong...
      </h2>
      <p
        className="text-center text-[12px] mt-[24px]"
        style={{ fontWeight: 200 }}
      >
        문제가 계속되면 아래로 연락 주세요!
        <br />
        커스텀 웹 페이지가 필요하시다면
        <br />그 또한 아래로 연락주세요!
      </p>
      <p className="text-center text-[12px]" style={{ fontWeight: 200 }}>
        serendipity@beonanotherplanet.com
      </p>

      <p className="text-center text-[12px]" style={{ fontWeight: 600 }}>
        Error Code: {error.status}
      </p>
      <p className="text-center text-[12px]" style={{ fontWeight: 600 }}>
        {error.statusText}
      </p>
    </div>
  );
};
