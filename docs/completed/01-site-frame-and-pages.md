# 01: the site's frame and first pages

Stage 27c.1 of CF Gaming's plan. Agreed with Marc on 13 November 2026; the questions were in CF Gaming's brief, `~/Codingapps/CFMacGaming/handover/next-session-website.md`.

## The aim

The site at its first push: its look, its shared parts and its first pages, with the download working, ready for Marc to connect Cloudflare and `cfgaming.app`.

## Marc's answers (13 November)

- **Built with Astro** (Marc asked why, as it had been chosen for him; with the alternatives weighed: "Keep Astro").
- **`docs/` public,** kept free of anything private.
- **About:** Claude drafts it in Marc's voice from `docs/ABOUT.md`; Marc edits it before he pushes.
- **The look:** blue and purple, the app's Midnight Arcade look: blue `#1F87FF` as the main colour, purple `#A35CFF` the second, the midnight ground `#131C3D`, and navy `#15182E` for text on their gradient.
- **Looking at the pages:** Claude may run `npm run dev` on this Mac and look in its own browser pane.
- **Analytics:** none.
- **Home's highlights,** in order: Windows games and Steam, then the consoles through RetroArch, then Custom Setup and texture packs; controllers, recording with ⌃⇧R and the guide further down.
- **CF Gaming's logo** (the app's `CFGamingL.png`): first left off the site (it shows two cartoon children, and pixel motifs like other makers' characters), then, during the phase, Marc: "CAn you use my Logo please?", and "I made it for their Youtube channel ages ago." So it's the site's logo: in the header, the footer, at the top of Home, and the browser's icon.
- **Their channel, named and linked** (Marc: "no include their channel.. they will love the free advertising. https://www.youtube.com/@charddiegames"): on About, in the footer and in `CREDITS.md`. A link only: no YouTube embed, script or logo.

## The steps

1. **Astro, in this folder as it is** (keeping its `.git`), written by hand rather than with `npm create astro` (which would fetch a template from GitHub too): `package.json`, `astro.config.mjs`, `tsconfig.json` (Astro's strict settings) and `.node-version` (24, as on this Mac; Cloudflare's build image defaults to 22.23.4). One `npm install`, with Marc's yes: `astro` 7.4.11, `@astrojs/check` 0.9.12 and `typescript` 6.0.3 (7.0.2 is outside `@astrojs/check`'s range, `^5.0.0 || ^6.0.0`): 277 packages for this Mac, about 193 MB on disk, measured from npm's metadata. Scripts: `dev`, `build`, `preview`, `check`. Astro's telemetry off.
2. **The look,** in `src/styles/`: the colours as custom properties, the midnight ground with its washes of blue from the top and purple from the bottom, the light look, glass cards, buttons, icon tiles, chips, and every fallback (`.claude/rules/house-style-web.md`).
3. **The shared parts:** a layout with each page's title, description and address, a skip link, the header (the logo and name, the pages, the download button) and the footer (Licences and source, Privacy, CF Gaming and this site on GitHub, and that CF Gaming isn't made or endorsed by Apple, Microsoft, Valve or any console's maker). The browser's icon, made from the logo.
4. **The download, at build time:** the latest release of `dusky101/CharddieGaming` read from GitHub's API as the site is built (`/repos/dusky101/CharddieGaming/releases/latest`): the one asset ending `.dmg`, its `browser_download_url` and `size`, the tag's version, the date. Checked before it's used: exactly one `.dmg`, a size above zero, an address under `https://github.com/dusky101/CharddieGaming/releases/download/`, a tag like `v11.5`. An optional `GITHUB_TOKEN` (read-only, set in Cloudflare by Marc, never in the repository), as GitHub allows 60 requests an hour without one, per IP address, and Cloudflare's build machines are shared. If anything is wrong, the build stops rather than publish a broken link.
5. **The pages:**
   - **Home:** what CF Gaming is in a sentence, the download with its version and size, the highlights in words (pictures in a later phase).
   - **Before you start:** a Mac with Apple silicon and macOS 27, Rosetta (CF Gaming explains how to install it), room for the app and games, and what consoles need.
   - **Install:** the disk image, Install, the shortcut, and updates by themselves.
   - **About:** Marc's story, drafted from `docs/ABOUT.md` for him to change.
   - **Licences and source:** every credit from CF Gaming's Settings › About and its release notes, Wine's source changes (the release's patches, read with the download) and CodeWeavers' source.
   - **Privacy:** the site keeps nothing; what the app keeps and where.
   - **Not found:** a `404.html` (without one, Cloudflare Pages answers every unknown address with Home).
6. **`public/_headers`:** a strict Content-Security-Policy (nothing from anywhere else can load) and the other security headers. Styles go in files, not inline (`build.inlineStylesheets: 'never'`), so the policy needs no exceptions. Links end in `/`, as Cloudflare serves `about/index.html` at `/about/`.
7. **`CREDITS.md`**, started (no pictures yet).

## The checks

- `zsh .claude/skills/phase-report/checks.zsh` clean.
- The site-style reviewer.
- Each page in Claude's browser pane, dark and light, at a phone's width and a desktop's (Marc's yes).
- Marc's look at it, in his browser, before he pushes.

