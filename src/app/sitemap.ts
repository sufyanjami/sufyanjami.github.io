import type { MetadataRoute } from "next";

import { DETAILED_PROJECTS, INFO } from "@/content/portfolio";

const BASE = INFO.main.site;

/** `trailingSlash: true` is on, so every URL here ends in a slash to match. */
function url(path: string) {
  return path === "/" ? `${BASE}/` : `${BASE}${path}/`;
}

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/about", "/projects", "/contact"];
  const jobRoutes = INFO.jobs.map((job) => `/experience/${job.slug}`);
  const projectRoutes = DETAILED_PROJECTS.map(
    (project) => `/project/${project.slug}`,
  );

  return [...staticRoutes, ...jobRoutes, ...projectRoutes].map((path) => ({
    url: url(path),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));
}
