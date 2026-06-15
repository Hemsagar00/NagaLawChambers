"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  Clock,
  FileText,
  Gavel,
  Landmark,
  Mail,
  MapPin,
  Phone,
  Scale,
  ShieldCheck,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useMemo, useState, type ComponentType, type SVGProps } from "react";

/* ── Site constants (static — avoids hydration mismatch) ── */
const SITE_URL = "https://nagalawchambers.com";
const PHONE_DISPLAY = "+91 94400 00417";
const PHONE_HREF = "tel:+919440000417";
const EMAIL = "contact@nagalawchambers.com";
const OFFICE =
  "District Court Premises, Anantapur, Andhra Pradesh 515001";
const COPYRIGHT_YEAR = 2026;

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

/* ── Seeded random for stable SSR/client particle positions ── */
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

/* ── JSON-LD structured data ── */
function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LegalService",
        "@id": `${SITE_URL}/#organization`,
        name: "NAGA Law Chambers",
        url: SITE_URL,
        telephone: "+919440000417",
        email: EMAIL,
        image: `${SITE_URL}/advocate.jpg`,
        description:
          "Advocate S. Nagendra Naik — legal representation in revenue, land, civil, criminal, and family matters across Andhra Pradesh courts.",
        address: {
          "@type": "PostalAddress",
          streetAddress: "District Court Premises",
          addressLocality: "Anantapur",
          addressRegion: "Andhra Pradesh",
          postalCode: "515001",
          addressCountry: "IN",
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Anantapur, Andhra Pradesh",
        },
        founder: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "S. Nagendra Naik",
        jobTitle: "Advocate",
        image: `${SITE_URL}/advocate.jpg`,
        telephone: "+919440000417",
        email: EMAIL,
        worksFor: { "@id": `${SITE_URL}/#organization` },
        alumniOf: "Bar Council of Andhra Pradesh",
        knowsAbout: [
          "Revenue Law",
          "Land Disputes",
          "Civil Litigation",
          "Criminal Bail",
          "Family Law",
          "Consumer Law",
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ── HUD Particle Field with cyan pulse ── */
function ParticleField() {
  const particles = useMemo(
    () =>
      Array.from({ length: 22 }).map((_, i) => {
        const r1 = seededRandom(i + 1);
        const r2 = seededRandom(i + 21);
        const r3 = seededRandom(i + 41);
        const r4 = seededRandom(i + 61);
        const r5 = seededRandom(i + 81);
        return {
          id: i,
          size: r1 * 2.8 + 1,
          left: r2 * 100,
          top: r3 * 100,
          opacity: r4 * 0.24 + 0.05,
          yShift: 14 + r3 * 28,
          duration: 5.5 + r2 * 6.5,
          delay: r4 * 4.5,
          isCyan: r5 > 0.72,
        };
      }),
    []
  );

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,520px)] h-[min(90vw,520px)] rounded-full hud-pulse-ring" />

      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full ${p.isCyan ? "bg-[#00E5FF] hud-particle-cyan" : "bg-[#D4AF37]"}`}
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -p.yShift, 0],
            opacity: [p.opacity * 0.5, p.opacity, p.opacity * 0.5],
            scale: p.isCyan ? [1, 1.35, 1] : [1, 1.1, 1],
          }}
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

/* ── Motion variants ── */
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.08 },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 48, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ── Scroll-triggered section wrapper ── */
function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ── Section heading with stagger ── */
function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center mb-12 md:mb-14">
      <motion.div
        variants={staggerItem}
        className="inline-block px-4 py-1 text-xs tracking-[2.2px] text-[#00E5FF] bg-[rgba(0,229,255,0.06)] border border-[rgba(0,229,255,0.15)] rounded-full mb-5"
      >
        {eyebrow}
      </motion.div>
      <motion.h2
        variants={staggerItem}
        className="text-4xl sm:text-5xl md:text-[52px] font-display-legal tracking-[-1.8px] mb-4 text-[#F1F5F9]"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={staggerItem}
          className="max-w-lg mx-auto text-[#94A3B8] text-[15px] md:text-[15.5px] leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

/* ── Expandable practice area card ── */
type PracticeArea = {
  icon: IconType;
  title: string;
  courts: string;
  summary: string;
  details: string;
};

function ExpandablePracticeCard({
  area,
  isOpen,
  onToggle,
}: {
  area: PracticeArea;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const Icon = area.icon;

  return (
    <motion.div
      layout
      variants={staggerItem}
      className="glass-card border border-[rgba(212,175,55,0.12)] hover:border-[rgba(0,229,255,0.28)] transition-colors duration-300 overflow-hidden"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full text-left p-6 md:p-8 group"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[rgba(212,175,55,0.08)] flex items-center justify-center border border-[rgba(212,175,55,0.18)] shrink-0 group-hover:scale-[1.06] transition-transform">
            <Icon className="w-6 h-6 text-[#D4AF37]" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg md:text-[21px] font-semibold text-[#F1F5F9] font-display-legal tracking-[-0.2px]">
                  {area.title}
                </h3>
                <p className="text-xs md:text-sm text-[#00E5FF]/80 mt-1 tracking-[0.3px]">
                  {area.courts}
                </p>
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                className="mt-1 text-[#94A3B8] shrink-0"
              >
                <ChevronDown className="w-5 h-5" aria-hidden="true" />
              </motion.div>
            </div>
            <p className="text-[14px] md:text-[15px] text-[#94A3B8] leading-relaxed mt-3 tracking-[-0.1px]">
              {area.summary}
            </p>
          </div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="details"
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0">
              <div className="pl-16 border-t border-[rgba(212,175,55,0.1)] pt-4">
                <p className="text-[14px] md:text-[15px] text-[#94A3B8] leading-relaxed">
                  {area.details}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Stat block ── */
function Stat({
  value,
  label,
  icon: Icon,
}: {
  value: string;
  label: string;
  icon: IconType;
}) {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="flex flex-col items-center text-center py-2"
    >
      <div className="mb-3 text-[#D4AF37]">
        <Icon className="w-5 h-5" aria-hidden="true" />
      </div>
      <div className="text-3xl sm:text-4xl md:text-[42px] font-bold tracking-[-1.2px] gold-gradient-text font-display-legal tabular-nums">
        {value}
      </div>
      <div className="text-xs sm:text-sm text-[#94A3B8] mt-1.5 tracking-[0.3px]">
        {label}
      </div>
    </motion.div>
  );
}

/* ── Contact card ── */
function ContactCard({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: IconType;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-start gap-4">
      <div className="w-11 h-11 rounded-xl bg-[rgba(212,175,55,0.08)] flex items-center justify-center border border-[rgba(212,175,55,0.18)] shrink-0">
        <Icon className="w-5 h-5 text-[#D4AF37]" aria-hidden="true" />
      </div>
      <div>
        <p className="text-[11px] uppercase tracking-[1.5px] text-[#94A3B8]/70 mb-1.5 font-medium">
          {label}
        </p>
        <p className="text-[#F1F5F9] font-medium text-[15px] md:text-[15.5px] tracking-[-0.1px] break-words">
          {value}
        </p>
      </div>
    </div>
  );

  const cardClass =
    "glass-card p-6 block hover:border-[rgba(0,229,255,0.3)] transition-all duration-300 hover:-translate-y-0.5";

  return href ? (
    <motion.a variants={staggerItem} href={href} className={cardClass}>
      {inner}
    </motion.a>
  ) : (
    <motion.div variants={staggerItem} className={cardClass}>
      {inner}
    </motion.div>
  );
}

/* ── Navbar ── */
function Navbar() {
  return (
    <header>
      <nav
        aria-label="Primary"
        className="fixed top-0 left-0 right-0 z-50 liquid-glass border-b border-[rgba(0,229,255,0.08)]"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-[rgba(212,175,55,0.1)] flex items-center justify-center border border-[rgba(212,175,55,0.25)] shrink-0">
              <Scale className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
            </div>
            <span className="font-display-legal font-semibold text-[#F1F5F9] text-base sm:text-[19px] tracking-[-0.4px] truncate">
              NAGA <span className="text-[#D4AF37]">Law</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-9 text-sm">
            {["Practice", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-[#94A3B8] hover:text-[#00E5FF] transition-colors tracking-[0.2px]"
              >
                {item}
              </a>
            ))}
          </div>

          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-[#D4AF37] text-[#050508] font-semibold rounded-xl text-xs sm:text-sm tracking-[0.3px] hover:bg-[#E8C84A] active:scale-[0.985] transition-all"
          >
            <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
            <span className="hidden xs:inline sm:inline">Consult</span>
            <span className="sm:hidden">Call</span>
          </a>
        </div>
      </nav>
    </header>
  );
}

/* ── Footer ── */
function Footer() {
  return (
    <footer className="border-t border-[rgba(212,175,55,0.08)] py-12 md:py-14 bg-[#050508]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10 mb-10 md:mb-12">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Scale className="w-5 h-5 text-[#D4AF37]" aria-hidden="true" />
              <span className="font-display-legal font-semibold text-[#F1F5F9] text-lg md:text-xl tracking-[-0.3px]">
                NAGA Law Chambers
              </span>
            </div>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              Advocate S. Nagendra Naik — focused representation in revenue,
              land, civil, criminal, and family matters before Andhra Pradesh
              courts and revenue authorities.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[1.8px] text-[#94A3B8]/70 mb-4 font-medium">
              Practice Areas
            </p>
            <ul className="space-y-2 text-sm text-[#94A3B8]">
              {[
                "Revenue & Land",
                "Civil & Contract / Partition",
                "Bail & Criminal",
                "Family & Consumer",
              ].map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[1.8px] text-[#94A3B8]/70 mb-4 font-medium">
              Contact
            </p>
            <address className="not-italic space-y-1.5 text-sm text-[#94A3B8]">
              <a
                href={PHONE_HREF}
                className="block hover:text-[#00E5FF] transition-colors"
              >
                {PHONE_DISPLAY}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="block hover:text-[#00E5FF] transition-colors"
              >
                {EMAIL}
              </a>
              <span className="block">{OFFICE}</span>
            </address>
          </div>
        </div>

        <div className="pt-6 md:pt-8 border-t border-[rgba(212,175,55,0.08)] flex flex-col md:flex-row justify-between items-center gap-y-3 text-xs text-[#94A3B8]/60 text-center md:text-left">
          <p>
            © {COPYRIGHT_YEAR} NAGA Law Chambers. All rights reserved. Advocate
            S. Nagendra Naik.
          </p>
          <p>Bar Council of Andhra Pradesh • Enrolled 2019</p>
        </div>
      </div>
    </footer>
  );
}

/* ── Main page ── */
export default function NagaLawChambers() {
  const [openPractice, setOpenPractice] = useState<number | null>(0);

  const practiceAreas: PracticeArea[] = [
    {
      icon: Landmark,
      title: "Revenue & Land",
      courts: "Tahsildar, RDO, AP High Court",
      summary:
        "ROR corrections, mutations, patta disputes, and land acquisition matters before revenue authorities and appellate forums.",
      details:
        "Representation before Tahsildar, RDO, and Collector on revenue records, encumbrance disputes, and administrative appeals. High Court writs and revisions for land title and government acquisition challenges across Anantapur district.",
    },
    {
      icon: FileText,
      title: "Civil & Contract / Partition",
      courts: "District Court, AP High Court",
      summary:
        "Property partition, title disputes, specific performance, and contractual enforcement in civil courts.",
      details:
        "Filing and defending partition suits, injunctions, declaration of title, and boundary conflicts. Contract breach, recovery suits, and declaratory relief before District Courts with appellate representation in the Andhra Pradesh High Court.",
    },
    {
      icon: Scale,
      title: "Bail & Criminal",
      courts: "Sessions & Magistrate Courts",
      summary:
        "Bail applications, anticipatory bail, quashing petitions, and criminal defence with urgent filing support.",
      details:
        "Regular and anticipatory bail in Sessions and Magistrate courts. Quashing under Section 482 CrPC, trial defence, and procedural remedies with direct advocate communication on custody and hearing dates.",
    },
    {
      icon: Users,
      title: "Family & Consumer",
      courts: "Family Court, Consumer Forum",
      summary:
        "Divorce, maintenance, custody, consumer complaints, and cheque bounce matters with clear case assessment.",
      details:
        "Mutual and contested divorce, maintenance and custody proceedings, domestic violence remedies, and consumer forum complaints. Negotiable Instruments Act matters including Section 138 cheque bounce cases.",
    },
  ];

  return (
    <>
      <JsonLd />

      <main className="min-h-screen bg-[#050508] text-[#F1F5F9] selection:bg-[#D4AF37] selection:text-[#050508]">
        <Navbar />

        {/* HERO */}
        <section
          aria-labelledby="hero-heading"
          className="relative min-h-[100dvh] flex items-center overflow-hidden pt-16"
        >
          <ParticleField />
          <div
            className="absolute inset-0 bg-[radial-gradient(#00E5FF_0.5px,transparent_1px)] bg-[length:6px_6px] opacity-[0.04]"
            aria-hidden="true"
          />
          <div className="scanline-overlay" aria-hidden="true" />

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-20 grid lg:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-10 lg:gap-y-12 items-center w-full">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65 }}
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[rgba(0,229,255,0.2)] bg-[rgba(0,229,255,0.05)] mb-6 md:mb-7 text-[10px] sm:text-xs tracking-[1.2px] text-[#00E5FF]"
              >
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                BAR COUNCIL OF ANDHRA PRADESH • 2019
              </motion.div>

              <h1
                id="hero-heading"
                className="text-[40px] sm:text-[52px] md:text-[64px] lg:text-[68px] leading-[0.98] font-display-legal font-semibold tracking-[-2px] md:tracking-[-2.6px] mb-6 md:mb-7"
              >
                Defending
                <br />
                Land, Legacy
                <br />
                <span className="gold-gradient-text">&amp; Rights</span>
              </h1>

              <p className="max-w-md text-base md:text-[17px] text-[#94A3B8] tracking-[-0.2px] leading-relaxed mb-8 md:mb-9">
                Advocate S. Nagendra Naik practises in Anantapur since 2011,
                representing clients in revenue, civil, criminal, and family
                matters before district courts and Andhra Pradesh authorities.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a
                  href="#contact"
                  className="inline-flex justify-center items-center gap-3 px-7 sm:px-8 py-4 bg-[#D4AF37] text-[#050508] font-semibold rounded-2xl text-[15px] tracking-[0.4px] hover:bg-[#E8C84A] active:scale-[0.985] transition-all"
                >
                  Book Consultation
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href="#practice"
                  className="inline-flex justify-center items-center gap-3 px-7 sm:px-8 py-4 border border-[rgba(0,229,255,0.25)] hover:bg-[rgba(0,229,255,0.05)] rounded-2xl text-[15px] tracking-[0.4px] transition-all"
                >
                  Practice Areas
                </a>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative lg:pl-8"
            >
              <div className="relative aspect-[4/3.2] max-w-[460px] mx-auto lg:mx-0 rounded-3xl overflow-hidden border border-[rgba(212,175,55,0.22)] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)] hud-image-frame">
                <Image
                  src="/advocate.jpg"
                  alt="Advocate S. Nagendra Naik, NAGA Law Chambers, Anantapur"
                  fill
                  sizes="(max-width: 1024px) 90vw, 460px"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/55 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <p className="text-[10px] sm:text-xs tracking-[2px] text-[#00E5FF]/90 mb-1">
                    ADVOCATE
                  </p>
                  <p className="text-2xl sm:text-3xl font-display-legal tracking-[-0.8px]">
                    S. Nagendra Naik
                  </p>
                  <p className="text-sm text-[#94A3B8] mt-1">
                    Anantapur • Practising since 2011
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#94A3B8]/40"
            aria-hidden="true"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </section>

        {/* STATS */}
        <Section
          className="py-14 md:py-16 border-y border-[rgba(212,175,55,0.08)] bg-[#050508] scanline-overlay-subtle"
          id="stats"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-8 md:gap-y-10">
              <Stat value="2011" label="Practising Since" icon={Clock} />
              <Stat value="2019" label="Bar Council Enrolled" icon={BookOpen} />
              <Stat value="500+" label="Matters Handled" icon={Gavel} />
              <Stat value="AP" label="Courts & Forums" icon={Landmark} />
            </div>
          </div>
        </Section>

        {/* PRACTICE AREAS */}
        <Section className="py-16 md:py-20 relative" id="practice">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <SectionHeading
              eyebrow="AREAS OF FOCUS"
              title="Practice Areas"
              subtitle="Precise representation before the courts and authorities that decide your matter."
            />

            <motion.div layout className="grid md:grid-cols-2 gap-4 md:gap-5">
              {practiceAreas.map((area, idx) => (
                <ExpandablePracticeCard
                  key={area.title}
                  area={area}
                  isOpen={openPractice === idx}
                  onToggle={() =>
                    setOpenPractice((prev) => (prev === idx ? null : idx))
                  }
                />
              ))}
            </motion.div>
          </div>
        </Section>

        {/* ADVOCATE PROFILE */}
        <Section
          className="py-16 md:py-20 border-t border-[rgba(212,175,55,0.08)] bg-[#050508]"
          id="about"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <SectionHeading
              eyebrow="ADVOCATE PROFILE"
              title="S. Nagendra Naik"
              subtitle="Direct advocacy grounded in Anantapur courts, revenue offices, and local procedure."
            />

            <div className="grid lg:grid-cols-[minmax(0,340px)_1fr] gap-10 lg:gap-14 items-start">
              <motion.div
                variants={staggerItem}
                className="relative aspect-[3/4] max-w-[340px] mx-auto lg:mx-0 w-full rounded-2xl overflow-hidden border border-[rgba(212,175,55,0.2)] shadow-xl"
              >
                <Image
                  src="/advocate.jpg"
                  alt="Advocate S. Nagendra Naik — professional portrait"
                  fill
                  sizes="(max-width: 1024px) 80vw, 340px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/80 via-transparent to-transparent" />
              </motion.div>

              <div className="space-y-6">
                <motion.p
                  variants={staggerItem}
                  className="text-[15px] md:text-[16px] text-[#94A3B8] leading-relaxed"
                >
                  Advocate S. Nagendra Naik has practised in Anantapur district
                  since 2011, building deep familiarity with revenue records,
                  district court procedure, and the forums where land and
                  property disputes are decided. He was enrolled with the Bar
                  Council of Andhra Pradesh in 2019 and appears regularly before
                  Tahsildar, RDO, District Courts, and the Andhra Pradesh High
                  Court.
                </motion.p>

                <motion.p
                  variants={staggerItem}
                  className="text-[15px] md:text-[16px] text-[#94A3B8] leading-relaxed"
                >
                  Clients receive direct communication with the advocate — clear
                  case assessment, transparent fee discussion, and timely
                  updates on filings, hearings, and compliance steps. The
                  practice prioritises thorough preparation on revenue and title
                  documents before court or administrative proceedings.
                </motion.p>

                <motion.ul
                  variants={staggerItem}
                  className="grid sm:grid-cols-2 gap-3"
                >
                  {[
                    "Bar Council of Andhra Pradesh — 2019",
                    "Anantapur District Court practice",
                    "Revenue & land record expertise",
                    "Urgent bail and interim relief",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-[#F1F5F9] bg-[rgba(15,23,42,0.5)] border border-[rgba(212,175,55,0.12)] rounded-xl px-4 py-3"
                    >
                      <ShieldCheck
                        className="w-4 h-4 text-[#D4AF37] mt-0.5 shrink-0"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </motion.ul>
              </div>
            </div>
          </div>
        </Section>

        {/* CONTACT */}
        <Section className="py-16 md:py-20" id="contact">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <SectionHeading
              eyebrow="NEXT STEP"
              title="Book a Consultation"
              subtitle="Discuss your matter directly with Advocate S. Nagendra Naik."
            />

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
              <ContactCard
                icon={Phone}
                label="Phone"
                value={PHONE_DISPLAY}
                href={PHONE_HREF}
              />
              <ContactCard
                icon={Mail}
                label="Email"
                value={EMAIL}
                href={`mailto:${EMAIL}`}
              />
              <ContactCard icon={MapPin} label="Office" value={OFFICE} />
            </div>

            <motion.div variants={staggerItem} className="mt-8 text-center">
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[rgba(0,229,255,0.08)] border border-[rgba(0,229,255,0.22)] text-[#00E5FF] rounded-xl text-sm font-medium hover:bg-[rgba(0,229,255,0.12)] transition-colors"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                Call {PHONE_DISPLAY}
              </a>
            </motion.div>
          </div>
        </Section>

        <Footer />
      </main>
    </>
  );
}