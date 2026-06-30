"use client";
import { useEffect, useRef } from "react";

export default function Intro() {
  const introRef = useRef<HTMLDivElement>(null);
  const wmRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const intro = introRef.current;
    const wm = wmRef.current;
    const bar = barRef.current;
    if (!intro || !wm || !bar) return;

    const t1 = setTimeout(() => {
      wm.style.transition = "opacity 0.4s ease";
      wm.style.opacity = "1";
    }, 100);
    const t2 = setTimeout(() => {
      bar.style.transition = "width 0.5s cubic-bezier(.7,0,.3,1)";
      bar.style.width = "100%";
    }, 360);
    const t3 = setTimeout(() => {
      intro.style.transition = "opacity 0.35s ease";
      intro.style.opacity = "0";
      intro.style.pointerEvents = "none";
    }, 840);
    const t4 = setTimeout(() => {
      intro.style.display = "none";
      document.querySelectorAll<HTMLElement>(".hero-reveal").forEach((el, i) => {
        setTimeout(() => el.classList.add("in"), i * 60);
      });
    }, 1200);

    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, []);

  return (
    <div
      ref={introRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: "#21201c" }}
      aria-hidden="true"
    >
      <div
        ref={wmRef}
        style={{
          fontSize: 22, fontWeight: 700, letterSpacing: "-0.04em",
          color: "#fbfbf9", opacity: 0,
        }}
      >
        Acq<span style={{ color: "#F97316" }}>r</span>on
      </div>
      <div
        ref={barRef}
        className="absolute bottom-0 left-0 h-[3px]"
        style={{ width: 0, background: "linear-gradient(135deg,#EF4444 0%,#F97316 50%,#F59E0B 100%)" }}
      />
    </div>
  );
}
