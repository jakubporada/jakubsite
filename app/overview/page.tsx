import type { Metadata } from "next";
import Link from "next/link";
import { ReactNode } from "react";
import { Terminal } from "@/components/Terminal";
import { LetterGlitch } from "@/components/LetterGlitch";
import { Reveal } from "@/components/Reveal";
import { ScrollStack } from "@/components/ScrollStack";
import {
  profile,
  projects,
  stats,
  certifications,
  experience,
} from "@/lib/data";
import { getAllPosts, formatDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Overview",
  description:
    "The classic-site overview of Jakub Porada — cybersecurity, reverse engineering, and network defense.",
};

/* ---------- Field Manual primitives (classic overview page) ---------- */

function FileHeader({
  n,
  title,
  meta,
}: {
  n: string;
  title: string;
  meta?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b-2 border-ink/80 pb-3">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-[11px] font-semibold tracking-[0.25em] text-maroon-deep">
          FILE {n}
        </span>
        <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {title}
        </h2>
      </div>
      {meta && (
        <div className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40 sm:block">
          {meta}
        </div>
      )}
    </div>
  );
}

function Stamp({
  top,
  bottom,
  className = "",
}: {
  top: string;
  bottom: string;
  className?: string;
}) {
  return (
    <span
      className={`flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-full border-[2.5px] border-current text-center font-mono uppercase leading-tight opacity-80 outline-dashed outline-1 outline-offset-[-7px] outline-current ${className}`}
      aria-hidden="true"
    >
      <span className="text-sm font-bold tracking-wide">{top}</span>
      <span className="mt-1 max-w-[5.2rem] px-1 text-[7px] tracking-[0.14em]">{bottom}</span>
    </span>
  );
}

