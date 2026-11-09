"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

/**
 * Tweens a short number like "8+" from 0 when it scrolls into view.
 * Anything that is not a 1-2 digit number (e.g. "Anantapur", "2019") renders as-is.
 * Server render and reduced-motion both show the final value.
 */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const match = /^(\d{1,2})(\+?)$/.exec(value);

  useEffect(() => {
    if (!match || !inView || reduce || !ref.current) return;
    const el = ref.current;
    const end = Number(match[1]);
    const suffix = match[2];
    const controls = animate(0, end, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        el.textContent = `${Math.round(v)}${suffix}`;
      },
      onComplete: () => {
        el.textContent = value;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, value, match]);

  return <span ref={ref}>{value}</span>;
}
