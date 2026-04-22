import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";

import { GithubIcon } from "@/components/icons/brand";
import { Container } from "@/components/site/container";
import { Prompt } from "@/components/site/prompt";
import { TechPill } from "@/components/site/tech-pill";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { INFO } from "@/content/portfolio";

type Params = { slug: string };

export function generateStaticParams() {
  return INFO.projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = INFO.projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = INFO.projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <Container>
      <div className="py-10">
        <Link
          href="/projects"
          className={buttonVariants({ variant: "ghost", size: "sm", className: "mb-6 gap-1" })}
        >
          <ArrowLeft className="size-4" />
          cd ..
        </Link>

        <header className="space-y-4">
          <Prompt path={`projects/${project.slug}`} />
          <h1 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">
            {project.title}
          </h1>
          <p className="text-muted-foreground max-w-2xl text-base leading-relaxed">
            {project.summary}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants(), "bg-brand hover:opacity-90")}
              >
                <ExternalLink className="size-4" />
                view live
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "outline" })}
              >
                <GithubIcon className="size-4" />
                source
              </a>
            )}
          </div>
        </header>

        <section className="mt-10 space-y-3">
          <Prompt path="built-with" />
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <TechPill key={t} label={t} />
            ))}
          </div>
        </section>

        <section className="mt-10 space-y-3">
          <Prompt path="why" />
          <h2 className="text-foreground text-xl font-semibold tracking-tight">
            Why I built this
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {project.why}
          </p>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <Card>
            <CardContent className="space-y-3">
              <Prompt path="features" />
              <h3 className="text-foreground text-base font-semibold">
                Features
              </h3>
              <ul className="space-y-1.5">
                {project.features.map((f) => (
                  <li
                    key={f}
                    className="text-muted-foreground flex gap-2 text-sm"
                  >
                    <span className="text-brand mt-[2px] font-mono">›</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-3">
              <Prompt path="highlights" />
              <h3 className="text-foreground text-base font-semibold">
                Technical highlights
              </h3>
              <ul className="space-y-1.5">
                {project.highlights.map((h) => (
                  <li
                    key={h}
                    className="text-muted-foreground flex gap-2 text-sm"
                  >
                    <span className="text-brand mt-[2px] font-mono">✓</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
    </Container>
  );
}
