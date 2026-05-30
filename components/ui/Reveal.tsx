"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCE_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCE_QUERY).matches,
    () => false,
  );
}

export function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [intersected, setIntersected] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIntersected(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduce]);

  const shown = reduce || intersected;

  return (
    <div
      ref={ref}
      data-shown={shown}
      className="transition-all duration-700 ease-out motion-reduce:transition-none data-[shown=false]:translate-y-4 data-[shown=false]:opacity-0 data-[shown=true]:translate-y-0 data-[shown=true]:opacity-100"
    >
      {children}
    </div>
  );
}
