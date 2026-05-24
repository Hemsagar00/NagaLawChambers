"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Advocate Nagendra Naik solved a land dispute that was stuck for 10 years. His understanding of revenue records is unmatched.",
    name: "Ramesh K.",
    role: "Farmer, Anantapur",
    initials: "RK",
  },
  {
    quote: "Professional and transparent. The legal opinion he provided saved me from buying a property with hidden litigation.",
    name: "Sreenivasulu",
    role: "Real Estate Investor",
    initials: "S",
  },
  {
    quote: "Excellent drafting of our partition deed. The process was smooth and explained clearly at every step.",
    name: "Lakshmi Devi",
    role: "Homeowner",
    initials: "LD",
  },
  {
    quote: "Knowledgeable about ROR and revenue procedures. He won my mutation appeal that two other lawyers had given up on.",
    name: "Venkata Rao",
    role: "Landowner, Kadiri",
    initials: "VR",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 relative">
      <div className="gold-line mb-24" />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-[#c9a962] mb-4">What Clients Say</p>
          <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-playfair)]">
            Client <span className="text-gradient-gold">Stories.</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            The trust of those I represent is the foundation of every case I take.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#12121f] rounded-2xl p-8 border border-[#c9a962]/10 relative"
            >
              <Quote className="text-[#c9a962]/20 absolute top-6 right-6" size={32} />
              <p className="text-[#e0e0e8] leading-relaxed mb-6 italic">"{t.quote}"</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#c9a962]/20 flex items-center justify-center text-[#c9a962] font-bold text-sm">
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-[#f0f0f5]">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
