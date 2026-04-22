import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Container } from "@/components/site/container";
import { Prompt } from "@/components/site/prompt";
import { TechPill } from "@/components/site/tech-pill";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { INFO } from "@/content/portfolio";

type Params = { slug: string };

export function generateStaticParams() {
  return INFO.jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = INFO.jobs.find((j) => j.slug === slug);
  if (!job) return { title: "Experience not found" };
  return {
    title: `${job.role} @ ${job.company}`,
    description: job.summary,
  };
}

export default async function ExperienceDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const job = INFO.jobs.find((j) => j.slug === slug);
  if (!job) notFound();

  return (
    <Container>
      <div className="py-10">
        <Link
          href="/about"
          className={buttonVariants({ variant: "ghost", size: "sm", className: "mb-6 gap-1" })}
        >
          <ArrowLeft className="size-4" />
          cd ..
        </Link>

        <header className="space-y-4">
          <Prompt path={`experience/${job.slug}`} />
          <p className="text-muted-foreground font-mono text-xs">
            {job.period}
          </p>
          <h1 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">
            {job.role}
          </h1>
          <p className="text-muted-foreground text-lg">{job.company}</p>
          <p className="text-foreground/90 max-w-2xl text-base leading-relaxed">
            {job.summary}
          </p>
        </header>

        <section className="mt-10 space-y-4">
          <Prompt path="projects" />
          <h2 className="text-foreground text-xl font-semibold tracking-tight">
            Projects
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {job.projects.map((p) => (
              <Card key={p.name}>
                <CardContent className="space-y-1">
                  <h3 className="text-foreground text-sm font-semibold">
                    <span className="text-brand mr-1">›</span>
                    {p.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {p.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-10 space-y-3">
          <Prompt path="tech" />
          <h2 className="text-foreground text-xl font-semibold tracking-tight">
            Tech used
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {job.tech.map((t) => (
              <TechPill key={t} label={t} />
            ))}
          </div>
        </section>
      </div>
    </Container>
  );
}
