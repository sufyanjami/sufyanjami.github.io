import { cn } from "@/lib/utils";

/**
 * Renders a terminal-style prompt prefix like `~/about $`.
 * Single-accent style — path is muted, only the prompt char is highlighted.
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
      className={cn(
        "text-muted-foreground font-mono text-sm tracking-tight",
        className,
      )}
    >
      <span>~{path ? `/${path}` : ""}</span>
      <span className="text-brand ml-1">$</span>
    </span>
  );
}
