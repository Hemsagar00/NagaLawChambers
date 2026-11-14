"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Lenis from "lenis";
import { site, phoneHref, emailHref, mapHref } from "@/lib/site";

const voicesData = [
  {
    quote: "When our 12-acre ancestral land was wrongfully reassigned and our pattadar passbook was blocked, Advocate Nagendra Naik dissected four decades of revenue records and secured an immediate stay from the RDO. His command of revenue law saved our family inheritance.",
    author: "K. Venkata Ramana",
    role: "Landowner & Farmer · Kadiri",
    origin: "Kadiri, Sri Sathya Sai District",
    tag: "Revenue & Passbook Mutation"
  },
  {
    quote: "In a high-stakes specific performance dispute where the other party attempted fraudulent third-party conveyance, Nagendra Naik moved the court and secured an ad-interim injunction within 48 hours. Decisive, swift, and completely candid.",
    author: "M. Sreedhar Reddy",
    role: "Commercial Developer · Anantapur",
    origin: "Commercial Real Estate, Anantapur",
    tag: "Specific Performance & Injunction"
  },
  {
    quote: "Partitioning complex joint family properties across three mandals seemed insurmountable until NAGA Law Chambers stepped in. He mapped every title deed and protected our legitimate share with meticulous courtroom strategy.",
    author: "Dr. Anand Murthy",
    role: "Family Estate Trustee · Dharmavaram",
    origin: "Family Estate, Dharmavaram",
    tag: "Family Partition & Civil Title"
  }
];

