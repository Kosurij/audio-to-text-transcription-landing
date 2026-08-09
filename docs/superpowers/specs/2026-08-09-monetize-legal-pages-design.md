# Monetize.software legal-entity compliance: Terms, Refund, entity update

## Context

monetize.software's moderation review requires the legal entity **SHIFT LLC** (registered in the Republic of Armenia) to be displayed on the site, plus three legal documents — Terms of Service, Privacy Notice, and Refund Policy — each reachable from a "useful links" footer. monetize.software supplied its own boilerplate templates for these three documents (hosted on Notion), built for a generic e-commerce/SaaS merchant.

Today the footer and the site's global JSON-LD (`Layout.astro`) both attribute the business to `PE Yuri Kosenko`, 181/2 Lomov Street, Pavlodar, Kazakhstan — this is stale and needs to become SHIFT LLC's Armenia address:

> SHIFT LLC, 5, Street 17, Argel, Nor Hachn, Kotayk region, 2404, RA

Only `/privacy` currently exists as a legal page; there is no Terms of Service or Refund Policy page anywhere on the site.

## Decisions

**Privacy Notice**: monetize's Privacy Notice template is generic e-commerce boilerplate that claims things that are false for this product — collecting debit/credit card numbers, Facebook Pixel, remarketing, ad-network data sharing. The site's existing `/privacy` page is accurate and already covers GDPR/CCPA/COPPA and the Chrome Web Store Limited Use disclosure for the real product. Rather than replace it with the inaccurate template (compliance risk) or publish a second, contradictory privacy page, `/privacy` is kept as the single source of truth and gets one addition: an operating-entity sentence naming SHIFT LLC and its Armenia address.

**Terms of Service and Refund Policy**: no equivalent pages exist today, so these are built from monetize's templates, adapted where the boilerplate doesn't fit this product (placeholders filled, product description made concrete, refund window corrected to match what's already publicly promised elsewhere on the site and in the extension: **30 days**, not the template's 20). Legal boilerplate that is jurisdiction/mechanism-specific (arbitration, governing law, liability) is kept as-is from the template rather than redrafted without legal review.

**Refund SLA**: the template's "processed within 7 business days" is kept as the public commitment, even though the actual fulfillment (`docs/superpowers/specs/2026-07-31-money-back-guarantee-process.md` in the main app repo) is a manual, undated operator process — 7 business days is an acceptable target for a solo-operated, low-volume product.

## Scope

`audio-to-text-transcription-landing` only. The Chrome extension already displays "30-day money-back guarantee" correctly and is not touched.

## Changes

### 1. `src/components/AppFooter.vue` — entity block + links

Entity block (`.footer-entity`) changes from:
```
PE Yuri Kosenko
181/2 Lomov Street, Pavlodar, Kazakhstan
support@audio-to-text-transcription.com
```
to:
```
SHIFT LLC
5, Street 17, Argel, Nor Hachn, Kotayk region, 2404, RA
support@audio-to-text-transcription.com
```

Support column (`footer-links`) gains two entries, ordered right after Privacy Policy:
```html
<li><a href="/contact">Contact Us</a></li>
<li><a href="/privacy">Privacy Policy</a></li>
<li><a href="/terms">Terms of Service</a></li>
<li><a href="/refund">Refund Policy</a></li>
<li><a href="...">Chrome Web Store</a></li>
```

### 2. `src/layouts/Layout.astro` — global Organization JSON-LD

The `Organization` node in the shared `jsonLd["@graph"]` currently hardcodes the old entity. Update:
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
`founder` (Yuri Kosenko, as a person) is unchanged — the founder isn't the legal entity.

### 3. `src/pages/privacy.astro` — operating-entity sentence

Add one sentence to the `Introduction` section (after the existing two paragraphs), naming the entity for moderation/consistency purposes without touching any other accurate content:

> Audio To Text Transcription is operated by SHIFT LLC, a company registered in the Republic of Armenia at 5, Street 17, Argel, Nor Hachn, Kotayk region, 2404, RA.

### 4. `src/pages/terms.astro` — new page

Same structure/layout/CSS pattern as `privacy.astro` (`Layout` + `NavigationBar` + `.privacy-page`/`.privacy-card` styles reused verbatim — no new CSS needed, class names generalize fine to a second legal page).

- `title`: `Terms of Service - Audio To Text Transcription`
- `description`: `Terms of Service for Audio To Text Transcription, operated by SHIFT LLC.`
- `<h1>Terms of Service</h1>`, `Last Updated: August 9, 2026`

Adapted from monetize's Terms of Service template. Sections, in order:

