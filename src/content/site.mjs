/**
 * Identity constants shared by the TypeScript content module and the plain
 * Node build scripts (which cannot import .ts). Plain JS so both can read it.
 */
export const SITE = {
  /** Canonical origin. Used by metadata, sitemap, robots, and JSON-LD. */
  site: "https://sufyanjami.github.io",
  name: "Sufyan Jami",
  title: "Full-Stack Developer",
  email: "sufijami9@gmail.com",
  location: "Calgary, AB, Canada",
  resume: "/sufyan-jami-resume.pdf",
};

/** Palette the OG card borrows from globals.css `.dark`. */
export const OG_COLORS = {
  brand: "#BC9A7A",
  background: "#121212",
  foreground: "#e0e0e0",
  muted: "#888888",
};
