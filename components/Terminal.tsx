"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/data";

/* ------------------------------------------------------------------ *
 * A small but real interactive shell. Users can type commands:
 *   help, ls [-a], cd, cat, pwd, whoami, clear, open, banner, sudo...
 * There's a hidden CTF: `ls -a` reveals a .vault — find and submit the flag.
 * ------------------------------------------------------------------ */

const FLAG = "flag{r3v3rs3_b4s364_l1k3_4_pr0}";
const CIPHER = "ZmxhZ3tyM3YzcnMzX2I0czM2NF9sMWszXzRfcHIwfQ==";

type FileNode = { type: "file"; content: string };
type DirNode = { type: "dir"; children: Record<string, FSNode> };
type FSNode = FileNode | DirNode;

const f = (content: string): FileNode => ({ type: "file", content });
const d = (children: Record<string, FSNode>): DirNode => ({ type: "dir", children });

const FS: DirNode = d({
  "about.txt": f(
    `Jakub Porada — cybersecurity & reverse engineering.\nIncoming Virginia Tech Computer Engineering student.\nTop 15 National Cyber League · Platinum CyberPatriot Semi-Finalist.\n\nrun:  cd projects && ls`
  ),
  "skills.txt": f(
    `reverse-engineering : Ghidra, x64dbg, IDA, JADX\nnetwork-defense     : Wireshark, Suricata, Wazuh, Nmap\nlanguages           : Python, Go, C, Java, JavaScript\ncloud / infra       : AWS, Docker, Linux, Cisco IOS`
  ),
  "contact.txt": f(
    `email    : ${profile.email}\ngithub   : ${profile.github}\nlinkedin : ${profile.linkedin}\n\ntip: type 'contact' to jump to the contact page.`
  ),
  projects: d({
    "autonomous-soc.txt": f(
      `Autonomous Security Operations Platform\nSuricata IDS + Wazuh SIEM on Raspberry Pi. Detects live attacks and\nauto-pushes firewall rules across a multi-router topology in seconds.`
    ),
    "ml-ids.txt": f(
      `Network Intrusion Detection System\nML model trained on 2.8M flows, classifies 14 attack types (DDoS,\nbrute force, SQLi...). Real-time pipeline on AWS + FastAPI + React.`
    ),
  }),
  ".vault": d({
    "readme.txt": f(
      `You found the vault. There's a flag hidden in here somewhere.\nDecode cipher.txt, then run:  submit <flag>`
    ),
    "cipher.txt": f(`Decode this (it's base64):\n\n  ${CIPHER}\n\nThen: submit flag{...}`),
  }),
});

const BOOT = [
  { t: `${profile.name} // interactive shell`, c: "text-cream" },
  { t: `type 'help' to get started. yes — this terminal actually works.`, c: "text-stone-500" },
];

type Line = { text: string; cls?: string };

