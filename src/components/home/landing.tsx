"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BadgeCheck, Mail, MapPin, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { CountUp } from "@/components/motion/count-up";
import { IntakeForm } from "@/components/conversion/intake-form";
import { MapEmbed } from "@/components/map-embed";
import { SiteFooter } from "@/components/layout/site-footer";
import { Testimonials } from "@/components/testimonials";
import {
  MaskedCard,
  useImageWidth,
  useIsMobile,
  useMaskPositions,
  useStaggeredReveal,
} from "@/components/home/masked";
import { courtMatrix, practiceAreas, processSteps } from "@/lib/content";
import { practicePages } from "@/lib/local-seo";
import { trackEvent } from "@/lib/analytics";
import { site, phoneHref, emailHref, mapHref } from "@/lib/site";

/* Shared mosaic backgrounds: contour maps drawn in code (scripts/make-mosaic.ts). */
const HERO_IMAGE = "/mosaic-light.svg";
const SECTION2_IMAGE = "/mosaic-dark.svg";
const ADVOCATE_PHOTO = "/advocate.jpg";

const YEARS = new Date().getFullYear() - site.advocate.practisingSince;

const featureBars = [
  "Revenue and Land Matters",
  "Civil, Criminal and Family",
  "Direct Access to the Advocate",
];

const NAV_LINKS = [
  { label: "Home", href: "#top" },
  { label: "Practice", href: "#practice" },
  { label: "Courts", href: "#courts" },
  { label: "Advocate", href: "#advocate" },
  { label: "Contact", href: "#contact" },
];

const serviceNames: Record<string, string> = {
  "revenue-land": "Revenue\n& Land",
  "civil-contract": "Civil &\nContract",
  "bail-criminal": "Bail &\nCriminal",
  "family-partition": "Family &\nPartition",
  "consumer-forums": "Consumer\nForums",
};

/* ============================================
   Splash screen
   ============================================ */

