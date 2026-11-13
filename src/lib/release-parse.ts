// Turns GitHub's answer for CF Gaming's latest release into what the site shows, checking it first: the site
// must never publish a download link that's wrong. Kept apart from the fetch so it can be checked on its own.
import { z } from "astro/zod";

export const REPOSITORY = "dusky101/CharddieGaming";
export const RELEASES_PAGE = `https://github.com/${REPOSITORY}/releases`;
const DOWNLOAD_PREFIX = `https://github.com/${REPOSITORY}/releases/download/`;

const assetSchema = z.object({
  name: z.string().min(1),
  size: z.number().int(),
  browser_download_url: z.string(),
});

const releaseSchema = z.object({
  tag_name: z.string(),
  html_url: z.string(),
  published_at: z.string(),
  draft: z.boolean(),
  prerelease: z.boolean(),
  body: z.string().nullable(),
  assets: z.array(assetSchema),
});

export interface ReleaseFile {
  name: string;
  url: string;
  bytes: number;
}

export interface Release {
  /** "11.5", from the tag "v11.5". */
  version: string;
  published: Date;
  /** The release notes' "Known issues", as Markdown without its heading: Before you start shows them. */
  knownIssues: string;
  /** The disk image, for installing by hand. */
  diskImage: ReleaseFile;
  /** Wine's source changes, attached to every release, in order. */
  patches: ReleaseFile[];
}

export class ReleaseError extends Error {
  override name = "ReleaseError";
}

export function parseRelease(json: unknown): Release {
  const parsed = releaseSchema.safeParse(json);
  if (!parsed.success) {
    throw new ReleaseError(`GitHub's answer for the latest release isn't in the expected shape: ${parsed.error.message}`);
  }
  const release = parsed.data;

  if (release.draft || release.prerelease) {
    throw new ReleaseError(`The latest release (${release.tag_name}) is marked as a draft or pre-release.`);
  }

  const tag = /^v(\d+(?:\.\d+){0,3})$/.exec(release.tag_name);
  if (!tag?.[1]) {
    throw new ReleaseError(`The latest release's tag, "${release.tag_name}", isn't a version like v11.5.`);
  }
  const version = tag[1];

  if (!release.html_url.startsWith(`${RELEASES_PAGE}/`)) {
    throw new ReleaseError(`The latest release's page, ${release.html_url}, isn't on ${REPOSITORY}.`);
  }

  const published = new Date(release.published_at);
  if (Number.isNaN(published.getTime())) {
    throw new ReleaseError(`The latest release's date, "${release.published_at}", can't be read.`);
  }

  const filePrefix = `${DOWNLOAD_PREFIX}${release.tag_name}/`;
  const toFile = (asset: z.infer<typeof assetSchema>): ReleaseFile => {
    if (!asset.browser_download_url.startsWith(filePrefix)) {
      throw new ReleaseError(`${asset.name}'s address, ${asset.browser_download_url}, isn't under ${filePrefix}.`);
    }
    if (asset.size <= 0) {
      throw new ReleaseError(`${asset.name} has no size (${asset.size} bytes).`);
    }
    return { name: asset.name, url: asset.browser_download_url, bytes: asset.size };
  };

  const diskImages = release.assets.filter((asset) => asset.name.toLowerCase().endsWith(".dmg"));
  if (diskImages.length !== 1 || !diskImages[0]) {
    throw new ReleaseError(
      `The latest release (${release.tag_name}) has ${diskImages.length} disk images (.dmg); the site needs exactly one.`,
    );
  }

  const patches = release.assets
    .filter((asset) => asset.name.toLowerCase().endsWith(".patch"))
    .map(toFile)
    .sort((a, b) => a.name.localeCompare(b.name, "en"));
  // Wine's licence asks for its source changes to be offered with it, and the Licences page lists them.
  if (patches.length === 0) {
    throw new ReleaseError(`The latest release (${release.tag_name}) has none of Wine's source changes (.patch) attached.`);
  }

  return {
    version,
    published,
    knownIssues: knownIssuesFrom(release.body ?? "", release.tag_name),
    diskImage: toFile(diskImages[0]),
    patches,
  };
}

/** The notes' "## Known issues" section, up to the next heading of its level or above, checked for the web. */
function knownIssuesFrom(notes: string, tag: string): string {
  const lines = notes.replace(/\r\n?/g, "\n").split("\n");
  const start = lines.findIndex((line) => /^##\s+Known issues\s*$/i.test(line));
  if (start === -1) {
    throw new ReleaseError(`The latest release's notes (${tag}) have no "## Known issues" section for Before you start.`);
  }
  const rest = lines.slice(start + 1);
  const end = rest.findIndex((line) => /^#{1,2}\s/.test(line));
  const section = (end === -1 ? rest : rest.slice(0, end)).join("\n").trim();
  if (!section) {
    throw new ReleaseError(`The latest release's notes (${tag}) have an empty "Known issues" section.`);
  }
  // HTML would reach the page as it is (and <https://…> links count as HTML here); a code block's colours need inline
  // styles and a picture from elsewhere, both of which the site's Content-Security-Policy refuses; and the site has no
  // links to CF Gaming's GitHub (Marc, 13 November).
  if (/<\/?[a-z!][^>]*>/i.test(section.replace(/`[^`\n]*`/g, ""))) {
    throw new ReleaseError(`The latest release's known issues (${tag}) have HTML or a <link> in them, which the site doesn't show.`);
  }
  if (/^\s*(```|~~~)/m.test(section)) {
    throw new ReleaseError(`The latest release's known issues (${tag}) have a code block, which the site can't show.`);
  }
  if (/!\[/.test(section)) {
    throw new ReleaseError(`The latest release's known issues (${tag}) have a picture, which the site can't show.`);
  }
  if (/dusky101/i.test(section)) {
    throw new ReleaseError(`The latest release's known issues (${tag}) link to CF Gaming's GitHub, which the site doesn't.`);
  }
  return section;
}
