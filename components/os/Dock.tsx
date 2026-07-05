"use client";

import { profile } from "@/lib/data";
import { useWindows } from "./WindowManager";
import { APPS, DOCK_ORDER, ICONS } from "./apps";

/* JP-OS dock: blurred pill, tooltips, running-app indicators. */
export function Dock() {
  const { openApp, isOpen } = useWindows();

  return (
    <div className="absolute inset-x-0 bottom-4 z-[60] flex justify-center px-4">
      <div className="flex items-end gap-1 rounded-2xl border border-white/10 bg-ink-800/70 px-3 py-2 shadow-2xl backdrop-blur-md">
        {DOCK_ORDER.map((appId) => (
          <button
            key={appId}
            onClick={() => openApp(appId)}
            aria-label={`Open ${APPS[appId].label}`}
            className="group relative flex h-12 w-12 flex-col items-center justify-center rounded-xl text-hokie-100 transition-all hover:-translate-y-1 hover:bg-white/10 hover:text-cream"
          >
            {ICONS[appId]}
            {/* tooltip */}
            <span className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-md border border-white/10 bg-ink-800/95 px-2.5 py-1 font-mono text-[10px] text-cream opacity-0 shadow-xl transition-opacity group-hover:opacity-100">
              {APPS[appId].label}
            </span>
            {/* running dot */}
            <span
              className={`absolute -bottom-0.5 h-1 w-1 rounded-full transition-opacity ${
                isOpen(appId) ? "bg-maroon-light opacity-100" : "opacity-0"
              }`}
            />
          </button>
        ))}

        <span className="mx-1.5 h-8 w-px self-center bg-white/10" />

        <a
          href={profile.resume}
          download
          aria-label="Download résumé"
          className="group relative flex h-12 w-12 items-center justify-center rounded-xl text-burnt transition-all hover:-translate-y-1 hover:bg-white/10 hover:text-burnt-light"
        >
          {ICONS.resume}
          <span className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-md border border-white/10 bg-ink-800/95 px-2.5 py-1 font-mono text-[10px] text-cream opacity-0 shadow-xl transition-opacity group-hover:opacity-100">
            Résumé ↓
          </span>
        </a>
      </div>
    </div>
  );
}