## For Marc (once it's done)

1. Each page in the dark look and the light, on the Mac and a phone.
2. The download button: the version and size of 11.5, and the file it fetches.
3. About: your words.

## Done (13 November 2026)

### What it does now
- **Seven pages:** Home, Before you start, Install, About, Licences and source, Privacy, and a page for any address the site doesn't have. Each has its own title, description and address.
- **The look:** the app's Midnight Arcade colours (blue, purple, navy on midnight) with their washes from the top and the bottom, glass cards, icon tiles, chips, a bold blue-to-purple band, and buttons in the theme's colours. Dark first; the light look follows the Mac's setting.
- **Marc's logo:** large at the top of Home, beside "CF Gaming" in the header and the footer, and as the browser's and the iPhone's icon. About and the footer link to [Charddie Games](https://www.youtube.com/@charddiegames).
- **The download, read from GitHub as the site is built:** "Download CF Gaming 11.5", straight to `CFMacGaming-11.5.dmg` on GitHub's servers, with "Disk image, 535 MB · Released 12 November 2026". The build stops if the release isn't right (no disk image or two, no size, an address elsewhere, a tag that isn't a version, a draft or pre-release, no patches, or GitHub not answering).
- **Licences and source** lists the release's 13 patches to Wine, read with the download, and CF Gaming 11.5's credits.
- **Nothing on the visitor:** no JavaScript, no cookies, no analytics, no web fonts, nothing from another site. `_headers` tells browsers to load nothing from anywhere else.

### How it's built
| File | Change |
|---|---|
| `package.json`, `package-lock.json` | Astro 7.4.11, `@astrojs/check` 0.9.12, TypeScript 6.0.3 (266 packages, 0 vulnerabilities, 209 MB on disk); `dev`, `build`, `preview`, `check`, each with Astro's telemetry off |
| `.node-version` | Node 24 for Cloudflare's build, as on this Mac |
| `astro.config.mjs` | `https://cfgaming.app`; links ending in `/`; styles in files, never inline; the optional `GITHUB_TOKEN`, read only at build time |
| `tsconfig.json` | Astro's strict settings |
| `src/styles/tokens.css` | The app's six colours, Midnight Arcade's ground and navy, the light look's colours, glass, gradients; more contrast |
| `src/styles/global.css` | Type, layout, the washes, glass cards, card links that lift, buttons, icon tiles, chips, the band, steps, ticks; the fallbacks for Reduce Transparency, more contrast, Reduce Motion and forced colours |
| `src/lib/release-parse.ts` | Reads and checks GitHub's answer (with Astro's own Zod) |
| `src/lib/release.ts` | Asks GitHub for the latest release once per build, with the token if there is one, and says why when GitHub refuses |
| `src/lib/format.ts` | Sizes as the Finder counts them, dates in British English as they fall in the UK |
| `src/lib/site.ts` | The pages and the outside links, in one place |
| `src/lib/icons.ts`, `src/components/Icon.astro` | The site's own symbols |
| `src/components/Logo.astro`, `src/assets/brand/cf-gaming-logo.png` | Marc's logo, made at each size it's shown as AVIF, WebP and PNG by Astro |
| `src/components/DownloadButton.astro` | The download, small (header) or large (with its facts) |
| `src/components/SiteHeader.astro`, `SiteFooter.astro`, `PageHeader.astro`, `NextSteps.astro` | The header, the footer, each page's top, and the "where next" cards |
| `src/layouts/BaseLayout.astro` | Every page's frame: title, description, address, icons, skip link |
| `src/pages/*.astro` | The seven pages |
| `public/_headers` | The Content-Security-Policy and other security headers; a year's caching for Astro's named files |
| `public/favicon-32.png`, `favicon-192.png`, `apple-touch-icon.png` | The browser's and iPhone's icons, made from the logo |
| `CREDITS.md` | The logo and the site's symbols |

