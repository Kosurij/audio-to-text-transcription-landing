<template>
  <section class="how-it-works" id="how-it-works">
    <div class="how-it-works-container">
      <div class="section-header">
        <p class="section-label">How it works</p>
        <h2 class="section-title">Get started in three simple steps.</h2>
        <p class="section-subtitle">
          Install, upload, and get your transcript. It's that simple.
        </p>
      </div>

      <div class="bento-grid">
        <!-- Steps cards (left side) -->
        <div class="bento-card bento-card--step" v-for="(step, index) in steps" :key="index">
          <div class="bento-card__icon">
            <span class="step-number">{{ index + 1 }}</span>
          </div>
          <h3 class="bento-card__title">{{ step.title }}</h3>
          <p class="bento-card__description">{{ step.description }}</p>
        </div>

        <!-- Demo Video card (right side) -->
        <div class="bento-card bento-card--video">
          <iframe
            src="https://www.youtube.com/embed/Jp9s63e7xqU?autoplay=0&mute=0&controls=1&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&fs=1&cc_load_policy=0&loop=0"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            loading="lazy"
            class="video-iframe"
          ></iframe>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const steps = [
  {
    title: 'Install the Extension',
    description: 'Add Audio To Text Transcription to Chrome with one click. No registration required.'
  },
  {
    title: 'Upload or Record',
    description: 'Drag and drop an audio file or record directly from your microphone or browser tab.'
  },
  {
    title: 'Get Your Transcript',
    description: 'Receive accurate text instantly. Copy, edit, or export in your preferred format.'
  }
];
</script>

<style scoped>
.how-it-works {
  padding: 100px 0;
  background: transparent;
  position: relative;
}

.how-it-works-container {
  max-width: 1360px;
  margin: 0 auto;
  padding: 0 48px;
}

.section-header {
  text-align: center;
  margin-bottom: 64px;
}

.section-label {
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-muted);
  margin-bottom: 12px;
}

.section-title {
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 700;
  text-align: center;
  margin-top: 0;
  margin-bottom: 16px;
  color: var(--color-text);
  letter-spacing: -0.02em;
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;
}

.section-subtitle {
  font-size: 1.05rem;
  text-align: center;
  color: var(--color-text-secondary);
  max-width: 480px;
  margin: 0 auto;
  font-weight: 400;
  line-height: 1.6;
}

/* Bento Grid */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
}

/* Step cards positioning */
.bento-card--step:nth-child(1) {
  grid-column: 1 / 3;
  grid-row: 1;
}

.bento-card--step:nth-child(2) {
  grid-column: 1 / 3;
  grid-row: 2;
}

.bento-card--step:nth-child(3) {
  grid-column: 1 / 3;
  grid-row: 3;
}

/* Video card positioning */
.bento-card--video {
  grid-column: 3 / 7;
  grid-row: 1 / 4;
}

/* Card base styles */
.bento-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 28px;
  overflow: hidden;
  position: relative;
}

/* Step card styles */
.bento-card--step .bento-card__icon {
  width: 40px;
  height: 40px;
  background: var(--accent-primary-light);
  border: 1px solid var(--accent-primary-light-border);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.step-number {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--accent-primary);
}

.bento-card__title {
  font-size: 1.05rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--color-text);
  letter-spacing: -0.01em;
}

.bento-card__description {
  font-size: 0.88rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
  font-weight: 400;
}

/* Video card styles */
.bento-card--video {
  padding: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.video-iframe {
  width: 100%;
  height: 100%;
  border: none;
  min-height: 400px;
}

/* Responsive */
@media (max-width: 900px) {
  .bento-grid {
    grid-template-columns: 1fr 1fr;
  }

  .bento-card--step:nth-child(1) {
    grid-column: 1 / 2;
    grid-row: 1;
  }

  .bento-card--step:nth-child(2) {
    grid-column: 2 / 3;
    grid-row: 1;
  }

  .bento-card--step:nth-child(3) {
    grid-column: 1 / 3;
    grid-row: 2;
  }

  .bento-card--video {
    grid-column: 1 / 3;
    grid-row: 3;
    min-height: 300px;
  }

  .video-iframe {
    min-height: 300px;
  }
}

@media (max-width: 600px) {
  .how-it-works {
    padding: 64px 0;
  }

  .how-it-works-container {
    padding: 0 24px;
  }

  .section-header {
    margin-bottom: 40px;
  }

  .bento-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .bento-card--step:nth-child(1),
  .bento-card--step:nth-child(2),
  .bento-card--step:nth-child(3) {
    grid-column: 1;
    grid-row: auto;
  }

  .bento-card--video {
    grid-column: 1;
    grid-row: auto;
    min-height: 240px;
  }

  .video-iframe {
    min-height: 240px;
  }

  .bento-card {
    padding: 24px;
    border-radius: var(--radius-lg);
  }

  .bento-card--video {
    padding: 0;
  }
}
</style>
