"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { StatIcon } from "@/lib/content";
import { getStatIcon } from "@/lib/icons";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { EASE, staggerItem } from "@/lib/motion";

function useCountUp(
  target: number,
  duration = 1.8,
  enabled = false
): number {
  const [count, setCount] = useState(0);
  const startRef = useRef<number | null>(null);
  const targetRef = useRef(target);

  useEffect(() => {
    targetRef.current = target;
  }, [target]);

  useEffect(() => {
    if (!enabled) return;
    let raf: number;

    const tick = (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const progress = Math.min((ts - startRef.current) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * targetRef.current));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [enabled, duration]);

  return count;
}

function parseStatValue(value: string): { numeric: number; suffix: string } {
  const cleaned = value.replace(/[^0-9]/g, "");
  const numeric = cleaned ? Number(cleaned) : 0;
  const suffix = value.replace(/^[^0-9]+/, "").replace(/[0-9]/g, "");
  return { numeric, suffix };
}

export function Stat({
  value,
  label,
  icon,
}: {
  value: string;
  label: string;
  icon: StatIcon;
}) {
  const Icon = getStatIcon(icon);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const { numeric, suffix } = parseStatValue(value);
  const count = useCountUp(numeric, 2, isInView && !reduce && numeric > 0);

  const displayValue = numeric > 0 && !reduce ? `${count}${suffix}` : value;

  return (
    <SpotlightCard
      ref={ref}
      variants={staggerItem}
      whileHover={
        reduce ? undefined : { y: -8, scale: 1.02, transition: { duration: 0.25, ease: EASE } }
      }
      className="premium-card flex flex-col items-center text-center py-5 px-4 group"
    >
      <motion.div
        className="mb-3 text-gold"
        whileHover={reduce ? undefined : { rotate: 5, scale: 1.15 }}
        transition={{ duration: 0.3 }}
      >
        <Icon className="w-5 h-5" aria-hidden="true" />
      </motion.div>
      <motion.div
        className="text-3xl sm:text-4xl md:text-[44px] font-bold tracking-[-1.2px] gold-gradient-text font-display-legal tabular-nums"
        initial={reduce ? false : { opacity: 0, scale: 0.8, y: 12 }}
        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : undefined}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {displayValue}
      </motion.div>
      <div className="text-xs sm:text-sm text-text-secondary mt-1.5 tracking-[0.3px]">
        {label}
      </div>
    </SpotlightCard>
  );
}