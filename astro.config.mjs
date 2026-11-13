// @ts-check
import { defineConfig, envField } from "astro/config";

// CF Gaming's website: a static site, built once at each push and served by Cloudflare from cfgaming.app.
export default defineConfig({
  site: "https://cfgaming.app",
  // Cloudflare serves about/index.html at /about/, so every link ends in a slash and dev matches it.
  trailingSlash: "always",
  build: {
    format: "directory",
    // Styles in files, never inline, so the Content-Security-Policy in public/_headers needs no exceptions.
    inlineStylesheets: "never",
  },
  devToolbar: { enabled: false },
  env: {
    schema: {
      // Optional, read only at build time: a read-only GitHub token raises GitHub's limit of 60 requests an hour
      // (per IP address) for reading the latest release. Set in Cloudflare's build settings, never in the repository.
      GITHUB_TOKEN: envField.string({ context: "server", access: "secret", optional: true }),
    },
  },
});
