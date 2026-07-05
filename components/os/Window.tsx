"use client";

import { ReactNode, useRef } from "react";
import {
  useWindows,
  WinState,
  MENUBAR_H,
  DOCK_CLEARANCE,
} from "./WindowManager";

/* ------------------------------------------------------------------ *
 * A JP-OS window: title bar with traffic lights, pointer-capture drag,
 * corner resize, minimize / maximize / close. During drag we mutate the
 * element style directly (no re-render per move) and commit the final
 * bounds to the manager on pointer-up.
 * ------------------------------------------------------------------ */

const MIN_W = 320;
const MIN_H = 220;

export function OSWindow({
  win,
  title,
  focused,
  children,
}: {
  win: WinState;
  title: string;
  focused: boolean;
  children: ReactNode;
}) {
  const { close, focus, minimize, toggleMax, setBounds } = useWindows();
  const ref = useRef<HTMLDivElement | null>(null);
  const drag = useRef<{ px: number; py: number; x: number; y: number } | null>(null);
  const resize = useRef<{ px: number; py: number; w: number; h: number } | null>(null);

  const clampX = (x: number, w: number) =>
    Math.min(Math.max(x, -w + 96), window.innerWidth - 96);
  const clampY = (y: number) =>
    Math.min(Math.max(y, MENUBAR_H + 2), window.innerHeight - DOCK_CLEARANCE - 30);

  /* ---- drag (title bar) ---- */
  function onDragStart(e: React.PointerEvent) {
    if (win.maximized) return;
    // ignore drags that start on the traffic lights
    if ((e.target as HTMLElement).closest("button")) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { px: e.clientX, py: e.clientY, x: win.x, y: win.y };
  }
  function onDragMove(e: React.PointerEvent) {
    if (!drag.current || !ref.current) return;
    const nx = clampX(drag.current.x + e.clientX - drag.current.px, win.w);
    const ny = clampY(drag.current.y + e.clientY - drag.current.py);
    ref.current.style.left = `${nx}px`;
    ref.current.style.top = `${ny}px`;
  }
  function onDragEnd() {
    if (!drag.current || !ref.current) return;
    setBounds(win.id, {
      x: parseFloat(ref.current.style.left),
      y: parseFloat(ref.current.style.top),
    });
    drag.current = null;
  }

  /* ---- resize (bottom-right handle) ---- */
  function onResizeStart(e: React.PointerEvent) {
    if (win.maximized) return;
    e.stopPropagation();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    resize.current = { px: e.clientX, py: e.clientY, w: win.w, h: win.h };
  }
  function onResizeMove(e: React.PointerEvent) {
    if (!resize.current || !ref.current) return;
    const nw = Math.max(MIN_W, resize.current.w + e.clientX - resize.current.px);
    const nh = Math.max(MIN_H, resize.current.h + e.clientY - resize.current.py);
    ref.current.style.width = `${nw}px`;
    ref.current.style.height = `${nh}px`;
  }
  function onResizeEnd() {
    if (!resize.current || !ref.current) return;
    setBounds(win.id, {
      w: parseFloat(ref.current.style.width),
      h: parseFloat(ref.current.style.height),
    });
    resize.current = null;
  }

  const boundsStyle = win.maximized
    ? {
        left: 8,
        top: MENUBAR_H + 8,
        width: "calc(100% - 16px)",
        height: `calc(100% - ${MENUBAR_H + DOCK_CLEARANCE + 8}px)`,
      }
    : { left: win.x, top: win.y, width: win.w, height: win.h };

  return (
    <div
      ref={ref}
      role="dialog"
      aria-label={title}
      onPointerDown={() => focus(win.id)}
      className={`absolute flex animate-window-in flex-col overflow-hidden rounded-xl border font-sans transition-[opacity] duration-150 motion-reduce:animate-none ${
        focused
          ? "border-maroon-light/40 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.95)]"
          : "border-white/10 opacity-[0.97] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.8)]"
      } ${win.minimized ? "pointer-events-none invisible" : "visible"}`}
      style={{ ...boundsStyle, zIndex: win.z }}
    >
      {/* Title bar */}
      <div
        onPointerDown={onDragStart}
        onPointerMove={onDragMove}
        onPointerUp={onDragEnd}
        onDoubleClick={() => toggleMax(win.id)}
        className={`flex select-none items-center gap-2 border-b border-white/10 px-4 py-2.5 ${
          focused ? "bg-ink-700/95" : "bg-ink-800/95"
        } ${win.maximized ? "" : "cursor-grab active:cursor-grabbing"}`}
        style={{ touchAction: "none" }}
      >
        <button
          onClick={() => close(win.id)}
          aria-label={`Close ${title}`}
          className="h-3 w-3 rounded-full bg-[#ff5f56] transition-transform hover:scale-110"
        />
        <button
          onClick={() => minimize(win.id)}
          aria-label={`Minimize ${title}`}
          className="h-3 w-3 rounded-full bg-[#ffbd2e] transition-transform hover:scale-110"
        />
        <button
          onClick={() => toggleMax(win.id)}
          aria-label={`Maximize ${title}`}
          className="h-3 w-3 rounded-full bg-[#27c93f] transition-transform hover:scale-110"
        />
        <span
          className={`ml-3 truncate font-mono text-xs ${
            focused ? "text-hokie-100" : "text-hokie-400"
          }`}
        >
          {title}
        </span>
        {focused && (
          <span className="ml-auto hidden font-mono text-[9px] uppercase tracking-[0.2em] text-hokie-500 sm:block">
            jp-os
          </span>
        )}
      </div>

      {/* Content */}
      <div className="min-h-0 flex-1 overflow-y-auto bg-ink-900/[0.97] backdrop-blur-sm">
        {children}
      </div>

      {/* Resize handle */}
      {!win.maximized && (
        <div
          onPointerDown={onResizeStart}
          onPointerMove={onResizeMove}
          onPointerUp={onResizeEnd}
          className="absolute bottom-0 right-0 h-5 w-5 cursor-nwse-resize"
          style={{ touchAction: "none" }}
          aria-hidden="true"
        >
          <div className="absolute bottom-1 right-1 h-2.5 w-2.5 border-b-2 border-r-2 border-white/25" />
        </div>
      )}
    </div>
  );
}
