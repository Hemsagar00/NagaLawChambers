"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    fetch("https://formspree.io/f/mnqevwqr", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          setSubmitted(true);
          form.reset();
          setTimeout(() => setSubmitted(false), 5000);
        }
      })
      .catch((err) => console.error("Form error:", err));
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: "url('/court-aerial.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10">
        <div className="gold-line mb-24" />

        <div ref={ref} className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-[#c9a962] mb-4">Get In Touch</p>
            <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-playfair)]">
              Let&apos;s work{" "}
              <span className="text-gradient-gold">together.</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#c9a962]/10 flex items-center justify-center shrink-0">
                  <Phone className="text-[#c9a962]" size={20} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Call Today</p>
                  <p className="text-lg font-semibold text-[#f0f0f5]">+91 94400 00417</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#c9a962]/10 flex items-center justify-center shrink-0">
                  <Mail className="text-[#c9a962]" size={20} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <p className="text-lg font-semibold text-[#f0f0f5]">contact@nagalawchambers.com</p>
                  <p className="text-lg font-semibold text-[#f0f0f5]">nagalawchambers@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#c9a962]/10 flex items-center justify-center shrink-0">
                  <MapPin className="text-[#c9a962]" size={20} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Office</p>
                  <p className="text-lg font-semibold text-[#f0f0f5]">District Court Premises, Anantapur</p>
                </div>
              </div>

              <div className="pt-8 border-t border-[#c9a962]/10">
                <p className="text-muted-foreground text-sm">
                  Available for consultation across Andhra Pradesh.
                  Emergency matters handled with priority.
                </p>
              </div>
            </motion.div>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              onSubmit={handleSubmit}
              className="bg-[#12121f] rounded-2xl p-8 border border-[#c9a962]/10 space-y-6 card-3d"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Your Name</label>
                  <input
                    required
                    type="text"
                    name="name"
                    className="w-full bg-[#0a0a12] border border-[#c9a962]/20 rounded-xl px-4 py-3 text-[#f0f0f5] focus:border-[#c9a962] focus:outline-none transition-colors"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Your Email</label>
                  <input
                    required
                    type="email"
                    name="email"
                    className="w-full bg-[#0a0a12] border border-[#c9a962]/20 rounded-xl px-4 py-3 text-[#f0f0f5] focus:border-[#c9a962] focus:outline-none transition-colors"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">Service Needed</label>
                <select
                  name="service"
                  className="w-full bg-[#0a0a12] border border-[#c9a962]/20 rounded-xl px-4 py-3 text-[#f0f0f5] focus:border-[#c9a962] focus:outline-none transition-colors"
                >
                  <option>Land Revenue</option>
                  <option>Civil Litigation</option>
                  <option>Property Documentation</option>
                  <option>Court Representation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">Your Message</label>
                <textarea
                  required
                  rows={4}
                  name="message"
                  className="w-full bg-[#0a0a12] border border-[#c9a962]/20 rounded-xl px-4 py-3 text-[#f0f0f5] focus:border-[#c9a962] focus:outline-none transition-colors resize-none"
                  placeholder="Briefly describe your legal matter..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn-liquid-glass-gold w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-[#0a0a12]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {submitted ? (
                    <>
                      <CheckCircle size={18} />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Submit Inquiry
                    </>
                  )}
                </span>
              </button>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}
