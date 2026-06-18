"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/data";
import { CommandMenu, CommandItem } from "@/components/CommandMenu";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const menuItems: CommandItem[] = [
  { href: "/", label: "Home", hint: "~" },
  { href: "/about", label: "About", hint: "whoami" },
  { href: "/projects", label: "Projects", hint: "ls ./work" },
  { href: "/blog", label: "Blog", hint: "cat notes" },
  { href: "/contact", label: "Contact", hint: "ping me" },
  { href: profile.resume, label: "Download résumé", hint: "open resume", external: true },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // sliding maroon pill behind the active / hovered link
  const railRef = useRef<HTMLDivElement | null>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [pill, setPill] = useState({ left: 0, width: 0, opacity: 0 });

  const moveTo = (el: HTMLElement | null) => {
    if (!el) return;
    setPill({ left: el.offsetLeft, width: el.offsetWidth, opacity: 1 });
  };
  const moveToActive = () => {
    const idx = links.findIndex((l) => isActive(l.href));
    moveTo(linkRefs.current[idx] ?? null);
  };

  useEffect(() => {
    const id = requestAnimationFrame(moveToActive);
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const onResize = () => moveToActive();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Desktop floating pill */}
      <div className="fixed left-1/2 top-4 z-50 hidden -translate-x-1/2 md:block">
        <div
          className={`flex items-center gap-1 rounded-full border border-white/10 backdrop-blur-md transition-all duration-300 ${
            scrolled ? "bg-ink-800/85 px-2 py-1.5 shadow-2xl" : "bg-ink-800/55 px-2.5 py-2"
          }`}
        >
          <Link
            href="/"
            aria-label="Home"
            className="group flex h-8 w-8 items-center justify-center rounded-full border border-white/10 font-mono text-xs font-bold text-burnt transition-colors hover:border-burnt/50"
          >
            JP
          </Link>

          <span className="mx-1 h-5 w-px bg-white/10" />

          <div
            ref={railRef}
            className="relative flex items-center"
            onMouseLeave={moveToActive}
          >
            <span
              className="pointer-events-none absolute top-0 h-full rounded-full bg-maroon/70 transition-all duration-300 ease-out"
              style={{ left: pill.left, width: pill.width, opacity: pill.opacity }}
            />
            {links.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                ref={(el) => {
                  linkRefs.current[i] = el;
                }}
                onMouseEnter={(e) => moveTo(e.currentTarget)}
                className={`relative z-10 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  isActive(l.href) ? "text-cream" : "text-hokie-200 hover:text-cream"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <span className="mx-1 h-5 w-px bg-white/10" />

          <a
            href={profile.resume}
            download
            className="rounded-full bg-burnt/15 px-3.5 py-1.5 text-sm font-semibold text-burnt transition-colors hover:bg-burnt hover:text-ink"
          >
            Résumé ↓
          </a>
        </div>
      </div>

      {/* Mobile floating pill */}
      <div className="fixed left-1/2 top-4 z-50 -translate-x-1/2 md:hidden">
        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-ink-800/85 px-4 py-2 backdrop-blur-md">
          <Link href="/" className="font-display text-sm font-bold">
            <span className="font-mono text-burnt">{">"}</span>{" "}
            <span className="text-cream">jakub</span>
            <span className="text-maroon-light">porada</span>
          </Link>
          <span className="h-5 w-px bg-white/10" />
          <button
            onClick={() => setMenuOpen(true)}
            className="font-mono text-sm text-hokie-200"
            aria-label="Open menu"
          >
            menu
          </button>
        </div>
      </div>

      <CommandMenu open={menuOpen} onClose={() => setMenuOpen(false)} items={menuItems} />
    </>
  );
}
