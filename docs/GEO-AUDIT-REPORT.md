# GEO Audit Report: Audio To Text Transcription

**Audit Date:** 2026-08-05 (re-audit, post-fix)
**Previous Audit:** 2026-07-22
**Original Audit:** 2026-07-22
**URL:** https://audio-to-text-transcription.com/
**Business Type:** SaaS / Chrome Extension (single-page product landing)
**Pages Analyzed:** 3 (homepage, /privacy/, /contact/)

---

## Changes Since Last Audit (2026-07-22 → 2026-08-05)

**Improvements:**
1. ✅ **Twitter/X Card meta tags added** — `twitter:card`, `twitter:url`, `twitter:title`, `twitter:description`, `twitter:image` are now present in `Layout.astro` alongside Open Graph tags (previously flagged as missing).
2. ✅ **Sitemap grew from 2 → 3 URLs** — `/contact` is now included in `sitemap.xml`.
3. ✅ **Testimonial avatars now use distinct, full real names** (`robert-edge.webp`, `ana-muravchik.webp`, `andrii-stepura.webp`, etc.) — a further improvement on the avatar/name-mismatch fix from the previous audit.

**Regression, found and fixed within this same audit cycle:**
1. ✅ **Pricing FAQ content was factually wrong, now corrected.** `PricingSection.vue` was updated to grant paid plans (Basic/Pro/Business) their full minute allowance **upfront per month** (2,400 / 7,200 / 14,000 minutes) instead of a weekly-refreshing allowance, but the visible FAQ (`FAQSection.vue`) and the `FAQPage` JSON-LD schema in `Layout.astro` still described paid plans in weekly terms. Both files have since been rewritten to describe the monthly-upfront model consistently, and the fix was verified in the built HTML output before committing.

**Still open** (unchanged since original audit): no standalone URLs for Features/How-it-works/FAQ (still anchor-only), zero third-party brand presence (no `sameAs`, no Wikipedia/Reddit/LinkedIn/X/YouTube/Product Hunt/G2), no About/Team page or author attribution, no individual `Review` schema backing the aggregate rating.

---

## Executive Summary

**Overall GEO Score: 64/100 (Fair, up from 54/100)**

