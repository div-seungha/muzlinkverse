import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Muzlinkverse" },
    {
      name: "description",
      content: "Share the music you listening with us :)",
    },
  ];
};

export default function Index() {
  return (
    <div className="index-container">
      <div>
        <img
          className="under-construction"
          src="/under-construction.webp"
          alt="영차 영차... 아직 작업 중인 사이트입니다."
          width="20%"
        />
        <h1>Under Construction...</h1>
        <p>현재 작업 중인 웹 사이트입니다.</p>
        <p>
          문의사항 -
          <br /> serendipity@beonanotherplanet.com
        </p>
      </div>
    </div>
  );
}
