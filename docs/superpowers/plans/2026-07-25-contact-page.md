# Contact Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a dedicated, indexable `/contact` page with a validated contact form whose submit logic is stubbed (simulated success) so a real backend endpoint can be wired in later without touching the UI.

**Architecture:** An Astro page (`contact.astro`) reuses the existing `Layout` + `NavigationBar` + `AppFooter` shell (same pattern as `privacy.astro`). A new Vue component (`ContactSection.vue`) renders a two-column info/form card. All form state, validation, and the submit stub live in a new composable (`useContactForm.ts`), following the existing `useConfetti.ts` composable pattern — this isolates the future real-endpoint change to one function.

**Tech Stack:** Astro 4 (static output) + Vue 3 (`<script setup lang="ts">`), no new dependencies. No test framework exists in this repo (verified: no vitest/jest/playwright config or devDependency) — verification uses Node's built-in TypeScript stripping (`node --experimental-strip-types`, available in the installed Node v22.16.0) for the composable's pure logic, and `npm run build` + manual dev-server checks for the Vue/Astro UI, consistent with how the rest of this codebase (zero existing component tests) is verified.

## Global Constraints

- All form labels, placeholder/help copy, and UI text must be in English.
- Validation is required-field only (non-empty after `.trim()`), plus an email-format check on the email field — no minimum-length checks on any field (explicit user correction: "Проверка на кол-во символов не нужна").
- A field's error is only shown after that specific field has been blurred (`touched`) or after a submit attempt — never on initial render.
- `submitContactForm` is a stub: ~600ms artificial delay, then always resolves success. No real network call, no error-state UI yet (spec: real endpoint integration is explicitly deferred).
- The `/contact` link is added to `AppFooter.vue`'s Support column only — `NavigationBar.vue` is not modified (explicit user decision).
- The page must remain indexable (no `noindex` prop) and follow the existing `privacy-card` visual conventions (rounded corners, `--color-surface-elevated` background, `--shadow-xl`).
- No new npm dependencies.

---

## Task 1: `useContactForm` composable

**Files:**
- Create: `src/composables/useContactForm.ts`
- Test: temporary `verify-contact-form.mjs` at repo root (written, run, then deleted — this repo has no test directory convention to add it to)

**Interfaces:**
- Produces (consumed by Task 2 `ContactSection.vue`):
  - `ContactFormData` — `{ name: string; email: string; subject: string; message: string }`
  - `useContactForm()` returns:
    - `form: ContactFormData` (reactive) — the four field values, bindable via `v-model`
    - `errors: ContactFormData` (reactive, same shape, values are error strings or `''`)
    - `touched: { name: boolean; email: boolean; subject: boolean; message: boolean }` (reactive)
    - `status: Ref<'idle' | 'submitting' | 'success'>`
    - `touchField(field: keyof ContactFormData): void`
    - `validate(): boolean`
    - `firstInvalidField(): keyof ContactFormData | null`
    - `submit(): Promise<boolean>`
    - `reset(): void`

- [ ] **Step 1: Write the composable**

Create `src/composables/useContactForm.ts`:

