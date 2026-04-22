import { Experience } from "@/components/sections/experience";
import { Fairview } from "@/components/sections/fairview";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { TechStack } from "@/components/sections/tech-stack";
import { Container } from "@/components/site/container";

export default function HomePage() {
  return (
    <Container>
      <Hero />
      <Fairview />
      <Experience />
      <Projects />
      <TechStack />
    </Container>
  );
}
