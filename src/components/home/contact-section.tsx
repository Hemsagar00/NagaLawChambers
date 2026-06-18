"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { AnimatedSection } from "@/components/home/animated-section";
import { ContactCard } from "@/components/home/contact-card";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { SectionHeading } from "@/components/home/section-heading";
import { EASE, staggerItem } from "@/lib/motion";
import { emailHref, mapHref, phoneHref, site } from "@/lib/site";

export function ContactSection() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <AnimatedSection className="portavia-section relative aurora-legal" id="contact">
      <div className="absolute inset-0 -z-10 pointer-events-none bg-[radial-gradient(circle_at_50%_120%,rgba(0,229,255,0.06),transparent_50%)]" />

      <div className="portavia-container max-w-4xl">
        <SectionHeading
          eyebrow="NEXT STEP"
          title="Book a Consultation"
          subtitle={`Discuss your matter directly with Advocate ${site.advocate.name}.`}
        />

        <motion.div
          ref={ref}
          initial={reduce ? false : "hidden"}
          animate={isInView ? "visible" : undefined}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.15 },
            },
          }}
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6"
        >
          <ContactCard
            icon={Phone}
            label="Phone"
            value={site.contact.phoneDisplay}
            href={phoneHref}
          />
          <ContactCard
            icon={Mail}
            label="Email"
            value={site.contact.email}
            href={emailHref}
          />
          <ContactCard
            icon={MapPin}
            label="Office"
            value={site.contact.office}
            href={mapHref}
          />
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          className="mt-12 text-center"
        >
          <MagneticButton
            as="a"
            href={phoneHref}
            className="inline-flex items-center gap-2.5 px-9 py-4 bg-gold text-kiwi-dark border border-gold-dim font-semibold rounded-2xl text-[15px] tracking-[0.3px] hover:bg-gold-hover transition-colors shadow-[0_14px_44px_-12px_rgba(212,175,55,0.35)]"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            Call {site.contact.phoneDisplay}
          </MagneticButton>

          <p className="mt-5 text-sm text-text-secondary/70">
            Prefer email?{" "}
            <a
              href={emailHref}
              className="text-kiwi-cyan/80 hover:text-kiwi-cyan hover-underline"
            >
              {site.contact.email}
            </a>
          </p>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}