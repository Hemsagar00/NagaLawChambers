"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Landmark, FileText, Shield, Gavel } from "lucide-react";

const practices = [
  {
    num: "01",
    title: "Land Revenue",
    icon: Landmark,
    items: [
      "Record of Rights (ROR) appeals & corrections",
      "Mutation proceedings before revenue authorities",
      "Revenue Tribunal & District Collector representation",
      "Pattadar passbook & survey number disputes",
    ],
  },
  {
    num: "02",
    title: "Civil Litigation",
    icon: Gavel,
    items: [
      "Ownership conflicts & declaration suits",
      "Partition suits — coparcenary & ancestral property",
      "Permanent & temporary injunctions",
      "Possession & trespass claims",
    ],
  },
  {
    num: "03",
    title: "Property Documentation",
    icon: FileText,
    items: [
      "Sale deed, gift deed & will drafting",
      "Title verification & due diligence reports",
      "Encumbrance certificate analysis",
      "Power of attorney & lease agreements",
    ],
  },
  {
    num: "04",
    title: "Court Representation",
    icon: Shield,
    items: [
      "District Court & Munsiff Court appearances",
      "High Court of Andhra Pradesh matters",
      "Revenue Tribunal hearings",
      "Strategic case management & filings",
    ],
  },
];

function PracticeCard({ practice, index }: { practice: typeof practices[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = practice.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative bg-[#12121f] rounded-2xl p-8 border border-[#c9a962]/10 hover:border-[#c9a962]/30 transition-all duration-500 hover-lift"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="w-12 h-12 rounded-xl bg-[#c9a962]/10 flex items-center justify-center">
          <Icon className="text-[#c9a962]" size={24} />
        </div>
        <span className="text-sm text-[#c9a962]/50 font-mono">{practice.num}</span>
      </div>

      <h3 className="text-xl font-semibold text-[#f0f0f5] mb-4 font-[family-name:var(--font-playfair)]">
        {practice.title}
      </h3>

      <ul className="space-y-3">
        {practice.items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c9a962] mt-2 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Practice() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section id="practice" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-[#c9a962] mb-4">What I Can Do For You</p>
          <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-playfair)]">
            Practice <span className="text-gradient-gold">Areas.</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            As an advocate, I am a fierce protector of land, legacy and the rights
            of every individual I represent.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {practices.map((p, i) => (
            <PracticeCard key={p.title} practice={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
