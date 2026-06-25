"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useMotionReady } from "@/hooks/use-motion-ready";

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
  const ready = useMotionReady();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [forceVisible, setForceVisible] = useState(false);

  // Fallback when IntersectionObserver does not fire (static prerender / some mobile WebViews).
  useEffect(() => {
    const timer = setTimeout(() => setForceVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const visible = reduce || isInView || forceVisible;
  const motionOn = ready && !reduce;

  return (
    <motion.section
      ref={ref as React.RefObject<HTMLElement>}
      id={id}
      initial={motionOn ? "hidden" : false}
      animate={visible ? "visible" : undefined}
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
      className={cn(className)}
    >
      {children}
    </motion.section>
  );
}