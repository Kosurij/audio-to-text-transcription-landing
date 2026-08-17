# Canonical Trailing-Slash URLs Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ensure every crawl-facing reference to an indexable static page uses the trailing-slash URL that Netlify serves with HTTP 200.

**Architecture:** Treat Netlify's existing trailing-slash behavior as the canonical URL policy. Protect that boundary with an integration test over the built sitemap and HTML, then align the sitemap and internal links without changing redirects or hosting configuration.

**Tech Stack:** Astro 7, Vue 3, Node.js built-in test runner, XML/HTML static build artifacts

## Global Constraints

- Keep `http://` to `https://` redirection unchanged.
- Canonical page URLs are `/privacy/`, `/terms/`, `/refund/`, and `/contact/`.
- Do not change page content, metadata semantics, or hosting behavior.
- Verify against generated `dist/` output.

---

### Task 1: Protect and align crawl-facing URLs

**Files:**
- Modify: `tests/legal-pages.test.mjs`
- Modify: `public/sitemap.xml`
- Modify: `src/components/AppFooter.vue`
- Modify: `src/components/FAQSection.vue`
- Modify: `src/pages/refund.astro`

**Interfaces:**
- Consumes: Astro's generated files in `dist/` and the existing public sitemap.
- Produces: Sitemap entries and rendered internal anchors whose indexable paths all end in `/`.

- [ ] **Step 1: Write the failing regression test**

Extend `tests/legal-pages.test.mjs` with assertions that the sitemap contains the four literal canonical URLs ending in `/`, contains none of their redirecting forms, and that relevant generated HTML contains no `href` for those paths without `/`.

- [ ] **Step 2: Run the focused test and verify RED**

Run: `npm run build && node --test tests/legal-pages.test.mjs`

Expected: FAIL because the current sitemap and rendered internal links omit trailing slashes.

- [ ] **Step 3: Apply the minimal production changes**

Change the four sitemap `<loc>` values to:

```xml
https://audio-to-text-transcription.com/privacy/
https://audio-to-text-transcription.com/terms/
https://audio-to-text-transcription.com/refund/
https://audio-to-text-transcription.com/contact/
```

Change internal anchors targeting those pages to `/privacy/`, `/terms/`, `/refund/`, and `/contact/` in the listed Astro/Vue files.

- [ ] **Step 4: Run the focused test and verify GREEN**

Run: `npm run build && node --test tests/legal-pages.test.mjs`

Expected: all focused tests pass.

- [ ] **Step 5: Run full verification**

Run: `npm test`

Expected: build succeeds and all tests pass.

Run: `git diff --check`

Expected: no output and exit code 0.

- [ ] **Step 6: Review the generated crawl surface**

Inspect `dist/sitemap.xml` plus generated HTML for `/privacy/`, `/terms/`, `/refund/`, and `/contact/`. Confirm canonicals and internal anchors use the same trailing-slash policy.

- [ ] **Step 7: Commit the implementation**

```bash
git add tests/legal-pages.test.mjs public/sitemap.xml src/components/AppFooter.vue src/components/FAQSection.vue src/pages/refund.astro docs/superpowers/plans/2026-08-17-canonical-trailing-slash-urls.md
git commit -m "fix: publish canonical trailing-slash URLs"
```
