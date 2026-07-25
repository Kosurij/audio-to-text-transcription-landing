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
        <p class="info-response-time">We typically reply within 24 hours, but occasionally responses may take a couple of days.</p>
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
              :aria-describedby="touched.name && errors.name ? 'contact-name-error' : undefined"
              :disabled="status === 'submitting'"
              @blur="touchField('name')"
            />
            <span v-if="touched.name && errors.name" id="contact-name-error" class="field-error">{{ errors.name }}</span>
          </div>

          <div class="form-field">
            <label for="contact-email">Email</label>
            <input
              id="contact-email"
              v-model="form.email"
              type="email"
              :aria-invalid="Boolean(touched.email && errors.email)"
              :aria-describedby="touched.email && errors.email ? 'contact-email-error' : undefined"
              :disabled="status === 'submitting'"
              @blur="touchField('email')"
            />
            <span v-if="touched.email && errors.email" id="contact-email-error" class="field-error">{{ errors.email }}</span>
          </div>

          <div class="form-field">
            <label for="contact-subject">Subject</label>
            <input
              id="contact-subject"
              v-model="form.subject"
              type="text"
              :aria-invalid="Boolean(touched.subject && errors.subject)"
              :aria-describedby="touched.subject && errors.subject ? 'contact-subject-error' : undefined"
              :disabled="status === 'submitting'"
              @blur="touchField('subject')"
            />
            <span v-if="touched.subject && errors.subject" id="contact-subject-error" class="field-error">{{ errors.subject }}</span>
          </div>

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
  padding: 48px clamp(24px, 3vw, 40px);
  display: grid;
  grid-template-columns: minmax(240px, 360px) 1fr;
  gap: 40px;
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
  border-color: var(--color-error);
}

.form-field input:disabled,
.form-field textarea:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.field-error {
  font-size: 0.85rem;
  color: var(--color-error);
}

:global(html[data-theme='dark']) .form-field input,
:global(html[data-theme='dark']) .form-field textarea {
  background: var(--color-background);
  border-color: var(--color-border-strong);
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
