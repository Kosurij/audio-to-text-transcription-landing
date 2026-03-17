<template>
  <section class="hero">
    <div class="hero-container">

      <!-- Left column -->
      <div class="hero-left">
        <div class="hero-badge">
          ✦ Powered by Groq + Whisper AI
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
              + Add to Chrome — It's free
            </InstallButton>
            <a href="#demo" class="watch-demo-btn" @click.prevent="scrollToDemo">
              ▶ Watch Demo
            </a>
          </div>
          <p class="hero-cta-hint">No account required · Works in Chrome</p>
        </div>

        <div class="hero-stats">
          <div class="stat">
            <span class="stat-value">1.2k+</span>
            <span class="stat-label">Weekly Active Users</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-value">★ 5.0</span>
            <span class="stat-label">Chrome Store</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-value">99%</span>
            <span class="stat-label">Accuracy</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-value">90+</span>
            <span class="stat-label">Languages</span>
          </div>
        </div>
      </div>

      <!-- Right column: floating panel -->
      <div class="hero-right">
        <div class="hero-panel">
          <!-- Placeholder: replace with actual GIF of the extension -->
          <div class="hero-panel-placeholder">
            <div class="placeholder-label">Extension UI Preview</div>
            <div class="placeholder-note">Replace with actual GIF/screenshot</div>
          </div>
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
  padding: 80px 0 60px;
  background: var(--color-background);
  overflow: hidden;
}

.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  gap: 64px;
}

/* Left column */
.hero-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #EFF6FF; /* blue-50 — intentional brand badge color */
  border: 1px solid #BFDBFE; /* blue-200 */
  border-radius: 100px;
  padding: 5px 14px;
  font-size: 13px;
  font-weight: 600;
  color: var(--accent-primary); /* uses CSS token, flips in dark mode */
  width: fit-content;
}

html[data-theme='dark'] .hero-badge {
  background: rgba(59, 130, 246, 0.1); /* dark blue tint */
  border-color: rgba(59, 130, 246, 0.25);
  /* color: var(--accent-primary) already handles dark (#3B82F6) */
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
  color: var(--accent-primary);
  text-decoration: none;
  padding: 8px 4px;
  border-bottom: 2px solid transparent;
  transition: border-color 0.2s ease;
}

.watch-demo-btn:hover {
  border-bottom-color: var(--accent-primary);
}

html[data-theme='dark'] .hero-install-btn {
  box-shadow: 0 4px 14px rgba(59, 130, 246, 0.35);
}

.hero-cta-hint {
  font-size: 13px;
  color: var(--color-text-muted);
  margin: 0;
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: 20px;
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
  color: var(--color-text-muted);
}

.stat-divider {
  width: 1px;
  height: 32px;
  background: var(--color-border);
}

/* Right column */
.hero-right {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-panel {
  background: var(--color-surface-elevated);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%;
  max-width: 440px;
}

html[data-theme='dark'] .hero-panel {
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.4);
}

/* Placeholder — replace with img when real GIF is ready */
.hero-panel-placeholder {
  aspect-ratio: 3 / 4;
  background: var(--color-surface);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.placeholder-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-secondary);
}

.placeholder-note {
  font-size: 12px;
  color: var(--color-text-muted);
}

/* Mobile */
@media (max-width: 768px) {
  .hero {
    padding: 60px 0 40px;
  }

  .hero-container {
    flex-direction: column;
    gap: 40px;
  }

  .hero-left {
    gap: 20px;
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

  .hero-right {
    width: 100%;
  }

  .hero-panel {
    max-width: 100%;
  }
}
</style>
