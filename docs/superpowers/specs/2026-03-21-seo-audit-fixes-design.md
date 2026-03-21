# SEO Audit Fixes — Design Spec

**Date:** 2026-03-21
**Branch:** `fix/seo-audit`
**Priority:** Critical (2) + Medium (3) + Low (1)

---

## Context

An SEO audit report identified 6 issues across the landing site (`audio-to-text-transcription.com`). All fixes are isolated and non-breaking.

---

## Issues & Fixes

### 1. Wrong domain in config (MEDIUM — affects all pages)

**File:** `astro.config.mjs`
**Problem:** `site` is set to `https://audio-to-text-transcription.pro`, but the live site is at `https://audio-to-text-transcription.com`. This causes all auto-generated canonical URLs to point through a redirect.
**Fix:** Change `site` to `https://audio-to-text-transcription.com`.

---

### 2. Conflicting robots meta tags (CRITICAL)

**File:** `src/layouts/Layout.astro`
**Problem:** The layout always outputs `<meta name="robots" content="index, follow" />` (line 60), AND conditionally outputs `<meta name="robots" content="noindex, nofollow" />` (line 33) when `noindex` prop is true. Two conflicting tags confuse search engines.
**Fix:** Remove the unconditional `index, follow` tag. Replace with a single conditional tag: output either `noindex, nofollow` or `index, follow` — never both.

### 3. Hardcoded `.pro` URLs in JSON-LD (MEDIUM — redirect links)

**File:** `src/layouts/Layout.astro`
**Problem:** All `https://audio-to-text-transcription.pro/` URLs in the JSON-LD structured data block point to a redirecting domain.
**Fix:** Replace all `.pro` occurrences with `.com` in the JSON-LD block.

---

### 4. Privacy page incorrectly set to noindex (CRITICAL)

**File:** `src/pages/privacy.astro`
**Problem:** The `noindex` prop is passed to `<Layout>`, preventing search engines from indexing the Privacy Policy page.
**Fix:** Remove the `noindex` prop from the Layout call.

---

### 5. Incorrect heading hierarchy (MEDIUM)

**Files:** `src/components/UploadRecordSection.vue`, `src/components/AppFooter.vue`

**UploadRecordSection:**
The section has `<h3>` card titles ("Upload a file", "Record audio live") with no parent `<h2>` within the section, skipping a heading level after the `<h1>` in HeroSection.
**Fix:** Add a visually hidden (sr-only) `<h2>` to the section, or restructure to include a visible section heading.

**AppFooter:**
Footer columns use `<h4>` ("Product", "Support") with no preceding `<h3>` in the footer context.
**Fix:** Change `<h4>` to `<h3>` — footer column titles don't need to be h4 since there's no h3 above them.

---

### 6. Duplicate heading text in DOM (LOW)

**File:** `src/components/HowItWorksSection.vue`
**Problem:** The component renders step titles as `<h3>` twice: once in the desktop grid (lines 22) and once in the mobile carousel (line 36). Both exist in the DOM simultaneously, causing duplicate heading text.
**Fix:** Add `aria-hidden="true"` to the `<h3>` elements inside the mobile carousel. The desktop `<h3>` remains the semantic source of truth.

---

## Out of Scope

- Heading keyword changes ("How it works", "See it in action" etc.) — user confirmed current text is acceptable.
- Changes to `uninstall.astro` and `welcome.astro` — these are intentionally noindex.

---

## Implementation Notes

- All changes are on branch `fix/seo-audit`
- No functional changes — purely SEO/semantic improvements
- After domain fix in `astro.config.mjs`, canonical URLs will auto-update on all pages
