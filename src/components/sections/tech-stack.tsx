import { Section } from "@/components/site/section";
import { TechPill } from "@/components/site/tech-pill";
import { Card, CardContent } from "@/components/ui/card";
import { INFO } from "@/content/portfolio";

export function TechStack() {
  return (
    <Section
      id="tech-stack"
      path="tech-stack"
      title="Tech Stack"
      description="What I build with."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {Object.entries(INFO.techStack).map(([category, items]) => (
          <Card key={category}>
            <CardContent className="space-y-3">
              <p className="font-mono text-xs">
                <span className="text-brand">#</span>{" "}
                <span className="text-foreground font-semibold">
                  {category.toLowerCase()}
                </span>
              </p>
              <div className="flex flex-wrap gap-1.5">
                {items.map((item) => (
                  <TechPill key={item} label={item} />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
