"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { PracticeAreaIcon } from "@/lib/content";
import { getPracticeAreaIcon } from "@/lib/icons";
import { staggerItem } from "@/lib/motion";
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

  return (
    <motion.div
      layout
      variants={staggerItem}
      className={cn(
        "portavia-card overflow-hidden",
        isOpen && "border-cyan-hover",
        className
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`${id}-details`}
        className="w-full text-left p-7 md:p-9 group"
      >
        <div className="flex items-start gap-5">
          <div className="w-12 h-12 rounded-2xl bg-gold-muted flex items-center justify-center border border-gold-subtle shrink-0 group-hover:scale-[1.05] transition-transform duration-300">
            <Icon className="w-6 h-6 text-gold" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl md:text-[1.35rem] font-semibold text-text-primary font-display-legal tracking-[-0.3px]">
                  {title}
                </h3>
                <p className="text-xs md:text-sm text-kiwi-cyan/75 mt-1.5 tracking-[0.2px]">
                  {courts}
                </p>
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.28 }}
                className="mt-1 text-text-secondary shrink-0"
              >
                <ChevronDown className="w-5 h-5" aria-hidden="true" />
              </motion.div>
            </div>
            <p className="text-[15px] text-text-secondary leading-relaxed mt-4">
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-7 md:px-9 pb-7 md:pb-9 pt-0">
              <div className="md:pl-[4.25rem] border-t border-gold-faint pt-5">
                <p className="text-[15px] text-text-secondary leading-relaxed">
                  {details}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}