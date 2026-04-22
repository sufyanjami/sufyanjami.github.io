import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileDown } from "lucide-react";

import { Socials } from "@/components/site/socials";
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

          <TerminalBio />

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

function TerminalBio() {
  return (
    <div className="border-border bg-muted/30 max-w-xl space-y-3 rounded-sm border p-4 font-mono text-sm">
      <div>
        <p>
          <span className="text-brand">$</span>{" "}
          <span className="text-foreground">stack</span>
        </p>
        <p className="text-muted-foreground pl-3">
          {INFO.homepage.stack.join(" · ").toLowerCase()}
        </p>
      </div>
      <div>
        <p>
          <span className="text-brand">$</span>{" "}
          <span className="text-foreground">working_on</span>
        </p>
        <ul className="space-y-0.5 pl-3">
          {INFO.homepage.now.map((entry) => (
            <li key={entry.at} className="text-muted-foreground">
              <span className="text-brand-alt">@{entry.at}</span>{" "}
              <span className="text-muted-foreground/60">·</span>{" "}
              {entry.doing}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
