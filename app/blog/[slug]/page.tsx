import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import { getAllSlugs, getPost, formatDate } from "@/lib/blog";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPost(params.slug);
  if (!post) return { title: "Not found" };
  return { title: post.title, description: post.excerpt };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <Link
        href="/blog"
        className="font-mono text-sm text-zinc-500 transition-colors hover:text-burnt"
      >
        ← back to blog
      </Link>

      <header className="mt-6 border-b border-white/10 pb-8">
        <div className="mb-3 flex flex-wrap items-center gap-3 text-xs">
          <span className="rounded-full bg-maroon/20 px-2 py-0.5 font-mono text-maroon-light">
            {post.category}
          </span>
          <span className="font-mono text-zinc-500">{formatDate(post.date)}</span>
        </div>
        <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
          {post.title}
        </h1>
        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span key={t} className="font-mono text-xs text-zinc-500">
                #{t}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="prose-article mt-8">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeSlug, rehypeHighlight]}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
