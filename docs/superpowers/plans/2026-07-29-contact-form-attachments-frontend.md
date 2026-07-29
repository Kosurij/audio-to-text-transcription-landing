# Contact Form File Attachments (Frontend) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a drag-and-drop / click / paste file attachment zone (up to 3 files, images or PDF, ≤5 MB each) to the `/contact` form, and switch the submit request from JSON to `multipart/form-data` so attachments reach the backend.

**Architecture:** `useContactForm.ts` gains an `attachments: File[]` array (on the existing reactive `form` object, alongside the `website` honeypot) plus `attachmentError`/`addFiles`/`removeFile`, and its `submitContactForm` switches from `JSON.stringify` to `FormData`. A new presentational component, `FileDropzone.vue`, owns the drag/drop/paste/click UI and file previews — no validation logic of its own, it just calls `addFiles`/`removeFile` on the composable. `ContactSection.vue` wires the two together.

**Tech Stack:** Vue 3 `<script setup lang="ts">`. No new npm dependencies — native HTML5 drag-and-drop events, a plain `<input type="file">`, and a `paste` event listener (`ClipboardEvent.clipboardData.files`) instead of a library, since clipboard-paste requires custom code regardless of which drag-and-drop library (if any) is used, and this project's existing form components are all hand-styled rather than built on a UI kit.

## Global Constraints

- Max 3 attachments, 5 MB max per file, allowed types: any `image/*` MIME type plus `application/pdf` — enforced client-side in `addFiles` before a file is ever added to `form.attachments`.
- No new npm dependencies.
- All UI copy stays in English, consistent with the rest of the site.
- No automated/behavioral tests — this repo has no test framework (established in the prior contact-form plan). Verification is `npm run build` plus a manual browser check.
- Attachment problems (too many / too large / wrong type) are prevented client-side before submit, so no new error UI state is needed beyond the existing generic error/retry view — a failed submit still falls into the existing `status === 'error'` branch.
- The dropzone and its remove buttons disable while `status === 'submitting'`, matching how the existing text fields already disable during submission.

---

## Task 1: Attachment state and multipart submit in `useContactForm.ts`

**Files:**
- Modify: `src/composables/useContactForm.ts`

**Interfaces:**
- Produces (consumed by Task 3): `useContactForm()` now additionally returns `attachmentError: Ref<string>`, `addFiles(files: File[]): void`, `removeFile(index: number): void`. `form` (already returned) gains `form.attachments: File[]`.

- [ ] **Step 1: Add `attachments` to `ContactFormValues` and initialize it**

Find:

```typescript
export interface ContactFormValues extends ContactFormData {
  website: string
}
```

Replace with:

```typescript
export interface ContactFormValues extends ContactFormData {
  website: string
  attachments: File[]
}

export const MAX_ATTACHMENTS = 3
export const MAX_ATTACHMENT_SIZE = 5 * 1024 * 1024 // 5 MB

function isAllowedAttachmentType(mimetype: string): boolean {
  return mimetype.startsWith('image/') || mimetype === 'application/pdf'
}
```

Find:

```typescript
export function useContactForm() {
  const form = reactive<ContactFormValues>({ ...emptyFormData(), website: '' })
  const touched = reactive(emptyTouched())
  const errors = reactive<ContactFormData>(emptyErrors())
  const status: Ref<ContactFormStatus> = ref('idle')
```

Replace with:

```typescript
export function useContactForm() {
  const form = reactive<ContactFormValues>({ ...emptyFormData(), website: '', attachments: [] })
  const touched = reactive(emptyTouched())
  const errors = reactive<ContactFormData>(emptyErrors())
  const status: Ref<ContactFormStatus> = ref('idle')
  const attachmentError: Ref<string> = ref('')
```

- [ ] **Step 2: Add `addFiles`/`removeFile`**

Find:

```typescript
  const firstInvalidField = (): keyof ContactFormData | null => {
    return FIELD_ORDER.find((field) => errors[field] !== '') ?? null
  }
```

Replace with:

