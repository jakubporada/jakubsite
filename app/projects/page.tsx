import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading, Tag } from "@/components/ui";
import { projects, profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects",
  description: "Security and engineering projects by Jakub Porada.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <p className="eyebrow mb-3">// selected work</p>
      <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">
        Things I&apos;ve <span className="text-gradient">built</span>.
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-zinc-400">
        Hands-on security and engineering projects — from physical SOC builds to
        machine-learning detection pipelines.
      </p>

      <div className="mt-14 space-y-8">
        {projects.map((p, idx) => (
          <article
            key={p.slug}
            id={p.slug}
            className="scroll-mt-24 rounded-2xl border border-white/10 bg-ink-700/40 p-7 transition-colors hover:border-maroon-light/30"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-xs text-burnt">
                {String(idx + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </span>
              {p.featured && (
                <span className="rounded-full bg-maroon/20 px-2.5 py-0.5 font-mono text-xs text-maroon-light">
                  featured
                </span>
              )}
            </div>
            <h2 className="font-display text-2xl font-bold text-white">{p.title}</h2>
            <p className="mt-2 text-zinc-400">{p.blurb}</p>

            <ul className="mt-4 space-y-2 text-sm text-zinc-300">
              {p.points.map((pt, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-burnt">▹</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-14 rounded-2xl border border-dashed border-white/15 p-8 text-center">
        <p className="text-zinc-400">
          More on my{" "}
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="text-burnt hover:text-burnt-light"
          >
            GitHub
          </a>
          . Want the deep dives?{" "}
          <Link href="/blog" className="text-burnt hover:text-burnt-light">
            Read the blog
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
