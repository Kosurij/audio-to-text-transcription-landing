# Contact Page — Design

## Context

The site has no dedicated contact page. The GEO audit (`docs/GEO-AUDIT-REPORT.md`, line 67) flagged this as a gap: the only contact channel currently surfaced is the `email` in the `Organization.contactPoint` JSON-LD (`support@audio-to-text-transcription.com`), with no human-facing contact page or form.

This spec covers the page, form UI, and client-side collection logic only. Actual submission to a backend endpoint is out of scope — the submit handler is a stub that simulates success, isolated so it can later be swapped for a real API call without touching the rest of the component.

## Goals

- A dedicated, indexable `/contact` page matching the site's existing visual language (see `privacy.astro`, `uninstall.astro` for layout conventions).
- A contact form with client-side validation (required fields only, plus email format).
- Form submission logic isolated in a composable so a future real endpoint is a one-function change.
- A footer link so the page is discoverable from the site itself.

## Non-goals

- Wiring to a real backend/endpoint (explicitly deferred by the user — "Потом эти данные будут отправляться на endpoint. Но это далее").
- Spam protection (captcha, honeypot, rate limiting) — add when the real endpoint exists.
- Multi-language support — English only, consistent with the rest of the site.

## Architecture

Three new/changed files:

- **`src/pages/contact.astro`** — page shell. Follows the `privacy.astro` pattern: `Layout` + `NavigationBar` + `main` + `AppFooter`. Indexable (no `noindex`), with `title`/`description` props set for this page.
- **`src/components/ContactSection.vue`** — presentational component: header, two-column info/form layout, form fields, inline error messages, and the three visual states (idle/submitting/success).
- **`src/composables/useContactForm.ts`** — new composable (same pattern as the existing `src/composables/useConfetti.ts`) encapsulating:
  - reactive form state (`name`, `email`, `subject`, `message`)
  - per-field `touched` flags and computed error messages
  - `validate()` — validates all fields, returns whether the form is valid
  - `submitContactForm(data)` — currently a stub: artificial ~600ms delay, then always resolves success. This is the single seam to replace with a real `fetch` call later.

**Navigation:** `AppFooter.vue`'s "Support" column gets a new `Contact Us` link above/alongside `Privacy Policy`. No changes to `NavigationBar.vue` (top nav stays focused on landing-page anchors, per user decision).

## Page content & layout

- Header: `Contact Us` title + one-line subtitle (e.g. "Have a question or feedback? We'd love to hear from you.")
- Below the header, a card (styled consistently with `privacy-card` — rounded, `--color-surface-elevated` background, `--shadow-xl`) containing a two-column grid on desktop, stacking to one column on mobile:
  - **Left (info) column:** short intro line, direct mailto link to `support@audio-to-text-transcription.com`, and a one-line response-time expectation (e.g. "We typically reply within 1–2 business days").
  - **Right (form) column:** the contact form itself.
- SEO: normal indexable page, `title`/`description` set like other pages. No changes to the JSON-LD in `Layout.astro` — out of scope for this spec.

## Form fields & validation

All copy and field labels in English.

| Field | Input type | Validation |
|---|---|---|
| Name | `text` | required (non-empty after trim) |
| Email | `email` | required (non-empty after trim) + format check via `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` |
| Subject | `text` | required (non-empty after trim) |
| Message | `textarea` | required (non-empty after trim) — no minimum length |

Validation behavior:

- A field's error is shown once the field has been blurred at least once (`touched`), not on initial render.
- On submit attempt, all fields are validated together; if any are invalid, focus moves to the first invalid field and its error becomes visible regardless of `touched` state.
- The submit button is not disabled up front — errors only appear after a blur or a submit attempt, so the form doesn't look broken on first load.

## Submit flow

Three visual states in `ContactSection.vue`, driven by the composable:

1. **Idle** — form is editable, submit button enabled.
2. **Submitting** — triggered on valid submit; button shows a loading state and is disabled; fields are disabled to prevent duplicate submits.
3. **Success** — after `submitContactForm` resolves, form is replaced with a confirmation message ("Thanks — your message has been sent.") plus a way to send another message (resets state back to idle/empty).

`submitContactForm` in the composable is the only place that will need to change when a real endpoint exists (replace the artificial delay + always-succeed with an actual `fetch` and real error handling). Error-state UI for a failed submission is not built now, since the stub never fails — it will be added alongside the real endpoint integration.

## Testing

Manual verification in the dev server:
- Navigate to `/contact` directly and via the footer link.
- Submit with empty fields — confirm inline errors appear and focus moves to the first invalid field.
- Enter an invalid email format — confirm the email-specific error shows.
- Fill all fields validly and submit — confirm the submitting state appears briefly, then the success state.
- Check responsive layout (info/form columns stacking on mobile) and dark/light theme rendering.
