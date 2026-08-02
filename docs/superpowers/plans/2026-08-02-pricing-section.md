# Pricing Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a responsive four-plan pricing section, pricing navigation, subscription FAQs, and matching JSON-LD to the landing page.

**Architecture:** A new self-contained Vue component owns the four static pricing cards and reuses `InstallButton` for every Chrome Web Store CTA. Existing navigation and home-page composition integrate the section, while the visible FAQ and Astro layout receive matching subscription copy and structured offers. Dependency-free Node integration tests build the real Astro site and assert on the rendered HTML and parsed JSON-LD.

**Tech Stack:** Astro 4, Vue 3, TypeScript, scoped CSS, Node 22 built-in test runner, Schema.org JSON-LD

## Global Constraints

- Work only on branch `feature/pricing-section`.
- Render Pricing between Testimonials and FAQ with `id="pricing"`.
- Use four large cards: Free, Basic, Pro, and Business; never add Enterprise, custom pricing, contact-sales copy, checkout, or annual billing.
- Prices and weekly limits are fixed at Free `$0`/200, Basic `$6.99`/600, Pro `$12.99`/1,800, and Business `$19.99`/3,500.
- Paid comparison copy is exactly `3× the weekly minutes`, `9× the weekly minutes`, and `17.5× the weekly minutes`.
- Do not disclose exact High Accuracy consumption multipliers; paid cards say `Reduced minute usage in High Accuracy mode`.
- Free explains core product features; paid cards explain upgrade benefits.
- All four CTA destinations reuse `InstallButton`; no billing flow is added.
- Desktop is four columns, tablet is 2×2, and mobile is a vertical single column.
- Support light and dark themes using existing CSS variables.
- Update both visible FAQ copy and JSON-LD so the product is described as free with optional paid subscriptions.
- Preserve the user's unrelated deletion of `public/logo.png`; never stage it.

---

## File Structure

- Create `src/components/PricingSection.vue`: plan data, card markup, Chrome Web Store CTAs, responsive styling.
- Modify `src/pages/index.astro`: import and render the pricing section in the approved order.
- Modify `src/components/NavigationBar.vue`: add desktop and mobile Pricing anchors using existing scroll helpers.
- Modify `src/components/FAQSection.vue`: append the four approved subscription questions and answers.
- Modify `src/layouts/Layout.astro`: replace the single free Offer with four Offers and synchronize the FAQ JSON-LD.
- Create `tests/pricing-section.test.mjs`: rendered-page integration tests for pricing cards and navigation.
- Create `tests/pricing-metadata.test.mjs`: rendered FAQ and parsed JSON-LD integration tests.
- Modify `package.json`: add the dependency-free Node test command.

### Task 1: Pricing component and plan contract

**Files:**
- Create: `src/components/PricingSection.vue`
- Create: `tests/pricing-section.test.mjs`
- Modify: `package.json:5-10`

**Interfaces:**
- Consumes: `InstallButton` from `src/components/InstallButton.vue`, including its `variant?: 'primary' | 'outline'` prop and Chrome Web Store URL behavior.
- Produces: default Vue component `PricingSection` with section anchor `pricing` and four static plan cards.

- [ ] **Step 1: Add the Node test command**

Add this script to `package.json`:

```json
"test": "npm run build && node --test tests/*.test.mjs"
```

- [ ] **Step 2: Write the failing pricing component contract test**

Create `tests/pricing-section.test.mjs`:

```js
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
const pricingStart = html.indexOf('<section id="pricing"');
const pricingEnd = html.indexOf('<section class="faq"', pricingStart);
const pricing = pricingStart >= 0 && pricingEnd > pricingStart
  ? html.slice(pricingStart, pricingEnd)
  : '';

test('pricing section exposes every approved plan and benefit', async () => {
  assert.notEqual(pricing, '', 'rendered pricing section is missing');
  assert.match(pricing, /More minutes, every week/);
  assert.match(pricing, /Free[\s\S]*\$0[\s\S]*200 minutes \/ week/);
  assert.match(pricing, /Basic[\s\S]*\$6\.99[\s\S]*600 minutes \/ week/);
  assert.match(pricing, /Pro[\s\S]*\$12\.99[\s\S]*1,800 minutes \/ week/);
  assert.match(pricing, /Business[\s\S]*\$19\.99[\s\S]*3,500 minutes \/ week/);
  assert.match(pricing, /3× the weekly minutes/);
  assert.match(pricing, /9× the weekly minutes/);
  assert.match(pricing, /17\.5× the weekly minutes/);
  assert.match(pricing, /Reduced minute usage in High Accuracy mode/);
  assert.doesNotMatch(pricing, /High Accuracy uses (?:2|3)×/);
  assert.ok((pricing.match(/chromewebstore\.google\.com/g) ?? []).length >= 4);
});
```

