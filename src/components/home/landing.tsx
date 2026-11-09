"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BadgeCheck, FileSearch, FileText, Gavel, Mail, MapPin, Menu, Phone, Route, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { CountUp } from "@/components/motion/count-up";
import { IntakeForm } from "@/components/conversion/intake-form";
import { MapEmbed } from "@/components/map-embed";
import { SiteFooter } from "@/components/layout/site-footer";
import { Testimonials } from "@/components/testimonials";
import { Reveal } from "@/components/home/reveal";
import { courtMatrix, navLinks, practiceAreas, processSteps } from "@/lib/content";
import { getPracticeAreaIcon } from "@/lib/icons";
import { practicePages } from "@/lib/local-seo";
import { trackEvent } from "@/lib/analytics";
import { buildWhatsappHref } from "@/lib/whatsapp";
import { site, phoneHref, emailHref, mapHref } from "@/lib/site";

const YEARS = new Date().getFullYear() - site.advocate.practisingSince;
const WHATSAPP_HREF = buildWhatsappHref();
const processIcons: LucideIcon[] = [FileSearch, Route, FileText, Gavel];

/* ============================================
   Header
   ============================================ */

function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-rule/70 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-5 md:h-[72px] md:px-8">
        <a href="#top" className="font-display text-2xl leading-none tracking-[var(--tracking-display)] text-ink md:text-[28px]" aria-label="NAGA Law Chambers home">
          Naga Law Chambers
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {navLinks.map((item) => (
            <a key={item.href} href={item.href} className="naga-nav-link">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="naga-button naga-button-primary hidden !min-h-11 !w-auto sm:inline-flex"
            onClick={() => trackEvent("consult_click", { location: "header" })}
          >
            Book a consultation
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

      {open ? (
        <div id="mobile-menu" className="border-t border-rule/70 bg-paper px-5 pb-5 pt-2 md:hidden">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center border-b border-rule/70 font-display text-3xl text-ink"
            >
              {item.label}
            </a>
          ))}
        </div>
      ) : null}
    </header>
  );
}

