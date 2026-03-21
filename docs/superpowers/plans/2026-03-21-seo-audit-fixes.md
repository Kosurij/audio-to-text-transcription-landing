# SEO Audit Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix 6 SEO issues identified in the audit report — conflicting robots meta tags, wrong domain in config, noindex on privacy page, heading hierarchy issues, and duplicate headings in DOM.

**Architecture:** All changes are isolated to individual files with no cross-dependencies. No new abstractions needed. The domain fix in `astro.config.mjs` propagates automatically to canonical URLs; JSON-LD URLs are migrated from hardcoded strings to `Astro.site`-derived values via frontmatter.

**Tech Stack:** Astro 4, Vue 3, static output (`astro build`). No test framework — verification via `npm run build` + grep of built HTML.

---

## File Map

| File | Change |
|------|--------|
| `astro.config.mjs` | Fix `site` domain: `.pro` → `.com` |
| `src/layouts/Layout.astro` | Fix robots meta (conditional); migrate JSON-LD URLs to `Astro.site` |
| `src/pages/privacy.astro` | Remove `noindex` prop |
| `src/components/UploadRecordSection.vue` | Add sr-only `<h2>` before card titles |
| `src/components/AppFooter.vue` | Change `<h4>` → `<h3>` for footer column titles |
| `src/components/HowItWorksSection.vue` | Add `aria-hidden="true"` to mobile carousel `<h3>` elements |

---

## Task 1: Create branch

**Files:** none (git only)

- [ ] **Step 1: Create and switch to the feature branch**

```bash
git checkout -b fix/seo-audit
```

Expected: switched to new branch `fix/seo-audit`

---

## Task 2: Fix domain in astro.config.mjs

**Files:**
- Modify: `astro.config.mjs`

- [ ] **Step 1: Change the site URL**

In `astro.config.mjs`, change line 8:

```js
// Before
site: 'https://audio-to-text-transcription.pro',

// After
site: 'https://audio-to-text-transcription.com',
```

- [ ] **Step 2: Build and verify canonical URL**

```bash
npm run build && grep -r 'canonical' dist/index.html
```

Expected output contains: `href="https://audio-to-text-transcription.com/"`
Must NOT contain: `audio-to-text-transcription.pro`

- [ ] **Step 3: Commit**

```bash
git add astro.config.mjs
git commit -m "fix: correct site domain from .pro to .com"
```

---

## Task 3: Fix robots meta tags in Layout.astro

**Files:**
- Modify: `src/layouts/Layout.astro`

The current code has a conflict: lines 60–61 always output `index, follow` and `googlebot index, follow`, while line 33 conditionally adds `noindex, nofollow`. When `noindex=true`, all three tags are present.

- [ ] **Step 1: Replace conflicting tags with single conditional tag**

In `src/layouts/Layout.astro`:

Remove line 33 (conditional noindex):
```astro
{noindex && <meta name="robots" content="noindex, nofollow" />}
```

Remove lines 60–61 (unconditional):
```astro
<meta name="robots" content="index, follow" />
<meta name="googlebot" content="index, follow" />
```

Add one line in their place (put it where line 33 was, in the `<head>` after the description meta):
```astro
<meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
```

- [ ] **Step 2: Build and verify — page without noindex**

```bash
npm run build && grep -c 'name="robots"' dist/index.html
```

Expected: `1` (exactly one robots meta tag)

```bash
grep 'name="robots"' dist/index.html
```

Expected: `content="index, follow"`

- [ ] **Step 3: Verify — uninstall page (has noindex)**

```bash
grep 'name="robots"' dist/uninstall/index.html
```

Expected: `content="noindex, nofollow"` — and only one such tag.

```bash
grep -c 'name="robots"' dist/uninstall/index.html
```

Expected: `1`

- [ ] **Step 4: Verify — no googlebot meta anywhere**

```bash
grep -r 'name="googlebot"' dist/
```

