# NAGA Law Chambers

Official website of **Advocate S. Nagendra Naik** — practising at Anantapur Bar since 2011. Enrolled with the Bar Council of Andhra Pradesh in 2019.

**Live:** [nagalawchamber.com](https://nagalawchamber.com)

## About

NAGA Law Chambers provides focused legal representation before Andhra Pradesh courts, revenue authorities, and statutory forums. The site is advocate-first and trust-building — no marketing fluff.

### Practice Areas

| Area | Courts / Forums |
|---|---|
| **Revenue & Land** | Tahsildar, RDO, Collector, AP High Court |
| **Civil & Contract** | District Court, AP High Court |
| **Bail & Criminal** | Sessions & Magistrate Courts |
| **Family & Partition** | Family Court, District Court |
| **Consumer Forums** | District & State Consumer Forum |

### Contact

| | |
|---|---|
| Phone | +91 94400 00417 |
| Email | contact@nagalawchamber.com |
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
| Domain | [nagalawchamber.com](https://nagalawchamber.com) |

## Design System — Portavia × Kiwi Hybrid

A refined blend of **Portavia** minimal elegance and **Kiwi** legal-tech authority.

| Token | Value | Usage |
|---|---|---|
| Primary dark | `#050508` | Page background, stark professional base |
| Accent cyan | `#00E5FF` | HUD highlights, interactive accents |
| Legal gold | `#D4AF37` | Authority, CTAs, headings |
| Glass | Frosted dark cards | Practice area & contact cards |
| Effects | Scanlines, HUD-pulse | Hero particle field, section overlays |

### Portavia-inspired traits

- Bold, large hero typography with strong hierarchy
- Generous section spacing and minimal layout
- Refined sticky navigation (scroll-aware glass)
- Clean card/grid design for practice areas
- Smooth scroll-triggered section reveals

### Kiwi legal aesthetic

- Glassmorphism on nav and cards
- HUD-pulse particle field in hero
- Subtle scanline overlays
- Gold accents for legal authority

Theme tokens and Portavia utilities live in `src/app/globals.css`:

- `--color-kiwi-dark`, `--color-kiwi-cyan`, `--color-gold`
- `.portavia-container`, `.portavia-section`, `.portavia-card`
- `.portavia-hero-title`, `.portavia-nav-scrolled`

## Site Sections

1. **Hero** — advocate photo `/advocate.jpg`, credentials badge, HUD particles
2. **Stats** — years practising, Bar Council enrolment, Anantapur Bar, practice areas
3. **Practice Areas** — five expandable cards with smooth layout animations
4. **Advocate Profile** — dedicated section featuring `/advocate.jpg`
5. **Contact** — phone, email, office with Google Maps link

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Server Component — Portavia-Kiwi composition
│   ├── layout.tsx        # Root layout, metadata, JSON-LD
│   ├── globals.css       # Kiwi tokens + Portavia utilities
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── home/             # Hero, practice areas, about, contact, particles
│   ├── layout/           # Navbar (sticky scroll), Footer
│   ├── motion/           # Magnetic buttons, scroll progress, smooth scroll
│   └── seo/              # JSON-LD structured data
└── lib/
    ├── site.ts           # Contact info, advocate credentials, base URL
    ├── content.ts        # Practice areas, stats, copy (single source of truth)
    ├── motion.ts         # Shared Framer Motion variants
    ├── icons.ts          # Icon mapping for content data
    └── utils.ts          # cn() helper (clsx + tailwind-merge)
```

### Architecture

- **Server Components** by default — `page.tsx`, `Footer`, `StatsSection`, `AboutSection`, `JsonLd`
- **Client islands** for interactivity — `Hero`, `Navbar`, `PracticeAreasSection`, `ContactSection`, particles, animations
- **Centralized content** — edit phone, practice areas, and copy in `lib/site.ts` + `lib/content.ts`
- **Hydration-safe** — static constants, seeded particles, no `new Date()` in render

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
# macOS / Linux
rm -rf .next dist

# Windows PowerShell
Remove-Item -Recurse -Force .next, dist -ErrorAction SilentlyContinue

npm install
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
5. Environment variable (recommended):

```
NEXT_PUBLIC_SITE_URL=https://nagalawchamber.com
```

Deploy from CLI:

```bash
npx vercel --prod
```

### Windows — clean build & deploy

```powershell
Set-Location D:\Websites\NagaLawChambers
Remove-Item -Recurse -Force .next, dist -ErrorAction SilentlyContinue
npm install
npm run build
npx vercel --prod
```

### Manual static hosting

After `npm run build`, upload the contents of `dist/` to any static host (Netlify, S3, Cloudflare Pages, etc.).

## SEO

- Next.js `metadata` in `layout.tsx` with title `"NAGA Law Chambers | Advocate S. Nagendra Naik"`, description, keywords, Open Graph, Twitter card, canonical
- JSON-LD structured data: `LegalService` (firm) + `Person` (advocate) + `WebSite` + `WebPage`
- `robots.txt` and `sitemap.xml` generated at build time
- Semantic HTML with accessible landmarks and ARIA on interactive cards

## Editing Content

| What to change | File |
|---|---|
| Phone, email, office, advocate name | `src/lib/site.ts` |
| Practice areas, stats, hero/about copy | `src/lib/content.ts` |
| Page metadata / SEO title | `src/app/layout.tsx` |
| Portavia spacing / Kiwi tokens | `src/app/globals.css` |
| Advocate photo | `public/advocate.jpg` (do not rename) |

## Repository

- **GitHub:** [Hemsagar00/NagaLawChambers](https://github.com/Hemsagar00/NagaLawChambers)
- **Branch:** `master`
- **Maintained by:** HemSagar Kasi

## License

Private — All rights reserved. © NAGA Law Chambers. Advocate S. Nagendra Naik.
