# GEO Audit Report: Audio To Text Transcription

**Audit Date:** 2026-08-05 (re-audit)
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

**Regression (new issue, introduced today):**
1. 🔴 **Pricing FAQ content is now factually wrong.** `PricingSection.vue` was updated today so paid plans (Basic/Pro/Business) grant their full minute allowance **upfront per month** (2,400 / 7,200 / 14,000 minutes) instead of a weekly-refreshing allowance. However, both the visible FAQ (`FAQSection.vue`) **and** the `FAQPage` JSON-LD schema in `Layout.astro` still describe paid plans in weekly terms:
   - *"Optional paid subscriptions add larger **weekly limits**..."*
   - *"How do **weekly minute limits** work?" → "Your minute allowance **resets every week**..."*
   - *"A paid plan gives you a larger **weekly allowance**..."*

   This is now visibly inconsistent with the pricing card, which reads "2,400 MINUTES / MONTH" etc. This is the exact same class of problem (a stale/incorrect claim about plan mechanics baked into both visible copy and machine-readable schema) that the July 22 audit flagged and fixed for the "is it free" FAQ answer — it has resurfaced via an unrelated pricing edit that didn't update the FAQ alongside it.

**Still open** (unchanged since original audit): no standalone URLs for Features/How-it-works/FAQ (still anchor-only), zero third-party brand presence (no `sameAs`, no Wikipedia/Reddit/LinkedIn/X/YouTube/Product Hunt/G2), no About/Team page or author attribution, no individual `Review` schema backing the aggregate rating.

---

## Executive Summary

**Overall GEO Score: 52/100 (Poor, down from 54/100)**

The score dropped slightly this round. Two real technical improvements landed (Twitter Card tags, a marginally larger sitemap), but they were outweighed by a fresh content-accuracy regression: today's pricing-page update (paid plans now grant minutes upfront per month rather than weekly) was not carried through to the FAQ section or its `FAQPage` JSON-LD schema, which still describe "weekly allowances" for paid tiers. Because that FAQ content is exactly the kind of short, structured, question→answer content AI systems are most likely to lift verbatim, an inaccurate answer here is higher-leverage-negative than a missing feature would be. This is a quick, mechanical fix (rewrite 3 FAQ entries in two files) and should be treated as the top priority — more urgent than any of the structural, multi-week items still open from the original audit.

### Score Breakdown

| Category | Score | Weight | Weighted Score | Change |
|---|---|---|---|---|
| AI Citability | 58/100 | 25% | 14.5 | -6 |
| Brand Authority | 25/100 | 20% | 5.0 | — |
| Content E-E-A-T | 34/100 | 20% | 6.8 | -4 |
| Technical GEO | 90/100 | 15% | 13.5 | +5 |
| Schema & Structured Data | 83/100 | 10% | 8.3 | -4 |
| Platform Optimization | 40/100 | 10% | 4.0 | — |
| **Overall GEO Score** | | | **52.1 ≈ 52/100** | **-2** |

---

## Critical Issues (Fix Immediately)

None at the "site is broken/invisible" level — still indexable, no crawler blocks, no 5xx errors.

## High Priority Issues

1. **🔴 NEW: Pricing FAQ content contradicts the live pricing cards.** Three FAQ entries (visible copy in `src/components/FAQSection.vue:92-101` and the matching `FAQPage` JSON-LD in `src/layouts/Layout.astro:162-164`) describe paid-plan minutes as a "weekly allowance" that "resets every week." The actual pricing (`src/components/PricingSection.vue`) now grants Basic/Pro/Business their full minute pool upfront per month, with no weekly reset. Any AI system citing the FAQ answer will tell users something false about how billing/usage works. **Fix:** rewrite the three answers to describe the monthly-upfront model, in both files, and keep them in sync going forward.
2. **No standalone URLs for Features / How-it-works / FAQ.** Still only in-page anchors (`#features`, `#how-it-works`, `#faq`). Unchanged from last audit.
3. **Zero third-party brand presence.** No Wikipedia, Reddit, LinkedIn, X/Twitter, YouTube, Product Hunt, G2, or Capterra presence, and no `sameAs` array in the `Organization` schema. Unchanged — still the single highest-leverage structural gap.
4. **No About/Team page or author attribution.** Unchanged.

## Medium Priority Issues

1. **Only aggregate rating in schema, no individual `Review` markup.** Unchanged.
2. **Basic plan's marketing description is now slightly stale.** `PricingSection.vue` still describes the Basic plan as "For regular **weekly** transcription" — not a hard factual claim like the FAQ issue above, but worth a look now that the underlying allowance model is monthly-upfront.
3. **Sitemap covers 3 URLs** (home, privacy, contact) — better than the prior 2, but still no entries for a `/faq` or `/how-it-works` page because those don't exist as standalone URLs yet.

## Low Priority Issues

1. Homepage word count remains thin (~1,090 words at last measurement) — adequate for a landing page but limits citable long-form depth.
2. No blog/resource section for long-tail queries AI search assistants often answer from.
3. `/welcome` and `/uninstall` remain disallowed in `robots.txt` — reasonable, not re-verified this round.

