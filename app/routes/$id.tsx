import { prisma } from "~/.server/db";
import { json, LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { MetaFunction, useLoaderData, useRouteError } from "@remix-run/react";
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
      content: data?.artwork,
    },
  ];
};

const SearchResultPage = () => {
  const data = useLoaderData<SearchResultPage>();

  const releaseDate = data.releaseDate;
  const apple = data.appleMusicUrl;
  const youtubeUrl = data.youtubeUrl;
  const youtubeLink = `https://www.youtube.com/watch?v=${data.youtubeUrl}`;
  const youtubeMusic = `https://music.youtube.com/watch?v=${data.youtubeUrl}`;
  // const flo = "";
  // const naver = "";
  // const melon = "";
  // const bugs = "";

  const coverImgUrl = data.rawArtwork;

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
      spotifyId={data.spotifyUrl}
      releaseDate={releaseDate}
      youtubeMusic={youtubeMusic}
      youtubeUrl={youtubeUrl}
    />
  );
};

export default SearchResultPage;

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
        className="text-center text-[24px] my-[20px]"
        style={{ fontWeight: 800, color: "#fff" }}
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
