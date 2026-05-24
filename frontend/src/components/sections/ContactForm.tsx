"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import {
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { useInquirySubmit } from "@/lib/useInquirySubmit";
import InquiryFields from "@/components/sections/InquiryFields";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const { status, submit } = useInquirySubmit();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formRef.current) void submit(formRef.current);
  };

  return (
    <section
      id="contact"
      className="relative py-28 md:py-36 overflow-hidden"
      data-testid="contact-section"
    >
      {/* Ambient courthouse silhouette */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "url('/court-aerial.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#02100c]/95 via-[#02100c]/85 to-[#02100c]/95" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="grid lg:grid-cols-12 gap-10 mb-16 items-end"
        >
          <div className="lg:col-span-7">
            <p className="text-[11px] tracking-[0.42em] uppercase text-[#D4AF37] font-mono mb-5">
              ◆ Get in touch · Section 05
            </p>
            <h2 className="font-heading text-4xl md:text-6xl lg:text-[68px] leading-[1.05] tracking-tight">
              Let&apos;s build your{" "}
              <span className="text-gold-gradient italic">case.</span>
            </h2>
          </div>
          <p className="lg:col-span-5 text-white/55 text-[15px] leading-relaxed">
            A confidential consultation begins with a single message. Tell me
            briefly about your matter — I respond within two working hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Coordinates column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
            data-testid="contact-info"
          >
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#D4AF37]/80 mb-6">
              Coordinates
            </p>
            <div className="space-y-7">
              <a
                href="tel:+919440000417"
                className="group flex items-start gap-5"
                data-testid="contact-phone"
              >
                <div className="w-11 h-11 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 flex items-center justify-center group-hover:border-[#D4AF37]/70 transition-all shrink-0">
                  <Phone size={15} className="text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.32em] uppercase text-white/40 font-mono mb-1">
                    Direct Line
                  </p>
                  <p className="font-heading text-lg md:text-xl text-white/95 group-hover:text-[#E6C965] transition-colors">
                    +91 94400 00417
                  </p>
                </div>
              </a>

              <a
                href="mailto:contact@nagalawchambers.com"
                className="group flex items-start gap-5"
                data-testid="contact-email"
              >
                <div className="w-11 h-11 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 flex items-center justify-center group-hover:border-[#D4AF37]/70 transition-all shrink-0">
                  <Mail size={15} className="text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.32em] uppercase text-white/40 font-mono mb-1">
                    Correspondence
                  </p>
                  <p className="font-heading text-lg md:text-xl text-white/95 group-hover:text-[#E6C965] transition-colors">
                    contact@nagalawchambers.com
                  </p>
                  <p className="text-[13px] text-white/55 mt-1">
                    nagalawchambers@gmail.com
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-5">
                <div className="w-11 h-11 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 flex items-center justify-center shrink-0">
                  <MapPin size={15} className="text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.32em] uppercase text-white/40 font-mono mb-1">
                    Chambers
                  </p>
                  <p className="font-heading text-lg md:text-xl text-white/95">
                    District Court Premises
                  </p>
                  <p className="text-[13px] text-white/55 mt-1">
                    Anantapur, Andhra Pradesh — 515001
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/5">
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#D4AF37]/80 mb-3">
                Sittings
              </p>
              <p className="text-white/55 text-[14px] leading-relaxed">
                Mon — Sat · 09:30 to 19:00 IST. <br />
                Emergency injunction matters handled on weekends with prior
                intimation.
              </p>
            </div>
          </motion.div>

          {/* Terminal form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="glass-strong rounded-3xl overflow-hidden">
              {/* terminal head */}
              <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-black/30">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37]/70" />
                  <span className="w-2 h-2 rounded-full bg-white/15" />
                  <span className="w-2 h-2 rounded-full bg-white/15" />
                </div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 font-mono">
                  inquiry / new
                </span>
              </div>

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="p-7 md:p-10 space-y-7"
                data-testid="contact-form"
              >
                <InquiryFields />

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pt-2">
                  <p className="text-[11px] text-white/40 font-mono tracking-[0.16em] max-w-xs">
                    By submitting, you acknowledge this is{" "}
                    <span className="text-[#D4AF37]/80">
                      not a solicitation
                    </span>{" "}
                    and a formal engagement begins only after a written
                    consultation.
                  </p>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    data-testid="form-submit"
                    className="terminal-btn rounded-full px-7 py-3.5 text-[11px] inline-flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" && (
                      <>
                        <Loader2
                          size={14}
                          className="animate-spin mr-2"
                        />
                        Transmitting
                      </>
                    )}
                    {status === "sent" && (
                      <>
                        <CheckCircle2 size={14} className="mr-2" />
                        Received
                      </>
                    )}
                    {status === "idle" && "Submit Inquiry"}
                    {status === "error" && "Retry"}
                  </button>
                </div>

                {status === "sent" && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[12px] text-[#E6C965] font-mono tracking-wider"
                    data-testid="form-success"
                  >
                    ✓ Your inquiry has been logged. Expect a reply within 2
                    working hours.
                  </motion.p>
                )}
                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[12px] text-[#ff8a8a] font-mono tracking-wider"
                    data-testid="form-error"
                  >
                    ✗ Transmission failed. Please retry or call +91 94400 00417 directly.
                  </motion.p>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
