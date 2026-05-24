"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Phone, Menu, X } from "lucide-react";
import Link from "next/link";

const links = [
  { href: "#home", label: "Home", testid: "nav-home" },
  { href: "#advocate", label: "Advocate", testid: "nav-advocate" },
  { href: "#practice", label: "Practice", testid: "nav-practice" },
  { href: "#cases", label: "Cases", testid: "nav-cases" },
  { href: "#contact", label: "Contact", testid: "nav-contact" },
];

export default function NavDock() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 32);
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      {/* Desktop floating dock */}
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-1 px-2 py-2 rounded-full nav-dock"
        data-testid="navbar-desktop"
      >
        <Link
          href="#home"
          className="px-4 py-2 flex items-center gap-2"
          data-testid="brand-logo"
        >
          <div className="relative">
            <div className="w-7 h-7 rounded-full border border-[#D4AF37]/60 flex items-center justify-center">
              <span className="font-heading text-[10px] text-[#D4AF37] tracking-widest">
                NLC
              </span>
            </div>
          </div>
          <span className="font-heading text-[13px] tracking-[0.22em] text-white/90">
            NAGA
          </span>
        </Link>

        <div className="h-5 w-px bg-white/10 mx-1" />

        {links.slice(1).map((link) => (
          <Link
            key={link.href}
            href={link.href}
            data-testid={link.testid}
            className="relative px-3.5 py-1.5 text-[12px] tracking-[0.18em] uppercase text-white/65 hover:text-[#E6C965] transition-colors duration-300 group"
          >
            <span className="relative">{link.label}</span>
            <motion.span
              className="absolute left-1/2 -bottom-0.5 h-px bg-[#D4AF37] origin-center"
              initial={{ scaleX: 0, translateX: "-50%" }}
              whileHover={{ scaleX: 1 }}
              style={{ width: "60%" }}
            />
          </Link>
        ))}

        <div className="h-5 w-px bg-white/10 mx-1" />

        <Link
          href="#contact"
          data-testid="nav-cta-consult"
          className="terminal-btn group rounded-full px-4 py-2 text-[10px]"
        >
          Consult
        </Link>
      </motion.nav>

      {/* Mobile bar */}
      <div
        className={`md:hidden fixed top-3 left-3 right-3 z-50 flex items-center justify-between px-4 py-3 rounded-2xl transition-all ${
          scrolled ? "nav-dock" : "bg-transparent"
        }`}
      >
        <Link href="#home" className="flex items-center gap-2" data-testid="brand-logo-mobile">
          <div className="w-7 h-7 rounded-full border border-[#D4AF37]/60 flex items-center justify-center">
            <span className="font-heading text-[10px] text-[#D4AF37] tracking-widest">
              NLC
            </span>
          </div>
          <span className="font-heading text-[12px] tracking-[0.22em] text-white/90">
            NAGA
          </span>
        </Link>
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          data-testid="nav-mobile-toggle"
          className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-[#D4AF37]"
        >
          <Menu size={18} />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] md:hidden bg-[#02100c]/95 backdrop-blur-xl flex flex-col"
            data-testid="nav-mobile-menu"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-heading text-sm tracking-[0.3em] text-[#D4AF37]">
                NAGA LAW CHAMBERS
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                data-testid="nav-mobile-close"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/80"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center items-start px-8 gap-6">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    data-testid={`mobile-${link.testid}`}
                    className="font-heading text-3xl text-white/90 hover:text-[#D4AF37] transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="p-6">
              <a
                href="tel:+919440000417"
                data-testid="mobile-call-cta"
                className="terminal-btn w-full text-center py-3.5 rounded-full text-[11px] flex items-center justify-center gap-2"
              >
                <Phone size={14} />
                +91 94400 00417
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