```typescript
  const firstInvalidField = (): keyof ContactFormData | null => {
    return FIELD_ORDER.find((field) => errors[field] !== '') ?? null
  }

  const addFiles = (files: File[]) => {
    for (const file of files) {
      if (form.attachments.length >= MAX_ATTACHMENTS) {
        attachmentError.value = `You can attach up to ${MAX_ATTACHMENTS} files`
        return
      }
      if (file.size > MAX_ATTACHMENT_SIZE) {
        attachmentError.value = `${file.name} is larger than 5 MB`
        return
      }
      if (!isAllowedAttachmentType(file.type)) {
        attachmentError.value = `${file.name} is not an image or PDF`
        return
      }
      form.attachments.push(file)
      attachmentError.value = ''
    }
  }

  const removeFile = (index: number) => {
    form.attachments.splice(index, 1)
    attachmentError.value = ''
  }
```

- [ ] **Step 3: Switch `submitContactForm` to `FormData`**

Find:

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
```

Replace with:

```typescript
  const submitContactForm = async (data: ContactFormValues): Promise<void> => {
    const body = new FormData()
    body.append('name', data.name)
    body.append('email', data.email)
    body.append('subject', data.subject)
    body.append('message', data.message)
    body.append('website', data.website)
    data.attachments.forEach((file) => body.append('attachments', file))

    // No explicit Content-Type header — the browser sets the multipart boundary itself.
    const response = await fetch('https://api.audio-to-text-transcription.com/contact', {
      method: 'POST',
      body,
    })
    if (!response.ok) {
      throw new Error(`Contact form request failed with status ${response.status}`)
    }
  }
```

- [ ] **Step 4: Clear attachments on `reset()`**

Find:

```typescript
  const reset = () => {
    Object.assign(form, emptyFormData(), { website: '' })
    Object.assign(touched, emptyTouched())
    Object.assign(errors, emptyErrors())
    status.value = 'idle'
  }
```

Replace with:

```typescript
  const reset = () => {
    Object.assign(form, emptyFormData(), { website: '', attachments: [] })
    Object.assign(touched, emptyTouched())
    Object.assign(errors, emptyErrors())
    attachmentError.value = ''
    status.value = 'idle'
  }
```

- [ ] **Step 5: Return the new values**

Find:

```typescript
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

Replace with:

```typescript
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
    attachmentError,
    addFiles,
    removeFile,
  }
}
```

- [ ] **Step 6: Verify the build**

Run: `npm run build`
Expected: build succeeds with no TypeScript/Vue errors. (`FileDropzone.vue` doesn't exist yet, so `form.attachments`/`addFiles`/`removeFile` aren't consumed by any component yet — this step only confirms the composable file itself is valid.)

- [ ] **Step 7: Commit**

```bash
git add src/composables/useContactForm.ts
git commit -m "feat: add attachment state and multipart submit to useContactForm"
```

---

## Task 2: `FileDropzone.vue`

**Files:**
- Create: `src/components/FileDropzone.vue`

**Interfaces:**
- Consumes (from Task 1, wired by Task 3): nothing directly — it's a dumb presentational component.
- Produces (consumed by Task 3): a component with props `files: File[]`, `attachmentError: string`, `disabled?: boolean`, and emits `add: [files: File[]]` / `remove: [index: number]`.

- [ ] **Step 1: Create the component**

