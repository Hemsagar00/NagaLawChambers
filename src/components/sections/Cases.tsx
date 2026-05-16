"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const cases = [
  {
    category: "LAND REVENUE",
    title: "ROR Mutation Appeal — 10-Year Dispute Resolved",
    desc: "Successfully overturned a long-pending mutation entry before the Revenue Tribunal, restoring rightful ownership for a farming family in Anantapur.",
  },
  {
    category: "CIVIL LITIGATION",
    title: "Coparcenary Partition Suit — Multi-Heir Settlement",
    desc: "Coordinated an out-of-court partition for ancestral agricultural land among seven coparceners with full title clarity and registered deeds.",
  },
  {
    category: "PROPERTY DOCUMENTATION",
    title: "Title Due Diligence — Pre-Acquisition Audit",
    desc: "Identified concealed litigation across 30 years of records, saving an investor from a ₹2 Cr+ exposure on a contested commercial plot.",
  },
  {
    category: "COURT REPRESENTATION",
    title: "Permanent Injunction — Possession Restored",
    desc: "Secured a permanent injunction in District Court within nine months, preventing unlawful dispossession of a senior client's residential property.",
  },
];

export default function Cases() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="cases" className="py-24 relative">
      <div className="gold-line mb-24" />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-[#c9a962] mb-4">Notable Work</p>
          <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-playfair)]">
            Featured <span className="text-gradient-gold">Cases.</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Selected matters that reflect a commitment to thorough strategy,
            meticulous documentation and lasting outcomes.
          </p>
        </motion.div>

        <div className="space-y-4">
          {cases.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group bg-[#12121f] rounded-2xl p-8 border border-[#c9a962]/10 hover:border-[#c9a962]/30 transition-all duration-500 cursor-pointer hover-lift"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="border border-[#c9a962]/30 rounded-full px-3 py-1 text-xs uppercase tracking-[0.15em] text-[#c9a962]">{c.category}</span>
                    <span className="w-8 h-px bg-[#c9a962]/30" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#f0f0f5] mb-2 font-[family-name:var(--font-playfair)] group-hover:text-[#c9a962] transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-2xl">{c.desc}</p>
                </div>
                <div className="w-10 h-10 rounded-full border border-[#c9a962]/20 flex items-center justify-center group-hover:bg-[#c9a962] group-hover:border-[#c9a962] transition-all">
                  <ArrowUpRight size={18} className="text-[#c9a962] group-hover:text-[#0a0a12]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
