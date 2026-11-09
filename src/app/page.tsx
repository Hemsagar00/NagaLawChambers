"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  BadgeCheck,
  ChevronDown,
  Clock,
  Landmark,
  Mail,
  MapPin,
  Menu,
  Phone,
  Scale,
  ShieldCheck,
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
import Link from "next/link";
import { buildWhatsappHref } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { IntakeForm } from "@/components/conversion/intake-form";
import { SiteFooter } from "@/components/layout/site-footer";
import { Testimonials } from "@/components/testimonials";
import { MapEmbed } from "@/components/map-embed";
import { practicePages } from "@/lib/local-seo";
import { CountUp } from "@/components/motion/count-up";
import { ForumRoute } from "@/components/motion/forum-route";
import { SurveyMap } from "@/components/map/survey-map";

const WHATSAPP_HREF = buildWhatsappHref();
const YEARS_EXPERIENCE = new Date().getFullYear() - site.advocate.practisingSince;

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
   Layout helpers
   ============================================ */

/** Plain wrapper kept for call sites; the page uses no scroll-in reveals. */
function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return <div className={className}>{children}</div>;
}

/* ============================================
   Button Component
   ============================================ */

const BUTTON_VARIANT_CLASS = {
  primary: "naga-button-primary",
  secondary: "naga-button-secondary",
  whatsapp: "naga-button-whatsapp",
} as const;

function EditorialButton({
  href,
  children,
  variant = "primary",
  className = "",
  onClick,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "whatsapp";
  className?: string;
  onClick?: () => void;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`naga-button ${BUTTON_VARIANT_CLASS[variant]} ${className}`}
    >
      {children}
    </a>
  );
}

