"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
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

  return (
    <AnimatedSection
      className="portavia-section border-t border-gold-faint bg-kiwi-dark"
      id="advocate"
    >
      <div className="portavia-container">
        <SectionHeading
          eyebrow={about.eyebrow}
          title={about.title}
          subtitle={about.subtitle}
        />

        <div className="grid lg:grid-cols-[minmax(0,380px)_1fr] gap-12 lg:gap-20 items-start max-w-5xl mx-auto">
          <SpotlightCard
            variants={staggerItem}
            whileHover={
              reduce ? undefined : { y: -6, transition: { duration: 0.35 } }
            }
            className="relative aspect-[3/4] max-w-[380px] mx-auto lg:mx-0 w-full rounded-2xl overflow-hidden border border-gold-subtle shadow-2xl group"
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
            <div className="absolute inset-0 bg-gradient-to-t from-kiwi-dark/90 via-kiwi-dark/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="portavia-eyebrow text-kiwi-cyan/90 mb-1">ADVOCATE</p>
              <p className="text-xl font-display-legal tracking-[-0.4px]">
                {site.advocate.name}
              </p>
            </div>
          </SpotlightCard>

          <div className="space-y-6">
            {about.paragraphs.map((paragraph, i) => (
              <motion.p
                key={paragraph.slice(0, 32)}
                variants={staggerItem}
                whileInView={{ opacity: 1, y: 0 }}
                initial={reduce ? false : { opacity: 0, y: 30 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                className="text-[15px] md:text-[16px] text-text-secondary leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}

            <motion.ul variants={staggerItem} className="grid sm:grid-cols-2 gap-3">
              {credentials.map((item, i) => (
                <SpotlightCard
                  key={item}
                  initial={reduce ? false : { opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.08,
                    duration: 0.4,
                    ease: EASE,
                  }}
                  whileHover={
                    reduce ? undefined : { x: 4, transition: { duration: 0.2 } }
                  }
                  className="flex items-start gap-2.5 text-sm text-text-primary bg-surface/50 border border-gold-faint rounded-xl px-4 py-3"
                >
                  <ShieldCheck
                    className="w-4 h-4 text-gold mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  {item}
                </SpotlightCard>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
