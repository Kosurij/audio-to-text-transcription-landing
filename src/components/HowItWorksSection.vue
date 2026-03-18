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

      <!-- Mobile carousel — hidden on desktop via CSS -->
      <div class="hiw-carousel">
        <div class="embla__viewport" ref="emblaViewportRef">
          <div class="embla__container">
            <div class="embla__slide" v-for="(step, index) in steps" :key="step.title">
              <div class="step">
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
        </div>
        <div class="hiw-progress-track">
          <div class="hiw-progress-fill" :style="{ width: progress + '%' }"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import EmblaCarousel from 'embla-carousel'
import type { EmblaCarouselType } from 'embla-carousel'

// TODO: replace each media-placeholder with <img> or <video autoplay loop muted playsinline>
const steps = [
  {
    title: 'Install the Extension',
    description: 'Add Audio to Text to Chrome with one click. The extension appears in your toolbar instantly.',
    mediaLabel: 'Screenshot → /screenshots/chrome-store.png\nСкрин страницы расширения в Chrome Web Store: кнопка "Add to Chrome", иконка, рейтинг',
  },
  {
    title: 'Upload or Record Audio',
    description: 'Drop an audio or video file, or click Record to capture your microphone or any browser tab in real time. MP3, WAV, M4A, OGG, MP4 and more.',
    mediaLabel: 'GIF → /gifs/upload-step.gif\nЗапись: открыть попап → нажать Upload → выбрать файл в диалоге → появляется прогресс-бар загрузки',
  },
  {
    title: 'Get Your Transcript',
    description: 'Accurate text appears in seconds. Edit inline, copy to clipboard, or download as TXT.',
    mediaLabel: 'GIF → /gifs/transcript-result.gif\nЗапись: прогресс завершается → текст транскрипции появляется → пользователь нажимает Copy или Download TXT',
  },
]

const emblaViewportRef = ref<HTMLElement | null>(null)
const progress = ref(0)
let embla: EmblaCarouselType | null = null

onMounted(() => {
  if (!emblaViewportRef.value) return
  embla = EmblaCarousel(emblaViewportRef.value, { loop: true })
  const updateProgress = () => {
    if (!embla) return
    const index = embla.selectedScrollSnap()
    progress.value = Math.round((index / (steps.length - 1)) * 100)
  }
  embla.on('select', updateProgress)
})

onUnmounted(() => {
  embla?.destroy()
  embla = null
})
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

/* Scope media hide to desktop grid only (not the mobile carousel) */
.steps .step-media {
  display: none;
}

/* Mobile carousel — hidden by default */
.hiw-carousel {
  display: none;
}

@media (max-width: 768px) {
  .how-it-works {
    padding: 60px 0;
  }

  .step {
    border-radius: 12px;
  }

  /* Hide desktop grid, show carousel */
  .steps {
    display: none;
  }
  .hiw-carousel {
    display: block;
  }

  /* Embla core */
  .hiw-carousel .embla__viewport {
    overflow: hidden;
    touch-action: pan-y;
  }
  .hiw-carousel .embla__container {
    display: flex;
    gap: 12px;
  }
  .hiw-carousel .embla__slide {
    flex: 0 0 calc(100% - 48px);
    min-width: 0;
  }

  /* Number + title on one line */
  .hiw-carousel .step-content {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto;
    column-gap: 12px;
    row-gap: 0;
    padding: 20px;
  }
  .hiw-carousel .step-number {
    grid-column: 1;
    grid-row: 1;
    align-self: baseline;
    font-size: 2.25rem;
  }
  .hiw-carousel .step-title {
    grid-column: 2;
    grid-row: 1;
    align-self: baseline;
    font-size: 1.25rem;
  }
  .hiw-carousel .step-description {
    grid-column: 1 / -1;
    grid-row: 2;
    margin-top: 10px;
  }

  /* Progress bar */
  .hiw-progress-track {
    margin-top: 16px;
    height: 4px;
    border-radius: 2px;
    background: var(--color-border);
    overflow: hidden;
  }
  .hiw-progress-fill {
    height: 100%;
    border-radius: 2px;
    background: var(--accent-primary);
    transition: width 0.1s ease;
  }
}
</style>
