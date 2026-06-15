"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { AnimatedSection } from "@/components/home/animated-section";
import { ExpandablePracticeCard } from "@/components/home/expandable-practice-card";
import { SectionHeading } from "@/components/home/section-heading";
import { practiceAreas } from "@/lib/content";

export function PracticeAreasSection() {
  const [openId, setOpenId] = useState<string | null>(practiceAreas[0]?.id ?? null);

  return (
    <AnimatedSection className="py-16 md:py-20 relative" id="practice">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="AREAS OF FOCUS"
          title="Practice Areas"
          subtitle="Precise representation before the courts and authorities that decide your matter."
        />

        <motion.div layout className="grid md:grid-cols-2 gap-4 md:gap-5">
          {practiceAreas.map((area) => (
            <ExpandablePracticeCard
              key={area.id}
              {...area}
              isOpen={openId === area.id}
              onToggle={() =>
                setOpenId((prev) => (prev === area.id ? null : area.id))
              }
            />
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}