// The site's pages, in one place: the header's and footer's links, and the "where next" cards, come from here.
import type { IconName } from "./icons";

export interface SitePage {
  href: string;
  title: string;
  /** A line for the "where next" cards. */
  summary: string;
  icon: IconName;
}

export const pages = {
  home: { href: "/", title: "Home", summary: "What CF Gaming does, and its download.", icon: "home" },
  beforeYouStart: {
    href: "/before-you-start/",
    title: "Before you start",
    summary: "The Mac it needs, Rosetta, and room for your games.",
    icon: "chip",
  },
  install: {
    href: "/install/",
    title: "Install",
    summary: "From the disk image to your first game, and updates by themselves.",
    icon: "download",
  },
  about: { href: "/about/", title: "About", summary: "Why CF Gaming exists: a family's games, on their Macs.", icon: "heart" },
  licences: {
    href: "/licences/",
    title: "Licences and source",
    summary: "Whose work CF Gaming builds on, and where its source is.",
    icon: "document",
  },
  privacy: { href: "/privacy/", title: "Privacy", summary: "What the site and the app keep: nothing on the site.", icon: "lock" },
} satisfies Record<string, SitePage>;

/** The header's links (Home is the name and tile beside them). */
export const mainNavigation: SitePage[] = [pages.beforeYouStart, pages.install, pages.about];

/** The footer's links to the site's own pages. */
export const footerNavigation: SitePage[] = [pages.licences, pages.privacy];

export const links = {
  appOnGitHub: "https://github.com/dusky101/CharddieGaming",
  appIssues: "https://github.com/dusky101/CharddieGaming/issues",
  siteOnGitHub: "https://github.com/dusky101/cfgaming-site",
  /** Marc's sons' YouTube channel, whose logo CF Gaming's is (Marc: "include their channel"). A link only, never an embed. */
  charddieGames: "https://www.youtube.com/@charddiegames",
};
