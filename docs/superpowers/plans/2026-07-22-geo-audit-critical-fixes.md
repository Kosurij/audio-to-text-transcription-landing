# GEO Audit Critical Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the three high-priority items from the GEO audit report (`docs/GEO-AUDIT-REPORT.md`): add a missing `llms.txt`, remove an unbacked "paid plans" claim from the JSON-LD FAQ schema, and fix testimonial avatar filenames that don't match the displayed names.

**Architecture:** Three fully independent, isolated changes — a new static file, a one-line JSON-LD text edit, and a file rename + two path references. No cross-dependencies between tasks.

**Tech Stack:** Astro 4, Vue 3, static output (`astro build`). No test framework — verification via `npm run build` + grep of built HTML, plus a visual check for the avatar rename.

## Global Constraints

- Do not touch anything outside the three issues in this plan (no FAQ UI changes, no brand/schema additions, no sitemap changes) — everything else in the audit report is explicitly deferred, per the spec's "Out of Scope" section.
- `llms.txt` must NOT include a contact/email section (user explicitly asked to omit it).
- Avatar fix must not change any photo or testimonial text — only filenames and the two path references.

---

## File Map

| File | Change |
|------|--------|
| `public/llms.txt` | New file |
| `src/layouts/Layout.astro` | Edit FAQ JSON-LD "Is it free to use?" answer text (line 120) |
| `public/reviews/review-marco.webp` → `public/reviews/review-sergei-s.webp` | Rename |
| `public/reviews/review-sergei.webp` → `public/reviews/review-sofia-d.webp` | Rename |
| `src/components/TestimonialsSection.vue` | Update avatar paths (lines 175, 197) |

---

## Task 1: Create branch

**Files:** none (git only)

- [ ] **Step 1: Create and switch to the feature branch**

```bash
git checkout -b geo-audit-fixes
```

Expected: `Switched to a new branch 'geo-audit-fixes'`

---

## Task 2: Add llms.txt

**Files:**
- Create: `public/llms.txt`

- [ ] **Step 1: Create the file**

Create `public/llms.txt` with this exact content:

```markdown
# Audio To Text Transcription

> Chrome extension that converts audio and video to text instantly, powered by OpenAI Whisper. Upload files or record from microphone/browser tab. Free to install and use, 90+ languages, exports to TXT/DOCX/PDF.

## Product
- [Homepage](https://audio-to-text-transcription.com/): Features, how it works, FAQ, and demo
- [Chrome Web Store listing](https://chromewebstore.google.com/detail/audio-to-text-transcription/pkfoaaglghblmjjjpbniicjcpehfbmgd): Install the extension

## Legal
- [Privacy Policy](https://audio-to-text-transcription.com/privacy/): Data handling and privacy practices
```

- [ ] **Step 2: Build and verify the file is served**

```bash
npm run build && cat dist/llms.txt
```

Expected: output matches the content above exactly (Astro copies `public/` files to `dist/` unchanged).

- [ ] **Step 3: Commit**

```bash
git add public/llms.txt
git commit -m "feat: add llms.txt for AI crawler discovery"
```

---

## Task 3: Remove unbacked "paid plans" claim from FAQ schema

**Files:**
- Modify: `src/layouts/Layout.astro:120`

The JSON-LD `FAQPage` block's last question ("Is it free to use?") currently claims paid/premium plans exist. Nothing else on the site mentions pricing tiers — this line is being removed, not moved.

- [ ] **Step 1: Edit the answer text**

In `src/layouts/Layout.astro`, on line 120, change:

```diff
-        { "@type": "Question", "name": "Is it free to use?", "acceptedAnswer": { "@type": "Answer", "text": "The extension is free to install and use with a generous free tier. Premium features and higher usage limits are available with paid plans." } }
+        { "@type": "Question", "name": "Is it free to use?", "acceptedAnswer": { "@type": "Answer", "text": "The extension is free to install and use." } }
```

- [ ] **Step 2: Build and verify no pricing-tier language remains**

```bash
npm run build && grep -o 'paid plans\|Premium features\|free tier' dist/index.html
```

Expected: no output (empty — all three phrases are gone).

