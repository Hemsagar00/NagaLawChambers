# Reach checklist (things the site code cannot do)

The site is set up for search: short titles and descriptions, an English and a Telugu page with language tags,
a FAQ with schema markup, `llms.txt` for AI assistants, a sitemap, and social links in the schema. These
steps need the owner.

## Do first (a few days)
1. **Deploy this branch** and confirm Cloudflare redeploys `master`. Until then the live site is old.
2. **Set `NEXT_PUBLIC_SITE_URL=https://www.nagalawchambers.com`** in Cloudflare, or delete it.
3. **Have a Telugu speaker read `/te`** (source: `src/lib/home-copy.ts`), mainly legal terms, before merging.
4. **Google Search Console**: add the `www` site, submit `https://www.nagalawchambers.com/sitemap.xml`,
   and request indexing for `/` and `/te`. Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` if asked for a token.
5. **Bing Webmaster Tools**: import from Search Console. Bing also feeds several AI assistants.

## Google Business Profile (the biggest local lever)
- Sign in to the profile that owns "Naga Law Chambers" (legal services) and check it matches the site:
  address, phone, website `https://www.nagalawchambers.com`, hours.
- Add every practice area as a service, add real photos of the office and the advocate, and add Q&A.
- Choose categories: lawyer, legal services, and the closest land or civil law category on offer.
- **Ask clients for reviews.** Copy the review link ("Get more reviews") and send it to Claude to add to the
  site (`gbp.reviewUrl` in `src/lib/site.ts`). Reply to every review.

## Listings that still show old facts
Magicpin, NyayaVedika and similar pages still say "since 2011" and an older address. Claim each one and
correct it. Also claim or fix the entries on Justdial, LawRato and the bar directory, using the same
name, address and phone everywhere.

## Content that brings searches (needs the advocate's own words)
- 3 to 5 short, plain-language guides in English and Telugu, for example how to correct an Adangal entry,
  how mutation works, what to bring to a land-dispute consultation. Claude can draft them; the advocate must
  review before publishing. Do not publish unreviewed legal content.
- Share each guide on Instagram and LinkedIn, and add the page link to the Google profile as a post.

## Check the social links
`socialProfiles` in `src/lib/site.ts` lists two Instagram accounts and one LinkedIn profile found by search.
Confirm they are yours; remove any that are not.
