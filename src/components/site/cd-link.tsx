import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Inline `cd ./<slug> →` affordance for card navigation.
 * Mimics an Ubuntu shell — green command, blue path, muted arrow.
 */
export function CdLink({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-mono text-xs",
        className,
      )}
    >
      <span className="text-brand">cd</span>
      <span className="text-brand-alt">./{slug}</span>
      <ArrowRight className="text-muted-foreground size-3" />
    </span>
  );
}