```bash
grep -o '"Is it free to use?[^}]*"' dist/index.html
```

Expected: contains `The extension is free to install and use.` and nothing after it.

- [ ] **Step 3: Commit**

```bash
git add src/layouts/Layout.astro
git commit -m "fix: remove unbacked paid-plans claim from FAQ schema"
```

---

## Task 4: Fix testimonial avatar filenames

**Files:**
- Rename: `public/reviews/review-marco.webp` → `public/reviews/review-sergei-s.webp`
- Rename: `public/reviews/review-sergei.webp` → `public/reviews/review-sofia-d.webp`
- Modify: `src/components/TestimonialsSection.vue:175,197`

Both photos are already correctly matched to the gender of the name they're displayed under (verified visually) — only the filenames are misleading (they use different people's names than the testimonial they're attached to). No photo or testimonial copy changes.

- [ ] **Step 1: Rename the image files**

```bash
git mv public/reviews/review-marco.webp public/reviews/review-sergei-s.webp
git mv public/reviews/review-sergei.webp public/reviews/review-sofia-d.webp
```

- [ ] **Step 2: Update the avatar path for "Sergei S."**

In `src/components/TestimonialsSection.vue`, line 175:

```diff
  {
    name: 'Sergei S.',
    role: 'Software Engineer',
    text: 'I loved this extension. The audio-to-text conversion is accurate. The browser tab recording feature is especially useful. I recommend it to everyone!',
-   avatar: '/reviews/review-marco.webp',
+   avatar: '/reviews/review-sergei-s.webp',
  },
```

- [ ] **Step 3: Update the avatar path for "Sofia D."**

In the same file, line 197:

```diff
  {
    name: 'Sofia D.',
    role: 'Content Creator',
    text: 'Game changer for my YouTube workflow. I record commentary, transcribe it instantly, and use the TXT file for descriptions and subtitles. Simple and accurate.',
-   avatar: '/reviews/review-sergei.webp',
+   avatar: '/reviews/review-sofia-d.webp',
  },
```

- [ ] **Step 4: Build and verify references resolve**

```bash
npm run build
grep -o 'review-sergei-s\.webp\|review-sofia-d\.webp' dist/index.html | sort -u
```

Expected: both filenames appear.

```bash
grep -o 'review-marco\.webp\|review-sergei\.webp' dist/index.html
```

Expected: no output (old filenames no longer referenced).

```bash
ls dist/reviews/ | grep -E 'sergei-s|sofia-d|marco|review-sergei\.webp'
```

Expected: `review-sergei-s.webp` and `review-sofia-d.webp` present; `review-marco.webp` and `review-sergei.webp` absent.

- [ ] **Step 5: Visual check**

```bash
npm run preview
```

Open the preview URL, scroll to the testimonials section, and confirm:
- "Sergei S." card shows the bearded man's photo
- "Sofia D." card shows the woman's photo
- No broken image icons

Stop the preview server (Ctrl+C) once confirmed.

- [ ] **Step 6: Commit**

```bash
git add src/components/TestimonialsSection.vue public/reviews/review-sergei-s.webp public/reviews/review-sofia-d.webp
git commit -m "fix: rename testimonial avatar files to match displayed names"
```

---

## Task 5: Final verification

- [ ] **Step 1: Full clean build**

```bash
npm run build
```

Expected: builds with no errors.

- [ ] **Step 2: Confirm all three fixes together**

```bash
echo "--- llms.txt ---"
cat dist/llms.txt
echo "--- FAQ schema (no paid plans) ---"
grep -c 'paid plans' dist/index.html
echo "--- avatar files in dist ---"
ls dist/reviews/
```

Expected:
- `llms.txt` content matches Task 2
- `paid plans` count is `0`
- `dist/reviews/` contains `review-sergei-s.webp` and `review-sofia-d.webp`, not `review-marco.webp` or `review-sergei.webp`

- [ ] **Step 3: Push branch**

```bash
git push -u origin geo-audit-fixes
```

Then open a PR from `geo-audit-fixes` → `main` (or hand off to the user to review locally first — confirm which before pushing).
