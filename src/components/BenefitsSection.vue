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
            <div class="feature-icon">{{ feature.emoji }}</div>
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
// mediaLabel — remove after replacing placeholders with real GIF/screenshots
const features = [
  {
    emoji: '⚡',
    title: 'Lightning Fast Transcription',
    description: 'Upload any audio file and get accurate text in seconds. Powered by Groq + Whisper AI — one of the fastest transcription engines available. No waiting, no delays.',
    mediaLabel: 'GIF: Upload file → transcript appears',
  },
  {
    emoji: '🎙',
    title: 'Record Mic or Browser Tab',
    description: 'Transcribe live audio directly in Chrome. Record from your microphone for in-person meetings, or capture any browser tab audio — perfect for online meetings, webinars, and podcasts.',
    mediaLabel: 'GIF: Click record → waveform → text',
  },
  {
    emoji: '📄',
    title: 'Export in Any Format',
    description: "Copy text to clipboard, or export as TXT, DOCX, or SRT. The SRT format is ideal for video subtitles — just upload and you're done.",
    mediaLabel: 'Screenshot: Export buttons TXT/DOCX/SRT',
  },
  {
    emoji: '🔒',
    title: 'Privacy First',
    description: "Your audio is processed via the Groq API and never stored. We don't save recordings, transcripts, or personal data. What you transcribe stays yours.",
    mediaLabel: 'Illustration or icon (no GIF needed)',
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

.feature-icon {
  font-size: 2rem;
  line-height: 1;
}

.feature-title {
  font-size: 1.625rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-text);
  margin: 0;
  text-align: left; /* explicit — protection against RTL inheritance */
}

.feature-description {
  font-size: 1.0625rem;
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
    gap: 56px;
  }
}
</style>
