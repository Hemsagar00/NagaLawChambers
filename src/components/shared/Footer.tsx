"use client";

import Link from "next/link";
import { Scale, Phone, Mail } from "lucide-react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#practice", label: "Practice" },
  { href: "#about", label: "About" },
  { href: "#cases", label: "Cases" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="py-16 border-t border-[#c9a962]/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/court-icon.jpg"
                alt="NAGA Law Chambers"
                className="h-10 w-auto rounded-lg"
              />
              <span className="text-xl font-bold text-gradient-gold font-[family-name:var(--font-playfair)]">
                NAGA
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Defending Land. Legacy. Rights. Across Andhra Pradesh since 2019.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-sm uppercase tracking-wider text-[#c9a962] mb-4">Navigation</p>
            <div className="space-y-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-muted-foreground hover:text-[#c9a962] transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-sm uppercase tracking-wider text-[#c9a962] mb-4">Contact</p>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone size={14} />
                +91 94400 00417
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail size={14} />
                contact@nagalawchambers.com
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail size={14} />
                nagalawchambers@gmail.com
              </div>
            </div>
          </div>
        </div>

        <div className="gold-line mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2026 NAGA Law Chambers. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-[#c9a962] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[#c9a962] transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
