"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

/**
 * Soft cursor-tracking parallax wrapper.
 * Children read CSS variables --mx and --my (in px).
 */
export default function CursorParallax({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setPos({ x, y });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <motion.div
      className={className}
      style={
        {
          "--mx": `${pos.x * 12}px`,
          "--my": `${pos.y * 12}px`,
        } as React.CSSProperties
      }
      animate={{ x: pos.x * 6, y: pos.y * 6 }}
      transition={{ type: "spring", stiffness: 60, damping: 18, mass: 0.6 }}
    >
      {children}
    </motion.div>
  );
}
