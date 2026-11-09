"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Fades a block in once as it scrolls into view. Server markup is fully visible;
 * only blocks that start below the fold are hidden after mount, so scripting off
 * or reduced motion always shows everything.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "hidden" | "shown">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
    setState("hidden");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("shown");
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-state={state}
      className={className}
      style={
        state === "hidden"
          ? { opacity: 0, transform: "translateY(16px)" }
          : {
              opacity: 1,
              transform: "none",
              transition:
                state === "shown"
                  ? `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms`
                  : undefined,
            }
      }
    >
      {children}
    </div>
  );
}
