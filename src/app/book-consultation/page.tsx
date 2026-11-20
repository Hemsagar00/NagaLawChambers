"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Mail, Phone, Clock, Building2 } from "lucide-react";
import { site, phoneHref, emailHref } from "@/lib/site";
import { buildWhatsappHref } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

const easing = [0.22, 1, 0.36, 1] as const;

const timeSlots = [
  "09:30 AM",
  "10:30 AM",
  "11:30 AM",
  "12:30 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

const caseTypes = [
  "Revenue & Land (ROR, Adangal, Mutation)",
  "Civil & Contract Litigation",
  "Bail & Criminal Defence",
  "Family & Property Partition",
  "Consumer Forum / Cheque Bounce",
  "Other Matter",
];

export default function BookConsultationPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [caseType, setCaseType] = useState<string>(caseTypes[0]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [details, setDetails] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const minDate = new Date().toISOString().split("T")[0];

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName) {
      setError("Please enter your full name.");
      return;
    }
    if (trimmedPhone.replace(/\D/g, "").length < 7) {
      setError("Please enter a valid phone number.");
      return;
    }
    if (!date) {
      setError("Please select a preferred date.");
      return;
    }
    if (!time) {
      setError("Please select a preferred time slot.");
      return;
    }

    setError("");

    const message = [
      "Consultation booking — NAGA Law Chambers",
      "",
      `Name: ${trimmedName}`,
      `Phone: ${trimmedPhone}`,
      email.trim() ? `Email: ${email.trim()}` : null,
      `Case type: ${caseType}`,
      `Preferred date: ${date}`,
      `Preferred time: ${time}`,
      details.trim() ? `Details: ${details.trim()}` : null,
    ]
      .filter((line): line is string => line !== null)
      .join("\n");

    trackEvent("consult_book", {
      method: "whatsapp",
      case_type: caseType,
      date,
      time,
    });

    setSent(true);
  }

  if (sent) {
    const waUrl = buildWhatsappHref(
      `Consultation booking:\n\nName: ${name}\nPhone: ${phone}\n${email.trim() ? `Email: ${email}\n` : ""}Case type: ${caseType}\nDate: ${date}\nTime: ${time}\n${details.trim() ? `Details: ${details}\n` : ""}Please confirm the appointment time.`
    );

    return (
      <main className="mx-auto max-w-[600px] px-5 py-16 md:px-8 md:py-24">
        <div className="naga-form-card flex flex-col items-center justify-center gap-4 text-center">
          <div className="naga-icon-shell !h-16 !w-16 !rounded-full bg-ink/10 flex items-center justify-center">
            <Calendar className="h-8 w-8 text-ink" aria-hidden="true" />
          </div>
          <h2 className="text-2xl font-display font-semibold text-ink">
            Booking request sent
          </h2>
          <p className="max-w-xs text-base leading-relaxed text-ink-2">
            Your consultation request has been prepared for WhatsApp. Open the
            chat to send it to Adv. S. Nagendra Naik directly.
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="naga-button naga-button-whatsapp min-w-[200px] justify-center"
            onClick={() => trackEvent("whatsapp_click", { location: "booking_confirm" })}
          >
            Open WhatsApp Chat
          </a>
          <button
            type="button"
            onClick={() => setSent(false)}
            className="text-sm font-medium text-muted underline underline-offset-4"
          >
            Enter different details
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[600px] px-5 py-16 md:px-8 md:py-24">
      <section className="naga-form-card">
        <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] leading-[1.1] tracking-[var(--tracking-display)] text-ink mb-2">
          Book a Consultation
        </h2>
        <p className="text-base text-muted mb-8">
          Choose a date and time that works for you. We&apos;ll confirm via
          WhatsApp before the appointment is fixed.
        </p>

        {error ? (
          <p role="alert" className="mb-6 text-sm font-medium text-[var(--color-error)]">
            {error}
          </p>
        ) : null}

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid gap-4">
            <div>
              <label htmlFor="booking-name" className="naga-field-label">
                Full name
              </label>
              <input
                id="booking-name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                required
                className="naga-input"
              />
            </div>

            <div>
              <label htmlFor="booking-phone" className="naga-field-label">
                Phone / WhatsApp number
              </label>
              <input
                id="booking-phone"
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
              <label htmlFor="booking-email" className="naga-field-label">
                Email address (optional)
              </label>
              <input
                id="booking-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="naga-input"
              />
            </div>

            <div>
              <label htmlFor="booking-case" className="naga-field-label">
                Matter type
              </label>
              <select
                id="booking-case"
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

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="booking-date" className="naga-field-label">
                  Preferred date
                </label>
                <input
                  id="booking-date"
                  type="date"
                  min={minDate}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="naga-input"
                />
              </div>

              <div>
                <label htmlFor="booking-time" className="naga-field-label">
                  Preferred time
                </label>
                <select
                  id="booking-time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="naga-input naga-select"
                >
                  <option value="">Select a time slot</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="booking-details" className="naga-field-label">
                Brief details of your matter
              </label>
              <textarea
                id="booking-details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="A few lines about your situation, court, or documents you have."
                rows={4}
                className="naga-input naga-textarea"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.985 }}
              transition={{ duration: 0.35, ease: easing }}
              className="naga-button naga-button-whatsapp w-full flex flex-col items-center gap-2"
            >
              <Calendar className="h-5 w-5" aria-hidden="true" />
              <span>Send booking request via WhatsApp</span>
            </motion.button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm leading-relaxed text-muted">
          Alternatively, call <a href={phoneHref} className="text-ink underline underline-offset-2">{site.contact.phoneDisplay}</a> or email <a href={emailHref} className="text-ink underline underline-offset-2">{site.contact.email}</a>.
        </p>
      </section>
    </main>
  );
}
