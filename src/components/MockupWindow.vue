<template>
  <div class="mockup-window">
    <div class="mockup-titlebar">
      <div class="mockup-dots">
        <span class="mockup-dot red" />
        <span class="mockup-dot yellow" />
        <span class="mockup-dot green" />
      </div>
      <span v-if="title" class="mockup-title">{{ title }}</span>
    </div>
    <div class="mockup-body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<style scoped>
.mockup-window {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  overflow: hidden;
  width: 100%;
}

.mockup-titlebar {
  height: 40px;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 12px;
}

.mockup-dots {
  display: flex;
  gap: 6px;
}

.mockup-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-border);
}

.mockup-dot.red { background: #FF5F57; }
.mockup-dot.yellow { background: #FEBC2E; }
.mockup-dot.green { background: #28C840; }

.mockup-title {
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text-muted);
}

.mockup-body {
  padding: 20px;
}
</style>
