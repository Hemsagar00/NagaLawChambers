"use client";

import { motion, Variants } from "framer-motion";
import { useMemo } from "react";
import {
  Scale, Landmark, FileText, ShieldCheck, Phone, Mail, MapPin, ArrowRight,
  ChevronDown, Users, Clock, Gavel, BookOpen, MessageCircle
} from "lucide-react";
import Image from "next/image";

/* ── Seeded random for stable particles ── */
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

/* ── Animated HUD Particles (Kiwi) ── */
function ParticleField() {
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => {
        const r1 = seededRandom(i + 1);
        const r2 = seededRandom(i + 21);
        const r3 = seededRandom(i + 41);
        const r4 = seededRandom(i + 61);
        return {
          id: i,
          size: r1 * 2.5 + 1.2,
          left: r2 * 100,
          top: r3 * 100,
          opacity: r4 * 0.22 + 0.06,
          yShift: 12 + r3 * 26,
          duration: 6 + r2 * 6,
          delay: r4 * 4,
        };
      }),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#D4AF37]"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            opacity: p.opacity,
          }}
          animate={{ y: [0, -p.yShift, 0], opacity: [p.opacity * 0.6, p.opacity, p.opacity * 0.6] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

/* ── Advanced Stagger Variants (Kiwi professional) ── */
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.08,
    },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 52, scale: 0.965 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ── Reusable Section with Scroll Reveal ── */
function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-90px" }}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ── Enhanced Practice Card with Stagger ── */
function PracticeCard({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group glass-card p-7 md:p-8 border border-[rgba(212,175,55,0.12)] hover:border-[rgba(212,175,55,0.38)] transition-all duration-300 hover:shadow-[0_10px_30px_-15px_rgba(212,175,55,0.15)]"
    >
      <div className="w-12 h-12 rounded-xl bg-[rgba(212,175,55,0.08)] flex items-center justify-center mb-6 border border-[rgba(212,175,55,0.18)] group-hover:scale-[1.08] transition-transform">
        <Icon className="w-6 h-6 text-[#D4AF37]" />
      </div>
      <h3 className="text-[21px] font-semibold text-[#F1F5F9] mb-3.5 font-display-legal tracking-[-0.2px]">{title}</h3>
      <p className="text-[15px] text-[#94A3B8] leading-relaxed tracking-[-0.1px]">{desc}</p>
    </motion.div>
  );
}

/* ── Stat (enhanced) ── */
function Stat({ value, label, icon: Icon }: { value: string; label: string; icon: any }) {
  return (
    <motion.div variants={staggerItem} className="flex flex-col items-center text-center py-2">
      <div className="mb-3 text-[#D4AF37]">
        <Icon className="w-5 h-5" />
      </div>
      <div className="text-4xl md:text-[42px] font-bold tracking-[-1.2px] gold-gradient-text font-display-legal tabular-nums">
        {value}
      </div>
      <div className="text-sm text-[#94A3B8] mt-1.5 tracking-[0.3px]">{label}</div>
    </motion.div>
  );
}

/* ── Contact Card ── */
function ContactCard({ icon: Icon, label, value, href }: { icon: any; label: string; value: string; href?: string }) {
  const Inner = (
    <div className="flex items-start gap-4">
      <div className="w-11 h-11 rounded-xl bg-[rgba(212,175,55,0.08)] flex items-center justify-center border border-[rgba(212,175,55,0.18)] shrink-0">
        <Icon className="w-5 h-5 text-[#D4AF37]" />
      </div>
      <div>
        <p className="text-[11px] uppercase tracking-[1.5px] text-[#94A3B8]/70 mb-1.5 font-medium">{label}</p>
        <p className="text-[#F1F5F9] font-medium text-[15.5px] tracking-[-0.1px]">{value}</p>
      </div>
    </div>
  );

  return href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} className="glass-card p-6 block hover:border-[rgba(212,175,55,0.35)] transition-all">
      {Inner}
    </a>
  ) : (
    <div className="glass-card p-6">{Inner}</div>
  );
}

