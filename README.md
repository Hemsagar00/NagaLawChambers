# NAGA Law Chambers

Official website of **Advocate S. Nagendra Naik** — Anantapur Bar, enrolled with the Bar Council of Andhra Pradesh (2019). Direct advocacy since 2019 in revenue, land, civil, criminal, family, and consumer matters across Andhra Pradesh.

**Live:** [www.nagalawchambers.com](https://www.nagalawchambers.com)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5.8 |
| UI | React 19 + Tailwind CSS v4 |
| Motion | Framer Motion 12 (scroll progress, count-up, parallax), CSS keyframe animations |
| Icons | Lucide React |
| Hosting | Vercel (deployed from `master`) |

## Design System

Calm, professional, editorial. A pale blue-grey page, deep navy text, large serif headlines over clean sans-serif body copy, white rounded cards and pill buttons. Every token lives in `src/app/tokens.css`.

| Token | Value | Usage |
|---|---|---|
| Paper | `oklch(95% 0.01 253)` · `#EAEFF5` | Page background |
| Ink | `oklch(26.9% 0.121 270)` · `#121B60` | Text, primary buttons, navy panels |
| Card | `oklch(100% 0 0)` · white | Cards, forms, elevated surfaces |
| WhatsApp | `oklch(72% 0.19 150)` | WhatsApp buttons only |

- **Typography:** Instrument Serif (headings, hero italic) + Inter (body), loaded with `next/font/google`.
- **Motion:** page-load rise and photo reveal (CSS `.anim-rise`, `.line-mask`, `.anim-photo`), slow parallax drift on scroll, forum list line-draw, rules that draw across cards on entrance, card/button hover lifts, count-up figures, animated phone menu, header shadow on scroll. Only `transform` and `opacity` animate. `prefers-reduced-motion: reduce` shows everything at once; no-script shows everything too.
- **Textures:** `public/contours-light.svg` and `public/contours-navy.svg` — contour-map patterns generated in code (`src/lib/contours.ts`).
- **Photo:** The advocate's photograph is the only photo. Nothing is stock or AI-generated.

## Routes

| Route | Purpose |
|---|---|
| `/` | Homepage — hero, practice areas, advocate profile, courts, FAQ, contact + intake form |
| `/te` | Telugu homepage (same layout, Telugu text). Hidden until `teluguEnabled` in `src/lib/features.ts` is `true` |
| `/practice/[slug]` | 5 practice-area landing pages (local SEO) |
| `/locations/[slug]` | Anantapur & Dharmavaram location pages |
| `/privacy` | Privacy policy |
| `/sitemap.xml` | Generated at build |
| `/robots.txt` | Generated at build |
| `/opengraph-image` | 1200×630 social card (generated at build) |

## SEO & Lead Generation

- **Structured Data:** LegalService + Person + WebSite + WebPage + BreadcrumbList + FAQPage JSON-LD graph
- **Per-page metadata:** unique title, description, Open Graph, Twitter Card, canonical URL for every route
- **WhatsApp:** floating FAB, sticky mobile Call/WhatsApp bar, intake form → `wa.me` click-to-chat
- **GA4** (`G-3151ZCBVJM`) + **GTM** (`GTM-PHNQXPGP`) — events: `call_click`, `whatsapp_click`, `email_click`, `map_click`, `consult_click`, `lead_submit`
- **Cookie consent:** opt-in banner before any tracking scripts load
- **Security headers:** `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` via `vercel.json`
- **AI discovery:** `/llms.txt` for LLM-powered search

## Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Homepage
│   ├── layout.tsx                # Root layout, fonts, analytics, JSON-LD
│   ├── globals.css               # Component classes (.naga-*)
│   ├── tokens.css                # Design tokens (colors, spacing, type)
│   ├── base.css                  # CSS reset + base styles
│   ├── practice/[slug]/page.tsx  # Practice-area pages (SSG)
│   ├── locations/[slug]/page.tsx # Location pages (SSG)
│   ├── privacy/page.tsx          # Privacy policy
│   ├── te/                       # Telugu homepage
│   ├── opengraph-image.tsx       # 1200x630 social card
│   ├── icon.tsx                  # Favicon (generated)
│   ├── sitemap.ts / robots.ts    # SEO routes
├── components/
│   ├── analytics/                # GA4, GTM, consent banner
│   ├── conversion/               # WhatsApp FAB, sticky CTA, intake form
│   ├── layout/                   # SiteHeader, SiteFooter
│   ├── home/                     # Home page sections + scroll-in reveal
│   ├── motion/                   # Scroll progress, smooth scroll, count-up, parallax
│   ├── seo/                      # JSON-LD, FAQ accordion, page schema
│   ├── map-embed.tsx             # Google Maps embed (no API key)
│   └── testimonials.tsx          # Renders only with real testimonials
└── lib/
    ├── site.ts                   # Contact, advocate, analytics, GBP config
    ├── content.ts                # Practice areas, stats, copy
    ├── home-copy.ts              # Telugu translations
    ├── local-seo.ts              # Practice/location page content + FAQs
    ├── whatsapp.ts               # wa.me URL helpers
    ├── analytics.ts              # trackEvent → gtag + dataLayer
    ├── contours.ts               # SVG contour-map generator
    └── icons.ts                  # Lucide icon mapping
```

## Editing Content

| What to change | File |
|---|---|
| Phone, email, office, GBP links, analytics IDs | `src/lib/site.ts` |
| Practice areas, stats, hero/about copy, testimonials | `src/lib/content.ts` |
| Telugu text | `src/lib/home-copy.ts` |
| WhatsApp channel, Instagram (footer + schema) | `socialProfiles` in `src/lib/site.ts` |
| Practice/location page copy + FAQs | `src/lib/local-seo.ts` |
| Design tokens (colors, spacing, type) | `src/app/tokens.css` |
| Advocate photo | `public/advocate.jpg` (do not rename) |
| AI assistant facts | `public/llms.txt` |

## Development

```bash
npm install
npm run dev     # http://localhost:3000 (Turbopack)
npm run build   # production build (14+ static routes)
npm run lint    # ESLint
```

## Deployment

Hosted on **Vercel**, deployed automatically from `master` branch.

Environment variables (set in Vercel project settings):

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL (defaults to `https://www.nagalawchambers.com`) |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console token |
| `NEXT_PUBLIC_GA_ID` | Override GA4 Measurement ID |
| `NEXT_PUBLIC_GTM_ID` | Override GTM container ID |

## Legal Compliance

This website complies with **Bar Council of India Rule 36** — no solicitation, no client-count claims, no invented testimonials. The statutory disclaimer is maintained in the footer and layout. Content is purely informational about the advocate's practice areas and qualifications.

## Repository

- **GitHub:** [Hemsagar00/NagaLawChambers](https://github.com/Hemsagar00/NagaLawChambers) · branch `master`
- **Maintained by:** HemSagar Kasi

## License

Private — All rights reserved. © NAGA Law Chambers. Advocate S. Nagendra Naik.
