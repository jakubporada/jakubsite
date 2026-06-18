"use client";

/* A template re-mounts on every navigation (unlike layout), so this gives
 * each route a subtle fade/slide-in transition. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-page-in">{children}</div>;
}
