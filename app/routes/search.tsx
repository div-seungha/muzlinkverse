import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, json, useActionData } from "@remix-run/react";
import { getSearchResult } from "~/.server/search";
import { LuSearch } from "react-icons/lu";
import { BsFillShareFill } from "react-icons/bs";
import LinkContainer from "~/components/LinkContainer";

export const meta: MetaFunction = () => {
  return [
    { title: "Muzlinkverse" },
    {
      name: "description",
      content: "Share the music you listening with us :)",
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
  const data = useActionData<SearchResultPage>();

  const handleCopy = () => {
    console.log("?????");

    const url = `https://muzlinkverse.com/${data?.id}`;

    window.navigator.clipboard.writeText(url);
    console.log("복사");
    alert("공유 링크가 복사되었습니다! 📋");
  };

  return (
    <div className="search-container">
      <Form action="/search" method="post" className="search-form">
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
          <LuSearch fontSize={20} />
        </button>
      </Form>

      {data && (
        <div className="search-result-container">
          <div className="confirm-container">
            <p>찾으시는 곡이 맞으신가요?</p>
            <button
              type="button"
              className="search-result-share"
              onClick={handleCopy}
            >
              <BsFillShareFill fontSize={20} />
              공유하기
            </button>
            <p>
              공유 버튼이 실행되지 않으면
              <br />
              https://muzlinkverse.com/{data.id}
              <br />위 URL을 직접 공유하실 수 있습니다
            </p>
            <iframe
              width="90%"
              height="90%"
              style={{ margin: "20px auto" }}
              src={`https://www.youtube.com/embed/${data.youtubeUrl}`}
              title={data.title + "-" + data.artist}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <LinkContainer
            title={data.title}
            artist={data.artist}
            coverImgUrl={data.artwork}
            bgColor={data.bgColor}
            youtubeLink={`https://www.youtube.com/watch?v=${data.youtubeUrl}`}
            apple={data.appleMusicUrl}
            spotify={data.spotifyUrl}
            releaseDate={data.releaseDate}
            youtubeMusic={`https://music.youtube.com/watch?v=${data.youtubeUrl}`}
            youtubeUrl={data.youtubeUrl}
          />
        </div>
      )}
    </div>
  );
}
