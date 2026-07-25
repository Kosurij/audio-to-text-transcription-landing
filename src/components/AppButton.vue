<template>
  <button :type="type" :class="['app-button', variant]" :disabled="disabled || loading">
    <span v-if="loading" class="spinner" aria-hidden="true" />
    <span class="label"><slot /></span>
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary'
    type?: 'button' | 'submit'
    loading?: boolean
    disabled?: boolean
  }>(),
  {
    variant: 'primary',
    type: 'button',
    loading: false,
    disabled: false,
  },
)
</script>

<style scoped>
.app-button {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 12px;
  padding: 14px 28px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease, border-color 0.15s ease;
}

.app-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.app-button.primary {
  background: var(--gradient-primary);
  color: #fff;
  border: none;
  box-shadow: var(--shadow-sm);
}

.app-button.primary:hover:not(:disabled) {
  background: var(--gradient-primary-hover);
  box-shadow: var(--shadow-md);
}

.app-button.secondary {
  margin-top: 8px;
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--accent-primary);
}

.app-button.secondary:hover:not(:disabled) {
  background: var(--color-surface);
  border-color: var(--accent-primary);
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: app-button-spin 0.6s linear infinite;
}

@keyframes app-button-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
