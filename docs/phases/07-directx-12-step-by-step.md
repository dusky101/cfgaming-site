# 07: DirectX 12 games, step by step

The site's side of stages 27e and 27f in CF Gaming's plan. Written on 13 November 2026 after Marc's "Yes, write them". Agree it with Marc before it starts.

## The aim

A page of its own, `/directx-12/`, for when the public download no longer carries Apple's D3DMetal. It explains that DirectX 12 games need Apple's Game Porting Toolkit, downloaded with a free Apple developer account. It also says what CF Gaming does for them by itself.

## Why, in Marc's words (13 November)

"One of the things though about making the website was so i could charge a small amount for it. So i will also go back to the other project to create my app without the gptk4 in it. so we will need a page to explain that the user will need to get a free Apple Dev account to download the gptk4 program. so if you can create that too. but just hide it for now."

The site's Licences and source page already says why: D3DMetal is used "under the Game Porting Toolkit licence, which allows non-commercial distribution".

## Done early, as a draft (13 November)

- **The page:**
  - `src/drafts/directx-12.astro`, written from the plan's 27e, ahead of the app.
  - `npm run dev` shows it at `/directx-12/`. `npm run build` leaves it out (`astro.config.mjs` adds the route for the dev server only), so it isn't on `cfgaming.app`, and nothing links to it.
  - Its words are in the public repository, as every page's are.
- **Proved on 13 November:**
  - Apple's Game Porting Toolkit page offers "Game Porting Toolkit 4", behind an Apple sign-in at `developer.apple.com/download/all/`.
  - Apple's account help says a free registration "with your Apple Account" means accepting the Apple Developer Agreement.
  - Apple uses the name "Apple Account".
- **Not proved:**
  - Apple's pages don't say whether the toolkit needs only the free registration, or the paid Apple Developer Program. The page says free, on Marc's word.
  - They don't name D3DMetal, and they don't say who may use the toolkit or how: they describe it for developers evaluating their games.

## What it waits for

- **27e in the app:** **Add DirectX 12…**, and its page in the app's guide.
- **27f:** the public build without Apple's files.

## The steps

1. **Every line of the draft checked against the app's own flow,** and changed to match:
   - the name **Add DirectX 12…**, and where it is: Settings › Engine, and offered when setting up a DirectX 12 game;
   - that a free Apple developer account is enough (Marc downloads it with one);
   - "Games made for DirectX 11 and older don't need it". Today **Auto** chooses D3DMetal for every 64-bit game, so this depends on what 27e makes Auto do without it.
   - whether macOS asks to let CF Gaming see the Downloads folder (if so, the page says so);
   - that CF Gaming checks the files are Apple's, copies D3DMetal into the person's own CF Gaming folder, and offers to remove the disk image;
   - once for each account on the Mac, kept through CF Gaming's updates;
   - the toolkit's version (4 today), or no version if the app takes later ones.
2. **Published:**
   - the page moved into `src/pages/`, and its draft entry taken out of `astro.config.mjs`;
   - added to `src/lib/site.ts`, linked from Before you start and Home's Windows highlight;
   - added to the sitemap (from `src/lib/site.ts`, as phase 02 makes it).
3. **Home, About and Licences and source:** changed where they say D3DMetal comes with the app. Licences says D3DMetal is Apple's, downloaded by each person under their own licence from Apple.
4. **Pictures of the steps,** if 27b exports them, shown the way phase 04 shows pictures.

## The checks

- `zsh .claude/skills/phase-report/checks.zsh` clean, with the page now in `dist`.
- The steps read against the app's own Add DirectX 12… flow, one by one.
- The site-style reviewer.
- Marc follows the steps on a Mac that hasn't had D3DMetal.

## For Marc

1. **The plan's first question** (which builds carry D3DMetal), before this phase starts.
2. **Apple's terms for the toolkit:** they come with its download, and I haven't read them. Whether they let someone use D3DMetal with an app that's sold belongs in 27g's legal check before charging.
