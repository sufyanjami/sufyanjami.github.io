import { ProjectsGrid } from "@/components/sections/projects-grid";
import { Section } from "@/components/site/section";
import { INFO } from "@/content/portfolio";

export function Projects() {
  return (
    <Section
      id="projects"
      path="projects"
      title="Projects"
      description="Tools I built because I wanted to use them."
    >
      <ProjectsGrid projects={INFO.projects} />
    </Section>
  );
}
