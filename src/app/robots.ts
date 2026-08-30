import type { MetadataRoute } from "next";

import { INFO } from "@/content/portfolio";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${INFO.main.site}/sitemap.xml`,
  };
}
