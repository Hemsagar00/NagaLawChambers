"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { about, credentials } from "@/lib/content";
import { EASE, staggerItem } from "@/lib/motion";

export function AboutContent() {
  const reduce = useReducedMotion();

  return (
    <div className="space-y-6">
      {about.paragraphs.map((paragraph, i) => (
        <motion.p
          key={paragraph.slice(0, 32)}
          variants={staggerItem}
          className="text-[15px] md:text-[16px] text-text-secondary leading-relaxed"
        >
          {paragraph}
        </motion.p>
      ))}

      <motion.ul variants={staggerItem} className="grid sm:grid-cols-2 gap-3">
        {credentials.map((item, i) => (
          <motion.li
            key={item}
            initial={reduce ? false : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4, ease: EASE }}
            whileHover={reduce ? undefined : { x: 4, transition: { duration: 0.2 } }}
            className="flex items-start gap-2.5 text-sm text-text-primary bg-surface/50 border border-gold-faint rounded-xl px-4 py-3 cursor-default"
          >
            <ShieldCheck
              className="w-4 h-4 text-gold mt-0.5 shrink-0"
              aria-hidden="true"
            />
            {item}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
