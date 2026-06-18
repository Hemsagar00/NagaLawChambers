"use client";

import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { ShieldCheck } from "lucide-react";
import { AnimatedSection } from "@/components/home/animated-section";
import { SectionHeading } from "@/components/home/section-heading";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { about, credentials } from "@/lib/content";
import { EASE, staggerItem } from "@/lib/motion";
import { site } from "@/lib/site";

export function AboutSection() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const imageY = useTransform(scrollYProgress, [0.25, 0.65], [0, -60]);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: "-60px" });

  return (
    <AnimatedSection
      className="portavia-section relative bg-kiwi-dark aurora-legal"
      id="advocate"
    >
      <div className="absolute inset-0 -z-10 pointer-events-none bg-[radial-gradient(circle_at_20%_80%,rgba(0,229,255,0.04),transparent_40%)]" />

      <div className="portavia-container">
        <SectionHeading
          eyebrow={about.eyebrow}
          title={about.title}
          subtitle={about.subtitle}
        />

        <div ref={contentRef} className="grid lg:grid-cols-[minmax(0,380px)_1fr] gap-12 lg:gap-20 items-start max-w-5xl mx-auto">
          <SpotlightCard
            variants={staggerItem}
            whileHover={
              reduce ? undefined : { y: -8, transition: { duration: 0.4 } }
            }
            className="relative aspect-[3/4] max-w-[380px] mx-auto lg:mx-0 w-full rounded-2xl overflow-hidden premium-frame group"
          >
            <motion.div
              className="absolute inset-0"
              style={reduce ? undefined : { y: imageY }}
            >
              <Image
                src="/advocate.jpg"
                alt={`Advocate ${site.advocate.name} — professional portrait at ${site.name}`}
                fill
                sizes="(max-width: 1024px) 80vw, 380px"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-kiwi-dark via-kiwi-dark/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-kiwi-dark/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="label-legal text-kiwi-cyan/90 mb-1.5">ADVOCATE</p>
              <p className="text-2xl font-display-legal tracking-[-0.5px] text-text-primary">
                {site.advocate.name}
              </p>
            </div>
          </SpotlightCard>

          <div className="space-y-6">
            {about.paragraphs.map((paragraph, i) => (
              <motion.p
                key={paragraph.slice(0, 32)}
                initial={reduce ? false : { opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                className="text-[15px] md:text-[16.5px] text-text-secondary/90 leading-[1.75]"
              >
                {paragraph}
              </motion.p>
            ))}

            <div className="grid sm:grid-cols-2 gap-3">
              {credentials.map((item, i) => (
                <SpotlightCard
                  key={item}
                  initial={reduce ? false : { opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : undefined}
                  transition={{
                    delay: i * 0.08,
                    duration: 0.4,
                    ease: EASE,
                  }}
                  whileHover={
                    reduce ? undefined : { x: 4, transition: { duration: 0.2 } }
                  }
                  className="flex items-start gap-2.5 text-sm text-text-primary bg-surface/60 border border-gold-subtle rounded-xl px-4 py-3.5 shadow-sm"
                >
                  <ShieldCheck
                    className="w-4 h-4 text-gold mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="leading-snug">{item}</span>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}