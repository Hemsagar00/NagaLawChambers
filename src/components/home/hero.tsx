"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Phone, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { ParticleField } from "@/components/home/particle-field";
import { hero } from "@/lib/content";
import { phoneHref, site } from "@/lib/site";
import { EASE } from "@/lib/motion";
import { useMotionReady } from "@/hooks/use-motion-ready";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE },
  },
};

export function Hero() {
  const reduce = useReducedMotion();
  const ready = useMotionReady();
  const motionOn = ready && !reduce;
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 800], [0, 120]);
  const imageScale = useTransform(scrollY, [0, 800], [1, 1.1]);
  const imageRotate = useTransform(scrollY, [0, 800], [0, 2]);
  const opacityY = useTransform(scrollY, [0, 500], [1, 0.5]);
  const textX = useTransform(scrollY, [0, 500], [0, -30]);

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative min-h-[100dvh] flex items-center overflow-hidden pt-16"
    >
      <ParticleField />
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(var(--color-kiwi-cyan)_0.5px,transparent_1px)] bg-[length:6px_6px] opacity-[0.04]"
        aria-hidden="true"
        initial={motionOn ? { opacity: 0 } : false}
        animate={{ opacity: 0.04 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      />
      <div className="scanline-overlay" aria-hidden="true" />

      <motion.div
        className="relative z-10 portavia-container pt-12 sm:pt-24 pb-28 grid lg:grid-cols-2 gap-x-16 gap-y-16 lg:gap-y-20 items-center w-full"
        variants={containerVariants}
        initial={motionOn ? "hidden" : false}
        animate={motionOn ? "visible" : undefined}
      >
        <motion.div
          className="max-w-xl"
          style={reduce ? undefined : { x: textX }}
        >
          <motion.div
            variants={itemVariants}
            whileHover={reduce ? undefined : { scale: 1.02 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-cyan-subtle bg-cyan-muted mb-8 md:mb-10 portavia-eyebrow text-kiwi-cyan cursor-default shadow-[0_0_20px_-8px_rgba(0,229,255,0.25)]"
          >
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            {hero.eyebrow}
          </motion.div>

          <h1
            id="hero-heading"
            className="premium-hero-title font-display-legal text-text-primary mb-8 md:mb-10"
          >
            {hero.headline.map((line, i) => (
              <div key={i} className="overflow-hidden">
                <motion.span
                  className="block"
                  initial={motionOn ? { y: "110%", rotateX: -20 } : false}
                  animate={motionOn ? { y: 0, rotateX: 0 } : undefined}
                  transition={{
                    duration: 0.9,
                    delay: 0.25 + i * 0.14,
                    ease: EASE,
                  }}
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
            className="max-w-md text-base md:text-lg text-text-secondary/90 leading-[1.7] mb-10 md:mb-12"
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
              className="inline-flex justify-center items-center gap-3 px-8 py-4 bg-gold text-kiwi-dark font-semibold rounded-2xl text-[15px] tracking-[0.3px] hover:bg-gold-hover active:scale-[0.985] transition-all shadow-[0_12px_40px_-12px_rgba(212,175,55,0.35)]"
            >
              {hero.ctaPrimary}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </MagneticButton>

            <MagneticButton
              as="a"
              href={phoneHref}
              className="inline-flex justify-center items-center gap-3 px-8 py-4 border border-cyan-subtle hover:bg-cyan-muted rounded-2xl text-[15px] tracking-[0.3px] transition-all"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              {site.contact.phoneDisplay}
            </MagneticButton>
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          style={reduce ? undefined : { y: imageY, opacity: opacityY }}
          className="relative lg:pl-8"
        >
          <motion.div
            className="relative aspect-[4/3.15] max-w-[520px] mx-auto lg:mx-0 rounded-[1.25rem] overflow-hidden premium-frame group"
            whileHover={reduce ? undefined : { scale: 1.015 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <motion.div
              style={reduce ? undefined : { scale: imageScale, rotate: imageRotate }}
              className="absolute inset-0"
            >
              <Image
                src="/advocate.jpg"
                alt={`Advocate ${site.advocate.name}, ${site.name}, Anantapur`}
                fill
                sizes="(max-width: 1024px) 90vw, 500px"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                priority
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-kiwi-dark via-kiwi-dark/55 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-kiwi-dark/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-9">
              <motion.p
                initial={motionOn ? { opacity: 0, x: -20 } : false}
                whileInView={motionOn ? { opacity: 1, x: 0 } : undefined}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="portavia-eyebrow text-kiwi-cyan/90 mb-2"
              >
                ADVOCATE
              </motion.p>
              <p className="text-2xl sm:text-[2.15rem] font-display-legal tracking-[-0.6px]">
                {site.advocate.name}
              </p>
              <p className="text-sm text-text-secondary/90 mt-1.5">
                Anantapur Bar • Practising since {site.advocate.practisingSince}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        animate={reduce ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-kiwi-cyan/30"
        aria-hidden="true"
      >
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </section>
  );
}
