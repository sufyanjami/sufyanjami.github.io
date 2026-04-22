import { cn } from "@/lib/utils";

/**
 * Renders a terminal-style prompt prefix like `~/about $`.
 * Used for section headers and nav items.
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
      <span className="text-brand">~</span>
      {path && <span>/{path}</span>}
      <span className="text-brand ml-1">$</span>
    </span>
  );
}
