"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import { CheckCircle2, ScrollText, Scale, MapPin } from "lucide-react";

const qualifications = [
  { label: "B.A., LL.B (Five-Year Integrated)", icon: ScrollText },
  { label: "Enrolled · Bar Council of Andhra Pradesh, 2019", icon: Scale },
  { label: "Practising Advocate · Anantapur District Court", icon: MapPin },
];

const focus = [
  "Land Revenue & Mutation Appeals",
  "Civil Litigation & Partition Suits",
  "Property Documentation & Title Audit",
  "Court Representation across A.P.",
];

const fade = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
};

export default function AdvocateProfile() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yImage = useTransform(scrollYProgress, [0, 1], ["-6%", "8%"]);
  const yGlow = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section
      id="advocate"
      ref={ref}
      className="relative py-28 md:py-40 overflow-hidden"
      data-testid="advocate-section"
    >
      {/* Background ambient glow */}
      <motion.div
        style={{ y: yGlow }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(11,61,46,0.45)_0%,transparent_60%)]" />
      </motion.div>
      <div className="absolute top-0 right-0 w-1/2 h-px gold-hairline" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Section header */}
        <motion.div {...fade} className="mb-16 md:mb-20 max-w-3xl">
          <p className="text-[11px] tracking-[0.42em] uppercase text-[#D4AF37] font-mono mb-5">
            ◆ The Advocate
          </p>
          <h2 className="font-heading text-4xl md:text-6xl lg:text-[68px] leading-[1.05] tracking-tight">
            S. Nagendra <span className="text-gold-gradient italic">Naik</span>
          </h2>
          <p className="text-white/55 mt-5 text-base md:text-lg leading-relaxed">
            A lifelong student of land, jurisprudence, and the people behind
            every parcel.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* LEFT — Image bento card with parallax */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
            data-testid="advocate-image-card"
          >
            {/* Outer glow ring */}
            <div className="absolute -inset-3 rounded-[28px] bg-gradient-to-br from-[#D4AF37]/25 via-transparent to-[#0b3d2e]/40 blur-2xl opacity-60" />

            {/* Animated gold border */}
            <div className="relative rounded-[24px] p-[1.5px] bg-[conic-gradient(from_0deg,rgba(212,175,55,0.05),rgba(212,175,55,0.55),rgba(212,175,55,0.05),rgba(212,175,55,0.45),rgba(212,175,55,0.05))]">
              <div className="rounded-[22px] glass-strong overflow-hidden">
                {/* Header bar — terminal style */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-black/20">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#D4AF37]/70" />
                    <span className="w-2 h-2 rounded-full bg-white/15" />
                    <span className="w-2 h-2 rounded-full bg-white/15" />
                  </div>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 font-mono">
                    profile_001.dossier
                  </span>
                </div>

                {/* Image */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full aspect-[4/5] overflow-hidden"
                >
                  <motion.div
                    style={{ y: yImage }}
                    className="absolute -inset-[6%]"
                  >
                    <Image
                      src="/advocate.jpg"
                      alt="Advocate S. Nagendra Naik"
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover object-top"
                      priority
                    />
                  </motion.div>
                  {/* Color toning */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#02100c]/45 via-transparent to-[#D4AF37]/10 mix-blend-multiply pointer-events-none" />
                  {/* Bottom info chip */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                    <div className="glass-card rounded-xl px-4 py-3">
                      <p className="font-heading text-[15px] text-white tracking-wide">
                        S. Nagendra Naik
                      </p>
                      <p className="text-[10px] text-[#D4AF37] tracking-[0.28em] uppercase mt-0.5 font-mono">
                        Advocate · Anantapur Bar
                      </p>
                    </div>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-12 h-12 rounded-full border border-[#D4AF37]/50 flex items-center justify-center backdrop-blur-md bg-black/30 shrink-0"
                    >
                      <Scale size={16} className="text-[#D4AF37]" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Footer credential bar */}
                <div className="flex items-center justify-between px-5 py-3 border-t border-white/5 bg-black/20 text-[10px] font-mono tracking-[0.22em] uppercase">
                  <span className="text-white/40">ID · NLC-2019-AN</span>
                  <span className="text-[#D4AF37]/80 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                    Active
                  </span>
                </div>
              </div>
            </div>

            {/* Floating stat chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="hidden md:block absolute -right-4 top-1/3 glass-card rounded-2xl px-5 py-4 float-slow"
            >
              <p className="font-heading text-2xl text-gold-gradient">07+</p>
              <p className="text-[10px] tracking-[0.22em] uppercase text-white/55 mt-1 font-mono">
                Years
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55, duration: 0.7 }}
              className="hidden md:block absolute -left-6 bottom-12 glass-card rounded-2xl px-5 py-4 float-slow"
              style={{ animationDelay: "1.5s" }}
            >
              <p className="font-heading text-2xl text-gold-gradient">50+</p>
              <p className="text-[10px] tracking-[0.22em] uppercase text-white/55 mt-1 font-mono">
                Cases
              </p>
            </motion.div>
          </motion.div>

          {/* RIGHT — Bio + qualifications + focus */}
          <div
            className="lg:col-span-7 lg:pl-8"
            data-testid="advocate-text-block"
          >
            <motion.p
              {...fade}
              transition={{ ...fade.transition, delay: 0.1 }}
              className="text-[11px] tracking-[0.42em] uppercase text-[#D4AF37] font-mono mb-5"
            >
              Bio · Section 02
            </motion.p>

            <motion.h3
              {...fade}
              transition={{ ...fade.transition, delay: 0.18 }}
              className="font-heading text-2xl md:text-3xl leading-[1.3] text-white/95 mb-6"
            >
              A tradition of <span className="text-gold-gradient">trust.</span>{" "}
              A practice rooted in the land it defends.
            </motion.h3>

            <motion.p
              {...fade}
              transition={{ ...fade.transition, delay: 0.26 }}
              className="text-white/65 text-[15px] leading-[1.85] mb-5"
            >
              Hi, I am Nagendra — an advocate dedicated to the land and revenue
              law of Andhra Pradesh. Since my enrolment with the Bar Council in
              2019, I have championed the rights of farmers, families and
              landowners with clarity, strategy and unwavering integrity.
            </motion.p>
            <motion.p
              {...fade}
              transition={{ ...fade.transition, delay: 0.32 }}
              className="text-white/55 text-[15px] leading-[1.85] mb-10"
            >
              From quiet mutation entries to courtroom battles, every case
              receives meticulous attention and a strategy tailored to your
              parcel, your lineage, and your future.
            </motion.p>

            {/* Qualifications */}
            <motion.div
              {...fade}
              transition={{ ...fade.transition, delay: 0.4 }}
              className="mb-10"
            >
              <p className="text-[10px] tracking-[0.32em] uppercase text-[#D4AF37]/85 font-mono mb-4">
                Qualifications
              </p>
              <ul
                className="space-y-3"
                data-testid="advocate-qualifications"
              >
                {qualifications.map((q, i) => {
                  const Icon = q.icon;
                  return (
                    <motion.li
                      key={q.label}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.6,
                        delay: 0.45 + i * 0.1,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="flex items-center gap-4 text-white/80"
                    >
                      <span className="w-9 h-9 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 flex items-center justify-center shrink-0">
                        <Icon size={15} className="text-[#D4AF37]" />
                      </span>
                      <span className="text-[14px]">{q.label}</span>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>

            {/* Focus areas */}
            <motion.div
              {...fade}
              transition={{ ...fade.transition, delay: 0.55 }}
              className="grid sm:grid-cols-2 gap-x-8 gap-y-3"
            >
              {focus.map((f) => (
                <div
                  key={f}
                  className="flex items-start gap-3 text-[13.5px] text-white/70"
                >
                  <CheckCircle2
                    size={14}
                    className="text-[#D4AF37] mt-1 shrink-0"
                    strokeWidth={1.6}
                  />
                  {f}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
