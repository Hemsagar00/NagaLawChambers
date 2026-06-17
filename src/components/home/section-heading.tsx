"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE, staggerItem } from "@/lib/motion";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <div className="text-center mb-14 md:mb-20 max-w-3xl mx-auto">
      <div className="overflow-hidden mb-6">
        <motion.div
          variants={staggerItem}
          initial={reduce ? false : { y: "100%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="inline-block px-5 py-1.5 label-legal text-kiwi-cyan bg-cyan-muted border border-cyan-subtle rounded-full"
        >
          {eyebrow}
        </motion.div>
      </div>

      <div className="overflow-hidden">
        <motion.h2
          variants={staggerItem}
          initial={reduce ? false : { y: "100%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
          className="portavia-section-title font-display-legal mb-5 text-text-primary"
        >
          {title}
        </motion.h2>
      </div>

      {subtitle && (
        <motion.p
          variants={staggerItem}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.16, ease: EASE }}
          className="max-w-xl mx-auto text-text-secondary/90 text-base md:text-[17px] leading-[1.7]"
        >
          {subtitle}
        </motion.p>
      )}

      <motion.div
        variants={staggerItem}
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: 0.24, ease: EASE }}
        className="portavia-divider w-24 mx-auto mt-8 origin-center"
        aria-hidden="true"
      />
    </div>
  );
}
