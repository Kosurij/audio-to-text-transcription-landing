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
          Upload recordings or capture microphone and browser audio, then copy or save your transcript.
        </p>

        <div class="hero-cta">
          <div class="hero-cta-row">
            <InstallButton class="hero-install-btn">
              + Add to Chrome
            </InstallButton>
            <a href="#try-transcription" class="hero-preview-btn" @click="trackPreview">
              Demo
            </a>
          </div>
        </div>

        <div class="hero-stats">
          <div class="stat">
            <span class="stat-value">8k+</span>
            <span class="stat-label">People use it every week</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-value"><span class="stat-star">★</span>{{ storeRating.value }}</span>
            <span class="stat-label">Chrome Store · {{ storeRating.count }} ratings</span>
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
            <span class="stat-value">14</span>
            <span class="stat-label">Audio & video formats</span>
          </div>
        </div>
      </div>

      <!-- Right column: floating panel -->
      <div class="hero-right">
        <div class="hero-panel">
          <img src="/hero_light.webp" alt="Extension popup with transcription" class="hero-screenshot hero-screenshot-light" fetchpriority="high" />
          <img src="/hero_dark.webp" alt="Extension popup with transcription" class="hero-screenshot hero-screenshot-dark" fetchpriority="high" />
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import InstallButton from './InstallButton.vue';
import { storeRating } from '../data/landingContent';

const trackPreview = () => {
  try {
    const analytics = (window as any).ym;
    if (typeof analytics === 'function') analytics(105283733, 'reachGoal', 'preview_hero_click');
  } catch { /* Analytics must not interrupt navigation. */ }
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

.hero-preview-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 24px;
  border-radius: 8px;
  background: transparent;
  color: var(--color-text-secondary);
  text-decoration: none;
  font-weight: 700;
  min-height: 48px;
}
.hero-preview-btn:hover { color: var(--accent-primary); text-decoration: underline; }
.hero-preview-btn:focus-visible { outline: 3px solid var(--accent-primary); outline-offset: 4px; }
.hero-cta-row .hero-install-btn { min-height: 48px; height: auto; padding: 14px 28px; border-radius: 8px; font-size: 16px; font-weight: 700; }


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

  .hero-preview-btn, .hero-cta-row .hero-install-btn {
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

  .hero-left, .hero-cta, .hero-cta-row { width: 100%; }

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
