"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Post } from "@/lib/blog";
import { profile } from "@/lib/data";
import { LetterGlitch } from "@/components/LetterGlitch";
import { Terminal } from "@/components/Terminal";
import { WindowProvider, useWindows } from "./WindowManager";
import { OSWindow } from "./Window";
import { APPS, ICONS } from "./apps";
import { MenuBar } from "./MenuBar";
import { Dock } from "./Dock";
import { BootScreen } from "./BootScreen";
import { DesktopIcon } from "./DesktopIcon";

/* ------------------------------------------------------------------ *
 * JP-OS desktop — the homepage. Full-viewport: wallpaper, menu bar,
 * desktop icons, window layer, dock. Mobile (<768px) gets a launcher
 * grid instead (no window-dragging on phones).
 * ------------------------------------------------------------------ */

function WindowLayer({ posts }: { posts: Post[] }) {
  const { windows, topId, close } = useWindows();

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
          {APPS[win.appId].render({ posts })}
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
  const [termOpen, setTermOpen] = useState(false);
  void posts;

  const tiles: { label: string; icon: keyof typeof ICONS; href?: string; onTap?: () => void; download?: boolean }[] = [
    { label: "Terminal", icon: "terminal", onTap: () => setTermOpen(true) },
    { label: "Overview", icon: "overview", href: "/overview" },
    { label: "About", icon: "about", href: "/about" },
    { label: "Projects", icon: "projects", href: "/projects" },
    { label: "Lab Notes", icon: "notes", href: "/blog" },
    { label: "Contact", icon: "contact", href: "/contact" },
    { label: "Résumé", icon: "resume", href: profile.resume, download: true },
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
        {tiles.map((t) => {
          const inner = (
            <>
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-ink-800/80 text-cream shadow-xl">
                {ICONS[t.icon]}
              </span>
              <span className="font-mono text-[10px] text-hokie-200">{t.label}</span>
            </>
          );
          const cls = "flex flex-col items-center gap-2";
          if (t.href)
            return t.download ? (
              <a key={t.label} href={t.href} download className={cls}>
                {inner}
              </a>
            ) : (
              <Link key={t.label} href={t.href} className={cls}>
                {inner}
              </Link>
            );
          return (
            <button key={t.label} onClick={t.onTap} className={cls}>
              {inner}
            </button>
          );
        })}
      </div>

      <p className="mt-auto pt-8 text-center font-mono text-[10px] text-hokie-500">
        tap an app · best experienced on desktop
      </p>

      {/* Full-screen terminal sheet */}
      {termOpen && (
        <div className="fixed inset-0 z-[90] flex flex-col bg-ink-900">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <span className="font-mono text-xs text-hokie-300">
              terminal — visitor@jp-os
            </span>
            <button
              onClick={() => setTermOpen(false)}
              className="rounded-md border border-white/15 px-3 py-1 font-mono text-xs text-cream"
            >
              ✕ close
            </button>
          </div>
          <div className="min-h-0 flex-1">
            <Terminal frameless />
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
      <DesktopIcon icon={ICONS.readme} label="README.txt" onOpen={() => openApp("readme", { center: true })} />
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
      <Link
        href="/overview"
        className="group flex w-20 flex-col items-center gap-1.5 rounded-lg p-2 text-hokie-100 transition-colors hover:bg-white/[0.06]"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-ink-800/70 text-cream shadow-lg transition-transform group-hover:scale-105">
          {ICONS.overview}
        </span>
        <span className="max-w-full truncate font-mono text-[10px] text-hokie-200 group-hover:text-cream">
          classic site
        </span>
      </Link>
    </div>
  );
}
