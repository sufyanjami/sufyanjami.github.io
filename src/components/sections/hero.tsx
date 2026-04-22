import Image from "next/image";
import { ArrowRight, FileDown } from "lucide-react";

import { CodeLink } from "@/components/site/code-link";
import { Socials } from "@/components/site/socials";
import { Typewriter } from "@/components/site/typewriter";
import { buttonVariants } from "@/components/ui/button";
import { INFO } from "@/content/portfolio";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="border-b">
      <div className="grid grid-cols-1 items-center gap-10 py-16 lg:grid-cols-[1.6fr_1fr] lg:py-24">
        <div className="space-y-6">
          <h1 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
            {INFO.homepage.headline
              .split(/(?<=[.!?])\s+/)
              .map((line, i) => (
                <span key={i} className="block">
                  {i === 0 && (
                    <span className="text-muted-foreground">{">"} </span>
                  )}
                  {line}
                </span>
              ))}
          </h1>

          <TerminalCard title="sufyan@portfolio: ~/.bio">
            <p className="text-foreground leading-relaxed">
              <Typewriter text={INFO.homepage.description} />
            </p>
          </TerminalCard>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <CodeLink
              href={INFO.main.resume}
              external
              previewLabel="resume.pdf"
              className={cn(buttonVariants(), "bg-brand hover:opacity-90")}
            >
              <FileDown className="size-4" />
              resume.pdf
            </CodeLink>
            <CodeLink
              href="/projects"
              previewLabel="view projects"
              className={buttonVariants({ variant: "outline" })}
            >
              view projects
              <ArrowRight className="size-4" />
            </CodeLink>
            <Socials className="ml-1" />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xs lg:max-w-none">
          <div className="border-border bg-muted/30 relative aspect-square overflow-hidden rounded-sm border">
            <Image
              src="/homepage.jpg"
              alt={`Portrait of ${INFO.main.name}`}
              fill
              priority
              sizes="(min-width: 768px) 320px, 280px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function TerminalCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-border max-w-xl overflow-hidden rounded-sm border font-mono">
      <div className="bg-muted text-muted-foreground flex items-center justify-between border-b px-3 py-1.5 text-[11px]">
        <span>{title}</span>
        <span className="opacity-60">— □ ×</span>
      </div>
      <div className="bg-card/40 p-4 text-sm sm:text-base">{children}</div>
    </div>
  );
}
