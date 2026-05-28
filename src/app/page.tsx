"use client";

import { motion } from "framer-motion";
import {
  Scale, Landmark, FileText, ShieldCheck, Phone, Mail, MapPin, ArrowRight,
  ChevronDown, Users, Clock, Gavel, BookOpen, MessageCircle, ChevronRight
} from "lucide-react";
import Image from "next/image";

/* ── Animated Particles ── */
function ParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `rgba(212, 175, 55, ${Math.random() * 0.25 + 0.08})`,
          }}
          animate={{ y: [0, -15 - Math.random() * 30, 0], opacity: [0.1, 0.5, 0.1] }}
          transition={{ duration: 5 + Math.random() * 7, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 5 }}
        />
      ))}
    </div>
  );
}

/* ── Section Wrapper ── */
function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ── Practice Card ── */
function PracticeCard({ icon: Icon, title, desc, delay = 0 }: { icon: any; title: string; desc: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="group glass-card p-6 md:p-8 hover:border-[rgba(212,175,55,0.35)] transition-all duration-300 hover:-translate-y-1"
    >
      <div className="w-12 h-12 rounded-xl bg-[rgba(212,175,55,0.08)] flex items-center justify-center mb-5 border border-[rgba(212,175,55,0.15)]">
        <Icon className="w-6 h-6 text-[#D4AF37]" />
      </div>
      <h3 className="text-xl font-semibold text-[#F1F5F9] mb-3 font-display-legal">{title}</h3>
      <p className="text-sm text-[#94A3B8] leading-relaxed">{desc}</p>
    </motion.div>
  );
}

/* ── Stat ── */
function Stat({ value, label, icon: Icon }: { value: string; label: string; icon: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center"
    >
      <Icon className="w-5 h-5 text-[#D4AF37] mb-2" />
      <span className="text-3xl md:text-4xl font-bold gold-gradient-text font-display-legal">{value}</span>
      <span className="text-sm text-[#94A3B8] mt-1">{label}</span>
    </motion.div>
  );
}

/* ── Contact Card ── */
function ContactCard({ icon: Icon, label, value, href }: { icon: any; label: string; value: string; href?: string }) {
  const content = (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-lg bg-[rgba(212,175,55,0.08)] flex items-center justify-center border border-[rgba(212,175,55,0.15)] shrink-0">
        <Icon className="w-5 h-5 text-[#D4AF37]" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-wider text-[#94A3B8]/60 mb-1">{label}</p>
        <p className="text-[#F1F5F9] font-medium">{value}</p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="glass-card p-5 hover:border-[rgba(212,175,55,0.35)] transition-all block">{content}</a>
  ) : (
    <div className="glass-card p-5">{content}</div>
  );
}

/* ── Navbar ── */
function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 liquid-glass border-b border-[rgba(212,175,55,0.08)]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[rgba(212,175,55,0.1)] flex items-center justify-center border border-[rgba(212,175,55,0.2)]">
            <Scale className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <span className="font-display-legal font-bold text-[#F1F5F9] text-lg tracking-tight">NAGA <span className="text-gold">Law</span></span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {["Practice", "About", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-[#94A3B8] hover:text-[#D4AF37] transition-colors">{item}</a>
          ))}
        </div>
        <a href="#contact" className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-[#090D16] font-semibold rounded-lg text-sm hover:bg-[#E8C84A] transition-colors">
          <MessageCircle className="w-4 h-4" /> Book Consultation
        </a>
      </div>
    </nav>
  );
}