```vue
<template>
  <div class="file-dropzone-wrapper">
    <div
      v-if="files.length < MAX_FILES"
      class="dropzone"
      :class="{ 'dropzone--active': isDragOver, 'dropzone--disabled': disabled }"
      :tabindex="disabled ? -1 : 0"
      role="button"
      aria-label="Attach files: click, drag and drop, or paste from clipboard"
      @click="openFilePicker"
      @keydown.enter="openFilePicker"
      @keydown.space.prevent="openFilePicker"
      @dragover.prevent="onDragOver"
      @dragleave.prevent="isDragOver = false"
      @drop.prevent="onDrop"
      @paste="onPaste"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="28" height="28">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
      </svg>
      <p class="dropzone-text">Drag & drop, click, or paste to attach files</p>
      <p class="dropzone-hint">Images or PDF, up to 5 MB each, max 3 files</p>
      <input
        ref="fileInput"
        type="file"
        multiple
        accept="image/*,.pdf"
        class="file-input"
        :disabled="disabled"
        @change="onFileInputChange"
      />
    </div>

    <p v-if="attachmentError" class="dropzone-error">{{ attachmentError }}</p>

    <ul v-if="files.length > 0" class="attachment-list">
      <li v-for="(file, index) in files" :key="`${file.name}-${file.size}-${index}`" class="attachment-item">
        <img v-if="previewUrl(file)" :src="previewUrl(file)" :alt="file.name" class="attachment-thumb" />
        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="attachment-icon">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
        <span class="attachment-name">{{ file.name }}</span>
        <span class="attachment-size">{{ formatSize(file.size) }}</span>
        <button
          type="button"
          class="attachment-remove"
          aria-label="Remove file"
          :disabled="disabled"
          @click="emit('remove', index)"
        >
          ×
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    files: File[]
    attachmentError: string
    disabled?: boolean
  }>(),
  { disabled: false }
)

const emit = defineEmits<{
  add: [files: File[]]
  remove: [index: number]
}>()

const MAX_FILES = 3

const fileInput = ref<HTMLInputElement>()
const isDragOver = ref(false)
const previewUrls = new Map<File, string>()

const previewUrl = (file: File): string | undefined => {
  if (!file.type.startsWith('image/')) return undefined
  let url = previewUrls.get(file)
  if (!url) {
    url = URL.createObjectURL(file)
    previewUrls.set(file, url)
  }
  return url
}

const formatSize = (bytes: number): string => {
  const kb = bytes / 1024
  if (kb < 1024) return `${Math.max(1, Math.round(kb))} KB`
  return `${(kb / 1024).toFixed(1)} MB`
}

const revokeStaleUrls = (currentFiles: File[]) => {
  for (const [file, url] of previewUrls) {
    if (!currentFiles.includes(file)) {
      URL.revokeObjectURL(url)
      previewUrls.delete(file)
    }
  }
}

watch(() => props.files, (currentFiles) => revokeStaleUrls(currentFiles), { flush: 'post' })

onBeforeUnmount(() => {
  previewUrls.forEach((url) => URL.revokeObjectURL(url))
  previewUrls.clear()
})

const openFilePicker = () => {
  if (props.disabled) return
  fileInput.value?.click()
}

const onFileInputChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files.length > 0) emit('add', Array.from(input.files))
  input.value = ''
}

const onDragOver = () => {
  if (!props.disabled) isDragOver.value = true
}

const onDrop = (event: DragEvent) => {
  isDragOver.value = false
  if (props.disabled) return
  const files = event.dataTransfer?.files
  if (files && files.length > 0) emit('add', Array.from(files))
}

const onPaste = (event: ClipboardEvent) => {
  if (props.disabled) return
  const files = event.clipboardData?.files
  if (files && files.length > 0) emit('add', Array.from(files))
}
</script>

<style scoped>
.file-dropzone-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.dropzone {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 20px;
  border: 1.5px dashed var(--color-border);
  border-radius: 12px;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: border-color 0.15s ease, background-color 0.15s ease;
}

.dropzone:hover,
.dropzone:focus-visible {
  border-color: var(--accent-primary);
  outline: none;
}

.dropzone--active {
  border-color: var(--accent-primary);
  background: rgba(37, 99, 235, 0.06);
}

.dropzone--disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}

.dropzone-text {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 0;
}

.dropzone-hint {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  margin: 0;
}

.file-input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
  pointer-events: none;
}

.dropzone-error {
  font-size: 0.85rem;
  color: var(--color-error);
  margin: 0;
}

.attachment-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.attachment-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  background: var(--color-surface);
}

.attachment-thumb {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  object-fit: cover;
  flex-shrink: 0;
}

.attachment-icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  color: var(--color-text-muted);
}

.attachment-name {
  flex: 1;
  font-size: 0.85rem;
  color: var(--color-text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.attachment-size {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  flex-shrink: 0;
}

.attachment-remove {
  border: none;
  background: none;
  color: var(--color-text-muted);
  font-size: 1.1rem;
  line-height: 1;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 6px;
  flex-shrink: 0;
}

.attachment-remove:hover,
.attachment-remove:focus-visible {
  color: var(--color-error);
  background: rgba(220, 38, 38, 0.08);
  outline: none;
}

.attachment-remove:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

:global(html[data-theme='dark']) .attachment-item {
  background: var(--color-background);
  border-color: var(--color-border-strong);
}
</style>
```

- [ ] **Step 2: Verify the build**

Run: `npm run build`
Expected: build succeeds with no errors. (Not referenced by any other component yet — this only confirms the new file itself is valid.)