```typescript
import { reactive, ref, type Ref } from 'vue'

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export type ContactFormStatus = 'idle' | 'submitting' | 'success'

const FIELD_ORDER: Array<keyof ContactFormData> = ['name', 'email', 'subject', 'message']
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const emptyFormData = (): ContactFormData => ({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const emptyTouched = () => ({
  name: false,
  email: false,
  subject: false,
  message: false,
})

const emptyErrors = (): ContactFormData => ({
  name: '',
  email: '',
  subject: '',
  message: '',
})

export function useContactForm() {
  const form = reactive<ContactFormData>(emptyFormData())
  const touched = reactive(emptyTouched())
  const errors = reactive<ContactFormData>(emptyErrors())
  const status: Ref<ContactFormStatus> = ref('idle')

  const fieldError = (field: keyof ContactFormData): string => {
    const value = form[field].trim()
    if (!value) return 'This field is required'
    if (field === 'email' && !EMAIL_PATTERN.test(value)) return 'Enter a valid email address'
    return ''
  }

  const recomputeErrors = () => {
    FIELD_ORDER.forEach((field) => {
      errors[field] = fieldError(field)
    })
  }

  const touchField = (field: keyof ContactFormData) => {
    touched[field] = true
    recomputeErrors()
  }

  const validate = (): boolean => {
    FIELD_ORDER.forEach((field) => {
      touched[field] = true
    })
    recomputeErrors()
    return FIELD_ORDER.every((field) => errors[field] === '')
  }

  const firstInvalidField = (): keyof ContactFormData | null => {
    return FIELD_ORDER.find((field) => errors[field] !== '') ?? null
  }

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

  const reset = () => {
    Object.assign(form, emptyFormData())
    Object.assign(touched, emptyTouched())
    Object.assign(errors, emptyErrors())
    status.value = 'idle'
  }

  return {
    form,
    errors,
    touched,
    status,
    touchField,
    validate,
    firstInvalidField,
    submit,
    reset,
  }
}
```

- [ ] **Step 2: Write the verification script**

Create `verify-contact-form.mjs` at the repo root:

```javascript
import assert from 'node:assert/strict'
import { useContactForm } from './src/composables/useContactForm.ts'

// Empty form is invalid, all four fields report "required"
{
  const { validate, errors } = useContactForm()
  assert.equal(validate(), false)
  assert.equal(errors.name, 'This field is required')
  assert.equal(errors.email, 'This field is required')
  assert.equal(errors.subject, 'This field is required')
  assert.equal(errors.message, 'This field is required')
}

// Invalid email format is caught, other valid fields are not flagged
{
  const { form, validate, errors } = useContactForm()
  form.name = 'Alice'
  form.email = 'not-an-email'
  form.subject = 'Hello'
  form.message = 'Test message'
  assert.equal(validate(), false)
  assert.equal(errors.email, 'Enter a valid email address')
  assert.equal(errors.name, '')
  assert.equal(errors.subject, '')
  assert.equal(errors.message, '')
}

// Whitespace-only value counts as empty
{
  const { form, validate, errors } = useContactForm()
  form.name = '   '
  form.email = 'alice@example.com'
  form.subject = 'Hi'
  form.message = 'Test'
  assert.equal(validate(), false)
  assert.equal(errors.name, 'This field is required')
}

// A single-character message is valid (no minimum length)
{
  const { form, validate } = useContactForm()
  form.name = 'Alice'
  form.email = 'alice@example.com'
  form.subject = 'Hi'
  form.message = 'x'
  assert.equal(validate(), true)
}

// touchField only reveals that field's error, not others, before a full validate()
{
  const { touchField, errors } = useContactForm()
  touchField('name')
  assert.equal(errors.name, 'This field is required')
}

// firstInvalidField returns fields in declared order
{
  const { form, validate, firstInvalidField } = useContactForm()
  form.subject = 'Hi'
  form.message = 'Test'
  assert.equal(validate(), false)
  assert.equal(firstInvalidField(), 'name')
}

// Valid submit: status transitions idle -> submitting -> success
{
  const { form, validate, submit, status } = useContactForm()
  form.name = 'Alice'
  form.email = 'alice@example.com'
  form.subject = 'Hello'
  form.message = 'Test message'
  assert.equal(validate(), true)
  assert.equal(status.value, 'idle')
  const submitPromise = submit()
  assert.equal(status.value, 'submitting')
  const result = await submitPromise
  assert.equal(result, true)
  assert.equal(status.value, 'success')
}

// submit() on an invalid form returns false and never enters submitting
{
  const { submit, status } = useContactForm()
  const result = await submit()
  assert.equal(result, false)
  assert.equal(status.value, 'idle')
}

// reset() clears fields, touched, errors, and status
{
  const { form, submit, reset, status, touched, errors } = useContactForm()
  form.name = 'Alice'
  form.email = 'alice@example.com'
  form.subject = 'Hi'
  form.message = 'Test'
  await submit()
  reset()
  assert.equal(status.value, 'idle')
  assert.equal(form.name, '')
  assert.equal(touched.name, false)
  assert.equal(errors.name, '')
}

console.log('All contact form composable checks passed')
```

