"use client";

import { useState } from "react";

// No backend required: composes a mailto link with the message pre-filled.
// Swap for an API route / Formspree later if you want inbox-free submissions.
export function ContactForm({ email }: { email: string }) {
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Website message from ${name || "someone"}`);
    const body = encodeURIComponent(
      `${message}\n\n— ${name}${from ? ` (${from})` : ""}`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  }

  const inputCls =
    "w-full rounded-lg border border-white/10 bg-ink-800 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-burnt";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className={inputCls}
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className={inputCls}
        type="email"
        placeholder="Your email"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        required
      />
      <textarea
        className={`${inputCls} min-h-[140px] resize-y`}
        placeholder="What's on your mind?"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <button
        type="submit"
        className="w-full rounded-md bg-maroon px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-maroon-light hover:glow-border"
      >
        Send Message →
      </button>
      <p className="text-center font-mono text-xs text-zinc-600">
        opens your email client — no data stored
      </p>
    </form>
  );
}
