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

**Problem:** `site` is set to `https://audio-to-text-transcription.pro`, but the live site is at `https://audio-to-text-transcription.com`. This causes all auto-generated `<link rel="canonical">` URLs to point through a redirect.

**Fix:** Change `site` to `https://audio-to-text-transcription.com`.

**Acceptance criteria:** After `astro build`, the canonical link in rendered HTML contains `.com`, not `.pro`.

---

### 2. Conflicting robots meta tags (CRITICAL)

**File:** `src/layouts/Layout.astro`

**Problem:** The layout outputs two conflicting robots directives simultaneously when `noindex=true`:
- Line 33 (conditional): `<meta name="robots" content="noindex, nofollow" />`
- Line 60 (always present): `<meta name="robots" content="index, follow" />`
- Line 61 (always present): `<meta name="googlebot" content="index, follow" />`

When `noindex=true`, all three tags appear in the HTML — the `index, follow` tags override the `noindex, nofollow` intent.

**Fix:** Remove the unconditional `index, follow` and `googlebot` tags (lines 60–61). Replace with a single conditional block: output either `noindex, nofollow` or `index, follow` — never both. The `googlebot` tag is redundant and can be dropped entirely.

```astro
<meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
```

**Acceptance criteria:** Pages with `noindex=true` have exactly one robots meta tag with `noindex, nofollow`. Pages without have exactly one tag with `index, follow`. No `googlebot` meta tag.

---

### 3. Hardcoded `.pro` URLs in JSON-LD (MEDIUM — redirect links)

**File:** `src/layouts/Layout.astro`

**Problem:** The JSON-LD structured data block contains 9 hardcoded `https://audio-to-text-transcription.pro/` URL instances and one email `support@audio-to-text-transcription.pro`. All URL references point to a redirecting domain.

**Fix:**
- Derive JSON-LD URLs from `Astro.site` (the canonical source of truth already fixed in issue 1) to prevent this mismatch from recurring. Use `Astro.site` for all URL values.
- Update the contact email to `support@audio-to-text-transcription.com`.
- Do not change any other email addresses in the document (e.g., `kosurij.dm@gmail.com` on privacy page is unrelated).

**Acceptance criteria:** JSON-LD in rendered HTML contains no `.pro` domain references. URLs match `Astro.site`. Schema.org validator passes.

---

### 4. Privacy page incorrectly set to noindex (CRITICAL)

**File:** `src/pages/privacy.astro`

**Problem:** The `noindex` prop is passed to `<Layout>`, preventing search engines from indexing the Privacy Policy page. The SEO audit flagged this as a page that should be indexed.

**Fix:** Remove the `noindex` prop from the Layout call on line 10.

**Acceptance criteria:** Rendered HTML for `/privacy` has `<meta name="robots" content="index, follow" />`.

---

### 5. Incorrect heading hierarchy (MEDIUM)

**Files:** `src/components/UploadRecordSection.vue`, `src/components/AppFooter.vue`

#### UploadRecordSection

The section has `<h3>` card titles ("Upload a file", "Record audio live") with no parent `<h2>` within the section, skipping a level after the `<h1>` in HeroSection.

**Fix:** Add a visually hidden `<h2>` to the section. Example:

```html
<h2 class="sr-only">Try it now</h2>
```

Add a `.sr-only` CSS utility class (position absolute, visually hidden, accessible to screen readers).

#### AppFooter

Footer columns use `<h4>` ("Product", "Support") with no preceding `<h3>` or `<h2>` in the footer context.

**Fix:** Change `<h4>` to `<h3>`. Footer landmark elements are treated as independent regions by screen readers and do not need to continue the page's heading hierarchy — `<h3>` is the appropriate level for column titles within a footer section.

**Acceptance criteria:** Running an automated heading outline tool shows no skipped heading levels on the main page. UploadRecordSection has h2 → h3 chain. AppFooter column titles are h3.

---

### 6. Duplicate heading text in DOM (LOW)

**File:** `src/components/HowItWorksSection.vue`

**Problem:** The component renders step titles as `<h3>` twice: once in the desktop grid (line 22) and once in the mobile carousel (line 36). Both exist in the DOM simultaneously, causing duplicate heading text for screen readers and SEO crawlers.

**Fix:** Add `aria-hidden="true"` to the `<h3>` elements inside the mobile carousel (`.hiw-carousel` wrapper). The desktop `<h3>` remains the semantic source of truth. Only the headings need `aria-hidden`; other carousel content (descriptions) is not duplicated in this component.

**Acceptance criteria:** DOM contains each step title heading exactly once without `aria-hidden`. The mobile carousel `<h3>` elements have `aria-hidden="true"`.

---

## Out of Scope

- Heading keyword changes — user confirmed current text is acceptable.
- `uninstall.astro` and `welcome.astro` — intentionally noindex, not flagged by audit.

---

## Implementation Notes

- All changes on branch `fix/seo-audit`
- No functional or visual changes — purely SEO/semantic improvements
- Fixing `astro.config.mjs` (issue 1) automatically propagates correct canonicals to all pages; JSON-LD URLs should additionally be templated from `Astro.site` rather than hardcoded