- [ ] **Step 3: Run the verification script**

Run: `node --experimental-strip-types verify-contact-form.mjs`
Expected: `All contact form composable checks passed` printed, exit code 0. If any `assert.equal` fails, the script throws and exits non-zero — re-check the composable logic against the assertion that failed.

- [ ] **Step 4: Delete the temporary verification script**

```bash
rm verify-contact-form.mjs
```

- [ ] **Step 5: Commit**

```bash
git add src/composables/useContactForm.ts
git commit -m "Add useContactForm composable with validation and stubbed submit"
```

---

## Task 2: `ContactSection.vue` component

**Files:**
- Create: `src/components/ContactSection.vue`

**Interfaces:**
- Consumes: `useContactForm()` from `src/composables/useContactForm.ts` (Task 1) — `form`, `errors`, `touched`, `status`, `touchField`, `validate`, `firstInvalidField`, `submit`, `reset`
- Produces (consumed by Task 3 `contact.astro`): a self-contained `<ContactSection />` component with no props, mountable via `client:load`

- [ ] **Step 1: Write the component**

Create `src/components/ContactSection.vue`:

```vue
<template>
  <section class="contact-section">
    <div class="contact-card">
      <div class="contact-info">
        <h2 class="info-title">Get in touch</h2>
        <p class="info-text">
          Have a question, found a bug, or want to share feedback? Fill out the form and we'll get back to you.
        </p>
        <a class="info-email" href="mailto:support@audio-to-text-transcription.com">
          support@audio-to-text-transcription.com
        </a>
        <p class="info-response-time">We typically reply within 1–2 business days.</p>
      </div>

      <div class="contact-form-wrapper">
        <form v-if="status !== 'success'" class="contact-form" novalidate @submit.prevent="handleSubmit">
          <div class="form-field">
            <label for="contact-name">Name</label>
            <input
              id="contact-name"
              v-model="form.name"
              type="text"
              :aria-invalid="Boolean(touched.name && errors.name)"
              :disabled="status === 'submitting'"
              @blur="touchField('name')"
            />
            <span v-if="touched.name && errors.name" class="field-error">{{ errors.name }}</span>
          </div>

          <div class="form-field">
            <label for="contact-email">Email</label>
            <input
              id="contact-email"
              v-model="form.email"
              type="email"
              :aria-invalid="Boolean(touched.email && errors.email)"
              :disabled="status === 'submitting'"
              @blur="touchField('email')"
            />
            <span v-if="touched.email && errors.email" class="field-error">{{ errors.email }}</span>
          </div>

          <div class="form-field">
            <label for="contact-subject">Subject</label>
            <input
              id="contact-subject"
              v-model="form.subject"
              type="text"
              :aria-invalid="Boolean(touched.subject && errors.subject)"
              :disabled="status === 'submitting'"
              @blur="touchField('subject')"
            />
            <span v-if="touched.subject && errors.subject" class="field-error">{{ errors.subject }}</span>
          </div>

          <div class="form-field">
            <label for="contact-message">Message</label>
            <textarea
              id="contact-message"
              v-model="form.message"
              rows="5"
              :aria-invalid="Boolean(touched.message && errors.message)"
              :disabled="status === 'submitting'"
              @blur="touchField('message')"
            />
            <span v-if="touched.message && errors.message" class="field-error">{{ errors.message }}</span>
          </div>

          <button type="submit" class="submit-button" :disabled="status === 'submitting'">
            {{ status === 'submitting' ? 'Sending...' : 'Send message' }}
          </button>
        </form>

        <div v-else class="success-state">
          <p class="success-title">Thanks — your message has been sent.</p>
          <p class="success-text">We'll get back to you as soon as we can.</p>
          <button type="button" class="secondary-button" @click="reset">Send another message</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useContactForm, type ContactFormData } from '../composables/useContactForm'

const { form, errors, touched, status, touchField, validate, firstInvalidField, submit, reset } = useContactForm()

const fieldElementId: Record<keyof ContactFormData, string> = {
  name: 'contact-name',
  email: 'contact-email',
  subject: 'contact-subject',
  message: 'contact-message',
}

const handleSubmit = async () => {
  if (!validate()) {
    const invalidField = firstInvalidField()
    if (invalidField) {
      document.getElementById(fieldElementId[invalidField])?.focus()
    }
    return
  }
  await submit()
}
</script>

<style scoped>
.contact-section {
  width: 100%;
  display: flex;
  justify-content: center;
}

.contact-card {
  width: 100%;
  max-width: 960px;
  background: var(--color-surface-elevated);
  border-radius: 28px;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-xl);
  padding: 48px clamp(24px, 4vw, 56px);
  display: grid;
  grid-template-columns: minmax(220px, 300px) 1fr;
  gap: 48px;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.info-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0;
}

.info-text {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
  margin: 0;
}

.info-email {
  font-size: 1rem;
  font-weight: 600;
  color: var(--accent-primary);
  text-decoration: none;
  word-break: break-word;
}

.info-email:hover,
.info-email:focus-visible {
  color: var(--accent-primary-hover);
  text-decoration: underline;
}

.info-response-time {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  margin: 0;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-field label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text);
}

.form-field input,
.form-field textarea {
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text);
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.form-field input:focus,
.form-field textarea:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}

.form-field input[aria-invalid='true'],
.form-field textarea[aria-invalid='true'] {
  border-color: #DC2626;
}

.form-field input:disabled,
.form-field textarea:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.field-error {
  font-size: 0.85rem;
  color: #DC2626;
}

.submit-button {
  align-self: flex-start;
  background: var(--gradient-primary);
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 14px 28px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: background 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease;
}

.submit-button:hover:not(:disabled) {
  background: var(--gradient-primary-hover);
  box-shadow: var(--shadow-md);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

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

.secondary-button {
  margin-top: 8px;
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 10px 20px;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--accent-primary);
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease;
}

.secondary-button:hover {
  background: var(--color-surface);
  border-color: var(--accent-primary);
}

@media (max-width: 768px) {
  .contact-card {
    grid-template-columns: 1fr;
    border-radius: 20px;
    padding: 36px 20px;
    gap: 32px;
  }
}
</style>
```

