"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Types `text` out one character at a time, then leaves a blinking cursor.
 * Respects prefers-reduced-motion. Full text is always available to screen
 * readers via an sr-only span.
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
  const [shown, setShown] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      setShown(text.length);
      setDone(true);
      return;
    }
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setShown(i);
      if (i >= text.length) {
        window.clearInterval(id);
        setDone(true);
      }
    }, speed);
    return () => window.clearInterval(id);
  }, [text, speed]);

  return (
    <span className={className}>
      <span aria-hidden>{text.slice(0, shown)}</span>
      <span className="sr-only">{text}</span>
      <span
        aria-hidden
        className={cn(
          "bg-brand ml-0.5 inline-block h-[1em] w-[0.55em] -translate-y-[0.05em] align-middle",
          done ? "animate-cursor" : "",
          cursorClassName,
        )}
      />
    </span>
  );
}
