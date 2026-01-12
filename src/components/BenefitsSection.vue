<template>
  <section class="benefits" id="features">
    <div class="benefits-container">
      <div class="section-header">
        <h2 class="section-title">Features</h2>
        <p class="section-subtitle">
          Powerful features designed to make audio-to-text conversion seamless and accurate
        </p>
      </div>
      <div class="benefits-grid">
        <div class="benefit-card" v-for="benefit in benefits" :key="benefit.title">
          <div class="benefit-icon">
            <component :is="benefit.icon" />
          </div>
          <h3 class="benefit-title">{{ benefit.title }}</h3>
          <p class="benefit-description">{{ benefit.description }}</p>
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
    description: 'Convert audio to text in seconds, not minutes. Get instant transcriptions for any audio file.',
    icon: () => h('svg', { width: '32', height: '32', viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, [
      h('path', { d: 'M13 2L3 14H12L11 22L21 10H12L13 2Z', fill: 'currentColor' })
    ])
  },
  {
    title: 'Highly Accurate',
    description: 'Advanced AI-powered transcription with 95%+ accuracy. Supports multiple languages and accents.',
    icon: () => h('svg', { width: '32', height: '32', viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, [
      h('path', { d: 'M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z', fill: 'currentColor' })
    ])
  },
  {
    title: 'Multiple Formats',
    description: 'Supports FLAC, MP3, M4A, MPEG, MPGA, OGG, WAV, WEBM and more. Export to TXT, DOCX, and SRT.',
    icon: () => h('svg', { width: '32', height: '32', viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, [
      h('path', { d: 'M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM16 18H8V16H16V18ZM16 14H8V12H16V14ZM13 9V3.5L18.5 9H13Z', fill: 'currentColor' })
    ])
  },
  {
    title: 'Easy to Use',
    description: 'One-click transcription. Simply drag and drop your audio file or record directly in the browser.',
    icon: () => h('svg', { width: '32', height: '32', viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, [
      h('path', { d: 'M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z', fill: 'currentColor' })
    ])
  },
  {
    title: 'Privacy First',
    description: 'Your audio files are processed securely. We respect your privacy and never store your data.',
    icon: () => h('svg', { width: '32', height: '32', viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, [
      h('path', { d: 'M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 11.99H19C18.47 16.11 15.72 19.78 12 20.93V12H5V6.3L12 3.19V11.99Z', fill: 'currentColor' })
    ])
  },
  {
    title: 'Personalized Experience',
    description: 'Choose between dark and light themes. Support for multiple interface languages to match your preferences.',
    icon: () => h('svg', { width: '32', height: '32', viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, [
      h('path', { d: 'M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z', fill: 'currentColor' }),
      h('path', { d: 'M12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18V6Z', fill: 'currentColor' })
    ])
  }
];
</script>

<style scoped>
.benefits {
  padding: 60px 0;
  background: var(--gradient-bg-subtle);
  position: relative;
}

.benefits-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-header {
  text-align: center;
  margin-bottom: 80px;
}

.section-title {
  font-size: clamp(40px, 6vw, 64px);
  font-weight: 800;
  text-align: center;
  margin-top: 0;
  margin-bottom: 24px;
  color: var(--color-text);
  letter-spacing: -0.03em;
}

.gradient-text {
  background: var(--gradient-primary);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.section-subtitle {
  font-size: 20px;
  text-align: center;
  color: var(--color-text-secondary);
  max-width: 600px;
  margin: 0 auto;
  font-weight: 400;
  line-height: 1.6;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
}

.benefit-card {
  background: var(--color-surface-elevated);
  background-image: var(--gradient-bg-subtle);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 32px;
  box-shadow: var(--shadow-sm);
}

.benefit-icon {
  width: 48px;
  height: 48px;
  background: var(--color-surface);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  color: var(--accent-primary);
}

.benefit-title {
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 12px;
  color: var(--color-text);
}

.benefit-description {
  font-size: 16px;
  line-height: 1.6;
  color: var(--color-text-secondary);
  font-weight: 400;
}

.formats {
  margin-top: 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

@media (max-width: 768px) {
  .benefits {
    padding: 40px 0;
  }

  .section-header {
    margin-bottom: 48px;
  }

  .benefits-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .benefit-card {
    padding: 32px;
  }
}
</style>
