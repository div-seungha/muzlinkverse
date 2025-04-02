import { useRouteError } from "@remix-run/react";

const Error = () => {
  //   const error: any = useRouteError();

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
      <p className="text-center text-[14px]" style={{ fontWeight: 600 }}>
        입력한 내용을 다시 확인해주세요.
      </p>
      <p className="text-center text-[14px]" style={{ fontWeight: 400 }}>
        제목 입력 칸에는 곡의 정확한 제목을,
      </p>
      <p className="text-center text-[14px]" style={{ fontWeight: 400 }}>
        아티스트 입력 칸에는 아티스트 이름을...
      </p>
      <p
        className="text-center text-[12px] mt-[24px]"
        style={{ fontWeight: 200 }}
      >
        문제가 계속되면 아래로 연락 주세요!
      </p>
      <p className="text-center text-[12px]" style={{ fontWeight: 200 }}>
        serendipity@beonanotherplanet.com
      </p>
      {/* {error.status} - {error.statusText} */}
    </div>
  );
};

export default Error;