Expected: no output (empty)

- [ ] **Step 5: Commit**

```bash
git add src/layouts/Layout.astro
git commit -m "fix: replace conflicting robots meta tags with single conditional tag"
```

---

## Task 4: Fix JSON-LD URLs in Layout.astro

**Files:**
- Modify: `src/layouts/Layout.astro`

The JSON-LD block has 9 hardcoded `https://audio-to-text-transcription.pro/` URLs and one `.pro` email address. Migrate to `Astro.site` to stay in sync with the config.

- [ ] **Step 1: Move JSON-LD to frontmatter as a JS object**

In `src/layouts/Layout.astro`, in the frontmatter (`---` block), add after the existing props destructuring:

```ts
const siteUrl = Astro.site?.toString().replace(/\/$/, '') ?? 'https://audio-to-text-transcription.com';

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "url": `${siteUrl}/`,
      "name": "Audio To Text Transcription - Convert Audio to Text Instantly",
      "description": "Transform any audio into accurate text with our powerful Chrome extension. Perfect for meetings, interviews, podcasts, and more.",
      "publisher": {
        "@type": "Organization",
        "name": "Audio To Text Transcription",
        "url": `${siteUrl}/`
      },
      "potentialAction": [
        {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${siteUrl}/?q={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      ],
      "inLanguage": "en"
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      "name": "Audio To Text Transcription",
      "url": `${siteUrl}/`,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "support@audio-to-text-transcription.com",
        "contactType": "customer service"
      }
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#software`,
      "name": "Audio To Text Transcription",
      "description": "A powerful Chrome extension that converts audio to text instantly. Perfect for transcribing meetings, interviews, podcasts, lectures, and any audio content with high accuracy.",
      "url": `${siteUrl}/`,
      "applicationCategory": "ProductivityApplication",
      "operatingSystem": "Chrome Browser",
      "browserRequirements": "Requires Chrome browser",
      "softwareVersion": "1.5",
      "datePublished": "2025-01-01",
      "dateModified": "2026-03-19",
      "author": { "@id": `${siteUrl}/#organization` },
      "publisher": { "@id": `${siteUrl}/#organization` },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "200",
        "bestRating": "5",
        "worstRating": "1"
      },
      "featureList": [
        "Instant Audio to Text Conversion",
        "High Accuracy Transcription",
        "Support for Multiple Audio Formats",
        "Real-time Transcription",
        "Export to Multiple Formats (TXT, DOCX, PDF)",
        "Multilingual Support",
        "Privacy-Focused (no data collection)",
        "Offline Functionality",
        "Easy to Use Interface",
        "Fast Processing"
      ]
    },
    {
      "@type": "HowTo",
      "name": "How to use Audio To Text Transcription Chrome Extension",
      "description": "Step-by-step guide to install and use the Audio To Text Transcription extension",
      "totalTime": "PT2M",
      "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
      "supply": [
        { "@type": "HowToSupply", "name": "Chrome Browser" },
        { "@type": "HowToSupply", "name": "Audio file or source" }
      ],
      "tool": [{ "@type": "HowToTool", "name": "Audio To Text Transcription Chrome Extension" }],
      "step": [
        { "@type": "HowToStep", "position": 1, "name": "Install the extension", "text": "One click in Chrome Web Store to add the extension to your browser" },
        { "@type": "HowToStep", "position": 2, "name": "Upload your audio", "text": "Click the extension icon and upload your audio file or select an audio source" },
        { "@type": "HowToStep", "position": 3, "name": "Get your transcription", "text": "Wait a few moments and receive accurate text transcription that you can edit and export" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "What is Audio To Text Transcription?", "acceptedAnswer": { "@type": "Answer", "text": "Audio To Text Transcription is a powerful Chrome extension that converts any audio into accurate text. It's perfect for transcribing meetings, interviews, podcasts, lectures, and any other audio content quickly and efficiently." } },
        { "@type": "Question", "name": "What audio formats are supported?", "acceptedAnswer": { "@type": "Answer", "text": "The extension supports all major audio formats including MP3, WAV, M4A, OGG, FLAC, and more. You can also transcribe audio from video files and live audio sources." } },
        { "@type": "Question", "name": "How accurate is the transcription?", "acceptedAnswer": { "@type": "Answer", "text": "Our transcription engine provides high accuracy, typically above 95% for clear audio. The accuracy depends on audio quality, speaker clarity, and background noise levels." } },
        { "@type": "Question", "name": "Is my data private and secure?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. We prioritize your privacy. Audio files are processed securely, and we don't store or share your data. Everything happens locally in your browser when possible." } },
        { "@type": "Question", "name": "Can I export the transcribed text?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, you can export your transcriptions in multiple formats including plain text (TXT), Word document (DOCX), and PDF. You can also copy the text directly to your clipboard." } },
        { "@type": "Question", "name": "Does it support multiple languages?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, the extension supports transcription in multiple languages including English, Spanish, French, German, Italian, Portuguese, Russian, Chinese, Japanese, and many more." } },
        { "@type": "Question", "name": "Do I need an internet connection?", "acceptedAnswer": { "@type": "Answer", "text": "An internet connection is required for the transcription process as it uses advanced AI models. However, once installed, the extension interface works offline." } },
        { "@type": "Question", "name": "Is it free to use?", "acceptedAnswer": { "@type": "Answer", "text": "The extension is free to install and use with a generous free tier. Premium features and higher usage limits are available with paid plans." } }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${siteUrl}/` }
      ]
    }
  ]
};
```

