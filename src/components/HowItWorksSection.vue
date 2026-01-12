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

// Intersection Observer для ленивой загрузки при скролле
onMounted(() => {
  if (!videoContainer.value) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !videoLoaded.value) {
          // Загружаем видео когда пользователь доскроллил до него
          videoLoaded.value = true
          observer.unobserve(entry.target)
        }
      })
    },
    {
      rootMargin: '100px', // Загружаем за 100px до появления в viewport
      threshold: 0.1
    }
  )

  observer.observe(videoContainer.value)

  // Cleanup
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
  padding: 60px 0;
  background: var(--gradient-bg);
  position: relative;
}

.how-it-works-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-title {
  font-size: clamp(40px, 6vw, 64px);
  font-weight: 800;
  text-align: center;
  color: var(--color-text);
  letter-spacing: -0.03em;
}

.demo-video-container {
  display: flex;
  justify-content: center;
  margin-bottom: 60px;
}

.youtube-container {
  position: relative;
  width: 100%;
  max-width: 900px;
  height: 500px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  background: var(--color-surface-elevated);
}

.youtube-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 16px;
}

.gradient-text {
  background: var(--gradient-primary);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
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
  background: var(--color-surface-elevated);
  background-image: var(--gradient-bg-subtle);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 32px 24px;
}

.step-number {
  width: 50px;
  height: 50px;
  background: var(--gradient-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 800;
  color: white;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 12px;
  color: var(--color-text);
}

.step-description {
  font-size: 17px;
  line-height: 1.7;
  color: var(--color-text-secondary);
  font-weight: 400;
}

@media (max-width: 768px) {
  .how-it-works {
    padding: 40px 0;
  }

  .section-header {
    margin-bottom: 40px;
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
    padding: 32px;
  }
}
</style>
