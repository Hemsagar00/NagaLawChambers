"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Users, Clock, TrendingUp } from "lucide-react";

const stats = [
  { icon: Award, label: "Years Experience", value: "7+" },
  { icon: Users, label: "Cases Handled", value: "50+" },
  { icon: TrendingUp, label: "Success Rate", value: "95%" },
  { icon: Clock, label: "Response Time", value: "2hr" },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative">
      <div className="gold-line mb-24" />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-6">
              <img
                src="/court-icon.jpg"
                alt="District Court Anantapur"
                className="h-16 w-auto opacity-80"
              />
            </div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#c9a962] mb-4">About Me</p>
            <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-playfair)] mb-6">
              A tradition of{" "}
              <span className="text-gradient-gold">trust.</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Hi, I'm Nagendra — registered with the Bar Council of Andhra Pradesh since 2019.
              I've dedicated my practice to protecting the land and property rights of
              individuals across the region with clarity, strategy and unwavering integrity.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              From quiet mutation entries to courtroom battles, every case receives
              meticulous attention and a strategic approach tailored to your unique situation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="bg-[#12121f] rounded-2xl p-6 border border-[#c9a962]/10 text-center hover:border-[#c9a962]/30 transition-all"
                >
                  <Icon className="text-[#c9a962] mx-auto mb-3" size={28} />
                  <div className="text-3xl font-bold text-gradient-gold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
