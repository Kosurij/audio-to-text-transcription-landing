# GEO Audit Report: Audio To Text Transcription

**Audit Date:** 2026-07-22
**URL:** https://audio-to-text-transcription.com/
**Business Type:** SaaS / Chrome Extension (single-page product landing)
**Pages Analyzed:** 2 (homepage, /privacy/)

---

## Executive Summary

**Overall GEO Score: 51/100 (Poor)**

The site has an unusually strong structured-data foundation for its size (WebSite, Organization, SoftwareApplication, HowTo and FAQPage schema all present via one `@graph`), fast server-rendered HTML, and unrestricted crawler access — so AI systems *can* read and parse it easily. The problem is everything around the schema: the entire product story lives on a single page with no independently citable URLs, there is no visible brand footprint anywhere AI models cross-reference (no Wikipedia, Reddit, LinkedIn, X/Twitter, YouTube, Product Hunt, G2), and there are no E-E-A-T signals (no author, no team/about page, no sourced claims) to back up trust-sensitive statements like "we don't store your data." This combination — good machine-readability, near-zero external authority — caps the score in the "Poor" band even though nothing is broken.

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 62/100 | 25% | 15.5 |
| Brand Authority | 25/100 | 20% | 5.0 |
| Content E-E-A-T | 30/100 | 20% | 6.0 |
| Technical GEO | 78/100 | 15% | 11.7 |
| Schema & Structured Data | 85/100 | 10% | 8.5 |
| Platform Optimization | 40/100 | 10% | 4.0 |
| **Overall GEO Score** | | | **50.7 ≈ 51/100** |

---

## Critical Issues (Fix Immediately)

None. Site is indexable, no crawler blocks, no 5xx errors, structured data is present.

## High Priority Issues

1. **No `llms.txt` file** (returns 404). Without it, AI crawlers have no curated summary of what the site is and which pages matter.
2. **No standalone URLs for Features / How-it-works / FAQ.** They exist only as in-page anchors (`#features`, `#how-it-works`, `#faq`) on the homepage. AI systems generally cite a specific URL for a specific answer — an anchor on a single long page is a weak citation target compared to a dedicated `/faq` or `/how-it-works` page.
3. **Zero third-party brand presence.** No Wikipedia entry, no Reddit mentions, no LinkedIn company page, no X/Twitter, no YouTube channel, no Product Hunt/G2/Capterra listing found. The only external reference point is the Chrome Web Store listing itself. AI models lean heavily on independent corroboration for entity recognition — right now there is essentially none.
4. **No About/Team page or author attribution.** Nothing on the site identifies who builds or runs the product, which weakens trust signals for a tool that explicitly makes privacy/data-handling claims.

## Medium Priority Issues

1. **Sitemap covers only 2 URLs** (home + privacy). Even for a single-page product this under-represents the site (no dedicated sitemap entries for anchor sections, no image sitemap for the screenshots).
2. **No Twitter/X Card meta tags** (`twitter:card`, `twitter:title`, etc.) — Open Graph tags exist and are complete, but Twitter/X-specific tags are absent, which can affect how the link renders when shared/cited on that platform.
3. **Content/pricing inconsistency**: the homepage and hero messaging position the product as fully free ("Free transcription service," no pricing page, no pricing nav item), but the FAQ schema itself states *"Premium features and higher usage limits are available with paid plans."* There is no pricing page to resolve this — an AI system summarizing the FAQ could tell users about a paid plan that isn't discoverable anywhere else on the site.
4. **Testimonial/image mismatch**: review avatar filenames don't match the alt text/names shown (e.g., `review-marco.webp` has `alt="Sergei S."`, `review-sergei.webp` has `alt="Sofia D."`). This looks like a copy-paste artifact from templating rather than intentional, but stock-like, mismatched testimonials are a weak E-E-A-T signal and a red flag if an AI system (or a human) checks provenance.
5. **Only aggregate rating in schema, no individual Review markup** — `aggregateRating` (4.9, 200 reviews) is present on the `SoftwareApplication` node, but there's no backing `Review` array, so the claim isn't independently verifiable from the markup alone.

## Low Priority Issues

1. Homepage word count is thin (~1,090 words) — adequate for a landing page but limits how much genuinely citable, long-form content exists.
2. No dedicated Contact page — the only contact channel is the `email` in `Organization.contactPoint` (support@audio-to-text-transcription.com).
3. No blog/resource section for supporting long-tail queries ("how to transcribe a Zoom meeting," "best audio formats for transcription," etc.) that AI search assistants often answer from.
4. `/welcome` and `/uninstall` are disallowed in robots.txt — reasonable (likely post-install/uninstall redirect pages), but worth confirming they don't contain content that should be indexable.

---

## Category Deep Dives

### AI Citability (62/100)
Strengths: FAQ content is structured as direct question → short factual answer pairs both in visible HTML and in `FAQPage` schema — this is exactly the shape AI Overviews/ChatGPT/Perplexity like to lift verbatim. The `HowTo` schema gives a clean 3-step process AI systems can quote directly ("Install the extension" → "Upload or record audio" → "Get your transcript"). `featureList` in the `SoftwareApplication` schema gives a scannable, quotable feature set.
Weaknesses: All of this content lives on one page behind anchors, so an AI system can extract the *content* but has no clean, separate URL to attribute a specific answer to (e.g., "according to audio-to-text-transcription.com/faq"). Content depth per topic is shallow — each FAQ answer is 1-3 sentences, which is citable but not comprehensive enough to be the definitive source on any given sub-topic (e.g., "which audio formats are supported" gets one sentence, not a full comparison).

