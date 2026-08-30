"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

export type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggle: () => void;
};

const STORAGE_KEY = "theme";
const FAVICON_DARK = "/sj-darkmode.png";
const FAVICON_LIGHT = "/sj-lightmode.png";

function setFaviconHref(theme: Theme) {
  const link = document.getElementById("favicon") as HTMLLinkElement | null;
  if (link) link.href = theme === "dark" ? FAVICON_DARK : FAVICON_LIGHT;
}

/**
 * The `dark` class on <html> is the source of truth. The pre-paint script in
 * <head> writes it before React ever runs. Rather than mirroring it into
 * component state, subscribe to it as an external store, so there is exactly
 * one place the current theme lives.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

/** Matches the inline script's fallback, so hydration starts from the same value. */
function getServerSnapshot(): Theme {
  return "dark";
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = useCallback((next: Theme) => {
    document.documentElement.classList.toggle("dark", next === "dark");
    setFaviconHref(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore quota / privacy errors */
    }
  }, []);

  const toggle = useCallback(() => {
    setTheme(getSnapshot() === "dark" ? "light" : "dark");
  }, [setTheme]);

  const value = useMemo(
    () => ({ theme, setTheme, toggle }),
    [theme, setTheme, toggle],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

/**
 * Inline script that runs before paint, setting the `dark` class on <html>
 * based on localStorage / system preference. Inject into <head> directly so
 * it runs synchronously and avoids a flash.
 */
export const themeInitScript = `(function(){try{var s=localStorage.getItem('${STORAGE_KEY}');var d=s==='dark'||(!s&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);var l=document.getElementById('favicon');if(l)l.href=d?'${FAVICON_DARK}':'${FAVICON_LIGHT}';}catch(e){document.documentElement.classList.add('dark');}})();`;
