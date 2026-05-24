"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const cases = [
  {
    category: "Land Revenue",
    title: "ROR Mutation Appeal — 10-Year Dispute Resolved",
    desc: "Overturned a long-pending mutation entry before the Revenue Tribunal, restoring rightful ownership for a farming family in Anantapur.",
  },
  {
    category: "Civil Litigation",
    title: "Coparcenary Partition Suit — Multi-Heir Settlement",
    desc: "Coordinated an out-of-court partition for ancestral agricultural land among seven coparceners with full title clarity and registered deeds.",
  },
  {
    category: "Property Documentation",
    title: "Title Due Diligence — Pre-Acquisition Audit",
    desc: "Identified concealed litigation across 30 years of records, saving an investor from a ₹2 Cr+ exposure on a contested commercial plot.",
  },
  {
    category: "Court Representation",
    title: "Permanent Injunction — Possession Restored",
    desc: "Secured a permanent injunction within nine months, preventing unlawful dispossession of a senior client's residential property.",
  },
];

export default function Cases() {
  return (
    <section
      id="cases"
      className="relative py-28 md:py-36"
      data-testid="cases-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20 max-w-3xl"
        >
          <p className="text-[11px] tracking-[0.42em] uppercase text-[#D4AF37] font-mono mb-5">
            ◆ Notable Work · Section 04
          </p>
          <h2 className="font-heading text-4xl md:text-6xl lg:text-[68px] leading-[1.05] tracking-tight">
            Featured <span className="text-gold-gradient italic">Cases.</span>
          </h2>
          <p className="text-white/55 mt-5 text-[15px] leading-relaxed">
            A selection of matters that reflect a commitment to thorough
            strategy, meticulous documentation, and lasting outcomes.
          </p>
        </motion.div>

        <div className="space-y-4">
          {cases.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.85,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative rounded-2xl p-6 md:p-8 border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-500 bg-gradient-to-br from-[#04150f]/60 via-[#02100c]/60 to-[#0a0a12]/60 backdrop-blur-sm"
              data-testid={`case-card-${i}`}
            >
              <div className="grid md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-2 flex md:flex-col items-center md:items-start gap-4 md:gap-2">
                  <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#D4AF37]/90 border border-[#D4AF37]/30 rounded-full px-3 py-1">
                    {c.category}
                  </span>
                  <span className="font-mono text-[10px] text-white/30">
                    {String(i + 1).padStart(2, "0")} / {cases.length}
                  </span>
                </div>
                <div className="md:col-span-9">
                  <h3 className="font-heading text-xl md:text-2xl text-white/95 mb-2 leading-snug group-hover:text-[#E6C965] transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-white/55 text-[14px] leading-relaxed max-w-2xl">
                    {c.desc}
                  </p>
                </div>
                <div className="md:col-span-1 flex md:justify-end">
                  <span className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white/50 group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] group-hover:text-[#02100c] transition-all duration-500">
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
