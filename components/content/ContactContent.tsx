import { ContactForm } from "@/components/ContactForm";
import { profile } from "@/lib/data";

const channels = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "GitHub", value: "github.com/jakubporada", href: profile.github },
  { label: "LinkedIn", value: "linkedin.com/in/jakubporada", href: profile.linkedin },
];

/* Contact.app — direct channels + the mailto form. */
export function ContactContent() {
  return (
    <div className="p-6 sm:p-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-burnt">
        // open to internships
      </p>
      <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-cream">
        Let&apos;s talk.
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-sand">
        Recruiters and fellow builders — reach out about cybersecurity internships in
        reverse engineering, detection, and network defense.
      </p>

      <div className="mt-5 space-y-2">
        {channels.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target={c.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="group flex items-center justify-between rounded-lg border border-white/10 bg-ink-800/70 px-4 py-2.5 transition-colors hover:border-maroon-light/40"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-hokie-400">
              {c.label}
            </span>
            <span className="text-xs text-hokie-100 group-hover:text-burnt">{c.value}</span>
          </a>
        ))}
      </div>

      <div className="mt-6">
        <ContactForm email={profile.email} />
      </div>
    </div>
  );
}
