import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Section } from "@/components/site/section";
import { Card, CardContent } from "@/components/ui/card";
import { INFO } from "@/content/portfolio";

export function Experience() {
  return (
    <Section
      id="experience"
      path="experience"
      title="Career"
      description="Roles, products, and the problems they solved."
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {INFO.jobs.map((job) => (
          <Link
            key={job.slug}
            href={`/experience/${job.slug}`}
            className="group block"
          >
            <Card className="hover:border-brand/60 h-full transition-colors">
              <CardContent className="space-y-3">
                <div className="text-muted-foreground flex items-center justify-between font-mono text-[11px]">
                  <span>{job.period}</span>
                  <span className="text-brand opacity-0 transition-opacity group-hover:opacity-100">
                    cd ./{job.slug} →
                  </span>
                </div>
                <div>
                  <h3 className="text-foreground text-base font-semibold tracking-tight">
                    {job.role}
                  </h3>
                  <p className="text-muted-foreground text-xs">{job.company}</p>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {job.oneliner}
                </p>
                <div className="text-brand inline-flex items-center gap-1 font-mono text-xs">
                  view details <ArrowRight className="size-3" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </Section>
  );
}
