# Contact Form Telegram Notification (Frontend) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the contact form's stubbed submit with a real `fetch` to the backend's `POST /contact` endpoint, add a honeypot field, and add an error state with a retry option — the frontend half of wiring the contact form to a real destination (Telegram, via the backend).

**Architecture:** `useContactForm.ts`'s `submitContactForm` stops faking success and does a real `fetch` against `https://api.audio-to-text-transcription.com/contact`; `submit()` catches failures and sets a new `'error'` status instead of always resolving to `'success'`. `ContactSection.vue` adds a visually-hidden honeypot field (bots fill it, real users never see it) and a third UI state — alongside the existing form and success views — for the error case, with a "Try again" button that just re-calls `submit()`.

**Tech Stack:** Vue 3 `<script setup lang="ts">`, no new dependencies (uses the browser's built-in `fetch`).

## Global Constraints

- No new npm dependencies.
- All UI copy stays in English, consistent with the rest of the site.
- No automated/behavioral tests for this change — this repo has no test framework, and per explicit user instruction ("Тестировать в лендосе ничего не нужно") none is being added for this feature either. Verification is `npm run build` only, plus a final manual check the user will do themselves in a browser (no browser-automation tool is available in this session).
- The honeypot field (`website`) must never be validated, never appear in `errors`/`touched`, and must be excluded from keyboard tab order and screen readers (`tabindex="-1"`, `aria-hidden="true"`) while still being present in the DOM and submitted in the request body.
- On a failed submit, form field values must NOT be cleared — the user can retry without retyping.
- The message field is capped at 1000 characters client-side (well under the backend's separate 3500-character validation cap, so the two never conflict), enforced via the native `maxlength` attribute, with an always-visible "X / 1000" counter under the field — per explicit user instruction, no threshold-based show/hide logic, just always show it to keep things simple.
- The backend endpoint is `https://api.audio-to-text-transcription.com/contact` (already has its own separate implementation plan in the backend repo; not touched here).

---

## Task 1: Real submit + honeypot field + error state in `useContactForm.ts`

**Files:**
- Modify: `src/composables/useContactForm.ts`

**Interfaces:**
- Produces (consumed by Task 2's `ContactSection.vue`): `useContactForm()` now returns the same shape as before, with these changes —
  - `form` is now shaped as `ContactFormValues` (`ContactFormData` plus `website: string`) instead of just `ContactFormData` — so `form.website` is available for `v-model`.
  - `status: Ref<'idle' | 'submitting' | 'success' | 'error'>` — widened with the new `'error'` member.
  - `submit(): Promise<boolean>` — unchanged signature, but now resolves `false` (and sets `status.value = 'error'`) if the network request fails, instead of always succeeding.
  - `errors`, `touched`, `touchField`, `validate`, `firstInvalidField`, `reset` — unchanged, still scoped to the 4 validated fields only (`ContactFormData`), not `website`.

- [ ] **Step 1: Add the `ContactFormValues` type and widen `ContactFormStatus`**

In `src/composables/useContactForm.ts`, find:

```typescript
export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export type ContactFormStatus = 'idle' | 'submitting' | 'success'
```

Replace with:

```typescript
export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface ContactFormValues extends ContactFormData {
  website: string
}

export type ContactFormStatus = 'idle' | 'submitting' | 'success' | 'error'
```

- [ ] **Step 2: Make `form` include the honeypot field**

Find:

```typescript
export function useContactForm() {
  const form = reactive<ContactFormData>(emptyFormData())
```

Replace with:

```typescript
export function useContactForm() {
  const form = reactive<ContactFormValues>({ ...emptyFormData(), website: '' })
```

- [ ] **Step 3: Replace the stubbed `submitContactForm` with a real fetch**

Find:

```typescript
  const submitContactForm = async (_data: ContactFormData): Promise<{ success: boolean }> => {
    await new Promise((resolve) => setTimeout(resolve, 600))
    return { success: true }
  }

  const submit = async (): Promise<boolean> => {
    if (!validate()) return false
    status.value = 'submitting'
    await submitContactForm({ ...form })
    status.value = 'success'
    return true
  }
```

Replace with:

```typescript
  const submitContactForm = async (data: ContactFormValues): Promise<void> => {
    const response = await fetch('https://api.audio-to-text-transcription.com/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error(`Contact form request failed with status ${response.status}`)
    }
  }

  const submit = async (): Promise<boolean> => {
    if (!validate()) return false
    status.value = 'submitting'
    try {
      await submitContactForm({ ...form })
      status.value = 'success'
      return true
    } catch {
      status.value = 'error'
      return false
    }
  }
```

- [ ] **Step 4: Make `reset()` clear the honeypot field too**

Find:

```typescript
  const reset = () => {
    Object.assign(form, emptyFormData())
    Object.assign(touched, emptyTouched())
    Object.assign(errors, emptyErrors())
    status.value = 'idle'
  }
```

Replace with:

```typescript
  const reset = () => {
    Object.assign(form, emptyFormData(), { website: '' })
    Object.assign(touched, emptyTouched())
    Object.assign(errors, emptyErrors())
    status.value = 'idle'
  }
```

- [ ] **Step 5: Verify the build**

Run: `npm run build`
Expected: build succeeds with no TypeScript/Vue errors. (This composable isn't consumed by anything with the new `form.website`/`'error'` status yet outside itself — Task 2 wires those into the UI — so this step only confirms the file itself is syntactically and structurally valid.)

- [ ] **Step 6: Commit**

```bash
git add src/composables/useContactForm.ts
git commit -m "Wire useContactForm to the real /contact endpoint with honeypot and error state"
```

---

## Task 2: Honeypot field + error/retry UI in `ContactSection.vue`

**Files:**
- Modify: `src/components/ContactSection.vue`

**Interfaces:**
- Consumes: `useContactForm()` from Task 1 — specifically the now-available `form.website` and the widened `status` (`'idle' | 'submitting' | 'success' | 'error'`). No other consumed names change.

- [ ] **Step 1: Add the honeypot field to the form**

In `src/components/ContactSection.vue`, find:

```html
          <div class="form-row">
            <div class="form-field">
              <label for="contact-name">Name</label>
```

Replace with:

```html
          <div class="honeypot-field" aria-hidden="true">
            <label for="contact-website">Website</label>
            <input
              id="contact-website"
              v-model="form.website"
              type="text"
              tabindex="-1"
              autocomplete="off"
            />
          </div>

          <div class="form-row">
            <div class="form-field">
              <label for="contact-name">Name</label>
```

- [ ] **Step 2: Split the template into three states (form / error / success)**

Find:

```html
        <form v-if="status !== 'success'" class="contact-form" novalidate @submit.prevent="handleSubmit">
```

Replace with:

```html
        <form v-if="status === 'idle' || status === 'submitting'" class="contact-form" novalidate @submit.prevent="handleSubmit">
```

Find:

```html
        <div v-else class="success-state">
          <p class="success-title">Thanks — your message has been sent.</p>
          <p class="success-text">We'll get back to you as soon as we can.</p>
          <button type="button" class="secondary-button" @click="reset">Send another message</button>
        </div>
```

Replace with:

```html
        <div v-else-if="status === 'error'" class="error-state">
          <p class="error-title">We couldn't send your message.</p>
          <p class="error-text">
            Please try again, or email us at
            <a href="mailto:support@audio-to-text-transcription.com">support@audio-to-text-transcription.com</a>.
          </p>
          <button type="button" class="secondary-button" @click="submit">Try again</button>
        </div>

        <div v-else class="success-state">
          <p class="success-title">Thanks — your message has been sent.</p>
          <p class="success-text">We'll get back to you as soon as we can.</p>
          <button type="button" class="secondary-button" @click="reset">Send another message</button>
        </div>
```

- [ ] **Step 3: Expose `submit` to the template**

Find:

```typescript
const { form, errors, touched, status, touchField, validate, firstInvalidField, submit, reset } = useContactForm()
```

This line already destructures `submit` — no change needed here. (It was already returned by `useContactForm()` in Task 1 and already used internally by `handleSubmit`; Step 2 above just adds a second place in the template, the "Try again" button, that calls it directly.)

- [ ] **Step 4: Add CSS for the honeypot field and error state**

Find:

```css
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
```

Replace with:

```css
.honeypot-field {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
```

Find:

```css
.success-state {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
}

.success-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0;
}

.success-text {
  font-size: 1rem;
  color: var(--color-text-secondary);
  margin: 0;
}
```

Replace with:

```css
.success-state,
.error-state {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
}

.success-title,
.error-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0;
}

.success-text,
.error-text {
  font-size: 1rem;
  color: var(--color-text-secondary);
  margin: 0;
}
```

- [ ] **Step 5: Verify the build**

Run: `npm run build`
Expected: build succeeds with no errors.

- [ ] **Step 6: Verify the honeypot field is present but excluded from tab order in the built output**

Run: `grep -o '<input id="contact-website"[^>]*>' dist/contact/index.html`
Expected: one match, containing `tabindex="-1"` (confirms the field renders in the static HTML and is marked non-focusable).

- [ ] **Step 7: Commit**

```bash
git add src/components/ContactSection.vue
git commit -m "Add honeypot field and error/retry UI to the contact form"
```

---

## Task 3: Message length cap with always-visible character counter

**Files:**
- Modify: `src/components/ContactSection.vue`

**Interfaces:**
- None new — this is a leaf UI addition, purely local to this component. Does not touch `useContactForm.ts` (the backend's separate 3500-char cap is the actual enforcement backstop; this is a client-side UX guardrail at a tighter, more user-friendly 1000, enforced by the browser's native `maxlength` so it can't be bypassed by typing/pasting).

- [ ] **Step 1: Add the `MAX_MESSAGE_LENGTH` constant**

In `src/components/ContactSection.vue`, find:

```typescript
const { form, errors, touched, status, touchField, validate, firstInvalidField, submit, reset } = useContactForm()

const fieldElementId: Record<keyof ContactFormData, string> = {
```

Replace with:

```typescript
const { form, errors, touched, status, touchField, validate, firstInvalidField, submit, reset } = useContactForm()

const MAX_MESSAGE_LENGTH = 1000

const fieldElementId: Record<keyof ContactFormData, string> = {
```

- [ ] **Step 2: Add `maxlength` and the counter to the message field**

Find:

```html
          <div class="form-field">
            <label for="contact-message">Message</label>
            <textarea
              id="contact-message"
              v-model="form.message"
              rows="5"
              :aria-invalid="Boolean(touched.message && errors.message)"
              :aria-describedby="touched.message && errors.message ? 'contact-message-error' : undefined"
              :disabled="status === 'submitting'"
              @blur="touchField('message')"
            />
            <span v-if="touched.message && errors.message" id="contact-message-error" class="field-error">{{ errors.message }}</span>
          </div>
```

Replace with:

```html
          <div class="form-field">
            <label for="contact-message">Message</label>
            <textarea
              id="contact-message"
              v-model="form.message"
              rows="5"
              :maxlength="MAX_MESSAGE_LENGTH"
              :aria-invalid="Boolean(touched.message && errors.message)"
              :aria-describedby="touched.message && errors.message ? 'contact-message-error' : undefined"
              :disabled="status === 'submitting'"
              @blur="touchField('message')"
            />
            <span class="char-counter">{{ form.message.length }} / {{ MAX_MESSAGE_LENGTH }}</span>
            <span v-if="touched.message && errors.message" id="contact-message-error" class="field-error">{{ errors.message }}</span>
          </div>
```

- [ ] **Step 3: Add CSS for the counter**

Find:

```css
.field-error {
  font-size: 0.85rem;
  color: var(--color-error);
}
```

Replace with:

```css
.field-error {
  font-size: 0.85rem;
  color: var(--color-error);
}

.char-counter {
  font-size: 0.8rem;
  color: var(--color-text-muted);
}
```

- [ ] **Step 4: Verify the build**

Run: `npm run build`
Expected: build succeeds with no errors.

- [ ] **Step 5: Verify the counter and maxlength render in the built output**

Run: `grep -o 'maxlength="1000"' dist/contact/index.html && grep -o '<span class="char-counter">[^<]*</span>' dist/contact/index.html`
Expected: `maxlength="1000"` found once, and a `char-counter` span found once containing `0 / 1000` (the form starts empty at build/SSR time, so the initial server-rendered count is 0).

- [ ] **Step 6: Commit**

```bash
git add src/components/ContactSection.vue
git commit -m "Cap message field at 1000 characters with a visible counter"
```

---

## Task 4: Manual end-to-end check (human, not automated)

**Files:** none

- [ ] **Step 1: Confirm the backend is deployed and reachable**

The backend's `/contact` route (separate implementation plan, separate repo) must be deployed before this can be checked end-to-end. Run: `curl -s https://api.audio-to-text-transcription.com/health` and confirm it responds — if the backend plan hasn't shipped yet, stop here and come back to this task after it has.

- [ ] **Step 2: Manual browser check**

Run `npm run dev`, open `/contact`, and check:
1. Fill all four fields validly and submit — confirm the button shows "Sending...", then either the success view appears, or (if the backend isn't reachable/misconfigured) the new error view appears with "We couldn't send your message." and a working "Try again" button that re-attempts without clearing the fields.
2. On success, confirm a real message actually arrives in the configured Telegram chat.
3. Open browser dev tools, inspect the DOM, confirm the `#contact-website` honeypot input exists but is not visible on screen and is not reachable by pressing Tab through the form.

Stop the dev server once verified.
