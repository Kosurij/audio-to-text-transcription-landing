# Remove Third-Party Branding Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the "OpenAI Whisper" third-party brand name from the live site's copy, replace the outdated personal support email on the privacy page, and add a "Still have a question?" contact CTA block under the FAQ section.

**Architecture:** This is a static Astro + Vue site (no backend, no test framework — `package.json` has no `vitest`/`jest`/`playwright`). All three tasks are text/markup edits to existing `.vue`/`.astro` files. There is no unit test suite to extend; "tests" in this plan are grep-based content assertions run via the shell, plus `npm run build` to catch syntax errors, plus a manual visual check in the dev server for the new markup in Task 3.

**Tech Stack:** Astro 4, Vue 3 (`<script setup lang="ts">`), scoped component CSS using the project's CSS custom properties (`--color-*`, `--accent-*`, `--gradient-*`, `--shadow-*` defined in `src/layouts/Layout.astro`).

## Global Constraints

- Do not modify `docs/superpowers/**` or `docs/GEO-AUDIT-REPORT.md` — historical planning/audit documents, not live site content, out of scope.
- Do not change the email addresses in `src/components/ContactSection.vue` or the JSON-LD in `src/layouts/Layout.astro` — both already use `support@audio-to-text-transcription.com`.
- Replacement wording for "OpenAI Whisper" is generic "AI" / "advanced AI" — no substitute brand or technology name.
- The FAQ CTA link must be an `<a href="/contact">`, not a `<button>` — `AppButton.vue` only renders a `<button>` and has no link-rendering mode, so it is not reused for this navigation link.

---

### Task 1: Replace "OpenAI Whisper" mentions with generic "AI" wording

**Files:**
- Modify: `src/components/HeroSection.vue:8`
- Modify: `src/components/FAQSection.vue:53`, `:59-61`, `:77`
- Modify: `src/components/AppFooter.vue:13`
- Modify: `src/pages/index.astro:15`

**Interfaces:** None — plain text content changes, no new functions/props/types introduced or consumed.

- [ ] **Step 1: Confirm current occurrences (pre-check)**

Run: `grep -rn "OpenAI Whisper" src/`
Expected output (order may vary, exactly these 6 lines):
```
src/components/HeroSection.vue:8:          ✦ Powered by OpenAI Whisper
src/components/FAQSection.vue:53:    answer: 'Audio To Text Transcription is a Chrome extension that turns any audio—from meetings, lectures, podcasts, or browser tabs—into searchable text powered by OpenAI Whisper.'
src/components/FAQSection.vue:61:    answer: 'We use OpenAI Whisper to deliver fast, high-quality transcripts—even for long sessions and diverse accents.'
src/components/FAQSection.vue:77:    answer: 'Accuracy depends on the recording quality. OpenAI Whisper delivers excellent results for clear speech with minimal background noise.'
src/components/AppFooter.vue:13:            Chrome extension for instant audio transcription. Powered by OpenAI Whisper.
src/pages/index.astro:15:const description = 'Convert audio and video to text instantly with our Chrome extension. Upload files, record from microphone or browser tab. Powered by OpenAI Whisper. Edit transcripts and export to multiple formats.';
```

- [ ] **Step 2: Edit `src/components/HeroSection.vue`**

Change line 8 from:
```html
          ✦ Powered by OpenAI Whisper
```
to:
```html
          ✦ Powered by AI
```

- [ ] **Step 3: Edit `src/components/FAQSection.vue`**

Change line 53 from:
```ts
    answer: 'Audio To Text Transcription is a Chrome extension that turns any audio—from meetings, lectures, podcasts, or browser tabs—into searchable text powered by OpenAI Whisper.'
```
to:
```ts
    answer: 'Audio To Text Transcription is a Chrome extension that turns any audio—from meetings, lectures, podcasts, or browser tabs—into searchable text powered by advanced AI.'
```

