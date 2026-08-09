# Monetize.software Legal Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the stale `PE Yuri Kosenko` / Kazakhstan entity with `SHIFT LLC` (Armenia) across the footer and global structured data, add an operating-entity sentence to `/privacy`, and publish new `/terms` and `/refund` pages — satisfying monetize.software's moderation requirements.

**Architecture:** Static Astro site (`output: 'static'`). Each legal page is a standalone `.astro` file using the shared `Layout` + `NavigationBar` + `AppFooter` components, with its own scoped `<style>` block copied from `privacy.astro`'s pattern (this codebase doesn't extract shared page-shell CSS — `contact.astro` and `privacy.astro` each keep their own). Tests run against the built `dist/` output (`npm run build && node --test tests/*.test.mjs`), matching this repo's existing convention (see `tests/pricing-metadata.test.mjs`).

**Tech Stack:** Astro (static output), Vue 3 (`AppFooter.vue`), Node's built-in `node:test` + `node:assert/strict` against built HTML.

## Global Constraints

- Legal entity: `SHIFT LLC`
- Address (verbatim, as supplied): `5, Street 17, Argel, Nor Hachn, Kotayk region, 2404, RA`
- Support email: `support@audio-to-text-transcription.com`
- Site origin: `https://audio-to-text-transcription.com`
- Refund window: **30 days** (not monetize's template default of 20 — matches what's already promised on this site and in the extension)
- Refund processing target: **7 business days**
- "Last Updated" date for all three legal pages: `August 9, 2026`
- New pages live at `/terms` and `/refund` (Astro directory routing → `dist/terms/index.html`, `dist/refund/index.html`)
- Full adapted legal copy for `/terms` and `/refund` is specified below verbatim — do not paraphrase it further.

---

## Task 1: Footer entity + legal links

**Files:**
- Modify: `src/components/AppFooter.vue:71-95`
- Create: `tests/legal-pages.test.mjs`

**Interfaces:**
- Produces: footer entity text (`SHIFT LLC`, address) and footer links (`/terms`, `/refund`) that every subsequent task's tests can also check on `dist/index.html` (footer renders site-wide).

- [ ] **Step 1: Write the failing test**

Create `tests/legal-pages.test.mjs`:

```js
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const home = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
const footerStart = home.indexOf('<footer');
const footerEnd = home.indexOf('</footer>') + '</footer>'.length;
const footer = home.slice(footerStart, footerEnd);

test('footer shows the SHIFT LLC entity, not the old Kazakhstan entity', () => {
  assert.match(footer, /SHIFT LLC/);
  assert.match(footer, /5, Street 17, Argel, Nor Hachn, Kotayk region, 2404, RA/);
  assert.doesNotMatch(footer, /PE Yuri Kosenko/);
  assert.doesNotMatch(footer, /Pavlodar/);
});

test('footer support column links to Terms of Service and Refund Policy', () => {
  assert.match(footer, /<a href="\/terms"[^>]*>Terms of Service<\/a>/);
  assert.match(footer, /<a href="\/refund"[^>]*>Refund Policy<\/a>/);
});
```

(Assertions are scoped to the `<footer>` slice, not the whole page — `PE Yuri Kosenko`/`Pavlodar` also appear in `Layout.astro`'s JSON-LD until Task 2 runs, and the `[^>]*` tolerance accounts for Vue's scoped-style `data-v-*` attribute injection on rendered elements.)

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run build && node --test tests/legal-pages.test.mjs`
Expected: FAIL — `dist/index.html` still contains `PE Yuri Kosenko`/`Pavlodar`, doesn't contain `SHIFT LLC` or the `/terms`/`/refund` links.

- [ ] **Step 3: Update the footer entity block**

In `src/components/AppFooter.vue`, find:

```html
        <div class="footer-entity">
          <p class="footer-entity-line">PE Yuri Kosenko</p>
          <p class="footer-entity-line">181/2 Lomov Street, Pavlodar, Kazakhstan</p>
          <p class="footer-entity-line">
            <a href="mailto:support@audio-to-text-transcription.com">support@audio-to-text-transcription.com</a>
          </p>
        </div>
