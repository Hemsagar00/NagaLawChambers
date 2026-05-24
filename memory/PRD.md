# Naga Law Chambers — Premium 3D Legal Landing Page

## Original Problem Statement
Redesign and upgrade the static legal services website (https://github.com/Hemsagar00/NagaLawChambers.git) into a premium, immersive 3D web experience. Preserve and reuse the original `/public/advocate.jpg` asset within an "Advocate Profile" spotlight section. Keep the core specialisation in Land, Revenue & Property Law across Andhra Pradesh.

## Stack & Architecture
- **Framework**: Next.js 16.2.6 (App Router, Turbopack) + React 19.2 + TypeScript
- **Styling**: Tailwind CSS v4 (CSS-first config)
- **Animation**: Motion v12 (`motion/react` — re-export of Framer Motion 12)
- **3D**: `@react-three/fiber` + `@react-three/drei` + `three` (custom WebGL terrain + scales monolith + particles)
- **Icons**: lucide-react
- **Fonts** (next/font/google): `Cinzel` (headings) · `Outfit` (body) · `JetBrains Mono` (terminal accents)
- **Backend**: Minimal FastAPI stub at `/app/backend/server.py` (health endpoint only — page is frontend-only)

## File Layout
```
/app/
├── frontend/
│   ├── next.config.ts         # allowedDevOrigins for Emergent preview
│   ├── package.json           # scripts.start = next dev -H 0.0.0.0 -p 3000
│   ├── public/
│   │   ├── advocate.jpg       ★ PRESERVED original advocate portrait
│   │   ├── court-aerial.jpg, court-icon.jpg, watercolor-bg.jpg
│   │   └── videos/…           (left intact for future use)
│   └── src/
│       ├── app/
│       │   ├── layout.tsx     # Cinzel + Outfit + JetBrains Mono fonts
│       │   ├── page.tsx       # dynamic(ssr:false) loader for HomeContent
│       │   └── globals.css    # design system: emerald + gold tokens
│       └── components/
│           ├── HomeContent.tsx
│           ├── three/TerrainScene.tsx   # R3F: wireframe terrain + monolith + particles
│           ├── shared/
│           │   ├── NavDock.tsx          # Floating glass pill nav (desktop) + mobile drawer
│           │   ├── LoadingScreen.tsx    # Themed loader
│           │   ├── Footer.tsx           # Massive "Land. Legacy. Rights." wordmark
│           │   └── CursorParallax.tsx
│           └── sections/
│               ├── Hero3D.tsx           # 3D Canvas + cinematic text reveal
│               ├── AdvocateProfile.tsx  # Parallax glass dossier card w/ /advocate.jpg
│               ├── PracticeAreas.tsx    # 4-card asymmetric bento grid
│               ├── Cases.tsx            # Featured cases timeline list
│               └── ContactForm.tsx      # Terminal-style form, floating labels
└── backend/
    ├── server.py              # FastAPI stub on :8001
    ├── requirements.txt
    └── .env                   # MONGO_URL, DB_NAME (not used)
```

## Design System
- Base: `#02100C` → `#04150F` emerald-navy + radial glows
- Accent: `#D4AF37` rich gold / `#E6C965` soft gold
- Text: `#F8FAFC` / muted `#94A3B8`
- Glass surfaces, gold hairlines, grain overlay, terminal CLI accents

## Implemented (v2.1 · 2026-01)
- **Reduced-motion / mobile fallback for 3D**: new `useLowMotion()` hook detects `prefers-reduced-motion: reduce`, viewport ≤ 768px, and `navigator.deviceMemory ≤ 2`. When triggered, Hero3D swaps the WebGL `<Canvas>` for `TerrainFallback.tsx` — a hand-tuned SVG composition (emerald base, gold radial glow, perspective grid, static scales glyph, soft scanlines). Verified: mobile / reduced-motion → no `<canvas>`, fallback active. Desktop / motion → canvas present.
- **Contact form → Formspree wired**: posts FormData to `https://formspree.io/f/{NEXT_PUBLIC_FORMSPREE_ID}` (defaults to original repo's `mnqevwqr`, overridable via env). Adds an explicit error state with retry CTA + "call directly" fallback. ⚠️ The original `mnqevwqr` form ID currently returns 404 on Formspree — the wiring works (verified via network capture), but the owner needs to either re-activate that form on formspree.io OR set `NEXT_PUBLIC_FORMSPREE_ID` in `/app/frontend/.env` to a new active form ID.
- **Production build verified**: `yarn build` (Next.js 16 + Turbopack) compiles in ~10s, prerenders 2 static routes, exits 0. Ready for `yarn serve` / Emergent deploy.

## Implemented (v2.0 · 2026-01)
- Hero: full-bleed R3F wireframe terrain + animated gold scales monolith + cursor-parallax + gold particles + cinematic text reveal with blur-in
- Floating glass navigation dock with brand mark + mobile slide-in drawer
- Advocate Profile: original `advocate.jpg` inside conic-gradient gold border + glass "dossier" card with terminal header, animated rotating scale badge, floating stat chips (07+ years, 50+ cases), parallax image scroll, staggered fade-ins for bio + qualifications + focus areas
- Practice Areas: asymmetric 4-card bento grid (Land Revenue, Civil Litigation, Property Documentation, Court Representation) with cursor-tracked radial highlight + bullet chips
- Featured Cases: numbered horizontal stripe cards with category pills + alternating slide-in
- Contact: floating-label inputs + terminal-style submit with `>_` prefix, terminal header, success state
- Footer: massive wordmark + navigation + reach info
- Responsive: mobile-first breakpoints (md/lg) throughout; mobile nav drawer; bento grid collapses to single column on mobile

## What's NOT implemented (backlog)
- P1: Owner action — activate Formspree form `mnqevwqr` or set `NEXT_PUBLIC_FORMSPREE_ID=<new-id>` in `/app/frontend/.env`. Optionally swap to SendGrid/Resend/Mongo persistence for full control.
- P2: Loading screen counter (currently `useEffect` `setTimeout` triggers exit at 1.8s — original counter approach had Turbopack/HMR timer quirks in dev)
- P2: Mobile screenshot used 1920 width; design has md/lg breakpoints in code — recommend manual device testing

## Known Notes
- Hot reload + Next.js 16 dev WebSocket HMR has CORS warnings against Emergent preview cross-origins — `allowedDevOrigins` covers the main domains; harmless console warnings remain
- Bottom-left "N" badge in screenshots is Next.js dev indicator (disappears in production build)

## Test Credentials
Not applicable — no auth in this build. Public marketing page only.
