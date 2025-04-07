import { json, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { prisma } from "~/.server/db";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect, useState, useRef } from "react";
import { findMostContrastingColor } from "~/module/calcualte-color";

type Data = {
  id: number;
  bgColor: string;
  title: string;
  artist: string;
  releaseDate: string;
  rawArtwork: string;
  s3_url: string;
};

type ItemsResponse = { items: Data[]; nextCursor: number };

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: "뮤즈링크버스, 음악으로 이어지는 우리만의 우주" },
    {
      name: "keywords",
      content:
        "음원, 스트리밍, 음원 공유, 음원 링크, 스포티파이, 애플뮤직, 애플, 멜론, 유튜브, 유튜브 뮤직, 인디, 인디 음악, 소셜, sns, 앨범, 음원 홍보, 음악",
    },
    {
      name: "description",
      content:
        "친구에게 바로 들려주고 싶은 음악이 있나요? 링크 한 줄만 공유해보세요! ",
    },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const cursor = url.searchParams.get("cursor") || 0;
  const limit = 40;

  const songs = await prisma.song.findMany({
    take: limit + 1,
    ...(cursor
      ? {
          skip: 1,
          cursor: { id: parseInt(cursor) },
        }
      : {}),
    orderBy: { id: "asc" },
    select: {
      id: true,
      bgColor: true,
      title: true,
      artist: true,
      releaseDate: true,
      rawArtwork: true,
      s3_url: true,
    },
  });

  const hasMore = songs.length > limit;
  const items = hasMore ? songs.slice(0, -1) : songs;
  const nextCursor = hasMore ? items[items.length - 1].id : null;

  return json({ items, nextCursor });
};

const SongList = () => {
  const { items, nextCursor } = useLoaderData<typeof loader>();

  const fetcher = useFetcher<ItemsResponse>();

  const [songs, setSongs] = useState(items);

  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!fetcher.data || fetcher.state === "loading") {
      return;
    }

    if (fetcher.data) {
      const newItems = fetcher.data.items;
      setSongs((prevAssets) => [...prevAssets, ...newItems]);
    }
  }, [fetcher.data]);

  return (
    <div className="p-[20px]">
      <h1 className="index-title"></h1>
      <InfiniteScroller
        loadNext={() => {
          const cursor = fetcher.data
            ? fetcher.data.nextCursor + 1
            : items.length + 1;
          const query = `?index&cursor=${cursor}`;

          fetcher.load(query);
        }}
        loading={fetcher.state === "loading"}
      >
        <div className="song-list-container">
          {songs.map((song, i) => {
            const textColor = findMostContrastingColor(
              song.bgColor || "#000000"
            );
            if (!song.rawArtwork && !song.s3_url) {
              return null;
            }
            return (
              <Link
                to={`/${song.id}`}
                key={song.id}
                viewTransition
                className={`song-card-wrapper ${
                  i % 2 === 0 ? "flex-row-reverse" : "flex-row"
                } `}
              >
                <img
                  className="song-card-cover-img"
                  src={song.s3_url || song.rawArtwork || "/dummy-album.png"}
                  alt={song.title}
                />
                <div
                  className="song-card"
                  style={{
                    background: `#${song.bgColor}` || "transparent",
                  }}
                >
                  <p
                    style={{
                      fontSize: 18,
                      color: textColor,
                      fontWeight: 800,
                      lineHeight: 1,
                    }}
                  >
                    {song.title}
                  </p>
                  <p
                    style={{
                      fontSize: 16,
                      color: textColor,
                      fontWeight: 500,
                      lineHeight: 1,
                      margin: "8px 0 24px",
                    }}
                  >
                    {song.artist}
                  </p>
                  <p
                    style={{
                      fontSize: 12,
                      color: textColor,
                      fontWeight: 200,
                      lineHeight: 1,
                    }}
                  >
                    {song.releaseDate}
                  </p>
                </div>
              </Link>
            );
          })}
          <div ref={loaderRef} className="song-card-wrapper"></div>
        </div>
      </InfiniteScroller>
    </div>
  );
};

export default SongList;

const InfiniteScroller = (props: {
  children: any;
  loading: boolean;
  loadNext: () => void;
}) => {
  const { children, loading, loadNext } = props;
  const scrollListener = useRef(loadNext);

  useEffect(() => {
    scrollListener.current = loadNext;
  }, [loadNext]);

  const onScroll = () => {
    const documentHeight = document.documentElement.scrollHeight;
    const scrollDifference = Math.floor(window.innerHeight + window.scrollY);
    const scrollEnded = documentHeight == scrollDifference;

    if (scrollEnded && !loading) {
      scrollListener.current();
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", onScroll);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <>{children}</>;
};
