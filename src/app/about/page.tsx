import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { CodeLink } from "@/components/site/code-link";
import { Container } from "@/components/site/container";
import { Prompt } from "@/components/site/prompt";
import { Socials } from "@/components/site/socials";
import { WindowFrame } from "@/components/site/window-frame";
import { Card, CardContent } from "@/components/ui/card";
import { INFO } from "@/content/portfolio";

export const metadata: Metadata = {
  title: "About",
  description: INFO.about.description.join(" "),
};

export default function AboutPage() {
  return (
    <Container>
      <section className="grid grid-cols-1 items-start gap-10 py-16 md:grid-cols-[1.5fr_1fr] md:items-center">
        <div className="space-y-6">
          <Prompt path="about" />
          <h1 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">
            {INFO.about.title}
          </h1>
          <div className="space-y-3">
            {INFO.about.description.map((paragraph) => (
              <p
                key={paragraph}
                className="text-muted-foreground text-base leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <Socials variant="labelled" />
        </div>

        <div className="relative mx-auto w-full max-w-xs md:max-w-none">
          <WindowFrame
            title="sufyan@portfolio: ~/me.webp"
            bodyClassName="bg-muted/30 relative aspect-square"
          >
            <Image
              src="/me.webp"
              alt={INFO.main.name}
              fill
              sizes="(min-width: 768px) 368px, 280px"
              className="object-cover"
            />
          </WindowFrame>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <header className="mb-8 space-y-2">
          <Prompt path="about/career" />
          <h2 className="text-foreground text-2xl font-semibold tracking-tight">
            Career Journey
          </h2>
          <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
            From agency work to enterprise SaaS to shipping products independently.
          </p>
        </header>
        <ol className="space-y-4">
          {INFO.jobs.map((job) => (
            <li key={job.slug}>
              <CodeLink
                href={`/experience/${job.slug}`}
                previewLabel={`${job.role} @ ${job.company}`}
                comment={`view ${job.company.toLowerCase()} experience`}
                className="group block"
              >
                <Card className="hover:border-brand/60 transition-colors">
                  <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                      <p className="text-muted-foreground font-mono text-[11px]">
                        {job.period}
                      </p>
                      <h3 className="text-foreground text-base font-semibold">
                        {job.role} ·{" "}
                        <span className="text-muted-foreground font-normal">
                          {job.company}
                        </span>
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {job.oneliner}
                      </p>
                    </div>
                    <span className="text-brand inline-flex items-center gap-1 font-mono text-xs">
                      view <ArrowRight className="size-3" />
                    </span>
                  </CardContent>
                </Card>
              </CodeLink>
            </li>
          ))}
        </ol>
      </section>
    </Container>
  );
}
