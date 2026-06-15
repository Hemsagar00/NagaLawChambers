"use client";

import { motion } from "framer-motion";
import type { StatIcon } from "@/lib/content";
import { getStatIcon } from "@/lib/icons";
import { staggerItem } from "@/lib/motion";

export function Stat({
  value,
  label,
  icon,
}: {
  value: string;
  label: string;
  icon: StatIcon;
}) {
  const Icon = getStatIcon(icon);

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="flex flex-col items-center text-center py-2"
    >
      <div className="mb-3 text-gold">
        <Icon className="w-5 h-5" aria-hidden="true" />
      </div>
      <div className="text-3xl sm:text-4xl md:text-[42px] font-bold tracking-[-1.2px] gold-gradient-text font-display-legal tabular-nums">
        {value}
      </div>
      <div className="text-xs sm:text-sm text-text-secondary mt-1.5 tracking-[0.3px]">
        {label}
      </div>
    </motion.div>
  );
}