```

Replace with:

```html
        <div class="footer-entity">
          <p class="footer-entity-line">SHIFT LLC</p>
          <p class="footer-entity-line">5, Street 17, Argel, Nor Hachn, Kotayk region, 2404, RA</p>
          <p class="footer-entity-line">
            <a href="mailto:support@audio-to-text-transcription.com">support@audio-to-text-transcription.com</a>
          </p>
        </div>
```

- [ ] **Step 4: Add the Terms of Service and Refund Policy links**

In the same file, find the Support column:

```html
        <div class="footer-col">
          <h3 class="footer-col-title">Support</h3>
          <ul class="footer-links">
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li>
              <a
                href="https://chromewebstore.google.com/detail/audio-to-text-transcription/pkfoaaglghblmjjjpbniicjcpehfbmgd?hl=en"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chrome Web Store
              </a>
            </li>
          </ul>
        </div>
```

Replace with:

```html
        <div class="footer-col">
          <h3 class="footer-col-title">Support</h3>
          <ul class="footer-links">
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
            <li><a href="/refund">Refund Policy</a></li>
            <li>
              <a
                href="https://chromewebstore.google.com/detail/audio-to-text-transcription/pkfoaaglghblmjjjpbniicjcpehfbmgd?hl=en"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chrome Web Store
              </a>
            </li>
          </ul>
        </div>
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm run build && node --test tests/legal-pages.test.mjs`
Expected: PASS (2 tests)

- [ ] **Step 6: Commit**

```bash
git add src/components/AppFooter.vue tests/legal-pages.test.mjs
git commit -m "feat: update footer entity to SHIFT LLC, add Terms/Refund links"
```

---

## Task 2: Global Organization JSON-LD entity

**Files:**
- Modify: `src/layouts/Layout.astro:44-56`
- Modify: `tests/legal-pages.test.mjs`

**Interfaces:**
- Consumes: `dist/index.html` built in Task 1.
- Produces: corrected `Organization` node in the site-wide JSON-LD `@graph` that every page's `Layout` emits.

- [ ] **Step 1: Write the failing test**

Append to `tests/legal-pages.test.mjs`:

```js
test('global Organization JSON-LD uses the SHIFT LLC entity and Armenia address', () => {
  const match = home.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(match, 'JSON-LD script is missing');
  const jsonLd = JSON.parse(match[1]);
  const org = jsonLd['@graph'].find((item) => item['@type'] === 'Organization');

  assert.equal(org.legalName, 'SHIFT LLC');
  assert.deepEqual(org.address, {
    '@type': 'PostalAddress',
    streetAddress: '5, Street 17, Argel',
    addressLocality: 'Nor Hachn',
    addressRegion: 'Kotayk',
    postalCode: '2404',
    addressCountry: 'AM',
  });
  assert.equal(org.founder.name, 'Yuri Kosenko');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run build && node --test tests/legal-pages.test.mjs`
Expected: FAIL — `org.legalName` is still `'PE Yuri Kosenko'` and the address still points to Kazakhstan.

- [ ] **Step 3: Update the Organization node**

In `src/layouts/Layout.astro`, find:

```js
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "181/2 Lomov Street",
        "addressLocality": "Pavlodar",
        "addressCountry": "KZ"
      },
      "legalName": "PE Yuri Kosenko",
```

Replace with:

```js
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "5, Street 17, Argel",
        "addressLocality": "Nor Hachn",
        "addressRegion": "Kotayk",
        "postalCode": "2404",
        "addressCountry": "AM"
      },
      "legalName": "SHIFT LLC",
