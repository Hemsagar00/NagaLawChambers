"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { ParticleField } from "@/components/home/particle-field";
import { hero } from "@/lib/content";
import { site } from "@/lib/site";
import { EASE } from "@/lib/motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

export function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 500], [0, 60]);
  const opacityY = useTransform(scrollY, [0, 400], [1, 0.65]);

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative min-h-[100dvh] flex items-center overflow-hidden pt-16"
    >
      <ParticleField />
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(var(--color-kiwi-cyan)_0.5px,transparent_1px)] bg-[length:6px_6px] opacity-[0.04]"
        aria-hidden="true"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 0.04 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      />
      <div className="scanline-overlay" aria-hidden="true" />

      <motion.div
        className="relative z-10 portavia-container pt-12 sm:pt-16 pb-24 grid lg:grid-cols-2 gap-x-16 gap-y-14 lg:gap-y-16 items-center w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-xl">
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-cyan-subtle bg-cyan-muted mb-8 md:mb-10 portavia-eyebrow text-kiwi-cyan"
          >
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            {hero.eyebrow}
          </motion.div>

          <h1
            id="hero-heading"
            className="portavia-hero-title font-display-legal text-text-primary mb-8 md:mb-10"
          >
            {hero.headline.map((line, i) => (
              <div key={i} className="overflow-hidden">
                <motion.span
                  className="block"
                  initial={reduce ? false : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.12, ease: EASE }}
                >
                  {i === hero.headline.length - 1 ? (
                    <span className="gold-gradient-text">{line}</span>
                  ) : (
                    line
                  )}
                </motion.span>
              </div>
            ))}
          </h1>

          <motion.p
            variants={itemVariants}
            className="max-w-md text-base md:text-lg text-text-secondary leading-relaxed mb-10 md:mb-12"
          >
            {hero.description}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4"
          >
            <MagneticButton
              as="a"
              href="#contact"
              className="inline-flex justify-center items-center gap-3 px-8 py-4 bg-gold text-kiwi-dark font-semibold rounded-2xl text-[15px] tracking-[0.3px] hover:bg-gold-hover active:scale-[0.985] transition-all"
            >
              Book Consultation
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </MagneticButton>

            <MagneticButton
              as="a"
              href="#practice"
              className="inline-flex justify-center items-center gap-3 px-8 py-4 border border-cyan-subtle hover:bg-cyan-muted rounded-2xl text-[15px] tracking-[0.3px] transition-all"
            >
              Practice Areas
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          style={reduce ? undefined : { y: imageY, opacity: opacityY }}
          className="relative lg:pl-6"
        >
          <div className="relative aspect-[4/3.15] max-w-[480px] mx-auto lg:mx-0 rounded-[1.25rem] overflow-hidden border border-gold-subtle shadow-[0_28px_64px_-24px_rgba(0,0,0,0.75)] hud-image-frame group">
            <Image
              src="/advocate.jpg"
              alt={`Advocate ${site.advocate.name}, ${site.name}, Anantapur`}
              fill
              sizes="(max-width: 1024px) 90vw, 480px"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-kiwi-dark via-kiwi-dark/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-9">
              <motion.p
                initial={reduce ? false : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="portavia-eyebrow text-kiwi-cyan/90 mb-2"
              >
                ADVOCATE
              </motion.p>
              <p className="text-2xl sm:text-[2rem] font-display-legal tracking-[-0.6px]">
                {site.advocate.name}
              </p>
              <p className="text-sm text-text-secondary mt-1.5">
                Anantapur Bar • Practising since {site.advocate.practisingSince}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        animate={reduce ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-text-secondary/35"
        aria-hidden="true"
      >
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </section>
  );
}
