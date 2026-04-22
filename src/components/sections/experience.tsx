import Link from "next/link";

import { CdLink } from "@/components/site/cd-link";
import { Section } from "@/components/site/section";
import { Card, CardContent } from "@/components/ui/card";
import { INFO } from "@/content/portfolio";

export function Experience() {
  return (
    <Section
      id="experience"
      path="experience"
      title="Work"
      description="Where I've worked and what I shipped there."
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {INFO.jobs.map((job) => (
          <Link
            key={job.slug}
            href={`/experience/${job.slug}`}
            className="group block"
          >
            <Card className="hover:border-brand/60 h-full transition-colors">
              <CardContent className="flex h-full flex-col gap-3">
                <p className="text-muted-foreground font-mono text-[11px]">
                  {job.period}
                </p>
                <div>
                  <h3 className="text-foreground text-base font-semibold tracking-tight">
                    {job.role}
                  </h3>
                  <p className="text-muted-foreground text-xs">{job.company}</p>
                </div>
                <p className="text-muted-foreground flex-1 text-sm leading-relaxed">
                  {job.oneliner}
                </p>
                <CdLink slug={job.slug} />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </Section>
  );
}
