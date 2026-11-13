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
- **CF Gaming's logo** (the app's `CFGamingL.png`) stays off the site for now: it shows two cartoon children and pixel motifs like other makers' characters. A "CF" tile of Claude's own, in blue and purple, stands in for it.

## The steps

1. **Astro, in this folder as it is** (keeping its `.git`), written by hand rather than with `npm create astro` (which would fetch a template from GitHub too): `package.json`, `astro.config.mjs`, `tsconfig.json` (Astro's strict settings) and `.node-version` (24, as on this Mac; Cloudflare's build image defaults to 22.23.4). One `npm install`, with Marc's yes: `astro` 7.4.11, `@astrojs/check` 0.9.12 and `typescript` 6.0.3 (7.0.2 is outside `@astrojs/check`'s range, `^5.0.0 || ^6.0.0`): 277 packages for this Mac, about 193 MB on disk, measured from npm's metadata. Scripts: `dev`, `build`, `preview`, `check`. Astro's telemetry off.
2. **The look,** in `src/styles/`: the colours as custom properties, the midnight ground with its washes of blue from the top and purple from the bottom, the light look, glass cards, buttons, icon tiles, chips, and every fallback (`.claude/rules/house-style-web.md`).
3. **The shared parts:** a layout with each page's title, description and address, a skip link, the header (the CF tile and name, the pages, the download button) and the footer (Licences and source, Privacy, CF Gaming and this site on GitHub, and that CF Gaming isn't made or endorsed by Apple, Microsoft, Valve or any console's maker). A favicon of Claude's own.
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
