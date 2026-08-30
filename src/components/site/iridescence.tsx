"use client";

/**
 * Iridescence: vendored from React Bits (reactbits.dev/backgrounds/iridescence),
 * MIT. Kept close to upstream so it stays diffable against the original.
 *
 * Local changes:
 *   1. "use client": this is WebGL, it cannot run during prerender.
 *   2. `paused` prop, plus IntersectionObserver and visibilitychange gating.
 *      Upstream runs its rAF loop unconditionally and forever: offscreen,
 *      tab hidden, reduced motion, all of it. Grainient at least stops when
 *      offscreen; this one does not, so all three are added here.
 *   3. Uniforms are updated in a second effect. Upstream lists `color`,
 *      `speed` and `amplitude` in its effect deps, which tears down and
 *      rebuilds the entire WebGL context on every theme switch.
 *   4. `uLift`, a black-point lift, not in upstream. Dark text needs the
 *      backdrop to stay above 0.234 relative luminance for 4.5:1, and this
 *      shader's own cosine modulation dips well below that. Lifting the black
 *      point raises the floor without washing the hue out, which scaling
 *      `color` toward white does. Only light mode needs it.
 *   5. `uGrainAmount` / `uGrainScale`: upstream has no grain at all. This is
 *      Grainient's exact hash, ported so the two read as the same material.
 *
 * The mousemove listener is on `window`, not the container: the backdrop is
 * `pointer-events-none`, so the container never receives pointer events.
 */

import React, { useEffect, useRef } from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";

