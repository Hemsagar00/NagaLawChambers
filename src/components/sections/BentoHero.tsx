"use client";

import { motion } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, Scale, Gavel, FileText, Building2,
  Landmark, Phone, Mail, MapPin, Sparkle, BookOpen, Shield,
  Users, Briefcase, PenTool
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const practiceIcons = [
  { icon: Scale, label: "Land Revenue" },
  { icon: Gavel, label: "Civil Litigation" },
  { icon: FileText, label: "Documentation" },
  { icon: Building2, label: "Property" },
  { icon: Landmark, label: "Court" },
  { icon: BookOpen, label: "ROR Appeals" },
  { icon: Shield, label: "Injunctions" },
  { icon: Users, label: "Partition" },
];

const practiceIconsRow2 = [
  { icon: Briefcase, label: "Tribunal" },
  { icon: PenTool, label: "Drafting" },
  { icon: Scale, label: "Revenue" },
  { icon: Gavel, label: "Litigation" },
  { icon: FileText, label: "Deeds" },
  { icon: Building2, label: "Title" },
  { icon: Landmark, label: "High Court" },
  { icon: Shield, label: "Defense" },
];

const timeline = [
  { year: "2019–Now", role: "Independent Advocate", org: "Naga Law Chambers" },
  { year: "2017–2019", role: "Junior Associate", org: "Anantapur District Court" },
  { year: "2015–2017", role: "Legal Intern", org: "Revenue Tribunal" },
];

