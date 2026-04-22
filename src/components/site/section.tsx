import { Prompt } from "@/components/site/prompt";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Section({
  id,
  path,
  title,
  description,
  children,
  className,
}: {
  id?: string;
  path?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("py-12 sm:py-16", className)}>
      <header className="mb-8 space-y-2">
        {path && <Prompt path={path} />}
        <h2 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
            {description}
          </p>
        )}
      </header>
      {children}
    </section>
  );
}
