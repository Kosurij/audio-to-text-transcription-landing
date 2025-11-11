<template>
  <a
    :href="chromeStoreUrl"
    target="_blank"
    rel="noopener noreferrer"
    :class="['install-button', props.variant]"
  >
    <slot name="icon">
      <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" d="M0 12c0-2.156.563-4.219 1.594-6l5.156 8.953C7.781 16.781 9.703 18 12 18c.656 0 1.266-.094 1.875-.281l-3.563 6.187C4.454 23.11 0 18.094 0 12Zm17.11 3.094A5.82 5.82 0 0 0 18 12c0-1.781-.797-3.375-2.063-4.5h7.172c.563 1.406.891 2.953.891 4.5 0 6.656-5.39 12-12 12l5.11-8.906ZM22.36 6H12c-2.953 0-5.344 2.11-5.906 4.828L2.53 4.641C4.734 1.828 8.156 0 12 0c4.406 0 8.297 2.438 10.36 6ZM7.874 12A4.131 4.131 0 0 1 12 7.875c2.25 0 4.125 1.875 4.125 4.125A4.131 4.131 0 0 1 12 16.125 4.101 4.101 0 0 1 7.875 12Z"/>
      </svg>
    </slot>
    <span class="text">
      <slot>Install the extension</slot>
    </span>
  </a>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  variant?: 'primary' | 'outline'
}>(), {
  variant: 'primary',
})

// TODO: Replace with actual Chrome Web Store URL
const baseUrl = 'https://chromewebstore.google.com/detail/audio-to-text-transcription/PLACEHOLDER?hl=en'

const buildChromeStoreUrl = (): string => {
  const url = new URL(baseUrl)
  url.searchParams.set('utm_source', 'site')
  url.searchParams.set('utm_medium', 'cpc')
  return url.href
}

const chromeStoreUrl = buildChromeStoreUrl()
</script>

<style scoped>
.install-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  padding: 8px 24px;
  border-radius: 4px;
  height: 36px;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
  position: relative;
  cursor: pointer;
  border: none;
  box-shadow: var(--shadow-sm);
}

.icon {
  flex-shrink: 0;
  width: 18px;
  height: 18px;
}

/* --- PRIMARY --- */
.primary {
  background: var(--accent-primary);
  color: #fff;
}

.primary:hover {
  background: var(--accent-primary-hover);
  box-shadow: var(--shadow-md);
}

.primary:active {
  box-shadow: var(--shadow-sm);
}

/* --- OUTLINE --- */
.outline {
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--accent-primary);
  box-shadow: none;
}

.outline:hover {
  background: var(--color-surface);
  border-color: var(--accent-primary);
  box-shadow: var(--shadow-sm);
}

.outline .text {
  color: var(--accent-primary);
}

.outline svg {
  color: var(--accent-primary);
}
</style>
