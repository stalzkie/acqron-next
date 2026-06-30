"use client";
import { useEffect, useRef, useState } from "react";

export function useTyping(text: string, speed = 38) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          // Add reveal class immediately so element is visible
          el.classList.add("in");
          let i = 0;
          const tick = () => {
            i++;
            setCount(i);
            if (i < text.length) setTimeout(tick, speed);
            else setDone(true);
          };
          setTimeout(tick, speed);
          obs.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [text, speed]);

  // Always return the full text sliced to current count,
  // falling back to the full text once done so content is never empty
  const displayed = done ? text : text.slice(0, count);

  return { ref, displayed, done };
}
