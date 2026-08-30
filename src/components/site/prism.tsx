"use client";

/**
 * Prism: vendored from React Bits (reactbits.dev/backgrounds/prism), MIT.
 *
 * The shaders and the uniform derivations are upstream's, verbatim. Only
 * `animationType: "rotate"` is implemented. Upstream also has "hover" and
 * "3drotate", which are not wired here because nothing uses them; the prop is
 * kept so the call site reads the same as the docs.
 *
 * Local changes:
 *   1. "use client": this is WebGL, it cannot run during prerender.
 *   2. `paused` prop, plus visibilitychange gating alongside upstream's
 *      IntersectionObserver. Upstream has no notion of reduced motion.
 *   3. Uniforms update in a second effect rather than rebuilding the context.
 *   4. The rotation frequencies are seeded deterministically. Upstream derives
 *      wX/wY/wZ and the phases from Math.random() at mount, so the hero looks
 *      materially different on every page load. For a backdrop that is a bug,
 *      not variety.
 *
 * CONTRAST: this shader is a glowing object, not a wash, and its brightness and
 * its text contrast are the same dial. At glow 1, 26.8% of the frame falls
 * under 4.5:1 against the foreground, with peaks at 1.00:1. Dimming to glow
 * 0.15 clears it but collapses average chroma to 0.004, against Grainient's
 * 0.032, which is invisible. Do not ship it under centred hero copy without
 * moving the text off it.
 */

import React, { useEffect, useRef } from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";

const vertex = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `
precision highp float;

uniform vec2  iResolution;
uniform float iTime;
uniform float uHeight;
uniform float uBaseHalf;
uniform mat3  uRot;
uniform int   uUseBaseWobble;
uniform float uGlow;
uniform vec2  uOffsetPx;
uniform float uNoise;
uniform float uSaturation;
uniform float uHueShift;
uniform float uColorFreq;
uniform float uBloom;
uniform float uCenterShift;
uniform float uInvBaseHalf;
uniform float uInvHeight;
uniform float uMinAxis;
uniform float uPxScale;
uniform float uTimeScale;
uniform float uLightMode;

vec4 tanh4(vec4 x){
  vec4 e2x = exp(2.0*x);
  return (e2x - 1.0) / (e2x + 1.0);
}

float rand(vec2 co){
  return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453123);
}

float sdOctaAnisoInv(vec3 p){
  vec3 q = vec3(abs(p.x) * uInvBaseHalf, abs(p.y) * uInvHeight, abs(p.z) * uInvBaseHalf);
  float m = q.x + q.y + q.z - 1.0;
  return m * uMinAxis * 0.5773502691896258;
}

float sdPyramidUpInv(vec3 p){
  float oct = sdOctaAnisoInv(p);
  float halfSpace = -p.y;
  return max(oct, halfSpace);
}

mat3 hueRotation(float a){
  float c = cos(a), s = sin(a);
  mat3 W = mat3(
    0.299, 0.587, 0.114,
    0.299, 0.587, 0.114,
    0.299, 0.587, 0.114
  );
  mat3 U = mat3(
     0.701, -0.587, -0.114,
    -0.299,  0.413, -0.114,
    -0.300, -0.588,  0.886
  );
  mat3 V = mat3(
     0.168, -0.331,  0.500,
     0.328,  0.035, -0.500,
    -0.497,  0.296,  0.201
  );
  return W + U * c + V * s;
}

void main(){
  vec2 f = (gl_FragCoord.xy - 0.5 * iResolution.xy - uOffsetPx) * uPxScale;

  float z = 5.0;
  float d = 0.0;

  vec3 p;
  vec4 o = vec4(0.0);

  float centerShift = uCenterShift;
  float cf = uColorFreq;

  mat2 wob = mat2(1.0);
  if (uUseBaseWobble == 1) {
    float t = iTime * uTimeScale;
    float c0 = cos(t + 0.0);
    float c1 = cos(t + 33.0);
    float c2 = cos(t + 11.0);
    wob = mat2(c0, c1, c2, c0);
  }

  const int STEPS = 100;
  for (int i = 0; i < STEPS; i++) {
    p = vec3(f, z);
    p.xz = p.xz * wob;
    p = uRot * p;
    vec3 q = p;
    q.y += centerShift;
    d = 0.1 + 0.2 * abs(sdPyramidUpInv(q));
    z -= d;
    o += (sin((p.y + z) * cf + vec4(0.0, 1.0, 2.0, 3.0)) + 1.0) / d;
  }

  o = tanh4(o * o * (uGlow * uBloom) / 1e5);

  vec3 col = o.rgb;
  float n = rand(gl_FragCoord.xy + vec2(iTime));
  col += (n - 0.5) * uNoise;
  col = clamp(col, 0.0, 1.0);

  float L = dot(col, vec3(0.2126, 0.7152, 0.0722));
  col = clamp(mix(vec3(L), col, uSaturation), 0.0, 1.0);

  if(abs(uHueShift) > 0.0001){
    col = clamp(hueRotation(uHueShift) * col, 0.0, 1.0);
  }

  if (uLightMode > 0.5) {
    float peak = max(col.r, max(col.g, col.b));
    vec3 chroma = pow(clamp(col / max(peak, 0.0001), 0.0, 1.0), vec3(1.14));
    gl_FragColor = vec4(mix(vec3(1.0), chroma, o.a * 0.94), 1.0);
  } else {
    gl_FragColor = vec4(col, o.a);
  }
}
`;

