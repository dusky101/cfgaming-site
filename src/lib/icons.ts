// The site's own symbols, drawn for it on a 24-point grid as strokes (and a few filled dots). No one else's icons
// or logos: SF Symbols may only be used in Apple's own platforms' apps, and makers' logos never appear on the site.

interface IconDrawing {
  /** Stroked paths. */
  paths: string[];
  /** Filled dots: [x, y, radius]. */
  dots?: [number, number, number][];
}

const drawings = {
  download: { paths: ["M12 4v11", "M7 10.5l5 5 5-5", "M5 19.5h14"] },
  monitor: { paths: ["M5 4.5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z", "M9 20h6", "M12 16.5V20"] },
  gamepad: {
    paths: [
      "M7.6 7.5h8.8a4.6 4.6 0 0 1 4.5 5.5l-.7 3.5a2.4 2.4 0 0 1-4.2 1L14.4 16H9.6L8 17.5a2.4 2.4 0 0 1-4.2-1L3.1 13a4.6 4.6 0 0 1 4.5-5.5z",
      "M8.2 10.4v3.2",
      "M6.6 12h3.2",
    ],
    dots: [
      [15.4, 11.2, 1.05],
      [17.4, 13, 1.05],
    ],
  },
  sliders: { paths: ["M4 7h9", "M17.5 7H20", "M4 17h3.5", "M12 17h8", "M15.25 4.75a2.25 2.25 0 1 1 0 4.5a2.25 2.25 0 1 1 0-4.5z", "M9.75 14.75a2.25 2.25 0 1 1 0 4.5a2.25 2.25 0 1 1 0-4.5z"] },
} satisfies Record<string, IconDrawing>;

export type IconName = keyof typeof drawings;

export function iconDrawing(name: IconName): IconDrawing {
  return drawings[name];
}
