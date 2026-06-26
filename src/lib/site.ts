export const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://nagalawchambers.com";

export const metadataBase = new URL(baseUrl);

export const site = {
  name: "NAGA Law Chambers",
  shortName: "NAGA Law",
  url: baseUrl,
  copyrightYear: 2026,
  advocate: {
    name: "S. Nagendra Naik",
    title: "Advocate",
    practisingSince: 2011,
    barCouncilYear: 2019,
    barCouncil: "Bar Council of Andhra Pradesh",
  },
  contact: {
    phoneDisplay: "+91 94400 00417",
    phoneTel: "+919440000417",
    email: "nagalawchambers@gmail.com",
    office: "District Court Premises, Anantapur, Andhra Pradesh 515001",
  },
} as const;

export const phoneHref = `tel:${site.contact.phoneTel}`;
export const emailHref = `mailto:${site.contact.email}`;
export const mapHref =
  "https://www.google.com/maps/search/?api=1\u0026query=District+Court+Premises,+Anantapur,+Andhra+Pradesh+515001";