"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  ChevronDown,
  CircleDot,
  Landmark,
  Mail,
  MapPin,
  Menu,
  Phone,
  Scale,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import {
  practiceAreas as contentPracticeAreas,
  stats,
  courtMatrix,
  processSteps,
  navLinks,
} from "@/lib/content";
import { getPracticeAreaIcon } from "@/lib/icons";
import { site, phoneHref, emailHref, mapHref } from "@/lib/site";

/* ============================================
   Constants
   ============================================ */

const PHONE_DISPLAY = site.contact.phoneDisplay;
const PHONE_HREF = phoneHref;
const EMAIL = site.contact.email;
const EMAIL_HREF = emailHref;
const MAP_HREF = mapHref;

const easing = [0.22, 1, 0.36, 1] as const;



const practiceAreas = contentPracticeAreas.map((area) => ({
  id: area.id,
  icon: getPracticeAreaIcon(area.icon),
  title: area.title,
  courts: area.courts,
  summary: area.summary,
  detail: area.details,
  hoverDetail: area.hoverDetail,
}));

/* ============================================
   Reveal Animation Wrapper
   ============================================ */

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 44 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.0, delay, ease: easing }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ============================================
   Button Component
   ============================================ */

function EditorialButton({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.35, ease: easing }}
      className={`naga-button ${variant === "primary" ? "naga-button-primary" : "naga-button-secondary"} ${className}`}
    >
      <span>{children}</span>
      <span className="naga-button-orb" aria-hidden="true">
        <ArrowRight className="h-4 w-4" />
      </span>
    </motion.a>
  );
}

/* ============================================
   Navbar
   ============================================ */

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4">
      <nav
        className="naga-glass-nav mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-6"
        aria-label="Primary"
      >
        <a
          href="#top"
          className="flex min-w-0 items-center gap-3"
          aria-label="NAGA Law Chambers home"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[rgb(212_175_55_/_0.15)] bg-[rgb(212_175_55_/_0.06)]">
            <Scale
              className="h-4.5 w-4.5 text-[var(--naga-gold)]"
              aria-hidden="true"
            />
          </span>
          <span className="truncate text-xs font-medium tracking-[0.2em] uppercase text-[var(--naga-ivory)]">
            NAGA LAW
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((item) => (
            <a key={item.href} href={item.href} className="naga-nav-link">
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={PHONE_HREF}
            className="hidden rounded-full border border-[rgb(212_175_55_/_0.3)] bg-[rgb(212_175_55_/_0.08)] px-5 py-2 text-xs font-medium tracking-[0.1em] uppercase text-[var(--naga-gold)] transition-all duration-300 hover:bg-[rgb(212_175_55_/_0.14)] hover:-translate-y-0.5 sm:inline-flex"
          >
            Consult
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-[rgb(255_255_255_/_0.08)] text-[var(--naga-linen)] md:hidden"
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            {open ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            role="dialog"
            aria-label="Navigation menu"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: easing }}
            className="naga-mobile-panel mx-auto mt-3 max-w-6xl rounded-2xl p-4 md:hidden"
          >
            {navLinks.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.06,
                  duration: 0.35,
                  ease: easing,
                }}
                className="block rounded-xl px-4 py-3 text-sm text-[var(--naga-linen)]"
              >
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

/* ============================================
   Hero Section
   ============================================ */

