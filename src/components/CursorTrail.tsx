"use client";
import { useEffect, useRef, useState } from "react";

const CELL = 24;
const CELL_INNER = CELL - 2;
const LINGER_MS = 600; // how long cell stays fully visible before disappearing

type Cell = { col: number; row: number; lit: number; dying: boolean };

function isLightColor(bg: string): boolean | null {
  const m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?/);
  if (!m) return null;
  const alpha = m[4] !== undefined ? parseFloat(m[4]) : 1;
  if (alpha < 0.05) return null;
  const lum = 0.299 * +m[1] + 0.587 * +m[2] + 0.114 * +m[3];
  return lum > 200;
}

export default function CursorTrail() {
  const [onWhiteBg, setOnWhiteBg] = useState(false);
  const cellsRef = useRef<Map<string, Cell>>(new Map());
  const [cells, setCells] = useState<Cell[]>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = document.elementFromPoint(e.clientX, e.clientY);
      let isLight: boolean | null = null;
      let node: Element | null = el;
      while (node && node !== document.documentElement) {
        if ((node as HTMLElement).dataset?.cursorTrail) { node = node.parentElement; continue; }
        const light = isLightColor(getComputedStyle(node).backgroundColor);
        if (light !== null) { isLight = light; break; }
        node = node.parentElement;
      }
      if (isLight === null) {
        isLight = isLightColor(getComputedStyle(document.body).backgroundColor) ?? true;
      }
      setOnWhiteBg(isLight);
      if (!isLight) return;

      const col = Math.floor(e.clientX / CELL);
      const row = Math.floor(e.clientY / CELL);
      const key = `${col},${row}`;
      if (!cellsRef.current.has(key)) {
        // Random extra delay so cells don't die in visit order
        const jitter = Math.random() * 400;
        cellsRef.current.set(key, { col, row, lit: Date.now() - jitter, dying: false });
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      let changed = false;
      for (const [key, cell] of cellsRef.current) {
        const age = now - cell.lit;
        if (!cell.dying && age > LINGER_MS) {
          cellsRef.current.set(key, { ...cell, dying: true });
          changed = true;
          // Remove after bounce-out animation completes (300ms)
          setTimeout(() => {
            cellsRef.current.delete(key);
          }, 300);
        }
      }
      setCells([...cellsRef.current.values()]);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  if (!onWhiteBg || cells.length === 0) return null;

  return (
    <>
      <style>{`
        @keyframes cell-in {
          0%   { transform: scale(0.2); opacity: 0; }
          60%  { transform: scale(1.05); opacity: 1; }
          80%  { transform: scale(0.7); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes cell-out {
          0%   { transform: scale(1); opacity: 1; }
          40%  { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(0); opacity: 0; }
        }
        .cell-enter { animation: cell-in 50ms cubic-bezier(0.34,1.56,0.64,1) forwards; }
        .cell-exit  { animation: cell-out 30ms cubic-bezier(0.55,0,1,0.45) forwards; }
      `}</style>
      <div
        data-cursor-trail=""
        style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: -1 }}
      >
        {cells.map((c) => {
          const gx = (c.col * CELL) / window.innerWidth;
          const r = Math.round(239 + (245 - 239) * gx);
          const g = Math.round(68 + (158 - 68) * gx);
          const b = Math.round(68 * (1 - gx));
          return (
            <div
              key={`${c.col},${c.row}`}
              className={c.dying ? "cell-exit" : "cell-enter"}
              style={{
                position: "fixed",
                left: c.col * CELL,
                top: c.row * CELL,
                width: CELL_INNER,
                height: CELL_INNER,
                background: `rgb(${r},${g},${b})`,
                borderRadius: 3,
              }}
            />
          );
        })}
      </div>
    </>
  );
}