- [ ] **Step 3: Commit**

```bash
git add src/components/FileDropzone.vue
git commit -m "feat: add FileDropzone component (drag/drop, click, paste)"
```

---

## Task 3: Wire `FileDropzone` into `ContactSection.vue`

**Files:**
- Modify: `src/components/ContactSection.vue`

**Interfaces:**
- Consumes: `attachmentError`, `addFiles`, `removeFile` from Task 1's `useContactForm()`; the `FileDropzone` component from Task 2 (props `files`, `attachment-error`, `disabled`; events `add`, `remove`).

- [ ] **Step 1: Insert the dropzone into the form template**

Find:

```html
            <span class="char-counter">{{ form.message.length }} / {{ MAX_MESSAGE_LENGTH }}</span>
            <span v-if="touched.message && errors.message" id="contact-message-error" class="field-error">{{ errors.message }}</span>
          </div>

          <AppButton type="submit" variant="primary" :loading="status === 'submitting' && !isRetrying">
```

Replace with:

```html
            <span class="char-counter">{{ form.message.length }} / {{ MAX_MESSAGE_LENGTH }}</span>
            <span v-if="touched.message && errors.message" id="contact-message-error" class="field-error">{{ errors.message }}</span>
          </div>

          <FileDropzone
            :files="form.attachments"
            :attachment-error="attachmentError"
            :disabled="status === 'submitting'"
            @add="addFiles"
            @remove="removeFile"
          />

          <AppButton type="submit" variant="primary" :loading="status === 'submitting' && !isRetrying">
```

- [ ] **Step 2: Import the component and destructure the new composable values**

Find:

```typescript
import { ref } from 'vue'
import { useContactForm, type ContactFormData } from '../composables/useContactForm'
import AppButton from './AppButton.vue'

const { form, errors, touched, status, touchField, validate, firstInvalidField, submit, reset } = useContactForm()
```

Replace with:

```typescript
import { ref } from 'vue'
import { useContactForm, type ContactFormData } from '../composables/useContactForm'
import AppButton from './AppButton.vue'
import FileDropzone from './FileDropzone.vue'

const {
  form,
  errors,
  touched,
  status,
  touchField,
  validate,
  firstInvalidField,
  submit,
  reset,
  attachmentError,
  addFiles,
  removeFile,
} = useContactForm()
```

- [ ] **Step 3: Verify the build**

Run: `npm run build`
Expected: build succeeds with no errors.

- [ ] **Step 4: Verify the dropzone renders in the built output**

Run: `grep -o 'Drag &amp; drop, click, or paste to attach files' dist/contact/index.html`
Expected: one match (confirms the dropzone's static markup is present in the server-rendered page).

- [ ] **Step 5: Commit**

```bash
git add src/components/ContactSection.vue
git commit -m "feat: wire FileDropzone into the contact form"
```

---

## Task 4: Manual end-to-end check (human, not automated)

**Files:** none

- [ ] **Step 1: Confirm the backend attachment support is deployed**

The backend's attachment handling (`2026-07-29-contact-form-attachments-backend.md`, separate repo) must be deployed before this can be checked end-to-end. If it hasn't shipped yet, stop here and come back after it has.

- [ ] **Step 2: Manual browser check**

Run `npm run dev`, open `/contact`, and check:
1. Drag an image file onto the dropzone — it appears in the preview list with a thumbnail.
2. Click the dropzone and pick a PDF via the native file picker — it appears with a generic file icon (no thumbnail).
3. Copy an image to the clipboard (e.g. a screenshot) and paste while the dropzone is focused — it's added the same way.
4. Try adding a 4th file — rejected with an inline "You can attach up to 3 files" message; try a file over 5 MB — rejected with a size message; try a `.txt` file — rejected with a type message.
5. Remove a file via its × button — it disappears from the list, and the dropzone reappears if it had been hidden at the 3-file limit.
6. Submit the form with 1-3 attachments — confirm the success view appears, and the message plus all attached files actually arrive in the configured Telegram chat (mixed image+PDF submissions should arrive as an image album/single photo and a separate document message).
7. Open dev tools, confirm no console errors, and confirm object URLs are being revoked (no unbounded memory growth) by adding and removing several files in a row.

Stop the dev server once verified.
