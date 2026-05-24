"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Phone, Mail, MapPin } from "lucide-react";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#advocate", label: "Advocate" },
  { href: "#practice", label: "Practice" },
  { href: "#cases", label: "Cases" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer
      className="relative pt-20 pb-10 border-t border-white/5"
      data-testid="footer-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Massive wordmark */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="text-[10px] tracking-[0.42em] uppercase text-[#D4AF37]/70 font-mono mb-4">
            Naga Law Chambers
          </p>
          <h2 className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-[140px] leading-[0.95] tracking-tight">
            <span className="text-white/95">Land. </span>
            <span className="text-gold-gradient italic">Legacy. </span>
            <span className="text-white/95">Rights.</span>
          </h2>
        </motion.div>

        <div className="gold-hairline mb-12" />

        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <p className="font-mono text-[10px] tracking-[0.32em] uppercase text-[#D4AF37]/80 mb-4">
              About
            </p>
            <p className="text-white/55 text-[14px] leading-[1.85] max-w-md">
              Counsel for Land, Revenue, and Property matters across Andhra
              Pradesh since 2019. Independent practice grounded in trust and
              jurisprudential clarity.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="font-mono text-[10px] tracking-[0.32em] uppercase text-[#D4AF37]/80 mb-4">
              Navigate
            </p>
            <ul className="space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-white/65 hover:text-[#E6C965] transition-colors text-[14px]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="font-mono text-[10px] tracking-[0.32em] uppercase text-[#D4AF37]/80 mb-4">
              Reach
            </p>
            <ul className="space-y-3 text-[14px]">
              <li className="flex items-center gap-3 text-white/65">
                <Phone size={14} className="text-[#D4AF37]" />
                +91 94400 00417
              </li>
              <li className="flex items-center gap-3 text-white/65">
                <Mail size={14} className="text-[#D4AF37]" />
                contact@nagalawchambers.com
              </li>
              <li className="flex items-center gap-3 text-white/65">
                <MapPin size={14} className="text-[#D4AF37]" />
                District Court Premises, Anantapur
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[12px] text-white/40 font-mono">
          <p>© {new Date().getFullYear()} Naga Law Chambers. All rights reserved.</p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="hover:text-[#D4AF37] transition-colors uppercase tracking-[0.2em]"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="hover:text-[#D4AF37] transition-colors uppercase tracking-[0.2em]"
            >
              Terms
            </Link>
            <span className="text-white/30">v2.0 · 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
