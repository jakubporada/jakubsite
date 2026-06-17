import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading, Tag } from "@/components/ui";
import {
  profile,
  experience,
  skills,
  certifications,
  education,
  interests,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description: "Background, experience, skills, and certifications.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      {/* Intro */}
      <p className="eyebrow mb-3">// about me</p>
      <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">
        The full <span className="text-gradient">story</span>.
      </h1>
      <div className="mt-6 space-y-4 text-lg leading-relaxed text-zinc-300">
        <p>{profile.summary}</p>
        <p>
          I&apos;m headed to <span className="text-white">Virginia Tech</span> for Computer
          Engineering, but I&apos;ve spent the last few years going deep on security through
          dual-enrollment coursework, certifications, competitions, and two internships. What
          I enjoy most is the low-level stuff — reverse engineering binaries, reading network
          traffic, and figuring out how an attacker would actually move so I can stop them.
        </p>
        <p>
          Outside of security, I compete as a{" "}
          <span className="text-white">Division I athlete</span> — the discipline and time
          management that takes shows up in how I approach everything I build.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={profile.resume}
          download
          className="rounded-md bg-maroon px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-maroon-light hover:glow-border"
        >
          Download Résumé ↓
        </a>
        <Link
          href="/contact"
          className="rounded-md border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-burnt hover:text-burnt"
        >
          Get in touch →
        </Link>
      </div>

      {/* Experience */}
      <section className="mt-20">
        <SectionHeading eyebrow="// experience" title="Where I've Worked" />
        <div className="space-y-8 border-l border-white/10 pl-6">
          {experience.map((job) => (
            <div key={job.company} className="relative">
              <span
                className={`absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 ${
                  job.current
                    ? "border-burnt bg-burnt animate-glow-pulse"
                    : "border-maroon-light bg-ink"
                }`}
              />
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-xl font-bold text-white">
                  {job.role}{" "}
                  <span className="text-maroon-light">@ {job.company}</span>
                </h3>
                <span className="font-mono text-xs text-zinc-500">{job.period}</span>
              </div>
              <ul className="mt-3 space-y-2 text-sm text-zinc-400">
                {job.points.map((pt, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-burnt">▹</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mt-20">
        <SectionHeading eyebrow="// toolbox" title="Skills & Tools" />
        <div className="grid gap-6 sm:grid-cols-2">
          {skills.map((s) => (
            <div
              key={s.group}
              className="rounded-2xl border border-white/10 bg-ink-700/40 p-5"
            >
              <p className="mb-3 font-mono text-sm text-burnt">{s.group}</p>
              <div className="flex flex-wrap gap-2">
                {s.items.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="mt-20">
        <SectionHeading eyebrow="// credentials" title="Certifications" />
        <div className="grid gap-3 sm:grid-cols-2">
          {certifications.map((c) => (
            <div
              key={c.name}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-ink-700/40 px-4 py-3"
            >
              <span className="text-sm text-zinc-200">{c.name}</span>
              <span className="font-mono text-xs text-maroon-light">{c.year}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mt-20">
        <SectionHeading eyebrow="// education" title="Education" />
        <div className="space-y-4">
          {education.map((e) => (
            <div
              key={e.school}
              className="rounded-2xl border border-white/10 bg-ink-700/40 p-5"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-lg font-bold text-white">{e.school}</h3>
                <span className="font-mono text-xs text-zinc-500">{e.period}</span>
              </div>
              <p className="mt-1 text-sm text-zinc-300">{e.degree}</p>
              {e.note && <p className="mt-1 text-sm text-zinc-500">{e.note}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Beyond the screen */}
      <section className="mt-20">
        <SectionHeading eyebrow="// off the clock" title="Beyond the Screen" />
        <ul className="grid gap-3 sm:grid-cols-2">
          {interests.map((it) => (
            <li
              key={it}
              className="flex items-start gap-3 rounded-xl border border-white/10 bg-ink-700/40 px-4 py-3 text-sm text-zinc-300"
            >
              <span className="text-burnt">◆</span>
              {it}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
