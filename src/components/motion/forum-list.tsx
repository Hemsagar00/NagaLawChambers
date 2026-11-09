"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";

function Row({
  text,
  index,
  total,
  progress,
  reduce,
}: {
  text: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduce: boolean | null;
}) {
  // the dot fills once the drawn line has reached this row
  const at = (index + 0.5) / total;
  const scale = useTransform(progress, [at - 0.07, at], [0, 1]);
  return (
    <li className="relative flex items-baseline gap-4 border-b border-rule py-3.5 text-base text-ink-2">
      <span
        className="absolute -left-8 top-[22px] grid h-4 w-4 place-items-center rounded-full border-2 border-ink bg-paper-2"
        aria-hidden="true"
      >
        <motion.span className="h-2 w-2 rounded-full bg-ink" style={{ scale: reduce ? 1 : scale }} />
      </span>
      <span className="w-7 shrink-0 text-sm tabular-nums text-muted">{String(index + 1).padStart(2, "0")}</span>
      {text}
    </li>
  );
}

/**
 * The forums as a route: a line draws down the list as you scroll and each stop
 * fills as it is reached, the way a matter moves up from the Tahsildar to the
 * High Court. Every row is visible without script or with reduced motion.
 */
export function ForumList({ items }: { items: readonly string[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <ol ref={ref} className="relative m-0 list-none border-t border-ink p-0 pl-8">
      <span className="absolute bottom-6 left-[7px] top-6 w-px bg-rule" aria-hidden="true" />
      <motion.span
        className="absolute bottom-6 left-[7px] top-6 w-0.5 origin-top bg-ink"
        style={{ scaleY: reduce ? 1 : progress, translateX: "-0.5px" }}
        aria-hidden="true"
      />
      {items.map((text, i) => (
        <Row key={text} text={text} index={i} total={items.length} progress={progress} reduce={reduce} />
      ))}
    </ol>
  );
}
