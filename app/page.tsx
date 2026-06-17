import Link from "next/link";
import { Terminal } from "@/components/Terminal";
import { ProjectCard, SectionHeading } from "@/components/ui";
import { profile, projects, stats } from "@/lib/data";
import { getAllPosts, formatDate } from "@/lib/blog";

export default function HomePage() {
  const featured = projects.filter((p) => p.featured);
  const latestPosts = getAllPosts().slice(0, 2);

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden">
        <div className="grid-bg absolute inset-0 -z-10 opacity-60" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:py-28">
          <div className="animate-fade-up">
            <p className="eyebrow mb-4">{profile.role}</p>
            <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Hi, I&apos;m <span className="text-gradient">Jakub Porada</span>.
            </h1>
            <p className="mt-5 max-w-lg text-lg text-zinc-400">{profile.tagline}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="rounded-md bg-maroon px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-maroon-light hover:glow-border"
              >
                View Projects
              </Link>
              <a
                href={profile.resume}
                download
                className="rounded-md border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-burnt hover:text-burnt"
              >
                Download Résumé ↓
              </a>
              <Link
                href="/contact"
                className="rounded-md px-5 py-2.5 text-sm font-semibold text-zinc-300 transition-colors hover:text-white"
              >
                Get in touch →
              </Link>
            </div>
          </div>

          <div className="animate-fade-up [animation-delay:150ms]">
            <Terminal />
          </div>
        </div>
      </section>

      {/* ---------- Stats spotlight ---------- */}
      <section className="border-y border-white/5 bg-ink-800/40">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden px-5 py-2 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="px-4 py-6 text-center">
              <p className="font-display text-3xl font-bold text-gradient">{s.value}</p>
              <p className="mt-1 text-xs text-zinc-400">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Quick intro spotlight ---------- */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="rounded-2xl border border-white/10 bg-ink-700/40 p-8 sm:p-10">
          <p className="eyebrow mb-3">// the short version</p>
          <p className="text-xl leading-relaxed text-zinc-300 sm:text-2xl">
            I&apos;m an incoming Virginia Tech Computer Engineering student focused on{" "}
            <span className="text-white">reverse engineering</span>,{" "}
            <span className="text-white">network defense</span>, and{" "}
            <span className="text-white">detection engineering</span> — with two security
            internships and a stack of certifications behind me.
          </p>
          <Link
            href="/about"
            className="mt-6 inline-block font-mono text-sm text-burnt hover:text-burnt-light"
          >
            → read the full story
          </Link>
        </div>
      </section>

      {/* ---------- Featured projects ---------- */}
      <section className="mx-auto max-w-6xl px-5 pb-20">
        <SectionHeading eyebrow="// selected work" title="Featured Projects">
          A couple of things I&apos;ve built. The full list lives on the projects page.
        </SectionHeading>
        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((p) => (
            <ProjectCard
              key={p.slug}
              title={p.title}
              blurb={p.blurb}
              stack={p.stack}
              href={`/projects#${p.slug}`}
            />
          ))}
        </div>
        <Link
          href="/projects"
          className="mt-8 inline-block font-mono text-sm text-burnt hover:text-burnt-light"
        >
          → see all projects
        </Link>
      </section>

      {/* ---------- Latest writing ---------- */}
      {latestPosts.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 pb-24">
          <SectionHeading eyebrow="// from the blog" title="Latest Writing">
            CTF writeups and notes from the lab.
          </SectionHeading>
          <div className="grid gap-6 md:grid-cols-2">
            {latestPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl border border-white/10 bg-ink-700/40 p-6 transition-all hover:-translate-y-1 hover:border-burnt/40"
              >
                <div className="mb-2 flex items-center gap-3 text-xs">
                  <span className="rounded-full bg-maroon/20 px-2 py-0.5 font-mono text-maroon-light">
                    {post.category}
                  </span>
                  <span className="text-zinc-500">{formatDate(post.date)}</span>
                </div>
                <h3 className="font-display text-lg font-bold text-white group-hover:text-burnt">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-400">{post.excerpt}</p>
              </Link>
            ))}
          </div>
          <Link
            href="/blog"
            className="mt-8 inline-block font-mono text-sm text-burnt hover:text-burnt-light"
          >
            → read the blog
          </Link>
        </section>
      )}
    </>
  );
}