const vertex = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const fragment = `
precision highp float;

uniform float uTime;
uniform vec3  uColor;
uniform vec3  uResolution;
uniform vec2  uMouse;
uniform float uAmplitude;
uniform float uSpeed;
uniform float uLift;
uniform float uGrainAmount;
uniform float uGrainScale;

varying vec2 vUv;

void main() {
  float mr = min(uResolution.x, uResolution.y);
  vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;

  uv += (uMouse - vec2(0.5)) * uAmplitude;

  float d = -uTime * 0.5 * uSpeed;
  float a = 0.0;
  for (float i = 0.0; i < 8.0; ++i) {
    a += cos(i - d - a * uv.x);
    d += sin(uv.y * i + a);
  }
  d += uTime * 0.5 * uSpeed;
  vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);
  col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5) * uColor;

  // Raise the black point so the darkest region still clears text contrast.
  col = vec3(uLift) + col * (1.0 - uLift);

  vec2 grainUv = vUv * uGrainScale;
  float grain = fract(sin(dot(grainUv, vec2(12.9898, 78.233))) * 43758.5453);
  col += (grain - 0.5) * uGrainAmount;

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

export interface IridescenceProps {
  /** RGB multiplier applied to the final colour. This is the whole palette. */
  color?: [number, number, number];
  speed?: number;
  amplitude?: number;
  mouseReact?: boolean;
  /** Black-point lift, 0 to 1. Raises the darkest region; light mode needs it. */
  lift?: number;
  grainAmount?: number;
  grainScale?: number;
  paused?: boolean;
  className?: string;
}

type Uniform<T> = { value: T };

const Iridescence: React.FC<IridescenceProps> = ({
  color = [1, 1, 1],
  speed = 1.0,
  amplitude = 0.1,
  mouseReact = true,
  lift = 0,
  grainAmount = 0,
  grainScale = 2,
  paused = false,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  // Read inside the render loop, which is created once and must not close over
  // a stale value. Kept in sync by the `paused` effect below, never in render.
  const pausedRef = useRef(paused);
  const mouseReactRef = useRef(mouseReact);
  const ctxRef = useRef<{
    program: Program;
    /** Loop controls, so the `paused` effect drives the rAF without a rebuild. */
    start: () => void;
    stop: () => void;
    renderOnce: () => void;
  } | null>(null);

  // Effect 1: build the WebGL context once.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({
      alpha: true,
      antialias: false,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    });
    const gl = renderer.gl;
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    container.appendChild(canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new Float32Array([1, 1, 1]) },
        uResolution: { value: new Float32Array([1, 1, 1]) },
        uMouse: { value: new Float32Array([0.5, 0.5]) },
        uAmplitude: { value: 0.1 },
        uSpeed: { value: 1.0 },
        uLift: { value: 0 },
        uGrainAmount: { value: 0 },
        uGrainScale: { value: 2 },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    const renderOnce = () => renderer.render({ scene: mesh });

    const setSize = () => {
      const rect = container.getBoundingClientRect();
      renderer.setSize(
        Math.max(1, Math.floor(rect.width)),
        Math.max(1, Math.floor(rect.height)),
      );
      const res = (program.uniforms.uResolution as Uniform<Float32Array>).value;
      res[0] = gl.drawingBufferWidth;
      res[1] = gl.drawingBufferHeight;
      res[2] = gl.drawingBufferWidth / Math.max(1, gl.drawingBufferHeight);
      renderOnce();
    };

    const ro = new ResizeObserver(setSize);
    ro.observe(container);
    setSize();

    let raf = 0;
    let isVisible = true;
    let isPageVisible = !document.hidden;
    const t0 = performance.now();

    const loop = (t: number) => {
      (program.uniforms.uTime as Uniform<number>).value = (t - t0) * 0.001;
      renderOnce();
      raf = requestAnimationFrame(loop);
    };
    const tryStart = () => {
      if (pausedRef.current) return;
      if (isVisible && isPageVisible && raf === 0)
        raf = requestAnimationFrame(loop);
    };
    const tryStop = () => {
      if (raf !== 0) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) tryStart();
        else tryStop();
      },
      { threshold: 0 },
    );
    io.observe(container);
    ctxRef.current = { program, start: tryStart, stop: tryStop, renderOnce };

    const onVisibility = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible) tryStart();
      else tryStop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const onMouseMove = (e: MouseEvent) => {
      if (!mouseReactRef.current || pausedRef.current) return;
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const m = (program.uniforms.uMouse as Uniform<Float32Array>).value;
      m[0] = (e.clientX - rect.left) / rect.width;
      m[1] = 1.0 - (e.clientY - rect.top) / rect.height;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    tryStart();

    return () => {
      tryStop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("mousemove", onMouseMove);
      if (canvas.parentNode === container) container.removeChild(canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      ctxRef.current = null;
    };
  }, []);

  // Effect 2: push prop changes into uniforms without rebuilding the context.
  useEffect(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    const u = ctx.program.uniforms as Record<string, Uniform<never>>;
    const c = (u.uColor as unknown as Uniform<Float32Array>).value;
    c[0] = color[0];
    c[1] = color[1];
    c[2] = color[2];
    (u.uAmplitude as unknown as Uniform<number>).value = amplitude;
    (u.uSpeed as unknown as Uniform<number>).value = speed;
    (u.uLift as unknown as Uniform<number>).value = lift;
    (u.uGrainAmount as unknown as Uniform<number>).value = grainAmount;
    (u.uGrainScale as unknown as Uniform<number>).value = grainScale;
    mouseReactRef.current = mouseReact;
    // While paused nothing else will draw, so push the change to screen now.
    if (pausedRef.current) ctx.renderOnce();
  }, [color, speed, amplitude, mouseReact, lift, grainAmount, grainScale]);

  // Effect 3: reduced motion. A single static frame, not a slow one.
  // Pausing must not tear down the context, so it drives the existing loop.
  useEffect(() => {
    pausedRef.current = paused;
    const ctx = ctxRef.current;
    if (!ctx) return;
    if (paused) {
      ctx.stop();
      ctx.renderOnce();
    } else {
      ctx.start();
    }
  }, [paused]);

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full overflow-hidden ${className}`.trim()}
    />
  );
};

export default Iridescence;
