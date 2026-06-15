"use client";

import { motion } from "framer-motion";
import { staggerItem } from "@/lib/motion";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center mb-12 md:mb-14">
      <motion.div
        variants={staggerItem}
        className="inline-block px-4 py-1 text-xs tracking-[2.2px] text-kiwi-cyan bg-cyan-muted border border-cyan-subtle rounded-full mb-5"
      >
        {eyebrow}
      </motion.div>
      <motion.h2
        variants={staggerItem}
        className="text-4xl sm:text-5xl md:text-[52px] font-display-legal tracking-[-1.8px] mb-4 text-text-primary"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={staggerItem}
          className="max-w-lg mx-auto text-text-secondary text-[15px] md:text-[15.5px] leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}