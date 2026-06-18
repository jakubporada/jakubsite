"use client";

import { useEffect, useRef } from "react";

/* ------------------------------------------------------------------ *
 * Letter Glitch — a canvas grid of characters that randomly flip and
 * fade between colors (inspired by reactbits.dev/backgrounds/letter-glitch),
 * tuned to the Virginia Tech maroon/burnt palette so it reads as an
 * atmospheric "signal" rather than a literal Matrix wall.
 * Pure canvas, no dependencies. Respects prefers-reduced-motion.
 * ------------------------------------------------------------------ */

type Props = {
  glitchColors?: string[];
  glitchSpeed?: number;
  centerVignette?: boolean;
  outerVignette?: boolean;
  smooth?: boolean;
  className?: string;
};

const SYMBOLS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$&*()-_+=/[]{};:<>.,".split("");

export function LetterGlitch({
  // mostly dim, with occasional maroon / burnt highlights
  glitchColors = ["#2e251e", "#3a342f", "#861F41", "#b8456a", "#E5751F"],
  glitchSpeed = 70,
  centerVignette = false,
  outerVignette = true,
  smooth = true,
  className = "",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastGlitch = useRef(Date.now());
  const grid = useRef({ columns: 0, rows: 0 });
  const mouse = useRef({ x: -1, y: -1, active: false });
  const letters = useRef<
    { char: string; color: string; target: string; progress: number }[]
  >([]);

  const fontSize = 16;
  const charWidth = 10;
  const charHeight = 20;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctxRef.current = ctx;

    const rand = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

    // bright "ignite" colors used around the cursor
    const hotColors = ["#E5751F", "#f59749", "#b8456a", "#f5efe6"];

    const hexToRgb = (hex: string) => {
      const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return m
        ? { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) }
        : { r: 0, g: 0, b: 0 };
    };

    const mix = (
      a: { r: number; g: number; b: number },
      b: { r: number; g: number; b: number },
      f: number
    ) =>
      `rgb(${Math.round(a.r + (b.r - a.r) * f)}, ${Math.round(
        a.g + (b.g - a.g) * f
      )}, ${Math.round(a.b + (b.b - a.b) * f)})`;

    const init = (cols: number, rows: number) => {
      grid.current = { columns: cols, rows };
      letters.current = Array.from({ length: cols * rows }, () => ({
        char: rand(SYMBOLS),
        color: rand(glitchColors),
        target: rand(glitchColors),
        progress: 1,
      }));
    };

    const draw = () => {
      const c = ctxRef.current;
      if (!c) return;
      const { width, height } = canvas.getBoundingClientRect();
      c.clearRect(0, 0, width, height);
      c.font = `${fontSize}px monospace`;
      c.textBaseline = "top";
      const cols = grid.current.columns;
      letters.current.forEach((l, i) => {
        c.fillStyle = l.color;
        c.fillText(l.char, (i % cols) * charWidth, Math.floor(i / cols) * charHeight);
      });
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      init(Math.ceil(rect.width / charWidth), Math.ceil(rect.height / charHeight));
      draw();
    };

    const update = () => {
      const count = Math.max(1, Math.floor(letters.current.length * 0.05));
      for (let i = 0; i < count; i++) {
        const idx = Math.floor(Math.random() * letters.current.length);
        const l = letters.current[idx];
        if (!l) continue;
        l.char = rand(SYMBOLS);
        l.target = rand(glitchColors);
        if (smooth) l.progress = 0;
        else l.color = l.target;
      }
    };

    const smoothStep = () => {
      let redraw = false;
      for (const l of letters.current) {
        if (l.progress < 1) {
          l.progress = Math.min(1, l.progress + 0.05);
          l.color = mix(hexToRgb(l.color), hexToRgb(l.target), l.progress);
          redraw = true;
        }
      }
      if (redraw) draw();
    };

    // ignite characters in a TRUE pixel circle centered on the cursor.
    // cells are 10x20px, so we measure distance in pixels (not cells) —
    // otherwise the region comes out as a tall ellipse, not a circle.
    const radiusPx = 70;
    const disturb = () => {
      if (!mouse.current.active) return;
      const cols = grid.current.columns;
      const mx = mouse.current.x;
      const my = mouse.current.y;
      const ccol = Math.floor(mx / charWidth);
      const crow = Math.floor(my / charHeight);
      const colSpan = Math.ceil(radiusPx / charWidth);
      const rowSpan = Math.ceil(radiusPx / charHeight);
      for (let dy = -rowSpan; dy <= rowSpan; dy++) {
        for (let dx = -colSpan; dx <= colSpan; dx++) {
          const col = ccol + dx;
          const row = crow + dy;
          if (col < 0 || row < 0 || col >= cols) continue;
          // cell center in pixels vs the actual cursor position
          const px = col * charWidth + charWidth / 2;
          const py = row * charHeight + charHeight / 2;
          if (Math.hypot(px - mx, py - my) > radiusPx) continue;
          const idx = row * cols + col;
          const l = letters.current[idx];
          if (!l) continue;
          l.char = rand(SYMBOLS);
          l.target = rand(hotColors);
          if (smooth) l.progress = 0;
          else l.color = l.target;
        }
      }
    };

    const animate = () => {
      const now = Date.now();
      // flicker faster while the cursor is over the hero
      const speed = mouse.current.active ? Math.min(glitchSpeed, 26) : glitchSpeed;
      if (now - lastGlitch.current >= speed) {
        update();
        disturb();
        draw();
        lastGlitch.current = now;
      }
      if (smooth) smoothStep();
      rafRef.current = requestAnimationFrame(animate);
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    resize();
    if (!reduce) animate();

    // map any pointer (mouse OR touch) onto the canvas so the glitch reacts
    // wherever it is over the hero, even though content sits on top of it.
    // a screen-blended glow div follows the pointer for a smooth circle.
    const setPointer = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      mouse.current = { x, y, active: inside };
    };
    const clearPointer = () => {
      mouse.current.active = false;
    };

    const onMouseMove = (e: MouseEvent) => setPointer(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) setPointer(t.clientX, t.clientY);
    };
    if (!reduce) {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
      window.addEventListener("mouseout", clearPointer);
      window.addEventListener("touchstart", onTouch, { passive: true });
      window.addEventListener("touchmove", onTouch, { passive: true });
      window.addEventListener("touchend", clearPointer);
      window.addEventListener("touchcancel", clearPointer);
    }

    let t: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(() => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        resize();
        if (!reduce) animate();
      }, 120);
    };
    window.addEventListener("resize", onResize);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseout", clearPointer);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", clearPointer);
      window.removeEventListener("touchcancel", clearPointer);
      clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`relative h-full w-full ${className}`}>
      <canvas ref={canvasRef} className="block h-full w-full" />
      {outerVignette && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, rgba(20,16,14,0) 0%, rgba(20,16,14,0.78) 60%, rgba(20,16,14,0.96) 100%)",
          }}
        />
      )}
      {centerVignette && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle, rgba(20,16,14,0.82) 0%, rgba(20,16,14,0) 60%)",
          }}
        />
      )}
    </div>
  );
}
