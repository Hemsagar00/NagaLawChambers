"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useState } from "react";
import { Menu, Phone, Scale, X } from "lucide-react";
import { navLinks } from "@/lib/content";
import { phoneHref, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduce = useReducedMotion();

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
          scrolled
            ? "portavia-nav-scrolled border-cyan-subtle"
            : "border-gold-faint"
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

          <nav className="hidden md:flex items-center gap-10 text-sm" aria-label="Desktop">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-text-secondary hover:text-kiwi-cyan transition-colors tracking-[0.15px] font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={phoneHref}
              className="inline-flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-gold text-kiwi-dark font-semibold rounded-xl text-xs sm:text-sm tracking-[0.3px] hover:bg-gold-hover active:scale-[0.985] transition-all"
              aria-label={`Call ${site.contact.phoneDisplay}`}
            >
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
              <span className="hidden sm:inline">Consult</span>
              <span className="sm:hidden">Call</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-lg border border-gold-faint text-text-primary hover:bg-gold-muted transition-colors"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label="Toggle navigation"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {mobileOpen && (
        <motion.div
          id="mobile-nav"
          initial={reduce ? false : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="fixed inset-x-0 top-[60px] z-40 md:hidden border-b border-gold-faint bg-kiwi-dark/95 backdrop-blur-xl"
        >
          <nav className="portavia-container py-5 flex flex-col gap-4" aria-label="Mobile">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-text-secondary hover:text-kiwi-cyan transition-colors text-base font-medium py-2"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </motion.div>
      )}
    </header>
  );
}
