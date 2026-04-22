import { ExternalLink } from "lucide-react";

import { Section } from "@/components/site/section";
import { TechPill } from "@/components/site/tech-pill";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { INFO, type FairviewProduct } from "@/content/portfolio";
import { cn } from "@/lib/utils";

const STATUS_LABEL: Record<FairviewProduct["status"], string> = {
  live: "live",
  beta: "beta",
  "in-development": "in development",
};

const STATUS_DOT: Record<FairviewProduct["status"], string> = {
  live: "bg-emerald-500",
  beta: "bg-amber-500",
  "in-development": "bg-sky-500",
};

export function Fairview() {
  return (
    <Section
      id="fairview"
      path="fairview-software"
      title={`${INFO.fairview.company}`}
      description={INFO.fairview.summary}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {INFO.fairview.products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </Section>
  );
}

function ProductCard({ product }: { product: FairviewProduct }) {
  return (
    <Card className="hover:border-brand/60 group h-full transition-colors">
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs">
            <span className="text-brand">$</span>{" "}
            <span className="text-foreground font-semibold">{product.name}</span>
          </span>
          <StatusBadge product={product} />
        </div>
        <p className="text-foreground text-base leading-snug font-medium">
          {product.tagline}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm leading-relaxed">
          {product.description}
        </p>
        {product.pricing && (
          <p className="border-border/70 text-foreground bg-muted/30 rounded-sm border px-3 py-2 font-mono text-xs">
            <span className="text-brand">→</span> {product.pricing}
          </p>
        )}
        <div className="flex flex-wrap gap-1.5">
          {product.tech.map((t) => (
            <TechPill key={t} label={t} />
          ))}
        </div>
        {product.href && (
          <a
            href={product.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand hover:text-foreground inline-flex items-center gap-1 font-mono text-xs"
          >
            visit <ExternalLink className="size-3" />
          </a>
        )}
      </CardContent>
    </Card>
  );
}

function StatusBadge({ product }: { product: FairviewProduct }) {
  const dot = (
    <span
      className={cn("size-1.5 rounded-full", STATUS_DOT[product.status])}
    />
  );
  const label = STATUS_LABEL[product.status];

  if (!product.href) {
    return (
      <span className="border-border text-muted-foreground inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 font-mono text-[10px]">
        {dot}
        {label}
      </span>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <a
            href={product.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${product.name} in a new tab`}
          />
        }
        className="border-border text-muted-foreground hover:border-brand hover:text-foreground inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 font-mono text-[10px] transition-colors"
      >
        {dot}
        {label}
        <ExternalLink className="size-2.5" />
      </TooltipTrigger>
      <TooltipContent
        side="top"
        sideOffset={8}
        className="border-border bg-zinc-950 max-w-none rounded-sm border p-3 text-zinc-100 [&_div:last-child]:bg-zinc-950 [&_div:last-child]:fill-zinc-950"
      >
        <HtmlPreview href={product.href} />
      </TooltipContent>
    </Tooltip>
  );
}

function HtmlPreview({ href }: { href: string }) {
  return (
    <pre className="m-0 font-mono text-[11px] leading-relaxed whitespace-pre">
      <span className="text-zinc-500">{"// hover demo — actual link markup\n"}</span>
      <span className="text-blue-400">{"<a"}</span>
      {" "}
      <span className="text-zinc-400">href</span>
      <span className="text-zinc-500">=</span>
      <span className="text-emerald-300">{`"${href}"`}</span>
      {"\n   "}
      <span className="text-zinc-400">target</span>
      <span className="text-zinc-500">=</span>
      <span className="text-emerald-300">{`"_blank"`}</span>
      <span className="text-blue-400">{">"}</span>
      {"\n  "}
      <span className="text-zinc-100">visit ↗</span>
      {"\n"}
      <span className="text-blue-400">{"</a>"}</span>
    </pre>
  );
}
