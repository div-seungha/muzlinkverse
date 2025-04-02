import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, json, useActionData } from "@remix-run/react";
import { getSearchResult } from "~/.server/search";
import { LuSearch } from "react-icons/lu";
// import { BsFillShareFill } from "react-icons/bs";
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
          <LinkContainer
            id={data.id}
            isSearch={true}
            title={data.title}
            artist={data.artist}
            coverImgUrl={data.artwork}
            bgColor={data.bgColor}
            youtubeLink={`https://www.youtube.com/watch?v=${data.youtubeUrl}`}
            apple={data.appleMusicUrl}
            spotifyId={data.spotifyUrl}
            releaseDate={data.releaseDate}
            youtubeMusic={`https://music.youtube.com/watch?v=${data.youtubeUrl}`}
            youtubeUrl={data.youtubeUrl}
          />
        </div>
      )}
    </div>
  );
}
