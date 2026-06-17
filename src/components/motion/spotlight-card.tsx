"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  type HTMLMotionProps,
} from "framer-motion";
import { forwardRef, useRef } from "react";

/**
 * Cursor-aware spotlight card.
 * Wraps any element with a radial cyan glow that tracks the mouse.
 * When rendered as an anchor, href/target/rel props are forwarded.
 */
type SpotlightCardProps = {
  as?: "div" | "a";
  children: React.ReactNode;
  className?: string;
} & HTMLMotionProps<"div"> &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof HTMLMotionProps<"div">>;

export const SpotlightCard = forwardRef<HTMLDivElement, SpotlightCardProps>(
  ({ as: _as, children, className, ...props }, forwardedRef) => {
    const innerRef = useRef<HTMLDivElement>(null);
    const ref = (forwardedRef ?? innerRef) as React.RefObject<HTMLDivElement>;
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const reduce = useReducedMotion();

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    const background = useMotionTemplate`
      radial-gradient(
        320px circle at ${mouseX}px ${mouseY}px,
        rgba(0, 229, 255, 0.12),
        transparent 80%
      )
    `;

    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        className={`relative overflow-hidden ${className || ""}`}
        {...props}
      >
        {!reduce && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-0"
            style={{ background }}
          />
        )}
        <div className="relative z-10 w-full h-full">{children}</div>
      </motion.div>
    );
  }
);

SpotlightCard.displayName = "SpotlightCard";
