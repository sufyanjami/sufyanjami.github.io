import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileDown } from "lucide-react";

import { Socials } from "@/components/site/socials";
import { Typewriter } from "@/components/site/typewriter";
import { buttonVariants } from "@/components/ui/button";
import { INFO } from "@/content/portfolio";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="border-b">
      <div className="grid grid-cols-1 items-center gap-10 py-16 md:grid-cols-[1.6fr_1fr] md:py-24">
        <div className="space-y-6">
          <h1 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            <span className="text-muted-foreground">{">"} </span>
            {INFO.homepage.headline}
          </h1>

          <TerminalCard title="sufyan@portfolio: ~/.bio">
            <p className="text-foreground leading-relaxed">
              <Typewriter text={INFO.homepage.description} />
            </p>
          </TerminalCard>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href={INFO.main.resume}
              target="_blank"
              rel="noopener"
              className={cn(buttonVariants(), "bg-brand hover:opacity-90")}
            >
              <FileDown className="size-4" />
              resume.pdf
            </Link>
            <Link
              href="/projects"
              className={buttonVariants({ variant: "outline" })}
            >
              view projects
              <ArrowRight className="size-4" />
            </Link>
            <Socials className="ml-1" />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xs md:max-w-none">
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
