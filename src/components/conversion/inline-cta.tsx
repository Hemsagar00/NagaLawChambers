"use client";

import { Phone } from "lucide-react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { site, phoneHref } from "@/lib/site";
import { buildWhatsappHref } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

const easing = [0.22, 1, 0.36, 1] as const;

/** Reusable Call + WhatsApp CTA block for landing pages, with event tracking. */
export function InlineCta({
  heading = "Discuss your matter directly with the advocate",
  body,
  location = "landing",
}: {
  heading?: string;
  body?: string;
  location?: string;
}) {
  return (
    <section className="naga-section relative pb-20">
      <div className="naga-container">
        <div className="naga-contact-panel overflow-hidden rounded-2xl p-6 text-center sm:p-10">
          <h2 className="naga-section-title mx-auto max-w-2xl text-balance">
            {heading}
          </h2>
          {body ? (
            <p className="mx-auto mt-6 max-w-xl text-base leading-[1.85] text-[var(--naga-linen)]">
              {body}
            </p>
          ) : null}

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <motion.a
              href={phoneHref}
              onClick={() => trackEvent("call_click", { location })}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.985 }}
              transition={{ duration: 0.35, ease: easing }}
              className="naga-button naga-button-primary"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span>Call {site.contact.phoneDisplay}</span>
              <span className="naga-button-orb" aria-hidden="true">
                <ArrowRight className="h-4 w-4" />
              </span>
            </motion.a>

            <motion.a
              href={buildWhatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { location })}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.985 }}
              transition={{ duration: 0.35, ease: easing }}
              className="naga-button naga-button-whatsapp"
            >
              <span>WhatsApp us</span>
              <span className="naga-button-orb" aria-hidden="true">
                <ArrowRight className="h-4 w-4" />
              </span>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
