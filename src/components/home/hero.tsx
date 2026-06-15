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

      <div className="relative z-10 portavia-container pt-12 sm:pt-16 pb-24 grid lg:grid-cols-2 gap-x-16 gap-y-14 lg:gap-y-16 items-center w-full">
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-cyan-subtle bg-cyan-muted mb-8 md:mb-10 portavia-eyebrow text-kiwi-cyan"
          >
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            {hero.eyebrow}
          </motion.div>

          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="portavia-hero-title font-display-legal text-text-primary mb-8 md:mb-10"
          >
            {hero.headline[0]}
            <br />
            {hero.headline[1]}
            <br />
            <span className="gold-gradient-text">{hero.headline[2]}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="max-w-md text-base md:text-lg text-text-secondary leading-relaxed mb-10 md:mb-12"
          >
            {hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.24 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#contact"
              className="inline-flex justify-center items-center gap-3 px-8 py-4 bg-gold text-kiwi-dark font-semibold rounded-2xl text-[15px] tracking-[0.3px] hover:bg-gold-hover active:scale-[0.985] transition-all"
            >
              Book Consultation
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
            <a
              href="#practice"
              className="inline-flex justify-center items-center gap-3 px-8 py-4 border border-cyan-subtle hover:bg-cyan-muted rounded-2xl text-[15px] tracking-[0.3px] transition-all"
            >
              Practice Areas
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:pl-6"
        >
          <div className="relative aspect-[4/3.15] max-w-[480px] mx-auto lg:mx-0 rounded-[1.25rem] overflow-hidden border border-gold-subtle shadow-[0_28px_64px_-24px_rgba(0,0,0,0.75)] hud-image-frame">
            <Image
              src="/advocate.jpg"
              alt={`Advocate ${site.advocate.name}, ${site.name}, Anantapur`}
              fill
              sizes="(max-width: 1024px) 90vw, 480px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-kiwi-dark via-kiwi-dark/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-9">
              <p className="portavia-eyebrow text-kiwi-cyan/90 mb-2">ADVOCATE</p>
              <p className="text-2xl sm:text-[2rem] font-display-legal tracking-[-0.6px]">
                {site.advocate.name}
              </p>
              <p className="text-sm text-text-secondary mt-1.5">
                Anantapur Bar • Practising since {site.advocate.practisingSince}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-text-secondary/35"
        aria-hidden="true"
      >
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </section>
  );
}