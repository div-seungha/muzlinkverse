import * as Sentry from "@sentry/remix";
import { PassThrough } from "node:stream";

import type { AppLoadContext, EntryContext } from "@remix-run/node";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";

import createEmotionServer from "@emotion/server/create-instance";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "./CreateEmotionCache"; // 경로 확인

export const handleError = Sentry.wrapHandleErrorWithSentry(
  (error, { request }) => {
    // Custom handleError implementation
  }
);

const ABORT_DELAY = 5_000;

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  loadContext: AppLoadContext
) {
  return isbot(request.headers.get("user-agent") || "")
    ? handleBotRequest(
        request,
        responseStatusCode,
        responseHeaders,
        remixContext
      )
    : handleBrowserRequest(
        request,
        responseStatusCode,
        responseHeaders,
        remixContext
      );
}

function handleBotRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const cache = createEmotionCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(cache);

  return new Promise((resolve, reject) => {
    let didError = false;

    let html = "";
    const { pipe, abort } = renderToPipeableStream(
      <CacheProvider value={cache}>
        <RemixServer context={remixContext} url={request.url} />
      </CacheProvider>,
      {
        onAllReady() {
          const chunks = extractCriticalToChunks(html);
          const styles = constructStyleTagsFromChunks(chunks);

          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set("Content-Type", "text/html");

          resolve(
            new Response(stream, {
              status: didError ? 500 : responseStatusCode,
              headers: responseHeaders,
            })
          );

          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          didError = true;
          console.error(error);
        },
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });
}

function handleBrowserRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const cache = createEmotionCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(cache);

  return new Promise((resolve, reject) => {
    let didError = false;

    const body = new PassThrough();
    const stream = createReadableStreamFromReadable(body);

    let styles: string;

    const { pipe, abort } = renderToPipeableStream(
      <CacheProvider value={cache}>
        <RemixServer context={remixContext} url={request.url} />
      </CacheProvider>,
      {
        onShellReady() {
          const htmlChunks: string[] = [];
          const originalWrite = body.write.bind(body);

          body.write = (chunk: any, ...args: any[]) => {
            htmlChunks.push(chunk.toString());
            return originalWrite(chunk, ...args);
          };

          const chunks = extractCriticalToChunks(htmlChunks.join(""));
          styles = constructStyleTagsFromChunks(chunks);

          body.write(styles);

          responseHeaders.set("Content-Type", "text/html");

          resolve(
            new Response(stream, {
              status: didError ? 500 : responseStatusCode,
              headers: responseHeaders,
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          didError = true;
          console.error(error);
        },
      }
    );

    pipe(body);
    setTimeout(abort, ABORT_DELAY);
  });
}
