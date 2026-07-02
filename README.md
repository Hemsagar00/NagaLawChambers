# NAGA Law Chambers

Official website of **Advocate S. Nagendra Naik** — Anantapur Bar, enrolled with the Bar Council of Andhra Pradesh (2019). 8+ years of direct advocacy in revenue, land, civil, criminal, family, and consumer matters.

**Live:** [nagalawchambers.com](https://nagalawchambers.com)

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| UI | React 19 + Tailwind CSS v4 |
| Motion | Framer Motion 12 |
| Icons | Lucide React |
| Hosting | Vercel (auto-deploy from `master`) |

## Design System — "Direction A"

Cinematic dark professional legal UI: premium glassmorphism, micro-grid + scanline texture, HUD-pulse accents.

| Token | Value | Usage |
|---|---|---|
| Base dark | `#050508` | Page background |
| Legal gold | `#d4af37` | Authority, primary CTAs, headings |
| HUD cyan | `#00e5ff` | Interactive accents, icon shells, hovers |
| Sapphire | `#1e3a8a` | Ambient glows |
| WhatsApp green | `#25d366` | WhatsApp CTAs only |

Tokens and utilities (`.naga-*`) live in `src/app/globals.css`. Typography: Playfair Display (display) + Inter (body).

## Routes

| Route | Purpose |
|---|---|
| `/` | Homepage — hero, practice areas, advocate profile, courts, contact + intake form |
| `/practice/[slug]` | 5 practice-area landing pages (local SEO) |
| `/locations/[slug]` | Anantapur & Dharmavaram location pages |
| `/sitemap.xml`, `/robots.txt`, `/opengraph-image` | Generated at build |

## Lead Generation & Analytics

- **WhatsApp**: floating FAB, sticky mobile Call/WhatsApp bar, intake form → `wa.me` click-to-chat (no backend)
- **GA4** (`G-3151ZCBVJM`) + **GTM** (`GTM-PHNQXPGP`) — events: `call_click`, `whatsapp_click`, `email_click`, `map_click`, `lead_submit`
- **SEO**: LegalService/Person/FAQPage/Breadcrumb JSON-LD, per-page metadata + canonicals, keyless Google Maps embed

## Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Homepage (client component)
│   ├── layout.tsx                # Metadata, fonts, analytics, JSON-LD
│   ├── globals.css               # Design tokens + .naga-* utilities
│   ├── practice/[slug]/page.tsx  # Practice-area pages (SSG)
│   ├── locations/[slug]/page.tsx # Location pages (SSG)
│   ├── opengraph-image.tsx       # 1200x630 social card
│   ├── icon.tsx                  # Favicon
│   ├── sitemap.ts / robots.ts
├── components/
│   ├── analytics/                # GA4 + GTM loaders
│   ├── conversion/               # WhatsApp FAB, sticky CTA, intake form, inline CTA
│   ├── layout/                   # SiteHeader, SiteFooter
│   ├── motion/                   # Scroll progress, smooth scroll
│   ├── seo/                      # JSON-LD, FAQ, page schema
│   ├── map-embed.tsx             # Keyless Google Maps embed
│   └── testimonials.tsx          # Renders only when real testimonials exist
└── lib/
    ├── site.ts                   # Contact, advocate, analytics IDs, GBP config
    ├── content.ts                # Practice areas, stats, copy, testimonials
    ├── local-seo.ts              # Practice/location page content
    ├── whatsapp.ts               # wa.me helpers
    ├── analytics.ts              # trackEvent → gtag + dataLayer
    └── icons.ts                  # Icon mapping
```

## Editing Content

| What to change | File |
|---|---|
| Phone, email, office, GBP links, analytics IDs | `src/lib/site.ts` |
| Practice areas, stats, hero/about copy, testimonials | `src/lib/content.ts` |
| Practice/location page copy + FAQs | `src/lib/local-seo.ts` |
| Design tokens | `src/app/globals.css` |
| Advocate photo | `public/advocate.jpg` (do not rename) |

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (14 static routes)
npm run lint
```

## Deployment

Vercel auto-deploys from `master`. Optional env vars:

```
NEXT_PUBLIC_SITE_URL=https://nagalawchambers.com
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=<GSC token>
NEXT_PUBLIC_GA_ID=<override GA4 id>
NEXT_PUBLIC_GTM_ID=<override GTM id>
```

Manual deploy: `npx vercel --prod`

## Repository

- **GitHub:** [Hemsagar00/NagaLawChambers](https://github.com/Hemsagar00/NagaLawChambers) · branch `master`
- **Maintained by:** HemSagar Kasi

## License

Private — All rights reserved. © NAGA Law Chambers. Advocate S. Nagendra Naik.
