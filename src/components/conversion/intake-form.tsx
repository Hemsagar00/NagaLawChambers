"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { practiceAreaTitles } from "@/lib/content";
import { buildIntakeMessage, buildWhatsappHref } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

const easing = [0.22, 1, 0.36, 1] as const;
const caseTypes = [...practiceAreaTitles, "Other matter"] as const;

export function IntakeForm() {
  const reduce = useReducedMotion();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [caseType, setCaseType] = useState<string>(caseTypes[0]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName || trimmedPhone.replace(/\D/g, "").length < 7) {
      setError("Please add your name and a valid phone number.");
      return;
    }
    setError("");

    const text = buildIntakeMessage({
      name: trimmedName,
      phone: trimmedPhone,
      caseType,
      message,
    });

    trackEvent("lead_submit", { method: "whatsapp", case_type: caseType });
    setSent(true);

    window.open(buildWhatsappHref(text), "_blank", "noopener,noreferrer");
  }

  if (sent) {
    return (
      <div className="naga-form-card flex flex-col items-center justify-center gap-4 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full border border-[rgb(212_175_55_/_0.3)] bg-[rgb(212_175_55_/_0.08)]">
          <CheckCircle2 className="h-7 w-7 text-[var(--naga-gold)]" aria-hidden="true" />
        </span>
        <p className="text-lg font-semibold text-[var(--naga-ivory)]">
          Opening WhatsApp…
        </p>
        <p className="max-w-xs text-sm leading-relaxed text-[var(--naga-linen)]">
          Send the pre-filled message to reach Adv. S. Nagendra Naik directly.
          If WhatsApp didn&apos;t open, please call us instead.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="text-xs font-medium tracking-[0.1em] uppercase text-[var(--naga-gold)] underline-offset-4 hover:underline"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="naga-form-card" noValidate>
      <p className="naga-sub-header mb-1 text-[var(--naga-gold)]">
        Request a callback
      </p>
      <h3 className="mb-5 text-xl font-semibold tracking-[-0.01em] text-[var(--naga-ivory)]">
        Send your case details
      </h3>

      <div className="grid gap-4">
        <div>
          <label htmlFor="lead-name" className="naga-field-label">
            Full name
          </label>
          <input
            id="lead-name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            className="naga-input"
          />
        </div>

        <div>
          <label htmlFor="lead-phone" className="naga-field-label">
            Phone / WhatsApp number
          </label>
          <input
            id="lead-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g. 98765 43210"
            required
            className="naga-input"
          />
        </div>

        <div>
          <label htmlFor="lead-case" className="naga-field-label">
            Matter type
          </label>
          <select
            id="lead-case"
            value={caseType}
            onChange={(e) => setCaseType(e.target.value)}
            className="naga-input naga-select"
          >
            {caseTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="lead-message" className="naga-field-label">
            Brief details <span className="text-[var(--naga-muted)]">(optional)</span>
          </label>
          <textarea
            id="lead-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="A few lines about your situation, court, or documents."
            rows={3}
            className="naga-input naga-textarea"
          />
        </div>

        {error ? (
          <p role="alert" className="text-sm text-[#f0a3a3]">
            {error}
          </p>
        ) : null}

        <motion.button
          type="submit"
          whileHover={reduce ? undefined : { y: -2 }}
          whileTap={{ scale: 0.985 }}
          transition={{ duration: 0.35, ease: easing }}
          className="naga-button naga-button-primary w-full"
        >
          <span>Send on WhatsApp</span>
          <span className="naga-button-orb" aria-hidden="true">
            <ArrowRight className="h-4 w-4" />
          </span>
        </motion.button>

        <p className="text-center text-[11px] leading-relaxed text-[var(--naga-muted)]">
          Goes straight to the advocate&apos;s WhatsApp — no account or sign-up needed.
        </p>
      </div>
    </form>
  );
}