### Brand Authority (25/100)
No presence detected on Wikipedia, Reddit, LinkedIn, X/Twitter, YouTube, Product Hunt, G2, or Capterra. The `Organization` schema is well-formed (name, url, logo, contactPoint) but there's no `sameAs` array linking out to any of these profiles — even if profiles exist, they aren't connected in the markup. The only externally verifiable signal is the Chrome Web Store listing (referenced twice as a link, and matched by the schema's stated 4.9/200-review aggregate). For a product whose main distribution channel *is* the Chrome Web Store, that store listing is doing all the authority work alone.

### Content E-E-A-T (30/100)
No author bios, no team/about page, no credentials, no case studies, no cited sources for accuracy claims ("99% accuracy," "powered by OpenAI Whisper"). The privacy claims ("we don't store or share your data... everything happens locally when possible") are asserted but not backed by a security/compliance page, audit, or certification. Testimonials exist but read as generic and have the avatar/name mismatch noted above, which undercuts genuineness. `dateModified: 2026-03-19` on the `SoftwareApplication` node is a reasonable freshness signal, but there's no visible "last updated" content elsewhere.

### Technical GEO (78/100)
Strong fundamentals: HTTPS, HTTP/2, fast TTFB (~220ms), content is server-rendered (Astro) so all copy is present in the raw HTML — no JS-only rendering risk for crawlers. `robots.txt` uses a blanket `Allow: /` for `User-agent: *`, which implicitly permits GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc. (no bot-specific blocks at all). `meta name="robots" content="index, follow"` is set correctly on both pages. Canonical tag present. Mobile viewport meta present. Main gap: no `llms.txt`, and the sitemap is minimal (2 URLs) relative to what a slightly more segmented site structure could offer.

### Schema & Structured Data (85/100)
This is the site's clear strong point. A single `@graph` cleanly connects `WebSite` → `Organization` → `SoftwareApplication` → `HowTo` → `FAQPage` → `BreadcrumbList`, with proper `@id` cross-referencing (e.g., `SoftwareApplication.author` points back to the `Organization` node). `SoftwareApplication` includes `offers`, `aggregateRating`, and a detailed `featureList`. Gaps: no `sameAs` for social/authority profiles, no individual `Review` objects backing the aggregate rating, and no `Person` schema for any team member (there are none to mark up, since no team is disclosed).

### Platform Optimization (40/100)
- **Google AI Overviews**: Reasonable chance of surfacing for FAQ-style queries thanks to `FAQPage`/`HowTo` schema, but lack of a dedicated URL per topic limits how AI Overviews attributes and links back.
- **ChatGPT/Perplexity/Gemini web search**: No independent citations elsewhere on the web (no Reddit threads, no comparison articles, no Wikipedia) means these engines have almost nothing to cross-reference beyond the site's own claims — lowering the odds of the product being *recommended* rather than just occasionally quoted if a user pastes the URL directly.
- **Bing Copilot**: Same constraints as above; benefits from the same technical accessibility but no differentiated advantage.

---

## Quick Wins (Implement This Week)

1. Add a `sameAs` array to the `Organization` JSON-LD once social/profile links exist (or create the minimum viable set: a LinkedIn company page and a Product Hunt listing).
2. Create `/llms.txt` summarizing the product, key pages, and FAQ in AI-crawler-friendly plain text.
3. Fix the testimonial avatar/name mismatches (`review-marco.webp`/"Sergei S." vs `review-sergei.webp`/"Sofia D.").
4. Resolve the pricing inconsistency: either remove "paid plans" from the FAQ answer, or add a real pricing section/page so the claim is verifiable.
5. Add `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image` meta tags alongside the existing Open Graph tags.

## 30-Day Action Plan

### Week 1: Fix inconsistencies & low-effort technical gaps
- [ ] Correct testimonial name/image mismatches
- [ ] Resolve free-vs-paid messaging inconsistency
- [ ] Add Twitter Card meta tags
- [ ] Publish `/llms.txt`

### Week 2: Split monolithic page into citable URLs
- [ ] Create standalone `/faq` page (keep FAQ schema, add real URL, cross-link from homepage anchor)
- [ ] Create standalone `/how-it-works` page with the existing `HowTo` schema
- [ ] Add both new URLs to `sitemap.xml`

### Week 3: Build external authority signals
- [ ] Set up/claim LinkedIn company page, link via `sameAs`
- [ ] Submit to Product Hunt and/or relevant SaaS directories (G2, Capterra, AlternativeTo)
- [ ] Encourage/seed genuine Chrome Web Store reviews to support the `aggregateRating` claim

### Week 4: Strengthen trust & content depth
- [ ] Add a minimal About/Team section (even a short founder note) with real author attribution
- [ ] Add a short security/privacy explainer page backing up the "no data stored" claim
- [ ] Add 2-3 long-tail supporting content pieces (e.g., "How to transcribe a Zoom recording," "Best formats for audio transcription") to broaden citable surface area

---

## Appendix: Pages Analyzed

| URL | Title | GEO Issues |
|---|---|---|
| https://audio-to-text-transcription.com/ | Audio To Text Transcription - Convert Audio to Text Instantly \| Chrome Extension | 7 |
| https://audio-to-text-transcription.com/privacy/ | Privacy Policy - Audio To Text Transcription | 1 (no llms.txt/sitemap segmentation impact) |

**Sitemap coverage:** 2/2 crawled pages present in `sitemap.xml`.
**Robots.txt:** `Allow: /` for all user-agents; `Disallow: /welcome`, `/uninstall` (not crawled, excluded correctly).