- [ ] **Step 2: Replace the inline `<script type="application/ld+json">` block in the HTML**

Find and remove the entire existing `<script type="application/ld+json">` block (currently lines 66–280 in Layout.astro).

Replace with:
```astro
<script type="application/ld+json" set:html={JSON.stringify(jsonLd)} />
```

- [ ] **Step 3: Build and verify no .pro in JSON-LD**

```bash
npm run build && grep -o 'audio-to-text-transcription\.pro' dist/index.html | wc -l
```

Expected: `0`

```bash
grep 'audio-to-text-transcription\.com' dist/index.html | head -3
```

Expected: several matches including JSON-LD content and canonical.

- [ ] **Step 4: Commit**

```bash
git add src/layouts/Layout.astro
git commit -m "fix: migrate JSON-LD URLs to Astro.site, fix contact email domain"
```

---

## Task 5: Remove noindex from privacy page

**Files:**
- Modify: `src/pages/privacy.astro`

- [ ] **Step 1: Remove the noindex prop**

In `src/pages/privacy.astro`, change line 10:

```astro
<!-- Before -->
<Layout title={title} description={description} noindex>

<!-- After -->
<Layout title={title} description={description}>
```

- [ ] **Step 2: Build and verify**

```bash
npm run build && grep 'name="robots"' dist/privacy/index.html
```

Expected: `content="index, follow"`

- [ ] **Step 3: Commit**

```bash
git add src/pages/privacy.astro
git commit -m "fix: make privacy page indexable by search engines"
```

---

## Task 6: Fix heading hierarchy in UploadRecordSection

**Files:**
- Modify: `src/components/UploadRecordSection.vue`

The section jumps from page `<h1>` (HeroSection) directly to `<h3>` card titles. A visually hidden `<h2>` bridges the gap.

- [ ] **Step 1: Add sr-only h2 and CSS class**

In `src/components/UploadRecordSection.vue`, in the template, add a hidden `<h2>` as the first child inside `.upload-record-container`:

```html
<div class="upload-record-container">
  <h2 class="sr-only">Try it now</h2>
  <!-- Two action cards -->
  <div class="cards">
```

In the `<style>` block of the same file, add:

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

- [ ] **Step 2: Build and verify heading is present in HTML**