export default function OverviewPage() {
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
      {/* ---------- Hero (the dark cover of the file) ---------- */}
      <section className="relative overflow-hidden">
        {/* Letter Glitch background — atmospheric maroon "signal" */}
        <div className="absolute inset-0 -z-20 opacity-60">
          <LetterGlitch glitchSpeed={75} outerVignette centerVignette={false} />
        </div>

        {/* The live detection signal — an IDS/EKG sweep tied to network defense */}
        <svg
          className="pointer-events-none absolute inset-x-0 bottom-10 -z-10 h-48 w-full opacity-40"
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
              Porada
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

      {/* ---------- Certifications ticker (the seam) ---------- */}
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

      {/* ================================================================
          FIELD MANUAL — the dossier opens. Dark cover above, paper below.
          ================================================================ */}
      <div className="mt-14">
        {/* Manila folder tab */}
        <div className="mx-auto max-w-6xl px-5">
          <span className="relative top-px z-10 inline-block rounded-t-lg bg-paper px-5 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-maroon-deep sm:text-[11px]">
            Dossier · Jakub Porada · cleared for release
          </span>
        </div>

        <div className="bg-paper text-ink">
          <div className="mx-auto max-w-6xl px-5 pb-28 pt-14">
            {/* ---------- FILE 01 · Briefing ---------- */}
            <Reveal>
              <section>
                <FileHeader
                  n="01"
                  title="Briefing"
                  meta={
                    <span className="flex items-center gap-3">
                      <span>case no. JP-2030-VT</span>
                      <span className="barcode h-5 w-24 text-ink/60" />
                    </span>
                  }
                />
                <div className="mt-9 grid gap-10 md:grid-cols-[1fr_auto] md:items-start">
                  <div>
                    <p className="max-w-2xl font-display text-2xl font-medium leading-snug text-ink sm:text-3xl">
                      Incoming Virginia Tech Computer Engineering student focused on{" "}
                      <span className="text-maroon-deep">reverse engineering</span>,{" "}
                      <span className="text-maroon-deep">network defense</span>, and{" "}
                      <span className="text-maroon-deep">detection engineering</span>.
                    </p>
                    <p className="mt-6 max-w-2xl leading-relaxed text-ink-600/90">
                      Two security internships, eight-plus industry certifications, and a
                      habit of taking systems apart to understand exactly how they break —
                      then building the thing that stops it.
                    </p>
                    <p className="mt-6 font-mono text-sm text-ink/50">
                      clearance level:{" "}
                      <span className="redact" tabIndex={0}>
                        ask me after the interview
                      </span>
                    </p>
                    <Link
                      href="/about"
                      className="mt-7 inline-block font-mono text-sm font-semibold text-maroon-deep transition-colors hover:text-burnt-deep"
                    >
                      → read the full story
                    </Link>
                  </div>

                  {/* Credential stamps */}
                  <div className="flex gap-6 md:flex-col md:pr-4">
                    <Stamp
                      top={stats[0].value}
                      bottom={stats[0].label}
                      className="-rotate-6 text-maroon-deep"
                    />
                    <Stamp
                      top={stats[1].value}
                      bottom={stats[1].label}
                      className="rotate-3 text-burnt-dark"
                    />
                  </div>
                </div>
              </section>
            </Reveal>

            {/* ---------- FILE 02 · Selected work (exhibits) ---------- */}
            <section className="mt-24">
              <Reveal>
                <FileHeader
                  n="02"
                  title="Selected Work"
                  meta={`${featured.length} exhibits attached`}
                />
              </Reveal>

              <div className="mt-10">
                <ScrollStack
                  items={featured.map((p, i) => (
                    <Link
                      key={p.slug}
                      href={`/projects#${p.slug}`}
                      className="group block overflow-hidden rounded-xl border border-ink/15 bg-paper-light p-8 shadow-[0_24px_50px_-24px_rgba(27,20,16,0.4)] transition-colors hover:border-maroon-deep/40 sm:p-10"
                    >
                      <div className="mb-5 flex items-center justify-between">
                        <span className="font-mono text-sm font-semibold tracking-[0.18em] text-maroon-deep">
                          EXHIBIT {String.fromCharCode(65 + i)}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40">
                          case file · featured
                        </span>
                      </div>
                      <h3 className="font-display text-3xl font-bold tracking-tight text-ink transition-colors group-hover:text-maroon-deep sm:text-4xl">
                        {p.title}
                      </h3>
                      <p className="mt-3 max-w-2xl text-ink-600/90">{p.blurb}</p>
                      <ul className="mt-5 space-y-2">
                        {p.points.map((pt) => (
                          <li key={pt} className="flex gap-3 text-sm text-ink-600/80">
                            <span className="mt-0.5 shrink-0 text-maroon-deep">▸</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {p.stack.map((s) => (
                          <span
                            key={s}
                            className="rounded border border-ink/15 bg-ink/[0.04] px-2.5 py-1 font-mono text-xs text-ink-600"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                      <span className="mt-7 inline-flex items-center gap-2 font-mono text-sm font-semibold text-maroon-deep transition-transform group-hover:translate-x-1">
                        Open exhibit →
                      </span>
                    </Link>
                  ))}
                />
              </div>

              <Link
                href="/projects"
                className="mt-10 inline-block font-mono text-sm font-semibold text-maroon-deep transition-colors hover:text-burnt-deep"
              >
                → full project index
              </Link>
            </section>

            {/* ---------- FILE 03 · Lab notes ---------- */}
            {latestPosts.length > 0 && (
              <section className="mt-24">
                <Reveal>
                  <FileHeader n="03" title="Lab Notes" meta="from the blog" />
                </Reveal>
                <div className="mt-9 grid gap-6 md:grid-cols-2">
                  {latestPosts.map((post, i) => (
                    <Reveal key={post.slug} delay={i * 90}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="ruled group block h-full rounded-lg border border-ink/15 bg-paper-light p-6 pt-5 shadow-[0_14px_34px_-20px_rgba(27,20,16,0.35)] transition-all hover:-translate-y-1 hover:border-maroon-deep/40"
                      >
                        <div className="mb-3 flex items-center gap-3 text-xs">
                          <span className="rounded-sm bg-maroon-deep px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-paper">
                            {post.category}
                          </span>
                          <span className="font-mono text-ink/45">{formatDate(post.date)}</span>
                        </div>
                        <h3 className="font-display text-xl font-bold text-ink group-hover:text-maroon-deep">
                          {post.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-ink-600/80">
                          {post.excerpt}
                        </p>
                      </Link>
                    </Reveal>
                  ))}
                </div>
                <Link
                  href="/blog"
                  className="mt-8 inline-block font-mono text-sm font-semibold text-maroon-deep transition-colors hover:text-burnt-deep"
                >
                  → read the blog
                </Link>
              </section>
            )}

            {/* ---------- FILE 04 · Action required ---------- */}
            <section className="mt-24">
              <Reveal>
                <div className="relative overflow-hidden rounded-2xl bg-maroon-deep px-8 py-12 text-center sm:px-12 sm:py-16">
                  <Stamp
                    top="CLEARED"
                    bottom="for hire · vt 2030"
                    className="absolute -right-3 -top-3 hidden rotate-12 text-cream/70 sm:flex"
                  />
                  <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-burnt-light">
                    // FILE 04 · action required
                  </p>
                  <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-cream sm:text-4xl">
                    Let&apos;s build something secure.
                  </h2>
                  <p className="mx-auto mt-3 max-w-lg text-cream/70">
                    I&apos;m looking for cybersecurity internships in reverse engineering,
                    detection, and network defense.
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <Link
                      href="/contact"
                      className="rounded-md bg-paper px-6 py-2.5 text-sm font-semibold text-maroon-deep transition-colors hover:bg-cream"
                    >
                      Get in touch →
                    </Link>
                    <a
                      href={profile.resume}
                      download
                      className="rounded-md border border-cream/40 px-6 py-2.5 text-sm font-semibold text-cream transition-colors hover:border-cream hover:bg-cream/10"
                    >
                      Download Résumé ↓
                    </a>
                  </div>
                </div>
              </Reveal>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
