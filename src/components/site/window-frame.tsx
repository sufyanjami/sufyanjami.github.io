"use client";

import { useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type WindowState = "normal" | "minimized" | "maximized" | "closed";

export function WindowFrame({
  title,
  children,
  className,
  bodyClassName,
  reopenLabel,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  reopenLabel?: string;
}) {
  const [state, setState] = useState<WindowState>("normal");

  useEffect(() => {
    if (state !== "maximized") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setState("normal");
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [state]);

  const toggle = useCallback((next: WindowState) => {
    setState((s) => (s === next ? "normal" : next));
  }, []);

  if (state === "closed") {
    const label = reopenLabel ?? title.split(": ").pop() ?? title;
    return (
      <button
        type="button"
        onClick={() => setState("normal")}
        className="text-muted-foreground hover:text-foreground inline-flex items-center font-mono text-xs transition-colors"
      >
        <span className="text-brand mr-1">$</span> open {label}
      </button>
    );
  }

  const isMaximized = state === "maximized";

  return (
    <>
      {isMaximized && (
        <div
          aria-hidden
          onClick={() => setState("normal")}
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
        />
      )}
      <div
        role={isMaximized ? "dialog" : undefined}
        aria-modal={isMaximized || undefined}
        className={cn(
          "border-border overflow-hidden rounded-sm border font-mono",
          isMaximized &&
            "bg-background fixed top-1/2 left-1/2 z-[70] w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2 shadow-2xl",
          className,
        )}
      >
        <div className="bg-muted text-muted-foreground flex items-center justify-between border-b px-3 py-1.5 text-[11px] select-none">
          <span className="truncate">{title}</span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label="Minimize"
              onClick={() => toggle("minimized")}
              className="hover:text-foreground px-1 leading-none transition-colors"
            >
              —
            </button>
            <button
              type="button"
              aria-label={isMaximized ? "Restore" : "Maximize"}
              onClick={() => toggle("maximized")}
              className="hover:text-foreground px-1 leading-none transition-colors"
            >
              {isMaximized ? "❐" : "□"}
            </button>
            <button
              type="button"
              aria-label="Close"
              onClick={() => setState("closed")}
              className="hover:text-foreground px-1 leading-none transition-colors"
            >
              ×
            </button>
          </div>
        </div>
        <div className={cn(state === "minimized" && "hidden", bodyClassName)}>
          {children}
        </div>
      </div>
    </>
  );
}
