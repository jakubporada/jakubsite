"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  ReactNode,
} from "react";

/* ------------------------------------------------------------------ *
 * JP-OS window manager — dependency-free.
 * Holds open windows (position, size, z-order, minimized/maximized) and
 * exposes actions. Windows stay mounted while open so app state (e.g.
 * the Terminal scrollback) survives minimize/focus changes.
 * ------------------------------------------------------------------ */

export type AppId =
  | "terminal"
  | "readme"
  | "about"
  | "projects"
  | "notes"
  | "contact";

export type WinState = {
  id: number;
  appId: AppId;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
};

const DEFAULT_SIZE: Record<AppId, { w: number; h: number }> = {
  terminal: { w: 660, h: 460 },
  readme: { w: 540, h: 520 },
  about: { w: 660, h: 560 },
  projects: { w: 680, h: 560 },
  notes: { w: 680, h: 560 },
  contact: { w: 540, h: 600 },
};

// Desktop chrome bounds (px) — keep windows clear of the bars.
export const MENUBAR_H = 34;
export const DOCK_CLEARANCE = 92;

type Ctx = {
  windows: WinState[];
  topId: number | null;
  openApp: (appId: AppId, opts?: { center?: boolean }) => void;
  close: (id: number) => void;
  focus: (id: number) => void;
  minimize: (id: number) => void;
  toggleMax: (id: number) => void;
  setBounds: (id: number, patch: Partial<Pick<WinState, "x" | "y" | "w" | "h">>) => void;
  isOpen: (appId: AppId) => boolean;
};

const WindowCtx = createContext<Ctx | null>(null);

export function useWindows(): Ctx {
  const ctx = useContext(WindowCtx);
  if (!ctx) throw new Error("useWindows must be used inside <WindowProvider>");
  return ctx;
}

export function WindowProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<WinState[]>([]);
  const zCounter = useRef(10);
  const idCounter = useRef(1);
  const cascade = useRef(0);

  const focus = useCallback((id: number) => {
    const z = ++zCounter.current;
    setWindows((ws) =>
      ws.map((w) => (w.id === id ? { ...w, z, minimized: false } : w))
    );
  }, []);

  const openApp = useCallback(
    (appId: AppId, opts?: { center?: boolean }) => {
      setWindows((ws) => {
        const existing = ws.find((w) => w.appId === appId);
        const z = ++zCounter.current;
        if (existing) {
          return ws.map((w) =>
            w.id === existing.id ? { ...w, z, minimized: false } : w
          );
        }
        const vw = typeof window !== "undefined" ? window.innerWidth : 1280;
        const vh = typeof window !== "undefined" ? window.innerHeight : 800;
        const size = DEFAULT_SIZE[appId];
        const w = Math.min(size.w, vw - 24);
        const h = Math.min(size.h, vh - MENUBAR_H - DOCK_CLEARANCE - 16);
        const n = cascade.current++;
        const x = opts?.center
          ? Math.max(12, Math.round((vw - w) / 2))
          : Math.max(12, Math.round((vw - w) / 2) - 150 + (n % 6) * 46);
        const y = opts?.center
          ? Math.max(MENUBAR_H + 10, Math.round((vh - DOCK_CLEARANCE - h) / 2.2))
          : MENUBAR_H + 26 + (n % 6) * 30;
        return [
          ...ws,
          {
            id: idCounter.current++,
            appId,
            x,
            y,
            w,
            h,
            z,
            minimized: false,
            maximized: false,
          },
        ];
      });
    },
    []
  );

  const close = useCallback((id: number) => {
    setWindows((ws) => ws.filter((w) => w.id !== id));
  }, []);

  const minimize = useCallback((id: number) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, minimized: true } : w)));
  }, []);

  const toggleMax = useCallback((id: number) => {
    const z = ++zCounter.current;
    setWindows((ws) =>
      ws.map((w) => (w.id === id ? { ...w, maximized: !w.maximized, z } : w))
    );
  }, []);

  const setBounds = useCallback(
    (id: number, patch: Partial<Pick<WinState, "x" | "y" | "w" | "h">>) => {
      setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, ...patch } : w)));
    },
    []
  );

  const topId = useMemo(() => {
    let best: WinState | null = null;
    for (const w of windows) {
      if (w.minimized) continue;
      if (!best || w.z > best.z) best = w;
    }
    return best ? best.id : null;
  }, [windows]);

  const isOpen = useCallback(
    (appId: AppId) => windows.some((w) => w.appId === appId),
    [windows]
  );

  const value = useMemo(
    () => ({ windows, topId, openApp, close, focus, minimize, toggleMax, setBounds, isOpen }),
    [windows, topId, openApp, close, focus, minimize, toggleMax, setBounds, isOpen]
  );

  return <WindowCtx.Provider value={value}>{children}</WindowCtx.Provider>;
}
