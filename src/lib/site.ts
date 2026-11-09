export const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.nagalawchambers.com";

export const metadataBase = new URL(baseUrl);

export const site = {
  name: "NAGA Law Chambers",
  shortName: "NAGA Law",
  url: baseUrl,
  copyrightYear: 2026,
  advocate: {
    name: "S. Nagendra Naik",
    title: "Advocate",
    practisingSince: 2019,
    barCouncilYear: 2019,
    barCouncil: "Bar Council of Andhra Pradesh",
  },
  contact: {
    phoneDisplay: "+91 94400 00417",
    phoneTel: "+919440000417",
    whatsapp: "919440000417",
    email: "nagalawchambers@gmail.com",
    office: "Sub Registrar Office, Revenue Colony, Kovur Nagar, Opp. Ramnagar Park, Anantapur, Andhra Pradesh 515004",
  },
  analytics: {
    // GA4 Measurement ID (public by design). Override per-env with NEXT_PUBLIC_GA_ID.
    gaId: "G-3151ZCBVJM",
    // Google Tag Manager container. Override per-env with NEXT_PUBLIC_GTM_ID.
    gtmId: "GTM-PHNQXPGP",
  },
  geo: { latitude: "14.6709404", longitude: "77.5871233" },
  // Google Business Profile. Paste these to activate the map link, the
  // schema `sameAs`, and the "Leave a Google review" CTA. Blank = hidden.
  //   profileUrl: your GBP/Maps listing URL (e.g. https://g.page/...)
  //   reviewUrl:  your direct review link (e.g. https://g.page/r/XXXX/review)
  gbp: {
    profileUrl: "https://maps.app.goo.gl/L4J8kdD6TN3PiPAa7",
    reviewUrl: "",
    placeId: "",
  },
} as const;

export const phoneHref = `tel:${site.contact.phoneTel}`;
export const emailHref = `mailto:${site.contact.email}`;
export const mapHref =
  "https://maps.app.goo.gl/L4J8kdD6TN3PiPAa7";

// Keyless Google Maps embed (no API key needed) for the contact/location UI.
export const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  "NAGA Law Chambers, Sub Registrar Office, Revenue Colony, Kovur Nagar, Anantapur, Andhra Pradesh 515004"
)}&output=embed`;