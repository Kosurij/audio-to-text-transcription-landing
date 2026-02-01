<template>
  <section class="how-it-works" id="how-it-works">
    <div class="how-it-works-container">
      <div class="section-header">
        <h2 class="section-title">Get started in three simple steps.</h2>
      </div>

      <div class="steps">
        <div class="step" v-for="(step, index) in steps" :key="index">
          <div class="step-number">{{ index + 1 }}</div>
          <h3 class="step-title">{{ step.title }}</h3>
          <p class="step-description">{{ step.description }}</p>
        </div>
      </div>

      <!-- Demo Video -->
      <div class="demo-video-container">
        <div ref="videoContainer" class="youtube-container">
          <iframe
            v-if="videoLoaded"
            src="https://www.youtube.com/embed/Jp9s63e7xqU?autoplay=0&mute=0&controls=1&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&fs=1&cc_load_policy=0&loop=0"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            class="youtube-iframe"
          ></iframe>
          <div v-else class="video-placeholder" @click="videoLoaded = true">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <polygon points="5,3 19,12 5,21" fill="currentColor"/>
            </svg>
            <span>Watch demo</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const videoLoaded = ref(false)
const videoContainer = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!videoContainer.value) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !videoLoaded.value) {
          videoLoaded.value = true
          observer.unobserve(entry.target)
        }
      })
    },
    {
      rootMargin: '100px',
      threshold: 0.1
    }
  )

  observer.observe(videoContainer.value)

  onUnmounted(() => {
    if (videoContainer.value) {
      observer.unobserve(videoContainer.value)
    }
  })
})

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
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
}

.section-header {
  text-align: center;
  margin-bottom: 56px;
}

.section-title {
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 700;
  text-align: center;
  color: var(--color-text);
  letter-spacing: -0.02em;
}

.steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 64px;
}

.step {
  text-align: center;
  padding: 32px 24px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.step:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.step-number {
  width: 44px;
  height: 44px;
  background: var(--color-text);
  border-radius: var(--radius-full);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-background);
  margin-bottom: 16px;
}

.step-title {
  font-size: 1.15rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--color-text);
}

.step-description {
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
  font-weight: 400;
}

.demo-video-container {
  display: flex;
  justify-content: center;
}

.youtube-container {
  position: relative;
  width: 100%;
  max-width: 800px;
  aspect-ratio: 16 / 9;
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
}

.youtube-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.video-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  cursor: pointer;
  color: var(--color-text-muted);
  transition: color 0.2s ease;
  font-size: 0.95rem;
  font-weight: 500;
}

.video-placeholder:hover {
  color: var(--color-text);
}

@media (max-width: 768px) {
  .how-it-works {
    padding: 64px 0;
  }

  .section-header {
    margin-bottom: 40px;
  }

  .steps {
    grid-template-columns: 1fr;
    gap: 16px;
    margin-bottom: 48px;
  }

  .step {
    padding: 24px;
  }
}
</style>
