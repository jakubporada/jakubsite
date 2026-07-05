"use client";

import { ReactNode } from "react";
import type { Post } from "@/lib/blog";
import type { AppId } from "./WindowManager";
import { Terminal } from "@/components/Terminal";
import dynamic from "next/dynamic";
import { ReadmeContent } from "@/components/content/ReadmeContent";
import { AboutContent } from "@/components/content/AboutContent";
import { ProjectsContent } from "@/components/content/ProjectsContent";
import { ContactContent } from "@/components/content/ContactContent";

// Lab Notes pulls in the markdown + syntax-highlight stack — load it only
// when the app is actually opened.
const LabNotesContent = dynamic(
  () => import("@/components/content/LabNotesContent").then((m) => m.LabNotesContent),
  {
    loading: () => (
      <p className="p-6 font-mono text-xs text-hokie-400">loading notes…</p>
    ),
  }
);

/* ------------------------------------------------------------------ *
 * JP-OS app registry: titles, dock icons (inline SVG), window content.
 * ------------------------------------------------------------------ */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const ICONS: Record<AppId | "resume" | "overview", ReactNode> = {
  terminal: (
    <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" {...stroke} aria-hidden="true">
      <polyline points="4 7 9 12 4 17" />
      <line x1="12" y1="17" x2="19" y2="17" />
    </svg>
  ),
  readme: (
    <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" {...stroke} aria-hidden="true">
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="9" y1="12" x2="15" y2="12" />
      <line x1="9" y1="16" x2="13" y2="16" />
    </svg>
  ),
  about: (
    <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" {...stroke} aria-hidden="true">
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5.5 20c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5" />
    </svg>
  ),
  projects: (
    <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" {...stroke} aria-hidden="true">
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  ),
  notes: (
    <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" {...stroke} aria-hidden="true">
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <line x1="9" y1="3" x2="9" y2="21" />
      <line x1="12.5" y1="8" x2="16" y2="8" />
      <line x1="12.5" y1="12" x2="16" y2="12" />
    </svg>
  ),
  contact: (
    <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" {...stroke} aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <polyline points="3 7 12 13 21 7" />
    </svg>
  ),
  resume: (
    <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" {...stroke} aria-hidden="true">
      <path d="M12 4v10" />
      <path d="M8 10l4 4 4-4" />
      <line x1="5" y1="20" x2="19" y2="20" />
    </svg>
  ),
  overview: (
    <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" {...stroke} aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <line x1="4" y1="9" x2="20" y2="9" />
      <line x1="9" y1="9" x2="9" y2="20" />
    </svg>
  ),
};

const VALID_APPS: AppId[] = ["terminal", "readme", "about", "projects", "notes", "contact"];

export type AppDef = {
  title: string;
  label: string; // short dock label
  /** `open` launches another app — a window on desktop, a sheet on mobile. */
  render: (props: { posts: Post[]; open: (app: AppId) => void }) => ReactNode;
};

export const APPS: Record<AppId, AppDef> = {
  terminal: {
    title: "terminal — visitor@jp-os",
    label: "Terminal",
    render: ({ open }) => (
      <Terminal
        frameless
        onOpenApp={(app) => {
          if (VALID_APPS.includes(app as AppId)) {
            open(app as AppId);
            return true;
          }
          return false;
        }}
      />
    ),
  },
  readme: {
    title: "README.txt",
    label: "README",
    render: ({ open }) => <ReadmeContent onOpen={open} />,
  },
  about: {
    title: "about — jakub porada",
    label: "About",
    render: () => <AboutContent />,
  },
  projects: {
    title: "projects — exhibits",
    label: "Projects",
    render: () => <ProjectsContent />,
  },
  notes: {
    title: "lab-notes — writeups",
    label: "Lab Notes",
    render: ({ posts }) => <LabNotesContent posts={posts} />,
  },
  contact: {
    title: "contact — say hi",
    label: "Contact",
    render: () => <ContactContent />,
  },
};

export const DOCK_ORDER: AppId[] = [
  "terminal",
  "readme",
  "about",
  "projects",
  "notes",
  "contact",
];
