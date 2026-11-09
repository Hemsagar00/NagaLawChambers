"use client";

import { Phone } from "lucide-react";
import { motion } from "framer-motion";
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
    <section className="naga-section pb-20">
      <div className="naga-container">
        <div className="naga-contact-panel overflow-hidden p-6 sm:p-10">
          <h2 className="naga-section-title max-w-2xl">
            {heading}
          </h2>
          {body ? (
            <p className="mt-6 max-w-[60ch] text-lg text-ink-2">
              {body}
            </p>
          ) : null}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <motion.a
              href={phoneHref}
              onClick={() => trackEvent("call_click", { location })}
                            className="naga-button naga-button-primary"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span>Call {site.contact.phoneDisplay}</span>
            </motion.a>

            <motion.a
              href={buildWhatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { location })}
                            className="naga-button naga-button-whatsapp"
            >
              <span>WhatsApp us</span>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
