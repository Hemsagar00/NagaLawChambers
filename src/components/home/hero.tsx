"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { ParticleField } from "@/components/home/particle-field";
import { hero } from "@/lib/content";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative min-h-[100dvh] flex items-center overflow-hidden pt-16"
    >
      <ParticleField />
      <div
        className="absolute inset-0 bg-[radial-gradient(var(--color-kiwi-cyan)_0.5px,transparent_1px)] bg-[length:6px_6px] opacity-[0.04]"
        aria-hidden="true"
      />
      <div className="scanline-overlay" aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-20 grid lg:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-10 lg:gap-y-12 items-center w-full">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-cyan-subtle bg-cyan-muted mb-6 md:mb-7 text-[10px] sm:text-xs tracking-[1.2px] text-kiwi-cyan"
          >
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            {hero.eyebrow}
          </motion.div>

          <h1
            id="hero-heading"
            className="text-[40px] sm:text-[52px] md:text-[64px] lg:text-[68px] leading-[0.98] font-display-legal font-semibold tracking-[-2px] md:tracking-[-2.6px] mb-6 md:mb-7"
          >
            {hero.headline[0]}
            <br />
            {hero.headline[1]}
            <br />
            <span className="gold-gradient-text">{hero.headline[2]}</span>
          </h1>

          <p className="max-w-md text-base md:text-[17px] text-text-secondary tracking-[-0.2px] leading-relaxed mb-8 md:mb-9">
            {hero.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href="#contact"
              className="inline-flex justify-center items-center gap-3 px-7 sm:px-8 py-4 bg-gold text-kiwi-dark font-semibold rounded-2xl text-[15px] tracking-[0.4px] hover:bg-gold-hover active:scale-[0.985] transition-all"
            >
              Book Consultation
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
            <a
              href="#practice"
              className="inline-flex justify-center items-center gap-3 px-7 sm:px-8 py-4 border border-cyan-subtle hover:bg-cyan-muted rounded-2xl text-[15px] tracking-[0.4px] transition-all"
            >
              Practice Areas
            </a>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative lg:pl-8"
        >
          <div className="relative aspect-[4/3.2] max-w-[460px] mx-auto lg:mx-0 rounded-3xl overflow-hidden border border-gold-subtle shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)] hud-image-frame">
            <Image
              src="/advocate.jpg"
              alt={`Advocate ${site.advocate.name}, ${site.name}, Anantapur`}
              fill
              sizes="(max-width: 1024px) 90vw, 460px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-kiwi-dark via-kiwi-dark/55 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <p className="text-[10px] sm:text-xs tracking-[2px] text-kiwi-cyan/90 mb-1">
                ADVOCATE
              </p>
              <p className="text-2xl sm:text-3xl font-display-legal tracking-[-0.8px]">
                {site.advocate.name}
              </p>
              <p className="text-sm text-text-secondary mt-1">
                Anantapur • Practising since {site.advocate.practisingSince}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-text-secondary/40"
        aria-hidden="true"
      >
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </section>
  );
}