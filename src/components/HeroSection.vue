<template>
  <section class="hero">
    <div class="hero-bg">
      <div class="hero-gradient" />
    </div>
    <div class="hero-inner">
      <div class="hero-text">
        <h1 class="headline">
          Focus on the Conversation.
          <span class="headline-accent">AI Handles the Rest.</span>
        </h1>
        <p class="subtitle">
          Real-time transcription, smart summaries, and instant insights
          from any audio — meetings, lectures, podcasts, and more.
        </p>
        <div class="hero-actions">
          <InstallButton class="hero-cta" />
          <a
            href="#how-it-works"
            class="outline-btn"
            @click.prevent="scrollTo('how-it-works')"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <polygon points="5,3 19,12 5,21" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/>
            </svg>
            See How It Works
          </a>
        </div>
        <div class="platform-badges">
          <div class="badges-row">
            <svg class="badge-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
              <path d="M12 2a10 10 0 0 1 0 20" fill="currentColor" opacity="0.15"/>
            </svg>
            <span class="badge-label">Chrome</span>
            <span class="badge-sep" />
            <svg class="badge-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/>
              <path d="M8 12h8M12 9v6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            <span class="badge-label">Google Meet</span>
            <span class="badge-sep" />
            <svg class="badge-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="6" width="20" height="12" rx="3" stroke="currentColor" stroke-width="1.5"/>
              <path d="M10 9l4 3-4 3V9z" fill="currentColor"/>
            </svg>
            <span class="badge-label">Zoom</span>
            <span class="badge-sep" />
            <svg class="badge-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M4 6h16v12H4z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
              <path d="M9 10v4M12 8v8M15 10v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            <span class="badge-label">MS Teams</span>
          </div>
          <span class="badges-text">Works with your favorite tools</span>
        </div>
      </div>
      <div class="hero-mockup">
        <MockupTranscription />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import InstallButton from './InstallButton.vue'
import MockupTranscription from './MockupTranscription.vue'

const scrollTo = (id: string) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  padding: 140px 0 80px;
}

.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.hero-gradient {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 60% 50% at 30% 0%, rgba(124, 92, 252, 0.10) 0%, transparent 70%),
    radial-gradient(ellipse 40% 60% at 80% 20%, rgba(155, 133, 253, 0.06) 0%, transparent 70%);
}

html[data-theme='dark'] .hero-gradient {
  background:
    radial-gradient(ellipse 60% 50% at 30% 0%, rgba(124, 92, 252, 0.08) 0%, transparent 70%),
    radial-gradient(ellipse 40% 60% at 80% 20%, rgba(155, 133, 253, 0.04) 0%, transparent 70%);
}

.hero-inner {
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 32px;
  display: grid;
  grid-template-columns: 55% 45%;
  gap: 48px;
  align-items: center;
}

.hero-text {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.headline {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(2.75rem, 5.5vw, 4.25rem);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -0.03em;
  color: var(--color-text);
  margin: 0;
}

.headline-accent {
  background: linear-gradient(135deg, #7C5CFC 0%, #9B85FD 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.subtitle {
  font-size: clamp(1.05rem, 2vw, 1.2rem);
  color: var(--color-text-secondary);
  line-height: 1.7;
  max-width: 520px;
  margin: 0;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.hero-cta {
  font-size: 16px;
  padding: 14px 28px;
  height: 52px;
}

.outline-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 600;
  padding: 14px 24px;
  height: 52px;
  border-radius: var(--radius-md);
  border: 2px solid var(--button-outline-border);
  color: var(--button-outline-text);
  background: transparent;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.outline-btn:hover {
  background: var(--button-outline-hover-bg);
  color: var(--button-outline-hover-text);
}

.platform-badges {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
}

.badges-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.badge-icon {
  color: var(--color-text-muted);
  flex-shrink: 0;
}

.badge-label {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-muted);
}

.badge-sep {
  width: 1px;
  height: 16px;
  background: var(--color-border);
}

.badges-text {
  font-size: 12px;
  color: var(--color-text-muted);
}

.hero-mockup {
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 900px) {
  .hero {
    padding: 120px 0 60px;
  }

  .hero-inner {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 0 20px;
  }

  .hero-text {
    text-align: center;
    align-items: center;
  }

  .subtitle {
    max-width: 100%;
  }

  .hero-actions {
    justify-content: center;
  }

  .badges-row {
    justify-content: center;
  }

  .badges-text {
    text-align: center;
  }

  .hero-mockup {
    max-width: 480px;
    margin: 0 auto;
    width: 100%;
  }
}

@media (max-width: 480px) {
  .hero-actions {
    flex-direction: column;
    width: 100%;
  }

  .hero-cta,
  .outline-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
