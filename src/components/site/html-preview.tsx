import { TooltipContent } from "@/components/ui/tooltip";

/**
 * Renders an HTML <a> snippet as syntax-highlighted code.
 * Used inside link tooltips to show the actual markup the link emits.
 *
 * Color scope is intentionally hardcoded (zinc / blue / emerald) so the
 * preview reads like a code editor in both light and dark site themes.
 */
export function HtmlPreview({
  href,
  label,
  target,
  comment,
}: {
  href: string;
  label: string;
  target?: string;
  comment?: string;
}) {
  const arrow = target === "_blank" ? " ↗" : "";

  return (
    <pre className="m-0 font-mono text-[11px] leading-relaxed whitespace-pre">
      {comment && (
        <>
          <span className="text-zinc-500">{`// ${comment}`}</span>
          {"\n"}
        </>
      )}
      <span className="text-blue-400">{"<a"}</span>
      {" "}
      <span className="text-zinc-400">href</span>
      <span className="text-zinc-500">=</span>
      <span className="text-emerald-300">{`"${href}"`}</span>
      {target && (
        <>
          {"\n   "}
          <span className="text-zinc-400">target</span>
          <span className="text-zinc-500">=</span>
          <span className="text-emerald-300">{`"${target}"`}</span>
        </>
      )}
      <span className="text-blue-400">{">"}</span>
      {"\n  "}
      <span className="text-zinc-100">
        {label}
        {arrow}
      </span>
      {"\n"}
      <span className="text-blue-400">{"</a>"}</span>
    </pre>
  );
}

/**
 * Editor-dark tooltip body wrapping an {@link HtmlPreview}. Shared by every
 * call site that shows a link's markup on hover. The styling lives here so
 * the code-preview look stays in one place.
 */
export function CodeTooltipContent({
  href,
  label,
  target,
  comment,
}: {
  href: string;
  label: string;
  target?: string;
  comment?: string;
}) {
  return (
    <TooltipContent
      side="top"
      sideOffset={8}
      className="border-border bg-zinc-950 max-w-none rounded-sm border p-3 text-zinc-100 [&_div:last-child]:bg-zinc-950 [&_div:last-child]:fill-zinc-950"
    >
      <HtmlPreview href={href} label={label} target={target} comment={comment} />
    </TooltipContent>
  );
}
