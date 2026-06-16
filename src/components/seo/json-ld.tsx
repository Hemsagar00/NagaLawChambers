import { site } from "@/lib/site";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LegalService",
        "@id": `${site.url}/#organization`,
        name: site.name,
        url: site.url,
        telephone: site.contact.phoneTel,
        email: site.contact.email,
        image: `${site.url}/advocate.jpg`,
        logo: `${site.url}/advocate.jpg`,
        description: `NAGA Law Chambers — Advocate ${site.advocate.name} provides legal representation in revenue, land, civil, criminal, family, and consumer matters across Andhra Pradesh courts and statutory forums.`,
        address: {
          "@type": "PostalAddress",
          streetAddress: "District Court Premises",
          addressLocality: "Anantapur",
          addressRegion: "Andhra Pradesh",
          postalCode: "515001",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "14.6819",
          longitude: "77.6006",
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Anantapur, Andhra Pradesh, India",
        },
        priceRange: "$$",
        founder: { "@id": `${site.url}/#person` },
        employee: { "@id": `${site.url}/#person` },
        sameAs: [],
      },
      {
        "@type": "Person",
        "@id": `${site.url}/#person`,
        name: site.advocate.name,
        jobTitle: site.advocate.title,
        image: `${site.url}/advocate.jpg`,
        telephone: site.contact.phoneTel,
        email: site.contact.email,
        worksFor: { "@id": `${site.url}/#organization` },
        alumniOf: site.advocate.barCouncil,
        knowsAbout: [
          "Revenue Law",
          "Land Disputes",
          "Civil Litigation",
          "Contract Law",
          "Criminal Bail",
          "Family Law",
          "Partition Suits",
          "Consumer Law",
          "Negotiable Instruments Act",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        publisher: { "@id": `${site.url}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${site.url}/#webpage`,
        url: site.url,
        name: "NAGA Law Chambers | Advocate S. Nagendra Naik",
        isPartOf: { "@id": `${site.url}/#website` },
        about: { "@id": `${site.url}/#organization` },
        primaryImageOfPage: `${site.url}/advocate.jpg`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
