"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { PracticeAreaIcon } from "@/lib/content";
import { getPracticeAreaIcon } from "@/lib/icons";
import { staggerItem } from "@/lib/motion";

export function ExpandablePracticeCard({
  id,
  icon,
  title,
  courts,
  summary,
  details,
  isOpen,
  onToggle,
}: {
  id: string;
  icon: PracticeAreaIcon;
  title: string;
  courts: string;
  summary: string;
  details: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const Icon = getPracticeAreaIcon(icon);

  return (
    <motion.div
      layout
      variants={staggerItem}
      className="glass-card border border-gold-faint hover:border-cyan-hover transition-colors duration-300 overflow-hidden"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`${id}-details`}
        className="w-full text-left p-6 md:p-8 group"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gold-muted flex items-center justify-center border border-gold-subtle shrink-0 group-hover:scale-[1.06] transition-transform">
            <Icon className="w-6 h-6 text-gold" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg md:text-[21px] font-semibold text-text-primary font-display-legal tracking-[-0.2px]">
                  {title}
                </h3>
                <p className="text-xs md:text-sm text-kiwi-cyan/80 mt-1 tracking-[0.3px]">
                  {courts}
                </p>
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                className="mt-1 text-text-secondary shrink-0"
              >
                <ChevronDown className="w-5 h-5" aria-hidden="true" />
              </motion.div>
            </div>
            <p className="text-[14px] md:text-[15px] text-text-secondary leading-relaxed mt-3 tracking-[-0.1px]">
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
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0">
              <div className="md:pl-16 border-t border-gold-faint pt-4">
                <p className="text-[14px] md:text-[15px] text-text-secondary leading-relaxed">
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