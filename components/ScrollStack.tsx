"use client";

import { ReactNode, useEffect, useRef } from "react";

/* ------------------------------------------------------------------ *
 * ScrollStack — cards pin and stack on top of each other as you scroll
 * (inspired by reactbits.dev's ScrollStack). Each card sticks at the same
 * top offset; as the next card rises to cover it, the one beneath recedes
 * (scales down + dims) so a layered "deck" peeks through.
 * CSS `position: sticky` + one rAF-throttled scroll handler. No deps.
 * Honors prefers-reduced-motion (renders as a plain stacked list).
 * ------------------------------------------------------------------ */

export function ScrollStack({
  items,
  topOffset = 130,
}: {
  items: ReactNode[];
  topOffset?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = Array.from(
      root.querySelectorAll<HTMLElement>("[data-stack-card]")
    );
    let raf = 0;

    const update = () => {
      raf = 0;
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) {
          card.style.transform = "scale(1)";
          card.style.opacity = "1";
          return;
        }
        const nextTop = next.getBoundingClientRect().top;
        const start = window.innerHeight * 0.95; // next card enters
        const end = topOffset; // next card has covered this one
        const t = Math.min(1, Math.max(0, (start - nextTop) / (start - end)));
        const scale = 1 - t * 0.07;
        const lift = t * 14;
        card.style.transform = `translateY(${-lift}px) scale(${scale})`;
        card.style.opacity = `${1 - t * 0.35}`;
      });
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [topOffset]);

  return (
    <div ref={ref} className="relative">
      {items.map((item, i) => (
        <div
          key={i}
          data-stack-card
          className="sticky mb-10 last:mb-0"
          style={{
            top: `${topOffset}px`,
            zIndex: i + 1,
            transformOrigin: "center top",
            willChange: "transform, opacity",
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
