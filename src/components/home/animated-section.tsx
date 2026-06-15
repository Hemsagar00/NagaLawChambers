"use client";

import { motion } from "framer-motion";
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
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
      className={cn(className)}
    >
      {children}
    </motion.section>
  );
}