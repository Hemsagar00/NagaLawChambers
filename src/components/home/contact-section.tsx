"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { AnimatedSection } from "@/components/home/animated-section";
import { ContactCard } from "@/components/home/contact-card";
import { SectionHeading } from "@/components/home/section-heading";
import { staggerItem } from "@/lib/motion";
import { emailHref, phoneHref, site } from "@/lib/site";

export function ContactSection() {
  return (
    <AnimatedSection className="py-16 md:py-20" id="contact">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="NEXT STEP"
          title="Book a Consultation"
          subtitle={`Discuss your matter directly with Advocate ${site.advocate.name}.`}
        />

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
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
          />
        </div>

        <motion.div variants={staggerItem} className="mt-8 text-center">
          <a
            href={phoneHref}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-cyan-muted border border-cyan-subtle text-kiwi-cyan rounded-xl text-sm font-medium hover:bg-cyan-muted-hover transition-colors"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            Call {site.contact.phoneDisplay}
          </a>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}