"use client";

import { useEffect, useRef, useState } from "react";
import type { Post } from "@/lib/blog";
import { profile } from "@/lib/data";
import { LetterGlitch } from "@/components/LetterGlitch";
import { WindowProvider, useWindows, AppId } from "./WindowManager";
import { OSWindow } from "./Window";
import { APPS, ICONS } from "./apps";
import { MenuBar } from "./MenuBar";
import { Dock } from "./Dock";
import { BootScreen } from "./BootScreen";
import { DesktopIcon } from "./DesktopIcon";

/* ------------------------------------------------------------------ *
 * JP-OS desktop — the homepage. Full-viewport: wallpaper, menu bar,
 * desktop icons, window layer, dock. Mobile (<768px) gets a launcher
 * grid where each app opens as a full-screen sheet (no dragging on
 * phones — but the real apps, not redirects).
 * ------------------------------------------------------------------ */

function WindowLayer({ posts }: { posts: Post[] }) {
  const { windows, topId, close, openApp } = useWindows();

  // Esc closes the focused window (unless typing in a field)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || topId === null) return;
      const el = document.activeElement;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA")) return;
      close(topId);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [topId, close]);

  return (
    <>
      {windows.map((win) => (
        <OSWindow
          key={win.id}
          win={win}
          title={APPS[win.appId].title}
          focused={topId === win.id}
        >
          {APPS[win.appId].render({ posts, open: openApp })}
        </OSWindow>
      ))}
    </>
  );
}

function AutoOpen() {
  const { openApp } = useWindows();
  const ran = useRef(false);
  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    // Terminal in the back, README front-and-center: onboarding for
    // everyone, shell for the technical.
    openApp("terminal");
    openApp("readme", { center: true });
  }, [openApp]);
  return null;
}

function MobileLauncher({ posts }: { posts: Post[] }) {
  const [sheet, setSheet] = useState<AppId | null>(null);

  const tiles: { app?: AppId; label: string; icon: keyof typeof ICONS }[] = [
    { app: "terminal", label: "Terminal", icon: "terminal" },
    { app: "readme", label: "README", icon: "readme" },
    { app: "about", label: "About", icon: "about" },
    { app: "projects", label: "Projects", icon: "projects" },
    { app: "notes", label: "Lab Notes", icon: "notes" },
    { app: "contact", label: "Contact", icon: "contact" },
  ];

  return (
    <div className="relative z-10 flex h-full flex-col px-6 pb-10 pt-14">
      <div className="text-center">
        <p className="font-display text-3xl font-bold text-cream">
          <span className="text-burnt">⬡</span> JP-OS
        </p>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.3em] text-hokie-300">
          Jakub Porada · security workstation
        </p>
      </div>

      <div className="mt-10 grid grid-cols-3 gap-x-4 gap-y-7">
        {tiles.map((t) => (
          <button
            key={t.label}
            onClick={() => setSheet(t.app!)}
            className="flex flex-col items-center gap-2"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-ink-800/80 text-cream shadow-xl">
              {ICONS[t.icon]}
            </span>
            <span className="font-mono text-[10px] text-hokie-200">{t.label}</span>
          </button>
        ))}
        <a href={profile.resume} download className="flex flex-col items-center gap-2">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-ink-800/80 text-burnt shadow-xl">
            {ICONS.resume}
          </span>
          <span className="font-mono text-[10px] text-hokie-200">Résumé</span>
        </a>
      </div>

      <p className="mt-auto pt-8 text-center font-mono text-[10px] text-hokie-500">
        tap an app · best experienced on desktop
      </p>

      {/* Full-screen app sheet */}
      {sheet && (
        <div className="fixed inset-0 z-[90] flex flex-col bg-ink-900">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <span className="font-mono text-xs text-hokie-300">
              {APPS[sheet].title}
            </span>
            <button
              onClick={() => setSheet(null)}
              className="rounded-md border border-white/15 px-3 py-1 font-mono text-xs text-cream"
              aria-label="Close app"
            >
              ✕ close
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto">
            {APPS[sheet].render({ posts, open: setSheet })}
          </div>
        </div>
      )}
    </div>
  );
}

export function Desktop({ posts }: { posts: Post[] }) {
  // "init" → decide boot; "boot" → splash; "ready" → desktop live
  const [phase, setPhase] = useState<"init" | "boot" | "ready">("init");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const booted = sessionStorage.getItem("jpos-booted");
    setPhase(!booted && !reduce ? "boot" : "ready");

    return () => mq.removeEventListener("change", onChange);
  }, []);

  const finishBoot = () => {
    sessionStorage.setItem("jpos-booted", "1");
    setPhase("ready");
  };

  return (
    <div className="relative h-[100dvh] select-none overflow-hidden bg-ink">
      {/* Wallpaper */}
      <div className="absolute inset-0 opacity-40">
        <LetterGlitch glitchSpeed={95} outerVignette centerVignette={false} />
      </div>
      <span className="pointer-events-none absolute bottom-24 right-6 font-display text-6xl font-bold text-white/[0.04] sm:text-8xl">
        JP-OS
      </span>

      {isMobile ? (
        phase !== "init" && <MobileLauncher posts={posts} />
      ) : (
        <WindowProvider>
          <MenuBar />

          {/* Desktop icons */}
          <DesktopIcons />

          <div className="select-text">
            <WindowLayer posts={posts} />
          </div>

          <Dock />
          {phase === "ready" && <AutoOpen />}
        </WindowProvider>
      )}

      {phase === "boot" && !isMobile && <BootScreen onDone={finishBoot} />}
    </div>
  );
}

function DesktopIcons() {
  const { openApp } = useWindows();
  return (
    <div className="absolute left-4 top-12 z-10 flex flex-col gap-2">
      <DesktopIcon
        icon={ICONS.readme}
        label="README.txt"
        onOpen={() => openApp("readme", { center: true })}
      />
      <DesktopIcon
        icon={ICONS.resume}
        label="Resume.pdf"
        onOpen={() => {
          const a = document.createElement("a");
          a.href = profile.resume;
          a.download = "";
          a.click();
        }}
      />
    </div>
  );
}