function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onComplete();
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    const interval = setInterval(() => {
      setCount((c) => {
        if (c >= 100) return c;
        return c + 1;
      });
    }, 20);
    timers.push(
      setTimeout(() => {
        clearInterval(interval);
        setCount(100);
        timers.push(setTimeout(() => setExiting(true), 200));
        timers.push(setTimeout(onComplete, 900));
      }, 2000),
    );
    return () => {
      clearInterval(interval);
      timers.forEach(clearTimeout);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-end justify-start bg-white transition-opacity duration-700 ${exiting ? "opacity-0" : "opacity-100"}`}
      aria-hidden="true"
    >
      <span className="p-6 text-7xl font-bold leading-none text-black tabular-nums md:p-10 md:text-9xl">
        {count}
      </span>
    </div>
  );
}

/* ============================================
   Navbar
   ============================================ */

function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const line =
    "absolute h-0.5 w-6 rounded-full bg-black transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)]";

  return (
    <>
      <nav
        aria-label="Primary"
        className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-white/80 px-4 py-2 backdrop-blur-md md:px-6 md:py-3"
      >
        <a href="#top" className="flex flex-col" aria-label="NAGA Law Chambers home">
          <span className="flex flex-col text-xl font-extrabold uppercase leading-none tracking-tight text-black md:text-2xl">
            <span>Naga</span>
            <span className="-mt-1.5 md:-mt-2">Law</span>
          </span>
          <span className="mt-1.5 text-[10px] font-medium leading-none text-black md:mt-2 md:text-[11px]">
            chambers, Anantapur
          </span>
        </a>

        <div className="hidden items-center gap-6 md:flex">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            className="rounded-full border border-black bg-white px-6 py-3 text-sm font-semibold transition-colors duration-200 hover:bg-black hover:text-white"
          >
            Menu
          </button>
          <a
            href={phoneHref}
            onClick={() => trackEvent("call_click", { location: "navbar" })}
            className="text-sm font-semibold text-black"
          >
            {site.contact.phoneDisplay}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
          aria-expanded={open}
          className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
        >
          <span className={`${line} ${open ? "translate-y-0 rotate-45" : "-translate-y-2"}`} />
          <span className={`${line} ${open ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"}`} />
          <span className={`${line} ${open ? "-rotate-45 translate-y-0" : "translate-y-2"}`} />
        </button>
      </nav>

      <div
        className={`fixed inset-0 z-40 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        role="dialog"
        aria-label="Navigation menu"
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`}
        />
        <div
          className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${open ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex h-full flex-col justify-center gap-1 px-8">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${100 + i * 60}ms` : "0ms" }}
                className={`text-4xl font-bold text-black transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] hover:text-neutral-500 ${open ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}
              >
                {link.label}
              </a>
            ))}
            <div
              style={{ transitionDelay: open ? "450ms" : "0ms" }}
              className={`mt-8 border-t border-neutral-200 pt-8 transition-all duration-500 ${open ? "opacity-100" : "opacity-0"}`}
            >
              <p className="mb-4 text-sm font-semibold text-black">Urgent matters, call {site.contact.phoneDisplay}</p>
              <a
                href="#contact"
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                className="block w-full rounded-full bg-black px-6 py-4 text-center text-sm font-semibold text-white transition-colors duration-200 hover:bg-neutral-800"
              >
                Book Consultation
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ============================================
   Section 1: hero
   ============================================ */

function Hero() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const reveal = useStaggeredReveal(4);
  const positions = useMaskPositions(sectionRef, cardRefs, 4);
  const imageWidth = useImageWidth(HERO_IMAGE, positions[0]?.sh ?? 0);
  const focalX = isMobile ? 0.7 : 0.8;

  return (
    <section
      id="top"
      ref={(el) => {
        sectionRef.current = el;
        reveal.containerRef.current = el;
      }}
      className="relative flex h-[calc(100svh-5rem)] w-full flex-col gap-1.5 overflow-hidden px-3 pb-1.5 pt-24 md:h-screen md:gap-2 md:px-5 md:pb-2 md:pt-24"
    >
      {featureBars.map((label, i) => (
        <MaskedCard
          key={label}
          bgImage={HERO_IMAGE}
          position={positions[i]}
          imageWidth={imageWidth}
          focalX={focalX}
          cardRef={(el) => {
            cardRefs.current[i] = el;
          }}
          style={reveal.getAnimStyle(i)}
          className="relative h-14 w-full shrink-0 overflow-hidden rounded-xl md:h-20 md:rounded-2xl"
        >
          <span className="relative z-10 flex h-full items-center justify-center text-center text-lg font-bold text-black md:text-3xl">
            {label}
          </span>
        </MaskedCard>
      ))}

      <MaskedCard
        bgImage={HERO_IMAGE}
        position={positions[3]}
        imageWidth={imageWidth}
        focalX={focalX}
        cardRef={(el) => {
          cardRefs.current[3] = el;
        }}
        style={reveal.getAnimStyle(3)}
        className="relative min-h-0 w-full flex-1 overflow-hidden rounded-xl md:rounded-2xl"
      >
        <p className="absolute left-4 top-4 z-10 max-w-[200px] text-xs font-semibold leading-4 text-black md:left-7 md:top-7 md:max-w-[300px] md:text-sm md:leading-5">
          Direct representation before revenue offices
          <br className="hidden md:block" /> and Anantapur district courts.
        </p>

        <div className="absolute bottom-5 left-3 z-10 md:bottom-8 md:left-4">
          <span className="mb-1 block text-xs font-semibold text-black md:mb-2 md:text-sm">
            Advocate S. Nagendra Naik, Anantapur Bar
          </span>
          <h1 className="text-[clamp(2.4rem,9vw,9rem)] font-bold leading-[0.85] tracking-tight text-black">
            Defending land,
            <br />
            legacy &amp;
            <br />
            rights.
          </h1>
        </div>

        <a
          href={phoneHref}
          onClick={() => trackEvent("call_click", { location: "hero" })}
          className="absolute bottom-6 right-4 z-10 text-xs font-semibold text-black md:bottom-10 md:right-8 md:text-sm"
        >
          Call {site.contact.phoneDisplay}
        </a>
      </MaskedCard>
    </section>
  );
}

/* ============================================
   Section 2: practice areas
   ============================================ */

function PracticeGallery() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const reveal = useStaggeredReveal(4);
  const positions = useMaskPositions(sectionRef, cardRefs, 4);
  const imageWidth = useImageWidth(SECTION2_IMAGE, positions[0]?.sh ?? 0);
  const focalX = isMobile ? 0.65 : 0.8;
  const common = {
    bgImage: SECTION2_IMAGE,
    imageWidth,
    focalX,
    fallbackClass: "bg-neutral-900",
  };

  return (
    <section
      id="practice"
      ref={(el) => {
        sectionRef.current = el;
        reveal.containerRef.current = el;
      }}
      className="relative flex min-h-screen w-full flex-col gap-1.5 overflow-hidden px-3 pb-1.5 pt-1.5 md:h-screen md:gap-2 md:px-5 md:pb-2 md:pt-2"
    >
      <div className="grid min-h-0 flex-1 grid-cols-1 grid-rows-[auto_auto_auto_auto] gap-1.5 md:grid-cols-2 md:grid-rows-[1fr_1fr_0.8fr] md:gap-2">
        <MaskedCard
          {...common}
          position={positions[0]}
          cardRef={(el) => {
            cardRefs.current[0] = el;
          }}
          style={reveal.getAnimStyle(0)}
          className="relative min-h-[160px] overflow-hidden rounded-xl md:min-h-0 md:rounded-2xl"
        >
          <h2 className="absolute left-5 top-4 z-10 text-2xl font-bold text-white md:left-7 md:top-6 md:text-3xl">
            Practice Areas
          </h2>
          <p className="absolute bottom-4 left-5 z-10 text-xs font-semibold text-white md:bottom-6 md:left-7 md:text-sm">
            Revenue, civil, criminal, family and consumer matters
          </p>
        </MaskedCard>

        <MaskedCard
          {...common}
          position={positions[1]}
          cardRef={(el) => {
            cardRefs.current[1] = el;
          }}
          style={reveal.getAnimStyle(1)}
          className="relative min-h-[200px] overflow-hidden rounded-xl md:row-span-2 md:min-h-0 md:rounded-2xl"
        >
          <p className="absolute bottom-16 left-5 z-10 text-xs font-semibold leading-4 text-white md:bottom-20 md:left-7 md:text-sm md:leading-5">
            If you have a land or court matter,
            <br className="hidden md:block" /> call us to discuss your documents and next steps.
          </p>
          <a
            href={phoneHref}
            onClick={() => trackEvent("call_click", { location: "practice_section" })}
            className="absolute bottom-4 right-4 z-10 rounded-full bg-white px-5 py-3 text-base font-bold text-black transition-transform hover:scale-105 md:bottom-6 md:right-6 md:px-8 md:py-5 md:text-xl"
          >
            Call Us
          </a>
        </MaskedCard>

        <MaskedCard
          {...common}
          position={positions[2]}
          cardRef={(el) => {
            cardRefs.current[2] = el;
          }}
          style={reveal.getAnimStyle(2)}
          className="relative min-h-[160px] overflow-hidden rounded-xl md:min-h-0 md:rounded-2xl"
        >
          <p className="absolute left-5 top-4 z-10 text-[clamp(2.4rem,5.6vw,5rem)] font-bold leading-[0.9] text-white md:left-7 md:top-6">
            Tahsildar
            <br />
            to High Court
          </p>
        </MaskedCard>

        <MaskedCard
          {...common}
          position={positions[3]}
          cardRef={(el) => {
            cardRefs.current[3] = el;
          }}
          style={reveal.getAnimStyle(3)}
          className="relative min-h-[200px] overflow-hidden rounded-xl md:col-span-2 md:min-h-0 md:rounded-2xl"
        >
          <div className="absolute inset-0 z-10 flex flex-wrap gap-1.5 p-2 md:flex-nowrap md:gap-2 md:p-3">
            {practiceAreas.map((area, i) => {
              const page = practicePages.find((p) => p.practiceId === area.id);
              const active = i === 0;
              const inner = (
                <>
                  <h3
                    className={`whitespace-pre-line text-xl font-bold leading-[1.05] md:text-4xl ${active ? "text-black" : "text-white"}`}
                  >
                    {serviceNames[area.id] ?? area.title}
                  </h3>
                  <span
                    className={`flex h-8 w-8 items-center justify-center self-end rounded-full border text-xs font-semibold md:h-12 md:w-12 md:text-sm ${active ? "border-black text-black" : "border-white text-white"}`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </>
              );
              const cls = `flex min-w-[calc(50%-4px)] flex-1 flex-col justify-between rounded-xl p-3 md:min-w-0 md:rounded-2xl md:p-5 ${active ? "bg-white/90 backdrop-blur-md" : "bg-white/20 backdrop-blur-xl"}`;
              return page ? (
                <Link key={area.id} href={`/practice/${page.slug}`} className={cls}>
                  {inner}
                </Link>
              ) : (
                <div key={area.id} className={cls}>
                  {inner}
                </div>
              );
            })}
          </div>
        </MaskedCard>
      </div>
    </section>
  );
}

/* ============================================
   Section 3: courts and process
   ============================================ */

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className={`rotate-[-45deg] ${className}`}
      aria-hidden="true"
    >
      <path
        d="M1 7h12m0 0L8 2m5 5L8 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CourtsSection() {
  const reveal = useStaggeredReveal(4);

  return (
    <section
      id="courts"
      ref={(el) => {
        reveal.containerRef.current = el;
      }}
      className="flex min-h-screen w-full flex-col gap-1.5 px-3 pb-1.5 pt-1.5 md:gap-2 md:px-5 md:pb-2 md:pt-2"
    >
      <div className="grid flex-1 grid-cols-1 gap-1.5 md:grid-cols-2 md:gap-2">
        <div className="flex flex-col gap-1.5 md:gap-2">
          <div
            style={reveal.getAnimStyle(0)}
            className="flex min-h-[180px] flex-[1.2] flex-col justify-between rounded-xl bg-stone-50 p-5 md:min-h-0 md:rounded-2xl md:p-7"
          >
            <h2 className="text-[clamp(3rem,7vw,6.5rem)] font-bold leading-[0.95] text-black">
              Courts
              <br />
              &amp; Process
            </h2>
            <p className="text-xs font-semibold text-black md:text-sm">
              Where your case is actually decided
            </p>
          </div>

          <div
            style={reveal.getAnimStyle(1)}
            className="flex min-h-[140px] flex-1 gap-1.5 md:min-h-[300px] md:gap-2"
          >
            <div className="flex-1 rounded-xl bg-white p-4 ring-1 ring-black/10 md:rounded-2xl md:p-5">
              <h3 className="mb-2 text-sm font-bold text-black">Forums covered</h3>
              <ul className="m-0 grid list-none gap-1.5 p-0 text-xs leading-4 text-neutral-700 md:text-[13px] md:leading-[18px]">
                {courtMatrix.map((court) => (
                  <li key={court}>{court}</li>
                ))}
              </ul>
            </div>
            <div className="flex-1 rounded-xl bg-white p-4 ring-1 ring-black/10 md:rounded-2xl md:p-5">
              <h3 className="mb-2 text-sm font-bold text-black">How we work</h3>
              <ol className="m-0 grid list-none gap-1.5 p-0 text-xs leading-4 text-neutral-700 md:text-[13px] md:leading-[18px]">
                {processSteps.map((step, i) => (
                  <li key={step.title}>
                    <span className="font-semibold text-black">
                      {String(i + 1).padStart(2, "0")} {step.title}.
                    </span>{" "}
                    {step.body}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div
            style={reveal.getAnimStyle(2)}
            className="flex min-h-[160px] flex-[0.8] items-end justify-between rounded-xl bg-zinc-200 p-5 md:min-h-0 md:rounded-2xl md:p-7"
          >
            <div>
              <p className="mb-2 text-xs font-semibold text-black md:mb-3 md:text-sm">
                Consultation
              </p>
              <h3 className="text-xl font-bold leading-6 text-black md:text-3xl md:leading-8">
                Discuss
                <br />
                Documents &amp;
                <br />
                Next Steps
              </h3>
            </div>
            <a
              href="#contact"
              className="rounded-full bg-white px-5 py-3 text-base font-bold text-black transition-transform hover:scale-105 md:px-8 md:py-5 md:text-xl"
            >
              Book Consultation
            </a>
          </div>
        </div>

        <div
          style={reveal.getAnimStyle(3)}
          className="relative min-h-[350px] overflow-hidden rounded-xl md:min-h-0 md:rounded-2xl"
        >
          <Image
            src={ADVOCATE_PHOTO}
            alt="Advocate S. Nagendra Naik, NAGA Law Chambers, Anantapur Bar"
            fill
            sizes="(max-width: 767px) 100vw, 50vw"
            className="object-cover object-[72%_25%]"
          />
          <div className="absolute bottom-3 left-3 right-3 flex gap-1.5 md:bottom-5 md:left-5 md:right-5 md:gap-2">
            <a
              href="#advocate"
              className="flex h-36 flex-1 flex-col justify-between rounded-xl bg-white p-3 md:h-52 md:rounded-2xl md:p-5"
            >
              <h4 className="text-lg font-bold leading-5 text-black md:text-2xl md:leading-7">
                About the
                <br />
                Advocate
                <br />
                S. Nagendra Naik
              </h4>
              <span className="flex h-9 w-9 items-center justify-center self-end rounded-full border border-black md:h-12 md:w-12">
                <ArrowIcon />
              </span>
            </a>
            <a
              href="#contact"
              className="flex h-36 flex-1 flex-col justify-between rounded-xl bg-white/20 p-3 backdrop-blur-xl md:h-52 md:rounded-2xl md:p-5"
            >
              <h4 className="text-lg font-bold leading-5 text-white md:text-2xl md:leading-7">
                Contact
                <br />
                the
                <br />
                Chambers
              </h4>
              <span className="flex h-9 w-9 items-center justify-center self-end rounded-full border border-white md:h-12 md:w-12">
                <ArrowIcon className="text-white" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   Section 4: advocate and contact
   ============================================ */

function AdvocateContact() {
  const reveal = useStaggeredReveal(4);
  const rows: { icon: LucideIcon; label: string; value: string; href: string; event: string; external?: boolean }[] = [
    { icon: Phone, label: "Phone", value: site.contact.phoneDisplay, href: phoneHref, event: "call_click" },
    { icon: Mail, label: "Email", value: site.contact.email, href: emailHref, event: "email_click" },
    { icon: MapPin, label: "Office", value: site.contact.office, href: mapHref, event: "map_click", external: true },
  ];

  return (
    <section
      id="contact"
      ref={(el) => {
        reveal.containerRef.current = el;
      }}
      className="w-full px-3 pb-1.5 pt-1.5 md:px-5 md:pb-2 md:pt-2"
    >
      <div className="grid grid-cols-1 gap-1.5 md:grid-cols-2 md:gap-2">
        <div
          id="advocate"
          style={reveal.getAnimStyle(0)}
          className="rounded-xl bg-stone-50 p-5 md:rounded-2xl md:p-7"
        >
          <h2 className="text-[clamp(2.4rem,5vw,4.5rem)] font-bold leading-[0.95] text-black">
            Adv. S. Nagendra Naik
          </h2>
          <p className="mt-6 max-w-[60ch] text-sm leading-6 text-neutral-800 md:text-base md:leading-7">
            A practice rooted in Anantapur courts, revenue offices, and Andhra Pradesh procedure since{" "}
            {site.advocate.practisingSince}, over {YEARS} years of direct advocacy. Enrolled with the Bar Council of
            Andhra Pradesh in {site.advocate.barCouncilYear}, Adv. S. Nagendra Naik appears regularly before the
            Tahsildar, RDO, District Courts, and the Andhra Pradesh High Court.
          </p>
          <p className="mt-4 max-w-[60ch] text-sm leading-6 text-neutral-800 md:text-base md:leading-7">
            Clients work directly with the advocate from first assessment through filing, hearing, and compliance,
            with thorough preparation on revenue records, title documents, and procedural filings before every court
            or administrative proceeding.
          </p>
          <dl className="mt-8 grid grid-cols-2 gap-x-4 gap-y-6">
            {[
              { value: `${YEARS}+`, label: "Years of experience" },
              { value: String(site.advocate.barCouncilYear), label: "Bar Council enrolled" },
              { value: "Anantapur", label: "Bar Association" },
              { value: "Direct", label: "Advocate access" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col border-t border-black pt-3">
                <dt className="order-2 mt-1 text-xs text-neutral-600 md:text-sm">{item.label}</dt>
                <dd className="m-0 text-2xl font-bold tracking-tight text-black md:text-4xl">
                  <CountUp value={item.value} />
                </dd>
              </div>
            ))}
          </dl>
          <ul className="m-0 mt-8 grid list-none gap-2 p-0">
            {["B.A., LL.B.", "Bar Council of Andhra Pradesh", "Revenue & land record disputes before Tahsildar, RDO", "Civil, criminal, family & consumer matters"].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-neutral-800">
                <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div style={reveal.getAnimStyle(1)} className="rounded-xl bg-zinc-200 p-3 md:rounded-2xl md:p-4">
          <IntakeForm />
        </div>

        <div
          style={reveal.getAnimStyle(2)}
          className="rounded-xl bg-white p-5 ring-1 ring-black/10 md:rounded-2xl md:p-7"
        >
          <h2 className="text-2xl font-bold text-black md:text-4xl">Contact the chambers</h2>
          <div className="mt-5 border-t border-black">
            {rows.map((row) => {
              const Icon = row.icon;
              return (
                <a
                  key={row.label}
                  href={row.href}
                  onClick={() => trackEvent(row.event, { location: "contact_row" })}
                  {...(row.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="flex min-h-14 items-center gap-3 border-b border-neutral-200 py-3 hover:bg-neutral-50"
                >
                  <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                  <span>
                    <span className="block text-xs text-neutral-600">{row.label}</span>
                    <span className="block text-sm text-black md:text-base">{row.value}</span>
                  </span>
                </a>
              );
            })}
          </div>
        </div>

        <div style={reveal.getAnimStyle(3)} className="min-h-[300px] md:min-h-0">
          <MapEmbed className="h-full min-h-[300px] !rounded-xl md:!rounded-2xl" />
        </div>
      </div>
    </section>
  );
}

/* ============================================
   Page
   ============================================ */

export function Landing() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div className="bg-white">
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <Navbar />
      <main id="main">
        <Hero />
        <PracticeGallery />
        <CourtsSection />
        <Testimonials />
        <AdvocateContact />
      </main>
      <SiteFooter />
    </div>
  );
}
