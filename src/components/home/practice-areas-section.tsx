"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { AnimatedSection } from "@/components/home/animated-section";
import { ExpandablePracticeCard } from "@/components/home/expandable-practice-card";
import { SectionHeading } from "@/components/home/section-heading";
import { practiceAreas } from "@/lib/content";
import { fadeUp } from "@/lib/motion";

export function PracticeAreasSection() {
  const [openId, setOpenId] = useState<string | null>(
    practiceAreas[0]?.id ?? null
  );
  const reduce = useReducedMotion();

  return (
    <AnimatedSection className="portavia-section relative" id="practice">
      <div className="portavia-container">
        <SectionHeading
          eyebrow="AREAS OF FOCUS"
          title="Practice Areas"
          subtitle="Precise representation before the courts and authorities that decide your matter."
        />

        <motion.div
          layout
          initial={reduce ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="grid md:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto"
        >
          {practiceAreas.map((area, index) => (
            <motion.div
              key={area.id}
              variants={fadeUp}
              className={
                index === practiceAreas.length - 1 &&
                practiceAreas.length % 2 !== 0
                  ? "md:col-span-2 md:max-w-[calc(50%-0.75rem)] md:mx-auto md:w-full"
                  : undefined
              }
            >
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
