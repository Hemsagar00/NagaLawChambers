"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ExternalLink } from "lucide-react";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { EASE, staggerItem } from "@/lib/motion";
import { cn } from "@/lib/utils";

const cardClass =
  "portavia-card p-7 block hover:border-cyan-hover transition-all duration-300";

function ContactCardBody({
  icon: Icon,
  label,
  value,
  external,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  external?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <div className="flex items-start gap-4">
      <motion.div
        className="w-11 h-11 rounded-xl bg-gold-muted flex items-center justify-center border border-gold-subtle shrink-0"
        whileHover={reduce ? undefined : { scale: 1.08 }}
        transition={{ duration: 0.25, ease: EASE }}
      >
        <Icon className="w-5 h-5 text-gold" aria-hidden="true" />
      </motion.div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-[11px] uppercase tracking-[1.5px] text-text-secondary/70 mb-1.5 font-medium">
            {label}
          </p>
          {external && (
            <ExternalLink className="w-3 h-3 text-text-secondary/50" aria-hidden="true" />
          )}
        </div>
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
  const isExternal = href?.startsWith("http") ?? false;
  const body = <ContactCardBody icon={icon} label={label} value={value} external={isExternal} />;

  if (href) {
    return (
      <SpotlightCard
        variants={staggerItem}
        as="a"
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={cn(cardClass, "group block")}
        whileHover={
          reduce ? undefined : { y: -5, transition: { duration: 0.25, ease: EASE } }
        }
      >
        {body}
      </SpotlightCard>
    );
  }

  return (
    <SpotlightCard
      variants={staggerItem}
      className={cn(cardClass, "cursor-default")}
      whileHover={
        reduce ? undefined : { y: -5, transition: { duration: 0.25, ease: EASE } }
      }
    >
      {body}
    </SpotlightCard>
  );
}