/* ============================================
   Navbar
   ============================================ */

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="naga-container">
        <nav className="site-header__bar" aria-label="Primary">
          <a
            href="#top"
            className="wordmark"
            aria-label="NAGA Law Chambers home"
          >
            <Scale className="h-5 w-5 shrink-0" aria-hidden="true" />
            <span className="truncate">Naga Law Chambers</span>
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
              onClick={() => trackEvent("call_click", { location: "navbar" })}
              className="naga-button naga-button-secondary hidden !min-h-11 sm:inline-flex"
            >
              Consult
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="naga-menu-btn md:hidden"
              aria-label="Toggle navigation"
              aria-expanded={open}
            >
              {open ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open ? (
            <motion.div
              role="dialog"
              aria-label="Navigation menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: easing }}
              className="naga-mobile-panel mb-3 p-2 md:hidden"
            >
              {navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="naga-nav-link !flex w-full px-3 !text-base"
                >
                  {item.label}
                </a>
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}

/* ============================================
   Hero Section
   ============================================ */

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="naga-container hero__grid">
        <div>
          <h1 className="naga-hero-title">Defending land, legacy &amp; rights.</h1>
          <p className="naga-lead mt-6">
            Direct representation before revenue offices and Anantapur district
            courts.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <EditorialButton href="#contact">Book consultation</EditorialButton>
            <EditorialButton
              href={PHONE_HREF}
              variant="secondary"
              className="hidden sm:inline-flex"
              onClick={() => trackEvent("call_click", { location: "hero" })}
            >
              {PHONE_DISPLAY}
            </EditorialButton>
          </div>
        </div>

        <div>
          <div className="relative">
            <SurveyMap />
            <aside className="entry hero__entry" aria-label="The advocate">
              <div className="entry__head">
                <span>Advocate</span>
                <span>Anantapur Bar</span>
              </div>
              <div className="entry__photo">
                <Image
                  src="/advocate.jpg"
                  alt="Advocate S. Nagendra Naik — NAGA Law Chambers, Anantapur Bar Association"
                  fill
                  priority
                  sizes="(max-width: 960px) 92vw, 250px"
                  className="object-cover object-[72%_25%]"
                />
              </div>
              <div className="entry__body">
                <p className="font-[family-name:var(--font-display)] text-lg font-semibold leading-tight tracking-[var(--tracking-display)] text-ink">
                  S. Nagendra Naik
                </p>
                <p className="mt-1 text-sm text-muted">
                  B.A., LL.B. Direct consultation
                </p>
              </div>
            </aside>
          </div>
          <p className="map__caption">
            Schematic. A revenue matter moves up through these forums, from the
            Tahsildar to the High Court.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   At a glance strip
   ============================================ */

function GlanceStrip() {
  return (
    <section aria-label="At a glance" className="pb-[var(--section-gap-s)]">
      <div className="naga-container">
        <dl className="grid grid-cols-2 gap-x-[var(--gap-columns)] gap-y-6 lg:grid-cols-4">
          {stats.map((metric) => (
            <div key={metric.label} className="naga-mini-stat flex flex-col">
              <dt className="order-2 mt-1 text-sm text-muted">{metric.label}</dt>
              <dd className="m-0 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-[var(--tracking-display)] text-ink">
                <CountUp value={metric.value} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ============================================
   Section Title Component
   ============================================ */

function SectionTitle({
  title,
  body,
}: {
  kicker?: string;
  title: string;
  body: string;
}) {
  return (
    <div className="mb-12 grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-[var(--gap-columns)]">
      <h2 className="naga-section-title">{title}</h2>
      <p className="max-w-[52ch] text-lg text-muted">{body}</p>
    </div>
  );
}

/* ============================================
   Practice Area Rows
   ============================================ */

function PracticeCard({
  area,
  open,
  onToggle,
}: {
  area: (typeof practiceAreas)[number];
  open: boolean;
  onToggle: () => void;
  index: number;
}) {
  const Icon = area.icon;
  const reduce = useReducedMotion();

  return (
    <article
      className={`naga-card ${open ? "naga-card-open" : ""}`}
    >
      <div className="grid items-start gap-4 p-5 sm:grid-cols-[44px_minmax(0,5fr)_minmax(0,7fr)] sm:gap-6 sm:p-6">
        <span className="naga-icon-shell">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h3 className="max-w-none text-xl font-semibold leading-tight text-ink">
            <button
              type="button"
              onClick={onToggle}
              aria-expanded={open}
              aria-controls={`${area.id}-panel`}
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 text-left"
            >
              {area.title}
              <motion.span
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.22, ease: easing }}
                aria-hidden="true"
              >
                <ChevronDown className="h-5 w-5" />
              </motion.span>
            </button>
          </h3>
          <p className="text-sm text-muted">{area.courts}</p>
        </div>
        <p className="text-base text-ink-2">{area.summary}</p>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={`${area.id}-panel`}
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: easing }}
          >
            <div className="px-5 pb-6 sm:px-6 sm:pl-[calc(44px+1.5rem+1.5rem)]">
              <div className="max-w-[65ch] border-t border-ink pt-4 text-base text-ink-2">
                {area.detail}
                <span className="mt-3 block text-sm font-medium text-ink">
                  {area.hoverDetail}
                </span>
                {(() => {
                  const seo = practicePages.find(
                    (p) => p.practiceId === area.id
                  );
                  return seo ? (
                    <Link
                      href={`/practice/${seo.slug}`}
                      className="mt-4 inline-flex min-h-11 items-center gap-2 font-medium text-ink underline underline-offset-4 decoration-accent decoration-2"
                    >
                      Learn more
                      <span className="sr-only"> about {area.title}</span>
                    </Link>
                  ) : null;
                })()}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
  );
}

function PracticeSection() {
  const [openId, setOpenId] = useState<string>(practiceAreas[0].id);

  return (
    <section id="practice" className="naga-section border-t border-ink">
      <div className="naga-container">
        <SectionTitle
          title="Serious legal work across Anantapur district forums."
          body="Revenue & land disputes before Tahsildar, RDO, and Collector. Civil, criminal bail, family partition, and consumer forum representation with clear strategy and direct advocate communication."
        />
        <div className="grid gap-3">
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
    <section id="advocate" className="naga-section border-t border-ink">
      <div className="naga-container grid items-start gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-[var(--gap-columns)]">
        <div className="entry">
          <div className="entry__head">
            <span>At a glance</span>
            <span>Anantapur Bar</span>
          </div>
          <div className="grid grid-cols-2 border-b border-ink">
            {[
              { value: `${YEARS_EXPERIENCE}+`, label: "Years of experience" },
              {
                value: String(site.advocate.barCouncilYear),
                label: "Bar Council enrolled",
              },
              { value: "Anantapur", label: "Bar Association" },
              { value: "Direct", label: "Advocate access" },
            ].map((item, i) => (
              <div
                key={item.label}
                className={`entry__body !border-t-0 ${i % 2 === 0 ? "border-r border-ink" : ""} ${i > 1 ? "border-t border-ink" : ""}`}
              >
                <p className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-[var(--tracking-display)] text-ink">
                  <CountUp value={item.value} />
                </p>
                <p className="mt-1 text-sm text-muted">{item.label}</p>
              </div>
            ))}
          </div>
          <div className="p-5">
            {[
              "B.A., LL.B.",
              "Bar Council of Andhra Pradesh",
              "Revenue & land record disputes before Tahsildar, RDO",
              "Civil, criminal, family & consumer matters",
            ].map((item) => (
              <div key={item} className="naga-proof-row">
                <BadgeCheck
                  className="mt-0.5 h-4 w-4 shrink-0 text-ink"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="naga-section-title">Adv. S. Nagendra Naik</h2>
          <p className="mt-7 max-w-[65ch] text-lg text-ink-2">
            A practice rooted in Anantapur courts, revenue offices, and Andhra
            Pradesh procedure since {site.advocate.practisingSince}, over{" "}
            {YEARS_EXPERIENCE} years of direct advocacy. Enrolled with the Bar
            Council of Andhra Pradesh in {site.advocate.barCouncilYear}, Adv. S.
            Nagendra Naik appears regularly before the Tahsildar, RDO, District
            Courts, and the Andhra Pradesh High Court.
          </p>
          <p className="mt-5 max-w-[65ch] text-lg text-ink-2">
            Clients work directly with the advocate from first assessment
            through filing, hearing, and compliance, with thorough preparation
            on revenue records, title documents, and procedural filings before
            every court or administrative proceeding.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   Courts & Process Section
   ============================================ */

function CourtsSection() {
  return (
    <section id="courts" className="naga-section border-t border-ink">
      <div className="naga-container">
        <SectionTitle
          title="Built for the forums where your case is actually decided."
          body="Covering revenue authorities across Anantapur district, civil courts, criminal courts, family forums, consumer commissions, and AP High Court proceedings."
        />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-[var(--gap-columns)]">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="naga-icon-shell">
                <Landmark className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="text-xl font-semibold text-ink">Forum coverage</h3>
            </div>
            <ForumRoute items={courtMatrix} />
          </div>

          <ol className="naga-ruled m-0 list-none p-0">
            {processSteps.map((step, index) => (
              <li
                key={step.title}
                className="grid gap-2 py-5 sm:grid-cols-[56px_minmax(0,1fr)] sm:gap-4"
              >
                <span className="num text-sm text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-ink">{step.title}</h3>
                  <p className="mt-2 max-w-[60ch] text-base text-ink-2">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
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
    <section id="contact" className="naga-section border-t border-ink">
      <div className="naga-container">
        <Reveal>
          <div className="naga-contact-panel overflow-hidden p-6 sm:p-8 lg:p-10">
            <div className="mb-9 flex flex-wrap gap-2.5">
              <span className="naga-trust-badge">
                <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                Direct advocate access
              </span>
              <span className="naga-trust-badge">
                <Clock className="h-4 w-4" aria-hidden="true" />
                Same-day response
              </span>
              <span className="naga-trust-badge">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                Confidential consultation
              </span>
            </div>

            <div className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-start">
              <div>
                <h2 className="naga-section-title">
                  Discuss documents, forum strategy & next steps.
                </h2>
                <p className="mt-7 max-w-[60ch] text-lg text-ink-2">
                  Share the facts directly with Adv. S. Nagendra Naik.
                  Get a clear assessment of court route, document gaps,
                  urgency, and expected next steps for Tahsildar appeals,
                  RDO proceedings, Adangal corrections, mutations, and
                  AP High Court writs.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <EditorialButton
                    href={PHONE_HREF}
                    onClick={() => trackEvent("call_click", { location: "contact" })}
                  >
                    Call {PHONE_DISPLAY}
                  </EditorialButton>
                  <EditorialButton
                    href={WHATSAPP_HREF}
                    variant="whatsapp"
                    external
                    onClick={() => trackEvent("whatsapp_click", { location: "contact" })}
                  >
                    WhatsApp us
                  </EditorialButton>
                </div>

                <div className="naga-ruled mt-8">
                  {[
                    {
                      icon: Phone,
                      label: "Phone",
                      value: PHONE_DISPLAY,
                      href: PHONE_HREF,
                      event: "call_click",
                    },
                    {
                      icon: Mail,
                      label: "Email",
                      value: EMAIL,
                      href: EMAIL_HREF,
                      event: "email_click",
                    },
                    {
                      icon: MapPin,
                      label: "Office",
                      value: site.contact.office,
                      href: MAP_HREF,
                      event: "map_click",
                      external: true,
                    },
                  ].map((item) => {
                    const ContactIcon = item.icon as LucideIcon;
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={() =>
                          trackEvent(item.event, { location: "contact_row" })
                        }
                        {...((item as { external?: boolean }).external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="naga-contact-row"
                      >
                        <span className="naga-icon-shell">
                          <ContactIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </span>
                        <span>
                          <span className="block text-sm text-muted">
                            {item.label}
                          </span>
                          <span className="block text-base text-ink">
                            {item.value}
                          </span>
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>

              <IntakeForm />
            </div>

            <div className="mt-8 h-[20rem] sm:h-[22rem]">
              <MapEmbed className="h-full" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================
   Page Composition
   ============================================ */

export default function HomePage() {
  return (
    <main id="main" className="relative min-h-[100dvh]">
      <Navbar />
      <Hero />
      <GlanceStrip />
      <PracticeSection />
      <AdvocateSection />
      <CourtsSection />
      <Testimonials />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}