export function Terminal({
  frameless = false,
  onOpenApp,
}: {
  /** Render without the outer chrome/title bar (for JP-OS windows). */
  frameless?: boolean;
  /** When inside JP-OS: `open <app>` launches an app window. */
  onOpenApp?: (app: string) => boolean;
} = {}) {
  const [lines, setLines] = useState<Line[]>(BOOT.map((b) => ({ text: b.t, cls: b.c })));
  const [input, setInput] = useState("");
  const [path, setPath] = useState<string[]>([]); // [] = home (~)
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [solved, setSolved] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [lines]);

  const cwd = "~" + (path.length ? "/" + path.join("/") : "");

  function resolveDir(p: string[]): DirNode | null {
    let node: DirNode = FS;
    for (const part of p) {
      const next = node.children[part];
      if (!next || next.type !== "dir") return null;
      node = next;
    }
    return node;
  }

  function print(out: Line[]) {
    setLines((prev) => [...prev, ...out]);
  }

  function run(raw: string) {
    const cmd = raw.trim();
    print([{ text: `${cwd} $ ${cmd}`, cls: "text-stone-300" }]);
    if (!cmd) return;

    const [name, ...args] = cmd.split(/\s+/);
    const dir = resolveDir(path)!;

    switch (name) {
      case "help":
        print([
          { text: "available commands:", cls: "text-burnt" },
          { text: "  help            this menu" },
          { text: "  ls [-a]         list files (-a shows hidden)" },
          { text: "  cd <dir>        change directory ( .. to go up )" },
          { text: "  cat <file>      print a file" },
          { text: "  pwd             print working directory" },
          { text: "  whoami          who am i" },
          { text: "  open resume     download my resume" },
          ...(onOpenApp
            ? [{ text: "  open <app>      launch an app (readme, about, projects, notes, contact)" }]
            : []),
          { text: "  contact         go to the contact page" },
          { text: "  banner          show the banner" },
          { text: "  clear           clear the screen" },
          { text: "" },
          { text: "  there's a hidden flag somewhere. happy hunting.", cls: "text-stone-500" },
        ]);
        break;

      case "ls": {
        const showHidden = args.includes("-a");
        const names = Object.keys(dir.children)
          .filter((n) => showHidden || !n.startsWith("."))
          .sort();
        print([
          {
            text: names.length
              ? names
                  .map((n) => (dir.children[n].type === "dir" ? n + "/" : n))
                  .join("    ")
              : "(empty)",
            cls: "text-maroon-light",
          },
        ]);
        break;
      }

      case "cd": {
        const target = args[0];
        if (!target || target === "~" || target === "/") {
          setPath([]);
          break;
        }
        if (target === "..") {
          setPath((p) => p.slice(0, -1));
          break;
        }
        const next = dir.children[target];
        if (next && next.type === "dir") setPath((p) => [...p, target]);
        else print([{ text: `cd: no such directory: ${target}`, cls: "text-red-400" }]);
        break;
      }

      case "cat": {
        const target = args[0];
        const node = target ? dir.children[target] : undefined;
        if (node && node.type === "file")
          print(node.content.split("\n").map((t) => ({ text: t, cls: "text-stone-300" })));
        else print([{ text: `cat: ${target ?? ""}: no such file`, cls: "text-red-400" }]);
        break;
      }

      case "pwd":
        print([{ text: cwd.replace("~", "/home/jakub"), cls: "text-stone-300" }]);
        break;

      case "whoami":
        print([{ text: "visitor — but you can hire jakub :)", cls: "text-stone-300" }]);
        break;

      case "open": {
        const target = args[0];
        if (target?.startsWith("resume")) {
          print([{ text: "downloading resume...", cls: "text-burnt" }]);
          const a = document.createElement("a");
          a.href = profile.resume;
          a.download = "";
          a.click();
        } else if (onOpenApp && target && onOpenApp(target)) {
          print([{ text: `launching ${target}...`, cls: "text-burnt" }]);
        } else if (onOpenApp) {
          print([
            {
              text: `open: unknown app: ${target ?? ""} — try readme, about, projects, notes, contact, resume`,
              cls: "text-red-400",
            },
          ]);
        } else {
          print([{ text: `open: usage: open resume`, cls: "text-red-400" }]);
        }
        break;
      }

      case "contact":
        print([{ text: "redirecting to /contact ...", cls: "text-burnt" }]);
        setTimeout(() => (window.location.href = "/contact"), 500);
        break;

      case "submit": {
        const guess = args.join(" ").trim();
        if (guess === FLAG) {
          setSolved(true);
          print([
            { text: "███████████████████████████████████", cls: "text-burnt" },
            { text: "  ✔ FLAG ACCEPTED — nicely done.", cls: "text-green-400" },
            { text: "  you clearly poke at things. let's talk:", cls: "text-stone-300" },
            { text: `  ${profile.email}`, cls: "text-burnt" },
            { text: "███████████████████████████████████", cls: "text-burnt" },
          ]);
        } else if (!guess) {
          print([{ text: "submit: usage: submit flag{...}", cls: "text-red-400" }]);
        } else {
          print([{ text: "✗ nope. keep digging. (hint: ls -a)", cls: "text-red-400" }]);
        }
        break;
      }

      case "banner":
        print(BOOT.map((b) => ({ text: b.t, cls: b.c })));
        break;

      case "clear":
        setLines([]);
        break;

      case "sudo":
        print([{ text: "nice try. you're not getting root here ;)", cls: "text-burnt" }]);
        break;

      case "rm":
        print([{ text: "rm: permission denied (this is a portfolio, not your prod box)", cls: "text-red-400" }]);
        break;

      default:
        print([{ text: `command not found: ${name} — try 'help'`, cls: "text-red-400" }]);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      run(input);
      if (input.trim()) {
        setHistory((h) => [...h, input]);
      }
      setHistIdx(-1);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const idx = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(idx);
      setInput(history[idx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx === -1) return;
      const idx = histIdx + 1;
      if (idx >= history.length) {
        setHistIdx(-1);
        setInput("");
      } else {
        setHistIdx(idx);
        setInput(history[idx]);
      }
    }
  }

  return (
    <div
      className={
        frameless
          ? "flex h-full flex-col font-mono text-sm"
          : "glow-border overflow-hidden rounded-xl border border-white/10 bg-ink-800/90 font-mono text-sm shadow-2xl"
      }
      onClick={() => inputRef.current?.focus()}
    >
      {!frameless && (
        <div className="flex items-center gap-2 border-b border-white/10 bg-ink-700/80 px-4 py-2.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
          <span className="ml-3 text-xs text-stone-500">
            visitor@jakubporada: {cwd} {solved && "· 🚩"}
          </span>
        </div>
      )}

      <div
        ref={scrollRef}
        className={
          frameless ? "min-h-0 flex-1 overflow-y-auto p-5" : "h-[300px] overflow-y-auto p-5"
        }
      >
        {lines.map((l, i) => (
          <p key={i} className={`whitespace-pre-wrap break-words ${l.cls ?? "text-stone-300"}`}>
            {l.text || " "}
          </p>
        ))}

        <div className="flex items-center">
          <span className="shrink-0 text-burnt">{cwd} $&nbsp;</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoComplete="off"
            aria-label="terminal input"
            className="w-full flex-1 border-none bg-transparent text-cream caret-burnt outline-none"
          />
        </div>
      </div>
    </div>
  );
}
