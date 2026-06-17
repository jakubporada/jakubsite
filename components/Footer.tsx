import Link from "next/link";
import { profile } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-ink-800/50">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-zinc-500 sm:flex-row">
        <p className="font-mono">
          <span className="text-burnt">{">"}</span> built &amp; secured by {profile.name}
        </p>
        <div className="flex items-center gap-5">
          <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-white">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-white">
            LinkedIn
          </a>
          <Link href="/contact" className="hover:text-white">
            Contact
          </Link>
        </div>
        <p>© {new Date().getFullYear()} {profile.name}</p>
      </div>
    </footer>
  );
}
