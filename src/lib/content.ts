import { site } from "@/lib/site";

export type PracticeAreaIcon =
  | "landmark"
  | "file-text"
  | "gavel"
  | "users"
  | "shield-check";
export type StatIcon = "clock" | "book-open" | "map-pin" | "landmark";

export const navLinks = [
  { label: "Practice", href: "#practice" },
  { label: "Advocate", href: "#advocate" },
  { label: "Contact", href: "#contact" },
] as const;

export const practiceAreas = [
  {
    id: "revenue-land",
    icon: "landmark" as const,
    title: "Revenue & Land",
    courts: "Tahsildar, RDO, Collector, AP High Court",
    summary:
      "ROR corrections, mutations, patta disputes, encumbrance issues, and land acquisition proceedings before revenue authorities.",
    details:
      "Representation before Tahsildar, RDO, and Collector on revenue records, encumbrance disputes, and administrative appeals. Writs and revisions before the Andhra Pradesh High Court for title and acquisition challenges across Anantapur district.",
    hoverDetail:
      "ROR updates, Adangal corrections, mutation appeals, patta transfers",
  },
  {
    id: "civil-contract",
    icon: "file-text" as const,
    title: "Civil & Contract",
    courts: "District Court, AP High Court",
    summary:
      "Contract enforcement, recovery suits, specific performance, injunctions, and declaratory relief in civil courts.",
    details:
      "Drafting and contesting civil suits for breach of contract, recovery of dues, injunctions, and specific performance. Appellate representation before the Andhra Pradesh High Court with thorough documentary preparation.",
    hoverDetail:
      "Specific performance, permanent injunctions, recovery suits",
  },
  {
    id: "bail-criminal",
    icon: "gavel" as const,
    title: "Bail & Criminal",
    courts: "Sessions & Magistrate Courts",
    summary:
      "Bail applications, anticipatory bail, quashing petitions, and criminal defence with urgent filing support.",
    details:
      "Regular and anticipatory bail before Sessions and Magistrate courts. Quashing under Section 482 CrPC, trial defence, and custody-related remedies with direct advocate communication on hearing dates.",
    hoverDetail:
      "Anticipatory bail, S.482 CrPC quashing, custody remedies",
  },
  {
    id: "family-partition",
    icon: "users" as const,
    title: "Family & Partition",
    courts: "Family Court, District Court",
    summary:
      "Divorce, maintenance, custody, domestic violence remedies, and property partition suits with clear procedural guidance.",
    details:
      "Mutual and contested divorce, maintenance and custody proceedings, domestic violence remedies, and partition suits for ancestral and self-acquired property before Family Court and District Court.",
    hoverDetail:
      "Partition suits, maintenance under S.125 CrPC, DV Act remedies",
  },
  {
    id: "consumer-forums",
    icon: "shield-check" as const,
    title: "Consumer Forums",
    courts: "District & State Consumer Forum",
    summary:
      "Consumer complaints, deficiency of service, and cheque bounce matters before statutory forums.",
    details:
      "Complaints before District and State Consumer Disputes Redressal Commissions. Negotiable Instruments Act proceedings including Section 138 cheque bounce cases with focused pleadings and hearing representation.",
    hoverDetail:
      "S.138 NI Act, deficiency complaints, statutory forum appeals",
  },
] as const;

export const practiceAreaTitles = practiceAreas.map((area) => area.title);

export const stats = [
  {
    value: `${new Date().getFullYear() - site.advocate.practisingSince}+`,
    label: "Years Practising",
    icon: "clock" as const,
  },
  {
    value: String(site.advocate.barCouncilYear),
    label: "Bar Council Enrolled",
    icon: "book-open" as const,
  },
  {
    value: "Anantapur",
    label: "Bar Association",
    icon: "map-pin" as const,
  },
  {
    value: "5",
    label: "Practice Areas",
    icon: "landmark" as const,
  },
] as const;

export const credentials = [
  `${site.advocate.barCouncil} — Enrolled ${site.advocate.barCouncilYear}`,
  `Anantapur Bar — practising since ${site.advocate.practisingSince}`,
  "Revenue & land record expertise",
  "Urgent bail and interim relief",
] as const;

export const hero = {
  eyebrow: `BAR COUNCIL OF ANDHRA PRADESH • ${site.advocate.barCouncilYear}`,
  headline: ["Defending", "Land, Legacy", "& Rights"],
  description: `Advocate ${site.advocate.name} practises at Anantapur Bar since ${site.advocate.practisingSince}, appearing before revenue authorities, district courts, and the Andhra Pradesh High Court.`,
  ctaPrimary: "Book Consultation",
  ctaSecondary: "Practice Areas",
} as const;

export const about = {
  eyebrow: "ADVOCATE PROFILE",
  title: site.advocate.name,
  subtitle:
    "Direct advocacy grounded in Anantapur courts, revenue offices, and local procedure.",
  paragraphs: [
    `Advocate ${site.advocate.name} has practised in Anantapur district since ${site.advocate.practisingSince}, with deep familiarity in revenue records, district court procedure, and the forums where land and property disputes are decided. Enrolled with the ${site.advocate.barCouncil} in ${site.advocate.barCouncilYear}, he appears regularly before Tahsildar, RDO, District Courts, and the Andhra Pradesh High Court.`,
    "Clients receive direct communication with the advocate — clear case assessment, transparent fee discussion, and timely updates on filings, hearings, and compliance. Preparation on revenue and title documents precedes every court or administrative proceeding.",
  ],
} as const;

export const courtMatrix = [
  "Tahsildar and MRO offices — Anantapur & Dharmavaram",
  "Revenue Divisional Office (RDO) proceedings",
  "District Court, Anantapur",
  "Family Court and Consumer Commissions",
  "Sessions and Magistrate Courts",
  "Andhra Pradesh High Court, Amaravati",
] as const;

export const processSteps = [
  {
    title: "Document audit",
    body: "Sale deeds, pattadar records, notices, pleadings, orders, and prior case papers are checked before advice is given.",
  },
  {
    title: "Forum strategy",
    body: "The correct court or authority is selected early so time is not lost in the wrong procedural route.",
  },
  {
    title: "Drafting and filing",
    body: "Petitions, counters, affidavits, appeals, and notices are prepared with the facts arranged for hearing clarity.",
  },
  {
    title: "Hearing guidance",
    body: "Clients receive direct updates on hearing dates, compliance, likely next steps, and realistic risk.",
  },
] as const;

export const footerBlurb = `Advocate ${site.advocate.name} — focused representation in revenue, civil, criminal, family, and consumer matters before Andhra Pradesh courts and statutory forums.`;
