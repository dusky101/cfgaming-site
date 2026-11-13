# 06: a download link that never changes, and a rebuild at each release

The site's side of stage 27d in CF Gaming's plan. Written on 13 November 2026 after Marc's "Yes, write them". Agree it with Marc before it starts.

## The aim

The download always fetches the latest release, even before the site is rebuilt. The site shows the new version a few minutes after Marc publishes a release, without him pushing anything.

## What it waits for

27d in the app:
- `release.zsh` attaches a copy of the disk image called `CFGaming.dmg` to each release, without the version in its name and without "Mac" in it;
- once Marc says the release is published, it calls Cloudflare's deploy hook.

## The steps

1. **The button's link:** `https://github.com/dusky101/CharddieGaming/releases/latest/download/CFGaming.dmg`.
   - That link always means the latest release's file of that name. I'll check that in GitHub's docs on linking to releases.
   - The version, size and date are still read from GitHub's API as the site is built.
2. **The release checks in `src/lib/release-parse.ts`:**
   - The rule now is exactly one `.dmg`, and a release with both disk images would fail it. The new rule: exactly one `CFGaming.dmg`, with the versioned disk image allowed beside it.
   - The scratch cases updated to match: no `CFGaming.dmg`, two of them, a size of 0.
3. **The deploy hook:**
   - The site is a Worker, not a Pages project (phase 02.1). Cloudflare's Workers Builds docs, read 13 November, don't mention deploy hooks. So this phase first finds Workers Builds' own way to start a build from outside (its API, perhaps) and checks it in Cloudflare's docs.
   - It's kept in his Keychain, never in either repository: anyone with its address can make the site rebuild.
4. **Between a release and the rebuild,** for those few minutes, the button names the old version but fetches the new one. Nothing breaks.

## The checks

- `zsh .claude/skills/phase-report/checks.zsh` clean, and the scratch cases all stopped.
- After the first release with it:
  - the link fetches the new disk image;
  - the site shows the new version within minutes, with no push.

## For Marc

1. **The deploy hook,** made in Cloudflare and put into your Keychain under the name 27d's `release.zsh` looks for.
