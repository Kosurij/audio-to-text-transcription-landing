<template>
  <section class="benefits" id="features">
    <div class="benefits-container">
      <div class="section-header">
        <h2 class="section-title">Everything you need to transcribe audio effortlessly.</h2>
        <p class="section-subtitle">
          Powerful features designed to make audio-to-text conversion seamless and accurate
        </p>
      </div>
      <div class="benefits-grid">
        <div class="benefit-card" v-for="benefit in benefits" :key="benefit.title">
          <div class="benefit-icon">
            <component :is="benefit.icon" />
          </div>
          <div class="benefit-text">
            <h3 class="benefit-title">{{ benefit.title }}</h3>
            <p class="benefit-description">{{ benefit.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { h } from 'vue';

const benefits = [
  {
    title: 'Lightning Fast',
    description: 'Convert audio to text in seconds, not minutes. Get instant transcriptions powered by Groq + Whisper AI.',
    icon: () => h('svg', { width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none' }, [
      h('path', { d: 'M13 2L3 14H12L11 22L21 10H12L13 2Z', fill: 'currentColor' })
    ])
  },
  {
    title: 'Highly Accurate',
    description: 'Advanced AI-powered transcription with 95%+ accuracy. Supports multiple languages and accents.',
    icon: () => h('svg', { width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none' }, [
      h('path', { d: 'M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z', fill: 'currentColor' })
    ])
  },
  {
    title: 'Multiple Formats',
    description: 'Supports FLAC, MP3, M4A, OGG, WAV, WEBM and more. Export to TXT, DOCX, and SRT.',
    icon: () => h('svg', { width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none' }, [
      h('path', { d: 'M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM16 18H8V16H16V18ZM16 14H8V12H16V14ZM13 9V3.5L18.5 9H13Z', fill: 'currentColor' })
    ])
  },
  {
    title: 'Easy to Use',
    description: 'One-click transcription. Drag and drop your audio file or record directly in the browser.',
    icon: () => h('svg', { width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none' }, [
      h('path', { d: 'M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.59L19 8L10 17Z', fill: 'currentColor' })
    ])
  },
  {
    title: 'Privacy First',
    description: 'Your audio files are processed securely. We respect your privacy and never store your data.',
    icon: () => h('svg', { width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none' }, [
      h('path', { d: 'M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 11.99H19C18.47 16.11 15.72 19.78 12 20.93V12H5V6.3L12 3.19V11.99Z', fill: 'currentColor' })
    ])
  },
  {
    title: 'Personalized Experience',
    description: 'Dark and light themes, multiple interface languages, and editable transcripts to match your workflow.',
    icon: () => h('svg', { width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none' }, [
      h('path', { d: 'M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z', fill: 'currentColor' }),
      h('path', { d: 'M12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18V6Z', fill: 'currentColor' })
    ])
  }
];
</script>

<style scoped>
.benefits {
  padding: 100px 0;
  background: transparent;
  position: relative;
}

.benefits-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
}

.section-header {
  text-align: center;
  margin-bottom: 72px;
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

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.benefit-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 28px;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.benefit-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.benefit-icon {
  width: 44px;
  height: 44px;
  background: var(--accent-primary-light);
  border: 1px solid var(--accent-primary-light-border);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  color: var(--accent-primary);
}

.benefit-title {
  font-size: 1.05rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--color-text);
}

.benefit-description {
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
  font-weight: 400;
}

@media (max-width: 900px) {
  .benefits-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .benefits {
    padding: 64px 0;
  }

  .section-header {
    margin-bottom: 48px;
  }

  .benefits-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .benefit-card {
    padding: 24px;
  }
}
</style>
