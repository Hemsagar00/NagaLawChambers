"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
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
import { useMemo, useState } from "react";

import { practiceAreas as contentPracticeAreas, stats } from "@/lib/content";
import { getPracticeAreaIcon } from "@/lib/icons";

const PHONE_DISPLAY = "+91 94400 00417";
const PHONE_HREF = "tel:+919440000417";
const EMAIL = "contact@nagalawchambers.com";
const EMAIL_HREF = `mailto:${EMAIL}`;
const MAP_HREF =
  "https://www.google.com/maps/search/?api=1&query=District+Court+Premises,+Anantapur,+Andhra+Pradesh+515001";

const easing = [0.22, 1, 0.36, 1] as const;

const navItems = [
  { label: "Practice", href: "#practice" },
  { label: "Advocate", href: "#advocate" },
  { label: "Courts", href: "#courts" },
  { label: "Contact", href: "#contact" },
] as const;

const practiceAreas = contentPracticeAreas.map((area) => ({
  id: area.id,
  icon: getPracticeAreaIcon(area.icon),
  title: area.title,
  courts: area.courts,
  summary: area.summary,
  detail: area.details,
}));



const courtMatrix = [
  "Tahsildar and MRO offices",
  "RDO and Joint Collector proceedings",
  "District Court, Anantapur",
  "Family Court and Consumer Commissions",
  "Sessions and Magistrate Courts",
  "Andhra Pradesh High Court, Amaravati",
] as const;

const processSteps = [
  {
    title: "Document audit",
    body: "Sale deeds, pattadar records, notices, pleadings, orders, and prior case papers are checked before advice is given.",
  },
  {
    title: "Forum strategy",
    body: "The correct court or authority is selected early so time is not lost in the wrong procedural route.",
  },
  {
    title: "Drafting and filing",
    body: "Petitions, counters, affidavits, appeals, and notices are prepared with the facts arranged for hearing clarity.",
  },
  {
    title: "Hearing guidance",
    body: "Clients receive direct updates on hearing dates, compliance, likely next steps, and realistic risk.",
  },
] as const;

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function HudParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 38 }, (_, index) => {
        const a = seededRandom(index + 11);
        const b = seededRandom(index + 29);
        const c = seededRandom(index + 47);
        const d = seededRandom(index + 71);
        return {
          id: index,
          left: `${(a * 100).toFixed(4)}%`,
          top: `${(b * 100).toFixed(4)}%`,
          size: `${(1.5 + c * 3).toFixed(3)}px`,
          duration: 5 + d * 7,
          delay: b * 3,
          cyan: index % 3 === 0,
        };
      }),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="kiwi-hud-orbit absolute left-1/2 top-[46%] h-[min(74vw,620px)] w-[min(74vw,620px)] -translate-x-1/2 -translate-y-1/2 rounded-full" />
      <div className="kiwi-hud-orbit kiwi-hud-orbit-delay absolute left-1/2 top-[46%] h-[min(50vw,420px)] w-[min(50vw,420px)] -translate-x-1/2 -translate-y-1/2 rounded-full" />
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className={particle.cyan ? "kiwi-particle kiwi-particle-cyan" : "kiwi-particle kiwi-particle-gold"}
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -22, 0],
            opacity: [0.18, 0.72, 0.18],
            scale: particle.cyan ? [1, 1.5, 1] : [1, 1.18, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: easing,
          }}
        />
      ))}
    </div>
  );
}

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
      initial={reduce ? false : { opacity: 0, y: 42, filter: "blur(10px)" }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.24 }}
      transition={{ duration: 0.82, delay, ease: easing }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function MagneticLink({
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
      transition={{ duration: 0.28, ease: easing }}
      className={`kiwi-button ${variant === "primary" ? "kiwi-button-primary" : "kiwi-button-secondary"} ${className}`}
    >
      <span>{children}</span>
      <span className="kiwi-button-orb" aria-hidden="true">
        <ArrowRight className="h-4 w-4" />
      </span>
    </motion.a>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4">
      <nav className="kiwi-glass-nav mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-5" aria-label="Primary">
        <a href="#top" className="flex min-w-0 items-center gap-3" aria-label="NAGA Law Chambers home">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-[rgb(212_175_55_/_0.24)] bg-[rgb(212_175_55_/_0.1)]">
            <Scale className="h-5 w-5 text-[var(--kiwi-gold)]" aria-hidden="true" />
          </span>
          <span className="truncate text-sm font-semibold tracking-[0.16em] text-white sm:text-base">
            NAGA LAW
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="kiwi-nav-link">
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a href={PHONE_HREF} className="hidden rounded-full bg-[var(--kiwi-gold)] px-5 py-2.5 text-sm font-semibold text-[var(--kiwi-dark)] transition-transform duration-300 hover:-translate-y-0.5 sm:inline-flex">
            Consult
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="grid h-11 w-11 place-items-center rounded-full border border-[rgb(255_255_255_/_0.12)] text-white md:hidden"
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.26, ease: easing }}
            className="kiwi-mobile-panel mx-auto mt-3 max-w-6xl rounded-[28px] p-4 md:hidden"
          >
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.045, duration: 0.32, ease: easing }}
                className="block rounded-2xl px-4 py-3 text-base text-[var(--kiwi-text)]"
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

