"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { useRef } from "react";

const easing = [0.22, 1, 0.36, 1] as const;

/**
 * The forum list as a route: a line draws down the list as you scroll and each
 * stop lights up as it is reached, the way a matter moves up through forums.
 */
export function ForumRoute({ items }: { items: readonly string[] }) {
  const ref = useRef<HTMLDivElement>(null);
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
    <div ref={ref} className="relative grid gap-3 pl-8">
      <span
        className="absolute left-[7px] top-3 bottom-3 w-px bg-[var(--naga-line-hover)]"
        aria-hidden="true"
      />
      <motion.span
        className="absolute left-[7px] top-3 bottom-3 w-px origin-top bg-[var(--naga-gold)]"
        style={{ scaleY: reduce ? 1 : scaleY }}
        aria-hidden="true"
      />
      {items.map((court, i) => (
        <motion.div
          key={court}
          className="naga-proof-row relative"
          initial={reduce ? false : { opacity: 0.35 }}
          whileInView={reduce ? undefined : { opacity: 1 }}
          viewport={{ once: true, amount: 0.9, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 0.5, delay: 0.05, ease: easing }}
        >
          <span
            className="absolute -left-8 top-3 grid h-[15px] w-[15px] place-items-center rounded-full border border-[var(--naga-gold)] bg-[var(--naga-dark)]"
            aria-hidden="true"
          >
            <motion.span
              className="h-[7px] w-[7px] rounded-full bg-[var(--naga-gold)]"
              initial={reduce ? false : { scale: 0 }}
              whileInView={reduce ? undefined : { scale: 1 }}
              viewport={{ once: true, amount: 0.9, margin: "0px 0px -15% 0px" }}
              transition={{ duration: 0.35, delay: 0.1, ease: easing }}
            />
          </span>
          <BadgeCheck
            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--naga-gold)]"
            aria-hidden="true"
          />
          <span>{court}</span>
          <span className="sr-only">Stop {i + 1} of {items.length}</span>
        </motion.div>
      ))}
    </div>
  );
}
