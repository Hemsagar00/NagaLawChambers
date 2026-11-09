"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { practiceAreas, practiceAreaTitles } from "@/lib/content";
import { teAreas, te } from "@/lib/home-copy";
import { buildIntakeMessage, buildWhatsappHref } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

const easing = [0.22, 1, 0.36, 1] as const;
const caseTypes = [...practiceAreaTitles, "Other matter"] as const;

export function IntakeForm({ copy }: { copy?: typeof te.form }) {
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
      setError(copy?.error ?? "Please add your name and a valid phone number.");
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
        <span className="naga-icon-shell !h-14 !w-14 !rounded-full">
          <CheckCircle2 className="h-7 w-7 text-ink" aria-hidden="true" />
        </span>
        <p className="text-lg font-semibold text-ink">
          {copy?.opening ?? "Opening WhatsApp…"}
        </p>
        <p className="max-w-xs text-sm leading-relaxed text-ink-2">
          {copy?.openingBody ??
            "Send the pre-filled message to reach Adv. S. Nagendra Naik directly. If WhatsApp didn't open, please call us instead."}
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="text-sm font-medium text-ink underline underline-offset-4"
        >
          {copy?.again ?? "Send another request"}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="naga-form-card" noValidate>
      <p className="naga-sub-header mb-1 text-ink">
        {copy?.kicker ?? "Request a callback"}
      </p>
      <h3 className="mb-5 text-xl font-semibold tracking-[-0.01em] text-ink">
        {copy?.title ?? "Send your case details"}
      </h3>

      <div className="grid gap-4">
        <div>
          <label htmlFor="lead-name" className="naga-field-label">
            {copy?.name ?? "Full name"}
          </label>
          <input
            id="lead-name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={copy?.namePh ?? "Your name"}
            required
            className="naga-input"
          />
        </div>

        <div>
          <label htmlFor="lead-phone" className="naga-field-label">
            {copy?.phone ?? "Phone / WhatsApp number"}
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
            {copy?.matter ?? "Matter type"}
          </label>
          <select
            id="lead-case"
            value={caseType}
            onChange={(e) => setCaseType(e.target.value)}
            className="naga-input naga-select"
          >
            {caseTypes.map((type, i) => (
              <option key={type} value={type}>
                {copy
                  ? i < practiceAreas.length
                    ? teAreas[practiceAreas[i].id]?.title ?? type
                    : copy.other
                  : type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="lead-message" className="naga-field-label">
            {copy?.details ?? "Brief details"} <span className="text-muted">{copy?.optional ?? "(optional)"}</span>
          </label>
          <textarea
            id="lead-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={copy?.detailsPh ?? "A few lines about your situation, court, or documents."}
            rows={3}
            className="naga-input naga-textarea"
          />
        </div>

        {error ? (
          <p role="alert" className="text-sm font-medium text-[var(--color-error)]">
            {error}
          </p>
        ) : null}

        <motion.button
          type="submit"
          whileHover={reduce ? undefined : { y: -2 }}
          whileTap={{ scale: 0.985 }}
          transition={{ duration: 0.35, ease: easing }}
          className="naga-button naga-button-whatsapp w-full"
        >
          <span>{copy?.send ?? "Send on WhatsApp"}</span>
        </motion.button>

        <p className="text-center text-sm leading-relaxed text-muted">
          {copy?.note ?? "Goes straight to the advocate's WhatsApp, no account or sign-up needed."}</p>
      </div>
    </form>
  );
}
