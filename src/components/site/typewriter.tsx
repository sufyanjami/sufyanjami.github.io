"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const CURSOR_CLASS =
  "bg-brand ml-0.5 inline-block h-[1em] w-[0.55em] -translate-y-[0.05em] align-middle";

/**
 * Types `text` out one character at a time, then leaves a blinking cursor.
 * Reserves the final box size up-front (invisible copy in the same grid cell)
 * so surrounding UI does not shift while characters appear.
 *
 * Respects prefers-reduced-motion. Full text is always exposed to screen
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
    <span className={cn("grid", className)}>
      {/* Phantom layer reserves the final box size to prevent layout shift. */}
      <span
        aria-hidden
        className="invisible col-start-1 row-start-1"
      >
        {text}
        <span className={CURSOR_CLASS} />
      </span>

      {/* Visible typed-out layer overlays the same grid cell. */}
      <span aria-hidden className="col-start-1 row-start-1">
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
