"use client";

import { profile } from "@/lib/data";
import type { AppId } from "@/components/os/WindowManager";

/* README.txt — the friendly on-ramp. Auto-opens on first visit so
 * non-technical visitors are never stranded on an empty desktop. */
export function ReadmeContent({ onOpen }: { onOpen: (app: AppId) => void }) {
  return (
    <div className="p-6 sm:p-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-burnt">
        readme.txt
      </p>
      <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-cream">
        Hi — welcome to JP-OS. 👋
      </h2>
      <p className="mt-4 leading-relaxed text-sand">
        I&apos;m <span className="text-cream">Jakub Porada</span> — a cybersecurity
        student headed to Virginia Tech, focused on reverse engineering and network
        defense. This whole site is a little operating system I built: drag the
        windows, explore the apps in the dock, or drive everything from the Terminal.
      </p>

      <div className="mt-6 space-y-2.5">
        <a
          href={profile.resume}
          download
          className="block rounded-lg bg-maroon px-4 py-3 text-center text-sm font-semibold text-cream transition-colors hover:bg-maroon-light"
        >
          Download my résumé ↓
        </a>
        <button
          onClick={() => onOpen("projects")}
          className="block w-full rounded-lg border border-white/15 px-4 py-3 text-center text-sm font-semibold text-cream transition-colors hover:border-burnt hover:text-burnt"
        >
          See what I&apos;ve built →
        </button>
        <button
          onClick={() => onOpen("about")}
          className="block w-full rounded-lg border border-white/15 px-4 py-3 text-center text-sm font-semibold text-cream transition-colors hover:border-burnt hover:text-burnt"
        >
          Who is Jakub?
        </button>
        <button
          onClick={() => onOpen("contact")}
          className="block w-full rounded-lg border border-white/15 px-4 py-3 text-center text-sm font-semibold text-cream transition-colors hover:border-burnt hover:text-burnt"
        >
          Get in touch
        </button>
      </div>

      <div className="mt-6 rounded-lg border border-white/10 bg-ink-800/80 p-4">
        <p className="font-mono text-xs leading-relaxed text-hokie-300">
          <span className="text-burnt">$</span> technical? open the Terminal and type{" "}
          <span className="text-cream">help</span> — the shell actually works, and
          there&apos;s a flag hidden somewhere.
        </p>
      </div>
    </div>
  );
}