/* ── Footer ── */
function Footer() {
  return (
    <footer className="border-t border-[rgba(212,175,55,0.08)] py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Scale className="w-5 h-5 text-[#D4AF37]" />
              <span className="font-display-legal font-bold text-[#F1F5F9]">NAGA <span className="text-gold">Law Chambers</span></span>
            </div>
            <p className="text-sm text-[#94A3B8]">Premier legal representation in Land, Revenue &amp; Property disputes across Andhra Pradesh courts.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#F1F5F9] mb-3">Practice Areas</h4>
            <div className="space-y-2">
              {["Land Revenue", "Civil Litigation", "Property Law", "Document Drafting"].map((area) => (
                <p key={area} className="text-sm text-[#94A3B8]">{area}</p>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#F1F5F9] mb-3">Contact</h4>
            <div className="space-y-2">
              <p className="text-sm text-[#94A3B8]">+91 94400 00417</p>
              <p className="text-sm text-[#94A3B8]">anantapurbar@nagalaw.com</p>
              <p className="text-sm text-[#94A3B8]">District Court, Anantapur</p>
            </div>
          </div>
        </div>
        <div className="border-t border-[rgba(212,175,55,0.08)] pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#94A3B8]/50">© 2025 NAGA Law Chambers. All rights reserved. Advocate S. Nagendra Naik.</p>
          <div className="flex items-center gap-4">
            <a href="https://t.me/nagalawchambers_bot" className="text-xs text-[#94A3B8]/50 hover:text-[#D4AF37] transition-colors">Telegram</a>
            <a href="#" className="text-xs text-[#94A3B8]/50 hover:text-[#D4AF37] transition-colors">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── Main Page ── */
export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#090D16]">
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <ParticleField />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 65%)" }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[rgba(212,175,55,0.15)] bg-[rgba(212,175,55,0.04)] mb-6"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-xs font-medium text-[#D4AF37]/80">Bar Council of Andhra Pradesh, 2019</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 font-display-legal tracking-tight leading-[1.05] text-[#F1F5F9]"
            >
              Defending{" "}
              <span className="gold-gradient-text">Land, Legacy &amp; Rights</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-lg text-[#94A3B8] max-w-lg mb-8 leading-relaxed"
            >
              Premier legal representation in Land Revenue, Civil Litigation &amp; Property disputes across Andhra Pradesh courts. 7+ years experience.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a href="#contact" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#D4AF37] text-[#090D16] font-semibold rounded-lg hover:bg-[#E8C84A] transition-colors text-base">
                <MessageCircle className="w-4 h-4" /> Book Free Consultation
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#practice" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-[rgba(212,175,55,0.2)] text-[#F1F5F9] font-semibold rounded-lg hover:border-[rgba(212,175,55,0.4)] hover:bg-[rgba(212,175,55,0.05)] transition-all text-base">
                <BookOpen className="w-4 h-4 text-[#D4AF37]" /> Our Practice
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            <div className="relative aspect-[3/4] max-w-md mx-auto rounded-2xl overflow-hidden border border-[rgba(212,175,55,0.2)] shadow-2xl"
            >
              <Image
                src="/advocate.jpg"
                alt="Advocate S. Nagendra Naik"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-xs uppercase tracking-wider text-[#D4AF37]/80 mb-1">Advocate</p>
                <p className="text-xl font-bold text-[#F1F5F9] font-display-legal">S. Nagendra Naik</p>
                <p className="text-sm text-[#94A3B8] mt-1">Anantapur Bar Council · 2019</p>
              </div>
            </div>
            <div className="absolute -inset-4 rounded-2xl pointer-events-none -z-10"
              style={{ background: "radial-gradient(ellipse at center, rgba(212,175,55,0.08) 0%, transparent 70%)" }}
            />
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[#94A3B8]/30"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </section>

      {/* ═══ STATS ═══ */}
      <Section className="py-16 border-t border-[rgba(212,175,55,0.06)]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Stat value="7+" label="Years Practice" icon={Clock} />
            <Stat value="50+" label="Cases Handled" icon={Gavel} />
            <Stat value="100%" label="Client Focus" icon={Users} />
            <Stat value="3" label="Courts Served" icon={Landmark} />
          </div>
        </div>
      </Section>

      {/* ═══ PRACTICE AREAS ═══ */}
      <Section id="practice" className="py-20 border-t border-[rgba(212,175,55,0.06)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-[#D4AF37]/60 mb-3 block">Services</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display-legal text-[#F1F5F9]">Practice Areas</h2>
            <p className="text-[#94A3B8] mt-4 max-w-xl mx-auto">Specialized expertise across land revenue, civil litigation, and property law matters.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <PracticeCard
              icon={Landmark}
              title="Land Revenue"
              desc="ROR corrections, mutation appeals, Patta disputes, and revenue officer grievances handled with precision."
              delay={0}
            />
            <PracticeCard
              icon={Scale}
              title="Civil Litigation"
              desc="Partition suits, declaration suits, injunctions, and all civil matters across district and high courts."
              delay={0.1}
            />
            <PracticeCard
              icon={FileText}
              title="Property Law"
              desc="Title verification, sale deed drafting, registration assistance, and property dispute resolution."
              delay={0.2}
            />
            <PracticeCard
              icon={ShieldCheck}
              title="Document Drafting"
              desc="Legal notices, affidavits, petitions, agreements, and all documentation with proper legal language."
              delay={0.3}
            />
          </div>
        </div>
      </Section>

      {/* ═══ ABOUT / WHY CHOOSE ═══ */}
      <Section id="about" className="py-20 border-t border-[rgba(212,175,55,0.06)]">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden border border-[rgba(212,175,55,0.2)]">
              <Image src="/court-aerial.jpg" alt="Anantapur District Court" width={600} height={400} className="object-cover w-full h-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-xs uppercase tracking-wider text-[#D4AF37]/80 mb-1">Established Presence</p>
                <p className="text-lg font-bold text-[#F1F5F9] font-display-legal">District Court, Anantapur</p>
              </div>
            </div>
            <div className="absolute -inset-4 rounded-2xl pointer-events-none -z-10"
              style={{ background: "radial-gradient(ellipse at center, rgba(212,175,55,0.06) 0%, transparent 70%)" }}
            />
          </div>

          <div>
            <span className="text-xs uppercase tracking-widest text-[#D4AF37]/60 mb-3 block">About</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display-legal text-[#F1F5F9] mb-6">Why Choose NAGA Law Chambers?</h2>

            <div className="space-y-5">
              {[
                { icon: Gavel, title: "Deep Local Knowledge", desc: "Born and practicing in Anantapur district. Intimate understanding of local revenue offices, court procedures, and land records." },
                { icon: Clock, title: "Responsive & Accessible", desc: "Direct communication with your advocate. No layers of staff. Quick turnaround on urgent matters and clear status updates." },
                { icon: ShieldCheck, title: "Transparent Process", desc: "Clear fee structure, honest case assessment, and realistic timelines. No false promises — only committed representation." },
                { icon: Users, title: "Client-First Approach", desc: "Every case is personal. We explain legal options in plain language so you can make informed decisions about your property and rights." },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-[rgba(212,175,55,0.08)] flex items-center justify-center border border-[rgba(212,175,55,0.15)] shrink-0">
                    <item.icon className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h4 className="text-[#F1F5F9] font-semibold mb-1">{item.title}</h4>
                    <p className="text-sm text-[#94A3B8] leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ═══ CTA BANNER ═══ */}
      <Section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative rounded-2xl overflow-hidden p-8 md:p-12 text-center border border-[rgba(212,175,55,0.15)]"
            style={{ background: "linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(15,23,42,0.8) 50%, rgba(212,175,55,0.04) 100%)" }}
          >
            <div className="absolute inset-0 opacity-30"
              style={{ backgroundImage: "url(/watercolor-bg.jpg)", backgroundSize: "cover", backgroundPosition: "center", mixBlendMode: "soft-light" }}
            />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold font-display-legal text-[#F1F5F9] mb-4">Ready to Protect Your Rights?</h2>
              <p className="text-[#94A3B8] max-w-lg mx-auto mb-8">Book a free consultation today. Discuss your case with Advocate S. Nagendra Naik directly.</p>
              <a href="#contact" className="inline-flex items-center gap-2 px-8 py-4 bg-[#D4AF37] text-[#090D16] font-bold rounded-lg hover:bg-[#E8C84A] transition-colors text-lg"
              >
                <MessageCircle className="w-5 h-5" /> Book Consultation
                <ChevronRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══ CONTACT ═══ */}
      <Section id="contact" className="py-20 border-t border-[rgba(212,175,55,0.06)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-[#D4AF37]/60 mb-3 block">Get in Touch</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display-legal text-[#F1F5F9]">Contact Us</h2>
            <p className="text-[#94A3B8] mt-4 max-w-xl mx-auto">Reach out for consultations, case discussions, or any legal queries. We're here to help.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ContactCard
              icon={Phone}
              label="Phone"
              value="+91 94400 00417"
              href="tel:+919440000417"
            />
            <ContactCard
              icon={Mail}
              label="Email"
              value="contact@nagalawchambers.com"
              href="mailto:contact@nagalawchambers.com"
            />
            <ContactCard
              icon={MapPin}
              label="Office"
              value="District Court Premises, Anantapur, AP 515001"
            />
          </div>

          <div className="mt-10 text-center">
            <a
              href="https://t.me/nagalawchambers_bot"
              className="inline-flex items-center gap-3 px-8 py-4 border border-[rgba(212,175,55,0.3)] rounded-xl text-[#F1F5F9] hover:bg-[rgba(212,175,55,0.08)] transition-all"
            >
              <MessageCircle className="w-6 h-6 text-[#D4AF37]" />
              <div className="text-left">
                <p className="text-sm font-medium">Chat on Telegram</p>
                <p className="text-xs text-[#94A3B8]">@nagalawchambers_bot — Quick responses, appointment booking</p>
              </div>
              <ArrowRight className="w-5 h-5 text-[#D4AF37] ml-4" />
            </a>
          </div>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
