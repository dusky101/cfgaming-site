// sitemap.xml: the address of every page, from the list in src/lib/site.ts, made at build time. The not-found page
// and drafts aren't in that list, so they stay out. The checks script makes sure the list and the built pages agree.
import type { APIRoute } from "astro";
import { pages } from "../lib/site";

const escapeXml = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

export const GET: APIRoute = ({ site }) => {
  if (!site) throw new Error("astro.config.mjs has no site address, which the sitemap needs.");
  const entries = Object.values(pages).map((page) => `  <url><loc>${escapeXml(new URL(page.href, site).href)}</loc></url>`);
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries,
    "</urlset>",
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
