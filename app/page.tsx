import Link from "next/link";
import { Terminal } from "@/components/Terminal";
import { SectionHeading } from "@/components/ui";
import {
  profile,
  projects,
  stats,
  certifications,
  experience,
} from "@/lib/data";
import { getAllPosts, formatDate } from "@/lib/blog";

export default function HomePage() {
  const featured = projects.filter((p) => p.featured);
  const latestPosts = getAllPosts().slice(0, 2);
  const incoming = experience.find((e) => e.current);

  // Marquee items: competition placements + certifications.
  const ticker = [
    "Top 15 · National Cyber League",
    "Platinum · CyberPatriot Semi-Finalist",
    ...certifications.map((c) => `${c.name} · ${c.year}`),
    "Division I Athlete",
  ];

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden">
        <div className="grid-bg absolute inset-0 -z-10" />

        {/* The live detection signal — an IDS/EKG sweep tied to network defense */}
        <svg
          className="pointer-events-none absolute inset-x-0 bottom-10 -z-10 h-48 w-full opacity-50"
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            className="signal-line"
            d="M0 140 L120 140 L150 90 L165 160 L185 60 L205 140 L320 140 L360 140 L380 120 L400 150 L440 140 L560 140 L590 40 L610 178 L630 140 L760 140 L800 110 L820 150 L900 140 L940 140 L965 95 L985 150 L1010 140 L1200 140"
            fill="none"
            stroke="#861F41"
            strokeWidth="2"
          />
          <path
            d="M0 140 L120 140 L150 90 L165 160 L185 60 L205 140 L320 140 L360 140 L380 120 L400 150 L440 140 L560 140 L590 40 L610 178 L630 140 L760 140 L800 110 L820 150 L900 140 L940 140 L965 95 L985 150 L1010 140 L1200 140"
            fill="none"
            stroke="rgba(229,117,31,0.18)"
            strokeWidth="1"
          />
        </svg>

        {/* Status strip */}
        <div className="mx-auto max-w-6xl px-5 pt-8">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-hokie-300">
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-burnt/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-burnt" />
              </span>
              Available · Summer 2027
            </span>
            {incoming && (
              <span className="text-hokie-200">
                <span className="text-burnt">↳</span> Incoming: {incoming.company}{" "}
                {incoming.role.replace(" (Incoming)", "")} — {incoming.period}
              </span>
            )}
            <span className="ml-auto hidden sm:block text-hokie-400">
              {profile.location}
            </span>
          </div>
          <div className="rule mt-4" />
        </div>

        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-[1.05fr_0.95fr] md:py-24">
          <div className="animate-fade-up">
            <p className="eyebrow mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-burnt/70" />
              Reverse Engineering · Network Defense
            </p>
            <h1 className="font-display text-6xl font-bold leading-[0.92] tracking-tight text-cream sm:text-7xl lg:text-8xl">
              Jakub
              <br />
              <span className="relative inline-block">
                Porada
                <span className="absolute -bottom-1 left-0 -z-10 h-4 w-full -skew-x-6 bg-maroon/40" />
              </span>
            </h1>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-sand">
              {profile.tagline}
            </p>

            {/* Stat row */}
            <div className="mt-9 flex flex-wrap items-end gap-x-9 gap-y-5">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col gap-1.5">
                  {s.tone === "chip" ? (
                    <span className="chip-maroon w-fit rounded-lg px-2.5 py-1 font-display text-2xl font-bold leading-none text-maroon-light">
                      {s.value}
                    </span>
                  ) : (
                    <span
                      className={`font-display text-3xl font-bold leading-none ${
                        s.tone === "accent" ? "text-burnt" : "text-cream"
                      }`}
                    >
                      {s.value}
                    </span>
                  )}
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-hokie-400">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="rounded-md bg-maroon px-5 py-2.5 text-sm font-semibold text-cream transition-all hover:bg-maroon-light hover:glow-border"
              >
                View Projects
              </Link>
              <a
                href={profile.resume}
                download
                className="rounded-md border border-white/15 px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:border-burnt hover:text-burnt"
              >
                Download Résumé ↓
              </a>
              <Link
                href="/contact"
                className="rounded-md px-5 py-2.5 text-sm font-semibold text-sand transition-colors hover:text-cream"
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

      {/* ---------- Certifications ticker ---------- */}
      <section className="relative border-y border-white/5 bg-ink-900/40 py-4">
        <div className="marquee-mask flex overflow-hidden">
          <div className="marquee-track flex shrink-0 items-center gap-8 pr-8">
            {[...ticker, ...ticker].map((item, i) => (
              <span
                key={i}
                className="flex shrink-0 items-center gap-8 font-mono text-xs uppercase tracking-[0.2em] text-hokie-300"
              >
                {item}
                <span className="text-burnt/60">/</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Intro slab (Hokie Stone) ---------- */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="hokie-stone glow-border relative overflow-hidden rounded-2xl border border-white/10 p-8 sm:p-12">
          <span className="pointer-events-none absolute -right-6 -top-6 font-display text-[10rem] font-bold leading-none text-white/[0.03]">
            VT
          </span>
          <p className="eyebrow mb-3">// the short version</p>
          <p className="max-w-3xl text-xl leading-relaxed text-cream/90 sm:text-2xl">
            I&apos;m an incoming Virginia Tech Computer Engineering student focused on{" "}
            <span className="text-burnt">reverse engineering</span>,{" "}
            <span className="text-burnt">network defense</span>, and{" "}
            <span className="text-burnt">detection engineering</span> — with two security
            internships and a stack of certifications behind me.
          </p>
          <Link
            href="/about"
            className="mt-6 inline-block font-mono text-sm text-burnt transition-colors hover:text-burnt-light"
          >
            → read the full story
          </Link>
        </div>
      </section>

      {/* ---------- Selected work — editorial index ---------- */}
      <section className="mx-auto max-w-6xl px-5 pb-20">
        <SectionHeading eyebrow="// selected work" title="Selected Work">
          A couple of systems I&apos;ve built end to end. The full index lives on the
          projects page.
        </SectionHeading>

        <div className="rule">
          {featured.map((p, i) => (
            <Link
              key={p.slug}
              href={`/projects#${p.slug}`}
              className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-x-5 border-b border-white/[0.07] py-7 transition-colors hover:bg-white/[0.02] sm:gap-x-8"
            >
              <span className="font-mono text-sm text-burnt">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-2xl font-bold text-cream transition-colors group-hover:text-gradient sm:text-3xl">
                  {p.title}
                </h3>
                <p className="mt-2 max-w-2xl text-sm text-sand">{p.blurb}</p>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.16em] text-hokie-400">
                  {p.stack.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              </div>
              <span className="text-hokie-400 transition-transform group-hover:translate-x-1 group-hover:text-burnt">
                →
              </span>
            </Link>
          ))}
        </div>

        <Link
          href="/projects"
          className="mt-8 inline-block font-mono text-sm text-burnt transition-colors hover:text-burnt-light"
        >
          → see all projects
        </Link>
      </section>

      {/* ---------- Latest writing ---------- */}
      {latestPosts.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 pb-24">
          <SectionHeading eyebrow="// from the lab" title="Latest Writing">
            CTF writeups and notes from the home lab.
          </SectionHeading>
          <div className="grid gap-6 md:grid-cols-2">
            {latestPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl border border-white/10 bg-ink-800/60 p-6 transition-all hover:-translate-y-1 hover:border-burnt/40"
              >
                <div className="mb-2 flex items-center gap-3 text-xs">
                  <span className="rounded-full bg-maroon/20 px-2 py-0.5 font-mono text-maroon-light">
                    {post.category}
                  </span>
                  <span className="text-hokie-400">{formatDate(post.date)}</span>
                </div>
                <h3 className="font-display text-lg font-bold text-cream group-hover:text-burnt">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-sand">{post.excerpt}</p>
              </Link>
            ))}
          </div>
          <Link
            href="/blog"
            className="mt-8 inline-block font-mono text-sm text-burnt transition-colors hover:text-burnt-light"
          >
            → read the blog
          </Link>
        </section>
      )}

      {/* ---------- CTA band ---------- */}
      <section className="mx-auto max-w-6xl px-5 pb-24">
        <div className="relative overflow-hidden rounded-2xl border border-maroon-light/20 bg-gradient-to-br from-maroon/15 to-ink-800/40 p-10 text-center sm:p-14">
          <p className="eyebrow mb-3">// open to internships</p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-cream sm:text-4xl">
            Let&apos;s build something secure.
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sand">
            I&apos;m looking for cybersecurity internships in reverse engineering,
            detection, and network defense.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="rounded-md bg-burnt px-6 py-2.5 text-sm font-semibold text-ink transition-all hover:bg-burnt-light hover:glow-border"
            >
              Get in touch →
            </Link>
            <a
              href={profile.resume}
              download
              className="rounded-md border border-white/15 px-6 py-2.5 text-sm font-semibold text-cream transition-colors hover:border-burnt hover:text-burnt"
            >
              Download Résumé ↓
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
