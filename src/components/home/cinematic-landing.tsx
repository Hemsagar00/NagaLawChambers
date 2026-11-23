"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  MapPin,
  Menu,
  Phone,
  Scale,
  X,
} from "lucide-react";

import {
  about,
  courtMatrix,
  credentials,
  hero,
  navLinks,
  practiceAreas,
  processSteps,
  stats,
} from "@/lib/content";
import { locationPages, practicePages } from "@/lib/local-seo";
import { emailHref, mapHref, phoneHref, site } from "@/lib/site";
import { buildWhatsappHref } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { CountUp } from "@/components/motion/count-up";
import { ForumList } from "@/components/motion/forum-list";
import { IntakeForm } from "@/components/conversion/intake-form";
import { MapEmbed } from "@/components/map-embed";
import { Testimonials } from "@/components/testimonials";
import { SiteFooter } from "@/components/layout/site-footer";

const EASE = [0.16, 1, 0.3, 1] as const;

const PRACTICE_MEDIA: Record<string, { src: string; alt: string }> = {
  "revenue-land": {
    src: "/revenue-land.jpg",
    alt: "Cadastral survey maps, archival land title deeds, and brass dividers on a walnut chambers desk",
  },
  "civil-contract": {
    src: "/civil-contract.jpg",
    alt: "Legal contract parchment with crimson wax seal and brass scales of justice",
  },
  "bail-criminal": {
    src: "/criminal-defence.jpg",
    alt: "Bronze statue of Lady Justice holding balanced scales and sword in dark chambers lighting",
  },
};

function getPracticeSlug(practiceId: string): string {
  return (
    practicePages.find((p) => p.practiceId === practiceId)?.slug ??
    "revenue-land-lawyer-anantapur"
  );
}

