"use client";

import { useEffect, useState } from "react";

import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

const CURSOR_CLASS =
  "bg-brand inline-block h-[1em] w-[1ch] -translate-y-[0.05em] align-middle";

/**
 * Types `text` out one character at a time without ever changing its own size.
 *
 * The full string sits in the flow as `visibility: hidden` and is the only
 * thing that sizes the box, so wrap points are computed once from the final
 * text and never move. The typed portion is painted over it, absolutely
 * positioned and therefore out of flow entirely.
 *
 * That separation matters: the cursor is an `inline-block`, which is an
 * unbreakable atom as far as line breaking is concerned. Left in the flow it
 * splits whatever word it currently sits inside, so the line count changes as
 * it advances, and anything sized by this element resizes along with it.
 *
 * Respects prefers-reduced-motion. Full text is exposed to screen readers.
 */
export function Typewriter({
  text,
  speed = 22,
  className,
  cursorClassName,
}: {
  text: string;
  speed?: number;
  className?: string;
  cursorClassName?: string;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setTyped(i);
      if (i >= text.length) window.clearInterval(id);
    }, speed);
    return () => window.clearInterval(id);
  }, [text, speed, reducedMotion]);

  const shown = reducedMotion ? text.length : typed;
  const done = shown >= text.length;

  return (
    <span className={cn("relative block", className)}>
      {/* Reserves the final box, cursor included, so it matches the end state. */}
      <span aria-hidden className="invisible">
        {text}
        <span className={cn(CURSOR_CLASS, cursorClassName)} />
      </span>

      <span aria-hidden className="absolute inset-0">
        {text.slice(0, shown)}
        <span
          className={cn(
            CURSOR_CLASS,
            done ? "animate-cursor" : "",
            cursorClassName,
          )}
        />
      </span>

      <span className="sr-only">{text}</span>
    </span>
  );
}
