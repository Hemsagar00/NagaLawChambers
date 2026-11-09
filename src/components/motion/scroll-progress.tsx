"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Reading progress. Hidden for reduced motion by CSS, so server and client markup always match. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return <motion.div className="naga-progress" style={{ scaleX }} aria-hidden="true" />;
}
