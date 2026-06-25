"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { AnimatedSection } from "@/components/home/animated-section";
import { ExpandablePracticeCard } from "@/components/home/expandable-practice-card";
import { SectionHeading } from "@/components/home/section-heading";
import { practiceAreas } from "@/lib/content";
import { fadeUp } from "@/lib/motion";
import { useMotionReady } from "@/hooks/use-motion-ready";

export function PracticeAreasSection() {
  const [openId, setOpenId] = useState<string | null>(
    practiceAreas[0]?.id ?? null
  );
  const reduce = useReducedMotion();
  const ready = useMotionReady();
  const motionOn = ready && !reduce;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <AnimatedSection className="portavia-section relative aurora-legal" id="practice">
      <div className="absolute inset-0 -z-10 pointer-events-none bg-[radial-gradient(circle_at_80%_20%,rgba(212,175,55,0.05),transparent_35%)]" />

      <div className="portavia-container">
        <SectionHeading
          eyebrow="AREAS OF FOCUS"
          title="Practice Areas"
          subtitle="Precise representation before the courts and authorities that decide your matter."
        />

        <motion.div
          ref={ref}
          initial={motionOn ? "hidden" : false}
          animate={isInView ? "visible" : undefined}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.12, delayChildren: 0.1 },
            },
          }}
          className="grid md:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto"
        >
          {practiceAreas.map((area) => (
            <motion.div key={area.id} variants={fadeUp}>
              <ExpandablePracticeCard
                {...area}
                isOpen={openId === area.id}
                onToggle={() =>
                  setOpenId((prev) => (prev === area.id ? null : area.id))
                }
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}