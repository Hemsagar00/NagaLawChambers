"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function AnimatedSection({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // Force visible after 1.5s as a fallback for static exports
  // where IntersectionObserver may not fire on initial load
  useEffect(() => {
    if (!isInView && ref.current) {
      const timer = setTimeout(() => {
        // Force the section visible if IntersectionObserver didn't fire
        if (ref.current) {
          ref.current.style.opacity = "1";
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <motion.section
      ref={ref as any}
      id={id}
      initial={reduce ? false : "hidden"}
      animate={isInView ? "visible" : undefined}
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
      className={cn(className)}
    >
      {children}
    </motion.section>
  );
}