"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { AboutSection } from "@/components/home/about-section";
import { ContactSection } from "@/components/home/contact-section";
import { Hero } from "@/components/home/hero";
import { PracticeAreasSection } from "@/components/home/practice-areas-section";
import { StatsSection } from "@/components/home/stats-section";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { EASE, staggerContainerSlow } from "@/lib/motion";

/**
 * NAGA Law Chambers — Premium Cinematic Landing Page.
 *
 * A 10-lakh level legal-agency experience for Advocate S. Nagendra Naik.
 * Dark cinematic legal aesthetic built on the strict Kiwi Design System:
 *   Primary: #050508
 *   Accent cyan: #00E5FF
 *   Legal gold: #D4AF37
 *
 * Motion design language (Portavia × Emil × stitch):
 *   - Scroll-orchestrated section reveals with deliberate stagger
 *   - Cursor-aware spotlight cards
 *   - Parallax hero image + micro-cinematic depth
 *   - HUD scanlines, gold-cyan gradient borders, and breathing pulse rings
 *
 * Hierarchy:
 *   Navbar → Hero → Stats → Practice Areas → Advocate Profile → Contact → Footer
 */
const sections = [StatsSection, PracticeAreasSection, AboutSection, ContactSection];

export default function HomePage() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Cinematic ambient background depth tied to scroll.
  const ambientY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const ambientOpacity = useTransform(scrollYProgress, [0, 0.5], [0.55, 0.25]);

  return (
    <main className="relative min-h-screen bg-kiwi-dark text-text-primary selection:bg-gold selection:text-kiwi-dark overflow-x-hidden">
      {/* Fixed cinematic background plane */}
      <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,229,255,0.06),transparent_50%)]" />
        <motion.div
          style={{ y: reduce ? 0 : ambientY, opacity: reduce ? 0.25 : ambientOpacity }}
          className="absolute -top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-gold-glow blur-[120px]"
        />
        <div className="scanline-overlay opacity-40" />
      </div>

      <Navbar />

      <Hero />

      <div className="portavia-flow relative z-10">
        {sections.map((Section, index) => (
          <motion.div
            key={Section.name}
            initial={reduce ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainerSlow}
            transition={{ delay: index * 0.04 }}
          >
            <Section />
          </motion.div>
        ))}
      </div>

      <Footer />
    </main>
  );
}
