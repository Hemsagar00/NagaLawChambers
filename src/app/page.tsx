"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AboutSection } from "@/components/home/about-section";
import { ContactSection } from "@/components/home/contact-section";
import { Hero } from "@/components/home/hero";
import { PracticeAreasSection } from "@/components/home/practice-areas-section";
import { StatsSection } from "@/components/home/stats-section";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { EASE } from "@/lib/motion";

/**
 * NAGA Law Chambers — Portavia-Kiwi hybrid landing page.
 *
 * Advanced Framer Motion orchestration:
 *   - Scroll-triggered section reveals
 *   - Staggered content entrances
 *   - Cursor-aware spotlight cards
 *   - Parallax hero image + scroll progress
 *
 * Design system (Kiwi):
 *   Primary background: #050508
 *   Accent cyan: #00E5FF
 *   Gold: #D4AF37
 *   Style: glassmorphism, subtle scanlines, HUD pulse, stark professional dark UI
 *
 * Structure:
 *   Navbar → Hero → Stats → Practice Areas → Advocate Profile → Contact → Footer
 */
const sectionVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE },
  },
};

export default function HomePage() {
  const reduce = useReducedMotion();

  return (
    <main className="min-h-screen bg-kiwi-dark text-text-primary selection:bg-gold selection:text-kiwi-dark overflow-x-hidden">
      <Navbar />

      <Hero />

      <div className="portavia-flow">
        {[StatsSection, PracticeAreasSection, AboutSection, ContactSection].map(
          (Section, index) => (
            <motion.div
              key={Section.name}
              initial={reduce ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={sectionVariants}
              transition={{ delay: index * 0.05 }}
            >
              <Section />
            </motion.div>
          )
        )}
      </div>

      <Footer />
    </main>
  );
}
