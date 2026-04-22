import Link from "next/link";
import type { ReactNode } from "react";

import { HtmlPreview } from "@/components/site/html-preview";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const CODE_TOOLTIP_CLASS =
  "border-border bg-zinc-950 max-w-none rounded-sm border p-3 text-zinc-100 [&_div:last-child]:bg-zinc-950 [&_div:last-child]:fill-zinc-950";

type Props = {
  href: string;
  /** Renders as <a target="_blank"> when true; otherwise next/link. */
  external?: boolean;
  /** Label shown inside the tooltip's <a> body. Defaults to children if string. */
  previewLabel?: string;
  /** Lowercase comment line shown above the markup. e.g. "see resume in new tab" */
  comment?: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
};

/**
 * A link that shows its own rendered HTML (with an optional comment) as a
 * tooltip on hover/focus. Drop-in replacement for next/link or <a>.
 */
export function CodeLink({
  href,
  external = false,
  previewLabel,
  comment,
  children,
  className,
  ariaLabel,
}: Props) {
  const label =
    previewLabel ?? (typeof children === "string" ? children : "link");
  const target = external ? "_blank" : undefined;
  const resolvedComment =
    comment ?? (external ? "open in new tab" : undefined);

  const trigger = external ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
    />
  ) : (
    <Link href={href} aria-label={ariaLabel} />
  );

  return (
    <Tooltip>
      <TooltipTrigger render={trigger} className={className}>
        {children}
      </TooltipTrigger>
      <TooltipContent
        side="top"
        sideOffset={8}
        className={CODE_TOOLTIP_CLASS}
      >
        <HtmlPreview
          href={href}
          label={label}
          target={target}
          comment={resolvedComment}
        />
      </TooltipContent>
    </Tooltip>
  );
}
