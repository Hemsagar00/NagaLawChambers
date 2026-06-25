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
        description: `NAGA Law Chambers — Advocate ${site.advocate.name} provides legal representation in revenue, land, civil, criminal, family, and consumer matters across Andhra Pradesh courts and statutory forums. Specialising in Tahsildar appeals, RDO proceedings, Adangal corrections, mutations, and AP High Court writs in the Anantapur and Dharmavaram jurisdictions.`,
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
        areaServed: [
          {
            "@type": "AdministrativeArea",
            name: "Anantapur, Andhra Pradesh, India",
          },
          {
            "@type": "AdministrativeArea",
            name: "Dharmavaram, Andhra Pradesh, India",
          },
        ],
        memberOf: {
          "@type": "Organization",
          name: "Anantapur Bar Association",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Legal Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Revenue & Land Law",
                description:
                  "ROR corrections, mutations, patta disputes, Adangal corrections, land acquisition proceedings before Tahsildar, RDO, Collector, and AP High Court.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Civil & Contract Litigation",
                description:
                  "Contract enforcement, recovery suits, specific performance, injunctions, and declaratory relief before District Court and AP High Court.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Bail & Criminal Defence",
                description:
                  "Bail applications, anticipatory bail, quashing petitions under S.482 CrPC, and criminal defence before Sessions and Magistrate Courts.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Family Law & Property Partition",
                description:
                  "Divorce, maintenance, custody, domestic violence remedies, and property partition suits before Family Court and District Court.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Consumer Forum Representation",
                description:
                  "Consumer complaints, deficiency of service, and S.138 NI Act cheque bounce proceedings before District and State Consumer Forums.",
              },
            },
          ],
        },
        availableChannel: [
          {
            "@type": "ServiceChannel",
            serviceType: "Phone consultation",
            servicePhone: {
              "@type": "ContactPoint",
              telephone: site.contact.phoneTel,
              contactType: "Legal consultation",
              availableLanguage: ["English", "Telugu"],
            },
          },
          {
            "@type": "ServiceChannel",
            serviceType: "Email consultation",
            serviceUrl: `mailto:${site.contact.email}`,
          },
        ],
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
        memberOf: {
          "@type": "Organization",
          name: "Anantapur Bar Association",
        },
        knowsAbout: [
          "Revenue Law",
          "Land Disputes",
          "Tahsildar Appeals",
          "RDO Proceedings",
          "Adangal Corrections",
          "Mutations",
          "AP High Court Writs",
          "Civil Litigation",
          "Contract Law",
          "Criminal Bail",
          "Family Law",
          "Property Partition Suits",
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
        name: "NAGA Law Chambers | Advocate S. Nagendra Naik — Revenue, Land & Civil Lawyer in Anantapur",
        isPartOf: { "@id": `${site.url}/#website` },
        about: { "@id": `${site.url}/#organization` },
        primaryImageOfPage: `${site.url}/advocate.jpg`,
        breadcrumb: { "@id": `${site.url}/#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${site.url}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: site.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Practice Areas",
            item: `${site.url}/#practice`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Advocate Profile",
            item: `${site.url}/#advocate`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Contact",
            item: `${site.url}/#contact`,
          },
        ],
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
