import type {
  ActionFunctionArgs,
  LinksFunction,
  MetaFunction,
} from "@remix-run/node";
import { json, Link, useRouteError, useFetcher } from "@remix-run/react";
import { getSearchResult } from "~/.server/search";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { LuSearch } from "react-icons/lu";
import LinkContainer from "~/components/LinkContainer";

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
    { title: "Muzlinkverse" },
    {
      name: "description",
      content: "자유롭게 음원 공유 링크를 생성하세요! :)",
    },
    {
      name: "author",
      content: "Kim Seungha, beonanotherplanet",
    },
    {
      property: "og:site_name",
      content: "Muzlinkverse - 음원 공유 링크 생성기",
    },
    {
      property: "og:title",
      content: "음원 공유 링크 생성기",
    },
    {
      property: "og:locale",
      content: "ko_KR",
    },
    {
      property: "og:url",
      content: "https://muzlinkverse.com/search",
    },
    {
      property: "og:description",
      content: "음원 링크를 활용하여 자유롭게 음악을 소개하고 공유하세요!",
    },
    {
      name: "keywords",
      content:
        "음원 공유, 음악, 인디뮤직, 음원, 음원 발매, 신보, 신보 발배, 스포티파이, 애플뮤직, 애플, 애플 뮤직, 유튜브 뮤직, 유튜브뮤직, 유튜브, 멜론, 벅스, flo, 네이버 바이브, naver vibe, youtube, youtube music, spotify, apple music",
    },
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const title = String(formData.get("title"));
  const artist = String(formData.get("artist"));

  const data = await getSearchResult({ title, artist });

  return json({ ...data });
};

export default function Search() {
  const fetcher = useFetcher();
  const data = fetcher.data as SearchResultPage;
  const isSubmitting = fetcher.state === "submitting";

  return (
    <div className="search-container">
      <fetcher.Form
        action="/search"
        method="post"
        className="search-form mt-[30px]"
      >
        <p className="search-input-form-text">
          찾으시는 곡의 이름이 무엇인가요?
        </p>
        <input
          className="search-input"
          name="title"
          type="text"
          placeholder="곡의 제목을 정확히 입력해주세요"
        />
        <p className="search-input-form-text">
          아티스트의 이름이 어떻게 되나요?
        </p>
        <input
          className="search-input"
          name="artist"
          type="text"
          placeholder="아티스트의 이름을 정확히 입력해주세요"
        />
        <button className="search-input-button" type="submit">
          {isSubmitting ? (
            <span className="loading">
              <AiOutlineLoading3Quarters fontSize={20} />
            </span>
          ) : (
            <LuSearch fontSize={20} />
          )}
        </button>
      </fetcher.Form>

      {fetcher.state === "idle" && data && (
        <div className="search-result-container">
          <LinkContainer
            id={data?.id}
            isSearch={true}
            title={data?.title}
            artist={data?.artist}
            coverImgUrl={data?.rawArtwork}
            bgColor={data?.bgColor}
            youtubeLink={`https://www.youtube.com/watch?v=${data?.youtubeUrl}`}
            apple={data?.appleMusicUrl}
            spotifyId={data?.spotifyUrl}
            releaseDate={data?.releaseDate}
            youtubeMusic={`https://music.youtube.com/watch?v=${data?.youtubeUrl}`}
            youtubeUrl={data?.youtubeUrl}
            melonUrl={data?.melonUrl}
          />
        </div>
      )}
    </div>
  );
}

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
        className="text-center text-[14px] my-[24px]"
        style={{ fontWeight: 700 }}
      >
        입력한 내용을 다시 확인해주세요.
      </p>
      <p className="text-center text-[14px]" style={{ fontWeight: 400 }}>
        제목 입력 칸에는 곡의 정확한 제목을,
      </p>
      <p className="text-center text-[14px]" style={{ fontWeight: 400 }}>
        아티스트 입력 칸에는 아티스트 이름을...
      </p>
      <p className="text-center text-[14px]" style={{ fontWeight: 400 }}>
        (곡과 일치하는 정보를 정확히 입력해주셔야 검색이 됩니다...)
      </p>
      <Link to="/search" viewTransition>
        <button
          className="w-[200px] my-[24px]"
          style={{ margin: "24px auto" }}
          type="button"
        >
          돌아가기
        </button>
      </Link>
      <p
        className="text-center text-[12px] mt-[24px]"
        style={{ fontWeight: 200 }}
      >
        문제가 계속되면 아래로 연락 주세요!
        <br />
        커스텀 웹 페이지가 필요하시다면
        <br />그 또한 아래로 연락주세요!
      </p>
      <p
        className="text-center text-[12px] mb-[40px]"
        style={{ fontWeight: 200 }}
      >
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
