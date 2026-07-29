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
