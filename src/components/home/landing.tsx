"use client";

import Image from "next/image";
import Link from "next/link";
import { createContext, useContext, useEffect, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, FileSearch, FileText, Gavel, Mail, MapPin, Menu, Phone, Route, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { CountUp } from "@/components/motion/count-up";
import { ForumList } from "@/components/motion/forum-list";
import { ParallaxBg } from "@/components/motion/parallax-bg";
import { IntakeForm } from "@/components/conversion/intake-form";
import { MapEmbed } from "@/components/map-embed";
import { SiteFooter } from "@/components/layout/site-footer";
import { Testimonials } from "@/components/testimonials";
import { Reveal } from "@/components/home/reveal";
import { courtMatrix, navLinks, practiceAreas, processSteps } from "@/lib/content";
import { te, teAreas, teCourts, teSteps, type Locale } from "@/lib/home-copy";
import { teluguEnabled } from "@/lib/features";
import { getPracticeAreaIcon } from "@/lib/icons";
import { practicePages } from "@/lib/local-seo";
import { trackEvent } from "@/lib/analytics";
import { buildWhatsappHref } from "@/lib/whatsapp";
import { site, phoneHref, emailHref, mapHref } from "@/lib/site";

const YEARS = new Date().getFullYear() - site.advocate.practisingSince;
const WHATSAPP_HREF = buildWhatsappHref();
const processIcons: LucideIcon[] = [FileSearch, Route, FileText, Gavel];

/** Sets the entrance delay (read by the .anim-rise and .line-mask CSS). */
const delay = (ms: number) => ({ ["--d" as string]: `${ms}ms` }) as CSSProperties;

/** Telugu strings when the page is /te; null for English. */
const TeContext = createContext<typeof te | null>(null);
const useT = () => useContext(TeContext);

/* ============================================
   Header
   ============================================ */

function Header() {
  const T = useT();
  const [open, setOpen] = useState(false);
  const nav = T ? T.nav : navLinks;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-rule/70 bg-paper/85 backdrop-blur-md transition-shadow duration-300 ${scrolled ? "shadow-[0_10px_30px_-20px_oklch(26.9%_0.121_270/0.55)]" : ""}`}
    >
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-5 md:h-[72px] md:px-8">
        <a
          href="#top"
          className="inline-flex min-h-11 items-center font-display text-2xl leading-none tracking-[var(--tracking-display)] text-ink md:text-[28px]"
          aria-label={T ? T.home : "NAGA Law Chambers home"}
        >
          {T ? "నాగ లా ఛాంబర్స్" : "Naga Law Chambers"}
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="naga-nav-link">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          {teluguEnabled ? (
            <Link
              href={T ? "/" : "/te"}
              hrefLang={T ? "en" : "te"}
              lang={T ? "en" : "te"}
              className="naga-nav-link px-2 text-base font-semibold"
            >
              {T ? "English" : "తెలుగు"}
            </Link>
          ) : null}
          <a
            href="#contact"
            className="naga-button naga-button-primary hidden !min-h-11 !w-auto sm:inline-flex"
            onClick={() => trackEvent("consult_click", { location: "header" })}
          >
            {T ? T.book : "Book a consultation"}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation"
            className="naga-menu-btn md:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-rule/70 bg-paper md:hidden"
          >
            <div className="px-5 pb-5 pt-2">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.08 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="flex min-h-12 items-center border-b border-rule/70 font-display text-3xl text-ink"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

/* ============================================
   Hero
   ============================================ */

function Hero() {
  const T = useT();
  return (
    <section id="top" className="relative overflow-hidden pt-24 md:pt-32">
      <ParallaxBg
        src="/contours-light.svg"
        outerStyle={{
          maskImage: "linear-gradient(to bottom, black 60%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent)",
        }}
      />
      <div className="relative mx-auto grid max-w-[1240px] gap-10 px-5 pb-14 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:items-center md:gap-12 md:px-8 md:pb-24">
        <div>
          <p className="anim-rise mb-5 text-sm font-medium text-muted md:text-base" style={delay(0)}>
            {T ? T.hero.eyebrow : "Advocate S. Nagendra Naik, Anantapur Bar"}
          </p>
          <h1 className="font-display text-[clamp(3rem,8.4vw,6.75rem)] leading-[0.98] tracking-[var(--tracking-display)] text-ink">
            <span className="line-mask">
              <span style={delay(120)}>{T ? T.hero.h1a : "Defending land,"}</span>
            </span>
            <span className="line-mask">
              <span style={delay(260)}>
                <em className="italic">{T ? T.hero.h1b : <>legacy &amp; rights.</>}</em>
              </span>
            </span>
          </h1>
          <p className="naga-lead anim-rise mt-6 max-w-[34ch] !text-lg md:!text-xl" style={delay(520)}>
            {T ? T.hero.sentence : "Direct representation before revenue offices and courts across Andhra Pradesh."}
          </p>
          <div className="anim-rise mt-8 flex flex-col gap-3 sm:flex-row" style={delay(680)}>
            <a
              href="#contact"
              className="naga-button naga-button-primary"
              onClick={() => trackEvent("consult_click", { location: "hero" })}
            >
              {T ? T.book : "Book a consultation"}
            </a>
            <a
              href={phoneHref}
              className="naga-button naga-button-secondary hidden sm:inline-flex"
              onClick={() => trackEvent("call_click", { location: "hero" })}
            >
              {T ? T.call : "Call"} {site.contact.phoneDisplay}
            </a>
          </div>
          <ul className="anim-rise mt-7 flex list-none flex-wrap gap-x-6 gap-y-2 p-0 text-sm text-ink-2" style={delay(820)}>
            {(T ? T.hero.trust : [`Enrolled ${site.advocate.barCouncilYear}`, "Bar Council of Andhra Pradesh", "Direct access to the advocate"]).map((t: string) => (
              <li key={t} className="flex items-center gap-2">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-ink" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[520px] md:max-w-none">
          <div className="anim-photo relative aspect-[5/4] overflow-hidden rounded-[28px] bg-paper-3 shadow-[0_24px_60px_-28px_oklch(26.9%_0.121_270/0.45)] md:aspect-[4/5]">
            <Image
              src="/advocate.jpg"
              alt="Advocate S. Nagendra Naik, NAGA Law Chambers, Anantapur Bar"
              fill
              priority
              sizes="(max-width: 768px) 92vw, 480px"
              className="object-cover object-[72%_25%]"
            />
          </div>
          <div className="anim-rise mt-3 rounded-2xl bg-paper-2 px-4 py-3 md:absolute md:bottom-5 md:left-5 md:right-auto md:mt-0 md:min-w-[260px] md:bg-paper-2/90 md:backdrop-blur-md" style={delay(950)}>
            <p className="font-display text-2xl leading-none text-ink">{T ? T.hero.cardName : "S. Nagendra Naik"}</p>
            <p className="mt-1.5 text-sm text-muted">
              {T ? T.hero.card : `B.A., LL.B. Anantapur Bar, enrolled ${site.advocate.barCouncilYear}`}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   Who we are
   ============================================ */

function About() {
  const T = useT();
  const stats = [
    { value: `${YEARS}+`, label: T ? T.about.years : "Years of practice at the Anantapur Bar" },
    { value: String(practiceAreas.length), label: T ? T.about.areas : "Practice areas" },
    { value: String(courtMatrix.length), label: T ? T.about.forums : "Forums covered, from the Tahsildar to the High Court" },
    { value: String(site.advocate.barCouncilYear), label: T ? T.about.enrolled : "Enrolled with the Bar Council of Andhra Pradesh" },
  ];
  return (
    <section id="about" className="mx-auto max-w-[1240px] px-5 py-16 md:px-8 md:py-24">
      <Reveal>
        <p className="mb-4 text-sm font-medium text-muted md:text-base">{T ? T.about.label : "Who we are"}</p>
        <h2 className="font-display text-[clamp(2rem,4.6vw,3.75rem)] leading-[1.05] tracking-[var(--tracking-display)] text-ink !max-w-[26ch]">
          {T ? T.about.heading : "A practice built on land records, revenue procedure and the courts of Andhra Pradesh."}
        </h2>
        <p className="mt-5 max-w-[52ch] text-base text-muted md:text-lg">
          {T ? T.about.sub : "Based in Anantapur and serving clients across Andhra Pradesh."}
        </p>
      </Reveal>
      <div>
        <dl className="mt-10 grid grid-cols-2 gap-3 md:mt-14 md:grid-cols-4 md:gap-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 90} className="contents">
              <div className="lift relative flex flex-col overflow-hidden rounded-3xl bg-paper-2 p-5 md:p-7">
                <span className="draw-line absolute left-0 top-0 h-0.5 w-full bg-ink" aria-hidden="true" />
                <dt className="order-2 mt-3 text-sm leading-5 text-muted">{s.label}</dt>
                <dd className="m-0 font-display text-5xl leading-none text-ink md:text-6xl">
                  <CountUp value={s.value} />
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ============================================
   Expertise
   ============================================ */

function Expertise() {
  const T = useT();
  return (
    <section id="practice" className="mx-auto max-w-[1240px] px-5 pb-16 md:px-8 md:pb-24">
      <Reveal>
        <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] tracking-[var(--tracking-display)] text-ink">
          {T ? T.expertise.heading : "Our expertise"}
        </h2>
        <p className="mt-4 max-w-[52ch] text-base text-muted md:text-lg">
          {T
            ? T.expertise.intro
            : "Revenue and land disputes before Tahsildar, RDO and Collector. Civil, criminal bail, family partition and consumer forum representation, with clear strategy and direct advocate communication."}
        </p>
      </Reveal>

      <div className="mt-10 grid gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
        {practiceAreas.map((area, i) => {
          const Icon = getPracticeAreaIcon(area.icon);
          const page = practicePages.find((p) => p.practiceId === area.id);
          const loc = T ? teAreas[area.id] : undefined;
          const title = loc?.title ?? area.title;
          const body = (
            <>
              <span className="naga-icon-shell !h-14 !w-14">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="mt-6 block font-display text-3xl leading-tight text-ink">{title}</span>
              <span className="mt-1 block text-sm text-muted">{loc?.courts ?? area.courts}</span>
              <span className="mt-4 block text-base leading-6 text-ink-2">{loc?.summary ?? area.summary}</span>
              {page ? (
                <span className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-ink underline underline-offset-4">
                  {T ? T.expertise.more : "Learn more"}
                  <span className="sr-only"> {title}</span>
                </span>
              ) : null}
            </>
          );
          const cls =
            "lift flex flex-col rounded-3xl bg-paper-2 p-6 md:p-7";
          return (
            <Reveal key={area.id} delay={i * 60} className="contents">
              {page ? (
                <Link href={`/practice/${page.slug}`} className={cls}>
                  {body}
                </Link>
              ) : (
                <div className={cls}>{body}</div>
              )}
            </Reveal>
          );
        })}

        <div className="relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-3xl bg-ink p-6 text-white md:p-7">
          <ParallaxBg src="/contours-navy.svg" strength={10} />
          <h3 className="relative font-display text-3xl leading-tight text-white !max-w-[16ch]">
            {T ? T.expertise.ctaTitle : "Start with your documents."}
          </h3>
          <div className="relative">
            <p className="mb-5 text-base leading-6 text-white/80">
              {T ? T.expertise.ctaBody : "Share the facts directly with the advocate and get a clear view of the court route."}
            </p>
            <a
              href="#contact"
              className="naga-button !bg-white !text-ink"
              onClick={() => trackEvent("consult_click", { location: "expertise_card" })}
            >
              {T ? T.expertise.ctaButton : "Get in touch"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   The advocate and the forums
   ============================================ */

function Advocate() {
  const T = useT();
  const courts = T ? teCourts : courtMatrix;
  const bullets = T
    ? T.advocate.bullets
    : ["B.A., LL.B.", "Bar Council of Andhra Pradesh", "Revenue & land record disputes before Tahsildar, RDO", "Civil, criminal, family & consumer matters"];
  return (
    <section id="advocate" className="mx-auto max-w-[1240px] px-5 pb-16 md:px-8 md:pb-24">
      <div className="grid gap-10 md:grid-cols-2 md:gap-14">
        <Reveal>
          <p className="mb-4 text-sm font-medium text-muted md:text-base">{T ? T.advocate.label : "The advocate"}</p>
          <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] tracking-[var(--tracking-display)] text-ink !max-w-[14ch]">
            {T ? T.advocate.name : "Adv. S. Nagendra Naik"}
          </h2>
          <p className="mt-6 max-w-[60ch] text-base leading-7 text-ink-2 md:text-lg md:leading-8">
            {T
              ? T.advocate.p1(site.advocate.practisingSince, YEARS, site.advocate.barCouncilYear)
              : `A practice rooted in Anantapur courts, revenue offices, and Andhra Pradesh procedure since ${site.advocate.practisingSince}, over ${YEARS} years of direct advocacy. Enrolled with the Bar Council of Andhra Pradesh in ${site.advocate.barCouncilYear}, Adv. S. Nagendra Naik appears regularly before the Tahsildar, RDO, District Courts, and the Andhra Pradesh High Court.`}
          </p>
          <p className="mt-4 max-w-[60ch] text-base leading-7 text-ink-2 md:text-lg md:leading-8">
            {T
              ? T.advocate.p2
              : "Clients work directly with the advocate from first assessment through filing, hearing, and compliance, with thorough preparation on revenue records, title documents, and procedural filings before every court or administrative proceeding."}
          </p>
          <ul className="m-0 mt-6 grid list-none gap-2.5 p-0">
            {bullets.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-base text-ink-2">
                <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-ink" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={80}>
          <div id="courts" className="rounded-3xl bg-paper-2 p-6 md:p-8">
            <h2 className="font-display text-3xl leading-tight text-ink md:text-4xl">
              {T ? T.advocate.forumsTitle : "Forums we appear before"}
            </h2>
            <p className="mt-3 text-base text-muted">
              {T ? T.advocate.forumsSub : "Where your case is actually decided, from revenue offices to the High Court."}
            </p>
            <div className="mt-6">
              <ForumList items={courts} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================
   Process
   ============================================ */

function Process() {
  const T = useT();
  const steps = T ? teSteps : processSteps;
  return (
    <section id="process" className="mx-auto max-w-[1240px] px-5 pb-16 md:px-8 md:pb-24">
      <Reveal>
        <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] tracking-[var(--tracking-display)] text-ink !max-w-[18ch]">
          {T ? T.process.heading : "A structured approach, from first document to hearing."}
        </h2>
      </Reveal>
      <ol className="m-0 mt-10 grid list-none gap-3 p-0 sm:grid-cols-2 md:gap-4 lg:grid-cols-4">
        {steps.map((step, i) => {
          const Icon = processIcons[i] ?? FileText;
          return (
            <li key={step.title} className="contents">
              <Reveal delay={i * 70} className="lift relative flex flex-col overflow-hidden rounded-3xl bg-paper-2 p-6 md:p-7">
                <span className="draw-line absolute left-0 top-0 h-0.5 w-full bg-ink" aria-hidden="true" />
                <div className="flex items-center justify-between">
                  <span className="naga-icon-shell !h-14 !w-14">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="font-display text-3xl text-muted">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-6 font-display text-3xl leading-tight text-ink">{step.title}</h3>
                <p className="mt-3 text-base leading-6 text-ink-2">{step.body}</p>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/* ============================================
   Contact
   ============================================ */

function Contact() {
  const T = useT();
  const rows: { icon: LucideIcon; label: string; value: string; href: string; event: string; external?: boolean }[] = [
    { icon: Phone, label: T ? T.contact.phone : "Phone", value: site.contact.phoneDisplay, href: phoneHref, event: "call_click" },
    { icon: Mail, label: T ? T.contact.email : "Email", value: site.contact.email, href: emailHref, event: "email_click" },
    { icon: MapPin, label: T ? T.contact.office : "Office", value: site.contact.office, href: mapHref, event: "map_click", external: true },
  ];

  return (
    <section id="contact" className="mx-auto max-w-[1240px] px-5 pb-16 md:px-8 md:pb-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-[28px] bg-ink px-6 py-12 text-white md:px-14 md:py-20">
          <ParallaxBg src="/contours-navy.svg" strength={9} />
          <div className="relative">
          <h2 className="font-display text-[clamp(2.25rem,5.4vw,4.5rem)] leading-[1.02] tracking-[var(--tracking-display)] text-white !max-w-[18ch]">
            {T ? T.contact.heading : "Discuss documents, forum strategy & next steps."}
          </h2>
          <p className="mt-5 max-w-[56ch] text-base leading-7 text-white/80 md:text-lg">
            {T
              ? T.contact.body
              : "Share the facts directly with Adv. S. Nagendra Naik. Get a clear assessment of court route, document gaps, urgency, and expected next steps for Tahsildar appeals, RDO proceedings, Adangal corrections, mutations, and AP High Court writs."}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={phoneHref}
              className="naga-button !bg-white !text-ink"
              onClick={() => trackEvent("call_click", { location: "contact" })}
            >
              {T ? T.call : "Call"} {site.contact.phoneDisplay}
            </a>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="naga-button naga-button-whatsapp"
              onClick={() => trackEvent("whatsapp_click", { location: "contact" })}
            >
              {T ? T.contact.whatsapp : "WhatsApp us"}
            </a>
          </div>
          </div>
        </div>
      </Reveal>

      <div className="mt-3 grid gap-3 md:mt-4 md:grid-cols-2 md:gap-4">
        <Reveal className="flex flex-col gap-3 md:gap-4">
          <div className="rounded-3xl bg-paper-2 p-6 md:p-8">
            <h3 className="font-display text-3xl leading-tight text-ink md:text-4xl">
              {T ? T.contact.chambers : "Contact the chambers"}
            </h3>
            <div className="mt-5 border-t border-ink">
              {rows.map((row) => {
                const Icon = row.icon;
                return (
                  <a
                    key={row.event}
                    href={row.href}
                    onClick={() => trackEvent(row.event, { location: "contact_row" })}
                    {...(row.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="flex min-h-14 items-center gap-4 border-b border-rule py-3.5 transition-colors hover:bg-paper"
                  >
                    <span className="naga-icon-shell">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-sm text-muted">{row.label}</span>
                      <span className="block text-base text-ink">{row.value}</span>
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
          <MapEmbed className="min-h-[300px] flex-1" />
        </Reveal>

        <Reveal delay={80}>
          <IntakeForm copy={T?.form} />
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================
   Page
   ============================================ */

export function Landing({
  locale = "en",
  children,
}: {
  locale?: Locale;
  /** Extra sections for English, placed before the contact section (e.g. FAQ). */
  children?: React.ReactNode;
}) {
  const T = locale === "te" ? te : null;
  return (
    <TeContext.Provider value={T}>
      <div className="bg-paper" lang={locale}>
        <Header />
        <main id="main">
          <Hero />
          <About />
          <Expertise />
          <Advocate />
          <Process />
          <Testimonials />
          {children}
          <Contact />
        </main>
        <SiteFooter locale={locale} />
      </div>
    </TeContext.Provider>
  );
}
