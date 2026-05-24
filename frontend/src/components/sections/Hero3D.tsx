"use client";

import { Suspense, lazy } from "react";
import { motion } from "motion/react";
import { ArrowDown, Sparkle } from "lucide-react";
import Link from "next/link";
import { useLowMotion } from "@/lib/useLowMotion";
import TerrainFallback from "@/components/three/TerrainFallback";

const TerrainScene = lazy(() => import("@/components/three/TerrainScene"));

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 36, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export default function Hero3D() {
  const lowMotion = useLowMotion();

  return (
    <section
      id="home"
      className="relative min-h-[100svh] w-full overflow-hidden flex items-center"
      data-testid="hero-section"
    >
      {/* 3D Background (or static fallback for mobile / reduced-motion users) */}
      <div className="absolute inset-0">
        {lowMotion ? (
          <TerrainFallback />
        ) : (
          <Suspense fallback={<TerrainFallback />}>
            <TerrainScene />
          </Suspense>
        )}
        {/* Bottom fade into next section */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent via-[#02100c]/70 to-[#02100c] pointer-events-none" />
        {/* Top vignette */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#02100c]/80 to-transparent pointer-events-none" />
        {/* Side vignettes */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#02100c]/80 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#02100c]/80 to-transparent pointer-events-none" />
      </div>

      {/* Grain overlay */}
      <div className="absolute inset-0 grain pointer-events-none" />

      {/* Foreground content */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 pt-32 pb-24">
        <div className="max-w-6xl mx-auto">
          {/* Overline */}
          <motion.div
            {...reveal(0.1)}
            className="flex items-center gap-3 mb-8"
            data-testid="hero-overline"
          >
            <div className="h-px w-12 bg-[#D4AF37]" />
            <Sparkle size={14} className="text-[#D4AF37]" strokeWidth={1.5} />
            <span className="text-[10px] sm:text-[11px] tracking-[0.42em] uppercase text-[#D4AF37]/90 font-mono">
              Est. 2019 · Anantapur Bar Council · Andhra Pradesh
            </span>
          </motion.div>

          {/* Cinematic headline */}
          <h1 className="font-heading font-medium text-white leading-[0.95] text-[44px] sm:text-[72px] md:text-[96px] lg:text-[120px] tracking-tight">
            <motion.span {...reveal(0.25)} className="block">
              Naga Law
            </motion.span>
            <motion.span
              {...reveal(0.4)}
              className="block text-gold-gradient italic"
            >
              Chambers.
            </motion.span>
          </h1>

          {/* Tagline */}
          <motion.div
            {...reveal(0.6)}
            className="mt-8 grid md:grid-cols-12 gap-6 md:gap-12 items-end"
          >
            <p className="md:col-span-7 text-white/65 text-[15px] md:text-[17px] leading-[1.7] max-w-xl">
              A premier counsel for <span className="text-white">Land</span>,{" "}
              <span className="text-white">Revenue</span>{" "}and{" "}
              <span className="text-white">Property</span> disputes across the
              courts of Andhra Pradesh. Seven years of unwavering advocacy,
              meticulous strategy, and uncompromising integrity.
            </p>

            <div className="md:col-span-5 flex flex-col sm:flex-row md:justify-end gap-3 sm:gap-4">
              <Link
                href="#contact"
                data-testid="hero-cta-consult"
                className="terminal-btn px-6 py-3.5 rounded-full text-[11px] inline-flex items-center justify-center"
              >
                Book Consultation
              </Link>
              <Link
                href="#advocate"
                data-testid="hero-cta-meet"
                className="px-6 py-3.5 rounded-full text-[11px] tracking-[0.28em] uppercase text-white/70 border border-white/10 hover:border-white/30 hover:text-white transition-all inline-flex items-center justify-center"
              >
                Meet the Advocate
              </Link>
            </div>
          </motion.div>

          {/* Word-mark / pillars */}
          <motion.div
            {...reveal(0.85)}
            className="mt-16 md:mt-20 grid grid-cols-3 max-w-3xl gap-6 md:gap-12"
          >
            {[
              { k: "LAND", v: "Pattadar · ROR · Mutation" },
              { k: "LEGACY", v: "Partition · Coparcenary" },
              { k: "RIGHTS", v: "Injunctions · Possession" },
            ].map((p) => (
              <div key={p.k} className="border-t border-[#D4AF37]/25 pt-4">
                <p className="font-heading text-[#D4AF37] text-base md:text-lg tracking-[0.25em]">
                  {p.k}
                </p>
                <p className="text-[11px] md:text-xs text-white/45 mt-1 font-mono">
                  {p.v}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 z-10"
        data-testid="hero-scroll-cue"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase font-mono">
          Scroll
        </span>
        <ArrowDown size={14} />
      </motion.div>
    </section>
  );
}
