<template>
  <section class="benefits" id="features">
    <div class="benefits-container">
      <div class="section-header">
        <p class="section-label">Features</p>
        <h2 class="section-title">Everything you need to transcribe audio effortlessly.</h2>
        <p class="section-subtitle">
          Powerful features designed to make audio-to-text conversion seamless and accurate
        </p>
      </div>

      <div class="bento-grid">
        <!-- Large card: Lightning Fast -->
        <div class="bento-card bento-card--large">
          <div class="bento-card__content">
            <div class="bento-card__icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="currentColor" />
              </svg>
            </div>
            <h3 class="bento-card__title">Lightning Fast</h3>
            <p class="bento-card__description">Convert audio to text in seconds, not minutes. Powered by Groq + Whisper AI for instant results.</p>
          </div>
          <div class="bento-card__visual">
            <div class="visual-placeholder">
              <div class="visual-placeholder__inner">
                <svg class="visual-placeholder__icon" width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="3" width="20" height="18" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/>
                  <path d="M10 8L16 12L10 16V8Z" fill="currentColor" opacity="0.5"/>
                </svg>
                <span class="visual-placeholder__text">Interface preview</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Large card: Highly Accurate -->
        <div class="bento-card bento-card--large">
          <div class="bento-card__content">
            <div class="bento-card__icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor" />
              </svg>
            </div>
            <h3 class="bento-card__title">Highly Accurate</h3>
            <p class="bento-card__description">AI-powered transcription with 95%+ accuracy. Supports multiple languages and accents.</p>
          </div>
          <div class="bento-card__visual">
            <div class="visual-placeholder">
              <div class="visual-placeholder__inner">
                <svg class="visual-placeholder__icon" width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="3" width="20" height="18" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/>
                  <path d="M6 9H18M6 13H14M6 17H10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
                <span class="visual-placeholder__text">Interface preview</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Small card: Multiple Formats -->
        <div class="bento-card bento-card--small">
          <div class="bento-card__icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM16 18H8V16H16V18ZM16 14H8V12H16V14ZM13 9V3.5L18.5 9H13Z" fill="currentColor" />
            </svg>
          </div>
          <h3 class="bento-card__title">Multiple Formats</h3>
          <p class="bento-card__description">FLAC, MP3, M4A, OGG, WAV, WEBM and more. Export to TXT, DOCX, and SRT.</p>
        </div>

        <!-- Small card: Easy to Use -->
        <div class="bento-card bento-card--small">
          <div class="bento-card__icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.59L19 8L10 17Z" fill="currentColor" />
            </svg>
          </div>
          <h3 class="bento-card__title">Easy to Use</h3>
          <p class="bento-card__description">One-click transcription. Drag and drop your audio file or record in the browser.</p>
        </div>

        <!-- Small card: Privacy First -->
        <div class="bento-card bento-card--small">
          <div class="bento-card__icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 11.99H19C18.47 16.11 15.72 19.78 12 20.93V12H5V6.3L12 3.19V11.99Z" fill="currentColor" />
            </svg>
          </div>
          <h3 class="bento-card__title">Privacy First</h3>
          <p class="bento-card__description">Files processed securely. We never store your data.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
.benefits {
  padding: 100px 0;
  background: transparent;
  position: relative;
}

.benefits-container {
  max-width: 1360px;
  margin: 0 auto;
  padding: 0 48px;
}

.section-header {
  text-align: center;
  margin-bottom: 64px;
}

.section-label {
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-muted);
  margin-bottom: 12px;
}

.section-title {
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 700;
  text-align: center;
  margin-top: 0;
  margin-bottom: 16px;
  color: var(--color-text);
  letter-spacing: -0.02em;
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;
}

.section-subtitle {
  font-size: 1.05rem;
  text-align: center;
  color: var(--color-text-secondary);
  max-width: 480px;
  margin: 0 auto;
  font-weight: 400;
  line-height: 1.6;
}

/* Bento Grid */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
}

.bento-card--large:nth-child(1) {
  grid-column: 1 / 4;
}

.bento-card--large:nth-child(2) {
  grid-column: 4 / 7;
}

.bento-card--small:nth-child(3) {
  grid-column: 1 / 3;
}

.bento-card--small:nth-child(4) {
  grid-column: 3 / 5;
}

.bento-card--small:nth-child(5) {
  grid-column: 5 / 7;
}

/* Large cards */
.bento-card--large {
  display: flex;
  flex-direction: column;
  min-height: 380px;
}

/* Card base styles */
.bento-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 32px;
  transition: box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease;
  overflow: hidden;
  position: relative;
}

.bento-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
  border-color: var(--color-border-strong);
}

/* Large card content layout */
.bento-card--large .bento-card__content {
  flex: 0 0 auto;
  margin-bottom: 24px;
}

.bento-card--large .bento-card__title {
  font-size: 1.25rem;
}

.bento-card--large .bento-card__description {
  max-width: 320px;
}

/* Visual placeholder for GIF/screenshot */
.bento-card__visual {
  flex: 1;
  min-height: 0;
}

.visual-placeholder {
  width: 100%;
  height: 100%;
  min-height: 180px;
  background: var(--color-paper-secondary);
  border: 1px dashed var(--color-border);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
}

.bento-card:hover .visual-placeholder {
  background: var(--color-paper-tertiary);
}

.visual-placeholder__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--color-text-muted);
}

.visual-placeholder__icon {
  opacity: 0.5;
}

.visual-placeholder__text {
  font-size: 0.8rem;
  font-weight: 500;
  opacity: 0.6;
}

/* Icon */
.bento-card__icon {
  width: 40px;
  height: 40px;
  background: var(--accent-primary-light);
  border: 1px solid var(--accent-primary-light-border);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  color: var(--accent-primary);
}

/* Title & Description */
.bento-card__title {
  font-size: 1.05rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--color-text);
  letter-spacing: -0.01em;
}

.bento-card__description {
  font-size: 0.88rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
  font-weight: 400;
}

/* Small cards */
.bento-card--small {
  padding: 28px;
}

/* Responsive */
@media (max-width: 900px) {
  .bento-grid {
    grid-template-columns: 1fr 1fr;
  }

  .bento-card--large:nth-child(1),
  .bento-card--large:nth-child(2) {
    grid-column: span 1;
  }

  .bento-card--small:nth-child(3) {
    grid-column: 1 / 2;
  }

  .bento-card--small:nth-child(4) {
    grid-column: 2 / 3;
  }

  .bento-card--small:nth-child(5) {
    grid-column: 1 / 3;
  }

  .bento-card--large {
    min-height: 320px;
  }
}

@media (max-width: 600px) {
  .benefits {
    padding: 64px 0;
  }

  .section-header {
    margin-bottom: 40px;
  }

  .bento-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .bento-card--large:nth-child(1),
  .bento-card--large:nth-child(2),
  .bento-card--small:nth-child(3),
  .bento-card--small:nth-child(4),
  .bento-card--small:nth-child(5) {
    grid-column: 1;
  }

  .bento-card {
    padding: 24px;
    border-radius: var(--radius-lg);
  }

  .bento-card--large {
    min-height: auto;
  }

  .visual-placeholder {
    min-height: 140px;
  }
}
</style>