function Hero() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const portraitY = useTransform(scrollYProgress, [0, 0.32], [0, reduce ? 0 : 60]);
  const titleX = useTransform(scrollYProgress, [0, 0.26], [0, reduce ? 0 : -20]);

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100dvh] items-center overflow-hidden px-4 pb-24 pt-28 sm:pt-32"
    >
      {/* Subtle ambient glows */}
      <div
        className="naga-ambient absolute top-[10%] right-[5%] h-[22rem] w-[22rem] naga-ambient-sapphire"
        aria-hidden="true"
      />
      <div
        className="naga-ambient absolute bottom-[15%] left-[3%] h-[18rem] w-[18rem] naga-ambient-gold"
        aria-hidden="true"
      />

      <div className="naga-container relative z-10 grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        {/* Text Column */}
        <motion.div style={{ x: titleX }} className="max-w-3xl">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: easing }}
            className="naga-eyebrow mb-8 inline-flex items-center gap-2"
          >
            <BadgeCheck className="h-3 w-3" aria-hidden="true" />
            Bar Council of Andhra Pradesh • Anantapur Bar Association
          </motion.div>

          <h1 className="naga-hero-title max-w-4xl text-balance">
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={reduce ? false : { y: "110%", rotateX: -18 }}
                animate={{ y: 0, rotateX: 0 }}
                transition={{ duration: 1.1, delay: 0.1, ease: easing }}
              >
                Defending land,
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="naga-gradient-text block"
                initial={reduce ? false : { y: "110%", rotateX: -18 }}
                animate={{ y: 0, rotateX: 0 }}
                transition={{ duration: 1.1, delay: 0.24, ease: easing }}
              >
                legacy & rights.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.4, ease: easing }}
            className="mt-9 max-w-2xl text-base leading-[1.85] text-[var(--naga-linen)]"
          >
            Advocate S. Nagendra Naik provides direct, prepared representation
            in revenue & land matters before Tahsildar, RDO, and Collector
            offices, alongside civil, criminal, family, and consumer proceedings
            across Anantapur and Dharmavaram courts.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.52, ease: easing }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <EditorialButton href="#contact">
              Book consultation
            </EditorialButton>
            <EditorialButton href={PHONE_HREF} variant="secondary">
              {PHONE_DISPLAY}
            </EditorialButton>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.64, ease: easing }}
            className="mt-14 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {stats.map((metric) => (
              <div key={metric.label} className="naga-mini-stat">
                <p className="text-xl font-semibold text-[var(--naga-ivory)]">
                  {metric.value}
                </p>
                <p className="mt-1.5 text-[10px] font-medium tracking-[0.15em] uppercase text-[var(--naga-muted)]">
                  {metric.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Profile Photo Column */}
        <Reveal className="relative mx-auto w-full max-w-[520px] lg:mr-0" delay={0.25}>
          <motion.div style={{ y: portraitY }} className="naga-profile-frame">
            <div className="naga-profile-inner aspect-[4/5]">
              <Image
                src="/advocate.jpg"
                alt="Advocate S. Nagendra Naik — NAGA Law Chambers, Anantapur Bar Association"
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 520px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--naga-dark)] via-[rgb(9_13_22_/_0.3)] to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="naga-sub-header text-[var(--naga-gold)]">
                  Advocate
                </p>
                <p className="mt-2 font-[var(--font-display)] text-2xl font-semibold tracking-[-0.02em] text-[var(--naga-ivory)] sm:text-3xl">
                  S. Nagendra Naik
                </p>
                <p className="mt-2 text-xs text-[rgb(255_255_255_/_0.6)] font-light">
                  B.A., LL.B. • Anantapur Bar • Direct consultation
                </p>
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================
   Section Title Component
   ============================================ */

function SectionTitle({
  kicker,
  title,
  body,
}: {
  kicker: string;
  title: string;
  body: string;
}) {
  return (
    <Reveal className="mx-auto mb-14 max-w-3xl text-center">
      <p className="naga-eyebrow mx-auto mb-6 inline-flex">{kicker}</p>
      <h2 className="naga-section-title text-balance">{title}</h2>
      <p className="mx-auto mt-6 max-w-2xl text-base leading-[1.85] text-[var(--naga-linen)]">
        {body}
      </p>
    </Reveal>
  );
}

/* ============================================
   Practice Area Cards
   ============================================ */

function PracticeCard({
  area,
  open,
  onToggle,
  index,
}: {
  area: (typeof practiceAreas)[number];
  open: boolean;
  onToggle: () => void;
  index: number;
}) {
  const Icon = area.icon;
  const reduce = useReducedMotion();

  return (
    <motion.article
      layout
      initial={reduce ? false : { opacity: 0, y: 44 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.9,
        delay: index * 0.08,
        ease: easing,
        layout: { duration: 0.4, ease: easing },
      }}
      className={`naga-card ${open ? "naga-card-open" : ""}`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`${area.id}-panel`}
        className="flex w-full items-start gap-5 p-6 text-left sm:p-7"
      >
        <span className="naga-icon-shell">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-start justify-between gap-4">
            <span>
              <span className="block text-lg font-semibold tracking-[-0.01em] text-[var(--naga-ivory)]">
                {area.title}
              </span>
              <span className="mt-1.5 block text-xs font-medium tracking-[0.1em] uppercase text-[var(--naga-sapphire-light)]">
                {area.courts}
              </span>
            </span>
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.35, ease: easing }}
              className="mt-1 text-[var(--naga-gold)]"
            >
              <ChevronDown className="h-4 w-4" />
            </motion.span>
          </span>
          <span className="mt-3 block text-sm leading-[1.75] text-[var(--naga-linen)]">
            {area.summary}
          </span>
          {/* Hover detail reveal */}
          <span className="naga-hover-detail block text-xs tracking-[0.05em] text-[var(--naga-gold)] font-medium italic">
            {area.hoverDetail}
          </span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={`${area.id}-panel`}
            layout
            initial={reduce ? { opacity: 1 } : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: easing }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-7 sm:px-7">
              <div className="ml-0 border-t border-[var(--naga-line)] pt-5 text-sm leading-[1.85] text-[var(--naga-linen)] sm:ml-[64px]">
                {area.detail}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.article>
  );
}

