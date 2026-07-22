# GEO Audit Critical Fixes — Design Spec

**Date:** 2026-07-22
**Branch:** `geo-audit-fixes`
**Priority:** High (3)
**Source:** `docs/GEO-AUDIT-REPORT.md` (2026-07-22 GEO audit)

---

## Context

A GEO (Generative Engine Optimization) audit of `audio-to-text-transcription.com` identified several issues. This spec covers the three the user asked to fix now; everything else in the report (brand authority, splitting the FAQ/How-it-works into standalone pages, About page, etc.) is explicitly out of scope for this pass.

---

## Issues & Fixes

### 1. Missing `llms.txt` (HIGH)

**File:** `public/llms.txt` (new)

**Problem:** AI crawlers have no curated summary of the site; request to `/llms.txt` currently 404s.

**Fix:** Add a static `public/llms.txt` (served as-is by Astro, same mechanism as `public/robots.txt`):

```markdown
# Audio To Text Transcription

> Chrome extension that converts audio and video to text instantly, powered by OpenAI Whisper. Upload files or record from microphone/browser tab. Free to install and use, 90+ languages, exports to TXT/DOCX/PDF.

## Product
- [Homepage](https://audio-to-text-transcription.com/): Features, how it works, FAQ, and demo
- [Chrome Web Store listing](https://chromewebstore.google.com/detail/audio-to-text-transcription/pkfoaaglghblmjjjpbniicjcpehfbmgd): Install the extension

## Legal
- [Privacy Policy](https://audio-to-text-transcription.com/privacy/): Data handling and privacy practices
```

No email/contact section (user chose to omit it).

**Acceptance criteria:** `GET /llms.txt` on the built site returns this content with `content-type: text/plain` (or Astro's default static-file type), no 404.

---

### 2. "Paid plans" claim not backed by anything on the site (HIGH)

**File:** `src/layouts/Layout.astro` (JSON-LD `FAQPage` block, "Is it free to use?" entry, currently line 120)

**Problem:** The homepage positions the product as fully free (no pricing page, no pricing nav item, hero/FAQ UI never mentions tiers), but the JSON-LD `FAQPage` schema's last answer says: *"The extension is free to install and use with a generous free tier. Premium features and higher usage limits are available with paid plans."* An AI system summarizing the FAQ schema could tell users about a paid plan that doesn't exist anywhere else on the site. Note: this schema question does not even appear in the visible `FAQSection.vue` component — the schema has drifted from the on-page FAQ content, so no visible UI change is needed, only the JSON-LD text.

**Fix:**
```diff
- "text": "The extension is free to install and use with a generous free tier. Premium features and higher usage limits are available with paid plans."
+ "text": "The extension is free to install and use."
```

**Acceptance criteria:** Rendered JSON-LD for the homepage contains no mention of "paid", "premium", or "plans" in the FAQ answers.

---

### 3. Testimonial avatar filenames don't match displayed names (HIGH)

**Files:**
- `public/reviews/review-marco.webp` → rename to `public/reviews/review-sergei-s.webp`
- `public/reviews/review-sergei.webp` → rename to `public/reviews/review-sofia-d.webp`
- `src/components/TestimonialsSection.vue` (lines 175 and 197 — `avatar` paths)

**Problem:** `review-marco.webp` is used as the avatar for testimonial "Sergei S." and `review-sergei.webp` is used for "Sofia D." — filenames don't match the names shown. Verified the photos themselves are correctly gendered for their assigned names (checked both images directly), so this is a filename/naming inconsistency only, not a wrong-photo issue. No photo or testimonial text changes — rename files and update the two path references to match.

**Fix:**
```diff
  {
    name: 'Sergei S.',
    role: 'Software Engineer',
    text: 'I loved this extension...',
-   avatar: '/reviews/review-marco.webp',
+   avatar: '/reviews/review-sergei-s.webp',
  },
```
```diff
  {
    name: 'Sofia D.',
    role: 'Content Creator',
    text: 'Game changer for my YouTube workflow...',
-   avatar: '/reviews/review-sergei.webp',
+   avatar: '/reviews/review-sofia-d.webp',
  },
```

**Acceptance criteria:** No file named `review-marco.webp` or `review-sergei.webp` remains in `public/reviews/`. `TestimonialsSection.vue` references `review-sergei-s.webp` for "Sergei S." and `review-sofia-d.webp` for "Sofia D.". Testimonials section renders both avatars correctly (visual check).

---

## Out of Scope (deferred from the GEO audit report)

- Splitting FAQ/How-it-works into standalone citable URLs
- Brand authority / `sameAs` social links / directory listings (LinkedIn, Product Hunt, G2, etc.)
- About/Team page, author attribution
- Twitter Card meta tags
- Sitemap expansion
- Individual `Review` schema objects backing the aggregate rating
- Long-tail content pages

---

## Implementation Notes

- All changes on branch `geo-audit-fixes`
- No functional or visual changes beyond the avatar image swap (same faces, corrected filenames) — purely metadata/content-accuracy fixes
- No changes to `FAQSection.vue` (visible FAQ UI) — the "paid plans" fix is schema-only since that question isn't shown on-page
