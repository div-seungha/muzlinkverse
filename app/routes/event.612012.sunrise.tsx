import { prisma } from "~/.server/db";
import { json, LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Link,
  MetaFunction,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import TrackContainer from "~/components/TrackContainer";
import {
  navEventContainer,
  navEventItemWrapper,
  navEventLabelItem,
  navMobileContainer,
  navMobileItem,
  navMobileItemWrapper,
} from "~/styles/layout.css";
import { vars } from "~/styles/theme.css";
import { FaInstagram } from "react-icons/fa6";
import { IoWine } from "react-icons/io5";

const spotifyAlbumId = "7INnDLNxqOZcF03uxHiBoA"; // 앨범 ID
const apple = "https://music.apple.com/kr/album/sunrise-single/1801387819";
const youtubeLink = "https://www.youtube.com/watch?v=3VQjL9_VzRg";
const youtubeMusic =
  "https://music.youtube.com/watch?v=3VQjL9_VzRg&si=z4SL3ZIijictYVZ9";
const melonUrl = "https://kko.kakao.com/R7FS2yvnTo";
const bugsUrl = "https://music.bugs.co.kr/track/33468444";
const naverVibeUrl = "https://naver.me/FFGZybFK";
const floUrl = "https://flomuz.io/s/b.Kb3wF";

export const links: LinksFunction = () => {
  return [
    {
      rel: "canonical",
      href: "https://muzlinkverse.com/search",
      type: "image/png",
    },
  ];
};

export const meta: MetaFunction = () => {
  return [
    { title: "송병도 - Sunrise" },
    {
      name: "description",
      content: "송병도 - Sunrise",
    },
    {
      property: "og:title",
      content: "Sunrise",
    },
    {
      property: "og:description",
      content: "송병도 - Sunrise (2025)",
    },
    {
      name: "keywords",
      content:
        "송병도, sunrise, 싱글, 록, 밴드, 버스킹, 인디음악, 인디, beyoung doe, song, 보컬, 보컬리스트, 인디 보컬, 인디밴드, 스포티파이, 유튜브, 유튜브뮤직, 유튜브 뮤직, 애플 뮤직",
    },
    { property: "og:image", content: "/cover.webp" },
  ];
};

const EventPage = () => {
  return (
    <>
      <TrackContainer
        isSearch={false}
        id={1535}
        title="Sunrise"
        artist="송병도"
        artistImg="/profile.webp"
        coverImgUrl="/cover.webp"
        bgColor="a80f00"
        youtubeLink={youtubeLink}
        apple={apple}
        spotifyId={spotifyAlbumId}
        releaseDate="2025-03-31"
        youtubeMusic={youtubeMusic}
        youtubeUrl="3VQjL9_VzRg"
        melonUrl={melonUrl}
        bugsUrl={bugsUrl}
        floUrl={floUrl}
        naverVibeUrl={naverVibeUrl}
        relatedSongs={[]}
      />
      <div className={navEventContainer}>
        <nav>
          <ul className={navEventItemWrapper}>
            <li>
              <a
                href="https://www.instagram.com/wellness0335"
                className={navMobileItem}
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram fontSize={18} color={vars.color.grey2} />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/612012_wine/"
                className={navMobileItem}
                target="_blank"
                rel="noreferrer"
              >
                <IoWine fontSize={18} color={vars.color.grey2} />
              </a>
            </li>
            <li>
              <div className={navEventLabelItem}>
                2025. 04. 12. 그늘 공연 @612012
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default EventPage;

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
