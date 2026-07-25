<template>
  <section class="hero">
    <div class="hero-container">

      <!-- Left column -->
      <div class="hero-left">
        <div class="hero-badge">
          ✦ Powered by AI
        </div>

        <h1 class="hero-title">
          Audio to Text<br />
          <span class="gradient-text">in seconds.</span>
        </h1>

        <p class="hero-subtitle">
          Chrome extension for meetings, interviews and lectures.
          Upload audio files, record mic or browser tab — get accurate text instantly.
        </p>

        <div class="hero-cta">
          <div class="hero-cta-row">
            <InstallButton class="hero-install-btn">
              + Add to Chrome
            </InstallButton>
            <a href="#demo" class="watch-demo-btn" @click.prevent="scrollToDemo">
              ▶ Watch Demo
            </a>
          </div>
        </div>

        <div class="hero-stats">
          <div class="stat">
            <span class="stat-value">3k+</span>
            <span class="stat-label">People use it every week</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-value"><span class="stat-star">★</span>4.9</span>
            <span class="stat-label">Rating on Chrome Store</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-value">99%</span>
            <span class="stat-label">Transcription accuracy</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-value">90+</span>
            <span class="stat-label">Languages supported</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-value">20+</span>
            <span class="stat-label">Audio & video formats</span>
          </div>
        </div>
      </div>

      <!-- Right column: floating panel -->
      <div class="hero-right">
        <div class="hero-panel">
          <img src="/hero_light.webp" alt="Extension popup with transcription" class="hero-screenshot hero-screenshot-light" />
          <img src="/hero_dark.webp" alt="Extension popup with transcription" class="hero-screenshot hero-screenshot-dark" />
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import InstallButton from './InstallButton.vue';

const scrollToDemo = () => {
  document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.hero {
  padding-top: 32px;
  background: var(--color-background);
  overflow: hidden;
}

.hero-container {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  gap: 64px;
}

/* Left column — несёт вертикальные отступы секции */
.hero-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 80px 0 60px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: linear-gradient(135deg, #7C3AED 0%, #EC4899 100%);
  border: none;
  border-radius: 100px;
  padding: 5px 14px;
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  width: fit-content;
}

html[data-theme='dark'] .hero-badge {
  background: linear-gradient(135deg, #8B5CF6 0%, #F472B6 100%);
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.04em;
  color: var(--color-text);
  margin: 0;
}

.gradient-text {
  background: var(--gradient-primary);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.hero-subtitle {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
  max-width: 480px;
  margin: 0;
}

.hero-cta {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.hero-cta-row {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.hero-install-btn {
  font-size: 16px;
  font-weight: 700;
  padding: 14px 28px;
  border-radius: 8px;
  width: fit-content;
  height: auto; /* override InstallButton's internal height: 36px */
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.3);
}

.watch-demo-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text-secondary);
  text-decoration: none;
  padding: 8px 4px;
  border-bottom: 2px solid transparent;
  transition: color 0.2s ease, border-color 0.2s ease;
}

.watch-demo-btn:hover {
  color: var(--color-text);
  border-bottom-color: var(--color-text);
}

html[data-theme='dark'] .hero-install-btn {
  box-shadow: 0 4px 14px rgba(59, 130, 246, 0.35);
}


.hero-stats {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-top: 20px;
  border-top: 1px solid var(--color-border);
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stat-value {
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--color-text);
}

.stat-label {
  font-size: 12px;
  color: var(--color-text-secondary);
}

.stat-star {
  color: #F59E0B;
}

.stat-divider {
  width: 1px;
  height: 32px;
  background: var(--color-border);
}

/* Right column */
.hero-right {
  flex: 1.3;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-panel {
  width: 100%;
  mask-image: radial-gradient(ellipse 90% 90% at 50% 50%, black 55%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 90% 90% at 50% 50%, black 55%, transparent 100%);
}

html[data-theme='dark'] .hero-panel {
  mask-image: radial-gradient(ellipse 70% 70% at 55% 50%, black 30%, transparent 75%);
  -webkit-mask-image: radial-gradient(ellipse 70% 70% at 55% 50%, black 30%, transparent 75%);
}

.hero-screenshot {
  width: 100%;
  height: auto;
  border-radius: 16px;
}

.hero-screenshot-dark {
  display: none;
}

html[data-theme='dark'] .hero-screenshot-light {
  display: none;
}

html[data-theme='dark'] .hero-screenshot-dark {
  display: block;
}


/* Mobile */
@media (max-width: 768px) {
  .hero-container {
    flex-direction: column;
    gap: 40px;
  }

  .hero-left {
    padding: 60px 0 0;
    gap: 20px;
  }

  .hero-right {
    align-self: auto;
  }

  .hero-title {
    font-size: 2.25rem;
  }

  .hero-install-btn {
    width: 100%;
    max-width: 320px;
    text-align: center;
    justify-content: center;
  }

  .hero-cta-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .watch-demo-btn {
    align-self: center;
  }

  .hero-stats {
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-top: none;
    padding-top: 0;
    margin-top: 4px;
  }

  .stat-divider {
    display: none;
  }

  .stat {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    padding: 16px 20px;
    background: var(--color-surface);
    border-radius: 12px;
    width: 100%;
  }

  .stat-value {
    font-size: 2rem;
    font-weight: 800;
    flex-shrink: 0;
    width: 80px;
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  .stat-label {
    font-size: 14px;
    color: var(--color-text-secondary);
    text-align: left;
  }

  .hero-right {
    width: 100%;
  }

  .hero-screenshot {
    max-height: 400px;
    object-fit: contain;
  }

  .hero-panel {
    max-width: 100%;
  }
}
</style>
