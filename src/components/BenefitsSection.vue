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
            <video
              v-if="feature.mediaType === 'video'"
              :src="feature.media"
              class="feature-gif"
              autoplay
              loop
              :muted="true"
              playsinline
            />
            <img v-else :src="feature.media" :alt="feature.title" class="feature-gif" loading="lazy" />
            <p v-if="feature.mediaLabel" class="media-label">{{ feature.mediaLabel }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const features = [
  {
    title: 'Upload Files or Record Live',
    description: 'Drag and drop any audio or video file — MP3, WAV, M4A, OGG, MP4. Or click Record to capture your microphone or any browser tab in real time. Supports 90+ languages, detected automatically.',
    media: '/videos/feature-upload.mp4',
    mediaType: 'video',
  },
  {
    title: 'Navigate by Timestamps',
    description: 'Every transcript is split into segments with precise timestamps. Jump to any moment instantly — no more scrubbing through audio to find a quote.',
    media: '/videos/feature-timestamps.mp4',
    mediaType: 'video',
  },
  {
    title: 'AI-Powered Summary',
    description: 'After transcription, get an automatic summary of key points. No more reading through long transcripts — the important parts are extracted for you instantly.',
    media: '/videos/feature-summary.mp4',
    mediaType: 'video',
  },
  {
    title: 'History, Edit & Export',
    description: 'All your transcriptions are saved. Edit the text directly in the extension, then download as TXT or copy to clipboard. Your history is always one click away.',
    media: '/videos/feature-history.mp4',
    mediaType: 'video',
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
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.15);
  max-width: clamp(220px, 25vw, 320px);
  margin: 0 auto;
}

html[data-theme='dark'] .feature-media {
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
}

.feature-gif {
  width: 100%;
  height: auto;
  display: block;
}

.media-label {
  margin: 10px 0 0;
  font-size: 12px;
  color: var(--color-text-muted);
  line-height: 1.5;
  font-style: italic;
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

  .feature-title {
    text-align: center;
  }
}
</style>
