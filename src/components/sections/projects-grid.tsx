"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { X } from "lucide-react";

import { CdLink } from "@/components/site/cd-link";
import { TechPill } from "@/components/site/tech-pill";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Project } from "@/content/portfolio";

export function ProjectsGrid({
  projects,
  withFilter = false,
}: {
  projects: Project[];
  withFilter?: boolean;
}) {
  const [activeTech, setActiveTech] = useState<string | null>(null);

  const allTech = useMemo(() => {
    const set = new Set<string>();
    for (const p of projects) p.tech.forEach((t) => set.add(t));
    return Array.from(set).sort();
  }, [projects]);

  const filtered = useMemo(() => {
    if (!activeTech) return projects;
    return projects.filter((p) => p.tech.includes(activeTech));
  }, [projects, activeTech]);

  return (
    <div className="space-y-6">
      {withFilter && (
        <div className="space-y-3">
          <p className="text-muted-foreground font-mono text-xs">
            <span className="text-brand">$</span> filter --by tech
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {allTech.map((tech) => {
              const active = activeTech === tech;
              return (
                <button
                  key={tech}
                  type="button"
                  onClick={() => setActiveTech(active ? null : tech)}
                  className="cursor-pointer"
                  aria-pressed={active}
                >
                  <TechPill label={tech} active={active} />
                </button>
              );
            })}
            {activeTech && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setActiveTech(null)}
                className="h-6 gap-1 text-xs"
              >
                <X className="size-3" />
                clear
              </Button>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <Link
            key={project.slug}
            href={`/project/${project.slug}`}
            className="group block"
          >
            <Card className="hover:border-brand/60 h-full transition-colors">
              <CardContent className="flex h-full flex-col gap-4">
                <h3 className="text-foreground text-base font-semibold tracking-tight">
                  {project.title}
                </h3>
                <p className="text-muted-foreground flex-1 text-sm leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.slice(0, 4).map((t) => (
                    <TechPill key={t} label={t} />
                  ))}
                  {project.tech.length > 4 && (
                    <span className="text-muted-foreground font-mono text-[11px]">
                      +{project.tech.length - 4}
                    </span>
                  )}
                </div>
                <CdLink slug={project.slug} />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-muted-foreground border-border rounded-sm border border-dashed p-8 text-center font-mono text-sm">
          No projects match [{activeTech}].
        </p>
      )}
    </div>
  );
}
