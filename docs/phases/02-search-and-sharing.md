# 02: search and sharing

Part of stage 27c in CF Gaming's plan. Written on 13 November 2026 after Marc's "Yes, write them". Agree it with Marc before it starts.

## The aim

Search engines should find the site at `cfgaming.app` only. When someone shares a link to it, in Messages or anywhere else, the link should show CF Gaming's logo and a line about the app.

## What it waits for

Nothing in the app. The last checks need the Cloudflare project and `cfgaming.app` working, which Marc sets up.

## The steps

1. **`robots.txt`:** every page allowed, plus the sitemap's address. It's made from the site's address in `astro.config.mjs` (in `src/pages/robots.txt.ts`), so the address is never typed twice.
2. **A sitemap at `/sitemap.xml`:**
   - Made as the site is built, from the pages in `src/lib/site.ts`, and later the guide's (phase 03). It lists each page's address and nothing else; the not-found page stays out.
   - Written by hand in `src/pages/sitemap.xml.ts`. Seven pages don't need `@astrojs/sitemap`, so no dependency is added.
3. **A picture for shared links (`og:image`):**
   - 1200 × 630, Marc's logo on the midnight ground with its blue and purple washes.
   - Made once from the logo by a script using the sharp that comes with Astro, as the icons were. It's saved as `public/og-image.png` and listed in `CREDITS.md`.
   - Added to the sharing tags `BaseLayout.astro` already has:
     - `og:image` with its full address;
     - its width, height and `og:image:alt`;
     - `twitter:card` set to `summary_large_image`.
4. **`pages.dev` kept out of search:**
   - Two `_headers` rules send `X-Robots-Tag: noindex` on `https://:project.pages.dev/*` and `https://:version.:project.pages.dev/*`. This is Cloudflare's own example, in Pages' headers docs (read 13 November); the domain isn't affected.
   - Every page's canonical link already names `cfgaming.app`.
5. **`www.cfgaming.app` sends people to `cfgaming.app`:**
   - Marc does this in Cloudflare.
   - It can't go in `_redirects`, because Pages doesn't support redirects from one hostname to another (Cloudflare's docs, read 13 November).
   - Cloudflare's way is Bulk Redirects; the steps are under "For Marc".
6. **The checks script:** `checks.zsh` also checks that the sitemap lists every built page once, and that every address in it is a page.

## The checks

- `zsh .claude/skills/phase-report/checks.zsh` clean.
- `dist/robots.txt` and `dist/sitemap.xml` read through: every page once, and no not-found page.
- The shared-link picture opened at full size, and its tags on every page with full addresses.
- The site-style reviewer.
- After Marc's push:
  - `curl -I https://cfgaming-site.pages.dev/` shows `X-Robots-Tag: noindex`, and `curl -I https://cfgaming.app/` doesn't;
  - `curl -I "https://www.cfgaming.app/install/?a=1"` answers 301 to `https://cfgaming.app/install/?a=1`.
- A link to `cfgaming.app` pasted into Messages shows the picture (Marc).

## For Marc

1. **The redirect, in Cloudflare** (Pages' "Redirecting www to domain apex", read 13 November):
   1. Bulk Redirects: make a list with one entry. Source `www.cfgaming.app`, target `https://cfgaming.app`, status 301.
   2. Tick preserve query string, subpath matching, preserve path suffix and include subdomains.
   3. Make a Bulk Redirect rule that uses the list.
   4. DNS: add a record of type A, name `www`, IPv4 address `192.0.2.1`, proxied. That address is Cloudflare's placeholder: the redirect answers before anything reaches it.
2. **Google's Search Console and Bing's Webmaster Tools:** do you want them? Each needs an account of your own, and a DNS record to prove the domain is yours. The site gets found without them; they show how it's found and let you hand in the sitemap.
3. **The shared-link picture:** the logo alone, or with "CF Gaming" in words? Words would be drawn into the picture, and nothing reads them out. The link's title already says "CF Gaming".