```

(Leave `founder` — the `Yuri Kosenko` person object right below — unchanged; the founder is a person, not the legal entity.)

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run build && node --test tests/legal-pages.test.mjs`
Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add src/layouts/Layout.astro tests/legal-pages.test.mjs
git commit -m "feat: update global Organization JSON-LD to SHIFT LLC entity"
```

---

## Task 3: Privacy page operating-entity sentence

**Files:**
- Modify: `src/pages/privacy.astro:14-30`
- Modify: `tests/legal-pages.test.mjs`

**Interfaces:**
- Produces: `dist/privacy/index.html` with an operating-entity sentence, consumed as a text pattern by this task's own test only.

- [ ] **Step 1: Write the failing test**

Append to `tests/legal-pages.test.mjs`:

```js
const privacy = await readFile(new URL('../dist/privacy/index.html', import.meta.url), 'utf8');

test('privacy page names SHIFT LLC as the operating entity', () => {
  assert.match(privacy, /Last Updated: August 9, 2026/);
  assert.match(
    privacy,
    /Audio To Text Transcription is operated by SHIFT LLC, a company registered in the Republic of Armenia at 5, Street 17, Argel, Nor Hachn, Kotayk region, 2404, RA\./,
  );
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run build && node --test tests/legal-pages.test.mjs`
Expected: FAIL — neither the updated date nor the entity sentence exist yet in `privacy.astro`.

- [ ] **Step 3: Bump the "Last Updated" date**

In `src/pages/privacy.astro`, find:

```html
        <p class="updated">Last Updated: August 2, 2026</p>
```

Replace with:

```html
        <p class="updated">Last Updated: August 9, 2026</p>
```

- [ ] **Step 4: Add the entity sentence to the Introduction section**

Find:

```html
        <p>
          We collect only the information needed to provide and improve the Services. We do not sell user data, use it for
          advertising, or use it to determine creditworthiness or for lending purposes.
        </p>
      </section>
```

Replace with:

```html
        <p>
          We collect only the information needed to provide and improve the Services. We do not sell user data, use it for
          advertising, or use it to determine creditworthiness or for lending purposes.
        </p>
        <p>
          Audio To Text Transcription is operated by SHIFT LLC, a company registered in the Republic of Armenia at 5, Street 17,
          Argel, Nor Hachn, Kotayk region, 2404, RA.
        </p>
      </section>
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm run build && node --test tests/legal-pages.test.mjs`
Expected: PASS (4 tests)

- [ ] **Step 6: Commit**

```bash
git add src/pages/privacy.astro tests/legal-pages.test.mjs
git commit -m "docs: name SHIFT LLC as the operating entity on the privacy page"
```

---

## Task 4: Terms of Service page

**Files:**
- Create: `src/pages/terms.astro`
- Modify: `tests/legal-pages.test.mjs`

**Interfaces:**
- Produces: `dist/terms/index.html`, linked from the footer (Task 1) at `/terms`.

- [ ] **Step 1: Write the failing test**

Append to `tests/legal-pages.test.mjs`:

```js
const terms = await readFile(new URL('../dist/terms/index.html', import.meta.url), 'utf8');

test('terms page covers the SHIFT LLC entity, 30-day-adjacent scope, and drops Promotions', () => {
  assert.match(terms, /<h1>Terms of Service<\/h1>/);
  assert.match(terms, /Last Updated: August 9, 2026/);
  assert.match(terms, /operated by SHIFT LLC[\s\S]*Republic of Armenia/);
  assert.match(terms, /Chrome extension and companion website that convert uploaded or recorded audio and video into text/);
  assert.match(terms, /governed by the laws of the Republic of Armenia/);
  assert.match(terms, /support@audio-to-text-transcription\.com/);
  assert.doesNotMatch(terms, />Promotions</);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run build && node --test tests/legal-pages.test.mjs`
Expected: FAIL — `dist/terms/index.html` doesn't exist (`readFile` rejects with `ENOENT`).

- [ ] **Step 3: Create `src/pages/terms.astro`**

```astro
---
import Layout from '../layouts/Layout.astro';
import NavigationBar from '../components/NavigationBar.vue';
import AppFooter from '../components/AppFooter.vue';

const title = 'Terms of Service - Audio To Text Transcription';
const description = 'Terms of Service for Audio To Text Transcription, operated by SHIFT LLC.';
---

<Layout title={title} description={description}>
  <NavigationBar client:load />
  <main class="privacy-page">
    <article class="privacy-card">
      <header class="privacy-card-header">
        <h1>Terms of Service</h1>
        <p class="updated">Last Updated: August 9, 2026</p>
      </header>

      <section>
        <h2>Introduction</h2>
        <p>
          These Terms of Service govern your use of the website audio-to-text-transcription.com and the Audio To Text
          Transcription Chrome extension (collectively, the "Services"), operated by SHIFT LLC ("Company," "we," "us," or
          "our"), a company registered in the Republic of Armenia. By accessing or using the Services, you agree to be bound by
          these Terms.
        </p>
      </section>

      <section>
        <h2>General Terms</h2>
        <p>
          By accessing and using the Services provided by SHIFT LLC through audio-to-text-transcription.com, you agree to
          these Terms. The Company disclaims liability for damages arising from use of, or inability to use, the Services.
          SHIFT LLC reserves the right to modify pricing and usage policies at any time.
        </p>
      </section>

      <section>
        <h2>Service Description</h2>
        <p>
          SHIFT LLC provides Audio To Text Transcription, a Chrome extension and companion website that convert uploaded or
          recorded audio and video into text, with optional AI-generated summaries. The specific features and functionality
          are described on the Website.
        </p>
      </section>

      <section>
        <h2>License</h2>
        <p>
          SHIFT LLC grants you a revocable, non-exclusive, non-transferable, limited license to install and use the extension
          strictly in accordance with these Terms.
        </p>
      </section>

      <section>
        <h2>Agreement Scope</h2>
        <p>
          These Terms constitute a contract between you and SHIFT LLC. Violation may result in account cancellation or access
          blocking without notice.
        </p>
      </section>

      <section>
        <h2>Key Definitions</h2>
        <ul>
          <li><strong>Cookie:</strong> browser-stored data used for identification and analytics.</li>
          <li><strong>Company:</strong> SHIFT LLC, responsible for your information under these Terms.</li>
          <li><strong>Device:</strong> any internet-connected equipment used to access the Service.</li>
          <li><strong>Service / Services:</strong> Audio To Text Transcription, provided via audio-to-text-transcription.com and
            the Chrome extension.</li>
          <li><strong>Third-party service:</strong> transcription and AI providers, analytics providers, payment processor, and
            other partners used to operate the Service.</li>
          <li><strong>Website:</strong> audio-to-text-transcription.com</li>
          <li><strong>You:</strong> a registered or visiting user of the Service.</li>
        </ul>
      </section>

      <section>
        <h2>Restrictions</h2>
        <p>
          You must not commercially exploit, license, sell, or reverse engineer the Service. You must not remove proprietary
          notices or create derivative works.
        </p>
      </section>

      <section>
        <h2>Your Suggestions</h2>
        <p>
          Feedback you provide becomes SHIFT LLC's property. The Company may use suggestions freely, without compensation or
          attribution.
        </p>
      </section>

      <section>
        <h2>Your Consent</h2>
        <p>Using the Website or the extension constitutes agreement to these Terms.</p>
      </section>

      <section>
        <h2>Links to Other Websites</h2>
        <p>
          These Terms apply only to the Services provided by SHIFT LLC. The Company is not responsible for the content,
          accuracy, or policies of external websites linked from the Services.
        </p>
      </section>

      <section>
        <h2>Cookies</h2>
        <p>
          SHIFT LLC and its service providers may use cookies to identify visited areas of the Website and enhance
          functionality. Disabling cookies may limit site access. No personally identifiable information is stored in cookies.
        </p>
      </section>

      <section>
        <h2>Changes to Terms &amp; Conditions</h2>
        <p>
          SHIFT LLC may discontinue the Service at its discretion, without prior notice. Updated Terms will be posted on this
          page with a revised "Last Updated" date.
        </p>
      </section>

      <section>
        <h2>Modifications to Website</h2>
        <p>
          SHIFT LLC reserves the right to modify, suspend, or discontinue, temporarily or permanently, the Website, the
          extension, or any part of the Service, without notice and without liability to you.
        </p>
      </section>

      <section>
        <h2>Updates to the Extension</h2>
        <p>
          Extension updates may change or add features and become part of the Service once installed. The Company has no
          obligation to provide updates or maintain any particular feature indefinitely.
        </p>
      </section>

      <section>
        <h2>Third-Party Services</h2>
        <p>
          The Service relies on third-party providers (including transcription, AI, analytics, and payment providers) as
          described in the Privacy Policy. SHIFT LLC is not responsible for the accuracy, legality, or quality of third-party
          services; you access them at your own risk.
        </p>
      </section>

      <section>
        <h2>Term and Termination</h2>
        <p>
          This agreement continues until terminated by either party. SHIFT LLC may suspend or terminate your access without
          reason or notice; termination is immediate upon a violation of these Terms.
        </p>
      </section>

      <section>
        <h2>Copyright Infringement Notice</h2>
        <p>
          Copyright owners must provide written notice including a signature, identification of the material, contact
          information, and a good-faith statement, sent to
          <a href="mailto:support@audio-to-text-transcription.com">support@audio-to-text-transcription.com</a>.
        </p>
      </section>

      <section>
        <h2>Indemnification</h2>
        <p>
          You agree to indemnify SHIFT LLC and its affiliates against claims arising from your use of the Service, violation of
          these Terms, or infringement of third-party rights.
        </p>
      </section>

      <section>
        <h2>No Warranties</h2>
        <p>
          The Service is provided "AS IS" and "AS AVAILABLE" without warranties of any kind. The Company does not warrant
          uninterrupted operation, error-free performance, or compatibility with any particular system.
        </p>
      </section>

      <section>
        <h2>Limitation of Liability</h2>
        <p>
          Liability is limited to amounts actually paid for the Service in the preceding 12 months. SHIFT LLC is not liable
          for consequential, indirect, or special damages.
        </p>
      </section>

      <section>
        <h2>Severability</h2>
        <p>
          If any provision of these Terms is unenforceable, it will be modified to the minimum extent necessary; the remaining
          provisions continue in effect.
        </p>
      </section>

      <section>
        <h2>Waiver</h2>
        <p>Failure to exercise a right under these Terms does not waive that right or any subsequent breach.</p>
      </section>

      <section>
        <h2>Amendments to Agreement</h2>
        <p>
          SHIFT LLC may modify these Terms at any time. Material changes take effect 30 days after notice is posted on this
          page.
        </p>
      </section>

      <section>
        <h2>Entire Agreement</h2>
        <p>
          These Terms, together with the Privacy Policy and Refund Policy, constitute the entire agreement between you and
          SHIFT LLC and supersede all prior agreements on this subject.
        </p>
      </section>

      <section>
        <h2>Intellectual Property</h2>
        <p>
          The Website, the extension, and their entire contents, features, and functionality are owned by SHIFT LLC and
          protected by Armenian and international copyright, trademark, and other intellectual property laws.
        </p>
      </section>

      <section>
        <h2>Agreement to Arbitrate</h2>
        <p>
          Disputes shall be resolved through binding arbitration under the rules of the American Arbitration Association,
          excluding claims for injunctive relief over intellectual property.
        </p>
      </section>

      <section>
        <h2>Notice of Dispute</h2>
        <p>
          Disputes require written notice by email to
          <a href="mailto:support@audio-to-text-transcription.com">support@audio-to-text-transcription.com</a>. The parties
          have 60 days for informal negotiation before either party may initiate arbitration.
        </p>
      </section>

      <section>
        <h2>Binding Arbitration</h2>
        <p>
          By agreeing to arbitration, you waive the right to a jury trial. The prevailing party's reasonable legal costs are
          borne by the non-prevailing party.
        </p>
      </section>

      <section>
        <h2>Submissions and Privacy</h2>
        <p>
          Any information or material you voluntarily submit to SHIFT LLC (other than personal data covered by the Privacy
          Policy) becomes non-confidential Company property and may be used without compensation.
        </p>
      </section>

      <section>
        <h2>Typographical Errors</h2>
        <p>
          If a plan or price is listed incorrectly due to a typographical error, SHIFT LLC may refuse or cancel any purchase
          made at the incorrect price. If your payment method was already charged, a credit will be issued immediately.
        </p>
      </section>

      <section>
        <h2>Miscellaneous</h2>
        <p>
          These Terms are governed by the laws of the Republic of Armenia. Courts of competent jurisdiction may enforce
          injunctive relief for breaches. The Company operates from Armenia.
        </p>
      </section>

      <section>
        <h2>Disclaimer</h2>
        <p>
          SHIFT LLC is not responsible for content, code, or inaccuracies originating from third-party services used within
          the Service. The Service is provided "as is," without warranties, and SHIFT LLC exercises no editorial control over
          third-party content.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Questions about these Terms can be directed to
          <a href="mailto:support@audio-to-text-transcription.com">support@audio-to-text-transcription.com</a>.
        </p>
      </section>
    </article>
  </main>
  <AppFooter client:load />
</Layout>

<style>
  .privacy-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 140px 16px 120px;
    gap: 32px;
    background: var(--gradient-bg);
  }

  .privacy-card {
    width: 100%;
    max-width: 960px;
    background: var(--color-surface-elevated);
    border-radius: 28px;
    border: 1px solid var(--color-border);
    box-shadow: var(--shadow-xl);
    padding: 48px clamp(24px, 4vw, 56px);
    color: var(--color-text);
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  .privacy-card-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    text-align: center;
  }

  .privacy-card-header h1 {
    font-size: clamp(2.5rem, 4vw, 3rem);
    font-weight: 800;
    color: var(--color-text);
    margin: 0;
  }

  .updated {
    font-size: 1rem;
    color: var(--color-text-secondary);
  }

  .privacy-card section {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .privacy-card h2 {
    font-size: clamp(1.75rem, 3vw, 2.25rem);
    font-weight: 700;
  }

  .privacy-card p {
    font-size: 1.05rem;
    line-height: 1.8;
    color: var(--color-text-secondary);
  }

  .privacy-card a {
    color: var(--accent-primary);
    text-decoration: none;
  }

  .privacy-card a:hover,
  .privacy-card a:focus-visible {
    color: var(--accent-primary-hover);
    text-decoration: underline;
  }

  .privacy-card ul {
    margin: 0;
    padding-left: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .privacy-card li {
    font-size: 1.05rem;
    color: var(--color-text-secondary);
    line-height: 1.7;
  }

  @media (max-width: 768px) {
    .privacy-page {
      padding-top: 128px;
    }

    .privacy-card {
      border-radius: 20px;
      padding: 36px 20px;
      gap: 32px;
    }

    .privacy-card p,
    .privacy-card li {
      font-size: 1rem;
      line-height: 1.7;
    }
  }
</style>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run build && node --test tests/legal-pages.test.mjs`
Expected: PASS (5 tests)

- [ ] **Step 5: Commit**

```bash
git add src/pages/terms.astro tests/legal-pages.test.mjs
git commit -m "feat: add Terms of Service page"
```

---

## Task 5: Refund Policy page

**Files:**
- Create: `src/pages/refund.astro`
- Modify: `tests/legal-pages.test.mjs`

**Interfaces:**
- Produces: `dist/refund/index.html`, linked from the footer (Task 1) at `/refund`.

- [ ] **Step 1: Write the failing test**

Append to `tests/legal-pages.test.mjs`:

```js
const refund = await readFile(new URL('../dist/refund/index.html', import.meta.url), 'utf8');

test('refund page promises a 30-day guarantee and 7-business-day processing', () => {
  assert.match(refund, /<h1>Refund Policy<\/h1>/);
  assert.match(refund, /Last Updated: August 9, 2026/);
  assert.match(refund, /30-day money-back guarantee/);
  assert.match(refund, /subscription plans and one-time minute-pack purchases/);
  assert.match(refund, /within 7 business days/);
  assert.doesNotMatch(refund, /20-day/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run build && node --test tests/legal-pages.test.mjs`
Expected: FAIL — `dist/refund/index.html` doesn't exist (`readFile` rejects with `ENOENT`).

- [ ] **Step 3: Create `src/pages/refund.astro`**

```astro
---
import Layout from '../layouts/Layout.astro';
import NavigationBar from '../components/NavigationBar.vue';
import AppFooter from '../components/AppFooter.vue';

const title = 'Refund Policy - Audio To Text Transcription';
const description = '30-day money-back guarantee and refund process for Audio To Text Transcription.';
---

<Layout title={title} description={description}>
  <NavigationBar client:load />
  <main class="privacy-page">
    <article class="privacy-card">
      <header class="privacy-card-header">
        <h1>Refund Policy</h1>
        <p class="updated">Last Updated: August 9, 2026</p>
      </header>

      <section>
        <h2>30-Day Money-Back Guarantee</h2>
        <p>
          Your satisfaction is our priority. We offer a 30-day money-back guarantee on paid subscription plans and one-time
          minute-pack purchases for Audio To Text Transcription. If you are not completely satisfied, you may request a full
          refund within 30 days of the relevant charge — no questions asked.
        </p>
      </section>

      <section>
        <h2>How to Request a Refund</h2>
        <p>
          <strong>Contact Us:</strong> email
          <a href="mailto:support@audio-to-text-transcription.com">support@audio-to-text-transcription.com</a> or use the
          <a href="/contact">Contact Us</a> page with your refund request. Please include the email address associated with
          your purchase and, optionally, your reason for requesting a refund — none is required.
        </p>
        <p>
          <strong>Processing Your Refund:</strong> once we receive your request, we aim to process it within 7 business days.
          The refund is issued to your original payment method through our payment processor. The time it takes to appear on
          your bank or card statement can vary by provider.
        </p>
      </section>

      <section>
        <h2>Additional Information</h2>
        <p>
          This guarantee covers subscription payments and one-time minute-pack purchases. It is separate from ordinary
          subscription cancellation, which you can do at any time from your account to stop future billing — cancelling does
          not by itself refund a past charge. If you have any questions, contact us at
          <a href="mailto:support@audio-to-text-transcription.com">support@audio-to-text-transcription.com</a>.
        </p>
      </section>
    </article>
  </main>
  <AppFooter client:load />
</Layout>

<style>
  .privacy-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 140px 16px 120px;
    gap: 32px;
    background: var(--gradient-bg);
  }

  .privacy-card {
    width: 100%;
    max-width: 960px;
    background: var(--color-surface-elevated);
    border-radius: 28px;
    border: 1px solid var(--color-border);
    box-shadow: var(--shadow-xl);
    padding: 48px clamp(24px, 4vw, 56px);
    color: var(--color-text);
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  .privacy-card-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    text-align: center;
  }

  .privacy-card-header h1 {
    font-size: clamp(2.5rem, 4vw, 3rem);
    font-weight: 800;
    color: var(--color-text);
    margin: 0;
  }

  .updated {
    font-size: 1rem;
    color: var(--color-text-secondary);
  }

  .privacy-card section {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .privacy-card h2 {
    font-size: clamp(1.75rem, 3vw, 2.25rem);
    font-weight: 700;
  }

  .privacy-card p {
    font-size: 1.05rem;
    line-height: 1.8;
    color: var(--color-text-secondary);
  }

  .privacy-card a {
    color: var(--accent-primary);
    text-decoration: none;
  }

  .privacy-card a:hover,
  .privacy-card a:focus-visible {
    color: var(--accent-primary-hover);
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    .privacy-page {
      padding-top: 128px;
    }

    .privacy-card {
      border-radius: 20px;
      padding: 36px 20px;
      gap: 32px;
    }

    .privacy-card p {
      font-size: 1rem;
      line-height: 1.7;
    }
  }
</style>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run build && node --test tests/legal-pages.test.mjs`
Expected: PASS (6 tests)

- [ ] **Step 5: Commit**

```bash
git add src/pages/refund.astro tests/legal-pages.test.mjs
git commit -m "feat: add Refund Policy page"
```

---

## Task 6: Sitemap and llms.txt entries

**Files:**
- Modify: `public/sitemap.xml`
- Modify: `public/llms.txt`
- Modify: `tests/legal-pages.test.mjs`

**Interfaces:**
- Consumes: nothing from earlier tasks (static files copied verbatim by Astro's build into `dist/`).
- Produces: nothing consumed by later tasks — this is the final task.

- [ ] **Step 1: Write the failing test**

Append to `tests/legal-pages.test.mjs`:

```js
const sitemap = await readFile(new URL('../dist/sitemap.xml', import.meta.url), 'utf8');
const llmsTxt = await readFile(new URL('../dist/llms.txt', import.meta.url), 'utf8');

test('sitemap lists the new legal pages and an updated privacy lastmod', () => {
  assert.match(sitemap, /<loc>https:\/\/audio-to-text-transcription\.com\/terms<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/audio-to-text-transcription\.com\/refund<\/loc>/);
  const privacyBlock = sitemap.match(/<url>\s*<loc>https:\/\/audio-to-text-transcription\.com\/privacy<\/loc>[\s\S]*?<\/url>/)[0];
  assert.match(privacyBlock, /<lastmod>2026-08-09<\/lastmod>/);
});

test('llms.txt lists Terms of Service and Refund Policy under Legal', () => {
  const legalSection = llmsTxt.slice(llmsTxt.indexOf('## Legal'), llmsTxt.indexOf('## Support'));
  assert.match(legalSection, /\[Terms of Service\]\(https:\/\/audio-to-text-transcription\.com\/terms\/\)/);
  assert.match(legalSection, /\[Refund Policy\]\(https:\/\/audio-to-text-transcription\.com\/refund\/\)/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run build && node --test tests/legal-pages.test.mjs`
Expected: FAIL — `public/sitemap.xml` has no `/terms`/`/refund` entries and `/privacy`'s `lastmod` is still `2026-03-19`; `public/llms.txt`'s Legal section has no Terms/Refund entries.

- [ ] **Step 3: Update `public/sitemap.xml`**

Replace the file's contents with:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://audio-to-text-transcription.com/</loc>
    <lastmod>2026-03-19</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://audio-to-text-transcription.com/privacy</loc>
    <lastmod>2026-08-09</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://audio-to-text-transcription.com/terms</loc>
    <lastmod>2026-08-09</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://audio-to-text-transcription.com/refund</loc>
    <lastmod>2026-08-09</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://audio-to-text-transcription.com/contact</loc>
    <lastmod>2026-07-25</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>
```

- [ ] **Step 4: Update `public/llms.txt`**

Find:

```
## Legal
- [Privacy Policy](https://audio-to-text-transcription.com/privacy/): Data handling and privacy practices
```

Replace with:

```
## Legal
- [Privacy Policy](https://audio-to-text-transcription.com/privacy/): Data handling and privacy practices
- [Terms of Service](https://audio-to-text-transcription.com/terms/): Terms governing use of the service
- [Refund Policy](https://audio-to-text-transcription.com/refund/): 30-day money-back guarantee details
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm run build && node --test tests/legal-pages.test.mjs`
Expected: PASS (8 tests)

- [ ] **Step 6: Run the full test suite**

Run: `npm test`
Expected: All test files (`legal-pages.test.mjs`, `pricing-section.test.mjs`, `pricing-metadata.test.mjs`) PASS.

- [ ] **Step 7: Commit**

```bash
git add public/sitemap.xml public/llms.txt tests/legal-pages.test.mjs
git commit -m "docs: list Terms and Refund pages in sitemap.xml and llms.txt"
```

---

## Manual verification (not automated)

After all tasks land, run `npm run dev` and manually check:
- `/`, `/privacy`, `/terms`, `/refund` all render correctly in both light and dark theme (footer entity block, new pages' card layout).
- Every footer link on every page resolves (`/contact`, `/privacy`, `/terms`, `/refund`, Chrome Web Store).
- Paste the `Organization` JSON-LD block (view source on `/`) into Google's Rich Results Test to confirm the address change didn't break schema validity.