export function CinematicLanding() {
  const reduce = useReducedMotion();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const featuredRevenue = practiceAreas[0];
  const featuredCivil = practiceAreas[1];
  const featuredCriminal = practiceAreas[2];
  const secondaryAreas = practiceAreas.slice(3);

  return (
    <div className="cine-shell">
      {/* Top Bar Contract: [Brand wordmark] — [4 nav links] — [1 primary action] */}
      <header className="site-header">
        <div className="naga-container">
          <div className="flex min-h-[68px] items-center justify-between gap-8">
            <Link
              href="/"
              className="inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap text-lg text-[#f3f1ea] no-underline"
              aria-label="NAGA Law Chambers home"
            >
              <Scale
                className="h-5 w-5 shrink-0 text-[#ff3b1d]"
                aria-hidden="true"
              />
              <span className="cine-display text-xl tracking-[0.03em]">
                NAGA Law Chambers
              </span>
            </Link>

            <nav
              aria-label="Primary"
              className="hidden items-center gap-7 md:flex"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="shrink-0 whitespace-nowrap text-sm font-medium text-[#c9c6be] no-underline transition-colors duration-200 hover:text-[#f3f1ea] hover:underline hover:decoration-2 hover:underline-offset-8"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex shrink-0 items-center gap-3">
              <a
                href="#contact"
                onClick={() =>
                  trackEvent("cta_click", { location: "header_book" })
                }
                className="hidden shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-[#c92810] px-5 py-2.5 text-sm font-medium text-[#f3f1ea] no-underline transition-colors duration-200 hover:bg-[#df3015] md:inline-flex"
              >
                {hero.ctaPrimary}
              </a>

              <button
                type="button"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#111114] text-[#f3f1ea] md:hidden"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Menu className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {mobileMenuOpen ? (
            <div className="border-t border-white/10 pb-5 pt-3 md:hidden">
              <nav aria-label="Mobile" className="grid gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex min-h-11 items-center text-base font-medium text-[#f3f1ea] no-underline"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-2 inline-flex min-h-12 items-center justify-center rounded-full bg-[#c92810] px-5 text-sm font-medium text-[#f3f1ea] no-underline"
                >
                  {hero.ctaPrimary}
                </a>
              </nav>
            </div>
          ) : null}
        </div>
      </header>

      <main id="main">
        {/* Hero Section: Editorial 2-column split + full-width credentials strip */}
        <section className="pb-16 pt-12 md:pb-24 md:pt-16">
          <div className="naga-container">
            <div className="grid items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: EASE }}
                className="flex flex-col justify-between lg:col-span-6"
              >
                <div>
                  <p className="text-sm font-medium tracking-[0.02em] text-[#98968f]">
                    <span>{site.advocate.barCouncil}</span>
                    <span className="mx-2 text-[#ff3b1d]" aria-hidden="true">
                      ·
                    </span>
                    <span>Enrolled {site.advocate.barCouncilYear}</span>
                    <span className="mx-2 text-[#ff3b1d]" aria-hidden="true">
                      ·
                    </span>
                    <span>Anantapur Bar</span>
                  </p>

                  <h1 className="cine-display mt-5 max-w-[13ch] text-[clamp(3.1rem,6.4vw,5.6rem)] text-[#f3f1ea]">
                    Defending Land, Legacy &amp; Rights.
                  </h1>

                  <p className="mt-6 max-w-[52ch] text-base leading-[1.7] text-[#c9c6be] sm:text-lg">
                    {hero.description}
                  </p>

                  <div className="mt-9 flex flex-wrap items-center gap-6">
                    <a
                      href="#contact"
                      onClick={() =>
                        trackEvent("cta_click", { location: "hero_primary" })
                      }
                      className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-[#c92810] px-7 py-3 text-sm font-semibold text-[#f3f1ea] no-underline transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#df3015]"
                    >
                      <span>{hero.ctaPrimary}</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>

                    <a
                      href={phoneHref}
                      onClick={() =>
                        trackEvent("call_click", { location: "hero_phone" })
                      }
                      className="inline-flex min-h-11 shrink-0 items-center gap-2 whitespace-nowrap text-sm font-medium text-[#f3f1ea] underline decoration-white/30 underline-offset-8 transition-colors hover:decoration-[#ff3b1d]"
                    >
                      <Phone
                        className="h-4 w-4 text-[#ff3b1d]"
                        aria-hidden="true"
                      />
                      <span className="tabular-nums">
                        {site.contact.phoneDisplay}
                      </span>
                    </a>
                  </div>
                </div>

                <div className="mt-10 border-t border-white/10 pt-5 text-sm text-[#98968f]">
                  <span>Chambers near Sub Registrar Office, Kovur Nagar, Anantapur</span>
                  <span className="mx-2" aria-hidden="true">
                    ·
                  </span>
                  <span>Direct Advocate Representation</span>
                </div>
              </motion.div>

              {/* Dominant Visual Carrier: High Court elevation with advocate portrait frame */}
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
                className="relative lg:col-span-6"
              >
                <div className="cine-media-frame relative min-h-[380px] w-full lg:h-full lg:min-h-[500px]">
                  <Image
                    src="/high-court.jpg"
                    alt="High Court of Andhra Pradesh architectural front elevation at twilight"
                    fill
                    priority
                    referrerPolicy="no-referrer"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/35 to-transparent"
                    aria-hidden="true"
                  />

                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7">
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-xl border border-white/20 bg-[#17171b]">
                        <Image
                          src="/advocate.jpg"
                          alt={`Advocate ${site.advocate.name}`}
                          fill
                          referrerPolicy="no-referrer"
                          sizes="56px"
                          className="object-cover object-top"
                        />
                      </div>
                      <div>
                        <p className="text-base font-semibold text-[#f3f1ea]">
                          Advocate {site.advocate.name}
                        </p>
                        <p className="mt-0.5 text-xs text-[#c9c6be]">
                          B.A., LL.B. · Anantapur District Courts &amp; AP High Court
                        </p>
                      </div>
                    </div>

                    <a
                      href="#advocate"
                      className="hidden shrink-0 items-center gap-1.5 whitespace-nowrap text-xs font-medium text-[#f3f1ea] no-underline hover:text-[#ff6a3d] sm:inline-flex"
                    >
                      <span>Profile</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Full-Width 4-Column Proof Strip */}
            <div className="mt-12 grid grid-cols-2 border-y border-white/10 lg:grid-cols-4">
              {stats.map((item, idx) => (
                <div
                  key={item.label}
                  className={`py-6 ${
                    idx % 2 === 1 ? "pl-6" : "pr-6"
                  } lg:px-6 lg:first:pl-0 lg:last:pr-0 ${
                    idx > 0 ? "lg:border-l lg:border-white/10" : ""
                  } ${idx >= 2 ? "border-t border-white/10 lg:border-t-0" : ""}`}
                >
                  <p className="cine-display text-3xl tabular-nums text-[#f3f1ea] sm:text-4xl">
                    <CountUp value={item.value} />
                  </p>
                  <p className="mt-1.5 text-sm text-[#98968f]">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Practice Areas — Asymmetric Editorial Bento Grid */}
        <section id="practice" className="border-t border-white/10 py-20 md:py-28">
          <div className="naga-container">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <p className="text-sm font-medium text-[#ff6a3d]">
                  Practice Areas
                </p>
                <h2 className="cine-display mt-3 max-w-[18ch] text-[clamp(2.2rem,4vw,3.75rem)] text-[#f3f1ea]">
                  Focused representation across five core jurisdictions.
                </h2>
              </div>
              <p className="max-w-[44ch] text-sm leading-[1.7] text-[#c9c6be] sm:text-base">
                Every brief begins with a forensic document audit before selecting
                the statutory forum — from local Tahsildar offices to writ
                petitions at Amaravati.
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-12">
              {/* 01. Revenue & Land (Marquee 7-col card) */}
              <Link
                href={`/practice/${getPracticeSlug(featuredRevenue.id)}`}
                className="cine-card-link group min-h-[380px] no-underline lg:col-span-7"
              >
                <div className="relative h-60 w-full overflow-hidden bg-[#17171b] sm:h-72">
                  <Image
                    src={PRACTICE_MEDIA[featuredRevenue.id].src}
                    alt={PRACTICE_MEDIA[featuredRevenue.id].alt}
                    fill
                    referrerPolicy="no-referrer"
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#111114] via-[#111114]/35 to-transparent"
                    aria-hidden="true"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-xs font-medium text-[#98968f]">
                        01 · {featuredRevenue.courts}
                      </p>
                      <ArrowUpRight
                        className="h-4 w-4 shrink-0 text-[#c9c6be] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#ff3b1d]"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="cine-display mt-3 text-3xl text-[#f3f1ea]">
                      {featuredRevenue.title}
                    </h3>
                    <p className="mt-3 max-w-[54ch] text-sm leading-[1.7] text-[#c9c6be] sm:text-base">
                      {featuredRevenue.summary}
                    </p>
                  </div>
                  <p className="mt-6 border-t border-white/10 pt-4 text-xs text-[#98968f]">
                    {featuredRevenue.hoverDetail}
                  </p>
                </div>
              </Link>

              {/* 02. Civil & Contract (5-col card) */}
              <Link
                href={`/practice/${getPracticeSlug(featuredCivil.id)}`}
                className="cine-card-link group min-h-[380px] no-underline lg:col-span-5"
              >
                <div className="relative h-60 w-full overflow-hidden bg-[#17171b] sm:h-72">
                  <Image
                    src={PRACTICE_MEDIA[featuredCivil.id].src}
                    alt={PRACTICE_MEDIA[featuredCivil.id].alt}
                    fill
                    referrerPolicy="no-referrer"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#111114] via-[#111114]/35 to-transparent"
                    aria-hidden="true"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-xs font-medium text-[#98968f]">
                        02 · {featuredCivil.courts}
                      </p>
                      <ArrowUpRight
                        className="h-4 w-4 shrink-0 text-[#c9c6be] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#ff3b1d]"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="cine-display mt-3 text-3xl text-[#f3f1ea]">
                      {featuredCivil.title}
                    </h3>
                    <p className="mt-3 text-sm leading-[1.7] text-[#c9c6be] sm:text-base">
                      {featuredCivil.summary}
                    </p>
                  </div>
                  <p className="mt-6 border-t border-white/10 pt-4 text-xs text-[#98968f]">
                    {featuredCivil.hoverDetail}
                  </p>
                </div>
              </Link>

              {/* 03. Bail & Criminal (5-col card) */}
              <Link
                href={`/practice/${getPracticeSlug(featuredCriminal.id)}`}
                className="cine-card-link group no-underline lg:col-span-5"
              >
                <div className="relative h-56 w-full overflow-hidden bg-[#17171b]">
                  <Image
                    src={PRACTICE_MEDIA[featuredCriminal.id].src}
                    alt={PRACTICE_MEDIA[featuredCriminal.id].alt}
                    fill
                    referrerPolicy="no-referrer"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#111114] via-[#111114]/35 to-transparent"
                    aria-hidden="true"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-xs font-medium text-[#98968f]">
                        03 · {featuredCriminal.courts}
                      </p>
                      <ArrowUpRight
                        className="h-4 w-4 shrink-0 text-[#c9c6be] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#ff3b1d]"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="cine-display mt-3 text-3xl text-[#f3f1ea]">
                      {featuredCriminal.title}
                    </h3>
                    <p className="mt-3 text-sm leading-[1.7] text-[#c9c6be]">
                      {featuredCriminal.summary}
                    </p>
                  </div>
                  <p className="mt-6 border-t border-white/10 pt-4 text-xs text-[#98968f]">
                    {featuredCriminal.hoverDetail}
                  </p>
                </div>
              </Link>

              {/* 04 & 05: Family & Partition + Consumer Forums (7-col editorial panel) */}
              <div className="grid gap-6 lg:col-span-7">
                {secondaryAreas.map((area, index) => (
                  <Link
                    key={area.id}
                    href={`/practice/${getPracticeSlug(area.id)}`}
                    className="cine-card-link group justify-between p-6 no-underline sm:p-8"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-xs font-medium text-[#98968f]">
                          {String(index + 4).padStart(2, "0")} · {area.courts}
                        </p>
                        <ArrowUpRight
                          className="h-4 w-4 shrink-0 text-[#c9c6be] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#ff3b1d]"
                          aria-hidden="true"
                        />
                      </div>
                      <h3 className="cine-display mt-3 text-2xl text-[#f3f1ea] sm:text-3xl">
                        {area.title}
                      </h3>
                      <p className="mt-3 max-w-[58ch] text-sm leading-[1.7] text-[#c9c6be] sm:text-base">
                        {area.summary}
                      </p>
                    </div>
                    <p className="mt-5 border-t border-white/10 pt-4 text-xs text-[#98968f]">
                      {area.hoverDetail}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Advocate Profile & Process */}
        <section id="advocate" className="border-t border-white/10 py-20 md:py-28">
          <div className="naga-container">
            <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <div className="cine-media-frame relative aspect-[3/4] w-full max-w-[440px]">
                  <Image
                    src="/advocate.jpg"
                    alt={`Portrait of Advocate ${site.advocate.name}, NAGA Law Chambers`}
                    fill
                    referrerPolicy="no-referrer"
                    sizes="(max-width: 1024px) 100vw, 440px"
                    className="object-cover object-top"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#08080a]/85 via-transparent to-transparent"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-base font-semibold text-[#f3f1ea]">
                      Advocate {site.advocate.name}
                    </p>
                    <p className="mt-1 text-xs text-[#c9c6be]">
                      B.A., LL.B. · Bar Council of Andhra Pradesh ({site.advocate.barCouncilYear})
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <p className="text-sm font-medium text-[#ff6a3d]">
                  Advocate Profile
                </p>
                <h2 className="cine-display mt-3 text-[clamp(2.2rem,4vw,3.75rem)] text-[#f3f1ea]">
                  {about.title}
                </h2>
                <p className="mt-4 max-w-[54ch] text-lg leading-[1.6] text-[#f3f1ea]">
                  {about.subtitle}
                </p>

                <div className="mt-6 grid gap-4 text-base leading-[1.8] text-[#c9c6be]">
                  {about.paragraphs.map((para) => (
                    <p key={para.slice(0, 28)}>{para}</p>
                  ))}
                </div>

                <ul className="mt-8 grid border-t border-white/10 sm:grid-cols-2 sm:gap-x-8">
                  {credentials.map((cred) => (
                    <li
                      key={cred}
                      className="border-b border-white/10 py-3.5 text-sm font-medium text-[#f3f1ea]"
                    >
                      {cred}
                    </li>
                  ))}
                </ul>

                {/* Method from first document to hearing */}
                <div className="mt-12">
                  <h3 className="cine-display text-2xl text-[#f3f1ea] sm:text-3xl">
                    Method from first document to hearing
                  </h3>
                  <ol className="mt-6 grid gap-6 sm:grid-cols-2">
                    {processSteps.map((step, i) => (
                      <li
                        key={step.title}
                        className="border-t border-white/15 pt-4"
                      >
                        <p className="text-xs font-medium tabular-nums text-[#ff6a3d]">
                          {String(i + 1).padStart(2, "0")}. {step.title}
                        </p>
                        <p className="mt-2 text-sm leading-[1.7] text-[#c9c6be]">
                          {step.body}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Courts & Jurisdictional Route */}
        <section id="courts" className="border-t border-white/10 py-20 md:py-28">
          <div className="naga-container">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <p className="text-sm font-medium text-[#ff6a3d]">
                  Jurisdiction &amp; Forums
                </p>
                <h2 className="cine-display mt-3 text-[clamp(2.2rem,4vw,3.5rem)] text-[#f3f1ea]">
                  From Tahsildar offices to the Andhra Pradesh High Court.
                </h2>
                <p className="mt-5 max-w-[44ch] text-base leading-[1.75] text-[#c9c6be]">
                  Revenue disputes, civil trials, criminal bail, and appellate
                  writs move across distinct statutory tiers. Chambers represent
                  clients across Anantapur district, Dharmavaram, and statewide
                  at Amaravati.
                </p>

                <div className="mt-8 border-t border-white/10 pt-6">
                  <p className="text-xs font-medium text-[#98968f]">
                    Dedicated regional coverage
                  </p>
                  <div className="mt-3 flex flex-wrap gap-6">
                    {locationPages.map((loc) => (
                      <Link
                        key={loc.slug}
                        href={`/locations/${loc.slug}`}
                        className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-[#f3f1ea] underline decoration-white/25 underline-offset-8 transition-colors hover:text-[#ff6a3d] hover:decoration-[#ff6a3d]"
                      >
                        <span>{loc.city} Chambers &amp; Courts</span>
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <ForumList items={courtMatrix} />
              </div>
            </div>
          </div>
        </section>

        {/* Consented Testimonials (hidden automatically while array is empty) */}
        <Testimonials />

        {/* Section 5: Direct Consultation & Chambers Contact */}
        <section id="contact" className="border-t border-white/10 py-20 md:py-28">
          <div className="naga-container">
            <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-6">
                <p className="text-sm font-medium text-[#ff6a3d]">
                  Direct Consultation
                </p>
                <h2 className="cine-display mt-3 max-w-[18ch] text-[clamp(2.2rem,4vw,3.75rem)] text-[#f3f1ea]">
                  Discuss records, forum strategy &amp; next steps.
                </h2>
                <p className="mt-5 max-w-[52ch] text-base leading-[1.75] text-[#c9c6be]">
                  Share the facts directly with Advocate {site.advocate.name}.
                  Get a candid assessment of court routes, document gaps,
                  limitation timelines, and required filings.
                </p>

                <div className="mt-8 border-t border-white/10">
                  <a
                    href={phoneHref}
                    onClick={() =>
                      trackEvent("call_click", { location: "contact_panel" })
                    }
                    className="flex items-center justify-between gap-4 border-b border-white/10 py-4 text-[#f3f1ea] no-underline transition-colors hover:text-[#ff6a3d]"
                  >
                    <span className="inline-flex items-center gap-3 text-sm text-[#98968f]">
                      <Phone className="h-4 w-4 text-[#ff3b1d]" aria-hidden="true" />
                      Phone
                    </span>
                    <span className="text-base font-medium tabular-nums">
                      {site.contact.phoneDisplay}
                    </span>
                  </a>

                  <a
                    href={emailHref}
                    className="flex items-center justify-between gap-4 border-b border-white/10 py-4 text-[#f3f1ea] no-underline transition-colors hover:text-[#ff6a3d]"
                  >
                    <span className="inline-flex items-center gap-3 text-sm text-[#98968f]">
                      <Mail className="h-4 w-4 text-[#ff3b1d]" aria-hidden="true" />
                      Email
                    </span>
                    <span className="truncate text-sm font-medium sm:text-base">
                      {site.contact.email}
                    </span>
                  </a>

                  <a
                    href={mapHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start justify-between gap-6 border-b border-white/10 py-4 text-[#f3f1ea] no-underline transition-colors hover:text-[#ff6a3d]"
                  >
                    <span className="inline-flex shrink-0 items-center gap-3 text-sm text-[#98968f]">
                      <MapPin className="h-4 w-4 text-[#ff3b1d]" aria-hidden="true" />
                      Chambers
                    </span>
                    <span className="text-right text-sm leading-relaxed text-[#c9c6be]">
                      {site.contact.office}
                    </span>
                  </a>
                </div>

                <div className="mt-6 flex flex-wrap gap-4">
                  <a
                    href={buildWhatsappHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent("whatsapp_click", { location: "contact_panel" })
                    }
                    className="naga-button naga-button-whatsapp"
                  >
                    Message on WhatsApp
                  </a>
                </div>

                <div className="mt-8 h-64 sm:h-72">
                  <MapEmbed className="h-full" />
                </div>
              </div>

              <div className="lg:col-span-6">
                <IntakeForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