- [ ] **Step 3: Run the component test and confirm the red state**

Run: `npm test -- --test-name-pattern="pricing section exposes"`

Expected: FAIL with `rendered pricing section is missing`.

- [ ] **Step 4: Implement the pricing component**

Create `src/components/PricingSection.vue` with:

```vue
<template>
  <section id="pricing" class="pricing" aria-labelledby="pricing-title">
    <div class="pricing-container">
      <header class="section-header">
        <h2 id="pricing-title" class="section-title">More minutes, every week</h2>
        <p class="section-subtitle">Start free, then upgrade when your workflow grows.</p>
      </header>

      <div class="pricing-grid">
        <article
          v-for="plan in plans"
          :key="plan.name"
          class="pricing-card"
          :class="{ popular: plan.popular }"
        >
          <span v-if="plan.popular" class="popular-badge">Most popular</span>
          <h3 class="plan-name">{{ plan.name }}</h3>
          <p class="plan-description">{{ plan.description }}</p>
          <p class="plan-price">
            {{ plan.price }}<span v-if="plan.period"> / {{ plan.period }}</span>
          </p>
          <p class="plan-limit">{{ plan.minutes }} minutes / week</p>
          <InstallButton :variant="plan.popular ? 'primary' : 'outline'" class="plan-button">
            {{ plan.cta }}
          </InstallButton>
          <div class="plan-divider" />
          <p class="benefit-heading">{{ plan.benefitHeading }}</p>
          <ul class="benefit-list">
            <li v-for="benefit in plan.benefits" :key="benefit">
              <span aria-hidden="true">✓</span><span>{{ benefit }}</span>
            </li>
          </ul>
          <p v-if="plan.guarantee" class="guarantee">Cancel anytime · 30-day money-back guarantee</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import InstallButton from './InstallButton.vue';

interface Plan {
  name: string;
  description: string;
  price: string;
  period?: string;
  minutes: string;
  cta: string;
  benefitHeading: string;
  benefits: string[];
  popular?: boolean;
  guarantee?: boolean;
}

const paidBenefits = [
  'Reduced minute usage in High Accuracy mode',
  'Priority processing',
  'Priority support',
];

const plans: Plan[] = [
  {
    name: 'Free',
    description: 'Everything you need to start transcribing',
    price: '$0',
    minutes: '200',
    cta: 'Add to Chrome',
    benefitHeading: 'What you can do:',
    benefits: [
      'Balanced and High Accuracy modes',
      'Record browser tabs or your microphone',
      'Upload 14 audio and video formats up to 500 MB',
      'Transcribe in 90+ languages',
      'Create AI-powered summaries',
      'Edit, export and revisit transcripts',
    ],
  },
  {
    name: 'Basic',
    description: 'For regular weekly transcription',
    price: '$6.99',
    period: 'month',
    minutes: '600',
    cta: 'Choose Basic',
    benefitHeading: 'Everything in Free, plus:',
    benefits: ['3× the weekly minutes', ...paidBenefits],
    guarantee: true,
  },
  {
    name: 'Pro',
    description: 'For frequent and longer recordings',
    price: '$12.99',
    period: 'month',
    minutes: '1,800',
    cta: 'Choose Pro',
    benefitHeading: 'Everything in Free, plus:',
    benefits: ['9× the weekly minutes', ...paidBenefits],
    popular: true,
    guarantee: true,
  },
  {
    name: 'Business',
    description: 'For high-volume transcription workflows',
    price: '$19.99',
    period: 'month',
    minutes: '3,500',
    cta: 'Choose Business',
    benefitHeading: 'Everything in Free, plus:',
    benefits: ['17.5× the weekly minutes', ...paidBenefits],
    guarantee: true,
  },
];
</script>
```

Add scoped CSS that implements these exact structural rules:

```css
.pricing { padding: 96px 0; background: var(--color-background); }
.pricing-container { width: min(1440px, calc(100% - 48px)); margin: 0 auto; }
.pricing-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 20px; align-items: stretch; }
.pricing-card { position: relative; display: flex; flex-direction: column; min-width: 0; min-height: 620px; padding: 32px 28px; border: 1px solid var(--color-border); border-radius: 20px; background: var(--color-surface-elevated); box-shadow: var(--shadow-sm); }
.pricing-card.popular { border: 2px solid var(--accent-primary); box-shadow: var(--shadow-lg); }
.plan-button { width: 100%; height: auto; min-height: 48px; border-radius: 10px; }
.guarantee { margin-top: auto; padding-top: 24px; }
@media (max-width: 1100px) { .pricing-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 640px) { .pricing { padding: 64px 0; } .pricing-container { width: min(100% - 32px, 520px); } .pricing-grid { grid-template-columns: 1fr; } .pricing-card { min-height: auto; padding: 28px 22px; } }
```

