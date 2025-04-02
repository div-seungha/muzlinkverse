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
          width={180}
        />
        <h1 className="text-[24px] mb-[20px]">Under Construction...</h1>
        <p className="text-[14px]" style={{ fontWeight: 200 }}>
          현재 작업 중인 웹 사이트입니다.
        </p>
        <p className="text-[14px]" style={{ fontWeight: 200 }}>
          문의사항 -
          <br /> serendipity@beonanotherplanet.com
        </p>
      </div>
    </div>
  );
}
