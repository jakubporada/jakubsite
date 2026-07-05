"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/data";
import { useWindows } from "./WindowManager";
import { APPS } from "./apps";

/* JP-OS menu bar: system menu, focused-app name, availability, live clock. */
export function MenuBar() {
  const { openApp, windows, topId } = useWindows();
  const focusedApp = windows.find((w) => w.id === topId)?.appId ?? null;
  const [menuOpen, setMenuOpen] = useState(false);
  const [time, setTime] = useState<string>("");
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        })
      );
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e: PointerEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, [menuOpen]);

  return (
    <div className="absolute inset-x-0 top-0 z-[60] flex h-[34px] items-center gap-4 border-b border-white/10 bg-ink-900/80 px-4 font-mono text-xs text-hokie-200 backdrop-blur-md">
      <div ref={menuRef} className="relative">
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className={`flex items-center gap-2 rounded px-2 py-1 font-semibold transition-colors ${
            menuOpen ? "bg-maroon/40 text-cream" : "text-cream hover:bg-white/10"
          }`}
        >
          <span className="text-burnt">⬡</span> JP-OS
        </button>
        {menuOpen && (
          <div className="absolute left-0 top-full mt-1 w-56 overflow-hidden rounded-lg border border-white/10 bg-ink-800/95 py-1 shadow-2xl backdrop-blur-md animate-menu-in">
            <button
              onClick={() => {
                openApp("readme", { center: true });
                setMenuOpen(false);
              }}
              className="block w-full px-4 py-2 text-left hover:bg-maroon/30 hover:text-cream"
            >
              About this OS
            </button>
            <a
              href={profile.resume}
              download
              className="block px-4 py-2 hover:bg-maroon/30 hover:text-cream"
              onClick={() => setMenuOpen(false)}
            >
              Download résumé ↓
            </a>
            <div className="my-1 border-t border-white/10" />
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="block px-4 py-2 hover:bg-maroon/30 hover:text-cream"
            >
              GitHub ↗
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="block px-4 py-2 hover:bg-maroon/30 hover:text-cream"
            >
              LinkedIn ↗
            </a>
          </div>
        )}
      </div>

      {/* focused app name — like a real OS */}
      <span className="hidden font-semibold text-cream sm:block">
        {focusedApp ? APPS[focusedApp].label : "Desktop"}
      </span>
      <span className="hidden text-hokie-400 md:block">jakubporada.com</span>

      <span className="ml-auto hidden items-center gap-2 uppercase tracking-[0.14em] text-hokie-300 sm:flex">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-burnt/70" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-burnt" />
        </span>
        Available · Summer 2027
      </span>

      <span className="tabular-nums text-hokie-200" suppressHydrationWarning>
        {time}
      </span>
    </div>
  );
}