Add these declarations after the structural rules:

```css
.section-header { max-width: 720px; margin: 0 auto 56px; text-align: center; }
.section-title { margin: 0 0 16px; color: var(--color-text); font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 800; letter-spacing: -0.04em; }
.section-subtitle { margin: 0; color: var(--color-text-secondary); font-size: 1.25rem; line-height: 1.6; }
.pricing-card:hover { border-color: var(--accent-primary); box-shadow: var(--shadow-md); }
.popular-badge { position: absolute; top: -15px; left: 50%; transform: translateX(-50%); padding: 7px 16px; border-radius: 999px; background: var(--accent-primary); color: #fff; font-size: 0.75rem; font-weight: 800; white-space: nowrap; }
.plan-name { margin: 0; color: var(--color-text); font-size: 1.5rem; font-weight: 800; }
.plan-description { min-height: 48px; margin: 8px 0 20px; color: var(--color-text-secondary); line-height: 1.5; }
.plan-price { margin: 0; color: var(--color-text); font-size: 2.5rem; font-weight: 800; letter-spacing: -0.04em; }
.plan-price span { color: var(--color-text-secondary); font-size: 0.875rem; font-weight: 500; letter-spacing: 0; }
.plan-limit { margin: 6px 0 22px; color: var(--accent-primary); font-size: 0.875rem; font-weight: 800; text-transform: uppercase; }
.plan-divider { height: 1px; margin: 24px 0 20px; background: var(--color-border); }
.benefit-heading { margin: 0 0 16px; color: var(--color-text); font-weight: 700; }
.benefit-list { display: grid; gap: 14px; margin: 0; padding: 0; list-style: none; }
.benefit-list li { display: grid; grid-template-columns: 18px 1fr; gap: 8px; color: var(--color-text-secondary); line-height: 1.5; }
.benefit-list li > span:first-child { color: var(--accent-primary); font-weight: 800; }
.guarantee { color: var(--color-text-muted); font-size: 0.8125rem; line-height: 1.5; text-align: center; }
.plan-button:focus-visible { outline: 3px solid var(--accent-primary); outline-offset: 3px; }
html[data-theme='dark'] .pricing-card { background: var(--color-surface-elevated); }
@media (prefers-reduced-motion: reduce) { .pricing-card { transition: none; } }
```

Do not introduce other literal colors except white text on the primary badge/CTA.

- [ ] **Step 5: Run the pricing component contract test**

Run: `npm test -- --test-name-pattern="pricing section exposes"`

Expected: PASS.

- [ ] **Step 6: Run the production build**

Run: `npm run build`

Expected: PASS with generated pages in `dist/`.

- [ ] **Step 7: Commit the component task**

```bash
git add package.json src/components/PricingSection.vue tests/pricing-section.test.mjs
git commit -m "feat: add subscription pricing cards"
```

### Task 2: Home-page and navigation integration

**Files:**
- Modify: `src/pages/index.astro:2-29`
- Modify: `src/components/NavigationBar.vue:9-42`
- Modify: `tests/pricing-section.test.mjs`

**Interfaces:**
- Consumes: `PricingSection.vue` default export and section id `pricing` from Task 1.
- Produces: home-page placement before FAQ and `Pricing` anchors in desktop/mobile navigation.

- [ ] **Step 1: Add failing integration assertions**

Append to `tests/pricing-section.test.mjs`:

```js
test('home page and navigation expose pricing in the approved order', async () => {
  const testimonialsIndex = html.indexOf('class="testimonials"');
  const pricingIndex = html.indexOf('id="pricing"');
  const faqIndex = html.indexOf('id="faq"');

  assert.ok(testimonialsIndex >= 0 && testimonialsIndex < pricingIndex);
  assert.ok(pricingIndex < faqIndex);
  assert.equal((html.match(/href="\/#pricing"/g) ?? []).length, 2);
});
```

- [ ] **Step 2: Run the integration test and confirm the red state**

Run: `npm test -- --test-name-pattern="home page and navigation"`

Expected: FAIL because the page import and Pricing links are absent.

