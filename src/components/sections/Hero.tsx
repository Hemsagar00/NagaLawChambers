"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone, Scale } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[#0a0a12]">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#c9a962] rounded-full blur-[150px] opacity-10" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#1a1a2e] rounded-full blur-[120px] opacity-30" />
      </div>

      {/* Gold accent lines */}
      <div className="absolute top-0 left-0 right-0 gold-line" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Scale className="text-[#c9a962]" size={20} />
            <span className="text-sm uppercase tracking-[0.3em] text-[#c9a962]">
              S. Nagendra Naik · Anantapur Bar
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6 font-[family-name:var(--font-playfair)]">
            <span className="text-[#f0f0f5]">Defending</span>
            <br />
            <span className="text-gradient-gold">Land. Legacy.</span>
            <br />
            <span className="text-[#f0f0f5]">Rights.</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
            Premier legal representation in Land, Revenue & Property disputes —
            across Andhra Pradesh courts. Seven years of unwavering advocacy.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="#contact"
              className="group btn-liquid-glass-gold flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-[#0a0a12]"
            >
              <span className="relative z-10">Book Consultation</span>
              <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="tel:+919****0417"
              className="group btn-liquid-glass flex items-center gap-2 px-8 py-4 rounded-full text-[#c9a962]"
            >
              <Phone size={18} className="relative z-10" />
              <span className="relative z-10">+91 94400 00417</span>
            </Link>
          </div>

          <div className="mt-12 flex gap-10">
            {[
              { num: "07+", label: "Years Practice" },
              { num: "50+", label: "Cases Handled" },
              { num: "2019", label: "Bar Council AP" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-gradient-gold">{stat.num}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hidden lg:flex justify-center"
        >
          <div className="relative">
            <div className="w-[400px] h-[500px] rounded-2xl border border-[#c9a962]/20 overflow-hidden bg-glass relative">
              <Image
                src="/advocate.jpg"
                alt="Advocate S. Nagendra Naik"
                fill
                className="object-cover object-top"
                priority
              />
              {/* Subtle overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12]/60 via-transparent to-transparent" />
            </div>
            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-4 -left-4 bg-glass px-6 py-3 rounded-xl border-gold-glow"
            >
              <p className="text-sm font-semibold text-[#c9a962]">Available for Consultation</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-px h-12 bg-gradient-to-b from-[#c9a962] to-transparent" />
      </motion.div>
    </section>
  );
}
