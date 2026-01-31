<template>
  <section class="how-it-works" id="how-it-works">
    <div class="how-it-works-container">
      <div class="section-header">
        <h2 class="section-title">How it works</h2>
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
        </div>
      </div>

      <div class="steps">
        <div class="step" v-for="(step, index) in steps" :key="index">
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-content">
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-description">{{ step.description }}</p>
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
    description: 'Add Audio To Text Transcription to your Chrome browser with one click. No registration required.'
  },
  {
    title: 'Upload or Record Audio',
    description: 'Drag and drop your audio file or record directly from your microphone. Supports all major audio formats.'
  },
  {
    title: 'Get Your Transcription',
    description: 'Receive accurate text transcriptions instantly. Copy, edit, or export in your preferred format.'
  }
];
</script>

<style scoped>
.how-it-works {
  padding: 80px 0;
  background: var(--color-background);
  position: relative;
}

.how-it-works-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.section-header {
  text-align: center;
  margin-bottom: 48px;
}

.section-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  text-align: center;
  color: var(--color-text);
  letter-spacing: -0.02em;
}

.demo-video-container {
  display: flex;
  justify-content: center;
  margin-bottom: 56px;
}

.youtube-container {
  position: relative;
  width: 100%;
  max-width: 900px;
  height: 500px;
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
  border-radius: var(--radius-xl);
}

.steps {
  display: flex;
  flex-direction: row;
  gap: 24px;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 20px;
  flex: 1;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 32px 24px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.step:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.step-number {
  width: 48px;
  height: 48px;
  background: var(--accent-primary);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text);
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: var(--color-text);
}

.step-description {
  font-size: 0.95rem;
  line-height: 1.65;
  color: var(--color-text-secondary);
  font-weight: 400;
}

@media (max-width: 768px) {
  .how-it-works {
    padding: 56px 0;
  }

  .section-header {
    margin-bottom: 32px;
  }

  .demo-video-container {
    margin-bottom: 40px;
  }

  .youtube-container {
    max-width: 100%;
    height: 300px;
  }

  .steps {
    flex-direction: column;
  }

  .step {
    padding: 28px;
  }
}
</style>
