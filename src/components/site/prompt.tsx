import { cn } from "@/lib/utils";

/**
 * Renders a terminal-style prompt prefix like `~/about $`.
 * Coloring follows the Ubuntu default PS1 — path in blue, prompt char in green.
 */
export function Prompt({
  path,
  className,
}: {
  path: string;
  className?: string;
}) {
  return (
    <span
      className={cn("font-mono text-sm tracking-tight", className)}
    >
      <span className="text-brand-alt">
        ~{path ? `/${path}` : ""}
      </span>
      <span className="text-brand ml-1">$</span>
    </span>
  );
}
