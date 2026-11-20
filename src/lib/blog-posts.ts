import { site } from "@/lib/site";

export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  body: string[];
  faqs: { q: string; a: string }[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "ror-adangal-correction-andhra-pradesh",
    title:
      "How to Correct a Wrong Entry in Your Adangal or 1-B Record in Andhra Pradesh",
    summary:
      "A step-by-step guide for landowners whose revenue records show incorrect ownership, survey numbers, or extent — from Tahsildar applications to High Court writs.",
    date: "2026-11-15",
    readTime: "6 min read",
    category: "Revenue & Land Law",
    author: site.advocate.name,
    body: [
      `Your Adangal (Pahani) and 1-B (Record of Rights) are the primary proof of your land ownership in Andhra Pradesh. A single wrong entry — a misspelled name, an incorrect survey number, or a mutation you never authorised — can block a sale, a loan, or a court case before it begins.`,
      `The correction process starts at the village level. You submit an application to the Tahsildar or MRO office, supported by your sale deed, prior revenue records, survey documents, and any notices you've received. The revenue inspector then verifies the entry against village records before recommending a correction.`,
      `If the Tahsildar rejects your application or does not act within a reasonable time, the next forum is the Revenue Divisional Officer (RDO) or the District Collector through a revision or appeal. Each forum has its own limitation periods and procedural requirements, so the documents you file at the first stage often decide whether you succeed at the second.`,
      `When the revenue authorities refuse to correct a clear error, the Andhra Pradesh High Court at Amaravati can be approached through a writ petition under Article 226. The court examines whether the authority acted arbitrarily, violated procedure, or ignored the record evidence.`,
      `Clients often lose these cases not because their claim is weak, but because they filed in the wrong forum or missed a limitation date. A correct assessment at the start — which forum, which document, which deadline — is what separates a successful correction from a rejected plea.`,
    ],
    faqs: [
      {
        q: "How long does an Adangal correction take?",
        a: "There is no fixed timeline. A straightforward mutation at the Tahsildar level may take weeks; a contested revision before the RDO or Collector can take months. The High Court route depends on listing and the government's response.",
      },
      {
        q: "What documents should I carry to the Tahsildar?",
        a: "Your sale deed or title deed, pattadar passbook, recent Adangal/1-B extract, encumbrance certificate, any notice or order you received, and identity proof. Even partial documentation helps the revenue officer assess the correction.",
      },
      {
        q: "Can I approach the High Court directly without going to the Tahsildar?",
        a: "Generally, no. The High Court expects you to exhaust the available departmental remedy first — applying to the Tahsildar, then appealing to the RDO or Collector — unless exceptional circumstances justify direct intervention.",
      },
    ],
  },
  {
    slug: "anticipatory-bail-anantapur-andhra-pradesh",
    title: "Anticipatory Bail in Anantapur: When to Apply and What the Court Expects",
    summary:
      "A practical guide to anticipatory bail under BNSS/CrPC — who can apply, what grounds succeed, and how Sessions and Magistrate courts in Anantapur handle urgent liberty petitions.",
    date: "2026-10-22",
    readTime: "5 min read",
    category: "Criminal Defence",
    author: site.advocate.name,
    body: [
      `If you anticipate arrest in a non-bailable case in Anantapur, the law allows you to seek protection before you are taken into custody. Anticipatory bail is not a favour — it is a statutory right under Section 482 of the BNSS (formerly Section 438 CrPC) when you can show a reasonable apprehension of arrest.`,
      `The application is moved before the Sessions Court or the High Court, not the Magistrate. The court considers the nature of the offence, your role in the alleged incident, your likelihood of absconding, and whether your custody is necessary for investigation. A bare fear of arrest is not enough; the application must be grounded in the FIR, the sections invoked, and any prior conduct by the police.`,
      `Timing matters. Filing too early, before an FIR is registered or before there is any concrete indication of arrest, can lead to dismissal. Filing too late, after the police have already moved to arrest, reduces the window for urgent relief. The right moment is when credible information suggests arrest is imminent and the documents are ready.`,
      `Once granted, anticipatory bail usually comes with conditions — cooperating with the investigation, not tampering with evidence, and appearing before the police or court as directed. Violating those conditions can result in cancellation of the bail and immediate arrest.`,
      `In Anantapur, both the Sessions Court and the Magistrate courts handle criminal matters regularly, but anticipatory bail lies specifically with the Sessions Judge or the Andhra Pradesh High Court. Direct advocate communication on listing dates and the court's inclinations can make the difference between release and custody.`,
    ],
    faqs: [
      {
        q: "Can anticipatory bail be cancelled?",
        a: "Yes. If you violate the conditions — for example, by leaving the jurisdiction without permission or influencing witnesses — the prosecution can move to cancel the bail, and you may be taken into custody.",
      },
      {
        q: "How quickly can an anticipatory bail application be heard?",
        a: "Urgent applications can be listed quickly depending on the court's roster. In Anantapur Sessions Court, urgent liberty matters are sometimes taken up the same day or within a few days, but there is no guarantee — early filing is essential.",
      },
      {
        q: "Does anticipatory bail apply to all offences?",
        a: "No. It is generally available for non-bailable offences where arrest is anticipated.",
      },
    ],
  },
  {
    slug: "cheque-bounce-section-138-ni-act-andhra-pradesh",
    title:
      "Cheque Bounce Under Section 138 NI Act in Andhra Pradesh: Notice, Complaint, and Timeline",
    summary:
      "A practical walkthrough of cheque bounce cases — the 30-day demand notice, the complaint before the Magistrate, and what complainants and drawers need to know before the Andhra Pradesh courts.",
    date: "2026-09-30",
    readTime: "7 min read",
    category: "Consumer & Negotiable Instruments",
    author: site.advocate.name,
    body: [
      `A dishonoured cheque is not just a banking inconvenience — under Section 138 of the Negotiable Instruments Act, it can be a criminal offence with imprisonment and a fine. But the law is strict about timing, and a single missed deadline can kill the case.`,
      `The process begins with a demand notice. When the bank returns the cheque unpaid, the payee must send a written notice to the drawer within 30 days of receiving the cheque-return memo. The notice must demand payment within 15 days. Missing either of these windows ends the statutory remedy.`,
      `If the drawer does not pay within 15 days of receiving the notice, a complaint can be filed before the Magistrate within one month of the notice period expiring. The complaint must be supported by the original cheque, the return memo, the demand notice, and proof of service.`,
      `For the drawer, the defence often turns on whether the cheque was issued for a legally enforceable debt or liability, and whether the notice was properly served. Mere denial that the cheque was signed is rarely enough if the bank has already processed and returned it.`,
      `In Anantapur, these complaints are filed before the Magistrate courts, which handle a high volume of Section 138 cases. The timeline from notice to final disposal can stretch over months, so early legal advice on whether to pursue criminal prosecution or a civil recovery suit matters a great deal.`,
    ],
    faqs: [
      {
        q: "What happens if I miss the 30-day notice deadline?",
        a: "You generally lose the right to file a criminal complaint under Section 138. You may still pursue a civil suit for recovery of the amount, but the criminal remedy under the NI Act is time-barred.",
      },
      {
        q: "Can the drawer avoid liability by saying they had no funds?",
        a: "No. The presumption under the NI Act is that the cheque was issued for the discharge of a debt or liability. The burden then shifts to the drawer to prove otherwise — and \"insufficient funds\" is not a valid defence.",
      },
      {
        q: "Can the case be settled out of court?",
        a: "Yes. Section 138 cases can be compounded (settled) between the parties with the court's permission. Many matters are resolved through payment before or during trial.",
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getBlogPostSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}
