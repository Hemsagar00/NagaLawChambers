"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { PracticeAreaIcon } from "@/lib/content";
import { getPracticeAreaIcon } from "@/lib/icons";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { EASE, staggerItem } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function ExpandablePracticeCard({
  id,
  icon,
  title,
  courts,
  summary,
  details,
  isOpen,
  onToggle,
  className,
}: {
  id: string;
  icon: PracticeAreaIcon;
  title: string;
  courts: string;
  summary: string;
  details: string;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}) {
  const Icon = getPracticeAreaIcon(icon);
  const reduce = useReducedMotion();

  return (
    <SpotlightCard
      layout
      variants={staggerItem}
      whileHover={
        reduce ? undefined : { y: -4, transition: { duration: 0.25, ease: EASE } }
      }
      className={cn(
        "premium-card overflow-hidden group",
        isOpen && "border-cyan-hover",
        className
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`${id}-details`}
        className="w-full text-left p-6 sm:p-7"
      >
        <div className="flex items-start gap-5">
          <motion.div
            className="w-12 h-12 rounded-2xl bg-gold-muted flex items-center justify-center border border-gold-subtle shrink-0"
            whileHover={reduce ? undefined : { scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Icon className="w-6 h-6 text-gold" aria-hidden="true" />
          </motion.div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl md:text-[1.35rem] font-semibold text-text-primary font-display-legal tracking-[-0.3px]">
                  {title}
                </h3>
                <p className="text-xs md:text-sm text-kiwi-cyan/80 mt-1.5 tracking-[0.22px]">
                  {courts}
                </p>
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.28 }}
                className="mt-1 text-kiwi-cyan/60 shrink-0"
              >
                <ChevronDown className="w-5 h-5" aria-hidden="true" />
              </motion.div>
            </div>
            <p className="text-[15px] text-text-secondary/90 leading-[1.7] mt-4">
              {summary}
            </p>
          </div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`${id}-details`}
            key="details"
            layout
            initial={reduce ? { opacity: 1 } : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: reduce ? 0.2 : 0.34, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-0">
              <div className="sm:pl-[4.25rem] border-t border-gold-subtle pt-5">
                <p className="text-[15px] text-text-secondary/90 leading-[1.75]">
                  {details}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SpotlightCard>
  );
}
