import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "CTF writeups and notes from the lab by Jakub Porada.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <p className="eyebrow mb-3">// the blog</p>
      <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">
        Writeups &amp; <span className="text-gradient">notes</span>.
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-zinc-400">
        CTF writeups, project deep-dives, and lessons from the lab. Written mostly to force
        myself to actually understand things.
      </p>

      <div className="mt-14 space-y-4">
        {posts.length === 0 && (
          <p className="text-zinc-500">No posts yet — check back soon.</p>
        )}
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block rounded-2xl border border-white/10 bg-ink-700/40 p-6 transition-all hover:-translate-y-1 hover:border-burnt/40"
          >
            <div className="mb-2 flex flex-wrap items-center gap-3 text-xs">
              <span className="rounded-full bg-maroon/20 px-2 py-0.5 font-mono text-maroon-light">
                {post.category}
              </span>
              <span className="font-mono text-zinc-500">{formatDate(post.date)}</span>
            </div>
            <h2 className="font-display text-xl font-bold text-white group-hover:text-burnt">
              {post.title}
            </h2>
            <p className="mt-2 text-sm text-zinc-400">{post.excerpt}</p>
            {post.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <span key={t} className="font-mono text-xs text-zinc-500">
                    #{t}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
