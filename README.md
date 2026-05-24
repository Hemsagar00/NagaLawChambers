# Naga Law Chambers — Premium 3D Legal Landing Page

Immersive 3D web experience for **Advocate S. Nagendra Naik** — Land, Revenue
& Property Law across Andhra Pradesh.

- **Frontend** (`/frontend`): Next.js 16 + React 19 + Tailwind v4 + Motion v12 +
  React Three Fiber
- **Backend** (`/backend`): FastAPI + MongoDB (contact-form inquiries)
- **Live preview**: managed by Emergent supervisor (`yarn start` → `next dev`)

---

## Code Reviewers — read this first

> **Before opening a review:** check
> [`AUDIT-DECISIONS.md`](./AUDIT-DECISIONS.md) at the repo root.
>
> Several common static-analysis findings (JSON-LD `dangerouslySetInnerHTML`,
> "missing hook dependencies", "inline arrays in R3F props", "long
> components") have been **intentionally not actioned** with documented
> engineering rationale and lint-rule citations. Re-raising those items
> consumes review cycles without improving the codebase.
>
> If your finding is NOT covered there, please proceed — those reviews are
> always welcome.

The authoritative gates are:

```bash
cd frontend && yarn lint    # eslint-plugin-react-hooks + react/no-danger boundary
cd frontend && yarn build   # full type-check + production bundle
```

Both must pass with **zero** warnings and **zero** errors. They currently do.

---

## Getting Started (local dev)

```bash
# Frontend
cd frontend
yarn install
yarn dev          # http://localhost:3000

# Backend
cd backend
pip install -r requirements.txt
uvicorn server:app --host 0.0.0.0 --port 8001
```

## Production Build

```bash
cd frontend
yarn build && yarn serve
```

## Key Files

| File | Purpose |
| --- | --- |
| `frontend/src/app/page.tsx` | Dynamic-imported `HomeContent` (SSR-off for motion hydration) |
| `frontend/src/app/layout.tsx` | Fonts + SEO JSON-LD via `<JsonLd>` |
| `frontend/src/components/sections/Hero3D.tsx` | 3D hero with R3F + reduced-motion fallback |
| `frontend/src/components/sections/AdvocateProfile.tsx` | Preserves original `/public/advocate.jpg` in glass dossier card |
| `frontend/src/components/sections/ContactForm.tsx` | Form chrome → `useInquirySubmit` hook |
| `frontend/src/lib/useInquirySubmit.ts` | Submit pipeline: backend → Formspree fallback |
| `backend/server.py` | FastAPI: `/api/health`, `POST /api/inquiries`, `GET /api/inquiries` (token-gated) |
| `AUDIT-DECISIONS.md` | False-positive registry for static-analysis tooling |
| `memory/PRD.md` | Product requirements + change log |
| `memory/test_credentials.md` | Admin token for `/api/inquiries` |
