import { ProjectsGrid } from "@/components/sections/projects-grid";
import { Section } from "@/components/site/section";
import { INFO } from "@/content/portfolio";

export function Projects({ withFilter = false }: { withFilter?: boolean }) {
  return (
    <Section
      id="projects"
      path="projects"
      title="Side Projects"
      description="Tools I wanted to exist. Built on weekends."
    >
      <ProjectsGrid projects={INFO.projects} withFilter={withFilter} />
    </Section>
  );
}
