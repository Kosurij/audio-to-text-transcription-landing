<template>
  <section class="hero">
    <div class="hero-inner">
      <div class="hero-text">
        <h1 class="headline">
          Focus on the conversation,<br />let AI handle the notes.
        </h1>
        <p class="subtitle">
          Get real-time transcriptions and instant AI summaries — ensuring you
          always capture every detail from meetings, lectures, podcasts, and more.
        </p>
        <div class="hero-actions">
          <div class="cta-group">
            <InstallButton class="hero-cta" />
            <span class="platform-label">Works on any website in your browser</span>
          </div>
        </div>
      </div>
      <div class="hero-mockup">
        <MockupTranscription />
      </div>
    </div>
    <div class="hero-metrics">
      <div class="metrics-inner">
        <div class="metric-card">
          <span class="metric-value">Groq + Whisper</span>
          <span class="metric-desc">Lightning-fast AI that turns speech into text in seconds</span>
        </div>
        <div class="metric-card">
          <span class="metric-value">11,000+</span>
          <span class="metric-desc">Audio files transcribed by our users every week</span>
        </div>
        <div class="metric-card">
          <span class="metric-value">2 modes</span>
          <span class="metric-desc">Drop a file or hit record — your transcript is seconds away</span>
        </div>
        <div class="metric-card">
          <div class="metric-rating">
            <span class="metric-value">5.0</span>
            <div class="stars">
              <svg v-for="i in 5" :key="i" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
          </div>
          <span class="metric-desc">Based on <a href="https://chromewebstore.google.com/detail/audio-to-text-transcripti/pkfoaaglghblmjjjpbniicjcpehfbmgd/reviews?hl=en" target="_blank" rel="noopener" class="metric-link">11+ reviews</a> on Chrome Web Store</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import InstallButton from './InstallButton.vue'
import MockupTranscription from './MockupTranscription.vue'

</script>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  padding: 200px 0 0;
}

.hero-inner {
  position: relative;
  z-index: 1;
  max-width: 1360px;
  margin: 0 auto;
  padding: 0 48px;
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 48px;
  align-items: center;
}

.hero-text {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.headline {
  font-family: 'Figtree', sans-serif;
  font-size: clamp(2.75rem, 5vw, 3.5rem);
  font-weight: 500;
  line-height: 1.12;
  letter-spacing: -0.02em;
  color: var(--color-text);
  margin: 0;
}

.subtitle {
  font-size: clamp(1rem, 1.8vw, 1.15rem);
  color: var(--color-text-secondary);
  line-height: 1.7;
  max-width: 520px;
  margin: 0;
  font-weight: 400;
}

.hero-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.cta-group {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.hero-cta {
  font-size: 16px;
  padding: 14px 32px;
  height: 52px;
  border-radius: var(--radius-full);
}

.platform-label {
  font-size: 13px;
  color: var(--color-text-muted);
  font-weight: 400;
}

.hero-mockup {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Metrics */
.hero-metrics {
  margin-top: 80px;
  padding: 0 0 40px;
}

.metrics-inner {
  max-width: 1360px;
  margin: 0 auto;
  padding: 0 48px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.metric-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 28px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.metric-value {
  font-family: 'Figtree', sans-serif;
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  font-weight: 600;
  color: var(--color-text);
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.metric-desc {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  line-height: 1.5;
  font-weight: 400;
}

.metric-rating {
  display: flex;
  align-items: center;
  gap: 10px;
}

.stars {
  display: flex;
  gap: 2px;
  color: #F59E0B;
}

.metric-link {
  color: var(--color-text-secondary);
  text-decoration: underline;
  text-underline-offset: 2px;
  transition: color 0.2s ease;
}

.metric-link:hover {
  color: var(--color-text);
}

@media (max-width: 900px) {
  .hero {
    padding: 120px 0 0;
  }

  .hero-inner {
    grid-template-columns: 1fr;
    gap: 48px;
    padding: 0 24px;
  }

  .hero-text {
    text-align: center;
    align-items: center;
  }

  .subtitle {
    max-width: 100%;
  }

  .hero-cta {
    align-self: center;
  }

  .hero-mockup {
    max-width: 480px;
    margin: 0 auto;
    width: 100%;
  }

  .hero-metrics {
    margin-top: 48px;
  }

  .metrics-inner {
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    padding: 0 24px;
  }
}

@media (max-width: 480px) {
  .hero-cta {
    width: 100%;
    justify-content: center;
    align-self: stretch;
  }

  .metrics-inner {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