export function CinematicLanding() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeVoice, setActiveVoice] = useState(0);
  const [preloaderLoaded, setPreloaderLoaded] = useState(false);
  const [preloaderHidden, setPreloaderHidden] = useState(false);
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [voiceWordsRevealed, setVoiceWordsRevealed] = useState(true);

  const handleVoiceChange = (idx: number) => {
    if (activeVoice === idx) return;
    setVoiceWordsRevealed(false);
    setActiveVoice(idx);
    setTimeout(() => {
      setVoiceWordsRevealed(true);
    }, 40);
  };

  useEffect(() => {
    // 0) Lenis Smooth Scroll
    let lenis: Lenis | null = null;
    let lenisRafId: number;

    try {
      lenis = new Lenis({
        smoothWheel: true,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
      // @ts-expect-error attach lenis to window
      window.lenis = lenis;

      const lenisRaf = (time: number) => {
        lenis?.raf(time);
        lenisRafId = requestAnimationFrame(lenisRaf);
      };
      lenisRafId = requestAnimationFrame(lenisRaf);
    } catch {
      // Lenis fallback
    }

    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const targetEl = document.querySelector(href);
      if (targetEl) {
        e.preventDefault();
        setDrawerOpen(false);
        if (lenis) {
          lenis.scrollTo(targetEl as HTMLElement, { offset: 0, duration: 1.2 });
        } else {
          targetEl.scrollIntoView({ behavior: "smooth" });
        }
      }
    };
    document.addEventListener("click", handleAnchorClick);

    // 1) Preloader Animation (0 -> 100% counter + bar + curtain wipe)
    const countEl = document.getElementById("preloader-num");
    const barEl = document.getElementById("preloader-bar");
    const preloaderEl = document.getElementById("preloader");

    let frameId: number;
    let safetyTimer: ReturnType<typeof setTimeout>;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setPreloaderLoaded(true);
      setPreloaderHidden(true);
      setHeroRevealed(true);
      if (preloaderEl) {
        preloaderEl.classList.add("loaded");
        preloaderEl.style.display = "none";
      }
    } else {
      const start = performance.now();
      const duration = 1300; // 1.3s smooth load

      const stepPreloader = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const count = Math.floor(progress * 100);

        if (countEl) countEl.textContent = String(count);
        if (barEl) barEl.style.width = `${count}%`;

        if (progress < 1) {
          frameId = requestAnimationFrame(stepPreloader);
        } else {
          setTimeout(() => {
            setPreloaderLoaded(true);
            setHeroRevealed(true);
            if (preloaderEl) preloaderEl.classList.add("loaded");
            setTimeout(() => {
              setPreloaderHidden(true);
              if (preloaderEl) preloaderEl.style.display = "none";
            }, 950);
          }, 150);
        }
      };

      frameId = requestAnimationFrame(stepPreloader);

      // Absolute safety fallback: guarantee preloader dismissal after 2.5s
      safetyTimer = setTimeout(() => {
        setPreloaderLoaded(true);
        setHeroRevealed(true);
        if (preloaderEl) {
          preloaderEl.classList.add("loaded");
          setTimeout(() => {
            setPreloaderHidden(true);
            if (preloaderEl) preloaderEl.style.display = "none";
          }, 950);
        }
      }, 2500);
    }

    // 2) Intersection Observer for scroll reveal items & heading line-by-line
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");

            const innerLines = entry.target.querySelectorAll(".line-reveal-inner");
            innerLines.forEach((line, idx) => {
              setTimeout(() => {
                line.classList.add("revealed");
              }, idx * 90);
            });

            const counterEl = entry.target.querySelector("[data-count]");
            if (counterEl && !counterEl.getAttribute("data-animated")) {
              counterEl.setAttribute("data-animated", "true");
              const target = parseInt(counterEl.getAttribute("data-count") || "0", 10);
              const text = counterEl.textContent || "";
              const isPlus = text.includes("+");
              const isPercent = text.includes("%");
              let count = 0;
              const duration = 1200;
              const start = performance.now();

              const step = (now: number) => {
                const progress = Math.min((now - start) / duration, 1);
                const ease = 1 - Math.pow(1 - progress, 3);
                count = Math.floor(ease * target);
                counterEl.textContent = `${count}${isPlus ? "+" : ""}${isPercent ? "%" : ""}`;
                if (progress < 1) {
                  requestAnimationFrame(step);
                } else {
                  counterEl.textContent = `${target}${isPlus ? "+" : ""}${isPercent ? "%" : ""}`;
                }
              };
              requestAnimationFrame(step);
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal-item, .section, .contact-section").forEach((el) => observer.observe(el));

    // 3) Liquid displacement spring physics on practice cards
    const turb = document.getElementById("turb-filter");
    const disp = document.getElementById("disp-filter");

    let springRaf: number | null = null;
    if (turb && disp && window.innerWidth > 768) {
      let curScale = 1;
      let curFreq = 0.009;
      let targetScale = 1;
      let targetFreq = 0.009;
      let scaleVel = 0;
      let freqVel = 0;

      const stepLiquid = () => {
        const dt = 0.016;
        const k = 140;
        const d = 13;

        const fScale = -k * (curScale - targetScale) - d * scaleVel;
        scaleVel += fScale * dt;
        curScale += scaleVel * dt;

        const fFreq = -k * (curFreq - targetFreq) - d * freqVel;
        freqVel += fFreq * dt;
        curFreq += freqVel * dt;

        disp.setAttribute("scale", curScale.toFixed(2));
        turb.setAttribute("baseFrequency", curFreq.toFixed(4));

        if (Math.abs(curScale - targetScale) > 0.02 || Math.abs(scaleVel) > 0.02) {
          springRaf = requestAnimationFrame(stepLiquid);
        } else {
          curScale = targetScale;
          curFreq = targetFreq;
          disp.setAttribute("scale", curScale.toString());
          turb.setAttribute("baseFrequency", curFreq.toString());
          springRaf = null;
        }
      };

      const cards = document.querySelectorAll(".venture-card");
      const onEnter = () => {
        targetScale = 28;
        targetFreq = 0.022;
        if (!springRaf) springRaf = requestAnimationFrame(stepLiquid);
      };
      const onLeave = () => {
        targetScale = 1;
        targetFreq = 0.009;
        if (!springRaf) springRaf = requestAnimationFrame(stepLiquid);
      };

      cards.forEach((card) => {
        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);
      });
    }

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(safetyTimer);
      if (lenisRafId) cancelAnimationFrame(lenisRafId);
      if (springRaf) cancelAnimationFrame(springRaf);
      document.removeEventListener("click", handleAnchorClick);
      observer.disconnect();
      lenis?.destroy();
    };
  }, []);

  return (
    <div className="cinematic-root">
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <filter id="liquid-filter" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence id="turb-filter" type="fractalNoise" baseFrequency="0.009" numOctaves="2" result="noise" />
            <feDisplacementMap id="disp-filter" in="SourceGraphic" in2="noise" scale="1" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <div
        id="preloader"
        className={preloaderLoaded ? "loaded" : ""}
        style={preloaderHidden ? { display: "none" } : undefined}
        aria-hidden={preloaderLoaded ? "true" : "false"}
      >
        <div className="preloader-header">
          <div className="preloader-badge">
            <span className="preloader-dot"></span>
            <span>Anantapur Bar · Chambers Active</span>
          </div>
          <div>Advocate S. Nagendra Naik</div>
        </div>

        <div className="preloader-center">
          <div className="preloader-title">NAGA LAW CHAMBERS</div>
          <div className="preloader-count-wrap">
            <span id="preloader-num">0</span><span className="preloader-percent">%</span>
          </div>
          <div className="preloader-bar-wrap">
            <div className="preloader-bar-fill" id="preloader-bar"></div>
          </div>
        </div>

        <div className="preloader-footer">
          <span>Revenue · Civil · Criminal · Writs</span>
          <span>Authentic Statutory Advocacy</span>
        </div>
      </div>

      <header className="site-nav">
        <div className="nav-inner">
          <a href="#top" className="brand-mark" aria-label="Naga Law Chambers Home">
            <div className="monogram-badge">NN</div>
            <div>
              <div className="brand-text">NAGA LAW CHAMBERS</div>
              <span className="brand-sub">Advocate S. Nagendra Naik</span>
            </div>
          </a>

          <nav className="nav-links" aria-label="Main Navigation">
            <a href="#story" className="nav-link">Story</a>
            <a href="#ventures" className="nav-link">Practice</a>
            <a href="#impact" className="nav-link">Impact</a>
            <a href="#voices" className="nav-link">Voices</a>
            <a href="#contact" className="nav-link">Contact</a>
          </nav>

          <a href="#contact" className="nav-cta">
            <span>Consult in Chambers</span>
            <span>↗</span>
          </a>

          <button
            className="burger-btn"
            id="burger-toggle"
            aria-label="Toggle mobile menu"
            onClick={() => setDrawerOpen(!drawerOpen)}
          >
            <span className="burger-line"></span>
            <span className="burger-line"></span>
            <span className="burger-line"></span>
          </button>
        </div>
      </header>

      <div className={`mobile-drawer ${drawerOpen ? "open" : ""}`} id="mobile-drawer">
        <nav className="mobile-nav-links">
          <a href="#story" className="mobile-nav-link" onClick={() => setDrawerOpen(false)}>Story</a>
          <a href="#ventures" className="mobile-nav-link" onClick={() => setDrawerOpen(false)}>Practice</a>
          <a href="#impact" className="mobile-nav-link" onClick={() => setDrawerOpen(false)}>Impact</a>
          <a href="#voices" className="mobile-nav-link" onClick={() => setDrawerOpen(false)}>Voices</a>
          <a href="#contact" className="mobile-nav-link" onClick={() => setDrawerOpen(false)}>Contact</a>
        </nav>
        <div className="mobile-drawer-footer">
          <p style={{ color: "var(--fg)", fontWeight: 600 }}>NAGA LAW CHAMBERS</p>
          <p style={{ marginTop: "0.4rem" }}>Opp. District Court Complex, Anantapur</p>
          <p style={{ marginTop: "0.2rem", color: "var(--accent)" }}>+91 94400 00417</p>
        </div>
      </div>

      <section className={`hero ${heroRevealed ? "revealed" : ""}`} id="hero">
        <div className="container" style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>
          
          <div className="hero-meta-row">
            <div className="hero-roles">
              {["Advocate", "Revenue Counsel", "Trial Litigator", "Strategist"].map((role, i) => (
                <div key={role} className="hero-role-line">
                  <span
                    className={`hero-role-text ${heroRevealed ? "revealed" : ""}`}
                    style={{ transitionDelay: `${200 + i * 80}ms` }}
                  >
                    {role}
                  </span>
                </div>
              ))}
            </div>
            <div className="hero-location">
              Anantapur Bar · High Court of Andhra Pradesh
            </div>
          </div>

          <div className="hero-stage">
            
            <div className="hero-name-wrap" aria-label="NAGENDRA NAIK">
              <div className="hero-name-line" id="hero-line-1">
                {"NAGENDRA".split("").map((char, i) => (
                  <span key={i} className="reveal-letter-slot">
                    <span
                      className={`reveal-letter ${heroRevealed ? "revealed" : ""}`}
                      style={{ transitionDelay: `${i * 52}ms` }}
                    >
                      {char}
                    </span>
                  </span>
                ))}
              </div>
              <div className="hero-name-line" id="hero-line-2">
                {"NAIK".split("").map((char, i) => (
                  <span key={i} className="reveal-letter-slot">
                    <span
                      className={`reveal-letter ${heroRevealed ? "revealed" : ""}`}
                      style={{ transitionDelay: `${240 + i * 52}ms` }}
                    >
                      {char}
                    </span>
                  </span>
                ))}
              </div>
            </div>

            <div className="hero-portrait-wrap">
              <Image
                src="/advocate.jpg"
                alt="Advocate S. Nagendra Naik, Anantapur Bar"
                width={600}
                height={800}
                priority
                className="hero-portrait"
              />
              
              <div className="hero-badge-overlay">
                <div className="hero-badge-title">S. Nagendra Naik</div>
                <div className="hero-badge-sub">B.A., LL.B. · Enrolled Bar Council of Andhra Pradesh. Standing advocate for land titles and trial disputes.</div>
              </div>
            </div>

          </div>

          <div className="hero-bottom-row">
            <p className={`hero-desc ${heroRevealed ? "revealed" : ""}`}>
              Decisive trial advocacy and courtroom strategy across Anantapur and Andhra Pradesh courts. Built on exhaustive ground-level title auditing, statutory mastery, and direct counsel communication.
            </p>
            <a href="#story" className={`hero-scroll-cue ${heroRevealed ? "revealed" : ""}`}>
              <span>Scroll to explore</span>
              <div className="scroll-arrow">↓</div>
            </a>
          </div>

        </div>
      </section>

  <section className="marquee-section" aria-hidden="true">
    <div className="marquee-track">
      <div className="marquee-content">
        <div className="marquee-item">DEFEND RIGHTS <span className="marquee-dot"></span></div>
        <div className="marquee-item">PROTECT LAND TITLES <span className="marquee-dot"></span></div>
        <div className="marquee-item">CHALLENGE ARBITRARY NOTICES <span className="marquee-dot"></span></div>
        <div className="marquee-item">THINK IN PRECEDENTS <span className="marquee-dot"></span></div>
        <div className="marquee-item">TRIAL ADVOCACY <span className="marquee-dot"></span></div>
        <div className="marquee-item">REVENUE JURISPRUDENCE <span className="marquee-dot"></span></div>
        <div className="marquee-item">DIRECT ADVOCATE ACCESS <span className="marquee-dot"></span></div>
        <div className="marquee-item">STAND WITH CLIENTS <span className="marquee-dot"></span></div>
      </div>
      <div className="marquee-content">
        <div className="marquee-item">DEFEND RIGHTS <span className="marquee-dot"></span></div>
        <div className="marquee-item">PROTECT LAND TITLES <span className="marquee-dot"></span></div>
        <div className="marquee-item">CHALLENGE ARBITRARY NOTICES <span className="marquee-dot"></span></div>
        <div className="marquee-item">THINK IN PRECEDENTS <span className="marquee-dot"></span></div>
        <div className="marquee-item">TRIAL ADVOCACY <span className="marquee-dot"></span></div>
        <div className="marquee-item">REVENUE JURISPRUDENCE <span className="marquee-dot"></span></div>
        <div className="marquee-item">DIRECT ADVOCATE ACCESS <span className="marquee-dot"></span></div>
        <div className="marquee-item">STAND WITH CLIENTS <span className="marquee-dot"></span></div>
      </div>
    </div>
  </section>

  <section className="section" id="story">
    <div className="container">
      <div className="story-grid">
        
        <div className="story-left reveal-item">
          <div className="section-eyebrow">// 01 — THE PHILOSOPHY</div>
          <h2 className="section-heading">
            <span className="line-reveal-wrap"><span className="line-reveal-inner">COURTROOM RIGOR BUILT ON</span></span>
            <span className="line-reveal-wrap"><span className="line-reveal-inner">GROUND-LEVEL STATUTORY TRUTH.</span></span>
          </h2>
          <p className="story-lead">
            At NAGA Law Chambers, advocacy is not treated as boilerplate paperwork. It is an adversarial discipline grounded in the forensic inspection of village revenue records, title deeds, and procedural timing.
          </p>
          <div className="story-quote-card">
            <p className="story-quote-text">
              "A property case is never won by theatrical oratory alone. It is won at the survey stone, in the 1B registers, and through relentless procedural precision before the bench."
            </p>
            <span className="story-quote-cite">— Advocate S. Nagendra Naik</span>
          </div>
        </div>

        <div className="principles-list">
          
          <div className="principle-item reveal-item">
            <div className="principle-header">
              <span className="principle-num">01</span>
              <h3 className="principle-title">Direct Advocate Access</h3>
            </div>
            <p className="principle-body">
              No paralegal insulation or clerk gatekeeping. From your initial conference through document scrutiny, petition drafting, and oral argument, you strategize directly with your lead counsel.
            </p>
          </div>

          <div className="principle-item reveal-item">
            <div className="principle-header">
              <span className="principle-num">02</span>
              <h3 className="principle-title">The Survey Stone Doctrine</h3>
            </div>
            <p className="principle-body">
              Land revenue disputes in Andhra Pradesh are won on the ground. We correlate 1B khata registers, Pattadar Passbooks, village cadastral survey maps, and physical possession records before filing.
            </p>
          </div>

          <div className="principle-item reveal-item">
            <div className="principle-header">
              <span className="principle-num">03</span>
              <h3 className="principle-title">Multi-Tribunal Command</h3>
            </div>
            <p className="principle-body">
              Seamless coordination across Tahsildar, Revenue Divisional Officer (RDO), Joint Collector, District & Sessions Court, and High Court writ benches—tailoring procedural tactics to each bench.
            </p>
          </div>

          <div className="principle-item reveal-item">
            <div className="principle-header">
              <span className="principle-num">04</span>
              <h3 className="principle-title">Uncompromising Ethics</h3>
            </div>
            <p className="principle-body">
              Transparent merit assessments under Bar Council of India standards. If a case lacks statutory standing, we tell you immediately—protecting your capital, land, and peace of mind.
            </p>
          </div>

        </div>

      </div>
    </div>
  </section>

  <section className="section" id="ventures" style={{ background: "var(--surface)" }}>
    <div className="container">
      
      <div className="ventures-header reveal-item">
        <div>
          <div className="section-eyebrow">// 02 — PRACTICE AREAS & PRECEDENTS</div>
          <h2 className="section-heading">
            <span className="line-reveal-wrap"><span className="line-reveal-inner">STRATEGIC ADVOCACY ACROSS</span></span>
            <span className="line-reveal-wrap"><span className="line-reveal-inner">CRITICAL JURISDICTIONS</span></span>
          </h2>
        </div>
        <p className="ventures-desc">
          Focused representation in high-stakes property battles, administrative writ challenges, partition suits, and criminal liberty defense.
        </p>
      </div>

      <div className="ventures-grid">
        
        <div className="venture-card reveal-item">
          <div className="liquid-image-container">
            <Image
              src="/revenue-land.jpg"
              alt="Andhra Pradesh Land Revenue Deeds, Survey Maps, and Pattadar Passbook"
              width={640}
              height={400}
              className="liquid-image"
            />
            <div className="liquid-veil"></div>
            <div className="liquid-glow"></div>
          </div>
          <div className="venture-card-body">
            <div className="venture-tag-row">
              <span className="venture-tag">01 / Land & Revenue</span>
              <span className="venture-forums-pill">Tahsildar · RDO · JC</span>
            </div>
            <h3 className="venture-title">Title Disputes, Passbooks & 1B Rectification</h3>
            <p className="venture-copy">
              Challenging wrongful entries under the AP Rights in Land and Pattadar Pass Books Act, Inam land resumption inquiries, cancellation of fraudulent pattas, and boundary survey demarcation.
            </p>
            <div className="venture-action">
              <span>View Revenue Precedents</span>
              <span>→</span>
            </div>
          </div>
        </div>

        <div className="venture-card offset reveal-item">
          <div className="liquid-image-container">
            <Image
              src="/high-court.jpg"
              alt="High Court of Andhra Pradesh at Amaravati"
              width={640}
              height={400}
              className="liquid-image"
            />
            <div className="liquid-veil"></div>
            <div className="liquid-glow"></div>
          </div>
          <div className="venture-card-body">
            <div className="venture-tag-row">
              <span className="venture-tag">02 / High Court & Writs</span>
              <span className="venture-forums-pill">High Court of AP</span>
            </div>
            <h3 className="venture-title">Writ Petitions & Statutory Revisions</h3>
            <p className="venture-copy">
              Invoking Article 226 for Mandamus and Certiorari against arbitrary revenue orders, illegal land acquisition notices, statutory inaction, and filing Civil Revision Petitions (CRP).
            </p>
            <div className="venture-action">
              <span>View Appellate Scope</span>
              <span>→</span>
            </div>
          </div>
        </div>

        <div className="venture-card reveal-item">
          <div className="liquid-image-container">
            <Image
              src="/civil-contract.jpg"
              alt="Civil Contracts, Partition Deeds, and Legal Scales"
              width={640}
              height={400}
              className="liquid-image"
            />
            <div className="liquid-veil"></div>
            <div className="liquid-glow"></div>
          </div>
          <div className="venture-card-body">
            <div className="venture-tag-row">
              <span className="venture-tag">03 / Civil Litigation</span>
              <span className="venture-forums-pill">Civil Judge Courts</span>
            </div>
            <h3 className="venture-title">Partition, Injunctions & Specific Performance</h3>
            <p className="venture-copy">
              Aggressive representation in coparcenary family partition suits, securing interim injunctions against unlawful dispossession, and trial enforcement of registered sale agreements.
            </p>
            <div className="venture-action">
              <span>View Civil Defense</span>
              <span>→</span>
            </div>
          </div>
        </div>

        <div className="venture-card offset reveal-item">
          <div className="liquid-image-container">
            <Image
              src="/criminal-defence.jpg"
              alt="Lady Justice and Constitutional Liberty Defense"
              width={640}
              height={400}
              className="liquid-image"
            />
            <div className="liquid-veil"></div>
            <div className="liquid-glow"></div>
          </div>
          <div className="venture-card-body">
            <div className="venture-tag-row">
              <span className="venture-tag">04 / Criminal Defense</span>
              <span className="venture-forums-pill">Sessions & Magistrates</span>
            </div>
            <h3 className="venture-title">Anticipatory Bail & Trial Defense</h3>
            <p className="venture-copy">
              Decisive liberty protection under BNSS/CrPC: moving urgent anticipatory bail petitions in land and commercial disputes, regular bail hearings, and discharge applications before Magistrate & Sessions benches.
            </p>
            <div className="venture-action">
              <span>View Criminal Practice</span>
              <span>→</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  </section>

  <section className="section impact-section" id="impact">
    <div className="container">
      
      <div className="reveal-item">
        <div className="section-eyebrow">// 03 — BY THE NUMBERS</div>
        <h2 className="section-heading">
          <span className="line-reveal-wrap"><span className="line-reveal-inner">PERSISTENCE MEASURED</span></span>
          <span className="line-reveal-wrap"><span className="line-reveal-inner">IN RESULTS</span></span>
        </h2>
      </div>

      <div className="impact-grid">
        
        <div className="stat-card reveal-item">
          <div className="stat-figure" data-count="7">7+</div>
          <div>
            <div className="stat-label">Years of Bar Practice</div>
            <div className="stat-desc">Continuous, active litigation and courtroom advocacy at the Anantapur Bar.</div>
          </div>
        </div>

        <div className="stat-card reveal-item">
          <div className="stat-figure" data-count="500">500+</div>
          <div>
            <div className="stat-label">Land Titles & Disputes</div>
            <div className="stat-desc">Title verifications, ROR revisions, and civil matters prosecuted across the Rayalaseema belt.</div>
          </div>
        </div>

        <div className="stat-card reveal-item">
          <div className="stat-figure" data-count="6">6</div>
          <div>
            <div className="stat-label">Active Legal Forums</div>
            <div className="stat-desc">From Tahsildar revenue courts up to the High Court of Andhra Pradesh at Amaravati.</div>
          </div>
        </div>

        <div className="stat-card reveal-item">
          <div className="stat-figure" data-count="100">100%</div>
          <div>
            <div className="stat-label">Direct Counsel Access</div>
            <div className="stat-desc">Zero intermediary handoffs. Direct evaluation and advocacy by Advocate S. Nagendra Naik.</div>
          </div>
        </div>

      </div>

    </div>
  </section>

  <section className="section" id="voices">
    <div className="container">
      
      <div className="reveal-item">
        <div className="section-eyebrow">// 04 — TESTIMONIALS & REPUTATION</div>
        <h2 className="section-heading">
          <span className="line-reveal-wrap"><span className="line-reveal-inner">TESTED IN CONFLICT.</span></span>
          <span className="line-reveal-wrap"><span className="line-reveal-inner">PROVEN IN JUDGMENTS.</span></span>
        </h2>
      </div>

      <div className="voices-wrap">
        
        <div className="voices-nav reveal-item">
          {voicesData.map((item, idx) => (
            <button
              key={item.author}
              className={`voice-btn ${activeVoice === idx ? 'active' : ''}`}
              onClick={() => handleVoiceChange(idx)}
              type="button"
            >
              <div className="voice-btn-name">{item.author}</div>
              <div className="voice-btn-role">{item.role}</div>
            </button>
          ))}
        </div>

        <div className="voice-display-card reveal-item">
          <div className="voice-quote-text revealed" key={activeVoice} id="voice-quote-p">
            “{voicesData[activeVoice].quote.split(" ").map((word, i) => (
              <span key={i} className="word-slot">
                <span
                  className={`word-inner ${voiceWordsRevealed ? "revealed" : ""}`}
                  style={{ transitionDelay: `${i * 22}ms` }}
                >
                  {word}
                </span>
                {" "}
              </span>
            ))}”
          </div>

          <div className="voice-footer-info">
            <div>
              <div className="voice-author-name">{voicesData[activeVoice].author}</div>
              <div style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: "0.2rem" }}>
                {voicesData[activeVoice].origin}
              </div>
            </div>
            <div className="voice-author-matter">{voicesData[activeVoice].tag}</div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <footer className="contact-section" id="contact">
    <div className="container">
      
      <div className="contact-hero reveal-item">
        <div className="section-eyebrow">// 05 — CONSULTATION & CHAMBERS</div>
        <h2 className="contact-huge-title">
          <span className="line-reveal-wrap"><span className="line-reveal-inner">INITIATE DIRECT</span></span>
          <span className="line-reveal-wrap"><span className="line-reveal-inner"><span>COUNSEL.</span></span></span>
        </h2>
      </div>

      <div className="contact-grid">
        
        <div className="contact-links-list reveal-item">
          
          <a href="mailto:nagalawchambers@gmail.com" className="contact-link-row">
            <div>
              <span className="contact-link-label">Direct Case Evaluation</span>
              <div className="contact-link-value">nagalawchambers@gmail.com ↗</div>
            </div>
          </a>

          <a href="tel:+919440000417" className="contact-link-row">
            <div>
              <span className="contact-link-label">Chambers Direct Line</span>
              <div className="contact-link-value">+91 94400 00417 ↗</div>
            </div>
          </a>

          <a href="https://wa.me/919440000417?text=Hello%20Advocate%20Nagendra%20Naik,%20I%20would%20like%20to%20consult%20regarding%20a%20legal%20matter." target="_blank" rel="noopener noreferrer" className="contact-link-row">
            <div>
              <span className="contact-link-label">Instant WhatsApp Briefing</span>
              <div className="contact-link-value">WhatsApp Chambers ↗</div>
            </div>
          </a>

        </div>

        <div className="chambers-address-card reveal-item">
          <div>
            <div className="chambers-address-title">Chambers Location</div>
            <p className="chambers-address-body">
              <strong>NAGA LAW CHAMBERS</strong><br />
              Opposite District Court Complex,<br />
              Court Road, Anantapur — 515001,<br />
              Andhra Pradesh, India.<br /><br />
              <span style={{ color: "var(--muted)" }}>Hours: Mon — Sat, 09:30 AM — 08:30 PM<br />(By Prior Appointment)</span>
            </p>
          </div>
          <a href="https://wa.me/919440000417?text=Sir,%20requesting%20an%20in-person%20appointment%20at%20your%20Anantapur%20chambers." target="_blank" rel="noopener noreferrer" className="consultation-cta-btn">
            <span>Schedule Appointment</span>
            <span>↗</span>
          </a>
        </div>

      </div>

      <div className="bci-disclaimer-card reveal-item">
        <div className="bci-disclaimer-title">Bar Council of India Statutory Compliance (Rule 36)</div>
        <p className="bci-disclaimer-text">
          As per the rules of the Bar Council of India, advocates are strictly prohibited from soliciting work or advertising in any form or manner. By accessing this website (www.nagalawchambers.com), the user acknowledges that the information provided herein is solely for informational purposes at their own request. Nothing contained in this portal constitutes legal advice, formal solicitation, or creates an advocate-client relationship.
        </p>
      </div>

      <div className="footer-bottom">
        <div>
          © 2026 NAGA Law Chambers. Advocate S. Nagendra Naik, Anantapur Bar.
        </div>
        <a href="#top" className="back-to-top" id="back-to-top">
          <span>Back to top</span>
          <span>↑</span>
        </a>
      </div>

    </div>
  </footer>
    </div>
  );
}
