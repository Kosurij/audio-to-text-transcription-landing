<template>
  <section class="how-it-works" id="how-it-works">
    <div class="how-it-works-container">
      <div class="section-header">
        <h2 class="section-title">How it works</h2>
        <p class="section-subtitle">Get your first transcription in under 2 minutes</p>
      </div>

      <div class="steps">
        <div
          class="step"
          v-for="(step, index) in steps"
          :key="step.title"
        >
          <div class="step-media">
            <div class="media-placeholder">
              <span class="media-placeholder-label">{{ step.mediaLabel }}</span>
            </div>
          </div>
          <div class="step-content">
            <div class="step-number">{{ index + 1 }}.</div>
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
    description: 'Add Audio to Text to Chrome with one click. The extension appears in your toolbar instantly.',
    mediaLabel: '[Screenshot: Chrome Web Store install page for the Audio to Text extension]',
  },
  {
    title: 'Upload or Record Audio',
    description: 'Drop an audio or video file, or click Record to capture your microphone or any browser tab in real time. MP3, WAV, M4A, OGG, MP4 and more.',
    mediaLabel: '[GIF: extension popup — user clicks Upload, selects file, loading progress starts]',
  },
  {
    title: 'Get Your Transcript',
    description: 'Accurate text appears in seconds. Edit inline, copy to clipboard, or download as TXT.',
    mediaLabel: '[GIF: transcript text appearing, then user clicks Download TXT button]',
  },
]
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
  margin-bottom: 56px;
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

.steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.step {
  background: var(--color-surface-elevated);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.step-media {
  flex-shrink: 0;
}

.media-placeholder {
  aspect-ratio: 16 / 10;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.media-placeholder-label {
  font-size: 12px;
  color: var(--color-text-muted);
  text-align: center;
  line-height: 1.5;
  font-style: italic;
}

.step-content {
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.step-number {
  font-size: 3rem;
  font-weight: 900;
  color: var(--accent-primary);
  line-height: 1;
  letter-spacing: -0.04em;
}

.step-title {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-text);
  margin: 0;
}

.step-description {
  font-size: 1rem;
  line-height: 1.75;
  color: var(--color-text-secondary);
  margin: 0;
}

@media (max-width: 900px) {
  .steps {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .how-it-works {
    padding: 60px 0;
  }
}
</style>
