/**
 * Renders the 1200x630 social card to public/og.png at build time.
 *
 * Deliberately a standalone script rather than a Next `opengraph-image` route:
 * under `output: "export"` that route emits an extensionless file, which
 * GitHub Pages serves with the wrong content type and social scrapers reject.
 * A real .png at a stable path avoids the whole problem.
 */
import { stat, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { createElement as h } from "react";
// `next/og.js`, not `next/og`: the bare specifier has no Node ESM export map.
import { ImageResponse } from "next/og.js";

import { OG_COLORS, SITE } from "../src/content/site.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = resolve(ROOT, "public/og.png");

const row = (style, children) =>
  h("div", { style: { display: "flex", ...style } }, children);

function card() {
  return h(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: OG_COLORS.background,
        padding: "80px",
        borderTop: `12px solid ${OG_COLORS.brand}`,
      },
    },
    [
      row({ key: "prompt", fontSize: 30, color: OG_COLORS.muted }, [
        h("span", { key: "$", style: { color: OG_COLORS.brand, marginRight: 14 } }, "$"),
        "~/whoami",
      ]),
      row(
        {
          key: "name",
          fontSize: 88,
          fontWeight: 700,
          color: OG_COLORS.foreground,
          marginTop: 24,
          letterSpacing: "-0.03em",
        },
        SITE.name,
      ),
      row(
        {
          key: "title",
          fontSize: 44,
          color: OG_COLORS.brand,
          marginTop: 8,
          letterSpacing: "-0.02em",
        },
        SITE.title,
      ),
      row(
        { key: "location", fontSize: 28, color: OG_COLORS.muted, marginTop: 40 },
        SITE.location,
      ),
      row(
        { key: "url", fontSize: 28, color: OG_COLORS.muted, marginTop: "auto" },
        SITE.site.replace("https://", ""),
      ),
    ],
  );
}

const response = new ImageResponse(card(), { width: 1200, height: 630 });
await writeFile(OUT, Buffer.from(await response.arrayBuffer()));
const { size } = await stat(OUT);
console.log(`[og] public/og.png (${(size / 1024).toFixed(1)} KB)`);
