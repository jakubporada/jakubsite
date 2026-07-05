"use client";

import { useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import type { Post } from "@/lib/blog";
import { formatDate } from "@/lib/format";

/* LabNotes.app — blog reader in a window: list view → article view. */
export function LabNotesContent({ posts }: { posts: Post[] }) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const post = posts.find((p) => p.slug === openSlug);

  if (post) {
    return (
      <div className="p-6 sm:p-8">
        <button
          onClick={() => setOpenSlug(null)}
          className="mb-5 font-mono text-xs text-burnt hover:text-burnt-light"
        >
          ← all notes
        </button>
        <div className="mb-2 flex flex-wrap items-center gap-3 text-xs">
          <span className="rounded-full bg-maroon/20 px-2 py-0.5 font-mono text-maroon-light">
            {post.category}
          </span>
          <span className="font-mono text-hokie-400">{formatDate(post.date)}</span>
        </div>
        <h2 className="font-display text-2xl font-bold tracking-tight text-cream">
          {post.title}
        </h2>
        <div className="prose-article mt-5 text-sm">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
            {post.content}
          </ReactMarkdown>
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="mt-6 inline-block font-mono text-xs text-burnt hover:text-burnt-light"
        >
          → open on the classic site
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-6 sm:p-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-burnt">
        ~/lab-notes · {posts.length} entries
      </p>
      {posts.length === 0 && (
        <p className="text-sm text-hokie-300">no notes yet — check back soon.</p>
      )}
      {posts.map((p) => (
        <button
          key={p.slug}
          onClick={() => setOpenSlug(p.slug)}
          className="block w-full rounded-lg border border-white/10 bg-ink-800/70 p-5 text-left transition-colors hover:border-burnt/40"
        >
          <div className="mb-1.5 flex flex-wrap items-center gap-3 text-xs">
            <span className="rounded-full bg-maroon/20 px-2 py-0.5 font-mono text-maroon-light">
              {p.category}
            </span>
            <span className="font-mono text-hokie-400">{formatDate(p.date)}</span>
          </div>
          <h3 className="font-display text-base font-bold text-cream">{p.title}</h3>
          <p className="mt-1 text-xs leading-relaxed text-sand">{p.excerpt}</p>
        </button>
      ))}
    </div>
  );
}
