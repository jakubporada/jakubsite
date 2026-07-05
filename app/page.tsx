import { Desktop } from "@/components/os/Desktop";
import { getAllPosts, getPost, Post } from "@/lib/blog";

/* ------------------------------------------------------------------ *
 * The homepage IS JP-OS — a desktop environment in the browser.
 * Server component: loads blog posts (for the Lab Notes app) at build
 * time and hands everything to the client desktop.
 * The classic scrolling site lives at /overview (+ /about, /projects…).
 * ------------------------------------------------------------------ */

export default function HomePage() {
  const posts = getAllPosts()
    .map((m) => getPost(m.slug))
    .filter((p): p is Post => p !== null);

  return <Desktop posts={posts} />;
}
