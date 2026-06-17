"use client";

import { useEffect, useState } from "react";

// A small, self-typing terminal for the hero. Purely decorative but on-brand.
const lines: { cmd: string; out: string[] }[] = [
  {
    cmd: "whoami",
    out: ["jakub_porada — cybersecurity & reverse engineering"],
  },
  {
    cmd: "cat highlights.txt",
    out: [
      "Top 15 — National Cyber League",
      "Platinum CyberPatriot Semi-Finalist",
      "Incoming DFEND Intern @ ManTech",
    ],
  },
  {
    cmd: "ls ~/focus",
    out: ["reverse-engineering/  network-defense/  detection-eng/"],
  },
  {
    cmd: "echo $STATUS",
    out: ["open to internships — let's build something secure."],
  },
];

export function Terminal() {
  const [rendered, setRendered] = useState<{ cmd: string; out: string[] }[]>([]);
  const [typed, setTyped] = useState("");
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<"typing" | "output">("typing");

  useEffect(() => {
    if (step >= lines.length) return;
    const current = lines[step];

    if (phase === "typing") {
      if (typed.length < current.cmd.length) {
        const t = setTimeout(() => setTyped(current.cmd.slice(0, typed.length + 1)), 45);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("output"), 350);
      return () => clearTimeout(t);
    }

    // output phase
    const t = setTimeout(() => {
      setRendered((r) => [...r, current]);
      setTyped("");
      setPhase("typing");
      setStep((s) => s + 1);
    }, 500);
    return () => clearTimeout(t);
  }, [typed, phase, step]);

  const done = step >= lines.length;

  return (
    <div className="glow-border overflow-hidden rounded-xl border border-white/10 bg-ink-800/90 font-mono text-sm shadow-2xl">
      <div className="flex items-center gap-2 border-b border-white/10 bg-ink-700/80 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
        <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
        <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
        <span className="ml-3 text-xs text-zinc-500">jakub@porada: ~</span>
      </div>
      <div className="min-h-[230px] space-y-3 p-5">
        {rendered.map((l, i) => (
          <div key={i}>
            <p className="text-zinc-300">
              <span className="text-burnt">$</span>{" "}
              <span className="text-white">{l.cmd}</span>
            </p>
            {l.out.map((o, j) => (
              <p key={j} className="pl-4 text-maroon-light">
                {o}
              </p>
            ))}
          </div>
        ))}

        {!done && (
          <p className="text-zinc-300">
            <span className="text-burnt">$</span>{" "}
            <span className="text-white">{typed}</span>
            <span className="animate-blink text-burnt">▋</span>
          </p>
        )}
        {done && (
          <p className="text-zinc-300">
            <span className="text-burnt">$</span>{" "}
            <span className="animate-blink text-burnt">▋</span>
          </p>
        )}
      </div>
    </div>
  );
}
