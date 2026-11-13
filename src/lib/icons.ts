// The site's own symbols, drawn for it on a 24-point grid as strokes (and a few filled dots). No one else's icons
// or logos: SF Symbols may only be used in Apple's own platforms' apps, and makers' logos never appear on the site.

interface IconDrawing {
  /** Stroked paths. */
  paths: string[];
  /** Filled dots: [x, y, radius]. */
  dots?: [number, number, number][];
}

const drawings = {
  home: { paths: ["M4 11.5 12 4.5l8 7", "M6.5 9.8V19.5h11V9.8", "M10 19.5v-5h4v5"] },
  download: { paths: ["M12 4v11", "M7 10.5l5 5 5-5", "M5 19.5h14"] },
  arrowRight: { paths: ["M5 12h14", "M13 6l6 6-6 6"] },
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
  joystick: {
    paths: ["M6 15.5h12a2 2 0 0 1 2 2v1a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5v-1a2 2 0 0 1 2-2z", "M12 15.5V9.5"],
    dots: [[12, 6.5, 3]],
  },
  sliders: { paths: ["M4 7h9", "M17.5 7H20", "M4 17h3.5", "M12 17h8", "M15.25 4.75a2.25 2.25 0 1 1 0 4.5a2.25 2.25 0 1 1 0-4.5z", "M9.75 14.75a2.25 2.25 0 1 1 0 4.5a2.25 2.25 0 1 1 0-4.5z"] },
  layers: { paths: ["M12 3.5l8.5 4.5L12 12.5 3.5 8 12 3.5z", "M3.5 12 12 16.5 20.5 12", "M3.5 16 12 20.5 20.5 16"] },
  record: { paths: ["M12 3.5a8.5 8.5 0 1 1 0 17a8.5 8.5 0 1 1 0-17z"], dots: [[12, 12, 3.6]] },
  book: { paths: ["M5 5a2 2 0 0 1 2-2h12v14.5H7a2 2 0 0 0-2 2V5z", "M5 19.5A1.5 1.5 0 0 0 6.5 21H19v-3.5", "M9 7.5h6"] },
  chip: {
    paths: [
      "M8 6h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z",
      "M10 10h4v4h-4z",
      "M9.5 3v3",
      "M14.5 3v3",
      "M9.5 18v3",
      "M14.5 18v3",
      "M3 9.5h3",
      "M3 14.5h3",
      "M18 9.5h3",
      "M18 14.5h3",
    ],
  },
  arrows: { paths: ["M4 8h13", "M14 5l3 3-3 3", "M20 16H7", "M10 13l-3 3 3 3"] },
  drive: {
    paths: ["M4.5 13.5 6.6 6.8A2 2 0 0 1 8.5 5.5h7a2 2 0 0 1 1.9 1.3l2.1 6.7", "M4.5 13.5h15V18a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2v-4.5z"],
    dots: [[16.25, 16.75, 1]],
  },
  globe: {
    paths: ["M12 3a9 9 0 1 1 0 18a9 9 0 1 1 0-18z", "M3 12h18", "M12 3c2.6 2.6 3.8 5.6 3.8 9s-1.2 6.4-3.8 9", "M12 3C9.4 5.6 8.2 8.6 8.2 12s1.2 6.4 3.8 9"],
  },
  shield: { paths: ["M12 3l7.5 3v5.2c0 4.6-3.1 8.4-7.5 9.8-4.4-1.4-7.5-5.2-7.5-9.8V6L12 3z", "M8.8 12.2l2.2 2.2 4.3-4.4"] },
  refresh: { paths: ["M19.5 10.5A7.7 7.7 0 0 0 5.4 7.6L4 9.5", "M4 4.5v5h5", "M4.5 13.5a7.7 7.7 0 0 0 14.1 2.9l1.4-1.9", "M20 19.5v-5h-5"] },
  person: { paths: ["M12 3.5a4 4 0 1 1 0 8a4 4 0 1 1 0-8z", "M4.5 20.5a7.5 7.5 0 0 1 15 0"] },
  check: { paths: ["M5 12.5l4.5 4.5L19 7.5"] },
  code: { paths: ["M8.5 7.5 4 12l4.5 4.5", "M15.5 7.5 20 12l-4.5 4.5", "M13.5 5l-3 14"] },
  folder: { paths: ["M3.5 7A2 2 0 0 1 5.5 5h3.8l2 2.2h7.2a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2V7z"] },
  document: { paths: ["M7 3h7l5 5v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z", "M14 3v5h5", "M9 13h6", "M9 17h6"] },
  lock: { paths: ["M7.5 11V8a4.5 4.5 0 0 1 9 0v3", "M6.5 11h11a1.5 1.5 0 0 1 1.5 1.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 19.5v-7A1.5 1.5 0 0 1 6.5 11z"] },
  heart: { paths: ["M12 20s-7.5-4.6-7.5-10.4A4.1 4.1 0 0 1 12 7.3a4.1 4.1 0 0 1 7.5 2.3C19.5 15.4 12 20 12 20z"] },
  disc: { paths: ["M12 3a9 9 0 1 1 0 18a9 9 0 1 1 0-18z", "M12 9.5a2.5 2.5 0 1 1 0 5a2.5 2.5 0 1 1 0-5z"] },
  people: {
    paths: ["M9 4.5a3.5 3.5 0 1 1 0 7a3.5 3.5 0 1 1 0-7z", "M2.5 20a6.5 6.5 0 0 1 13 0", "M16 5a3 3 0 0 1 0 6", "M17.5 14.5A5.5 5.5 0 0 1 21.5 20"],
  },
  compass: { paths: ["M12 3a9 9 0 1 1 0 18a9 9 0 1 1 0-18z", "M15.5 8.5 13.4 13.4 8.5 15.5 10.6 10.6z"] },
} satisfies Record<string, IconDrawing>;

export type IconName = keyof typeof drawings;

export function iconDrawing(name: IconName): IconDrawing {
  return drawings[name];
}
