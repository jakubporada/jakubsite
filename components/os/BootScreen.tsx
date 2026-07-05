"use client";

import { useEffect, useState } from "react";

const BOOT_LINES = [
  "jp-bios v2.6 — power-on self test .......... ok",
  "mounting /dev/portfolio .................... ok",
  "loading window manager ..................... ok",
  "starting jp-os v1.0 ........................",
];

/* Skippable boot splash — shown once per session. */
export function BootScreen({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    BOOT_LINES.forEach((_, i) => {
      timers.push(setTimeout(() => setVisible(i + 1), 200 + i * 260));
    });
    timers.push(setTimeout(() => setFading(true), 1500));
    timers.push(setTimeout(onDone, 1850));

    const skip = () => {
      timers.forEach(clearTimeout);
      onDone();
    };
    window.addEventListener("pointerdown", skip);
    window.addEventListener("keydown", skip);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
    };
  }, [onDone]);

  return (
    <div
      className={`absolute inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center bg-ink-900 transition-opacity duration-300 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
      aria-label="JP-OS is starting — click to skip"
    >
      <div className="font-display text-4xl font-bold tracking-tight text-cream">
        <span className="text-burnt">⬡</span> JP-OS
      </div>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.3em] text-hokie-400">
        security workstation · v1.0
      </p>

      <div className="mt-8 h-[72px] w-72 font-mono text-[10px] leading-relaxed text-hokie-300 sm:w-80">
        {BOOT_LINES.slice(0, visible).map((l) => (
          <p key={l}>{l}</p>
        ))}
      </div>

      <div className="mt-2 h-1 w-72 overflow-hidden rounded-full bg-white/10 sm:w-80">
        <div className="h-full animate-boot-progress rounded-full bg-maroon-light" />
      </div>

      <p className="mt-6 font-mono text-[10px] text-hokie-500">
        click anywhere to skip
      </p>
    </div>
  );
}
