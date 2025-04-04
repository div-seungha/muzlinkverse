import { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }) => {
  const origin = new URL(request.url).origin;

  const content = `
User-agent: *
Allow: /

Sitemap: ${origin}/sitemap.xml
  `.trim();

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
};
