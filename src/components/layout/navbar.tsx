"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Phone, Scale } from "lucide-react";
import { useState } from "react";
import { navLinks } from "@/lib/content";
import { phoneHref } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  return (
    <header>
      <motion.nav
        aria-label="Primary"
        initial={false}
        animate={{ height: scrolled ? 60 : 64 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 liquid-glass border-b transition-colors duration-300",
          scrolled ? "portavia-nav-scrolled border-cyan-subtle" : "border-gold-faint"
        )}
      >
        <div className="portavia-container h-full flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-gold-muted flex items-center justify-center border border-gold-subtle shrink-0">
              <Scale className="w-4 h-4 text-gold" aria-hidden="true" />
            </div>
            <span className="font-display-legal font-semibold text-text-primary text-base sm:text-[19px] tracking-[-0.4px] truncate">
              NAGA <span className="text-gold">Law</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-10 text-sm">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-text-secondary hover:text-kiwi-cyan transition-colors tracking-[0.15px] font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            href={phoneHref}
            className="inline-flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-gold text-kiwi-dark font-semibold rounded-xl text-xs sm:text-sm tracking-[0.3px] hover:bg-gold-hover active:scale-[0.985] transition-all"
          >
            <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
            <span className="hidden sm:inline">Consult</span>
            <span className="sm:hidden">Call</span>
          </a>
        </div>
      </motion.nav>
    </header>
  );
}