import type { Metadata } from "next";

import { ProjectsGrid } from "@/components/sections/projects-grid";
import { Container } from "@/components/site/container";
import { Prompt } from "@/components/site/prompt";
import { INFO } from "@/content/portfolio";

export const metadata: Metadata = {
  title: "Projects",
  description: "Products I've shipped and tools I've built outside of work.",
};

export default function ProjectsPage() {
  return (
    <Container>
      <section className="space-y-6 py-16">
        <Prompt path="projects" />
        <h1 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">
          Projects
        </h1>
        <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
          Products I&apos;ve shipped and tools I&apos;ve built outside of work.
        </p>
      </section>

      <section className="space-y-6 pb-16">
        <Prompt path="projects/fairview-software" />
        <div className="space-y-2">
          <h2 className="text-foreground text-2xl font-semibold tracking-tight">
            {INFO.fairview.company}
          </h2>
          <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
            {INFO.fairview.summary}
          </p>
        </div>
        <ProjectsGrid projects={INFO.fairviewProjects} />
      </section>

      <section className="space-y-6 border-t pt-16 pb-20">
        <Prompt path="projects/tools" />
        <div className="space-y-2">
          <h2 className="text-foreground text-2xl font-semibold tracking-tight">
            Tools
          </h2>
          <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
            Built because I wanted to use them.
          </p>
        </div>
        <ProjectsGrid projects={INFO.projects} />
      </section>
    </Container>
  );
}
