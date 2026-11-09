# NAGA Law Chambers

Official website of **Advocate S. Nagendra Naik** — Anantapur Bar, enrolled with the Bar Council of Andhra Pradesh (2019). Direct advocacy since 2019 in revenue, land, civil, criminal, family, and consumer matters.

**Live:** [www.nagalawchambers.com](https://www.nagalawchambers.com)

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| UI | React 19 + Tailwind CSS v4 |
| Motion | Framer Motion 12 (scroll progress, count-up), CSS transitions |
| Icons | Lucide React |
| Hosting | Cloudflare (deployed from `master`) |

## Design System

Calm, professional and editorial: a pale blue-grey page, deep navy text, a large serif headline over a clean sans-serif body, white rounded cards and pill buttons. The layout follows the consulting-template pattern (hero, who we are, expertise cards, process steps, closing call to action) as a reference only; all code, copy and assets here are original.

| Token | Value | Usage |
|---|---|---|
| Paper | `oklch(95% 0.01 253)` (`#EAEFF5`) | Page background |
| Ink | `oklch(26.9% 0.121 270)` (`#121B60`) | Text, primary buttons, the navy panels |
| Card | white | Cards and forms |
| WhatsApp green | `oklch(72% 0.19 150)` | The WhatsApp buttons only |

- **Type:** Instrument Serif (headings, one italic phrase in the hero) and Inter (body), loaded with `next/font`.
- **Tokens and components:** `src/app/tokens.css` and `src/app/globals.css`. The home page is `src/components/home/landing.tsx`; scroll-in fades are `reveal.tsx` (fully visible with scripting off or reduced motion).
- **Textures:** `public/contours-light.svg` and `public/contours-navy.svg` are contour maps drawn in code. Regenerate with `npx tsx scripts/make-contours.ts` (generator: `src/lib/contours.ts`).
- **Photo:** the advocate's photograph is the only photo. Nothing is stock or invented.

## Routes

| Route | Purpose |
|---|---|
| `/` | Homepage — hero, practice areas, advocate profile, courts, FAQ, contact + intake form |
| `/te` | Telugu homepage (same layout, Telugu text from `src/lib/home-copy.ts`) |
| `/practice/[slug]` | 5 practice-area landing pages (local SEO) |
| `/locations/[slug]` | Anantapur & Dharmavaram location pages |
| `/sitemap.xml`, `/robots.txt`, `/opengraph-image` | Generated at build |

## Lead Generation & Analytics

- **WhatsApp**: floating FAB, sticky mobile Call/WhatsApp bar, intake form → `wa.me` click-to-chat (no backend)
- **GA4** (`G-3151ZCBVJM`) + **GTM** (`GTM-PHNQXPGP`) — events: `call_click`, `whatsapp_click`, `email_click`, `map_click`, `consult_click`, `lead_submit`
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
│   ├── home/                     # Home page sections and scroll-in fade
│   ├── motion/                   # Scroll progress, smooth scroll, count-up
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
| Telugu text for the home page | `src/lib/home-copy.ts` (have a Telugu speaker check changes) |
| Instagram / LinkedIn links (footer + schema) | `socialProfiles` in `src/lib/site.ts` |
| Practice/location page copy + FAQs | `src/lib/local-seo.ts` |
| Design tokens | `src/app/globals.css` |
| Advocate photo | `public/advocate.jpg` (do not rename) |
| Facts for AI assistants (`/llms.txt`) | `public/llms.txt` (keep in sync with `src/lib/site.ts` and `src/lib/content.ts`) |

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (14 static routes)
npm run lint
```

## Deployment

Hosted on **Cloudflare**, deployed from `master`. Build and deploy settings live in the Cloudflare dashboard, not in this repo.

Optional env vars (set them in the Cloudflare project settings):

```
NEXT_PUBLIC_SITE_URL=https://www.nagalawchambers.com
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=<GSC token>
NEXT_PUBLIC_GA_ID=<override GA4 id>
NEXT_PUBLIC_GTM_ID=<override GTM id>
```

Notes:

- `NEXT_PUBLIC_SITE_URL` drives the canonical URL, sitemap and `llms.txt` links. It defaults to `https://www.nagalawchambers.com`. If you set this variable in Cloudflare, it overrides that default, so keep it on `www` (the apex redirects to `www`).
- `vercel.json` is left over from the earlier Vercel setup. Cloudflare ignores it, so its redirects and security headers (`X-Frame-Options`, `nosniff`, `Referrer-Policy`) do not apply there. Recreate them in Cloudflare (Rules, or a `_headers` file) if you want them.
- A Vercel project is still connected to this repo and comments on pull requests. Disconnect it if it is no longer used.

## Repository

- **GitHub:** [Hemsagar00/NagaLawChambers](https://github.com/Hemsagar00/NagaLawChambers) · branch `master`
- **Maintained by:** HemSagar Kasi

## License

Private — All rights reserved. © NAGA Law Chambers. Advocate S. Nagendra Naik.
