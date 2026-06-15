"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { EASE, staggerItem } from "@/lib/motion";
import { cn } from "@/lib/utils";

const cardClass =
  "portavia-card p-7 block hover:border-cyan-hover transition-all duration-300";

function ContactCardBody({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <motion.div
        className="w-11 h-11 rounded-xl bg-gold-muted flex items-center justify-center border border-gold-subtle shrink-0"
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.25, ease: EASE }}
      >
        <Icon className="w-5 h-5 text-gold" aria-hidden="true" />
      </motion.div>
      <div>
        <p className="text-[11px] uppercase tracking-[1.5px] text-text-secondary/70 mb-1.5 font-medium">
          {label}
        </p>
        <p className="text-text-primary font-medium text-[15px] md:text-[15.5px] tracking-[-0.1px] break-words">
          {value}
        </p>
      </div>
    </div>
  );
}

export function ContactCard({
  icon,
  label,
  value,
  href,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}) {
  const reduce = useReducedMotion();
  const body = <ContactCardBody icon={icon} label={label} value={value} />;

  if (href) {
    return (
      <motion.a
        variants={staggerItem}
        href={href}
        className={cn(cardClass, "group")}
        whileHover={reduce ? undefined : { y: -5, transition: { duration: 0.25, ease: EASE } }}
      >
        {body}
      </motion.a>
    );
  }

  return (
    <motion.div
      variants={staggerItem}
      className={cn(cardClass, "cursor-default")}
      whileHover={reduce ? undefined : { y: -5, transition: { duration: 0.25, ease: EASE } }}
    >
      {body}
    </motion.div>
  );
}
