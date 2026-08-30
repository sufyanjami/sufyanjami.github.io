import { cn } from "@/lib/utils";

export function TechPill({
  label,
  active = false,
  className,
}: {
  label: string;
  active?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "border-border text-muted-foreground inline-flex items-center rounded-sm border px-2 py-0.5 font-mono text-[11px] leading-5 tracking-tight",
        active && "border-brand text-brand",
        className,
      )}
    >
      [{label.toLowerCase()}]
    </span>
  );
}
