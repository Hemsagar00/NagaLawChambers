"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function ParticleField() {
  const particles = useMemo(
    () =>
      Array.from({ length: 22 }).map((_, i) => {
        const r1 = seededRandom(i + 1);
        const r2 = seededRandom(i + 21);
        const r3 = seededRandom(i + 41);
        const r4 = seededRandom(i + 61);
        const r5 = seededRandom(i + 81);
        return {
          id: i,
          size: r1 * 2.8 + 1,
          left: r2 * 100,
          top: r3 * 100,
          opacity: r4 * 0.24 + 0.05,
          yShift: 14 + r3 * 28,
          duration: 5.5 + r2 * 6.5,
          delay: r4 * 4.5,
          isCyan: r5 > 0.72,
        };
      }),
    []
  );

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,520px)] h-[min(90vw,520px)]">
        <div className="hud-pulse-ring h-full w-full rounded-full" />
      </div>

      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={cn(
            "absolute rounded-full",
            p.isCyan ? "bg-kiwi-cyan hud-particle-cyan" : "bg-gold"
          )}
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -p.yShift, 0],
            opacity: [p.opacity * 0.5, p.opacity, p.opacity * 0.5],
            scale: p.isCyan ? [1, 1.35, 1] : [1, 1.1, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}