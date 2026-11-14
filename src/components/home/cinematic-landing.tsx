"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
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

  useEffect(() => {
    // Intersection Observer for scroll reveal items
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
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

    document.querySelectorAll(".reveal-item").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="cinematic-root">
      <div id="preloader" aria-hidden="true">
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

      <button className="burger-btn" id="burger-toggle" aria-label="Toggle mobile menu">
        <span className="burger-line"></span>
        <span className="burger-line"></span>
        <span className="burger-line"></span>
      </button>
    </div>
  </header>

  <div className={`mobile-drawer ${drawerOpen ? "open" : ""}`} id="mobile-drawer">
    <nav className="mobile-nav-links">
      <a href="#story" className="mobile-nav-link">Story</a>
      <a href="#ventures" className="mobile-nav-link">Practice</a>
      <a href="#impact" className="mobile-nav-link">Impact</a>
      <a href="#voices" className="mobile-nav-link">Voices</a>
      <a href="#contact" className="mobile-nav-link">Contact</a>
    </nav>
    <div className="mobile-drawer-footer">
      <p style={{ color: "var(--fg)", fontWeight: 600 }}>NAGA LAW CHAMBERS</p>
      <p style={{ marginTop: "0.4rem" }}>Opp. District Court Complex, Anantapur</p>
      <p style={{ marginTop: "0.2rem", color: "var(--accent)" }}>+91 94400 00417</p>
    </div>
  </div>

  <section className="hero revealed" id="hero">
    <div className="container" style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>
      
      <div className="hero-meta-row">
        <div className="hero-roles">
          <span>Advocate</span>
          <span>Revenue Counsel</span>
          <span>Trial Litigator</span>
          <span>Strategist</span>
        </div>
        <div className="hero-location">
          Anantapur Bar · High Court of Andhra Pradesh
        </div>
      </div>

      <div className="hero-stage">
        
        <div className="hero-name-wrap">
          <div className="hero-name-line" id="hero-line-1">NAGENDRA</div>
          <div className="hero-name-line" id="hero-line-2">NAIK</div>
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
        <p className="hero-desc">
          Decisive trial advocacy and courtroom strategy across Anantapur and Andhra Pradesh courts. Built on exhaustive ground-level title auditing, statutory mastery, and direct counsel communication.
        </p>
        <a href="#story" className="hero-scroll-cue">
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
          <h2 className="section-heading">COURTROOM RIGOR BUILT ON GROUND-LEVEL STATUTORY TRUTH.</h2>
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
          <h2 className="section-heading">STRATEGIC ADVOCACY ACROSS CRITICAL JURISDICTIONS</h2>
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
        <h2 className="section-heading">PERSISTENCE MEASURED IN RESULTS</h2>
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
        <h2 className="section-heading">TESTED IN CONFLICT. PROVEN IN JUDGMENTS.</h2>
      </div>

      <div className="voices-wrap">
        
        <div className="voices-nav reveal-item">
          {voicesData.map((item, idx) => (
            <button
              key={item.author}
              className={`voice-btn ${activeVoice === idx ? 'active' : ''}`}
              onClick={() => setActiveVoice(idx)}
              type="button"
            >
              <div className="voice-btn-name">{item.author}</div>
              <div className="voice-btn-role">{item.role}</div>
            </button>
          ))}
        </div>

        <div className="voice-display-card reveal-item">
          <div className="voice-quote-text revealed" key={activeVoice}>
            "{voicesData[activeVoice].quote}"
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
        <h2 className="contact-huge-title">INITIATE DIRECT <span>COUNSEL.</span></h2>
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