---

## Category Deep Dives

### AI Citability (58/100, was 64)
Strengths unchanged: FAQ content is structured as direct question → short factual answer pairs, both in visible HTML and `FAQPage` schema — the shape AI Overviews/ChatGPT/Perplexity like to lift verbatim. `HowTo` schema still gives a clean 3-step process. New weakness: three of those FAQ answers are now **wrong**, which is worse for citability than being merely thin — a wrong answer that gets quoted actively misinforms the end user and creates a mismatch AI systems may eventually flag as low-trust once cross-referenced against the pricing page. This single regression accounts for the full drop in this category.

### Brand Authority (25/100, unchanged)
No presence detected on Wikipedia, Reddit, LinkedIn, X/Twitter, YouTube, Product Hunt, G2, or Capterra. No `sameAs` array. Still the single highest-leverage gap on the site overall.

### Content E-E-A-T (34/100, was 38)
The testimonial-avatar improvement (real, distinct names per reviewer) is a small positive for trustworthiness. It's outweighed by the new pricing/FAQ inconsistency: E-E-A-T's "Trustworthiness" pillar specifically penalizes content that misstates how a paid product actually works, and that's exactly what's happening in the three affected FAQ answers right now. No author bios, no team/about page, no cited sources for accuracy claims — those structural gaps are unchanged.

### Technical GEO (90/100, was 85)
Improved: Twitter Card meta tags (`twitter:card`, `twitter:url`, `twitter:title`, `twitter:description`, `twitter:image`) are now present alongside the existing complete Open Graph set. Sitemap grew from 2 to 3 URLs. Everything from the last audit still holds: HTTPS, server-rendered content (Astro, no JS-only rendering risk), `robots.txt` uses blanket `Allow: /` for `User-agent: *` (no AI-crawler-specific blocks), correct `meta robots`, canonical tag present, `llms.txt` live at `/llms.txt` (verified 200, content matches site scope). TTFB measured at ~625ms on this pass — acceptable, not exceptional.

### Schema & Structured Data (83/100, was 87)
The `@graph` structure (`WebSite` → `Organization` → `SoftwareApplication` → `HowTo` → `FAQPage` → `BreadcrumbList`) is still well-formed and correctly cross-referenced via `@id`. The `SoftwareApplication.offers` array correctly reflects the four current price points ($0/$6.99/$12.99/$19.99) with proper `UnitPriceSpecification`/`billingDuration: P1M` for paid tiers. The score drops here because the `FAQPage` node — while structurally valid — now encodes the same factually incorrect "weekly allowance" claims described above; a schema that validates but asserts wrong facts is a real structured-data quality problem, not just a copy problem. Still missing: `sameAs`, individual `Review` objects, `Person` schema for any team member.

### Platform Optimization (40/100, unchanged)
Same constraints as last audit: FAQ/HowTo schema gives Google AI Overviews something to work with, but no dedicated per-topic URL limits attribution quality; no independent citations elsewhere on the web (Reddit, comparison articles, Wikipedia) limits ChatGPT/Perplexity/Gemini's ability to cross-reference and recommend rather than just quote.

---

## Quick Wins (Implement This Week)

1. **Fix the three "weekly" FAQ answers** in `src/components/FAQSection.vue` and the matching `FAQPage` entries in `src/layouts/Layout.astro` to describe the monthly-upfront minute model. This is the single highest-leverage fix available right now — small effort, direct trust/accuracy impact.
2. Update Basic plan's description in `PricingSection.vue` ("For regular weekly transcription") to match the monthly-upfront framing, or leave it if "weekly" is meant as a *usage pattern* rather than a billing claim — worth a quick judgment call.
3. Add a `sameAs` array to the `Organization` JSON-LD once social/profile links exist (or create the minimum viable set: a LinkedIn company page and a Product Hunt listing).
4. Create standalone `/faq` and `/how-it-works` pages (carried over — still not done).

## 30-Day Action Plan

### Week 1: Fix today's content/schema regression + carry-over technical items
- [ ] Rewrite the 3 "weekly allowance" FAQ answers in `FAQSection.vue` and `Layout.astro` to match the monthly-upfront pricing model
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
| https://audio-to-text-transcription.com/ | Audio To Text Transcription - Convert Audio to Text Instantly \| Chrome Extension | 8 (incl. new FAQ/pricing mismatch) |
| https://audio-to-text-transcription.com/privacy/ | Privacy Policy - Audio To Text Transcription | 0 new |
| https://audio-to-text-transcription.com/contact/ | Contact Us - Audio To Text Transcription | 0 new — now included in sitemap |

**Sitemap coverage:** 3/3 crawled pages present in `sitemap.xml`.
**Robots.txt:** `Allow: /` for all user-agents; `Disallow: /welcome`, `/uninstall`, `/checkout`, `/payment-success` (not crawled, excluded correctly).
**llms.txt:** Live at `/llms.txt`, verified 200, content matches current site scope.
