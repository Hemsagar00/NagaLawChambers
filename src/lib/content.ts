import { site } from "@/lib/site";

export type PracticeAreaIcon = "landmark" | "file-text" | "scale" | "users";
export type StatIcon = "clock" | "book-open" | "map-pin" | "landmark";

export const navLinks = [
  { label: "Practice", href: "#practice" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export const practiceAreas = [
  {
    id: "revenue-land",
    icon: "landmark" as const,
    title: "Revenue & Land",
    courts: "Tahsildar, RDO, AP High Court",
    summary:
      "ROR corrections, mutations, patta disputes, and land acquisition matters before revenue authorities and appellate forums.",
    details:
      "Representation before Tahsildar, RDO, and Collector on revenue records, encumbrance disputes, and administrative appeals. High Court writs and revisions for land title and government acquisition challenges across Anantapur district.",
  },
  {
    id: "civil-contract-partition",
    icon: "file-text" as const,
    title: "Civil & Contract / Partition",
    courts: "District Court, AP High Court",
    summary:
      "Property partition, title disputes, specific performance, and contractual enforcement in civil courts.",
    details:
      "Filing and defending partition suits, injunctions, declaration of title, and boundary conflicts. Contract breach, recovery suits, and declaratory relief before District Courts with appellate representation in the Andhra Pradesh High Court.",
  },
  {
    id: "bail-criminal",
    icon: "scale" as const,
    title: "Bail & Criminal",
    courts: "Sessions & Magistrate Courts",
    summary:
      "Bail applications, anticipatory bail, quashing petitions, and criminal defence with urgent filing support.",
    details:
      "Regular and anticipatory bail in Sessions and Magistrate courts. Quashing under Section 482 CrPC, trial defence, and procedural remedies with direct advocate communication on custody and hearing dates.",
  },
  {
    id: "family-consumer",
    icon: "users" as const,
    title: "Family & Consumer",
    courts: "Family Court, Consumer Forum",
    summary:
      "Divorce, maintenance, custody, consumer complaints, and cheque bounce matters with clear case assessment.",
    details:
      "Mutual and contested divorce, maintenance and custody proceedings, domestic violence remedies, and consumer forum complaints. Negotiable Instruments Act matters including Section 138 cheque bounce cases.",
  },
] as const;

export const practiceAreaTitles = practiceAreas.map((area) => area.title);

export const stats = [
  {
    value: String(site.advocate.practisingSince),
    label: "Practising Since",
    icon: "clock" as const,
  },
  {
    value: String(site.advocate.barCouncilYear),
    label: "Bar Council Enrolled",
    icon: "book-open" as const,
  },
  {
    value: "Anantapur",
    label: "District Practice",
    icon: "map-pin" as const,
  },
  {
    value: "AP",
    label: "Courts & Forums",
    icon: "landmark" as const,
  },
] as const;

export const credentials = [
  `${site.advocate.barCouncil} — ${site.advocate.barCouncilYear}`,
  "Anantapur District Court practice",
  "Revenue & land record expertise",
  "Urgent bail and interim relief",
] as const;

export const hero = {
  eyebrow: `BAR COUNCIL OF ANDHRA PRADESH • ${site.advocate.barCouncilYear}`,
  headline: ["Defending", "Land, Legacy", "& Rights"],
  description: `Advocate ${site.advocate.name} practises in Anantapur since ${site.advocate.practisingSince}, representing clients in revenue, civil, criminal, and family matters before district courts and Andhra Pradesh authorities.`,
} as const;

export const about = {
  eyebrow: "ADVOCATE PROFILE",
  title: site.advocate.name,
  subtitle:
    "Direct advocacy grounded in Anantapur courts, revenue offices, and local procedure.",
  paragraphs: [
    `Advocate ${site.advocate.name} has practised in Anantapur district since ${site.advocate.practisingSince}, building deep familiarity with revenue records, district court procedure, and the forums where land and property disputes are decided. He was enrolled with the ${site.advocate.barCouncil} in ${site.advocate.barCouncilYear} and appears regularly before Tahsildar, RDO, District Courts, and the Andhra Pradesh High Court.`,
    "Clients receive direct communication with the advocate — clear case assessment, transparent fee discussion, and timely updates on filings, hearings, and compliance steps. The practice prioritises thorough preparation on revenue and title documents before court or administrative proceedings.",
  ],
} as const;

export const footerBlurb = `Advocate ${site.advocate.name} — focused representation in revenue, land, civil, criminal, and family matters before Andhra Pradesh courts and revenue authorities.`;