import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail, MapPin, Phone, Scale } from "lucide-react";

import {
  courtMatrix,
  credentials,
  hero,
  navLinks,
  practiceAreas,
  processSteps,
} from "@/lib/content";
import { practicePages } from "@/lib/local-seo";
import { emailHref, mapHref, phoneHref, site } from "@/lib/site";
import { buildWhatsappHref } from "@/lib/whatsapp";
import { te, teAreas, teCourts, teSteps, type Locale } from "@/lib/home-copy";
import { IntakeForm } from "@/components/conversion/intake-form";
import { MapEmbed } from "@/components/map-embed";
import { SiteFooter } from "@/components/layout/site-footer";

function getPracticeSlug(practiceId: string): string {
  return (
    practicePages.find((p) => p.practiceId === practiceId)?.slug ??
    "revenue-land-lawyer-anantapur"
  );
}

/**
 * Localized landing page used by /te (Telugu) and optional English fallback.
 */
export function Landing({ locale = "en" }: { locale?: Locale }) {
  const isTe = locale === "te";
  const T = isTe ? te : null;
  const years = new Date().getFullYear() - site.advocate.practisingSince;

  const links = T ? T.nav : navLinks;
  const courts = T ? teCourts : courtMatrix;
  const steps = T ? teSteps : processSteps;

  return (
    <div className="cine-shell" lang={locale}>
      <header className="site-header">
        <div className="naga-container">
          <div className="flex min-h-[68px] items-center justify-between gap-8">
            <Link
              href={isTe ? "/te" : "/"}
              className="inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap text-lg text-[#f3f1ea] no-underline"
              aria-label={T ? T.home : "NAGA Law Chambers home"}
            >
              <Scale
                className="h-5 w-5 shrink-0 text-[#ff3b1d]"
                aria-hidden="true"
              />
              <span className="cine-display text-xl tracking-[0.03em]">
                NAGA Law Chambers
              </span>
            </Link>

            <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="shrink-0 whitespace-nowrap text-sm font-medium text-[#c9c6be] no-underline transition-colors hover:text-[#f3f1ea]"
                >
                  {link.label}
                </a>
              ))}
              {T ? (
                <Link
                  href={T.langSwitch.href}
                  lang={T.langSwitch.lang}
                  className="shrink-0 whitespace-nowrap text-sm font-medium text-[#ff6a3d] no-underline hover:underline"
                >
                  {T.langSwitch.label}
                </Link>
              ) : null}
            </nav>

            <a
              href="#contact"
              className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-[#c92810] px-5 py-2.5 text-sm font-medium text-[#f3f1ea] no-underline transition-colors hover:bg-[#df3015]"
            >
              {T ? T.book : hero.ctaPrimary}
            </a>
          </div>
        </div>
      </header>

      <main id="main">
        {/* Hero */}
        <section className="pb-16 pt-12 md:pb-24 md:pt-16">
          <div className="naga-container grid items-stretch gap-10 lg:grid-cols-12">
            <div className="flex flex-col justify-center lg:col-span-7">
              <p className="text-sm font-medium text-[#98968f]">
                {T ? T.hero.eyebrow : hero.eyebrow}
              </p>
              <h1 className="cine-display mt-4 text-[clamp(2.5rem,5.5vw,4.75rem)] text-[#f3f1ea]">
                {T ? `${T.hero.h1a} ${T.hero.h1b}` : hero.headline.join(" ")}
              </h1>
              <p className="mt-6 max-w-[52ch] text-base leading-[1.75] text-[#c9c6be] sm:text-lg">
                {T ? T.hero.sentence : hero.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-6">
                <a
                  href="#contact"
                  className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-[#c92810] px-7 py-3 text-sm font-semibold text-[#f3f1ea] no-underline hover:bg-[#df3015]"
                >
                  <span>{T ? T.book : hero.ctaPrimary}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={phoneHref}
                  className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[#f3f1ea] underline underline-offset-8"
                >
                  <Phone className="h-4 w-4 text-[#ff3b1d]" aria-hidden="true" />
                  <span className="tabular-nums">{site.contact.phoneDisplay}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="cine-media-frame relative aspect-[3/4] w-full max-w-[400px] lg:ml-auto">
                <Image
                  src="/advocate.jpg"
                  alt={T ? T.hero.cardName : `Advocate ${site.advocate.name}`}
                  fill
                  priority
                  referrerPolicy="no-referrer"
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover object-top"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#08080a]/90 via-transparent to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-base font-semibold text-[#f3f1ea]">
                    {T ? T.hero.cardName : site.advocate.name}
                  </p>
                  <p className="mt-1 text-xs text-[#c9c6be]">
                    {T ? T.hero.card : "B.A., LL.B. · Anantapur Bar"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Practice Areas */}
        <section id="practice" className="border-t border-white/10 py-16 md:py-24">
          <div className="naga-container">
            <h2 className="cine-display text-[clamp(2rem,3.6vw,3.25rem)] text-[#f3f1ea]">
              {T ? T.expertise.heading : "Practice Areas"}
            </h2>
            {T ? (
              <p className="mt-4 max-w-[60ch] text-base leading-[1.75] text-[#c9c6be]">
                {T.expertise.intro}
              </p>
            ) : null}

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {practiceAreas.map((area, idx) => {
                const localized = T ? teAreas[area.id] : null;
                return (
                  <Link
                    key={area.id}
                    href={`/practice/${getPracticeSlug(area.id)}`}
                    className="cine-card-link group justify-between p-6 no-underline"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs text-[#98968f]">
                          {String(idx + 1).padStart(2, "0")} ·{" "}
                          {localized?.courts ?? area.courts}
                        </span>
                        <ArrowUpRight
                          className="h-4 w-4 text-[#c9c6be] group-hover:text-[#ff3b1d]"
                          aria-hidden="true"
                        />
                      </div>
                      <h3 className="mt-3 text-xl font-semibold text-[#f3f1ea]">
                        {localized?.title ?? area.title}
                      </h3>
                      <p className="mt-3 text-sm leading-[1.75] text-[#c9c6be]">
                        {localized?.summary ?? area.summary}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Advocate & Process */}
        <section id="advocate" className="border-t border-white/10 py-16 md:py-24">
          <div className="naga-container grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="text-sm font-medium text-[#ff6a3d]">
                {T ? T.advocate.label : "Advocate"}
              </p>
              <h2 className="cine-display mt-3 text-[clamp(2rem,3.6vw,3.25rem)] text-[#f3f1ea]">
                {T ? T.advocate.name : `Advocate ${site.advocate.name}`}
              </h2>
              <p className="mt-5 text-base leading-[1.8] text-[#c9c6be]">
                {T
                  ? T.advocate.p1(
                      site.advocate.practisingSince,
                      years,
                      site.advocate.barCouncilYear,
                    )
                  : hero.description}
              </p>
              {T ? (
                <p className="mt-4 text-base leading-[1.8] text-[#c9c6be]">
                  {T.advocate.p2}
                </p>
              ) : null}
              <ul className="mt-6 border-t border-white/10">
                {(T ? T.advocate.bullets : credentials).map((item) => (
                  <li
                    key={item}
                    className="border-b border-white/10 py-3 text-sm text-[#f3f1ea]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div id="courts" className="lg:col-span-6">
              <h3 className="cine-display text-2xl text-[#f3f1ea] sm:text-3xl">
                {T ? T.advocate.forumsTitle : "Forums Covered"}
              </h3>
              <ol className="mt-6 border-t border-white/15">
                {courts.map((forum, i) => (
                  <li
                    key={forum}
                    className="flex items-baseline gap-4 border-b border-white/10 py-3.5 text-sm text-[#c9c6be]"
                  >
                    <span className="tabular-nums text-[#ff6a3d]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{forum}</span>
                  </li>
                ))}
              </ol>

              <h3 className="cine-display mt-10 text-2xl text-[#f3f1ea]">
                {T ? T.process.heading : "Process"}
              </h3>
              <ol className="mt-5 grid gap-5 sm:grid-cols-2">
                {steps.map((step, i) => (
                  <li key={step.title} className="border-t border-white/10 pt-3">
                    <p className="text-xs font-medium text-[#ff6a3d]">
                      {String(i + 1).padStart(2, "0")}. {step.title}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#c9c6be]">
                      {step.body}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="border-t border-white/10 py-16 md:py-24">
          <div className="naga-container grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <h2 className="cine-display text-[clamp(2rem,3.6vw,3.25rem)] text-[#f3f1ea]">
                {T ? T.contact.heading : "Discuss your matter"}
              </h2>
              <p className="mt-4 text-base leading-[1.75] text-[#c9c6be]">
                {T ? T.contact.body : hero.description}
              </p>

              <div className="mt-8 border-t border-white/10">
                <a
                  href={phoneHref}
                  className="flex items-center justify-between border-b border-white/10 py-4 text-[#f3f1ea] no-underline"
                >
                  <span className="inline-flex items-center gap-2 text-sm text-[#98968f]">
                    <Phone className="h-4 w-4 text-[#ff3b1d]" aria-hidden="true" />
                    {T ? T.contact.phone : "Phone"}
                  </span>
                  <span className="tabular-nums">{site.contact.phoneDisplay}</span>
                </a>
                <a
                  href={emailHref}
                  className="flex items-center justify-between border-b border-white/10 py-4 text-[#f3f1ea] no-underline"
                >
                  <span className="inline-flex items-center gap-2 text-sm text-[#98968f]">
                    <Mail className="h-4 w-4 text-[#ff3b1d]" aria-hidden="true" />
                    {T ? T.contact.email : "Email"}
                  </span>
                  <span className="text-sm">{site.contact.email}</span>
                </a>
                <a
                  href={mapHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start justify-between gap-4 border-b border-white/10 py-4 text-[#f3f1ea] no-underline"
                >
                  <span className="inline-flex shrink-0 items-center gap-2 text-sm text-[#98968f]">
                    <MapPin className="h-4 w-4 text-[#ff3b1d]" aria-hidden="true" />
                    {T ? T.contact.office : "Office"}
                  </span>
                  <span className="text-right text-sm text-[#c9c6be]">
                    {site.contact.office}
                  </span>
                </a>
              </div>

              <div className="mt-6">
                <a
                  href={buildWhatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="naga-button naga-button-whatsapp"
                >
                  {T ? T.contact.whatsapp : "WhatsApp us"}
                </a>
              </div>

              <div className="mt-8 h-64">
                <MapEmbed className="h-full" />
              </div>
            </div>

            <div className="lg:col-span-6">
              <IntakeForm copy={T?.form} />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter locale={locale} />
    </div>
  );
}
