// CF Gaming's latest release, read from GitHub's API once per build (every page shares the one request).
// The visitor's browser runs nothing for it: the download button is a plain link to GitHub's own file.
import { GITHUB_TOKEN } from "astro:env/server";
import { parseRelease, REPOSITORY, ReleaseError, type Release } from "./release-parse";

const LATEST_RELEASE = `https://api.github.com/repos/${REPOSITORY}/releases/latest`;
const STOPS = "The build stops rather than publish a broken download link.";

let latest: Promise<Release> | undefined;

/** The latest release. A failure isn't kept, so the dev server tries again on the next page it renders. */
export function getLatestRelease(): Promise<Release> {
  latest ??= fetchLatestRelease().catch((error: unknown) => {
    latest = undefined;
    throw error;
  });
  return latest;
}

async function fetchLatestRelease(): Promise<Release> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "cfgaming-site-build",
  };
  if (GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
  }

  let response: Response;
  try {
    response = await fetch(LATEST_RELEASE, { headers, signal: AbortSignal.timeout(20_000) });
  } catch (error) {
    throw new ReleaseError(`Couldn't reach GitHub for CF Gaming's latest release (${String(error)}). ${STOPS}`);
  }

  if (!response.ok) {
    const limited = (response.status === 403 || response.status === 429) && response.headers.get("x-ratelimit-remaining") === "0";
    const why = limited
      ? GITHUB_TOKEN
        ? " GitHub's limit for this token has been reached; try again after it resets."
        : " GitHub's limit of 60 requests an hour without a token has been reached: set GITHUB_TOKEN in the build's settings, or try again later."
      : response.status === 401
        ? " GITHUB_TOKEN was refused: check it, or remove it to build without one."
        : "";
    throw new ReleaseError(`GitHub answered ${response.status} for ${LATEST_RELEASE}.${why} ${STOPS}`);
  }

  try {
    return parseRelease(await response.json());
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new ReleaseError(`${message} ${STOPS}`);
  }
}