- [ ] **Step 3: Integrate the section into the home page**

In `src/pages/index.astro`, import `PricingSection` immediately after `TestimonialsSection`, then render:

```astro
<TestimonialsSection client:visible />
<PricingSection client:visible />
<FAQSection client:visible />
```

- [ ] **Step 4: Add desktop and mobile Pricing links**

In `NavigationBar.vue`, add after `How it works` in both menus:

```vue
<a href="/#pricing" class="nav-link" @click.prevent="navigateToSection('pricing')">Pricing</a>
```

```vue
<a href="/#pricing" class="mobile-link" @click.prevent="handleMobileNavigate('pricing')">
  Pricing
</a>
```

Do not modify the existing helper functions; they already support arbitrary section ids and cross-page navigation.

- [ ] **Step 5: Run integration tests and build**

Run: `npm test`

Expected: all tests PASS.

Run: `npm run build`

Expected: PASS.

- [ ] **Step 6: Commit integration**

```bash
git add src/pages/index.astro src/components/NavigationBar.vue tests/pricing-section.test.mjs
git commit -m "feat: link pricing section from navigation"
```

### Task 3: Subscription FAQ and JSON-LD offers

**Files:**
- Create: `tests/pricing-metadata.test.mjs`
- Modify: `src/components/FAQSection.vue:62-91`
- Modify: `src/layouts/Layout.astro:53-72,110-121`

**Interfaces:**
- Consumes: approved prices, weekly allowances, upgrade benefits, reset policy, cancellation policy.
- Produces: visible accordion answers and equivalent machine-readable Offer/FAQ data.

- [ ] **Step 1: Write failing metadata contract tests**

Create `tests/pricing-metadata.test.mjs`:

```js
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');

test('visible FAQ explains free use, weekly resets, upgrades and cancellation', async () => {
  assert.match(html, /Is Audio To Text Transcription free to use\?/);
  assert.match(html, /200 minutes per week/);
  assert.match(html, /How do weekly minute limits work\?/);
  assert.match(html, /Unused minutes do not roll over/);
  assert.match(html, /What happens when I upgrade\?/);
  assert.match(html, /reduced minute usage in High Accuracy mode/i);
  assert.match(html, /Can I cancel my subscription\?/);
  assert.match(html, /30-day money-back guarantee/);
});

test('JSON-LD publishes four USD offers and matching subscription FAQ', async () => {
  const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(match, 'JSON-LD script is missing');
  const jsonLd = JSON.parse(match[1]);
  const software = jsonLd['@graph'].find((item) => item['@type'] === 'SoftwareApplication');
  const faq = jsonLd['@graph'].find((item) => item['@type'] === 'FAQPage');

  assert.deepEqual(
    software.offers.map(({ name, price, priceCurrency }) => ({ name, price, priceCurrency })),
    [
      { name: 'Free', price: '0', priceCurrency: 'USD' },
      { name: 'Basic', price: '6.99', priceCurrency: 'USD' },
      { name: 'Pro', price: '12.99', priceCurrency: 'USD' },
      { name: 'Business', price: '19.99', priceCurrency: 'USD' },
    ],
  );
  const faqText = JSON.stringify(faq);
  assert.match(faqText, /Is Audio To Text Transcription free to use\?/);
  assert.match(faqText, /200 minutes per week/);
  assert.match(faqText, /Unused minutes do not roll over/);
  assert.doesNotMatch(faqText, /The extension is free to install and use\./);
});
```

- [ ] **Step 2: Run metadata tests and confirm the red state**

Run: `npm test -- --test-name-pattern="visible FAQ|JSON-LD"`

Expected: both tests FAIL because the subscription copy and four Offers are absent.

- [ ] **Step 3: Append the four visible FAQ entries**

Append these objects to `faqs` in `FAQSection.vue`:

```ts
{
  question: 'Is Audio To Text Transcription free to use?',
  answer: 'Yes. The Free plan includes 200 transcription minutes per week. Optional paid subscriptions add larger weekly limits, priority processing and priority support.'
},
{
  question: 'How do weekly minute limits work?',
  answer: 'Your minute allowance resets every week. Unused minutes do not roll over into the next week.'
},
{
  question: 'What happens when I upgrade?',
  answer: 'A paid plan gives you a larger weekly allowance, reduced minute usage in High Accuracy mode, priority processing and priority support.'
},
{
  question: 'Can I cancel my subscription?',
  answer: 'Yes. You can cancel a paid subscription at any time, and every paid plan includes a 30-day money-back guarantee.'
}
```

