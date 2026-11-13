// Sizes and dates as a Mac shows them, in British English.

const wholeNumber = new Intl.NumberFormat("en-GB", { maximumFractionDigits: 0 });
const oneDecimal = new Intl.NumberFormat("en-GB", { maximumFractionDigits: 1 });
const longDate = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Europe/London",
});

/** A file's size in MB or GB, counted in thousands as macOS's Finder counts them. */
export function formatSize(bytes: number): string {
  if (bytes >= 1e9) {
    return `${oneDecimal.format(bytes / 1e9)} GB`;
  }
  if (bytes >= 1e6) {
    return `${wholeNumber.format(bytes / 1e6)} MB`;
  }
  return `${wholeNumber.format(Math.max(1, bytes / 1e3))} KB`;
}

/** "12 November 2026", as the release's date falls in the UK. */
export function formatDate(date: Date): string {
  return longDate.format(date);
}

// en-CA writes dates as YYYY-MM-DD.
const machineDate = new Intl.DateTimeFormat("en-CA", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  timeZone: "Europe/London",
});

/** The same day, for a <time> element's datetime: "2026-11-12". */
export function isoDate(date: Date): string {
  return machineDate.format(date);
}