function PracticeSection() {
  const [openId, setOpenId] = useState<string>(practiceAreas[0].id);

  return (
    <section id="practice" className="naga-section relative">
      <div className="naga-container">
        <SectionTitle
          kicker="Practice areas"
          title="Serious legal work across Anantapur and Dharmavaram forums."
          body="Revenue & land disputes before Tahsildar, RDO, and Collector. Civil, criminal bail, family partition, and consumer forum representation with clear strategy and direct advocate communication."
        />
        <div className="grid gap-5 lg:grid-cols-2">
          {practiceAreas.map((area, index) => (
            <PracticeCard
              key={area.id}
              area={area}
              index={index}
              open={openId === area.id}
              onToggle={() =>
                setOpenId((current) => (current === area.id ? "" : area.id))
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   Advocate Profile Section
   ============================================ */

function AdvocateSection() {
  return (
    <section id="advocate" className="naga-section relative">
      <div className="naga-container grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal>
          <div className="naga-profile-frame">
            <div className="naga-profile-inner aspect-[3/4]">
              <Image
                src="/advocate.jpg"
                alt="Advocate S. Nagendra Naik — Anantapur Bar, Andhra Pradesh"
                fill
                sizes="(max-width: 1024px) 92vw, 440px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--naga-dark)] via-transparent to-transparent" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="naga-eyebrow mb-6 inline-flex">Advocate profile</p>
          <h2 className="naga-section-title text-balance">
            Adv. S. Nagendra Naik
          </h2>
          <p className="mt-7 text-base leading-[1.85] text-[var(--naga-linen)]">
            A practice rooted in Anantapur courts, revenue offices, and Andhra
            Pradesh procedure since 2011. Enrolled with the Bar Council of
            Andhra Pradesh in 2019. Clients work directly with the advocate from
            first assessment through filing, hearing, and compliance — with
            thorough preparation on revenue records, title documents, and
            procedural filings before every court or administrative proceeding.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              "B.A., LL.B.",
              "Bar Council of Andhra Pradesh",
              "Revenue & land record disputes — Tahsildar, RDO",
              "Civil, criminal, family & consumer matters",
            ].map((item) => (
              <div key={item} className="naga-proof-row">
                <CircleDot
                  className="h-3.5 w-3.5 shrink-0 mt-0.5 text-[var(--naga-gold)]"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================
   Courts & Process Section
   ============================================ */

function CourtsSection() {
  return (
    <section id="courts" className="naga-section relative">
      <div className="naga-container">
        <SectionTitle
          kicker="Courts & process"
          title="Built for the forums where your case is actually decided."
          body="Covering revenue authorities across Anantapur and Dharmavaram, civil courts, criminal courts, family forums, consumer commissions, and AP High Court proceedings."
        />

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="naga-card h-full p-6 sm:p-8">
              <div className="mb-7 flex items-center gap-3">
                <span className="naga-icon-shell">
                  <Landmark className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-xl font-semibold tracking-[-0.02em] text-[var(--naga-ivory)]">
                  Forum coverage
                </h3>
              </div>
              <div className="grid gap-3">
                {courtMatrix.map((court) => (
                  <div key={court} className="naga-proof-row">
                    <BadgeCheck
                      className="h-3.5 w-3.5 shrink-0 mt-0.5 text-[var(--naga-gold)]"
                      aria-hidden="true"
                    />
                    <span>{court}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {processSteps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.06}>
                <div className="naga-card h-full p-6">
                  <p className="mb-3 text-xs font-semibold tracking-[0.15em] text-[var(--naga-sapphire-light)]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-lg font-semibold tracking-[-0.01em] text-[var(--naga-ivory)]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-[1.8] text-[var(--naga-linen)]">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   Contact / Book Consultation Section
   ============================================ */

function ContactSection() {
  return (
    <section id="contact" className="naga-section relative pb-20">
      <div className="naga-container">
        <Reveal>
          <div className="naga-contact-panel overflow-hidden rounded-2xl p-6 sm:p-8 lg:p-10">
            <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <p className="naga-eyebrow mb-6 inline-flex">
                  Book consultation
                </p>
                <h2 className="naga-section-title text-balance">
                  Discuss documents, forum strategy & next steps.
                </h2>
                <p className="mt-7 max-w-2xl text-base leading-[1.85] text-[var(--naga-linen)]">
                  Share the facts directly with Adv. S. Nagendra Naik.
                  Get a clear assessment of court route, document gaps,
                  urgency, and expected next steps for Tahsildar appeals,
                  RDO proceedings, Adangal corrections, mutations, and
                  AP High Court writs.
                </p>
                <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                  <EditorialButton href={PHONE_HREF}>
                    Call {PHONE_DISPLAY}
                  </EditorialButton>
                  <EditorialButton href={EMAIL_HREF} variant="secondary">
                    Email chamber
                  </EditorialButton>
                </div>
              </div>

              <div className="grid gap-4">
                {[
                  {
                    icon: Phone,
                    label: "Phone",
                    value: PHONE_DISPLAY,
                    href: PHONE_HREF,
                  },
                  {
                    icon: Mail,
                    label: "Email",
                    value: EMAIL,
                    href: EMAIL_HREF,
                  },
                  {
                    icon: MapPin,
                    label: "Office",
                    value: site.contact.office,
                    href: MAP_HREF,
                    external: true,
                  },
                ].map((item) => {
                  const ContactIcon = item.icon as LucideIcon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      {...((item as { external?: boolean }).external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="naga-contact-row"
                    >
                      <span className="naga-icon-shell">
                        <ContactIcon
                          className="h-4.5 w-4.5"
                          aria-hidden="true"
                        />
                      </span>
                      <span>
                        <span className="block text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--naga-muted)]">
                          {item.label}
                        </span>
                        <span className="mt-1 block text-sm leading-6 text-[var(--naga-ivory)]">
                          {item.value}
                        </span>
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================
   Footer
   ============================================ */

function Footer() {
  return (
    <footer className="px-4 pb-10 pt-6">
      <div className="naga-container">
        <div className="naga-divider mb-8" />
        <div className="flex flex-col gap-6 text-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--naga-ivory)]">
              NAGA Law Chambers
            </p>
            <p className="mt-2 text-[var(--naga-muted)] font-light">
              Advocate S. Nagendra Naik • Anantapur, Andhra Pradesh
            </p>
          </div>
          <div className="flex flex-col gap-2 md:items-end">
            <a
              href={PHONE_HREF}
              className="text-[var(--naga-ivory)] transition-colors duration-300 hover:text-[var(--naga-gold)]"
            >
              {PHONE_DISPLAY}
            </a>
            <p className="text-[var(--naga-muted)] font-light">
              Revenue, civil, criminal, family & consumer representation.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ============================================
   Page Composition
   ============================================ */

export default function HomePage() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const backgroundOpacity = useTransform(
    scrollYProgress,
    [0, 0.65, 1],
    [0.95, 0.7, 0.5]
  );

  return (
    <main className="naga-page-bg relative min-h-[100dvh] overflow-x-hidden">
      {/* Fixed background gradient layer */}
      <motion.div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{ opacity: backgroundOpacity }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgb(30_58_138_/_0.06),transparent_40%),radial-gradient(ellipse_at_85%_20%,rgb(212_175_55_/_0.04),transparent_35%),linear-gradient(180deg,#090d16_0%,#0c1120_48%,#090d16_100%)]" />
      </motion.div>

      {/* Micro-grid texture overlay */}
      <div className="naga-grid-texture" aria-hidden="true" />

      <Navbar />
      <Hero />
      <PracticeSection />
      <AdvocateSection />
      <CourtsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
