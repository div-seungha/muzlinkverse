import { json, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { prisma } from "~/.server/db";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect, useState, useRef } from "react";
import { findMostContrastingColor } from "~/module/calcualte-color";
import { FaShare } from "react-icons/fa";
import { LuLink } from "react-icons/lu";
import {
  indexContainer,
  indexTitle,
  songCard,
  songCardCoverImg,
  songCardWrapper,
  songListContainer,
} from "~/styles/index.css";

type Data = {
  id: number;
  bgColor: string;
  title: string;
  artist: string;
  releaseDate: string;
  rawArtwork: string;
  s3_url: string;
};

type ItemsResponse = { items: Data[]; nextCursor: { cursorId: number } };

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
  const cursorId = url.searchParams.get("cursorId");
  const limit = 40;

  const items = await prisma.song.findMany({
    take: limit + 1,
    ...(cursorId
      ? {
          skip: 1,
          cursor: {
            id: parseInt(cursorId),
          },
        }
      : {}),
    orderBy: { id: "desc" },
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

  // 페이지네이션 처리
  const hasNextPage = items.length > limit;
  const result = hasNextPage ? items.slice(0, -1) : items;
  const nextCursor = hasNextPage
    ? {
        cursorId: cursorId,
      }
    : null;

  return json({ items: result, nextCursor });
};

const SongList = () => {
  const { items, nextCursor } = useLoaderData<typeof loader>();

  const fetcher = useFetcher<ItemsResponse>();

  const [songs, setSongs] = useState(items);

  const loaderRef = useRef<HTMLDivElement>(null);

  const loadMore = () => {
    if (fetcher.state === "loading") return;

    const next = fetcher.data?.nextCursor ?? nextCursor;
    if (next?.cursorId) {
      const query = `?cursorId=${next.cursorId}`;
      fetcher.load(query);
    }
  };

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
    <div className={indexContainer}>
      <h1 className={indexTitle}>오늘은 무슨 곡을 들을까...?</h1>
      <InfiniteScroller
        loadNext={() => {
          const cursor = songs[songs.length - 1].id;
          const query = `?index&cursorId=${cursor}`;

          fetcher.load(query);
        }}
        loading={fetcher.state === "loading"}
      >
        <div className={songListContainer}>
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
                key={i}
                viewTransition
                className={`${songCardWrapper} ${
                  i % 2 === 0 ? "flex-row-reverse" : "flex-row"
                } `}
              >
                <img
                  className={songCardCoverImg}
                  src={song.s3_url || song.rawArtwork || "/dummy-album.png"}
                  alt={song.title}
                />
                <div
                  className={songCard}
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
      {/* <Link to="/search" viewTransition>
        <div className="index-floating-button-container">
          <LuLink fontSize={20} color="#111" />
        </div>
      </Link> */}
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
