<template>
  <section class="features" id="features">
    <div class="features-container">
      <div class="section-header">
        <h2 class="section-title">Everything you need to transcribe</h2>
        <p class="section-subtitle">Powerful features that make audio-to-text conversion fast and effortless</p>
      </div>

      <div class="features-list">
        <div
          class="feature-row"
          v-for="(feature, index) in features"
          :key="feature.title"
          :class="{ 'feature-row--reversed': index % 2 === 1 }"
        >
          <!-- Text -->
          <div class="feature-text">

            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-description">{{ feature.description }}</p>
          </div>

          <!-- Media -->
          <div class="feature-media">
            <!-- Placeholder: replace with <img :src="feature.media" :alt="feature.title" /> when ready -->
            <div class="media-placeholder">
              <span class="media-placeholder-label">{{ feature.mediaLabel }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// mediaLabel — TODO: replace each placeholder div with <img src="..." /> or <video autoplay loop muted playsinline>
const features = [
  {
    title: 'Upload Files or Record Live',
    description: 'Drag and drop any audio or video file — MP3, WAV, M4A, OGG, MP4. Or click Record to capture your microphone or any browser tab in real time. Transcription starts instantly.',
    mediaLabel: 'GIF → /gifs/upload-flow.gif\nЗапись: открыть попап → перетащить MP3 файл → прогресс бар → появляется текст транскрипции',
  },
  {
    title: '99+ Languages with Timestamps',
    description: 'Transcribe in any language — detected automatically. Each segment includes a timestamp so you can navigate to any moment. Perfect for multilingual meetings and interviews.',
    mediaLabel: 'Screenshot → /screenshots/timestamps.png\nПоказать: транскрипт с временными метками слева, в шапке видно "Auto-detected: Russian" или другой язык',
  },
  {
    title: 'AI-Powered Summary',
    description: 'After transcription, get an automatic summary of key points. No more reading through long transcripts — the important parts are extracted for you instantly.',
    mediaLabel: 'Screenshot → /screenshots/summary.png\nПоказать: вкладка Summary открыта, список ключевых тезисов буллитами под транскриптом',
  },
  {
    title: 'History, Edit & Export',
    description: 'All your transcriptions are saved. Edit the text directly in the extension, then download as TXT or copy to clipboard. Your history is always one click away.',
    mediaLabel: 'Screenshot → /screenshots/history.png\nПоказать: экран истории — список прошлых транскрипций, одна выбрана, видны кнопки Edit и Download TXT',
  },
];
</script>

<style scoped>
.features {
  padding: 80px 0;
  background: var(--color-background);
}

.features-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.section-header {
  text-align: center;
  margin-bottom: 72px;
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
  max-width: 520px;
  margin: 0 auto;
  line-height: 1.6;
}

.features-list {
  display: flex;
  flex-direction: column;
  gap: 80px;
}

.feature-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}

.feature-row--reversed {
  direction: rtl;
}

.feature-row--reversed > * {
  direction: ltr;
}

/* Dark mode: handled via CSS variables in Layout.astro — no additional rules needed */

.feature-text {
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: left; /* explicit — protection against RTL inheritance */
}

.feature-title {
  font-size: clamp(2rem, 3.5vw, 2.75rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--color-text);
  margin: 0;
  text-align: left; /* explicit — protection against RTL inheritance */
}

.feature-description {
  font-size: 1.125rem;
  line-height: 1.75;
  color: var(--color-text-secondary);
  margin: 0;
  text-align: left; /* explicit — protection against RTL inheritance */
}

.feature-media {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

/* Placeholder — remove after replacing with real img */
.media-placeholder {
  aspect-ratio: 16 / 10;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.media-placeholder-label {
  font-size: 13px;
  color: var(--color-text-muted);
  text-align: center;
  line-height: 1.5;
}

/* Mobile */
@media (max-width: 768px) {
  .features {
    padding: 60px 0;
  }

  .feature-row {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .feature-row--reversed {
    direction: ltr;
  }

  .features-list {
    gap: 40px;
  }

  /* Hide media placeholders on mobile — text content is sufficient */
  .feature-media {
    display: none;
  }
}
</style>
