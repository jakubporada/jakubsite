"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { profile } from "@/lib/data";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-ink/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="group flex items-center gap-2 font-display font-bold">
          <span className="font-mono text-burnt">{">"}</span>
          <span className="text-white">jakub</span>
          <span className="text-maroon-light group-hover:text-burnt transition-colors">
            porada
          </span>
          <span className="animate-blink text-burnt">_</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive(l.href)
                  ? "text-burnt"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={profile.resume}
            download
            className="ml-3 rounded-md border border-maroon-light/40 bg-maroon/20 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-maroon hover:glow-border"
          >
            Resume ↓
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-2 text-zinc-300 md:hidden"
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-6 bg-current transition ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-6 bg-current transition ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-current transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-white/5 bg-ink px-5 py-3 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block rounded-md px-3 py-2 text-sm ${
                isActive(l.href) ? "text-burnt" : "text-zinc-300"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={profile.resume}
            download
            className="mt-2 block rounded-md border border-maroon-light/40 bg-maroon/20 px-3 py-2 text-center text-sm font-semibold text-white"
          >
            Download Resume ↓
          </a>
        </div>
      )}
    </header>
  );
}
