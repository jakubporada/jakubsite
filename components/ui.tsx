import Link from "next/link";
import { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-10">
      <p className="eyebrow mb-2">{eyebrow}</p>
      <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">{title}</h2>
      {children && <p className="mt-3 max-w-2xl text-zinc-400">{children}</p>}
    </div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs text-zinc-300">
      {children}
    </span>
  );
}

export function ProjectCard({
  title,
  blurb,
  stack,
  href,
}: {
  title: string;
  blurb: string;
  stack: string[];
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col rounded-2xl border border-white/10 bg-ink-700/50 p-6 transition-all hover:-translate-y-1 hover:border-maroon-light/40 hover:glow-border"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-xs text-burnt">./project</span>
        <span className="text-zinc-600 transition-colors group-hover:text-burnt">→</span>
      </div>
      <h3 className="font-display text-xl font-bold text-white group-hover:text-gradient">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-sm text-zinc-400">{blurb}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {stack.map((s) => (
          <Tag key={s}>{s}</Tag>
        ))}
      </div>
    </Link>
  );
}
