import { LoaderFunction } from "@remix-run/node";
import { getIds } from "~/.server/getIds";

export const loader: LoaderFunction = async ({ request }) => {
  const origin = new URL(request.url).origin;
  const ids = await getIds();

  const urls = ids
    .map((id) => {
      return `<url><loc>${origin}/${id}</loc></url>`;
    })
    .join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls}
    </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
};