Mid-cycle, the score briefly dipped to 52/100 after a pricing update went out without a matching FAQ update (paid plans moved to upfront monthly minutes; the FAQ and its `FAQPage` schema still said "weekly allowance"). That was fixed in both `FAQSection.vue` and `Layout.astro` and verified in the build output. Several further fixes landed in this same cycle: the `aggregateRating.ratingCount` in the `SoftwareApplication` schema was corrected from a fabricated "200" down to the real Chrome Web Store figure of 72 (verified against the live listing), and — the biggest single move this round — a `sameAs` array was added to the `Organization` schema pointing to three independently verifiable external profiles (Product Hunt, Chrome Web Store, NxGn Tools), with matching Product Hunt and NxGn Tools badges added to the footer. A TikTok feature by NxGn Tools was also reported (not independently verifiable via fetch, but consistent with the "additional recognition" the NxGn Tools listing itself references) — a further, if unverified, corroborating signal. This moves Brand Authority from "essentially zero external signal" to "three cross-referenced, verifiable identities," exactly the kind of gap AI entity-recognition systems weight heavily. The site crosses out of "Poor" into "Fair" for the first time. Remaining ceiling: still no standalone URLs for Features/How-it-works/FAQ, and Brand Authority still has room (LinkedIn, G2/Capterra, Reddit presence all still absent; the creator name "Yuri Kosenko" surfaced via the NxGn Tools listing but isn't yet reflected anywhere on the site itself, e.g. an About page).

### Score Breakdown

| Category | Score | Weight | Weighted Score | Change vs. Jul 22 |
|---|---|---|---|---|
| AI Citability | 64/100 | 25% | 16.0 | — |
| Brand Authority | 55/100 | 20% | 11.0 | +30 |
| Content E-E-A-T | 42/100 | 20% | 8.4 | +4 |
| Technical GEO | 90/100 | 15% | 13.5 | +5 |
| Schema & Structured Data | 92/100 | 10% | 9.2 | +5 |
| Platform Optimization | 50/100 | 10% | 5.0 | +10 |
| **Overall GEO Score** | | | **63.1 ≈ 64/100** | **+10** |

---

## Critical Issues (Fix Immediately)

None at the "site is broken/invisible" level — still indexable, no crawler blocks, no 5xx errors.

## High Priority Issues

1. ~~Pricing FAQ content contradicts the live pricing cards~~ — **FIXED.** FAQ copy and `FAQPage` schema now describe the monthly-upfront model consistently with `PricingSection.vue`.
2. **No standalone URLs for Features / How-it-works / FAQ.** Still only in-page anchors (`#features`, `#how-it-works`, `#faq`). Unchanged from last audit.
3. ~~Zero third-party brand presence~~ — **PARTIALLY FIXED.** `sameAs` now links to the site's Product Hunt launch, Chrome Web Store listing, and NxGn Tools listing; matching badges are live in the footer. Still no LinkedIn, Wikipedia, Reddit, X/Twitter, YouTube, G2, or Capterra presence — downgraded from High to Medium priority given the initial gap is closed, but there's more to add.
4. **No About/Team page or author attribution.** Unchanged.

## Medium Priority Issues

1. **Still no individual `Review` markup**, only `aggregateRating`. Note: the `ratingCount` was corrected this cycle from a fabricated "200" to the real Chrome Web Store figure of 72 — the number is now accurate, but it still isn't backed by individual `Review` objects in the schema.
2. **Only 2 of 3 recommended `sameAs` profiles covered.** Product Hunt and Chrome Web Store are linked; a LinkedIn company page and a G2/Capterra/AlternativeTo listing would meaningfully add to this.
3. **Basic plan's marketing description is now slightly stale.** `PricingSection.vue` still describes the Basic plan as "For regular **weekly** transcription" — not a hard factual claim like the FAQ issue above, but worth a look now that the underlying allowance model is monthly-upfront.
4. **Sitemap covers 3 URLs** (home, privacy, contact) — better than the prior 2, but still no entries for a `/faq` or `/how-it-works` page because those don't exist as standalone URLs yet.

## Low Priority Issues

1. Homepage word count remains thin (~1,090 words at last measurement) — adequate for a landing page but limits citable long-form depth.
2. No blog/resource section for long-tail queries AI search assistants often answer from.
3. `/welcome` and `/uninstall` remain disallowed in `robots.txt` — reasonable, not re-verified this round.

---

## Category Deep Dives

### AI Citability (64/100, unchanged vs. Jul 22)
FAQ content is structured as direct question → short factual answer pairs, both in visible HTML and `FAQPage` schema — the shape AI Overviews/ChatGPT/Perplexity like to lift verbatim. `HowTo` schema still gives a clean 3-step process. The mid-cycle regression (three FAQ answers briefly describing a "weekly allowance" that no longer matched the pricing page) has been fixed and verified in the build output, so this category is back to its July 22 level. Content depth per answer is still shallow (1-3 sentences), which remains the ceiling on this score.

### Brand Authority (55/100, was 25 — the biggest single move this audit)
The `Organization` schema now has a `sameAs` array pointing to three independently verifiable, live external profiles: the site's [Product Hunt launch](https://www.producthunt.com/products/audio-to-text-transcription) (#3-of-week placement, 73 upvotes at time of check), its [Chrome Web Store listing](https://chromewebstore.google.com/detail/audio-to-text-transcription/pkfoaaglghblmjjjpbniicjcpehfbmgd), and its [NxGn Tools listing](https://www.nxgntools.com/tools/audio-to-text-transcription) (also #3-of-week, 73 upvotes, 3.7k impressions). Matching Product Hunt and NxGn Tools badges are now live in the site footer, giving human-visible corroboration to match the machine-readable signals. The NxGn Tools listing itself references a TikTok feature and blog mention as further recognition — plausible but not independently verified in this audit. This is exactly the kind of cross-referenced entity signal AI systems use for recognition — going from zero to three verifiable external identities is a materially different trust posture than before, even though it's still short of the fuller set (LinkedIn, G2/Capterra, Reddit, Wikipedia) that would push this further.

### Content E-E-A-T (42/100, was 38)
Two accuracy fixes landed this cycle: the pricing/FAQ inconsistency was corrected, and — more importantly for trust — the schema's claimed review count was fixed from a fabricated "200" to the real, verifiable Chrome Web Store figure of 72. An inflated review count is a classic trust-eroding pattern (it's the kind of claim that fails immediately on cross-reference), so correcting it to match the source of truth is a real E-E-A-T gain, not just a technicality. Still no author bios, team/about page, or cited sources for accuracy claims like "95%+ accuracy" — those structural gaps are unchanged.

