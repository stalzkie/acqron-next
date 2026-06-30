"use client";
import { useEffect, useRef } from "react";

/**
 * Apple-aesthetic word-by-word fade-up for description text.
 * Splits text on spaces, wraps each word in a <span class="word">,
 * then triggers .in on the container when it enters the viewport.
 * The CSS in globals.css staggers via nth-child.
 *
 * Usage:
 *   const ref = useWordFade("Some description text", 40)
 *   <p ref={ref} className="word-fade-up" />
 */
export function useWordFade(text: string, staggerMs = 40) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Build word spans
    const words = text.split(" ");
    el.innerHTML = words
      .map(
        (w, i) =>
          `<span class="word" style="transition-delay:${i * staggerMs}ms">${w}</span>`
      )
      .join(" ");

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in");
          obs.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -32px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [text, staggerMs]);

  return ref;
}
