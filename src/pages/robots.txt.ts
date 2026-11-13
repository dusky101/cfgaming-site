// robots.txt: every page may be read by search engines, and here's the sitemap. Made at build time from the site's
// address in astro.config.mjs, so the address is never typed twice.
import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  if (!site) throw new Error("astro.config.mjs has no site address, which robots.txt needs for the sitemap's.");
  const body = ["User-agent: *", "Allow: /", "", `Sitemap: ${new URL("/sitemap.xml", site)}`, ""].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
