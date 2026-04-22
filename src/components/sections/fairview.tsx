import { ExternalLink } from "lucide-react";

import { CodeLink } from "@/components/site/code-link";
import { HtmlPreview } from "@/components/site/html-preview";
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

const CODE_TOOLTIP_CLASS =
  "border-border bg-zinc-950 max-w-none rounded-sm border p-3 text-zinc-100 [&_div:last-child]:bg-zinc-950 [&_div:last-child]:fill-zinc-950";

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
        className={CODE_TOOLTIP_CLASS}
      >
        <HtmlPreview href={product.href} label={label} target="_blank" />
      </TooltipContent>
    </Tooltip>
  );
}
