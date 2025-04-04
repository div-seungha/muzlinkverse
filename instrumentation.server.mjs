import * as Sentry from "@sentry/remix";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: "https://5e7e55894bf57e110d3ce9479610f16f@o4508897373519872.ingest.us.sentry.io/4509085287120896",
    tracesSampleRate: 1,
  });
}
