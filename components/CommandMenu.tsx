"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export type CommandItem = {
  href: string;
  label: string;
  hint: string;
  external?: boolean;
};

/* Terminal-style command palette for navigation. Opens with ⌘K / Ctrl+K
 * or the menu button; arrow keys to move, Enter to go, Esc to close. */
export function CommandMenu({
  open,
  onClose,
  items,
}: {
  open: boolean;
  onClose: () => void;
  items: CommandItem[];
}) {
  const router = useRouter();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (open) setActive(0);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const go = (it: CommandItem) => {
      onClose();
      if (it.external) window.open(it.href, "_blank", "noreferrer");
      else router.push(it.href);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => (a + 1) % items.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => (a - 1 + items.length) % items.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        const it = items[active];
        if (it) go(it);
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, active, items, onClose, router]);

  if (!open) return null;

  const navigate = (it: CommandItem) => {
    onClose();
    if (it.external) window.open(it.href, "_blank", "noreferrer");
    else router.push(it.href);
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-ink/80 px-5 pt-[16vh] backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-xl border border-white/10 bg-ink-800 font-mono shadow-2xl animate-menu-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* title bar */}
        <div className="flex items-center gap-2 border-b border-white/10 bg-ink-700/80 px-4 py-2.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
          <span className="ml-3 text-xs text-hokie-300">
            jakub@porada: ~ — navigate
          </span>
        </div>

        <div className="p-2">
          {items.map((it, i) => (
            <button
              key={it.href}
              onMouseEnter={() => setActive(i)}
              onClick={() => navigate(it)}
              className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm transition-colors ${
                active === i ? "bg-maroon/25 text-burnt" : "text-hokie-200"
              }`}
            >
              <span className="flex items-center gap-3">
                <span className={active === i ? "text-burnt" : "text-hokie-400"}>
                  {active === i ? "▸" : " "}
                </span>
                {it.label}
              </span>
              <span className="text-xs text-hokie-400">{it.hint}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-white/10 px-4 py-2 text-[11px] text-hokie-400">
          <span>↑ ↓ to move · ↵ to open</span>
          <span>esc to close</span>
        </div>
      </div>
    </div>
  );
}