Change lines 59-61 from:
```ts
  {
    question: 'Which transcription engine do you use?',
    answer: 'We use OpenAI Whisper to deliver fast, high-quality transcripts—even for long sessions and diverse accents.'
  },
```
to:
```ts
  {
    question: 'How does the transcription work?',
    answer: 'We use advanced AI to deliver fast, high-quality transcripts—even for long sessions and diverse accents.'
  },
```

Change line 77 from:
```ts
    answer: 'Accuracy depends on the recording quality. OpenAI Whisper delivers excellent results for clear speech with minimal background noise.'
```
to:
```ts
    answer: 'Accuracy depends on the recording quality. Our AI model delivers excellent results for clear speech with minimal background noise.'
```

- [ ] **Step 4: Edit `src/components/AppFooter.vue`**

Change line 13 from:
```html
            Chrome extension for instant audio transcription. Powered by OpenAI Whisper.
```
to:
```html
            Chrome extension for instant audio transcription. Powered by AI.
```

- [ ] **Step 5: Edit `src/pages/index.astro`**

Change line 15 from:
```ts
const description = 'Convert audio and video to text instantly with our Chrome extension. Upload files, record from microphone or browser tab. Powered by OpenAI Whisper. Edit transcripts and export to multiple formats.';
```
to:
```ts
const description = 'Convert audio and video to text instantly with our Chrome extension. Upload files, record from microphone or browser tab. Powered by advanced AI. Edit transcripts and export to multiple formats.';
```

- [ ] **Step 6: Verify no occurrences remain**

Run: `grep -rn "OpenAI Whisper" src/`
Expected: no output (exit code 1, empty result).

- [ ] **Step 7: Build check**

Run: `npm run build`
Expected: build completes with no errors.

- [ ] **Step 8: Commit**

```bash
git add src/components/HeroSection.vue src/components/FAQSection.vue src/components/AppFooter.vue src/pages/index.astro
git commit -m "Replace OpenAI Whisper mentions with generic AI wording"
```

---

### Task 2: Replace outdated support email on privacy page

**Files:**
- Modify: `src/pages/privacy.astro:248, 264, 343`

**Interfaces:** None — plain text/attribute changes.

- [ ] **Step 1: Confirm current occurrences (pre-check)**

Run: `grep -n "kosurij.dm@gmail.com" src/pages/privacy.astro`
Expected output (exactly these 3 lines):
```
248:          each newsletter or by emailing <a href="mailto:kosurij.dm@gmail.com">kosurij.dm@gmail.com</a> with your request.
264:          <a href="mailto:kosurij.dm@gmail.com">kosurij.dm@gmail.com</a> with the nature of your request. You also have the
343:          <a href="mailto:kosurij.dm@gmail.com">kosurij.dm@gmail.com</a>.
```

- [ ] **Step 2: Edit line 248**

Change:
```html
          each newsletter or by emailing <a href="mailto:kosurij.dm@gmail.com">kosurij.dm@gmail.com</a> with your request.
```
to:
```html
          each newsletter or by emailing <a href="mailto:support@audio-to-text-transcription.com">support@audio-to-text-transcription.com</a> with your request.
```

- [ ] **Step 3: Edit line 264**

Change:
```html
          <a href="mailto:kosurij.dm@gmail.com">kosurij.dm@gmail.com</a> with the nature of your request. You also have the
```
to:
```html
          <a href="mailto:support@audio-to-text-transcription.com">support@audio-to-text-transcription.com</a> with the nature of your request. You also have the
```

- [ ] **Step 4: Edit line 343**

Change:
```html
          <a href="mailto:kosurij.dm@gmail.com">kosurij.dm@gmail.com</a>.
```
to:
```html
          <a href="mailto:support@audio-to-text-transcription.com">support@audio-to-text-transcription.com</a>.
```

- [ ] **Step 5: Verify no occurrences remain and new address is present 3 times**

Run: `grep -c "kosurij.dm@gmail.com" src/pages/privacy.astro; grep -c "support@audio-to-text-transcription.com" src/pages/privacy.astro`
Expected: first command prints `0` (or errors with no match, exit code 1), second prints `3`.

