import { projects } from "@/lib/data";

/* Projects.app — the exhibits, windowed. */
export function ProjectsContent() {
  return (
    <div className="space-y-5 p-6 sm:p-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-burnt">
        ~/projects · {projects.length} entries
      </p>

      {projects.map((p, i) => (
        <article
          key={p.slug}
          className="rounded-lg border border-white/10 bg-ink-800/70 p-5 transition-colors hover:border-maroon-light/40"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-semibold tracking-[0.18em] text-burnt">
              EXHIBIT {String.fromCharCode(65 + i)}
            </span>
            {p.featured && (
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-maroon-light">
                ★ featured
              </span>
            )}
          </div>
          <h3 className="mt-2 font-display text-lg font-bold text-cream">{p.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-sand">{p.blurb}</p>
          <ul className="mt-3 space-y-1.5">
            {p.points.map((pt) => (
              <li key={pt} className="flex gap-2 text-xs leading-relaxed text-hokie-200">
                <span className="mt-0.5 shrink-0 text-burnt">▸</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {p.stack.map((s) => (
              <span
                key={s}
                className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] text-hokie-200"
              >
                {s}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