export default function BentoHero() {
  return (
    <section id="home" className="relative min-h-screen bg-[#0a0a12] text-white antialiased overflow-hidden">
      {/* Hero background video — subtle ambient */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-[0.08] pointer-events-none"
        src="/videos/Dark_navy_abstract_background_202605161721.mp4"
      />

      {/* Subtle gold ambient glow (kept for depth) */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#c9a962] rounded-full blur-[200px] opacity-[0.07]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#c9a962] rounded-full blur-[180px] opacity-[0.05]" />

      {/* Header — clears fixed navbar */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-14 pt-24 sm:pt-28 md:pt-32 pb-4">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-2 mb-4"
              >
                <Scale className="text-[#c9a962]" size={18} strokeWidth={1.5} />
                <span className="text-xs uppercase tracking-[0.22em] text-[#c9a962]/80 whitespace-nowrap">
                  Anantapur Bar · Andhra Pradesh
                </span>
              </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[28px] sm:text-3xl md:text-4xl lg:text-[44px] leading-[1.15] font-normal tracking-tight font-[family-name:var(--font-playfair)]"
            >
              Hi, I&apos;m{" "}
              <span className="text-gradient-gold">S. Nagendra Naik!</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm md:text-[15px] leading-[1.6] text-white/60 max-w-2xl mt-3"
            >
              A dedicated advocate practicing across Anantapur and Andhra Pradesh courts.
              Seven years of focused experience in Land Revenue, Civil Litigation, and Property Law —
              fighting for every client&apos;s land, legacy, and rights with precision and intent.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <a
              href="https://t.me/nagalawchambers_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm font-medium text-white/90 hover:text-white transition-colors"
            >
              <span className="relative z-10">Book Consultation</span>
              <ArrowRight size={16} className="relative z-10" strokeWidth={1.5} />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-14 pb-6 sm:pb-8 md:pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:h-[calc(100vh-260px)]">

          {/* === COLUMN 1: Experience / Background === */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-2xl bg-black relative overflow-hidden flex flex-col card-3d"
          >
            {/* Gold gradient background instead of video */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#0a0a12] to-[#12121f]" />
            <div className="absolute inset-0 bg-gold-glow opacity-50" />

            <div className="relative z-10 flex flex-col h-full p-5 md:p-6">
              {/* Section label */}
              <div className="flex items-center justify-center gap-2 mb-auto">
                <Sparkle size={14} className="text-[#c9a962]/70" strokeWidth={1.5} />
                <span className="text-[11px] uppercase tracking-[0.22em] text-white/70">Experience</span>
                <Sparkle size={14} className="text-[#c9a962]/70" strokeWidth={1.5} />
              </div>

              {/* Advocate Photo — fills the card */}
              <div className="flex-1 flex items-center justify-center my-2">
                <div className="relative w-full max-w-[320px] h-[380px] sm:h-[440px] rounded-2xl overflow-hidden border border-[#c9a962]/20 shadow-2xl shadow-[#c9a962]/10">
                  <Image
                    src="/advocate.jpg"
                    alt="Advocate S. Nagendra Naik"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>
              </div>

              {/* Career Timeline */}
              <div className="space-y-3">
                {timeline.map((item) => (
                  <div key={item.year} className="grid grid-cols-[auto_auto_1fr_auto] items-center gap-2 text-[11px] sm:text-xs">
                    <span className="text-[#c9a962] font-medium">{item.year}</span>
                    <Sparkle size={12} className="text-white/40" strokeWidth={1.5} />
                    <span className="text-white/70">{item.role}</span>
                    <span className="text-white/40">{item.org}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* === COLUMN 2: Client Voice + Stats === */}
          <div className="flex flex-col gap-4 md:gap-5">
            {/* Client Voice */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="rounded-2xl relative overflow-hidden flex-1 flex flex-col card-3d"
              style={{
                backgroundImage: "url('/watercolor-bg.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative z-10 flex flex-col h-full p-5 md:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkle size={14} className="text-[#c9a962]/70" strokeWidth={1.5} />
                  <span className="text-[11px] uppercase tracking-[0.22em] text-white/70">Client Voice</span>
                </div>
                <p className="text-[13px] sm:text-[13.5px] leading-[1.6] text-white/85 flex-1">
                  &ldquo;Advocate Nagendra Naik solved a land dispute that was stuck for 10 years. His understanding of
                  revenue records and mutation procedures is unmatched. He fought for my family&apos;s rights with
                  dedication I had not seen before.&rdquo;
                </p>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-sm font-semibold text-white">Ramesh K.</p>
                  <p className="text-xs text-white/50">Farmer — Anantapur</p>
                </div>
              </div>
            </motion.div>

            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="rounded-2xl bg-black relative overflow-hidden flex flex-col justify-center items-center p-6 md:p-8 card-3d"
            >
              {/* Glass texture video background */}
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-[0.15]"
                src="/videos/Dark_glass_texture_gold_light_202605161727.mp4"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-transparent to-[#c9a962]/5" />
              <div className="absolute inset-0 bg-gold-glow opacity-30" />
              <div className="relative z-10 text-center">
                <p className="text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-light tracking-tight text-gradient-gold drop-shadow-lg">
                  50+
                </p>
                <p className="text-white/85 text-sm mt-2">Cases Handled</p>
              </div>
            </motion.div>
          </div>

          {/* === COLUMN 3: Practice Areas Marquee + Contact === */}
          <div className="flex flex-col gap-4 md:gap-5">
            {/* Practice Areas Marquee */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="rounded-2xl bg-black relative overflow-hidden flex-1 flex flex-col card-3d"
            >
              {/* Geometric grid video background */}
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-[0.12]"
                src="/videos/Abstract_geometric_grid_pulsing_…_202605161727.mp4"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#12121f] via-[#0a0a12] to-[#12121f]" />
              <div className="relative z-10 flex flex-col h-full p-5 md:p-6">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Sparkle size={14} className="text-[#c9a962]/70" strokeWidth={1.5} />
                  <span className="text-[11px] uppercase tracking-[0.22em] text-white/70">Practice Areas</span>
                </div>

                {/* Marquee Row 1 — scrolls left */}
                <div className="relative overflow-hidden flex-1 flex flex-col justify-center gap-3">
                  <div className="[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
                    <div className="flex animate-marquee-left">
                      {[...practiceIcons, ...practiceIcons].map((item, i) => (
                        <div
                          key={`r1-${i}`}
                          className="liquid-glass flex items-center justify-center h-14 w-14 md:h-16 md:w-16 rounded-xl mx-1.5 shrink-0"
                        >
                          <item.icon size={24} className="text-[#c9a962]/80" strokeWidth={1.5} />
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Marquee Row 2 — scrolls right */}
                  <div className="[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
                    <div className="flex animate-marquee-right">
                      {[...practiceIconsRow2, ...practiceIconsRow2].map((item, i) => (
                        <div
                          key={`r2-${i}`}
                          className="liquid-glass flex items-center justify-center h-14 w-14 md:h-16 md:w-16 rounded-xl mx-1.5 shrink-0"
                        >
                          <item.icon size={24} className="text-[#c9a962]/80" strokeWidth={1.5} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Reach Me */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="rounded-2xl p-5 md:p-6 relative overflow-hidden card-3d"
              style={{
                backgroundImage: "url('/watercolor-bg.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkle size={14} className="text-[#c9a962]/70" strokeWidth={1.5} />
                    <span className="text-[11px] uppercase tracking-[0.22em] text-white/70">Reach Me</span>
                  </div>
                  <Link href="#contact">
                    <div className="liquid-glass h-9 w-9 rounded-full flex items-center justify-center">
                      <ArrowUpRight size={16} className="text-white/80" strokeWidth={1.5} />
                    </div>
                  </Link>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-white/70">
                    <Phone size={14} strokeWidth={1.5} />
                    <span>+91 94400 00417</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/70">
                    <Mail size={14} strokeWidth={1.5} />
                    <span>contact@nagalawchambers.com</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/70">
                    <Mail size={14} strokeWidth={1.5} />
                    <span>nagalawchambers@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/70">
                    <MapPin size={14} strokeWidth={1.5} />
                    <span>District Court Premises, Anantapur</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