### Checks
| Command | Result |
|---|---|
| `npm run build` | Passes with no warnings: 7 pages |
| `npm run check` | 0 errors, 0 warnings, 0 hints |
| Each page's title and description | All 7 have both |
| The built pages | No `<script>`, `<style>` or `style=` in any; every link inside the site goes to a page that's there; no words run together |
| The release's checks (a scratch script) | A good release read right; the eight bad kinds above each stop the build |
| `GITHUB_TOKEN` | With a made-up token, GitHub answers 401 and the build stops with "GITHUB_TOKEN was refused"; without one, it builds |
| Site-style review | Fixed: the focus ring on the band's button (navy now; the blue was about 1.5:1 there); "DirectX 9 to 12" (now the guide's own: D3DMetal for 12, DXMT for 10 and 11, Wine's own for older games, Auto choosing); Privacy's promise that "nothing goes to its maker" (now only what the guide and the code show); an empty list of patches (now stops the build); the sticky header covering what focus moves to (`scroll-padding-top`); Home's description cut to fit search results. Not changed: the OpenEmu artists' names (the reviewer found them nowhere in the app, but they're in 11.5's own Settings › About, `git show v11.5:CFMacGaming/Views/Settings/AboutSettings.swift`, line 43; 27a has taken them out since); HSTS's `includeSubDomains` (browsers already treat every `.app` address as HTTPS-only); "M1 or later" and About This Mac (true, though not in the guide); no tile on Install's "Four steps" (its numbered tiles are enough) |
| In a browser | Looked at in Claude's browser pane, with Marc's yes: Home, Install, Licences and About in the dark look at a desktop's width; Home in the light look; all 7 pages at a phone's width (no sideways scrolling, one `h1` each, headings in order); the skip link and keyboard focus. Not seen in a browser: Reduce Transparency, more contrast, Reduce Motion and forced colours (the pane can only switch light and dark; the reviewer read them in the code), and Safari |

What's inferred, not proved: that a failed build on Cloudflare leaves the live site as it was; that Sparkle sends nothing about the Mac with its update checks (nothing in CF Gaming turns its system profile on, and it's off unless turned on, from memory of Sparkle's documentation); that CF Gaming has no analytics (from a search of the app's code for analytics and telemetry).

### For Marc
1. **Every page, dark and light, on the Mac and a phone:** `npm run dev`, then `http://localhost:4321`.
2. **The download:** "Download CF Gaming 11.5", 535 MB, fetching `CFMacGaming-11.5.dmg` without a GitHub page.
3. **About:** a draft in your voice from `docs/ABOUT.md`, with Charddie Games linked. Change anything that isn't how you'd say it.
4. **Privacy:** it says "CF Gaming has no analytics: nothing in it counts or reports how you use it." Is that right as you know the app?
5. **The logo in `CREDITS.md`:** if you made it with an AI tool, which one? Its terms need to allow a public site, as for the controller pictures.
6. **Licences:** the credits are 11.5's. At the release with 27a, OpenEmu's line comes out, as it has in the app.
