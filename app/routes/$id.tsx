import { prisma } from "~/.server/db";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { MetaFunction, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import LinkContainer from "~/components/LinkContainer";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const id = Number(params.id);

  if (isNaN(id)) {
    throw new Response("Invalid ID", { status: 400 });
  }
  const data = await prisma.song.findUnique({
    where: { id },
  });

  if (!data) {
    throw new Response("Song not found", { status: 404 });
  }

  return json({ ...data });
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
      content: data?.artwork,
    },
  ];
};

const SearchResultPage = () => {
  const data = useLoaderData<SearchResultPage>();

  const [spotify, setSpotify] = useState(
    `https://open.spotify.com/track/${data.spotifyUrl}`
  );

  const releaseDate = data.releaseDate;
  const apple = data.appleMusicUrl;
  const youtubeUrl = data.youtubeUrl;
  const youtubeLink = `https://www.youtube.com/watch?v=${data.youtubeUrl}`;
  const youtubeMusic = `https://music.youtube.com/watch?v=${data.youtubeUrl}`;
  // const flo = "";
  // const naver = "";
  // const melon = "";
  // const bugs = "";

  const coverImgUrl = data.artwork;

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /iphone|ipod|android/i.test(userAgent);

    if (isMobile) {
      setSpotify(`spotify://album/${data.spotifyUrl}`);
    } else {
      setSpotify(`https://open.spotify.com/track/${data.spotifyUrl}`);
    }
  }, [data]);

  return (
    <LinkContainer
      isSearch={false}
      id={data.id}
      title={data.title}
      artist={data.artist}
      coverImgUrl={coverImgUrl}
      bgColor={data.bgColor}
      youtubeLink={youtubeLink}
      apple={apple}
      spotifyId={spotify}
      releaseDate={releaseDate}
      youtubeMusic={youtubeMusic}
      youtubeUrl={youtubeUrl}
    />
  );
};

export default SearchResultPage;
