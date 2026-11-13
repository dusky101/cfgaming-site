# 02: search and sharing

Part of stage 27c in CF Gaming's plan. Written on 13 November 2026 after Marc's "Yes, write them". Agree it with Marc before it starts.

## The aim

Search engines should find the site at `cfgaming.app` only. When someone shares a link to it, in Messages or anywhere else, the link should show CF Gaming's logo and a line about the app.

## What it waits for

Nothing in the app. The last checks need the Cloudflare project and `cfgaming.app` working, which Marc sets up.

## Marc's go-ahead (13 November)

- **Cloudflare:** "Ok i worked it out... its now on cfgaming.app." The site is live from the Pages project.
- **"Then start phase 2."** The two questions below were still open when it started:
  - **The shared-link picture:** the logo already says "CF Gaming" in its own lettering, so no words are added to it.
  - **Search Console and Bing:** Marc's accounts if he wants them; nothing on the site depends on them.

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

## Done (13 November 2026)

### What it does now
- **`https://cfgaming.app/robots.txt`:** every page may be read by search engines, and it gives the sitemap's address.
- **`https://cfgaming.app/sitemap.xml`:** the six pages' addresses. The not-found page and the DirectX 12 draft aren't in it.
- **A shared link shows a picture:** Marc's logo, centred on the site's midnight ground with its blue and purple washes (1200 × 630, 72 KB). Every page has it, with its title and description.
- **The project's `pages.dev` addresses stay out of search:** Cloudflare sends `X-Robots-Tag: noindex` on them, but not on `cfgaming.app`. Every page already names `cfgaming.app` as its own address.
- **The not-found page** says `noindex` and has no address of its own. Before, it claimed `https://cfgaming.app/404/`.

### How it's built
| File | Change |
|---|---|
| `src/pages/robots.txt.ts` | New: made at build time from the site's address in `astro.config.mjs` |
| `src/pages/sitemap.xml.ts` | New: made at build time from the pages in `src/lib/site.ts`, its addresses escaped for XML; no dependency added |
| `src/layouts/BaseLayout.astro` | `og:image` with its full address, type, size and alternative text; `twitter:card` `summary_large_image`; `notFound`, which leaves out the canonical link and `og:url` and adds `noindex` |
| `src/pages/404.astro` | Uses `notFound` |
| `public/og-image.png` | New: the shared-link picture, drawn once from the logo with Astro's own sharp (a scratch script, as the icons were) |
| `public/_headers` | Two rules giving `X-Robots-Tag: noindex` on `https://:project.pages.dev/*` and `https://:version.:project.pages.dev/*`, Cloudflare's own example from Pages' headers docs |
| `CREDITS.md` | The logo's row names `public/og-image.png` |
| `.claude/skills/phase-report/checks.zsh` | Kept on this Mac, not in the repository. Now also checks that every built page is in the sitemap once, every address in it is a page, and `robots.txt` names it |

### Checks
| Command | Result |
|---|---|
| `npm run build` | Pass, no warnings |
| `npm run check` | Pass: 0 errors, 0 warnings, 0 hints |
| Titles and descriptions | Pass, every page |
| Sitemap and `robots.txt` (new check) | Pass, 6 pages. Run on a broken copy of `dist`, it found all three faults put in: a page left out, a page missing from the sitemap, and an address that isn't a page |
| Sharing tags | `og:image` and `twitter:card` once on every built page |
| Site-style review | No faults. Four suggestions: one taken (the not-found page's address, above). Not changed: the picture's alternative text could say the logo reads "CF Gaming" (link previews rarely read it out); `public/` files aren't renamed when they change, so a new picture can stay in other sites' caches for a while (usual for shared-link pictures); the `pages.dev` rules can only be proved live |
| In a browser | Looked at in Claude's browser pane, with Marc's yes: the dev server answers `/robots.txt`, `/sitemap.xml` and `/og-image.png`. The picture looked at at full size |
| Live, after Marc's push | Not done yet: the `pages.dev` header, Messages' preview and the `www` redirect |

### For Marc
1. **Push,** then check, once Cloudflare has built it:
   - `curl -sI https://cfgaming.app/` shows no `x-robots-tag`;
   - the same on your project's `pages.dev` address shows `x-robots-tag: noindex`. Tell me that address and I'll check it.
2. **Messages:** paste `https://cfgaming.app` into a message to yourself. The preview should show the logo on midnight blue. Messages remembers previews, so the first share after the push is the one to look at.
3. **`www.cfgaming.app`:** the Bulk Redirect and its DNS record, as in "For Marc" above. I'll check it answers 301 once it's in.
4. **Search Console and Bing:** only if you want them.
