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
  layout.tsx            root layout: fonts (Hanken Grotesk/Bricolage Grotesque/IBM Plex Mono), SiteChrome, metadata
  page.tsx              HOME = JP-OS desktop (server: loads posts → <Desktop/>)
  overview/page.tsx     "classic site" landing — Field Manual (dark hero → paper dossier)
  about/page.tsx        ABOUT — full bio, experience timeline, skills, certs, education, interests
  projects/page.tsx     PROJECTS — full detail; anchors via #slug
  blog/page.tsx         BLOG list
  blog/[slug]/page.tsx  individual post (SSG via generateStaticParams)
  contact/page.tsx      CONTACT — direct channels + mailto form
  template.tsx          route-change fade-in
  globals.css           theme tokens, helpers (.glow-border/.hokie-stone/.redact/...), markdown (.prose-article)
components/
  SiteChrome.tsx        renders Navbar/Footer everywhere EXCEPT "/" (JP-OS has its own chrome)
  Navbar.tsx            floating pill nav + ⌘K command menu (classic pages only)
  CommandMenu.tsx       terminal-style nav palette (⌘K)
  Footer.tsx
  Terminal.tsx          INTERACTIVE shell (client) — see below; props: frameless, onOpenApp
  LetterGlitch.tsx      canvas glitch background w/ cursor+touch ignite (hero wallpaper + OS wallpaper)
  Reveal.tsx            bidirectional scroll-reveal wrapper
  ScrollStack.tsx       sticky stacking cards (overview "exhibits")
  ContactForm.tsx       mailto form (client)
  ui.tsx                SectionHeading, Tag, ProjectCard (classic pages)
  os/                   ⭐ JP-OS (see "JP-OS" section below)
    WindowManager.tsx   window state context (open/close/focus/z/min/max, AppId, default sizes)
    Window.tsx          draggable/resizable window frame (pointer-capture, direct-DOM drag)
    Desktop.tsx         desktop root + mobile launcher + Esc-to-close + auto-open
    apps.tsx            app registry (titles, SVG icons, content) — Lab Notes lazy-loaded
    MenuBar.tsx / Dock.tsx / BootScreen.tsx / DesktopIcon.tsx
  content/              app-window bodies (Readme/About/Projects/LabNotes/Contact)Content.tsx
lib/
  data.ts               ⭐ SINGLE SOURCE OF TRUTH for all content
  blog.ts               blog file reading helpers (server-only: fs)
  format.ts             client-safe helpers (formatDate) — import THIS from "use client" files
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

## JP-OS (the homepage)

`/` is **JP-OS v1.0** — a custom dark "security workstation" desktop in the
browser: boot splash (skippable, once per session via `sessionStorage`), glitch
wallpaper, menu bar (⬡ JP-OS menu, availability status, clock), draggable/
resizable/minimizable windows, dock with running-app dots, desktop icons.
On first load it auto-opens **Terminal + README.txt** (README = HR onboarding
with big buttons + "classic site → /overview" escape hatch).

- Window state lives in `components/os/WindowManager.tsx` (context). Windows
  stay mounted while open so Terminal scrollback survives minimize.
- Dragging mutates DOM style directly and commits bounds on pointer-up (no
  re-render per move). Esc closes the focused window (unless typing).
- **Mobile (<768px)** renders a phone-style launcher grid instead — icons link
  to the classic routes; Terminal opens as a full-screen sheet. Never drag on touch.
- `open <app>` in the Terminal opens OS windows (`onOpenApp` prop) — the whole
  site is drivable from the shell.
- Add an app: extend `AppId` + `DEFAULT_SIZE` in WindowManager, register title/
  icon/content in `os/apps.tsx`, add to `DOCK_ORDER`.
- Heavy content (markdown/highlight.js in Lab Notes) is `next/dynamic`-loaded so
  the desktop stays light (~111 kB first load).

### Future options shelf (discussed with Jakub — build on request)

- **macOS look-alike skin** — agreed fallback if the custom JP-OS chrome doesn't
  land; reskin `Window/MenuBar/Dock` only, the manager stays.
- **Desktop-only mode** — drop the classic pages entirely (riskier for HR/SEO).
- **Mini-game app** in the dock (packet-defense or Minesweeper clone).
- **SOC-console terminal** (streaming IDS alerts + triage/block) — built once and
  reverted: too noisy for the hero. Could return as a separate opt-in app.
- **Multi-stage CTF** (base64 → XOR → hidden route) with a real reward.
- **`man jakub` CLI résumé** commands (experience/skills/certs in the shell).
- The light **"Field Manual"** paper theme lives on at `/overview`.

## The interactive terminal (`components/Terminal.tsx`)

A working mini-shell (JP-OS Terminal app + `/overview` hero). Commands: `help`,
`ls [-a]`, `cd`, `cat`, `pwd`, `whoami`, `open resume`, `open <app>` (inside
JP-OS), `contact`, `banner`, `clear`, `sudo`, `submit`.
Props: `frameless` (no chrome — used inside OS windows), `onOpenApp` (launches
OS apps). It has a **virtual filesystem** (`FS` const) and a **hidden CTF**:
`ls -a` reveals `.vault`; `cat .vault/...` after `cd .vault` shows a base64
cipher; decoding gives `FLAG`, submitted via `submit flag{...}`. To add
files/commands, edit the `FS` object and the `switch` in `run()`.

## Design / styling conventions

- **Warm refined dark theme** (not cool/neon). Base is a warm near-black (`ink`
  tokens), grays are warm (`stone`, not `zinc`), headings are `cream` (#f3ede4),
  secondary text is `sand`. Accents: `maroon` + `burnt` (orange), used sparingly.
- Tokens are centralized in `tailwind.config.ts` (`maroon`, `burnt`, `hokie`,
  `ink`, `cream`, `sand`) — **change the palette there**. Helpers in `globals.css`:
  `.text-gradient` (sparing), `.glow-border` (warm shadow lift, not neon),
  `.chip-maroon` (the maroon stat pill), `.grain` (film-grain overlay on `body`),
  `.grid-bg`, `.eyebrow`, `.rule`.
- Fonts via `next/font`: Bricolage Grotesque (display/headings), Hanken Grotesk
  (body), IBM Plex Mono (code/terminal/labels).
- The `/overview` hero mirrors a mockup Jakub provided: orange eyebrow, big cream
  name, stat row driven by `stats[].tone` ("accent"=orange, "chip"=maroon pill,
  "plain"=cream) in `lib/data.ts`. Below it: the paper "Field Manual" dossier
  (`paper` tokens, `.redact` hover-declassify, stamp seals).
- To screenshot for visual checks: `npm run start -- -p 3100`, then headless
  Chrome `--screenshot` against `http://localhost:3100`.
  **Beware:** headless Chrome clamps `--window-size` width to ~500px on macOS —
  a "390px" mobile screenshot is actually a 500px layout cropped to 390. Don't
  chase phantom overflow bugs; verify true mobile via devtools emulation.

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
