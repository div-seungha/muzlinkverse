import { captureRemixErrorBoundaryError } from "@sentry/remix";
import {
Links, Meta, Outlet, // Scripts,
ScrollRestoration, useRouteError
} from "@remix-run/react";

import "./tailwind.css";

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
      </body>
    </html>
  );
}

export const ErrorBoundary = () => {
  const error = useRouteError();
  captureRemixErrorBoundaryError(error);
  return <div>Something went wrong</div>;
};

export default function App() {
  return <Outlet />;
}