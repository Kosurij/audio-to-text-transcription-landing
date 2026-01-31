<template>
  <div class="logo" :class="{ 'logo-compact': compact }">
    <svg
      class="logo-icon"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      :aria-hidden="true"
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#7C5CFC" />
          <stop offset="100%" stop-color="#9B85FD" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="10" fill="url(#logo-gradient)" />
      <!-- Audio wave bars -->
      <rect x="9" y="16" width="3" height="8" rx="1.5" fill="white" />
      <rect x="14.5" y="12" width="3" height="16" rx="1.5" fill="white" />
      <rect x="20" y="8" width="3" height="24" rx="1.5" fill="white" />
      <rect x="25.5" y="12" width="3" height="16" rx="1.5" fill="white" />
      <rect x="31" y="16" width="3" height="8" rx="1.5" fill="white" />
    </svg>
    <span v-if="!iconOnly" class="logo-text">
      {{ compact ? 'Audio To Text' : 'Audio To Text Transcription' }}
    </span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  compact?: boolean;
  iconOnly?: boolean;
}

withDefaults(defineProps<Props>(), {
  compact: false,
  iconOnly: false,
});
</script>

<style scoped>
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.logo-icon {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
}

.logo-compact .logo-icon {
  width: 40px;
  height: 40px;
}

.logo-text {
  font-family: 'Outfit', 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1.05rem;
  color: var(--color-text);
  letter-spacing: -0.01em;
  white-space: nowrap;
}

@media (max-width: 480px) {
  .logo-text {
    font-size: 0.9rem;
  }
}
</style>