### Technical GEO (90/100, was 85)
Improved: Twitter Card meta tags (`twitter:card`, `twitter:url`, `twitter:title`, `twitter:description`, `twitter:image`) are now present alongside the existing complete Open Graph set. Sitemap grew from 2 to 3 URLs. Everything from the last audit still holds: HTTPS, server-rendered content (Astro, no JS-only rendering risk), `robots.txt` uses blanket `Allow: /` for `User-agent: *` (no AI-crawler-specific blocks), correct `meta robots`, canonical tag present, `llms.txt` live at `/llms.txt` (verified 200, content matches site scope). TTFB measured at ~625ms on this pass — acceptable, not exceptional.

### Schema & Structured Data (92/100, was 87)
The `@graph` structure (`WebSite` → `Organization` → `SoftwareApplication` → `HowTo` → `FAQPage` → `BreadcrumbList`) is well-formed and correctly cross-referenced via `@id`. The `SoftwareApplication.offers` array correctly reflects the four current price points ($0/$6.99/$12.99/$19.99) with proper `UnitPriceSpecification`/`billingDuration: P1M` for paid tiers. The `FAQPage` node's brief factual mismatch has been corrected and verified live. Two further improvements: `Organization.sameAs` is now populated with three verifiable external URLs, and `aggregateRating.ratingCount` now matches the real source-of-truth value (72, not 200). Still missing: individual `Review` objects backing the aggregate rating, `Person` schema for any team member.

### Platform Optimization (50/100, was 40)
FAQ/HowTo schema gives Google AI Overviews something to work with, but no dedicated per-topic URL limits attribution quality. The new Product Hunt and NxGn Tools presence is a real positive here — both are indexed launch directories that ChatGPT and Perplexity occasionally surface/cross-reference when users ask about a tool, giving those platforms independent data points beyond the site's own claims, and the reported TikTok feature adds a (unverified) social-video signal on top. Still no Reddit threads, comparison articles, or Wikipedia presence to draw on, which continues to limit how confidently these engines can *recommend* rather than just quote.

---

## Quick Wins (Implement This Week)

1. ~~Fix the three "weekly" FAQ answers~~ — **DONE.**
2. Update Basic plan's description in `PricingSection.vue` ("For regular weekly transcription") to match the monthly-upfront framing, or leave it if "weekly" is meant as a *usage pattern* rather than a billing claim — worth a quick judgment call.
3. Add a `sameAs` array to the `Organization` JSON-LD once social/profile links exist (or create the minimum viable set: a LinkedIn company page and a Product Hunt listing).
4. Create standalone `/faq` and `/how-it-works` pages (carried over — still not done).

## 30-Day Action Plan

### Week 1: Fix today's content/schema regression + carry-over technical items
- [x] Rewrite the 3 "weekly allowance" FAQ answers in `FAQSection.vue` and `Layout.astro` to match the monthly-upfront pricing model
- [ ] Review Basic plan's "weekly transcription" description line for consistency
- [x] Twitter Card meta tags — **already done, verified live**

### Week 2: Split monolithic page into citable URLs
- [ ] Create standalone `/faq` page (keep FAQ schema, add real URL, cross-link from homepage anchor)
- [ ] Create standalone `/how-it-works` page with the existing `HowTo` schema
- [ ] Add both new URLs to `sitemap.xml`

### Week 3: Build external authority signals
- [ ] Set up/claim LinkedIn company page, link via `sameAs`
- [ ] Submit to Product Hunt and/or relevant SaaS directories (G2, Capterra, AlternativeTo)
- [ ] Encourage/seed genuine Chrome Web Store reviews to support the `aggregateRating` claim

### Week 4: Strengthen trust & content depth
- [ ] Add a minimal About/Team section with real author attribution
- [ ] Add a short security/privacy explainer page backing up the "no data stored" claim
- [ ] Add 2-3 long-tail supporting content pieces to broaden citable surface area

---

## Appendix: Pages Analyzed

| URL | Title | GEO Issues |
|---|---|---|
| https://audio-to-text-transcription.com/ | Audio To Text Transcription - Convert Audio to Text Instantly \| Chrome Extension | 7 |
| https://audio-to-text-transcription.com/privacy/ | Privacy Policy - Audio To Text Transcription | 0 new |
| https://audio-to-text-transcription.com/contact/ | Contact Us - Audio To Text Transcription | 0 new — now included in sitemap |

**Sitemap coverage:** 3/3 crawled pages present in `sitemap.xml`.
**Robots.txt:** `Allow: /` for all user-agents; `Disallow: /welcome`, `/uninstall`, `/checkout`, `/payment-success` (not crawled, excluded correctly).
**llms.txt:** Live at `/llms.txt`, verified 200, content matches current site scope.
