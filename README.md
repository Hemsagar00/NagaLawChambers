# Naga Law Chambers

<div align="center">

![Naga Law Chambers](./images/advocate-photo.jpg)

**Advocate S. Nagendra Naik**  
_Land, Revenue & Property Law Expert_

[![Live Site](https://img.shields.io/badge/Live%20Site-nagalawchambers.com-gold?style=for-the-badge)](https://nagalawchambers.com)
[![Hosted on Cloudflare](https://img.shields.io/badge/Hosted%20on-Cloudflare%20Pages-F38020?style=for-the-badge&logo=cloudflare)](https://pages.cloudflare.com)

</div>

---

## About

Official website for **Advocate S. Nagendra Naik**, a distinguished legal professional with 7+ years of expertise in Land Revenue, Civil Litigation, and Property Documentation. Based at the District Court Premises in Anantapur, Andhra Pradesh.

## Practice Areas

- Land Revenue - ROR appeals, mutation proceedings, revenue court disputes
- Civil Litigation - Ownership conflicts, partition suits, injunctions
- Property Documentation - Sale deeds, wills, gift deeds, title verification

## Features

- Modern, responsive design with gold + black premium aesthetic
- Scroll-triggered reveal animations, glass morphism, 3D tilt effects
- Gold particle effects, typed text, parallax, cursor trail
- Live chat support (Tidio)
- WhatsApp integration with floating button
- Contact form with FormSubmit auto-reply
- Client case status checker (Supabase-powered)
- Secure admin panel with server-side authentication (Cloudflare Functions)
- SSL/TLS via Cloudflare
- Static hosting on Cloudflare Pages

## Security

- Admin authentication is handled server-side via Cloudflare Pages Functions
- Admin password is stored as an encrypted environment variable, never in source code
- Content Security Policy (CSP) headers restrict script sources
- Security headers: X-Frame-Options, X-Content-Type-Options, Referrer-Policy
- Supabase Row Level Security (RLS) controls data access

## Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Animations:** Custom JS engine (Intersection Observer, requestAnimationFrame)
- **Fonts:** Playfair Display, Inter (Google Fonts)
- **Icons:** Font Awesome 6
- **Hosting:** Cloudflare Pages
- **DNS & SSL:** Cloudflare
- **Chat:** Tidio
- **Backend:** Supabase (PostgreSQL)
- **Forms:** FormSubmit
- **Analytics:** Google Analytics

## Deployment

The site deploys automatically on push via Cloudflare Pages. The `functions/` directory is auto-detected for Pages Functions.

```bash
# Set admin password secret (required before first deploy)
npx wrangler pages secret put ADMIN_PASSWORD
```

## Contact

- **Phone:** +91 9440000417
- **Email:** contact@nagalawchambers.com
- **Address:** District Court Premises, Near Bar Association, Anantapur, AP 515001

## License

(c) 2026 Advocate S. Nagendra Naik. All Rights Reserved.
