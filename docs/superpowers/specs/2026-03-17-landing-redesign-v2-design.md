# Landing Page Redesign v2 — Design Spec

**Date:** 2026-03-17
**Branch:** feature/landing-redesign

---

## Overview

A set of targeted improvements to the landing page: correcting stats, removing UX anti-patterns, adding a YouTube demo section, redesigning the features/how-it-works sections for visual differentiation, upgrading testimonials layout, and replacing the redundant SocialProofBar with actionable Upload/Record cards.

---

## 1. HeroSection — Stats Update

Update all stats to real numbers:

| Stat | Old | New |
|------|-----|-----|
| Users | 10k+ | 1.2k+ WAU |
| Rating | ★ 4.8 | ★ 5.0 |
| Accuracy | 95%+ | 99% |
| (new) | — | 90+ Languages |

The fourth stat replaces the missing slot. Label: **"Languages Supported"**. Stats are hardcoded (not v-for). Add a fourth `.stat` block and a third `.stat-divider` to the template.

---

## 2. InstallButton — Remove Hover Bounce

Remove `transform: translateY(-2px)` from `.primary:hover`. Also remove `transform: translateY(0)` from `.primary:active` and remove `transform 0.2s ease` from the `transition` property on `.primary`. Keep only box-shadow/background-position transitions.

---

## 3. UploadRecordSection — New Component (replaces SocialProofBar)

New component `UploadRecordSection.vue` placed between DemoSection and CompatibilitySection (SocialProofBar removed from index.astro).

**Layout:** Two equal cards side by side, light gray background section.

**Card 1 — Upload File:**
- Icon: cloud-upload SVG (Heroicons outline, blue circle background)
- Title: "Upload a file"
- Subtitle: "MP3, WAV, M4A, OGG, MP4 and more"
- Body: dashed-border drop zone visual (static, decorative)
- Click: opens Chrome Web Store URL

**Card 2 — Record Audio:**
- Icon: microphone SVG (Heroicons outline, blue circle background)
- Title: "Record from mic or tab"
- Subtitle: "Capture browser tab or microphone live"
- Body: animated waveform bars (CSS animation, decorative)
- Click: opens Chrome Web Store URL

Cards are decorative previews — clicking opens Chrome Web Store, not the actual extension.

**Placeholder labels** (for the card body areas):
- Card 1: `[Screenshot: extension upload UI with drag-and-drop area]`
- Card 2: `[Screenshot: extension record UI with waveform animation]`

---

## 4. DemoSection — YouTube Video

New component `DemoSection.vue` placed between HeroSection and UploadRecordSection in index.astro order:
`Hero → Demo → UploadRecord → Compatibility → Benefits → HowItWorks → Testimonials → FAQ → CTA → Footer`

**Content:**
- Section heading: "See it in action"
- Subtitle: "From upload to transcript in under 30 seconds"
- YouTube embed: `Jp9s63e7xqU`
- Params: `autoplay=0&mute=0&controls=1&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&fs=1&cc_load_policy=0&loop=0`
- Lazy loading via IntersectionObserver (same pattern as old HowItWorksSection had)
- `id="demo"` on the section element

**Hero "Watch Demo" button:** Add a plain `<a href="#demo">` styled as a secondary outline button (not an `InstallButton` — that component always navigates to Chrome Web Store). Label text: "▶ Watch Demo". Click scrolls to `#demo` via `@click.prevent` + `document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })`.

---

## 5. BenefitsSection — Bigger Typography + Updated Features

Keep alternating text-left/media-right layout. Changes:

**Typography:**
- `feature-title`: increase to `clamp(2rem, 3.5vw, 2.75rem)`, weight 800
- `feature-description`: increase to `1.125rem`

**Updated features (4 items):**

