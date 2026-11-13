// The site's content collections. For now, one entry: the latest release's known issues, read with the download as
// the site is built (one request to GitHub, shared) and made into HTML by Astro's own Markdown.
import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { getLatestRelease } from "./lib/release";

const releaseNotes = defineCollection({
  loader: {
    name: "release-notes",
    load: async ({ store, parseData, renderMarkdown }) => {
      const release = await getLatestRelease();
      const id = "known-issues";
      const data = await parseData({ id, data: { version: release.version } });
      store.clear();
      store.set({ id, data, rendered: await renderMarkdown(release.knownIssues) });
    },
  },
  schema: z.object({ version: z.string() }),
});

export const collections = { releaseNotes };
