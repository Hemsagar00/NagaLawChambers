"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * A land-parcel boundary that draws itself once around the hero portrait,
 * with survey stones at the corners. Tied to the revenue & land practice.
 * Plays once, never loops.
 */
const PARCEL = "M10 28 L360 8 L486 40 L492 300 L474 616 L130 632 L12 596 L6 330 Z";
const CORNERS: Array<[number, number]> = [
  [10, 28],
  [360, 8],
  [486, 40],
  [474, 616],
  [130, 632],
  [12, 596],
  [6, 330],
];

export function PlotSurvey() {
  const reduce = useReducedMotion();
  return (
    <svg
      viewBox="0 0 500 640"
      fill="none"
      aria-hidden="true"
      className="pointer-events-none absolute -inset-5 h-[calc(100%+40px)] w-[calc(100%+40px)] sm:-inset-9 sm:h-[calc(100%+72px)] sm:w-[calc(100%+72px)]"
      preserveAspectRatio="none"
    >
      <motion.path
        d={PARCEL}
        stroke="#d4af37"
        strokeOpacity={0.45}
        strokeWidth={1}
        strokeDasharray="6 5"
        vectorEffect="non-scaling-stroke"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
      {CORNERS.map(([x, y], i) => (
        <motion.rect
          key={i}
          x={x - 4}
          y={y - 4}
          width={8}
          height={8}
          stroke="#d4af37"
          strokeOpacity={0.7}
          fill="#050508"
          vectorEffect="non-scaling-stroke"
          initial={reduce ? false : { opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          transition={{
            duration: 0.4,
            delay: 0.5 + (i / CORNERS.length) * 1.9,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}
    </svg>
  );
}
