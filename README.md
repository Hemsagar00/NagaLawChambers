# NAGA Law Chambers

Official website of **Advocate S. Nagendra Naik** — practising in Anantapur, Andhra Pradesh since 2011. Enrolled with the Bar Council of Andhra Pradesh in 2019.

**Live:** [nagalawchambers.com](https://nagalawchambers.com)

## About

NAGA Law Chambers provides focused legal representation before Andhra Pradesh courts and revenue authorities. The site is advocate-first and trust-building — no marketing fluff.

### Practice Areas

- **Revenue & Land** — Tahsildar, RDO, AP High Court
- **Civil & Contract / Partition** — District Court, AP High Court
- **Bail & Criminal** — Sessions & Magistrate Courts
- **Family & Consumer** — Family Court, Consumer Forum

### Contact

| | |
|---|---|
| Phone | +91 94400 00417 |
| Email | contact@nagalawchambers.com |
| Office | District Court Premises, Anantapur, Andhra Pradesh 515001 |

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| UI | React 19 + Tailwind CSS v4 |
| Motion | Framer Motion 12 |
| Icons | Lucide React |
| Export | Static (`output: 'export'`) |
| Hosting | Vercel |
| Domain | [nagalawchambers.com](https://nagalawchambers.com) |

## Design System (Kiwi)

| Token | Value | Usage |
|---|---|---|
| Primary dark | `#050508` | Page background, professional base |
| Accent cyan | `#00E5FF` | HUD highlights, interactive accents |
| Gold | `#D4AF37` | Legal authority, CTAs, headings |
| Style | Glassmorphism, scanlines, HUD-pulse | Hero and section overlays |

Theme tokens live in `src/app/globals.css` (`--color-kiwi-dark`, `--color-kiwi-cyan`, `--color-gold`).

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Server Component — composes all sections
│   ├── layout.tsx        # Root layout, metadata, JSON-LD
│   ├── globals.css       # Kiwi design tokens + utilities
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── home/             # Hero, practice areas, about, contact, particles
│   ├── layout/           # Navbar, Footer (server-rendered)
│   └── seo/              # JSON-LD structured data
└── lib/
    ├── site.ts           # Contact info, advocate credentials, base URL
    ├── content.ts        # Practice areas, stats, copy (single source of truth)
    ├── motion.ts         # Shared Framer Motion variants
    ├── icons.ts          # Icon mapping for content data
    └── utils.ts          # cn() helper (clsx + tailwind-merge)
```

### Architecture

- **Server Components** by default — `page.tsx`, `Navbar`, `Footer`, `JsonLd`
- **Client islands** only where interactivity is needed — animations, accordion state, particles
- **Centralized content** — edit phone, practice areas, and copy in `lib/site.ts` + `lib/content.ts`

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install & run locally

```bash
git clone https://github.com/Hemsagar00/NagaLawChambers.git
cd NagaLawChambers
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build (static export)

```bash
npm run build
```

Output is written to `dist/` (configured in `next.config.ts`).

### Preview static export

```bash
npx serve dist
```

### Lint

```bash
npm run lint
```

## Deployment

### Vercel (recommended)

1. Import the repo at [vercel.com/new](https://vercel.com/new)
2. Framework preset: **Next.js**
3. Build command: `npm run build`
4. Output directory: `dist`
5. Set environment variable (optional):

```
NEXT_PUBLIC_SITE_URL=https://nagalawchambers.com
```

Or deploy from CLI:

```bash
npx vercel --prod
```

### Manual static hosting

After `npm run build`, upload the contents of `dist/` to any static host (Netlify, S3, Cloudflare Pages, etc.).

## SEO

- Next.js `metadata` in `layout.tsx` (title, description, Open Graph, Twitter card, canonical)
- JSON-LD structured data: `LegalService` + `Person` (Advocate)
- `robots.txt` and `sitemap.xml` generated at build time

## Editing Content

| What to change | File |
|---|---|
| Phone, email, office, advocate name | `src/lib/site.ts` |
| Practice areas, stats, hero/about copy | `src/lib/content.ts` |
| Page metadata / SEO title | `src/app/layout.tsx` |
| Advocate photo | `public/advocate.jpg` (do not rename) |

## Repository

- **GitHub:** [Hemsagar00/NagaLawChambers](https://github.com/Hemsagar00/NagaLawChambers)
- **Branch:** `master`
- **Maintained by:** HemSagar Kasi

## License

Private — All rights reserved. © NAGA Law Chambers. Advocate S. Nagendra Naik.