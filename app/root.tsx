import { captureRemixErrorBoundaryError } from "@sentry/remix";
import {
  Links,
  Meta,
  Outlet, // Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";

import "./tailwind.css";
import Footer from "./components/Footer";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-LJRQ5HGF2Z"
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-LJRQ5HGF2Z');`,
        }}
      />
      <body>
        {children}
        <ScrollRestoration />
        <Footer />
      </body>
    </html>
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

export default function App() {
  return <Outlet />;
}
