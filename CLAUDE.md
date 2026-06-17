# CLAUDE.md

Guidance for AI agents working on this repository.

## What this is

Personal portfolio website for **Jakub Porada** — a cybersecurity student
(incoming Virginia Tech Computer Engineering, grad May 2030). The site's job is to
make recruiters remember him and want to hire him for **internships**. Identity:
reverse engineering, network defense, detection engineering. Highlights: Top 15
National Cyber League, Platinum CyberPatriot Semi-Finalist, 8+ certs, internships
at Obscurity Labs (2025) and ManTech DFEND (incoming summer 2026), D1 athlete.

## Tech stack

- **Next.js 14** (App Router) + **TypeScript** + **Tailwind CSS**.
- Blog: Markdown files in `content/blog/*.md`, parsed with `gray-matter`, rendered
  with `react-markdown` (+ `remark-gfm`, `rehype-highlight`, `rehype-slug`).
- No database, no backend. Contact form uses a `mailto:` link.
- Deploy target: **Vercel**. Planned domain: `jakubporada.com` (not yet purchased).

## Running it

> The repo directory's default `node` is **v16, which is too old**. You MUST use
> Node 20 first:

```bash
nvm use 20
npm install          # first time
npm run dev          # dev server (auto-picks a free port, often 3001)
npm run build        # production build — run this to verify changes compile
```

When verifying with curl, check the port printed in the dev output (it falls back
to 3001+ if 3000 is taken).

## Project structure

```
app/
  layout.tsx            root layout: fonts (Inter/Space Grotesk/JetBrains Mono), nav, footer, metadata
  page.tsx              HOME — spotlights only (no info duplicated from About)
  about/page.tsx        ABOUT — full bio, experience timeline, skills, certs, education, interests
  projects/page.tsx     PROJECTS — full detail; anchors via #slug
  blog/page.tsx         BLOG list
  blog/[slug]/page.tsx  individual post (SSG via generateStaticParams)
  contact/page.tsx      CONTACT — direct channels + mailto form
  globals.css           theme tokens, .text-gradient/.eyebrow/.glow-border, markdown (.prose-article)
components/
  Navbar.tsx            sticky nav + Resume download button (client)
  Footer.tsx
  Terminal.tsx          INTERACTIVE shell on the home hero (client) — see below
  ContactForm.tsx       mailto form (client)
  ui.tsx                SectionHeading, Tag, ProjectCard
lib/
  data.ts               ⭐ SINGLE SOURCE OF TRUTH for all content
  blog.ts               blog file reading helpers
content/blog/*.md       blog posts
public/
  Jakub_Porada_Resume.pdf   the downloadable resume
  favicon.svg
```

## Editing content

- **Almost all text/data lives in `lib/data.ts`** (profile, stats, experience,
  projects, skills, certifications, education, interests). Change it there.
- **Add a blog post:** drop a `.md` file in `content/blog/` with front matter
  (`title`, `date`, `category`, `excerpt`, `tags`). It auto-appears on `/blog`.
  See `content/blog/sample-ctf-writeup.md` for the template.
- **Swap the resume:** replace `public/Jakub_Porada_Resume.pdf` (keep the name, or
  update `profile.resume` in `lib/data.ts`).

## The interactive terminal (`components/Terminal.tsx`)

A working mini-shell on the home page. Commands: `help`, `ls [-a]`, `cd`, `cat`,
`pwd`, `whoami`, `open resume`, `contact`, `banner`, `clear`, `sudo`, `submit`.
It has a **virtual filesystem** (`FS` const) and a **hidden CTF**: `ls -a` reveals
`.vault`; `cat .vault/...` after `cd .vault` shows a base64 cipher; decoding gives
`FLAG`, submitted via `submit flag{...}`. To add files/commands, edit the `FS`
object and the `switch` in `run()`.

## Design / styling conventions

- Dark theme. Color tokens are centralized in `tailwind.config.ts` (`maroon`,
  `burnt`, `hokie`, `ink`) — **change the palette there**, plus the gradient in
  `.text-gradient` and glow in `.glow-border` (both in `globals.css`).
- Fonts via `next/font`: Space Grotesk (display/headings), Inter (body),
  JetBrains Mono (code/terminal/labels).
- Reusable patterns: `.eyebrow` (mono uppercase label), `.text-gradient`,
  `.glow-border`, `<SectionHeading>`, `<Tag>`.

## User preferences (important)

- Wants the site to feel **unique, NOT AI-generated / not a template clone**.
- Subtle **Virginia Tech** vibe is welcome (maroon/orange) but palette is being
  actively iterated — confirm before large visual redesigns.
- **D1 athletics:** mention but keep it light (don't over-emphasize).
- No personal photo yet (none provided).
- LinkedIn URL in `data.ts` may be a placeholder — confirm with Jakub.

## Before you finish

- Run `npm run build` and make sure it passes.
- Keep new content flowing through `lib/data.ts` rather than hardcoding in pages.
```