export interface PrismProps {
  height?: number;
  baseWidth?: number;
  animationType?: "rotate";
  glow?: number;
  offset?: { x: number; y: number };
  noise?: number;
  scale?: number;
  hueShift?: number;
  colorFrequency?: number;
  bloom?: number;
  timeScale?: number;
  saturation?: number;
  lightMode?: boolean;
  paused?: boolean;
  className?: string;
}

type Uniform<T> = { value: T };

/** Upstream seeds these from Math.random(); fixed so the hero is stable. */
const SEED = { wX: 0.62, wY: 0.55, wZ: 0.34, phX: 2.1, phZ: 4.4 };

const setMat3FromEuler = (
  yawY: number,
  pitchX: number,
  rollZ: number,
  out: Float32Array,
) => {
  const cy = Math.cos(yawY),
    sy = Math.sin(yawY);
  const cx = Math.cos(pitchX),
    sx = Math.sin(pitchX);
  const cz = Math.cos(rollZ),
    sz = Math.sin(rollZ);
  out[0] = cy * cz + sy * sx * sz;
  out[1] = cx * sz;
  out[2] = -sy * cz + cy * sx * sz;
  out[3] = -cy * sz + sy * sx * cz;
  out[4] = cx * cz;
  out[5] = sy * sz + cy * sx * cz;
  out[6] = sy * cx;
  out[7] = -sx;
  out[8] = cy * cx;
  return out;
};

const Prism: React.FC<PrismProps> = ({
  height = 3.5,
  baseWidth = 5.5,
  glow = 1,
  offset = { x: 0, y: 0 },
  noise = 0.5,
  scale = 3.6,
  hueShift = 0,
  colorFrequency = 1,
  bloom = 1,
  timeScale = 0.5,
  saturation = 1,
  lightMode = false,
  paused = false,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pausedRef = useRef(paused);
  const ctxRef = useRef<{
    program: Program;
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
      dpr: Math.min(2, window.devicePixelRatio || 1),
    });
    const gl = renderer.gl;
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    container.appendChild(canvas);

    const H = Math.max(0.001, height);
    const BASE_HALF = Math.max(0.001, baseWidth) * 0.5;

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iResolution: { value: new Float32Array([1, 1]) },
        iTime: { value: 0 },
        uHeight: { value: H },
        uBaseHalf: { value: BASE_HALF },
        uRot: {
          value: new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]),
        },
        uUseBaseWobble: { value: 1 },
        uGlow: { value: glow },
        uOffsetPx: { value: new Float32Array([offset.x, offset.y]) },
        uNoise: { value: noise },
        uSaturation: { value: saturation },
        uHueShift: { value: hueShift },
        uColorFreq: { value: colorFrequency },
        uBloom: { value: bloom },
        uCenterShift: { value: H * 0.25 },
        uInvBaseHalf: { value: 1 / BASE_HALF },
        uInvHeight: { value: 1 / H },
        uMinAxis: { value: Math.min(BASE_HALF, H) },
        uPxScale: { value: 1 / (1 * 0.1 * scale) },
        uTimeScale: { value: timeScale },
        uLightMode: { value: lightMode ? 1 : 0 },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    const renderOnce = () => renderer.render({ scene: mesh });
    const rotBuf = (program.uniforms.uRot as Uniform<Float32Array>).value;

    const setSize = () => {
      const rect = container.getBoundingClientRect();
      renderer.setSize(
        Math.max(1, Math.floor(rect.width)),
        Math.max(1, Math.floor(rect.height)),
      );
      const res = (program.uniforms.iResolution as Uniform<Float32Array>).value;
      res[0] = gl.drawingBufferWidth;
      res[1] = gl.drawingBufferHeight;
      // Upstream derives this from the drawing buffer height, so it has to be
      // recomputed on resize, not just at construction.
      (program.uniforms.uPxScale as Uniform<number>).value =
        1 / (Math.max(1, gl.drawingBufferHeight) * 0.1 * scale);
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
      const time = (t - t0) * 0.001;
      (program.uniforms.iTime as Uniform<number>).value = time;
      const ts = time * (program.uniforms.uTimeScale as Uniform<number>).value;
      setMat3FromEuler(
        ts * SEED.wY,
        Math.sin(ts * SEED.wX + SEED.phX) * 0.6,
        Math.sin(ts * SEED.wZ + SEED.phZ) * 0.5,
        rotBuf,
      );
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

    tryStart();

    return () => {
      tryStop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      if (canvas.parentNode === container) container.removeChild(canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      ctxRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Effect 2: push prop changes into uniforms without rebuilding the context.
  useEffect(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    const u = ctx.program.uniforms as Record<string, Uniform<unknown>>;
    (u.uGlow as Uniform<number>).value = glow;
    (u.uNoise as Uniform<number>).value = noise;
    (u.uSaturation as Uniform<number>).value = saturation;
    (u.uHueShift as Uniform<number>).value = hueShift;
    (u.uColorFreq as Uniform<number>).value = colorFrequency;
    (u.uBloom as Uniform<number>).value = bloom;
    (u.uTimeScale as Uniform<number>).value = timeScale;
    (u.uLightMode as Uniform<number>).value = lightMode ? 1 : 0;
    const off = (u.uOffsetPx as Uniform<Float32Array>).value;
    off[0] = offset.x;
    off[1] = offset.y;
    if (pausedRef.current) ctx.renderOnce();
  }, [
    glow,
    noise,
    saturation,
    hueShift,
    colorFrequency,
    bloom,
    timeScale,
    lightMode,
    offset.x,
    offset.y,
  ]);

  // Effect 3: reduced motion. A single static frame, not a slow one.
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

export default Prism;