**Introduction** (new, not in template — matches `privacy.astro`'s pattern of a lead-in before the first named section)
> These Terms of Service govern your use of the website audio-to-text-transcription.com and the Audio To Text Transcription Chrome extension (collectively, the "Services"), operated by SHIFT LLC ("Company," "we," "us," or "our"), a company registered in the Republic of Armenia. By accessing or using the Services, you agree to be bound by these Terms.

**General Terms**
> By accessing and using the Services provided by SHIFT LLC through audio-to-text-transcription.com, you agree to these Terms. The Company disclaims liability for damages arising from use of, or inability to use, the Services. SHIFT LLC reserves the right to modify pricing and usage policies at any time.

**Service Description** (adapted — template said "online tools and digital utilities")
> SHIFT LLC provides Audio To Text Transcription, a Chrome extension and companion website that convert uploaded or recorded audio and video into text, with optional AI-generated summaries. The specific features and functionality are described on the Website.

**License**
> SHIFT LLC grants you a revocable, non-exclusive, non-transferable, limited license to install and use the extension strictly in accordance with these Terms.

**Agreement Scope**
> These Terms constitute a contract between you and SHIFT LLC. Violation may result in account cancellation or access blocking without notice.

**Key Definitions**
- Cookie: browser-stored data used for identification and analytics.
- Company: SHIFT LLC, responsible for your information under these Terms.
- Device: any internet-connected equipment used to access the Service.
- Service / Services: Audio To Text Transcription, provided via audio-to-text-transcription.com and the Chrome extension.
- Third-party service: transcription and AI providers, analytics providers, payment processor, and other partners used to operate the Service.
- Website: audio-to-text-transcription.com
- You: a registered or visiting user of the Service.

**Restrictions**
> You must not commercially exploit, license, sell, or reverse engineer the Service. You must not remove proprietary notices or create derivative works.

**Your Suggestions**
> Feedback you provide becomes SHIFT LLC's property. The Company may use suggestions freely, without compensation or attribution.

**Your Consent**
> Using the Website or the extension constitutes agreement to these Terms.

**Links to Other Websites**
> These Terms apply only to the Services provided by SHIFT LLC. The Company is not responsible for the content, accuracy, or policies of external websites linked from the Services.

**Cookies**
> SHIFT LLC and its service providers may use cookies to identify visited areas of the Website and enhance functionality. Disabling cookies may limit site access. No personally identifiable information is stored in cookies.

**Changes to Terms & Conditions**
> SHIFT LLC may discontinue the Service at its discretion, without prior notice. Updated Terms will be posted on this page with a revised "Last Updated" date.

**Modifications to Website**
> SHIFT LLC reserves the right to modify, suspend, or discontinue, temporarily or permanently, the Website, the extension, or any part of the Service, without notice and without liability to you.

**Updates to the Extension**
> Extension updates may change or add features and become part of the Service once installed. The Company has no obligation to provide updates or maintain any particular feature indefinitely.

**Third-Party Services**
> The Service relies on third-party providers (including transcription, AI, analytics, and payment providers) as described in the Privacy Policy. SHIFT LLC is not responsible for the accuracy, legality, or quality of third-party services; you access them at your own risk.

**Term and Termination**
> This agreement continues until terminated by either party. SHIFT LLC may suspend or terminate your access without reason or notice; termination is immediate upon a violation of these Terms.

**Copyright Infringement Notice**
> Copyright owners must provide written notice including a signature, identification of the material, contact information, and a good-faith statement, sent to support@audio-to-text-transcription.com.

**Indemnification**
> You agree to indemnify SHIFT LLC and its affiliates against claims arising from your use of the Service, violation of these Terms, or infringement of third-party rights.

**No Warranties**
> The Service is provided "AS IS" and "AS AVAILABLE" without warranties of any kind. The Company does not warrant uninterrupted operation, error-free performance, or compatibility with any particular system.

**Limitation of Liability**
> Liability is limited to amounts actually paid for the Service in the preceding 12 months. SHIFT LLC is not liable for consequential, indirect, or special damages.

**Severability**
> If any provision of these Terms is unenforceable, it will be modified to the minimum extent necessary; the remaining provisions continue in effect.

**Waiver**
> Failure to exercise a right under these Terms does not waive that right or any subsequent breach.

**Amendments to Agreement**
> SHIFT LLC may modify these Terms at any time. Material changes take effect 30 days after notice is posted on this page.

**Entire Agreement**
> These Terms, together with the Privacy Policy and Refund Policy, constitute the entire agreement between you and SHIFT LLC and supersede all prior agreements on this subject.

**Intellectual Property**
> The Website, the extension, and their entire contents, features, and functionality are owned by SHIFT LLC and protected by Armenian and international copyright, trademark, and other intellectual property laws.

**Agreement to Arbitrate**
> Disputes shall be resolved through binding arbitration under the rules of the American Arbitration Association, excluding claims for injunctive relief over intellectual property.

**Notice of Dispute**
> Disputes require written notice by email to support@audio-to-text-transcription.com. The parties have 60 days for informal negotiation before either party may initiate arbitration.

**Binding Arbitration**
> By agreeing to arbitration, you waive the right to a jury trial. The prevailing party's reasonable legal costs are borne by the non-prevailing party.

**Submissions and Privacy**
> Any information or material you voluntarily submit to SHIFT LLC (other than personal data covered by the Privacy Policy) becomes non-confidential Company property and may be used without compensation.

**Typographical Errors**
> If a plan or price is listed incorrectly due to a typographical error, SHIFT LLC may refuse or cancel any purchase made at the incorrect price. If your payment method was already charged, a credit will be issued immediately.

**Miscellaneous**
> These Terms are governed by the laws of the Republic of Armenia. Courts of competent jurisdiction may enforce injunctive relief for breaches. The Company operates from Armenia.

**Disclaimer**
> SHIFT LLC is not responsible for content, code, or inaccuracies originating from third-party services used within the Service. The Service is provided "as is," without warranties, and SHIFT LLC exercises no editorial control over third-party content.

**Contact**
> Questions about these Terms can be directed to support@audio-to-text-transcription.com.

Sections dropped from the template (not applicable): **Promotions** — the product runs no contests/sweepstakes.

### 5. `src/pages/refund.astro` — new page

Same layout pattern as `privacy.astro`/`terms.astro`.

- `title`: `Refund Policy - Audio To Text Transcription`
- `description`: `30-day money-back guarantee and refund process for Audio To Text Transcription.`
- `<h1>Refund Policy</h1>`, `Last Updated: August 9, 2026`

**30-Day Money-Back Guarantee**
> Your satisfaction is our priority. We offer a 30-day money-back guarantee on paid subscription plans and one-time minute-pack purchases for Audio To Text Transcription. If you are not completely satisfied, you may request a full refund within 30 days of the relevant charge — no questions asked.

**How to Request a Refund**
> Contact Us: email support@audio-to-text-transcription.com or use the Contact Us page with your refund request. Please include the email address associated with your purchase and, optionally, your reason for requesting a refund — none is required.
>
> Processing Your Refund: once we receive your request, we aim to process it within 7 business days. The refund is issued to your original payment method through our payment processor. The time it takes to appear on your bank or card statement can vary by provider.

**Additional Information**
> This guarantee covers subscription payments and one-time minute-pack purchases. It is separate from ordinary subscription cancellation, which you can do at any time from your account to stop future billing — cancelling does not by itself refund a past charge. If you have any questions, contact us at support@audio-to-text-transcription.com.

### 6. `public/sitemap.xml` — add new pages

```xml
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
```
(matching the existing `/privacy`/`/contact` entries; `/privacy`'s `lastmod` is also bumped to `2026-08-09` since its content changes in this same work).

### 7. `public/llms.txt` — add new pages

`## Legal` section becomes:
```
## Legal
- [Privacy Policy](https://audio-to-text-transcription.com/privacy/): Data handling and privacy practices
- [Terms of Service](https://audio-to-text-transcription.com/terms/): Terms governing use of the service
- [Refund Policy](https://audio-to-text-transcription.com/refund/): 30-day money-back guarantee details
```

### 8. `public/robots.txt` — no change

`/terms` and `/refund` are not added to `Disallow`, so they're crawlable by default, consistent with `/privacy` and `/contact`.

## Out of scope

- The Chrome extension (`extension/`) — already correctly shows the 30-day guarantee, untouched.
- Legal substance of arbitration/governing-law/liability clauses — kept from monetize's template as-is; not redrafted without legal review.
- Automating or changing the actual refund fulfillment process — that's covered by the main app repo's `docs/superpowers/specs/2026-07-31-money-back-guarantee-process.md` and isn't part of this landing-site change.

## Testing

Visual check in dev server: footer entity/links render correctly in both themes, `/terms` and `/refund` render with the same visual treatment as `/privacy`, all internal links (`/terms`, `/refund`, `/privacy`) resolve. Validate the updated `Organization` JSON-LD with a structured-data linter (e.g. paste into Google's Rich Results Test) to confirm no schema errors from the address change.
