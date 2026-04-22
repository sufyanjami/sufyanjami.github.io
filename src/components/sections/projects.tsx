import { ProjectsGrid } from "@/components/sections/projects-grid";
import { Section } from "@/components/site/section";
import { INFO } from "@/content/portfolio";

export function Projects({ withFilter = false }: { withFilter?: boolean }) {
  return (
    <Section
      id="projects"
      path="projects"
      title="Side Projects"
      description="Things I built to scratch my own itch or to learn something new."
    >
      <ProjectsGrid projects={INFO.projects} withFilter={withFilter} />
    </Section>
  );
}
