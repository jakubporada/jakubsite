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
      <div className="mb-4 h-px w-12 bg-burnt/70" />
      <p className="eyebrow mb-2">{eyebrow}</p>
      <h2 className="font-display text-3xl font-bold tracking-tight text-cream sm:text-4xl">
        {title}
      </h2>
      {children && <p className="mt-3 max-w-2xl text-sand">{children}</p>}
    </div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-xs text-hokie-200">
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
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-800/60 p-6 transition-all hover:-translate-y-1 hover:border-maroon-light/40 hover:glow-border"
    >
      {/* corner tick — engineering detail */}
      <span className="pointer-events-none absolute right-0 top-0 h-10 w-10 border-r border-t border-burnt/0 transition-colors group-hover:border-burnt/50" />
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-xs text-burnt">./project</span>
        <span className="text-hokie-400 transition-transform group-hover:translate-x-1 group-hover:text-burnt">
          →
        </span>
      </div>
      <h3 className="font-display text-xl font-bold text-cream group-hover:text-gradient">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-sm text-sand">{blurb}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {stack.map((s) => (
          <Tag key={s}>{s}</Tag>
        ))}
      </div>
    </Link>
  );
}
