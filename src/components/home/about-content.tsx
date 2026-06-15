"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { about, credentials } from "@/lib/content";
import { staggerItem } from "@/lib/motion";

export function AboutContent() {
  return (
    <div className="space-y-6">
      {about.paragraphs.map((paragraph) => (
        <motion.p
          key={paragraph.slice(0, 32)}
          variants={staggerItem}
          className="text-[15px] md:text-[16px] text-text-secondary leading-relaxed"
        >
          {paragraph}
        </motion.p>
      ))}

      <motion.ul variants={staggerItem} className="grid sm:grid-cols-2 gap-3">
        {credentials.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2.5 text-sm text-text-primary bg-surface/50 border border-gold-faint rounded-xl px-4 py-3"
          >
            <ShieldCheck
              className="w-4 h-4 text-gold mt-0.5 shrink-0"
              aria-hidden="true"
            />
            {item}
          </li>
        ))}
      </motion.ul>
    </div>
  );
}