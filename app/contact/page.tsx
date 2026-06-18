import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Jakub Porada.",
};

const channels = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/[^\d+]/g, "")}` },
  { label: "GitHub", value: "github.com/jakubporada", href: profile.github },
  { label: "LinkedIn", value: "linkedin.com/in/jakubporada", href: profile.linkedin },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <p className="eyebrow mb-3">// contact</p>
      <h1 className="font-display text-4xl font-bold text-cream sm:text-5xl">
        Let&apos;s <span className="text-gradient">talk</span>.
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-stone-400">
        I&apos;m actively looking for internship opportunities in cybersecurity, reverse
        engineering, and security engineering. Recruiters and fellow builders — reach out.
      </p>

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        {/* Direct channels */}
        <div>
          <p className="mb-4 font-mono text-sm text-burnt">// direct lines</p>
          <div className="space-y-3">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group flex items-center justify-between rounded-xl border border-white/10 bg-ink-700/40 px-4 py-3 transition-all hover:border-maroon-light/40 hover:glow-border"
              >
                <span className="font-mono text-xs uppercase tracking-wider text-stone-500">
                  {c.label}
                </span>
                <span className="text-sm text-stone-200 group-hover:text-burnt">
                  {c.value}
                </span>
              </a>
            ))}
          </div>

          <a
            href={profile.resume}
            download
            className="mt-6 inline-block rounded-md border border-white/15 px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:border-burnt hover:text-burnt"
          >
            Download Résumé ↓
          </a>
        </div>

        {/* Form */}
        <div>
          <p className="mb-4 font-mono text-sm text-burnt">// send a message</p>
          <ContactForm email={profile.email} />
        </div>
      </div>
    </div>
  );
}
