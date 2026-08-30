"use client";

import dynamic from "next/dynamic";

import { useTheme, type Theme } from "@/components/theme-provider";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

/**
 * WebGL exists only in the browser, and this is pure atmosphere, so keep it
 * out of the prerendered HTML entirely so the static export stays renderable
 * and the shader never blocks first paint. The CSS gradient underneath is what
 * shows until (or instead of) this: no JS, no WebGL, or still loading.
 */
const Grainient = dynamic(() => import("@/components/site/grainient"), {
  ssr: false,
});
const Iridescence = dynamic(() => import("@/components/site/iridescence"), {
  ssr: false,
});
const Prism = dynamic(() => import("@/components/site/prism"), {
  ssr: false,
});

/**
 * Which shader paints the hero. Flip and reload: all three are wired and
 * theme-aware, so this is the whole switch.
 *
 * "prism" is here to be looked at, not to ship. Its brightness and its text
 * contrast are the same dial: at glow 1 (below) 26.8% of the frame falls under
 * 4.5:1 against the foreground, with peaks at 1.00:1 where the glow saturates
 * to white. Dimming to glow 0.15 clears contrast but drops average chroma to
 * 0.004 against Grainient's 0.032, which is not visible. There is no setting
 * that is both safe and present; it needs the copy moved off it.
 */
const BACKDROP: "grainient" | "iridescence" | "prism" = "prism";

/**
 * Grainient blends exactly three colours across the whole frame, so there is
 * no background colour and no dark region by construction. Everything in the
 * hero sits on top of it, which means the trio itself has to stay dark enough
 * to carry text: measured across the animation, the worst pixel in the frame
 * is 5.37:1 against the foreground in dark and 5.87:1 in light.
 *
 * `color3` is the dark end of the blend, `color1` the light end.
 *
 * One trio, both themes. The shader's `lightMode` takes a dark blend and
 * remaps it toward white, so feeding it an already-light palette (which this
 * used to do) flattens it twice and lands on a near-achromatic wash.
 */
const GRADIENT = {
  color1: "#6C4F36", // Burnished Bronze, light end
  color2: "#29221D", // Espresso
  color3: "#1A1A19", // Carbon
};

/**
 * Light mode needs a much harder curve than dark, for reasons that are all
 * downstream of the remap toward white:
 *
 * - It compresses chroma and range. Untouched, light lands at chroma 0.020
 *   against dark's 0.032. These values recover it to 0.027 and double the
 *   luminance spread, 0.285 to 0.535.
 * - It passes only ~62% of the grain, and what survives sits on a ground
 *   averaging 0.5 luminance instead of 0.05, so the same absolute noise is a
 *   far smaller proportional modulation and reads smooth. Hence 0.4 vs 0.08.
 *
 * Grain is not a free dial: it is added to R, G and B equally before the remap
 * divides by peak channel, so raising it desaturates. Warm hues are the tight
 * case: they sit near the achromatic axis after the remap, which is why light
 * mode caps near chroma 0.027 here where a cool trio reached 0.048. Pushing
 * contrast past ~2.0 buys ~0.001 more and drops text below 4.5:1.
 */
const GRADE = {
  dark: { contrast: 1.2, saturation: 0.95, grainAmount: 0.08 },
  light: { contrast: 1.8, saturation: 1.4, grainAmount: 0.4 },
} satisfies Record<
  Theme,
  { contrast: number; saturation: number; grainAmount: number }
>;

/**
 * Iridescence has no lightMode remap: `color` is a plain multiplier on the
 * final pixel, so each theme just gets its own vector. That is why it holds
 * roughly twice Grainient's chroma: nothing crushes it on the way out.
 *
 * These are solved for, not picked. Both land near 5:1 on the worst pixel in
 * the frame, with the grain already applied. Grain was the binding constraint,
 * since it perturbs exactly the extremes that set the worst case, and the
 * unmodified colours had no margin to absorb it.
 *
 * `lift` is why light mode works at all: dark text needs the backdrop above
 * 0.234 relative luminance everywhere, and this shader's cosine modulation dips
 * under it. Raising the black point holds the floor; scaling the colour toward
 * white would too, but it bleaches the hue out.
 */
const IRIDESCENCE = {
  dark: {
    // worst pixel 5.01:1 vs #e0e0e0, average chroma 0.066
    color: [0.468, 0.281, 0.17] as [number, number, number],
    lift: 0,
    grainAmount: 0.08,
  },
  light: {
    // worst pixel 4.97:1 vs #1f1f1f, average chroma 0.041
    color: [1, 0.86, 0.74] as [number, number, number],
    lift: 0.35,
    grainAmount: 0.25,
  },
} satisfies Record<
  Theme,
  { color: [number, number, number]; lift: number; grainAmount: number }
>;

/**
 * The props as given in the React Bits docs, unchanged, so what renders is the
 * effect as advertised rather than a version already compromised to fit.
 * `noise` is 0 here rather than upstream's 0.5, matching the snippet.
 */
const PRISM = {
  height: 3.5,
  baseWidth: 5.5,
  animationType: "rotate" as const,
  timeScale: 0.5,
  scale: 3.6,
  hueShift: 0,
  colorFrequency: 1,
  noise: 0,
  glow: 1,
};

export function HeroBackdrop() {
  const { theme } = useTheme();
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-20 overflow-hidden"
    >
      {BACKDROP === "prism" ? (
        <Prism
          {...PRISM}
          lightMode={theme === "light"}
          paused={reducedMotion}
        />
      ) : BACKDROP === "iridescence" ? (
        <Iridescence
          {...IRIDESCENCE[theme]}
          className="h-full w-full"
          // Motion is the whole risk surface here: a still frame is the correct
          // rendering when the OS asks for reduced motion, not a slower one.
          // This also disables the pointer response, which is motion too.
          paused={reducedMotion}
          speed={1}
          amplitude={0.1}
          mouseReact={!reducedMotion}
          grainScale={2}
        />
      ) : (
        <Grainient
          {...GRADIENT}
          {...GRADE[theme]}
          lightMode={theme === "light"}
          paused={reducedMotion}
          timeSpeed={0.6}
          warpSpeed={1.4}
          blendSoftness={0.18}
          grainScale={2}
          zoom={1.1}
        />
      )}
    </div>
  );
}
