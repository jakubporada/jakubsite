# jakubporada.com

Personal site — Next.js 14 (App Router) + TypeScript + Tailwind. Dark, lightly
Virginia Tech-themed (maroon + burnt orange) with a security/terminal identity.

## Run locally

> Requires Node 18.18+ (you have v20 via nvm — run `nvm use 20` first).

```bash
nvm use 20
npm install      # first time only
npm run dev      # http://localhost:3000
```

## Where to edit things

| What you want to change                    | File                                  |
| ------------------------------------------ | ------------------------------------- |
| Name, tagline, email, phone, social links  | `lib/data.ts` → `profile`             |
| Home-page stats (Top 15, Platinum, etc.)   | `lib/data.ts` → `stats`               |
| Experience / jobs                          | `lib/data.ts` → `experience`          |
| Projects (and which are "featured")        | `lib/data.ts` → `projects`            |
| Skills, certifications, education          | `lib/data.ts`                         |
| Interests / hobbies (About page)           | `lib/data.ts` → `interests`           |
| The animated terminal lines on the home    | `components/Terminal.tsx`             |
| Colors / theme                             | `tailwind.config.ts`                  |
| Your résumé PDF                            | replace `public/Jakub_Porada_Resume.pdf` |

## Writing blog posts (CTF writeups, journal)

Drop a Markdown file in `content/blog/`. Front matter:

```markdown
---
title: "My Challenge Writeup"
date: "2026-06-20"
category: "CTF Writeup"   # or "Journal"
excerpt: "One-line summary shown on the blog list."
tags: ["ctf", "pwn"]
---

Your content. Code blocks get syntax highlighting automatically.
```

See `content/blog/sample-ctf-writeup.md` for a full template. The new post shows
up on `/blog` automatically — no code changes needed.

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Go to vercel.com → New Project → import the repo → Deploy (zero config).
3. Add your domain `jakubporada.com` under Project → Settings → Domains.

## Notes

- The contact form opens the visitor's email client (no backend). To collect
  submissions without that, wire it to a service like Formspree in
  `components/ContactForm.tsx`.
- LinkedIn URL in `lib/data.ts` is a best guess — update it to your real profile.
