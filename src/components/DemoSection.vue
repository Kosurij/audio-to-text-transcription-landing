<template>
  <section class="demo" id="demo">
    <div class="demo-container">
      <div class="section-header">
        <h2 class="section-title">See it in action</h2>
        <p class="section-subtitle">From upload to transcript in under 30 seconds</p>
      </div>

      <div ref="videoContainer" class="youtube-wrapper">
        <iframe
          v-if="videoLoaded"
          src="https://www.youtube.com/embed/Jp9s63e7xqU?autoplay=0&mute=0&controls=1&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&fs=1&cc_load_policy=0&loop=0"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          class="youtube-iframe"
        ></iframe>
        <div v-else class="youtube-placeholder">
          <div class="placeholder-icon">▶</div>
          <div class="placeholder-text">Loading video...</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const videoLoaded = ref(false)
const videoContainer = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!videoContainer.value) return
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !videoLoaded.value) {
          videoLoaded.value = true
          observer?.unobserve(entry.target)
        }
      })
    },
    { rootMargin: '100px', threshold: 0.1 }
  )
  observer.observe(videoContainer.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<style scoped>
.demo {
  padding: 80px 0;
  background: var(--color-surface);
}

.demo-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 24px;
}

.section-header {
  text-align: center;
  margin-bottom: 48px;
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
  margin: 0;
}

.youtube-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.15);
}

html[data-theme='dark'] .youtube-wrapper {
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
}

.youtube-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.youtube-placeholder {
  width: 100%;
  height: 100%;
  background: var(--color-surface-elevated);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.placeholder-icon {
  font-size: 48px;
  color: var(--color-text-muted);
}

.placeholder-text {
  font-size: 14px;
  color: var(--color-text-muted);
}

@media (max-width: 768px) {
  .demo {
    padding: 60px 0;
  }
}
</style>
