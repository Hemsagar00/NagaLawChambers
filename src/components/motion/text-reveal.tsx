"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";

export function TextReveal({
  children,
  delay = 0,
  className,
  as: Component = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "span" | "p" | "h1" | "h2" | "h3";
}) {
  const reduce = useReducedMotion();
  const MotionComponent = motion.create(Component as any);

  return (
    <MotionComponent
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24, rotateX: -12 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </MotionComponent>
  );
}

export function LineReveal({
  lines,
  className,
  lineClassName,
  baseDelay = 0,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  baseDelay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <div className={className}>
      {lines.map((line, i) => (
        <div key={i} className="overflow-hidden">
          <motion.span
            className={lineClassName}
            initial={reduce ? false : { y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: baseDelay + i * 0.12,
              ease: EASE,
            }}
          >
            {line}
          </motion.span>
        </div>
      ))}
    </div>
  );
}

export function MaskReveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <div className={`overflow-hidden ${className || ""}`}>
      <motion.div
        initial={reduce ? false : { y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </div>
  );
}
