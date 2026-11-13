# 05: the controller pictures

Written on 13 November 2026 after Marc's "Yes, write them". Agree it with Marc before it starts.

## The aim

Each console CF Gaming plays is shown by its controller, in a picture Marc made with an AI image tool.

## What it waits for

Marc's pictures, his Dreamcast first.

## Each picture, before it's used (`.claude/rules/site-content.md`)

- **No console maker's logo or name on it:** Sega's swirl and "Dreamcast", Nintendo's, Sony's, Microsoft's, Valve's. I look at each one at full size and say what I see; Marc decides.
- **The tool's terms read, not assumed:**
  - they must allow a public site now and a paid product later;
  - `CREDITS.md` names the tool, the date the picture was made and the date the terms were read.
- **A PNG with a transparent background,** in `src/assets/controllers/<console>.png`. Astro makes WebP and AVIF from it.
- **A real controller's shape is still its maker's design.** The legal check before charging (stage 27g) covers that. Until then, the pictures say which consoles CF Gaming works with, and nothing more.

## The steps

1. **The pictures in,** each checked as above.
2. **Where they go:** Marc's choice (below).
3. **Alternative text:** "A Dreamcast controller". The console's name in plain words is fine; its logo isn't.
4. **Both looks:** a dark controller can disappear on the midnight ground. Each one sits on a soft glass tile if it needs one, checked in the dark look and the light.

## The checks

- `zsh .claude/skills/phase-report/checks.zsh` clean.
- Each picture in Claude's browser pane, dark and light.
- The site-style reviewer.
- Marc looks at each one, and at its line in `CREDITS.md`.

## For Marc

1. **Which tool,** and which consoles: the app's Controllers page has eight.
2. **Where:**
   - a row of them on Home under the consoles highlight;
   - or a page of their own: which consoles CF Gaming plays, and what each one needs (its BIOS, its discs).
   - A new page would be a phase of its own.