- [ ] **Step 6: Build check**

Run: `npm run build`
Expected: build completes with no errors.

- [ ] **Step 7: Commit**

```bash
git add src/pages/privacy.astro
git commit -m "Replace outdated support email on privacy page"
```

---

### Task 3: Add "Still have a question?" CTA block to FAQ section

**Files:**
- Modify: `src/components/FAQSection.vue`

**Interfaces:** None — this task adds static markup and scoped styles only, no new props/emits/composables.

**Context — current end of `<template>` (after Task 1's edits, unchanged by that task in this region):**
```html
      <div class="faq-list">
        <div 
          class="faq-item" 
          v-for="(item, index) in faqs" 
          :key="index"
          :class="{ active: activeIndex === index }"
        >
          <button class="faq-question" @click="toggle(index)">
            <span>{{ item.question }}</span>
            <svg 
              class="faq-icon" 
              :class="{ rotated: activeIndex === index }"
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none"
            >
              <path d="M7 10L12 15L17 10H7Z" fill="currentColor"/>
            </svg>
          </button>
          <div class="faq-answer" v-show="activeIndex === index">
            <p>{{ item.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
```

- [ ] **Step 1: Add the CTA markup after `.faq-list`, inside `.faq-container`**

In `src/components/FAQSection.vue`, replace:
```html
      </div>
    </div>
  </section>
</template>
```
(the closing `</div>` of `.faq-list`, followed by the closing `</div>` of `.faq-container` and `</section>`) with:
```html
      </div>

      <div class="faq-cta">
        <h3 class="faq-cta-title">Still have a question?</h3>
        <p class="faq-cta-subtitle">Can't find the answer you're looking for? We're here to help!</p>
        <a href="/contact" class="faq-cta-button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 6H20C20.5523 6 21 6.44772 21 7V17C21 17.5523 20.5523 18 20 18H4C3.44772 18 3 17.5523 3 17V7C3 6.44772 3.44772 6 4 6Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
            <path d="M3.5 7L12 13L20.5 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Contact support team</span>
        </a>
      </div>
    </div>
  </section>
</template>
```

- [ ] **Step 2: Add scoped styles for the new block**

In `src/components/FAQSection.vue`, inside the `<style scoped>` block, immediately after the closing `}` of `.faq-list` (before `.faq-item {`), add:
```css
.faq-cta {
  margin-top: 64px;
  text-align: center;
}

.faq-cta-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 12px;
}

.faq-cta-subtitle {
  font-size: 16px;
  color: var(--color-text-secondary);
  margin-bottom: 24px;
}

.faq-cta-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  background: var(--color-surface-elevated);
  color: var(--color-text);
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  box-shadow: var(--shadow-sm);
  transition: border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
}

.faq-cta-button:hover {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
  box-shadow: var(--shadow-md);
}
```

Also add a mobile override inside the existing `@media (max-width: 768px)` block in the same file (append after the existing `.faq-answer` rule inside that media query):
```css
  .faq-cta {
    margin-top: 48px;
  }

  .faq-cta-title {
    font-size: 22px;
  }
```

- [ ] **Step 3: Build check**

Run: `npm run build`
Expected: build completes with no errors.

- [ ] **Step 4: Manual visual check**

Run: `npm run dev`, open the site, scroll to the FAQ section, and confirm:
- The "Still have a question?" heading, subtitle, and "Contact support team" button render centered below the FAQ list.
- The button has a visible border in both light and dark themes (toggle via the dev-only 🌓 button rendered by `Layout.astro`) and shows a hover state (border/text turn accent-colored).
- Clicking the button navigates to `/contact`.

Stop the dev server after checking (Ctrl+C).

- [ ] **Step 5: Commit**

```bash
git add src/components/FAQSection.vue
git commit -m "Add contact support CTA block below FAQ section"
```

---

## Final Verification

- [ ] Run `grep -rn "OpenAI Whisper\|kosurij.dm@gmail.com" src/` — expect no output.
- [ ] Run `npm run build` — expect a clean build.
