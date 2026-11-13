# 03: the guide on the web

The guide, from stage 27c of CF Gaming's plan. Written on 13 November 2026 after Marc's "Yes, write them". Agree it with Marc before it starts.

## The aim

CF Gaming's guide on the site at `/guide/`: all 45 pages in its eight sections, with the same words as the app's latest release. People can read how CF Gaming works before they download it, and search engines can find each page.

## What it starts from (read in the app on 13 November)

- **The words:**
  - 45 Markdown files in `CFMacGaming/Resources/Help/`, about 25,000 words.
  - The order, the sections, the titles and each page's one-line summary are in `Views/Help/HelpContent.swift`.
  - The eight sections: Getting started, Playing, Windows cases, Mac games and emulators, RetroArch, Graphics, Settings and looks, Reference.
- **The app's Markdown:**
  - Headings, lists, bold and **Tip:** notes.
  - ` ```figure ` blocks, each naming one of 39 live views from the app (`HelpFigures.swift` and the files beside it). A website can't show those.
- **Links between pages:** pages name each other by bold title ("see **A game's page**"), not by link.
- **Where it lives:**
  - The app's source is in `dusky101/CFMacGaming`, while the releases are on `dusky101/CharddieGaming`. The site's build can't count on reading the source repository; I haven't checked whether it's private.
  - So the guide is copied into this repository. That also gives Marc a diff to read before he pushes.

## The steps

1. **The copy, `npm run copy-guide` (`scripts/copy-guide.mjs`):**
   - It reads the guide as it is at the app's latest release tag, through `git show <tag>:…` in `~/Codingapps/CFMacGaming`. That's read-only, and unreleased words never reach the site.
   - It writes:
     - each page to `src/content/guide/<id>.md`;
     - the order, sections, titles and summaries, taken from `HelpContent.swift`, to `src/content/guide/guide.json`;
     - the tag it copied from.
   - It stops and says why if:
     - a page in the list has no file, or a file isn't in the list;
     - a figure's name isn't one it knows;
     - `HelpContent.swift` is no longer laid out the way it reads it.
2. **A content collection:** `guide`, in `src/content.config.ts`, with Astro's `glob()` loader and a schema, shown by Astro's own Markdown. No dependency is added.
3. **The app's Markdown on the web,** through a small remark plugin of the site's own (`src/lib/guide-markdown.ts`):
   - **Tip:** notes become the site's own callout.
   - A bold title that's another page's title becomes a link to that page.
   - ` ```figure ` blocks are left out until phase 04. The words round each figure already have to stand on their own for VoiceOver in the app; I'll read each one to check that.
4. **The pages:**
   - `/guide/`: the eight sections, with the site's own icons, and their pages as cards.
   - `/guide/<id>/`: the page itself, its section, the previous and next pages, and a way back to the guide.
   - Each page's description is its summary from the app. "Guide" goes into the header, and the guide's pages go into the sitemap.
   - The sections' icons aren't the app's SF Symbols. Apple's licence for those is about apps on its own platforms; I'll check its wording in this phase.
5. **The words stay the app's:**
   - The site never rewrites the guide, so the two can't drift apart.
   - Each page is read against `.claude/rules/site-content.md`: nothing private, no promise beyond what the app does, other makers' names in plain words.
   - Anything that needs changing is put to Marc for the app's own guide, and reaches the site at the next copy.
6. **No search box:** one would need JavaScript in the browser or an outside service. Every page is in the sitemap instead.

## The checks

- `zsh .claude/skills/phase-report/checks.zsh` clean, including every guide page's title and description.
- The copy's own checks (45 pages, 8 sections, every figure known, every bold title that should be a link turned into one), and a second run changing nothing.
- One `h1` on each guide page and headings in order, checked across all 45.
- The site-style reviewer.
- Pages at a phone's width and a desktop's, dark and light, in Claude's browser pane.
- Marc reads a few pages against the app's.

## For Marc

1. **"Guide" in the header,** between Install and About: yes?
2. **At each release,** a session runs `npm run copy-guide` and commits the change, and you push. Once phase 06's rebuild is in, this is still a commit: the guide lives in this repository.
