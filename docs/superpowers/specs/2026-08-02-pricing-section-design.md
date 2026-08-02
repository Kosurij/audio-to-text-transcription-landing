# Pricing Section Design

**Date:** 2026-08-02
**Branch:** `feature/pricing-section`

## Goal

Add a fixed-price subscription section to the English landing page. The section must make the free product useful on its own, explain the benefits of upgrading, avoid Enterprise or contact-sales pricing, and fit the landing page's existing blue-accented light and dark themes.

## Chosen Direction

Use four large, content-rich pricing cards inspired by Claude's pricing layout while retaining this project's visual language: white or elevated surfaces, blue accents, soft borders, rounded corners, and restrained shadows.

Three layouts were considered:

1. Four compact equal cards. Easy to scan, but too small for useful feature descriptions.
2. A separate Free card beside a grouped set of paid plans. Clear upgrade path, but creates an uneven composition and more complex responsive behavior.
3. A vertical plan selector modeled on the extension. Familiar on mobile, but unnecessarily tall on a desktop landing page.

The approved solution combines the straightforward comparison of option 1 with significantly larger Claude-style cards. Repeated paid-plan benefits are acceptable because each card must be understandable independently.

## Page Integration

Create `PricingSection.vue` and render it between `TestimonialsSection` and `FAQSection` on the home page. The section root uses `id="pricing"`.

Add a `Pricing` link to both desktop and mobile navigation. It follows the existing navigation behavior: smooth-scroll on the home page and navigate to `/#pricing` from other pages.

All pricing calls to action reuse the current Chrome Web Store destination used by `InstallButton`. They open the store using the component's existing behavior; the landing page does not attempt to handle failures on the external store page.

## Layout and Visual Treatment

The section heading is:

- Title: `More minutes, every week`
- Subtitle: `Start free, then upgrade when your workflow grows.`

Responsive layout:

- Desktop: four equal-width cards in one row.
- Tablet: a 2×2 grid.
- Mobile: one full-width card per row in a vertical stack, with no horizontal carousel.

All cards use the project's existing color, border, typography, shadow, focus, and theme variables. Pro is emphasized with a blue border, stronger shadow, primary CTA treatment, and a `Most popular` badge. Other cards use the standard elevated surface and secondary/outlined CTA treatment.

## Plan Content

### Free

- Price: `$0`
- Allowance: `200 minutes / week`
- Description: `Everything you need to start transcribing`
- CTA: `Add to Chrome`
- Feature heading: `What you can do:`
- Features:
  - Balanced and High Accuracy modes
  - Record browser tabs or your microphone
  - Upload 14 audio and video formats up to 500 MB
  - Transcribe in 90+ languages
  - Create AI-powered summaries
  - Edit, export and revisit transcripts

The Free card sells the core product rather than calling attention to limitations. It does not publish the exact High Accuracy minute multiplier.

### Basic

- Price: `$6.99 / month`
- Allowance: `600 minutes / week`
- Description: `For regular weekly transcription`
- CTA: `Choose Basic`
- Benefit heading: `Everything in Free, plus:`
- Benefits:
  - `3× the weekly minutes`
  - Reduced minute usage in High Accuracy mode
  - Priority processing
  - Priority support

### Pro

- Price: `$12.99 / month`
- Allowance: `1,800 minutes / week`
- Description: `For frequent and longer recordings`
- CTA: `Choose Pro`
- Badge: `Most popular`
- Benefit heading: `Everything in Free, plus:`
- Benefits:
  - `9× the weekly minutes`
  - Reduced minute usage in High Accuracy mode
  - Priority processing
  - Priority support

### Business

- Price: `$19.99 / month`
- Allowance: `3,500 minutes / week`
- Description: `For high-volume transcription workflows`
- CTA: `Choose Business`
- Benefit heading: `Everything in Free, plus:`
- Benefits:
  - `17.5× the weekly minutes`
  - Reduced minute usage in High Accuracy mode
  - Priority processing
  - Priority support

The published copy deliberately avoids exact High Accuracy consumption multipliers. Internally, High Accuracy consumes more minutes on Free and less on paid plans, but the landing page communicates only the paid-plan benefit.

Each paid card ends with `Cancel anytime · 30-day money-back guarantee`.

There is no monthly/annual billing switch, plan selector, Enterprise plan, custom pricing, contact-sales CTA, or checkout flow on the landing page.

## Weekly Allowance Rules

Each plan's minute allowance resets weekly. Unused minutes do not roll over into the next week. This rule must be stated in the FAQ rather than repeated across every card.

## FAQ Changes

Extend the visible FAQ with pricing-specific questions:

1. `Is Audio To Text Transcription free to use?`
   - Explain that Free includes 200 minutes per week and that optional subscriptions add larger limits, priority processing, and priority support.
2. `How do weekly minute limits work?`
   - Explain that the allowance resets each week and unused minutes do not roll over.
3. `What happens when I upgrade?`
   - Explain the higher weekly allowance, reduced High Accuracy minute usage, priority processing, and priority support.
4. `Can I cancel my subscription?`
   - Explain that paid subscriptions can be canceled at any time and include a 30-day money-back guarantee.

Keep the current product FAQs unless a direct contradiction is found during implementation.

## Structured Data

Update the `SoftwareApplication` pricing data in `Layout.astro`. Replace the single `$0` offer with four explicit `Offer` entries for Free, Basic, Pro, and Business. Each entry includes its name, USD price, availability, and monthly billing context where applicable.

Update the JSON-LD `FAQPage` so its answers match the visible FAQ, especially the corrected statement that a useful free tier exists alongside optional paid subscriptions. The visible page and structured data must not make conflicting claims.

## Component Boundaries

- `PricingSection.vue`: owns display data, card markup, responsive styles, and plan CTAs.
- `NavigationBar.vue`: adds desktop and mobile anchors for `pricing` using existing navigation helpers.
- `FAQSection.vue`: owns the visible subscription FAQ content and existing accordion behavior.
- `index.astro`: inserts the new section in the approved position.
- `Layout.astro`: owns updated SoftwareApplication offers and FAQ structured data.

No backend, checkout, account state, billing API, or pricing selector is added.

## Accessibility and Interaction

- Preserve semantic section and heading order.
- CTA controls must have descriptive accessible names and visible keyboard focus.
- The Pro badge is supplementary; the plan remains understandable without color.
- Text and borders must meet the existing theme's contrast conventions in light and dark modes.
- The layout must not introduce horizontal page overflow.
- Motion is limited to existing hover/focus transitions and smooth anchor scrolling.

## Verification

- Run `npm run build` and require a successful production build.
- Inspect the section in light and dark themes.
- Inspect desktop, tablet 2×2, and single-column mobile layouts.
- Verify desktop and mobile `Pricing` navigation from the home page and another page.
- Verify all four CTAs resolve to the current Chrome Web Store URL.
- Parse the generated JSON-LD and confirm all four plans, USD prices, and FAQ answers.
- Check keyboard focus, heading semantics, contrast, and horizontal overflow.

## Files Expected to Change

- Create `src/components/PricingSection.vue`
- Modify `src/pages/index.astro`
- Modify `src/components/NavigationBar.vue`
- Modify `src/components/FAQSection.vue`
- Modify `src/layouts/Layout.astro`