- [ ] **Step 4: Replace the single JSON-LD Offer with four Offers**

Replace `SoftwareApplication.offers` in `Layout.astro` with:

```ts
"offers": [
  {
    "@type": "Offer",
    "name": "Free",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  {
    "@type": "Offer",
    "name": "Basic",
    "price": "6.99",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "priceSpecification": { "@type": "UnitPriceSpecification", "price": "6.99", "priceCurrency": "USD", "billingDuration": "P1M" }
  },
  {
    "@type": "Offer",
    "name": "Pro",
    "price": "12.99",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "priceSpecification": { "@type": "UnitPriceSpecification", "price": "12.99", "priceCurrency": "USD", "billingDuration": "P1M" }
  },
  {
    "@type": "Offer",
    "name": "Business",
    "price": "19.99",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "priceSpecification": { "@type": "UnitPriceSpecification", "price": "19.99", "priceCurrency": "USD", "billingDuration": "P1M" }
  }
]
```

- [ ] **Step 5: Synchronize JSON-LD FAQ entries**

Replace the stale `Is it free to use?` entry and add the other three approved questions using the exact visible answers from Step 3. Keep the existing non-pricing JSON-LD questions.

- [ ] **Step 6: Run metadata tests and build**

Run: `npm test`

Expected: all tests PASS.

Run: `npm run build`

Expected: PASS and the generated home page contains parseable `application/ld+json`.

- [ ] **Step 7: Commit metadata changes**

```bash
git add src/components/FAQSection.vue src/layouts/Layout.astro tests/pricing-metadata.test.mjs
git commit -m "feat: document subscription pricing in faq metadata"
```

### Task 4: Responsive, theme, and final verification

**Files:**
- Modify if verification reveals scoped issues: `src/components/PricingSection.vue`
- Modify if verification reveals scoped issues: `src/components/NavigationBar.vue`
- Test: `tests/pricing-section.test.mjs`
- Test: `tests/pricing-metadata.test.mjs`

**Interfaces:**
- Consumes: completed pricing, navigation, FAQ, and JSON-LD implementation.
- Produces: verified production-ready landing page with no new API surface.

- [ ] **Step 1: Run all automated checks from a clean command invocation**

Run: `npm test`

Expected: all pricing and metadata tests PASS.

Run: `npm run build`

Expected: Astro reports a successful build with no errors.

- [ ] **Step 2: Validate generated JSON-LD programmatically**

Run:

```bash
node -e "const fs=require('node:fs');const html=fs.readFileSync('dist/index.html','utf8');const match=html.match(/<script type=\"application\/ld\+json\">([\\s\\S]*?)<\\/script>/);if(!match)throw new Error('JSON-LD missing');const data=JSON.parse(match[1]);const app=data['@graph'].find(x=>x['@type']==='SoftwareApplication');if(app.offers.length!==4)throw new Error('Expected four offers');console.log(app.offers.map(x=>x.name+':$'+x.price).join(', '));"
```

Expected: `Free:$0, Basic:$6.99, Pro:$12.99, Business:$19.99`.

- [ ] **Step 3: Run the development server for visual checks**

Run: `npm run dev`

Inspect these viewport widths in both light and dark themes:

- 1440 px: four cards in one row, equal top alignment, no clipped content.
- 900 px: 2×2 grid with balanced gaps.
- 390 px: one card per row, no horizontal overflow.

Also confirm Pro remains understandable without relying on color, CTA focus rings are visible with keyboard navigation, and long benefit copy does not collide with the guarantee.

- [ ] **Step 4: Verify navigation and external CTA behavior manually**

On `/`, activate desktop and mobile Pricing links and confirm smooth scrolling to `#pricing`. On `/contact`, follow `/#pricing` and confirm the browser lands on the pricing section. Inspect each CTA and confirm it resolves to the existing Chrome Web Store URL with `utm_source=site` and `utm_medium=cpc` in a new tab.

- [ ] **Step 5: Check the final diff for accidental scope changes**

Run: `git diff --check`

Expected: no whitespace errors.

Run: `git status --short`

Expected: only pricing implementation files are changed; `D public/logo.png` remains an unrelated unstaged user change and must not be included.

- [ ] **Step 6: Commit any verification-only fixes**

If Step 3 or Step 4 required scoped fixes, stage only the files actually changed and commit:

```bash
git add src/components/PricingSection.vue src/components/NavigationBar.vue tests/pricing-section.test.mjs tests/pricing-metadata.test.mjs
git commit -m "fix: polish responsive pricing experience"
```

If no fixes were required, do not create an empty commit.
