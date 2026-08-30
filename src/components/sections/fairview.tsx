import { CdLink } from "@/components/site/cd-link";
import { CodeLink } from "@/components/site/code-link";
import { Section } from "@/components/site/section";
import { TechPill } from "@/components/site/tech-pill";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { INFO, hasDetail, type Project, type ProjectStatus } from "@/content/portfolio";
import { cn } from "@/lib/utils";

const STATUS_LABEL: Record<ProjectStatus, string> = {
  live: "live",
  beta: "beta",
  "in-development": "in development",
};

const STATUS_DOT: Record<ProjectStatus, string> = {
  live: "bg-emerald-500",
  beta: "bg-amber-500",
  "in-development": "bg-sky-500",
};

export function Fairview() {
  return (
    <Section
      id="fairview"
      path="fairview-software"
      title={INFO.fairview.company}
      description={INFO.fairview.summary}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {INFO.fairviewProjects.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </Section>
  );
}

/**
 * Products with long-form content link through to their `/project/<slug>`
 * page; the rest render as a plain card. The card is the only link, so the
 * status pill stays inert: no anchor nested inside an anchor.
 */
function ProductCard({ product }: { product: Project }) {
  const card = (
    <Card className="hover:border-brand/60 group h-full transition-colors">
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-xs">
            <span className="text-brand">$</span>{" "}
            <span className="text-foreground font-semibold">
              {product.title}
            </span>
          </span>
          <StatusBadge status={product.status} />
        </div>
        <p className="text-foreground text-base leading-snug font-medium">
          {product.tagline ?? product.description}
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
        {hasDetail(product) && <CdLink slug={product.slug} />}
      </CardContent>
    </Card>
  );

  if (!hasDetail(product)) return card;

  return (
    <CodeLink
      href={`/project/${product.slug}`}
      previewLabel={product.title}
      comment={`view ${product.title.toLowerCase()} details`}
      className="group block"
    >
      {card}
    </CodeLink>
  );
}

function StatusBadge({ status }: { status?: ProjectStatus }) {
  if (!status) return null;
  return (
    <span className="border-border text-muted-foreground inline-flex shrink-0 items-center gap-1.5 rounded-sm border px-2 py-0.5 font-mono text-[11px]">
      <span className={cn("size-1.5 rounded-full", STATUS_DOT[status])} />
      {STATUS_LABEL[status]}
    </span>
  );
}
