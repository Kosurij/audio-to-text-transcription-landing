<template>
  <section class="how-it-works" id="how-it-works">
    <div class="how-it-works-container">
      <div class="section-header">
        <h2 class="section-title">How it works</h2>
        <p class="section-subtitle">Get your first transcription in under 2 minutes</p>
      </div>

      <div class="steps">
        <div class="step" v-for="(step, index) in steps" :key="step.title">
          <div class="step-media">
            <!-- Placeholder: replace with <img :src="step.media" :alt="step.title" /> -->
            <div class="media-placeholder">
              <span>{{ step.mediaLabel }}</span>
            </div>
          </div>
          <div class="step-content">
            <div class="step-number">{{ index + 1 }}</div>
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-description">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const steps = [
  {
    title: 'Install the Extension',
    description: 'Add Audio to Text to Chrome with one click — no account or sign-up required. The extension appears in your toolbar instantly.',
    mediaLabel: 'Screenshot: Chrome Web Store install page',
  },
  {
    title: 'Upload or Record Audio',
    description: 'Drag and drop an audio file (MP3, WAV, M4A, OGG and more), or click Record to capture your microphone or any browser tab in real time.',
    mediaLabel: 'GIF: Upload file or click Record button',
  },
  {
    title: 'Get Your Transcription',
    description: 'Accurate text appears in seconds. Edit if needed, then copy to clipboard or export as TXT, DOCX, or SRT — ready to use immediately.',
    mediaLabel: 'GIF: Text appearing, copy/export buttons',
  },
];
</script>

<style scoped>
.how-it-works {
  padding: 80px 0;
  background: var(--color-surface);
}

.how-it-works-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.section-header {
  text-align: center;
  margin-bottom: 64px;
}

.section-title {
  font-size: clamp(1.75rem, 4vw, 2.75rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--color-text);
  margin-bottom: 12px;
}

.section-subtitle {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  max-width: 480px;
  margin: 0 auto;
}

/* Dark mode: handled via CSS variables in Layout.astro — no additional rules needed */

.steps {
  display: flex;
  flex-direction: column;
  gap: 72px;
}

.step {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}

.step:nth-child(even) {
  direction: rtl;
}

.step:nth-child(even) > * {
  direction: ltr;
}

.step-media {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.media-placeholder {
  aspect-ratio: 16 / 10;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-size: 13px;
  color: var(--color-text-muted);
  text-align: center;
}

.step-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: left; /* explicit — protection against RTL inheritance */
}

.step-number {
  width: 44px;
  height: 44px;
  background: var(--gradient-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 800;
  color: white;
  flex-shrink: 0;
}

.step-title {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-text);
  margin: 0;
  text-align: left; /* explicit — protection against RTL inheritance */
}

.step-description {
  font-size: 1.0625rem;
  line-height: 1.75;
  color: var(--color-text-secondary);
  margin: 0;
  text-align: left; /* explicit — protection against RTL inheritance */
}

@media (max-width: 768px) {
  .how-it-works {
    padding: 60px 0;
  }

  .step {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .step:nth-child(even) {
    direction: ltr;
  }

  .steps {
    gap: 52px;
  }
}
</style>
