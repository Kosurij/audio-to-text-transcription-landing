<template>
  <section class="how-it-works" id="how-it-works">
    <div class="how-it-works-container">
      <div class="section-header">
        <h2 class="section-title">How it works</h2>
        <p class="section-subtitle">Get your first transcription in under 2 minutes</p>
      </div>

      <div class="slider">
        <div class="slides">
          <div
            class="slide"
            v-for="(step, index) in visibleSteps"
            :key="step.title"
          >
            <div class="slide-media">
              <div class="media-placeholder">
                <span class="media-placeholder-label">{{ step.mediaLabel }}</span>
              </div>
            </div>
            <div class="slide-content">
              <div class="slide-number">{{ currentStep + index + 1 }}.</div>
              <h3 class="slide-title">{{ step.title }}</h3>
              <p class="slide-description">{{ step.description }}</p>
            </div>
          </div>
        </div>

        <div class="slider-controls">
          <button
            class="arrow-btn"
            :disabled="currentStep === 0"
            @click="prev"
            aria-label="Previous step"
          >
            &#8592;
          </button>
          <button
            class="arrow-btn"
            :disabled="currentStep === steps.length - 2"
            @click="next"
            aria-label="Next step"
          >
            &#8594;
          </button>
          <div class="progress-bar">
            <div
              class="progress-fill"
              :style="{ width: progressPercent + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const steps = [
  {
    title: 'Install the Extension',
    description: 'Add Audio to Text to Chrome with one click — no account or sign-up required. The extension appears in your toolbar instantly.',
    mediaLabel: '[Screenshot: Chrome Web Store install page for the Audio to Text extension]',
  },
  {
    title: 'Upload or Record Audio',
    description: 'Drop an audio or video file, or click Record to capture your microphone or any browser tab in real time. MP3, WAV, M4A, OGG, MP4 and more.',
    mediaLabel: '[GIF: extension popup — user clicks Upload, selects file, loading progress starts]',
  },
  {
    title: 'Get Your Transcript',
    description: 'Accurate text appears in seconds. Edit inline, copy to clipboard, or download as TXT. Your transcript history is saved automatically.',
    mediaLabel: '[GIF: transcript text appearing, then user clicks Download TXT button]',
  },
]

const currentStep = ref(0)

// Show 2 steps at a time; second slot is currentStep+1
const visibleSteps = computed(() => [
  steps[currentStep.value],
  steps[currentStep.value + 1],
])

// Progress: 0% at start (step 0), 100% at end (step 1)
const progressPercent = computed(() =>
  (currentStep.value / (steps.length - 2)) * 100
)

const prev = () => {
  if (currentStep.value > 0) currentStep.value--
}

const next = () => {
  if (currentStep.value < steps.length - 2) currentStep.value++
}
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

.slider {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.slides {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
}

.slide {
  background: var(--color-surface-elevated);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.slide-media {
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

.slide-content {
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.slide-number {
  font-size: 3rem;
  font-weight: 900;
  color: var(--accent-primary);
  line-height: 1;
  letter-spacing: -0.04em;
}

.slide-title {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-text);
  margin: 0;
}

.slide-description {
  font-size: 1rem;
  line-height: 1.75;
  color: var(--color-text-secondary);
  margin: 0;
}

/* Controls */
.slider-controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

.arrow-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid var(--color-border);
  background: var(--color-surface-elevated);
  color: var(--color-text);
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: border-color 0.2s ease, background 0.2s ease;
}

.arrow-btn:hover:not(:disabled) {
  border-color: var(--accent-primary);
  background: var(--accent-primary);
  color: white;
}

.arrow-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.progress-bar {
  flex: 1;
  height: 4px;
  background: var(--color-border);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--accent-primary);
  border-radius: 2px;
  transition: width 0.3s ease;
}

@media (max-width: 768px) {
  .how-it-works {
    padding: 60px 0;
  }

  .slides {
    grid-template-columns: 1fr;
  }

  /* On mobile show only the first visible slide */
  .slide:last-child {
    display: none;
  }
}
</style>
