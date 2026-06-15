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
    <div className="text-center mb-14 md:mb-20 max-w-3xl mx-auto">
      <motion.div
        variants={staggerItem}
        className="inline-block px-5 py-1.5 portavia-eyebrow text-kiwi-cyan bg-cyan-muted border border-cyan-subtle rounded-full mb-6"
      >
        {eyebrow}
      </motion.div>
      <motion.h2
        variants={staggerItem}
        className="portavia-section-title font-display-legal mb-5 text-text-primary"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={staggerItem}
          className="max-w-xl mx-auto text-text-secondary text-base md:text-[17px] leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        variants={staggerItem}
        className="portavia-divider w-24 mx-auto mt-8"
        aria-hidden="true"
      />
    </div>
  );
}