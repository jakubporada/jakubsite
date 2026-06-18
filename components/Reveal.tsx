"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

/* ------------------------------------------------------------------ *
 * Reveal — fades + slides content up as it scrolls into view
 * (an AnimatedContent-style effect). IntersectionObserver + CSS only,
 * no dependencies. Honors prefers-reduced-motion (shows instantly).
 * ------------------------------------------------------------------ */

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    // bidirectional: reveal on enter, re-hide on exit so scrolling back
    // up "rewinds" the animation and it replays on the way down
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => setShown(e.isIntersecting));
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : `translateY(${y}px)`,
        transition:
          "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)",
        transitionDelay: `${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