| # | Emoji | Title | Description | Placeholder |
|---|-------|-------|-------------|-------------|
| 1 | ⚡ | Upload Files or Record Live | Drag and drop any audio or video file — MP3, WAV, M4A, OGG, MP4. Or click Record to capture your microphone or any browser tab in real time. Transcription starts instantly. | `[GIF: user drags audio file into extension → transcript appears in seconds]` |
| 2 | 🌐 | 90+ Languages with Timestamps | Transcribe in any language — auto-detected. Each segment includes a timestamp so you can jump to any moment. Perfect for multilingual meetings and interviews. | `[Screenshot: transcript with timestamps, language dropdown visible]` |
| 3 | ✨ | AI-Powered Summary | After transcription, get an automatic summary of key points. No more reading through long transcripts — the important parts are extracted for you. | `[Screenshot: summary panel below transcript text]` |
| 4 | 📋 | History, Edit & Export | All your transcriptions are saved. Edit the text directly, then download as TXT or copy to clipboard. Your transcript history is always one click away. | `[Screenshot: transcription history list with edit and download buttons]` |

---

## 6. HowItWorksSection — Horizontal Slider

Redesign as a horizontal slider (carousel) showing 2 steps visible at a time.

**Layout:**
- Section header (centered): "How it works" / "Get your first transcription in under 2 minutes"
- Slides area: 2-column grid showing current and next step
- Each step card: screenshot/GIF placeholder (left ~45%) + large step number (right, decorative blue) + bold title + description
- Navigation: `<` `>` arrow buttons + progress bar (active segment fills blue)
- Vue `ref` tracks `currentStep` (0-indexed, 0..2). With 3 steps shown 2-at-a-time: show steps[currentStep] and steps[(currentStep+1) % 3]. The `>` arrow is disabled (greyed out) when `currentStep === 2` — do not wrap forward. The `<` arrow is disabled when `currentStep === 0`.

**3 steps:**

| # | Title | Description | Placeholder |
|---|-------|-------------|-------------|
| 1 | Install the Extension | Add Audio to Text to Chrome with one click — no account or sign-up required. | `[Screenshot: Chrome Web Store install page for the extension]` |
| 2 | Upload or Record Audio | Drop an audio file or click Record to capture mic or browser tab in real time. MP3, WAV, M4A, OGG and more. | `[GIF: extension popup — user clicks Upload, selects file, progress starts]` |
| 3 | Get Your Transcript | Accurate text appears in seconds. Edit inline, copy to clipboard, or download as TXT. | `[GIF: transcript text appearing word by word, then user clicks Download TXT]` |

---

## 7. TestimonialsSection — Masonry Grid (Tactiq Style)

Replace 3-column CSS grid with CSS `columns: 4` masonry layout.

**Changes:**
- `columns: 4; column-gap: 20px` on container (plain CSS `@media` overrides, no Tailwind)
- Each card: `break-inside: avoid; margin-bottom: 20px`
- Cards have varying text length = natural varying heights = masonry feel
- Header subtitle: "Based on 19 reviews on Chrome Web Store"
- Keep existing testimonial content (it's fine)
- Responsive: 3 columns at ≤900px, 2 at ≤600px, 1 at ≤400px

---

## 8. Placeholder Descriptions

All `media-placeholder` elements must display a clear description of what to place there. Format: `[Type: specific description of content]`. Examples already specified per section above.

---

## Component Order in index.astro

```
NavigationBar
HeroSection          ← stats updated, Watch Demo button added
DemoSection          ← NEW (YouTube embed, id="demo")
UploadRecordSection  ← NEW (replaces SocialProofBar)
CompatibilitySection ← unchanged
BenefitsSection      ← bigger type, updated content
HowItWorksSection    ← horizontal slider
TestimonialsSection  ← masonry grid
FAQSection           ← unchanged
CTASection           ← unchanged
AppFooter            ← unchanged
```

---

## Files to Create/Modify

| Action | File |
|--------|------|
| Modify | `src/components/HeroSection.vue` |
| Modify | `src/components/InstallButton.vue` |
| Modify | `src/components/BenefitsSection.vue` |
| Modify | `src/components/HowItWorksSection.vue` |
| Modify | `src/components/TestimonialsSection.vue` |
| Create | `src/components/DemoSection.vue` |
| Create | `src/components/UploadRecordSection.vue` |
| Delete | `src/components/SocialProofBar.vue` |
| Modify | `src/pages/index.astro` |