```bash
npm run build && grep -A1 'sr-only' dist/index.html | head -5
```

Expected: contains `<h2` with `sr-only` class and "Try it now" text.

- [ ] **Step 3: Commit**

```bash
git add src/components/UploadRecordSection.vue
git commit -m "fix: add sr-only h2 to UploadRecordSection to fix heading hierarchy"
```

---

## Task 7: Fix heading level in AppFooter

**Files:**
- Modify: `src/components/AppFooter.vue`

Footer column titles "Product" and "Support" use `<h4>` with no `<h3>` above them. Change to `<h3>`.

- [ ] **Step 1: Replace h4 with h3**

In `src/components/AppFooter.vue`, change both occurrences (lines 19 and 30):

```html
<!-- Before -->
<h4 class="footer-col-title">Product</h4>
...
<h4 class="footer-col-title">Support</h4>

<!-- After -->
<h3 class="footer-col-title">Product</h3>
...
<h3 class="footer-col-title">Support</h3>
```

Also update CSS selector if it references `h4` specifically (check `<style>` block in AppFooter.vue — if the style targets `.footer-col-title` by class, no CSS change needed; if it targets `h4`, update to `h3`).

- [ ] **Step 2: Build and verify**

```bash
npm run build && grep 'footer-col-title' dist/index.html
```

Expected: all footer column titles are `<h3>`, not `<h4>`.

- [ ] **Step 3: Commit**

```bash
git add src/components/AppFooter.vue
git commit -m "fix: change footer column headings from h4 to h3"
```

---

## Task 8: Fix duplicate headings in HowItWorksSection

**Files:**
- Modify: `src/components/HowItWorksSection.vue`

The component renders step `<h3>` titles twice: once in the desktop grid and once in the mobile carousel. Add `aria-hidden="true"` to the carousel copies.

- [ ] **Step 1: Add aria-hidden to mobile carousel h3s**

In `src/components/HowItWorksSection.vue`, inside `.hiw-carousel` (the mobile carousel), find the `<h3 class="step-title">` at line 36 and add `aria-hidden="true"`:

```html
<!-- Before (inside .hiw-carousel) -->
<h3 class="step-title">{{ step.title }}</h3>

<!-- After -->
<h3 class="step-title" aria-hidden="true">{{ step.title }}</h3>
```

The desktop `<h3>` at line 22 (inside `.steps`) stays unchanged — it is the semantic source of truth.

- [ ] **Step 2: Build and verify**

```bash
npm run build && grep -c 'step-title' dist/index.html
```

This shows the total count of step-title elements. With 3 steps rendered twice, expect 6 total. Now verify some have aria-hidden:

```bash
grep 'aria-hidden="true"' dist/index.html | grep 'step-title' | wc -l
```

Expected: `3` (one per step, in the carousel only)

- [ ] **Step 3: Commit**

```bash
git add src/components/HowItWorksSection.vue
git commit -m "fix: add aria-hidden to duplicate step headings in mobile carousel"
```

---

## Task 9: Final verification

- [ ] **Step 1: Full build check**

```bash
npm run build
```

Expected: builds with no errors.

- [ ] **Step 2: Verify all robots meta tags**

```bash
grep 'name="robots"' dist/index.html dist/privacy/index.html dist/uninstall/index.html dist/welcome/index.html
```

Expected:
- `index.html`: `index, follow`
- `privacy/index.html`: `index, follow`
- `uninstall/index.html`: `noindex, nofollow`
- `welcome/index.html`: `noindex, nofollow`

- [ ] **Step 3: Verify no .pro domain anywhere in dist**

```bash
grep -r 'audio-to-text-transcription\.pro' dist/ | grep -v 'Binary'
```

Expected: no output.

- [ ] **Step 4: Open PR**

```bash
git push -u origin fix/seo-audit
```

Then open a PR from `fix/seo-audit` → `main`.
