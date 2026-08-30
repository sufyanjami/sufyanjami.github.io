import { ArrowRight, FileDown } from "lucide-react";

import { CodeLink } from "@/components/site/code-link";
import { Container } from "@/components/site/container";
import { HeroBackdrop } from "@/components/site/hero-backdrop";
import { Socials } from "@/components/site/socials";
import { Typewriter } from "@/components/site/typewriter";
import { WindowFrame } from "@/components/site/window-frame";
import { buttonVariants } from "@/components/ui/button";
import { INFO } from "@/content/portfolio";
import { cn } from "@/lib/utils";

/**
 * Full-bleed section: it renders its own Container rather than sitting inside
 * the page's, so the backdrop can span the viewport while the copy stays on
 * the same measure as every other section.
 *
 * Single column on purpose. The headline is 30 monospace characters, which at
 * hero size wants very close to the full measure: measured in JetBrains Mono it
 * is 828px of 960px at text-5xl. A second column could only be bought by
 * shrinking either the headline or the terminal, so instead the terminal spans
 * the whole measure, making it the widest element on the page and the block
 * read as deliberately full rather than stopping short. Each headline step down
 * is sized so it still clears the container at the narrow end of its own
 * breakpoint.
 *
 * Layer order is deliberate and pinned to explicit z-indices rather than DOM
 * order: static wash, then shader, then scrim, then the content. Everything
 * below the content is `aria-hidden` and inert; the text and buttons are
 * ordinary HTML sitting above the canvas.
 */
export function Hero() {
  return (
    <section className="relative isolate flex items-center overflow-hidden lg:min-h-[72svh]">
      <div aria-hidden className="hero-wash absolute inset-0 -z-30" />
      <HeroBackdrop />
      <div aria-hidden className="hero-scrim absolute inset-0 -z-10" />

      <Container className="py-16 sm:py-20 lg:py-24">
        <h1 className="text-foreground text-xl font-semibold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
          {INFO.homepage.headline.map((line, i) => (
            <span
              key={line}
              className={cn("block", i > 0 && "text-muted-foreground")}
            >
              {line}
            </span>
          ))}
        </h1>

        <WindowFrame
          title="sufyan@portfolio: ~/.bio"
          className="mt-10"
          bodyClassName="bg-card/70 p-5 text-sm backdrop-blur-sm sm:p-6 sm:text-base"
        >
          <p className="text-foreground leading-relaxed">
            <Typewriter text={INFO.homepage.description} speed={16} />
          </p>
        </WindowFrame>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <CodeLink
            href={INFO.main.resume}
            external
            previewLabel="resume.pdf"
            comment="see resume in new tab"
            className={cn(buttonVariants(), "bg-brand hover:opacity-90")}
          >
            <FileDown className="size-4" />
            resume.pdf
          </CodeLink>
          <CodeLink
            href="/projects"
            previewLabel="view projects"
            comment="view projects"
            className={buttonVariants({ variant: "outline" })}
          >
            view projects
            <ArrowRight className="size-4" />
          </CodeLink>
          <Socials className="ml-1" />
        </div>
      </Container>
    </section>
  );
}
