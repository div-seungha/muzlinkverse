import type {
  ActionFunctionArgs,
  LinksFunction,
  MetaFunction,
} from "@remix-run/node";
import { json, Link, useRouteError, useFetcher } from "@remix-run/react";
import { getSearchResult } from "~/.server/search";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { LuSearch } from "react-icons/lu";
import {
  searchForm,
  searchFormContainer,
  searchFormText,
  searchInput,
  searchInputButton,
  searchResultText,
  searchResultTextSecondary,
  searchTitle,
  searchTrackContainer,
} from "~/styles/search.css";
import TrackContainer from "~/components/TrackContainer";
import TrackFooter from "~/components/TrackFooter";

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

  try {
    const data = await getSearchResult({ title, artist });
    return json({ ...data });
  } catch (err) {
    console.error("❌ Server error in loader:", err);
    throw new Response("Something went wrong", { status: 500 });
  }
};

const Search = () => {
  const fetcher = useFetcher();
  const data = fetcher.data as SearchResultPage;
  const isSubmitting = fetcher.state === "submitting";

  return (
    <>
      <div className={searchFormContainer}>
        <fetcher.Form action="/search" method="post" className={searchForm}>
          <h1 className={searchTitle}>
            Let your friends know what song’s playing!
          </h1>
          <div>
            <p className={searchFormText}>찾으시는 곡의 이름이 무엇인가요?</p>
            <input
              className={searchInput}
              name="title"
              type="text"
              placeholder="곡의 제목을 정확히 입력해주세요"
            />
            <p style={{ marginTop: 20 }} className={searchFormText}>
              아티스트의 이름이 어떻게 되나요?
            </p>
            <input
              className={searchInput}
              name="artist"
              type="text"
              placeholder="아티스트의 이름을 정확히 입력해주세요"
            />
          </div>
          <p
            style={{ marginTop: 20, textAlign: "center" }}
            className={searchFormText}
          >
            곡명과 아티스트명을 정확히 입력해 주셔야
            <br />
            검색이 원활히 진행됩니다. <br />
            만약 검색했는데 결과가 잘못되었다면
            <br />
            좌측 느낌표 아이콘을 눌러 제보해주세요.
          </p>
          <button className={searchInputButton} type="submit">
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
          <div className={searchTrackContainer}>
            <p className={searchResultText}>
              찾으시는 곡이 맞나요?
              <br />
              아래의 공유 버튼을 눌러 링크를 복사해
              <br /> 친구에게 공유하세요!
            </p>
            <p className={searchResultTextSecondary}>
              공유 버튼이 동작하지 않는다면
              <br />
              아래의 url을 직접 복사하여 공유할 수 있습니다.
            </p>
            <Link to={`/${data.id}`}>
              <p
                style={{
                  marginTop: 24,
                  textDecoration: "underline",
                  color: "#000",
                }}
                className={searchResultText}
              >
                https://muzlinkverse.com/{data.id}
              </p>
            </Link>
            <TrackContainer
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
              relatedSongs={data?.relatedSongs}
            />
          </div>
        )}
      </div>
      <TrackFooter />
    </>
  );
};

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

export default Search;
