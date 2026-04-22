import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Inline `cd ./<slug> →` affordance for card navigation.
 * Hidden by default — fades in when the parent `.group` is hovered or focused,
 * with a small arrow nudge. Always visible if the user prefers reduced motion.
 * Space is reserved via opacity (not display) to prevent layout shift on hover.
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
        "opacity-0 transition-opacity duration-200",
        "group-hover:opacity-100 group-focus-visible:opacity-100",
        "motion-reduce:opacity-100",
        className,
      )}
    >
      <span className="text-brand">cd</span>
      <span className="text-foreground">./{slug}</span>
      <ArrowRight className="text-muted-foreground size-3 transition-transform duration-200 group-hover:translate-x-0.5" />
    </span>
  );
}
