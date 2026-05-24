"use client";

import { motion } from "motion/react";
import {
  Landmark,
  Gavel,
  FileText,
  Shield,
  ArrowUpRight,
} from "lucide-react";
import { useRef, MouseEvent } from "react";

type Practice = {
  num: string;
  title: string;
  blurb: string;
  bullets: string[];
  icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
  span: string;
  testid: string;
};

const practices: Practice[] = [
  {
    num: "01",
    title: "Land Revenue",
    blurb:
      "Mutation, Record of Rights and Pattadar matters before revenue authorities & tribunals.",
    bullets: [
      "ROR Appeals & corrections",
      "Mutation proceedings",
      "Pattadar passbook disputes",
      "Survey number rectification",
    ],
    icon: Landmark,
    span: "md:col-span-7",
    testid: "practice-card-land-revenue",
  },
  {
    num: "02",
    title: "Civil Litigation",
    blurb:
      "Ownership, partition & injunctions — fought with strategy that holds up across appeals.",
    bullets: [
      "Declaration suits",
      "Partition · coparcenary",
      "Permanent injunctions",
      "Trespass & possession",
    ],
    icon: Gavel,
    span: "md:col-span-5",
    testid: "practice-card-civil",
  },
  {
    num: "03",
    title: "Property Documentation",
    blurb:
      "Watertight drafting, due diligence, and pre-acquisition audits before you ever sign.",
    bullets: [
      "Sale · gift · will deeds",
      "Title verification",
      "Encumbrance analysis",
      "Power of attorney drafting",
    ],
    icon: FileText,
    span: "md:col-span-5",
    testid: "practice-card-documentation",
  },
  {
    num: "04",
    title: "Court Representation",
    blurb:
      "Direct counsel at Munsiff, District, Tribunal and the High Court of Andhra Pradesh.",
    bullets: [
      "Munsiff & District Court",
      "Revenue Tribunal hearings",
      "High Court (AP) matters",
      "Strategic case filings",
    ],
    icon: Shield,
    span: "md:col-span-7",
    testid: "practice-card-court",
  },
];

function PracticeTile({ p, index }: { p: Practice; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const Icon = p.icon;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.85,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`practice-card group rounded-3xl p-7 md:p-9 ${p.span}`}
      data-testid={p.testid}
    >
      <div className="relative z-10 flex flex-col h-full min-h-[280px]">
        <div className="flex items-start justify-between mb-7">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D4AF37]/15 to-[#0b3d2e]/30 border border-[#D4AF37]/20 flex items-center justify-center">
            <Icon size={22} className="text-[#D4AF37]" strokeWidth={1.5} />
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] tracking-[0.32em] text-white/35">
              {p.num}
            </span>
            <span className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 group-hover:border-[#D4AF37]/60 group-hover:text-[#D4AF37] transition-all duration-500">
              <ArrowUpRight size={15} strokeWidth={1.5} />
            </span>
          </div>
        </div>

        <h3 className="font-heading text-2xl md:text-3xl text-white/95 mb-3 leading-tight">
          {p.title}
        </h3>
        <p className="text-white/55 text-[14px] leading-relaxed mb-6 max-w-md">
          {p.blurb}
        </p>

        <ul className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
          {p.bullets.map((b) => (
            <li
              key={b}
              className="flex items-center gap-2.5 text-[12.5px] text-white/65"
            >
              <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function PracticeAreas() {
  return (
    <section
      id="practice"
      className="relative py-28 md:py-36"
      data-testid="practice-section"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px gold-hairline" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid md:grid-cols-12 gap-8 mb-16 md:mb-20 items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-7"
          >
            <p className="text-[11px] tracking-[0.42em] uppercase text-[#D4AF37] font-mono mb-5">
              ◆ Practice · Section 03
            </p>
            <h2 className="font-heading text-4xl md:text-6xl lg:text-[68px] leading-[1.05] tracking-tight">
              What I can{" "}
              <span className="text-gold-gradient italic">
                fight for you.
              </span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5 text-white/55 text-[15px] leading-relaxed"
          >
            Four pillars of practice — built around the unique fabric of land,
            revenue and property law in rural and urban Andhra Pradesh. Every
            engagement begins with a no-cost reading of your matter.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {practices.map((p, i) => (
            <PracticeTile key={p.title} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
