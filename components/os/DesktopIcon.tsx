"use client";

import { ReactNode } from "react";

/* A desktop icon: single click (or Enter) opens — friendlier than
 * requiring a double-click, especially for non-technical visitors. */
export function DesktopIcon({
  icon,
  label,
  onOpen,
}: {
  icon: ReactNode;
  label: string;
  onOpen: () => void;
}) {
  return (
    <button
      onClick={onOpen}
      className="group flex w-20 flex-col items-center gap-1.5 rounded-lg p-2 text-hokie-100 transition-colors hover:bg-white/[0.06] focus-visible:bg-white/[0.08] focus-visible:outline-none"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-ink-800/70 text-cream shadow-lg transition-transform group-hover:scale-105">
        {icon}
      </span>
      <span className="max-w-full truncate font-mono text-[10px] text-hokie-200 group-hover:text-cream">
        {label}
      </span>
    </button>
  );
}
