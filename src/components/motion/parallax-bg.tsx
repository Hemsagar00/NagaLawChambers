"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type CSSProperties } from "react";

/**
 * A background image that drifts slowly against the page as you scroll. It only
 * moves while scrolling (no loop), and not at all under reduced motion. Place it
 * as the first child of a `relative` block and lift the content above it with `relative`.
 */
export function ParallaxBg({
  src,
  strength = 8,
  outerStyle,
}: {
  src: string;
  /** Travel as a percentage of the block's height. */
  strength?: number;
  outerStyle?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={outerStyle}
    >
      <motion.div
        className="absolute -inset-[14%] bg-cover bg-center"
        style={{ backgroundImage: `url(${src})`, y: reduce ? 0 : y }}
      />
    </div>
  );
}
