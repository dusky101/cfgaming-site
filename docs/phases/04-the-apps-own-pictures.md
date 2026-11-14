# 04: the app's own pictures

Pictures for stage 27c, coming from the app's 27b. Written on 13 November 2026 after Marc's "Yes, write them". Agree it with Marc before it starts.

## The aim

Home, Install and the guide show CF Gaming as it really is. The pictures are exported by the app itself, with made-up and homebrew games, in the dark look and the light.

## What it waits for

- **27b in the app:** its Debug-only **Export Website Pictures** command. It opens each screen with made-up games in a test data root, and captures each window, dark and light, into this repository.
- **Phase 03,** for the guide's figures.

## What the app's export (27b) gives the site (agreed 14 November)

Marc chose "The app's export (27b) first" for the site's pictures. The export is made in the app's own project; this is what the site needs from it.

- **Where:** this repository's `src/assets/app/`, as PNGs, one per window and look: `<screen>-dark.png` and `<screen>-light.png`.
- **The windows** (`<screen>` in brackets):
  - Home, with its shelves of made-up games (`home`);
  - a Windows case's page, with its column and Global settings (`windows-case`);
  - a console case's page through RetroArch (`console-case`);
  - Custom Setup (`custom-setup`);
  - Texture Packs (`texture-packs`);
  - a page of the guide with a figure (`guide`);
  - the first window, Auto Setup (`first-run`), if the export can open it.
- **How:**
  - the window alone, at the Mac's own resolution (2×), the same size for every window;
  - with its shadow or without, but the same for all.
- **Never in them:**
  - real box art (the publishers'), or any console maker's logo;
  - the Controllers page or any of the app's controller drawings (Marc: "i don't want them in the website");
  - anything private: People with the family's names, a folder path with Marc's name, the family's Macs.
  - Made-up or homebrew games only, with covers of the app's own.
- **Then this phase checks each picture** against `.claude/rules/site-content.md` before it's used, and commits them on `preview`.
- **The `www` redirect** (phase 02's last step) is set up when these pictures go live on `cfgaming.app` (Marc, 14 November: "With the pictures' go-live").

## The steps

1. **The folder, agreed with 27b:** `src/assets/app/`, with `<name>-dark.png` and `<name>-light.png`. Astro makes each size and format from them.
2. **The visitor's own look:**
   - Each picture shows the dark capture, or the light one when the Mac is in light mode. It uses one `<picture>` with a source for `(prefers-color-scheme: light)`.
   - The files come from Astro's `getImage()` if `<Picture>` can't do this itself. I'll check Astro's docs in this phase.
3. **Home:**
   - CF Gaming's Home window under the download.
   - One picture beside each highlight: a Windows case, a console's case page, Custom Setup, Texture Packs.
4. **Install:** CF Gaming's first window, if 27b exports it. The disk image and the Finder are macOS's own, not the app's.
5. **The guide:** each ` ```figure ` block becomes its exported picture, with alternative text that says what it shows.
6. **Never the controller drawings:**
   - The app's own drawings stay off the site (Marc: "i don't want them in the website"), so these figures stay out as they are now: `console-pad`, `controller-test` and `controller-test-own-layout`.
   - The same goes for any other figure that shows a controller drawing.
7. **Every picture looked at before it's used,** against `.claude/rules/site-content.md`:
   - made-up or homebrew games only, never real box art;
   - no console maker's logo;
   - nothing private: no user name, no folder path with Marc's name in it, nothing about the family's Macs.
8. **Fast and steady:**
   - Each picture has its width and height, so nothing shifts as it loads. Pictures below the first screen load lazily.
   - `CREDITS.md` lists them as CF Gaming's own.

## The checks

- `zsh .claude/skills/phase-report/checks.zsh` clean.
- Home's weight on a phone measured before and after.
- Each picture in Claude's browser pane, dark and light, at a phone's width and a desktop's.
- The site-style reviewer.
- Marc looks at every picture before he pushes.

## For Marc

1. **Which screens** you want on Home, if not the four above.