/* ── Navbar ── */
function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 liquid-glass border-b border-[rgba(212,175,55,0.08)]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[rgba(212,175,55,0.1)] flex items-center justify-center border border-[rgba(212,175,55,0.25)]">
            <Scale className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <span className="font-display-legal font-semibold text-[#F1F5F9] text-[19px] tracking-[-0.4px]">
            NAGA <span className="text-[#D4AF37]">Law</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-9 text-sm">
          {["Practice", "About", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-[#94A3B8] hover:text-[#D4AF37] transition-colors tracking-[0.2px]">
              {item}
            </a>
          ))}
        </div>

        <a href="#contact" className="hidden md:inline-flex items-center gap-2.5 px-5 py-2.5 bg-[#D4AF37] text-[#090D16] font-semibold rounded-xl text-sm tracking-[0.3px] hover:bg-[#E8C84A] active:scale-[0.985] transition-all">
          <MessageCircle className="w-4 h-4" /> Book Consultation
        </a>
      </div>
    </nav>
  );
}

/* ── Footer ── */
function Footer() {
  return (
    <footer className="border-t border-[rgba(212,175,55,0.08)] py-14 bg-[#050508]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Scale className="w-5 h-5 text-[#D4AF37]" />
              <span className="font-display-legal font-semibold text-[#F1F5F9] text-xl tracking-[-0.3px]">NAGA Law Chambers</span>
            </div>
            <p className="text-sm text-[#94A3B8] leading-relaxed pr-2">Premier legal representation in Land, Revenue &amp; Property disputes across Andhra Pradesh courts. 7+ years of focused practice.</p>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[1.8px] text-[#94A3B8]/70 mb-4 font-medium">Practice Areas</div>
            <div className="space-y-[9px] text-sm text-[#94A3B8]">
              {["Revenue & Land", "Civil & Partition", "Criminal & Bail", "Family & Consumer"].map((a) => <div key={a}>{a}</div>)}
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[1.8px] text-[#94A3B8]/70 mb-4 font-medium">Contact</div>
            <div className="space-y-1.5 text-sm text-[#94A3B8]">
              <div>+91 94400 00417</div>
              <div>contact@nagalawchambers.com</div>
              <div>District Court Premises, Anantapur, AP 515001</div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[rgba(212,175,55,0.08)] flex flex-col md:flex-row justify-between items-center gap-y-4 text-xs text-[#94A3B8]/60">
          <div>© {new Date().getFullYear()} NAGA Law Chambers. All rights reserved. Advocate S. Nagendra Naik.</div>
          <div className="flex gap-5">
            <a href="https://t.me/nagalawchambers_bot" target="_blank" className="hover:text-[#D4AF37] transition-colors">Telegram Bot</a>
            <span>Privacy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── Main Page ── */
export default function NagaLawChambers() {
  const practiceAreas = [
    { icon: Landmark, title: "Revenue & Land", desc: "ROR corrections, mutations, patta disputes, land acquisition, and revenue board matters before Tahsildar, RDO & Collector offices." },
    { icon: FileText, title: "Civil & Partition", desc: "Property partition suits, title disputes, injunctions, specific performance, and boundary conflicts in District & High Courts." },
    { icon: Scale, title: "Criminal & Bail", desc: "Bail applications, anticipatory bail, quashing petitions, and criminal defense in Sessions & Magistrate courts." },
    { icon: Users, title: "Family & Consumer", desc: "Divorce, maintenance, child custody, consumer forum complaints, and cheque bounce cases with focused representation." },
  ];

  return (
    <main className="min-h-screen bg-[#090D16] text-[#F1F5F9] selection:bg-[#D4AF37] selection:text-[#090D16]">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[100dvh] flex items-center overflow-hidden pt-16">
        <ParticleField />
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_0.6px,transparent_1px)] bg-[length:5px_5px] opacity-[0.035]" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-12 pb-20 grid lg:grid-cols-2 gap-x-16 gap-y-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[rgba(212,175,55,0.2)] bg-[rgba(212,175,55,0.05)] mb-7 text-xs tracking-[1.2px] text-[#D4AF37]"
            >
              <ShieldCheck className="w-3.5 h-3.5" /> BAR COUNCIL OF ANDHRA PRADESH • 2019
            </motion.div>

            <h1 className="text-[56px] md:text-[68px] leading-[0.96] font-display-legal font-semibold tracking-[-2.6px] mb-7">
              Defending<br />Land, Legacy<br />&amp; Rights
            </h1>

            <p className="max-w-md text-[17px] text-[#94A3B8] tracking-[-0.2px] leading-relaxed mb-9">
              Premier legal representation in Land Revenue, Civil Litigation &amp; Property disputes across Andhra Pradesh courts. 7+ years focused experience.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="inline-flex justify-center items-center gap-3 px-8 py-[17px] bg-[#D4AF37] text-[#090D16] font-semibold rounded-2xl text-[15px] tracking-[0.4px] hover:bg-[#E8C84A] active:scale-[0.985] transition-all">
                Book Free Consultation <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#practice" className="inline-flex justify-center items-center gap-3 px-8 py-[17px] border border-[rgba(212,175,55,0.25)] hover:bg-white/5 rounded-2xl text-[15px] tracking-[0.4px] transition-all">
                Explore Practice Areas
              </a>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative lg:pl-8">
            <div className="relative aspect-[4/3.2] max-w-[460px] mx-auto lg:mx-0 rounded-3xl overflow-hidden border border-[rgba(212,175,55,0.2)] shadow-2xl">
              <Image src="/advocate.jpg" alt="Advocate S. Nagendra Naik" fill className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] via-[#090D16]/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="text-xs tracking-[2px] text-[#D4AF37]/90 mb-1">ADVOCATE</div>
                <div className="text-3xl font-display-legal tracking-[-0.8px]">S. Nagendra Naik</div>
                <div className="text-sm text-[#94A3B8] mt-px">Anantapur Bar Council • 2019</div>
              </div>
            </div>
          </div>
        </div>

        <motion.div animate={{ y: [0, 9, 0] }} transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-9 left-1/2 -translate-x-1/2 text-[#94A3B8]/40">
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </section>

      {/* STATS */}
      <Section className="py-16 border-y border-[rgba(212,175,55,0.08)] bg-[#050508]" id="stats">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
            <Stat value="7+" label="Years Practice" icon={Clock} />
            <Stat value="500+" label="Cases Handled" icon={Gavel} />
            <Stat value="98%" label="Client Success" icon={ShieldCheck} />
            <Stat value="5" label="Courts Served" icon={Landmark} />
          </div>
        </div>
      </Section>

      {/* PRACTICE AREAS — Advanced Scroll Stagger */}
      <Section className="py-20" id="practice">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-block px-4 py-1 text-xs tracking-[2.2px] text-[#D4AF37] bg-[rgba(212,175,55,0.08)] rounded-full mb-5">AREAS OF FOCUS</div>
            <h2 className="text-5xl md:text-[52px] font-display-legal tracking-[-1.8px] mb-4">Practice Areas</h2>
            <p className="max-w-md mx-auto text-[#94A3B8] text-[15.5px]">Focused, precise representation in the matters that matter most to our clients.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {practiceAreas.map((area, idx) => (
              <PracticeCard key={idx} icon={area.icon} title={area.title} desc={area.desc} />
            ))}
          </div>
        </div>
      </Section>

      {/* ABOUT */}
      <Section className="py-20 border-t border-[rgba(212,175,55,0.08)] bg-[#050508]" id="about">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-xs tracking-[2.5px] text-[#D4AF37] mb-4">ESTABLISHED PRESENCE</div>
            <h2 className="text-[42px] font-display-legal tracking-[-1.4px]">Deep Local Knowledge.<br />Client-First Advocacy.</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-x-14 gap-y-10 text-[15.5px] text-[#94A3B8] leading-relaxed tracking-[-0.1px]">
            <div>Born and practising in Anantapur district. Intimate understanding of local revenue offices, court procedures, and land records that only comes from years on the ground.</div>
            <div>Direct communication. No layers. Quick turnaround on urgent matters. Clear status updates. Transparent fee structure and honest case assessment — always.</div>
          </div>
        </div>
      </Section>

      {/* CONTACT */}
      <Section className="py-20" id="contact">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-xs tracking-[2.5px] text-[#D4AF37] mb-3">NEXT STEP</div>
            <h2 className="text-[42px] font-display-legal tracking-[-1.3px]">Book a Consultation</h2>
            <p className="text-[#94A3B8] mt-3">Discuss your case directly with Advocate S. Nagendra Naik.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <ContactCard icon={Phone} label="PHONE" value="+91 94400 00417" href="tel:+919440000417" />
            <ContactCard icon={Mail} label="EMAIL" value="contact@nagalawchambers.com" href="mailto:contact@nagalawchambers.com" />
            <ContactCard icon={MapPin} label="OFFICE" value="District Court Premises, Anantapur, AP 515001" />
          </div>

          <div className="mt-8 text-center">
            <a href="https://t.me/nagalawchambers_bot" target="_blank" className="inline-flex items-center gap-2 text-sm text-[#D4AF37] hover:underline">
              <MessageCircle className="w-4 h-4" /> Quick responses via Telegram Bot
            </a>
          </div>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
