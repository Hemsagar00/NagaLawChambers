# NAGA Law Chambers

Official website of **Advocate S. Nagendra Naik** — Anantapur Bar, enrolled with the Bar Council of Andhra Pradesh (2019). Direct advocacy since 2019 in revenue, land, civil, criminal, family, and consumer matters.

**Live:** [www.nagalawchambers.com](https://www.nagalawchambers.com)

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| UI | React 19 + Tailwind CSS v4 |
| Motion | Framer Motion 12 (scroll progress, count-up) and CSS transitions |
| Icons | Lucide React |
| Hosting | Cloudflare (deployed from `master`) |

## Design System

Black, white and translucent glass on a seamless mosaic of rounded cards, set in Open Sauce One. Built from a "masked card" spec: a section's cards are windows onto one shared background image (`src/components/home/masked.tsx`), so the image continues across the gaps between them.

- **Shared images:** `public/mosaic-light.svg` (hero) and `public/mosaic-dark.svg` (practice areas) are contour maps drawn in code. Regenerate with `npx tsx scripts/make-mosaic.ts`; the generator is `src/lib/contours.ts`.
- **Home page:** `src/components/home/landing.tsx` holds the splash counter, fixed navbar, hero, practice areas, courts and process, and the advocate and contact section.
- **Tokens:** `src/app/tokens.css` (pure black and white, neutral greys) and component styles in `src/app/globals.css`, used by the sub-pages, footer and forms.
- **Font:** Open Sauce One, loaded from onlinewebfonts.com in `src/app/layout.tsx`.
- **Motion:** the splash counter, a one-time staggered reveal per section, and a count-up on the years figure. Reduced motion skips the splash and shortens transitions; with scripting off, every section is visible.

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
│   ├── home/                     # Home page: masked-card mosaic, splash, sections
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
