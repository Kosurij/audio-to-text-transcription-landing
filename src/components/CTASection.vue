<template>
  <section class="cta">
    <div class="cta-container">
      <h2 class="cta-title">Ready to transcribe your audio?</h2>
      <p class="cta-subtitle">
        Join thousands of professionals and students using Audio to Text Transcription every day.
      </p>
      <InstallButton class="cta-button">
        + Add to Chrome
      </InstallButton>
      <p class="cta-hint">Works in Chrome</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import InstallButton from './InstallButton.vue';
</script>

<style scoped>
.cta {
  padding: 80px 0;
  background: var(--accent-primary);
  text-align: center;
}

html[data-theme='dark'] .cta {
  background: var(--color-surface); /* в dark mode — поверхность, чтобы выделяться на #0F172A фоне */
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.cta-container {
  max-width: 680px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.cta-title {
  font-size: clamp(1.75rem, 4vw, 2.75rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #FFFFFF;
  margin: 0;
}

html[data-theme='dark'] .cta-title {
  color: var(--color-text);
}

.cta-subtitle {
  font-size: 1.125rem;
  color: #ffffff;
  line-height: 1.6;
  max-width: 480px;
  margin: 0;
}

html[data-theme='dark'] .cta-subtitle {
  color: var(--color-text-secondary);
}

.cta-button {
  font-size: 18px;
  font-weight: 700;
  padding: 18px 40px;
  border-radius: 10px;
  height: auto; /* override InstallButton's internal height: 36px */
  background: #FFFFFF;
  color: var(--accent-primary);
}

.cta-button :deep(.icon) {
  width: 22px;
  height: 22px;
}

html[data-theme='dark'] .cta-button {
  background: var(--accent-primary);
  color: #FFFFFF;
}

.cta-hint {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}

html[data-theme='dark'] .cta-hint {
  color: var(--color-text-muted);
}

@media (max-width: 600px) {
  .cta {
    padding: 60px 0;
  }

  .cta-button {
    width: 100%;
    max-width: 320px;
  }
}
</style>
