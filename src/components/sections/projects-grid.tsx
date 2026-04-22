"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";

import { CdLink } from "@/components/site/cd-link";
import { CodeLink } from "@/components/site/code-link";
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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {filtered.map((project) => (
          <CodeLink
            key={project.slug}
            href={`/project/${project.slug}`}
            previewLabel={project.title}
            comment={`view ${project.title.toLowerCase()} details`}
            className="group block"
          >
            <Card className="hover:border-brand/60 h-full transition-colors">
              <CardContent className="flex h-full flex-col gap-4">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-muted-foreground font-mono text-[11px]">
                    {project.slug}
                  </span>
                  <CdLink slug={project.slug} />
                </div>
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
              </CardContent>
            </Card>
          </CodeLink>
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