/* ============================================
   Hero
   ============================================ */

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-24 md:pt-32">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(/contours-light.svg)",
          maskImage: "linear-gradient(to bottom, black 60%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent)",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-[1240px] gap-10 px-5 pb-14 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:items-center md:gap-12 md:px-8 md:pb-24">
        <div>
          <p className="mb-5 text-sm font-medium text-muted md:text-base">
            Advocate S. Nagendra Naik, Anantapur Bar
          </p>
          <h1 className="font-display text-[clamp(3rem,8.4vw,6.75rem)] leading-[0.98] tracking-[var(--tracking-display)] text-ink">
            Defending land, <em className="italic">legacy &amp; rights.</em>
          </h1>
          <p className="naga-lead mt-6 max-w-[34ch] !text-lg md:!text-xl">
            Direct representation before revenue offices and courts across Andhra Pradesh.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="naga-button naga-button-primary"
              onClick={() => trackEvent("consult_click", { location: "hero" })}
            >
              Book a consultation
            </a>
            <a
              href={phoneHref}
              className="naga-button naga-button-secondary hidden sm:inline-flex"
              onClick={() => trackEvent("call_click", { location: "hero" })}
            >
              Call {site.contact.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[520px] md:max-w-none">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[28px] bg-paper-3 shadow-[0_24px_60px_-28px_oklch(26.9%_0.121_270/0.45)] md:aspect-[4/5]">
            <Image
              src="/advocate.jpg"
              alt="Advocate S. Nagendra Naik, NAGA Law Chambers, Anantapur Bar"
              fill
              priority
              sizes="(max-width: 768px) 92vw, 480px"
              className="object-cover object-[72%_25%]"
            />
          </div>
          <div className="mt-3 rounded-2xl bg-paper-2 px-4 py-3 md:absolute md:bottom-5 md:left-5 md:right-auto md:mt-0 md:min-w-[260px] md:bg-paper-2/90 md:backdrop-blur-md">
            <p className="font-display text-2xl leading-none text-ink">S. Nagendra Naik</p>
            <p className="mt-1.5 text-sm text-muted">B.A., LL.B. Anantapur Bar, enrolled {site.advocate.barCouncilYear}</p>
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
  const stats = [
    { value: `${YEARS}+`, label: "Years of practice at the Anantapur Bar" },
    { value: String(practiceAreas.length), label: "Practice areas" },
    { value: String(courtMatrix.length), label: "Forums covered, from the Tahsildar to the High Court" },
    { value: String(site.advocate.barCouncilYear), label: "Enrolled with the Bar Council of Andhra Pradesh" },
  ];
  return (
    <section id="about" className="mx-auto max-w-[1240px] px-5 py-16 md:px-8 md:py-24">
      <Reveal>
        <p className="mb-4 text-sm font-medium text-muted md:text-base">Who we are</p>
        <h2 className="font-display text-[clamp(2rem,4.6vw,3.75rem)] leading-[1.05] tracking-[var(--tracking-display)] text-ink !max-w-[26ch]">
          A practice built on land records, revenue procedure and the courts of Andhra Pradesh.
        </h2>
        <p className="mt-5 max-w-[52ch] text-base text-muted md:text-lg">
          Based in Anantapur and serving clients across Andhra Pradesh.
        </p>
      </Reveal>
      <Reveal delay={80}>
        <dl className="mt-10 grid grid-cols-2 gap-3 md:mt-14 md:grid-cols-4 md:gap-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col rounded-3xl bg-paper-2 p-5 md:p-7">
              <dt className="order-2 mt-3 text-sm leading-5 text-muted">{s.label}</dt>
              <dd className="m-0 font-display text-5xl leading-none text-ink md:text-6xl">
                <CountUp value={s.value} />
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}

/* ============================================
   Expertise
   ============================================ */

function Expertise() {
  return (
    <section id="practice" className="mx-auto max-w-[1240px] px-5 pb-16 md:px-8 md:pb-24">
      <Reveal>
        <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] tracking-[var(--tracking-display)] text-ink">
          Our expertise
        </h2>
        <p className="mt-4 max-w-[52ch] text-base text-muted md:text-lg">
          Revenue and land disputes before Tahsildar, RDO and Collector. Civil, criminal bail, family partition and
          consumer forum representation, with clear strategy and direct advocate communication.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
        {practiceAreas.map((area, i) => {
          const Icon = getPracticeAreaIcon(area.icon);
          const page = practicePages.find((p) => p.practiceId === area.id);
          const body = (
            <>
              <span className="naga-icon-shell !h-14 !w-14">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="mt-6 block font-display text-3xl leading-tight text-ink">{area.title}</span>
              <span className="mt-1 block text-sm text-muted">{area.courts}</span>
              <span className="mt-4 block text-base leading-6 text-ink-2">{area.summary}</span>
              {page ? (
                <span className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-ink underline underline-offset-4">
                  Learn more<span className="sr-only"> about {area.title}</span>
                </span>
              ) : null}
            </>
          );
          const cls =
            "flex flex-col rounded-3xl bg-paper-2 p-6 transition-shadow duration-200 hover:shadow-[0_18px_40px_-24px_oklch(26.9%_0.121_270/0.5)] md:p-7";
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

        <div
          className="relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-3xl bg-ink bg-cover bg-center p-6 text-white md:p-7"
          style={{ backgroundImage: "url(/contours-navy.svg)" }}
        >
          <h3 className="font-display text-3xl leading-tight text-white !max-w-[16ch]">Start with your documents.</h3>
          <div>
            <p className="mb-5 text-base leading-6 text-white/80">
              Share the facts directly with the advocate and get a clear view of the court route.
            </p>
            <a
              href="#contact"
              className="naga-button !bg-white !text-ink"
              onClick={() => trackEvent("consult_click", { location: "expertise_card" })}
            >
              Get in touch
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
  return (
    <section id="advocate" className="mx-auto max-w-[1240px] px-5 pb-16 md:px-8 md:pb-24">
      <div className="grid gap-10 md:grid-cols-2 md:gap-14">
        <Reveal>
          <p className="mb-4 text-sm font-medium text-muted md:text-base">The advocate</p>
          <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] tracking-[var(--tracking-display)] text-ink !max-w-[14ch]">
            Adv. S. Nagendra Naik
          </h2>
          <p className="mt-6 max-w-[60ch] text-base leading-7 text-ink-2 md:text-lg md:leading-8">
            A practice rooted in Anantapur courts, revenue offices, and Andhra Pradesh procedure since{" "}
            {site.advocate.practisingSince}, over {YEARS} years of direct advocacy. Enrolled with the Bar Council of
            Andhra Pradesh in {site.advocate.barCouncilYear}, Adv. S. Nagendra Naik appears regularly before the
            Tahsildar, RDO, District Courts, and the Andhra Pradesh High Court.
          </p>
          <p className="mt-4 max-w-[60ch] text-base leading-7 text-ink-2 md:text-lg md:leading-8">
            Clients work directly with the advocate from first assessment through filing, hearing, and compliance, with
            thorough preparation on revenue records, title documents, and procedural filings before every court or
            administrative proceeding.
          </p>
          <ul className="m-0 mt-6 grid list-none gap-2.5 p-0">
            {["B.A., LL.B.", "Bar Council of Andhra Pradesh", "Revenue & land record disputes before Tahsildar, RDO", "Civil, criminal, family & consumer matters"].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-base text-ink-2">
                <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-ink" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={80}>
          <div id="courts" className="rounded-3xl bg-paper-2 p-6 md:p-8">
            <h2 className="font-display text-3xl leading-tight text-ink md:text-4xl">Forums we appear before</h2>
            <p className="mt-3 text-base text-muted">
              Where your case is actually decided, from revenue offices to the High Court.
            </p>
            <ol className="m-0 mt-6 list-none border-t border-ink p-0">
              {courtMatrix.map((court, i) => (
                <li key={court} className="flex items-baseline gap-4 border-b border-rule py-3.5 text-base text-ink-2">
                  <span className="w-7 shrink-0 text-sm text-muted tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  {court}
                </li>
              ))}
            </ol>
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
  return (
    <section id="process" className="mx-auto max-w-[1240px] px-5 pb-16 md:px-8 md:pb-24">
      <Reveal>
        <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] tracking-[var(--tracking-display)] text-ink !max-w-[18ch]">
          A structured approach, from first document to hearing.
        </h2>
      </Reveal>
      <ol className="m-0 mt-10 grid list-none gap-3 p-0 sm:grid-cols-2 md:gap-4 lg:grid-cols-4">
        {processSteps.map((step, i) => {
          const Icon = processIcons[i] ?? FileText;
          return (
            <li key={step.title} className="contents">
              <Reveal delay={i * 70} className="flex flex-col rounded-3xl bg-paper-2 p-6 md:p-7">
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
  const rows: { icon: LucideIcon; label: string; value: string; href: string; event: string; external?: boolean }[] = [
    { icon: Phone, label: "Phone", value: site.contact.phoneDisplay, href: phoneHref, event: "call_click" },
    { icon: Mail, label: "Email", value: site.contact.email, href: emailHref, event: "email_click" },
    { icon: MapPin, label: "Office", value: site.contact.office, href: mapHref, event: "map_click", external: true },
  ];

  return (
    <section id="contact" className="mx-auto max-w-[1240px] px-5 pb-16 md:px-8 md:pb-24">
      <Reveal>
        <div
          className="overflow-hidden rounded-[28px] bg-ink bg-cover bg-center px-6 py-12 text-white md:px-14 md:py-20"
          style={{ backgroundImage: "url(/contours-navy.svg)" }}
        >
          <h2 className="font-display text-[clamp(2.25rem,5.4vw,4.5rem)] leading-[1.02] tracking-[var(--tracking-display)] text-white !max-w-[18ch]">
            Discuss documents, forum strategy &amp; next steps.
          </h2>
          <p className="mt-5 max-w-[56ch] text-base leading-7 text-white/80 md:text-lg">
            Share the facts directly with Adv. S. Nagendra Naik. Get a clear assessment of court route, document gaps,
            urgency, and expected next steps for Tahsildar appeals, RDO proceedings, Adangal corrections, mutations,
            and AP High Court writs.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={phoneHref}
              className="naga-button !bg-white !text-ink"
              onClick={() => trackEvent("call_click", { location: "contact" })}
            >
              Call {site.contact.phoneDisplay}
            </a>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="naga-button naga-button-whatsapp"
              onClick={() => trackEvent("whatsapp_click", { location: "contact" })}
            >
              WhatsApp us
            </a>
          </div>
        </div>
      </Reveal>

      <div className="mt-3 grid gap-3 md:mt-4 md:grid-cols-2 md:gap-4">
        <Reveal className="flex flex-col gap-3 md:gap-4">
          <div className="rounded-3xl bg-paper-2 p-6 md:p-8">
            <h3 className="font-display text-3xl leading-tight text-ink md:text-4xl">Contact the chambers</h3>
            <div className="mt-5 border-t border-ink">
              {rows.map((row) => {
                const Icon = row.icon;
                return (
                  <a
                    key={row.label}
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
          <IntakeForm />
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================
   Page
   ============================================ */

export function Landing() {
  return (
    <div className="bg-paper">
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Expertise />
        <Advocate />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}
