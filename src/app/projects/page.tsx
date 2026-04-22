import type { Metadata } from "next";

import { ProjectsGrid } from "@/components/sections/projects-grid";
import { Container } from "@/components/site/container";
import { Prompt } from "@/components/site/prompt";
import { INFO } from "@/content/portfolio";

export const metadata: Metadata = {
  title: "Projects",
  description: "Side projects, learning experiments, and open-source work.",
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
          Things I&apos;ve built outside of work. Filter by stack to find what
          you&apos;re looking for.
        </p>
      </section>
      <section className="pb-20">
        <ProjectsGrid projects={INFO.projects} withFilter />
      </section>
    </Container>
  );
}
