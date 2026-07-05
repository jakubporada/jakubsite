import { profile, experience, skills, certifications, education } from "@/lib/data";

/* About.app — compact dossier for a window. Content sourced from lib/data.ts. */
export function AboutContent() {
  return (
    <div className="space-y-8 p-6 sm:p-8">
      <section>
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-burnt">
          // whoami
        </p>
        <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-cream">
          {profile.name}
        </h2>
        <p className="mt-1 text-sm text-maroon-light">{profile.role} · {profile.school}</p>
        <p className="mt-4 text-sm leading-relaxed text-sand">{profile.summary}</p>
      </section>

      <section>
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-burnt">
          // experience
        </p>
        <div className="space-y-4">
          {experience.map((job) => (
            <div key={job.company} className="rounded-lg border border-white/10 bg-ink-800/70 p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-sm font-bold text-cream">
                  {job.role} <span className="text-maroon-light">@ {job.company}</span>
                </h3>
                <span className="font-mono text-[10px] text-hokie-400">{job.period}</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-sand">{job.points[0]}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-burnt">
          // toolbox
        </p>
        <div className="space-y-2">
          {skills.map((s) => (
            <div key={s.group} className="flex flex-wrap gap-x-2 gap-y-1 text-xs">
              <span className="w-40 shrink-0 font-mono text-hokie-400">{s.group}</span>
              <span className="flex-1 text-sand">{s.items.join(" · ")}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-burnt">
          // certifications
        </p>
        <ul className="space-y-1.5">
          {certifications.map((c) => (
            <li key={c.name} className="flex items-baseline justify-between gap-3 text-xs">
              <span className="text-sand">{c.name}</span>
              <span className="font-mono text-maroon-light">{c.year}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-burnt">
          // education
        </p>
        <div className="space-y-3">
          {education.map((e) => (
            <div key={e.school} className="text-xs">
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-bold text-cream">{e.school}</span>
                <span className="font-mono text-hokie-400">{e.period}</span>
              </div>
              <p className="mt-0.5 text-sand">{e.degree}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