function Hero() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const portraitY = useTransform(scrollYProgress, [0, 0.32], [0, reduce ? 0 : 78]);
  const portraitScale = useTransform(scrollYProgress, [0, 0.32], [1, reduce ? 1 : 1.08]);
  const titleX = useTransform(scrollYProgress, [0, 0.26], [0, reduce ? 0 : -28]);

  return (
    <section id="top" className="relative isolate flex min-h-[100dvh] items-center overflow-hidden px-4 pb-20 pt-28 sm:pt-32">
      <HudParticles />
      <div className="kiwi-ambient kiwi-ambient-cyan" aria-hidden="true" />
      <div className="kiwi-ambient kiwi-ambient-gold" aria-hidden="true" />

      <div className="kiwi-container relative z-10 grid items-center gap-12 lg:grid-cols-[1.04fr_0.96fr] lg:gap-16">
        <motion.div style={{ x: titleX }} className="max-w-3xl">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, ease: easing }}
            className="kiwi-eyebrow mb-7 inline-flex items-center gap-2"
          >
            <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Bar Council of Andhra Pradesh | Advocate-first representation
          </motion.div>

          <h1 className="kiwi-hero-title max-w-4xl text-balance">
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={reduce ? false : { y: "115%", rotateX: -18 }}
                animate={{ y: 0, rotateX: 0 }}
                transition={{ duration: 0.9, delay: 0.08, ease: easing }}
              >
                Defending land,
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="kiwi-gradient-text block"
                initial={reduce ? false : { y: "115%", rotateX: -18 }}
                animate={{ y: 0, rotateX: 0 }}
                transition={{ duration: 0.9, delay: 0.2, ease: easing }}
              >
                liberty and legacy.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.78, delay: 0.34, ease: easing }}
            className="mt-8 max-w-2xl text-base leading-8 text-[var(--kiwi-muted)] sm:text-lg"
          >
            Adv. S. Nagendra Naik provides direct, prepared, and court-aware representation in revenue, land, civil, criminal, family, and consumer matters across Andhra Pradesh.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.78, delay: 0.46, ease: easing }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <MagneticLink href="#contact">Book consultation</MagneticLink>
            <MagneticLink href={PHONE_HREF} variant="secondary">
              {PHONE_DISPLAY}
            </MagneticLink>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.78, delay: 0.58, ease: easing }}
            className="mt-12 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {stats.map((metric) => (
              <div key={metric.label} className="kiwi-mini-stat">
                <p className="text-2xl font-semibold text-white">{metric.value}</p>
                <p className="mt-1 text-[11px] leading-4 text-[var(--kiwi-muted)]">{metric.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <Reveal className="relative mx-auto w-full max-w-[560px] lg:mr-0" delay={0.2}>
          <motion.div style={{ y: portraitY }} className="kiwi-profile-frame p-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px]">
              <motion.div style={{ scale: portraitScale }} className="absolute inset-0">
                <Image
                  src="/advocate.jpg"
                  alt="Advocate S. Nagendra Naik portrait"
                  fill
                  priority
                  sizes="(max-width: 1024px) 92vw, 560px"
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--kiwi-dark)] via-[rgb(5_5_8_/_0.34)] to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--kiwi-cyan)]">
                  Advocate
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                  S. Nagendra Naik
                </p>
                <p className="mt-2 text-sm text-[rgb(255_255_255_/_0.72)]">
                  B.A., LL.B. | Anantapur Bar | Direct consultation
                </p>
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

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
    <Reveal className="mx-auto mb-12 max-w-3xl text-center">
      <p className="kiwi-eyebrow mx-auto mb-5 inline-flex">{kicker}</p>
      <h2 className="kiwi-section-title text-balance">{title}</h2>
      <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[var(--kiwi-muted)]">{body}</p>
    </Reveal>
  );
}

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
      initial={reduce ? false : { opacity: 0, y: 44, filter: "blur(8px)" }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: easing, layout: { duration: 0.36, ease: easing } }}
      className={`kiwi-card ${open ? "kiwi-card-open" : ""}`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`${area.id}-panel`}
        className="flex w-full items-start gap-5 p-6 text-left sm:p-7"
      >
        <span className="kiwi-icon-shell">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-start justify-between gap-4">
            <span>
              <span className="block text-xl font-semibold tracking-[-0.02em] text-white">{area.title}</span>
              <span className="mt-2 block text-sm leading-6 text-[var(--kiwi-cyan)]">{area.courts}</span>
            </span>
            <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.28, ease: easing }} className="mt-1 text-[var(--kiwi-cyan)]">
              <ChevronDown className="h-5 w-5" />
            </motion.span>
          </span>
          <span className="mt-4 block text-[15px] leading-7 text-[var(--kiwi-muted)]">{area.summary}</span>
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
            transition={{ duration: 0.34, ease: easing }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-7 sm:px-7">
              <div className="ml-0 border-t border-[rgb(255_255_255_/_0.08)] pt-5 text-[15px] leading-7 text-[rgb(232_238_244_/_0.76)] sm:ml-[68px]">
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
    <section id="practice" className="kiwi-section relative">
      <div className="kiwi-container">
        <SectionTitle
          kicker="Practice areas"
          title="Serious legal work, organised by forum and urgency."
          body="Each matter is handled with a clear forum strategy, verified documents, and direct communication from the advocate."
        />
        <div className="grid gap-5 lg:grid-cols-2">
          {practiceAreas.map((area, index) => (
            <PracticeCard
              key={area.id}
              area={area}
              index={index}
              open={openId === area.id}
              onToggle={() => setOpenId((current) => (current === area.id ? "" : area.id))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function AdvocateSection() {
  return (
    <section id="advocate" className="kiwi-section relative">
      <div className="kiwi-container grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <div className="kiwi-profile-frame p-2">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[28px]">
              <Image
                src="/advocate.jpg"
                alt="Advocate S. Nagendra Naik profile portrait"
                fill
                sizes="(max-width: 1024px) 92vw, 460px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--kiwi-dark)] via-transparent to-transparent" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="kiwi-eyebrow mb-5 inline-flex">Advocate profile</p>
          <h2 className="kiwi-section-title text-balance">Adv. S. Nagendra Naik</h2>
          <p className="mt-6 text-lg leading-9 text-[var(--kiwi-muted)]">
            A professional practice rooted in Anantapur courts, revenue offices, and Andhra Pradesh procedure. Clients work directly with the advocate from the first assessment through filing, hearing, and compliance.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              "B.A., LL.B.",
              "Bar Council of Andhra Pradesh",
              "Revenue and land record disputes",
              "Civil, criminal, family, and consumer matters",
            ].map((item) => (
              <div key={item} className="kiwi-proof-row">
                <CircleDot className="h-4 w-4 text-[var(--kiwi-cyan)]" aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CourtsSection() {
  return (
    <section id="courts" className="kiwi-section relative">
      <div className="kiwi-container">
        <SectionTitle
          kicker="Courts and process"
          title="Built for the forums where your case is actually decided."
          body="The practice covers revenue authorities, civil courts, criminal courts, family forums, consumer forums, and High Court proceedings."
        />

        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="kiwi-card h-full p-6 sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <span className="kiwi-icon-shell">
                  <Landmark className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white">Forum coverage</h3>
              </div>
              <div className="grid gap-3">
                {courtMatrix.map((court) => (
                  <div key={court} className="kiwi-proof-row">
                    <BadgeCheck className="h-4 w-4 text-[var(--kiwi-gold)]" aria-hidden="true" />
                    <span>{court}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {processSteps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.05}>
                <div className="kiwi-card h-full p-6">
                  <p className="mb-4 text-sm font-semibold text-[var(--kiwi-cyan)]">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="text-xl font-semibold tracking-[-0.02em] text-white">{step.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[var(--kiwi-muted)]">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="kiwi-section relative pb-16">
      <div className="kiwi-container">
        <Reveal>
          <div className="kiwi-contact-panel overflow-hidden rounded-[36px] p-6 sm:p-8 lg:p-10">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <p className="kiwi-eyebrow mb-5 inline-flex">Consultation</p>
                <h2 className="kiwi-section-title text-balance">Discuss the documents, forum, and next filing step.</h2>
                <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--kiwi-muted)]">
                  Share the facts directly with Adv. S. Nagendra Naik and get a clear assessment of court route, document gaps, urgency, and expected next steps.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <MagneticLink href={PHONE_HREF}>Call {PHONE_DISPLAY}</MagneticLink>
                  <MagneticLink href={EMAIL_HREF} variant="secondary">Email chamber</MagneticLink>
                </div>
              </div>

              <div className="grid gap-4">
                {[
                  { icon: Phone, label: "Phone", value: PHONE_DISPLAY, href: PHONE_HREF },
                  { icon: Mail, label: "Email", value: EMAIL, href: EMAIL_HREF },
                  {
                    icon: MapPin,
                    label: "Office",
                    value: "District Court Premises, Anantapur, Andhra Pradesh 515001",
                    href: MAP_HREF,
                  },
                ].map((item) => {
                  const Icon = item.icon as LucideIcon;
                  return (
                    <a key={item.label} href={item.href} className="kiwi-contact-row">
                      <span className="kiwi-icon-shell">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-[var(--kiwi-muted)]">{item.label}</span>
                        <span className="mt-1 block text-sm leading-6 text-white">{item.value}</span>
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

function Footer() {
  return (
    <footer className="border-t border-[rgb(255_255_255_/_0.08)] px-4 py-10">
      <div className="kiwi-container flex flex-col gap-6 text-sm text-[var(--kiwi-muted)] md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold tracking-[0.18em] text-white">NAGA LAW CHAMBERS</p>
          <p className="mt-2">Advocate S. Nagendra Naik | Anantapur, Andhra Pradesh</p>
        </div>
        <div className="flex flex-col gap-2 md:items-end">
          <a href={PHONE_HREF} className="text-white transition-colors hover:text-[var(--kiwi-cyan)]">
            {PHONE_DISPLAY}
          </a>
          <p>Revenue, civil, criminal, family, and consumer representation.</p>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -120]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.65, 1], [0.92, 0.62, 0.42]);

  return (
    <main className="kiwi-page relative min-h-[100dvh] overflow-x-hidden text-[var(--kiwi-text)]">
      <motion.div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{ y: backgroundY, opacity: backgroundOpacity }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgb(0_229_255_/_0.1),transparent_36%),radial-gradient(circle_at_85%_20%,rgb(212_175_55_/_0.12),transparent_32%),linear-gradient(180deg,#050508_0%,#070911_48%,#050508_100%)]" />
      </motion.div>
      <div className="kiwi-scanlines fixed inset-0 z-10 pointer-events-none" aria-hidden="true" />
      <div className="kiwi-noise fixed inset-0 z-10 pointer-events-none" aria-hidden="true" />

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
