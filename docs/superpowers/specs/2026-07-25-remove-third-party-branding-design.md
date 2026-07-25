# Remove third-party branding, replace support email, add FAQ contact CTA

## Context

Store policy requires the product's own brand only — no mention of the parent company brand (Captain Works, Captain Lab) and no unrenamed third-party brand names in product naming on the site (store listing name may keep it).

A codebase-wide search (this repo and all sibling projects under `/Users/yuri/projects`) found no mentions of "Captain Works", "Captain Lab", "ChatGPT Image Generator", or "YouTube to Text" — nothing to rename there. The one real violation is "OpenAI Whisper", used as the underlying transcription technology's name in several places on the live site.

Separately, the site currently points users to an old personal email address (`kosurij.dm@gmail.com`) on the privacy page, which needs to be replaced with the product's support address. `ContactSection.vue` and the JSON-LD in `Layout.astro` already use the correct address.

Finally, the FAQ section should get a closing CTA block linking to the existing `/contact` page, matching a reference screenshot provided by the user.

## A. Replace "OpenAI Whisper" mentions with generic "AI" wording

Out of scope: `docs/superpowers/**` and `docs/GEO-AUDIT-REPORT.md` — historical planning/audit documents, not live site content.

1. `src/components/HeroSection.vue:8`
   - Before: `✦ Powered by OpenAI Whisper`
   - After: `✦ Powered by AI`

2. `src/components/FAQSection.vue:53` (answer to "What is Audio To Text Transcription?")
   - Before: `...into searchable text powered by OpenAI Whisper.`
   - After: `...into searchable text powered by advanced AI.`

3. `src/components/FAQSection.vue:59-61` (question + answer)
   - Question before: `Which transcription engine do you use?`
   - Question after: `How does the transcription work?`
   - Answer before: `We use OpenAI Whisper to deliver fast, high-quality transcripts—even for long sessions and diverse accents.`
   - Answer after: `We use advanced AI to deliver fast, high-quality transcripts—even for long sessions and diverse accents.`

4. `src/components/FAQSection.vue:77` (answer to "How accurate are the results?")
   - Before: `Accuracy depends on the recording quality. OpenAI Whisper delivers excellent results for clear speech with minimal background noise.`
   - After: `Accuracy depends on the recording quality. Our AI model delivers excellent results for clear speech with minimal background noise.`

5. `src/components/AppFooter.vue:13`
   - Before: `Chrome extension for instant audio transcription. Powered by OpenAI Whisper.`
   - After: `Chrome extension for instant audio transcription. Powered by AI.`

6. `src/pages/index.astro:15` (meta description)
   - Before: `...Powered by OpenAI Whisper. Edit transcripts and export to multiple formats.`
   - After: `...Powered by advanced AI. Edit transcripts and export to multiple formats.`

## B. Replace outdated support email

`src/pages/privacy.astro` — 3 occurrences of `kosurij.dm@gmail.com` (both link text and `mailto:` href), lines 248, 264, 343.

- Before: `kosurij.dm@gmail.com` (text and `mailto:kosurij.dm@gmail.com`)
- After: `support@audio-to-text-transcription.com` (text and `mailto:support@audio-to-text-transcription.com`)

No other email addresses in the live site need to change — `ContactSection.vue` and `Layout.astro`'s JSON-LD already use `support@audio-to-text-transcription.com`.

## C. Add "Still have a question?" CTA block to FAQ section

`src/components/FAQSection.vue` — new block added inside `.faq-container`, directly after `.faq-list`, matching the reference screenshot:

- Heading: `Still have a question?`
- Subtext: `Can't find the answer you're looking for? We're here to help!`
- A link (not a `<button>`, since it navigates to a page rather than submitting a form) to `/contact`, labeled `Contact support team`, with an inline mail-icon SVG preceding the label.
- Visual style: outline/secondary — white/surface background, thin border, accent-colored border/text on hover — consistent with the existing `.app-button.secondary` style in `AppButton.vue`, reimplemented as scoped styles on the `<a>` in `FAQSection.vue` (that component only renders a `<button>` and has no link-rendering mode, so it isn't reused directly here).
- Centered, spaced below the FAQ list, following the section's existing spacing scale (e.g. `margin-top: 64px` region, consistent with `.section-header`'s `margin-bottom: 64px`).

## Testing

Manual verification only (no test suite in this repo for content/copy):
- Visually confirm the FAQ page renders the new CTA block correctly in both light and dark themes.
- Click "Contact support team" and confirm it navigates to `/contact`.
- Grep the repo afterward for `OpenAI Whisper` and `kosurij.dm@gmail.com` to confirm zero remaining matches in `src/`.