- [ ] **Step 2: Run the build to catch template/type errors**

Run: `npm run build`
Expected: build succeeds with no errors (this component isn't imported anywhere yet, so this step only confirms the `.vue` file itself is syntactically valid TypeScript/Vue — full integration is checked in Task 3).

- [ ] **Step 3: Commit**

```bash
git add src/components/ContactSection.vue
git commit -m "Add ContactSection component with two-column info/form layout"
```

---

## Task 3: `/contact` page

**Files:**
- Create: `src/pages/contact.astro`

**Interfaces:**
- Consumes: `ContactSection.vue` (Task 2), `Layout.astro`, `NavigationBar.vue`, `AppFooter.vue` (existing)

- [ ] **Step 1: Write the page**

Create `src/pages/contact.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
import NavigationBar from '../components/NavigationBar.vue';
import AppFooter from '../components/AppFooter.vue';
import ContactSection from '../components/ContactSection.vue';

const title = 'Contact Us - Audio To Text Transcription';
const description = 'Get in touch with the Audio To Text Transcription team. Ask a question, report a bug, or share feedback.';
---

<Layout title={title} description={description}>
  <NavigationBar client:load />
  <main class="contact-page">
    <header class="contact-page-header">
      <h1>Contact Us</h1>
      <p>Have a question or feedback? We'd love to hear from you.</p>
    </header>
    <ContactSection client:load />
  </main>
  <AppFooter client:load />
</Layout>

<style>
  .contact-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 140px 16px 120px;
    gap: 32px;
    background: var(--gradient-bg);
  }

  .contact-page-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    text-align: center;
    max-width: 640px;
  }

  .contact-page-header h1 {
    font-size: clamp(2.5rem, 4vw, 3rem);
    font-weight: 800;
    color: var(--color-text);
    margin: 0;
  }

  .contact-page-header p {
    font-size: 1.1rem;
    color: var(--color-text-secondary);
    margin: 0;
  }

  @media (max-width: 768px) {
    .contact-page {
      padding-top: 128px;
    }
  }
</style>
```

- [ ] **Step 2: Build and verify the page is generated**

Run: `npm run build && test -f dist/contact/index.html && echo FOUND`
Expected: build succeeds and `FOUND` is printed, confirming Astro emitted `dist/contact/index.html`.

- [ ] **Step 3: Verify the page contains the expected form fields**

Run: `grep -o 'id="contact-[a-z]*"' dist/contact/index.html | sort -u`
Expected output (four lines):
```
id="contact-email"
id="contact-message"
id="contact-name"
id="contact-subject"
```

- [ ] **Step 4: Start the dev server and manually verify interactive behavior**

Run: `npm run dev` (leave running), then in a browser visit `http://localhost:4321/contact` and check:
1. The page loads with the "Contact Us" header, the info column (with the `mailto:support@audio-to-text-transcription.com` link and response-time line), and the form.
2. Click "Send message" with all fields empty — four inline errors appear and focus moves to the Name field.
3. Type a name, tab to Email, type `not-an-email`, tab away — an "Enter a valid email address" error appears under Email specifically (Name's error, if any, is unaffected).
4. Fill Name, Email (valid format), Subject, and a one-character Message, then click "Send message" — the button briefly reads "Sending..." and is disabled, then the form is replaced by the "Thanks — your message has been sent." confirmation.
5. Click "Send another message" — the form reappears empty, with no errors shown.

Stop the dev server (Ctrl+C) once verified.

- [ ] **Step 5: Commit**

```bash
git add src/pages/contact.astro
git commit -m "Add /contact page"
```

---

## Task 4: Footer link to the contact page

**Files:**
- Modify: `src/components/AppFooter.vue:29-43` (the "Support" column)

**Interfaces:**
- None (leaf change, no new exports)

- [ ] **Step 1: Add the link**

In `src/components/AppFooter.vue`, inside the Support column's `<ul class="footer-links">`, add a `Contact Us` link before the existing `Privacy Policy` link:

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

- [ ] **Step 2: Build and verify the link appears on the homepage**

Run: `npm run build && grep -o '<a href="/contact">Contact Us</a>' dist/index.html`
Expected: the exact matched string is printed (confirms the footer link is present in the built homepage output).

- [ ] **Step 3: Commit**

```bash
git add src/components/AppFooter.vue
git commit -m "Add Contact Us link to footer Support column"
```

---

## Task 5: Full walkthrough across pages

**Files:** none (verification-only task)

- [ ] **Step 1: Verify the footer link is present on every page, not just the homepage**

Run:
```bash
npm run build
for f in dist/index.html dist/privacy/index.html dist/uninstall/index.html dist/contact/index.html; do
  echo "== $f =="
  grep -o '<a href="/contact">Contact Us</a>' "$f" || echo "MISSING"
done
```
Expected: every file prints the matched link string (none print `MISSING`), confirming `AppFooter` renders consistently across pages including the new `/contact` page itself.

- [ ] **Step 2: Manual cross-cutting check in the browser**

Run: `npm run dev`, then in a browser:
1. From the homepage, scroll to the footer and click "Contact Us" — confirm it navigates to `/contact`.
2. On `/contact`, toggle the OS/browser dark-mode preference (or use the dev-only theme toggle button in the bottom-right corner) and confirm the card, inputs, and button colors adapt correctly (no unreadable text, no invisible borders).
3. Resize the browser to a mobile width (e.g. 375px) and confirm the info column stacks above the form column, and the header/card padding looks reasonable (no horizontal scrollbar).

Stop the dev server once verified.

- [ ] **Step 3: Final commit check**

```bash
git status
git log --oneline -6
```
Expected: working tree is clean (no uncommitted changes), and the log shows the five commits from Tasks 1–4 plus this task (if any fixups were needed during Step 1/2, commit them now with a descriptive message before finishing).
