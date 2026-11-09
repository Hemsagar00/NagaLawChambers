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

function Stop({
  court,
  index,
  total,
  progress,
  reduce,
}: {
  court: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduce: boolean | null;
}) {
  // the stop fills once the drawn line has reached its row
  const at = (index + 0.5) / total;
  const scale = useTransform(progress, [at - 0.06, at], [0, 1]);

  return (
    <li className="naga-proof-row relative">
      <span
        className="absolute -left-8 top-[18px] grid h-4 w-4 place-items-center rounded-full border-2 border-ink bg-paper"
        aria-hidden="true"
      >
        <motion.span
          className="h-2 w-2 rounded-full bg-accent"
          style={{ scale: reduce ? 1 : scale }}
        />
      </span>
      <span>{court}</span>
    </li>
  );
}

/**
 * The forum list as a route: a line draws down the list as you scroll and each
 * stop fills as it is reached, the way a matter moves up through the forums.
 * Every row is visible without script; only the line and the stops animate.
 */
export function ForumRoute({ items }: { items: readonly string[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <ol ref={ref} className="relative m-0 list-none p-0 pl-8">
      <span
        className="absolute bottom-6 left-[7px] top-6 w-px bg-rule"
        aria-hidden="true"
      />
      <motion.span
        className="absolute bottom-6 left-[7px] top-6 w-0.5 origin-top bg-ink"
        style={{ scaleY: reduce ? 1 : scaleY, translateX: "-0.5px" }}
        aria-hidden="true"
      />
      {items.map((court, index) => (
        <Stop
          key={court}
          court={court}
          index={index}
          total={items.length}
          progress={scaleY}
          reduce={reduce}
        />
      ))}
    </ol>
  );
}
