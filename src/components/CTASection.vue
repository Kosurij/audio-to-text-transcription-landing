<template>
  <section class="cta">
    <div class="cta-background">
      <div class="cta-gradient"></div>
    </div>
    <div class="cta-container">
      <div class="cta-content">
        <h2 class="cta-title">
          Ready to Transform Your Audio?
        </h2>
        <p class="cta-subtitle">
          Join thousands of users who are already boosting their productivity with Audio To Text Transcription
        </p>
        <InstallButton class="cta-button">
          Install Free Extension
        </InstallButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import InstallButton from './InstallButton.vue';
</script>

<style scoped>
.cta {
  padding: 80px 0;
  position: relative;
  background: transparent;
  overflow: hidden;
}

.cta-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.cta-gradient {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1000px;
  height: 1000px;
  background: radial-gradient(circle, rgba(30, 27, 24, 0.04) 0%, rgba(30, 27, 24, 0.02) 40%, transparent 65%);
  border-radius: 50%;
  filter: blur(40px);
}

html[data-theme='dark'] .cta-gradient {
  background: radial-gradient(circle, rgba(245, 241, 235, 0.06) 0%, transparent 50%);
}

.cta-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  z-index: 1;
}

.cta-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 56px 48px;
  box-shadow: var(--shadow-md);
}

.cta-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  color: var(--color-text);
  margin: 0;
  letter-spacing: -0.02em;
}

.cta-subtitle {
  font-size: 1.1rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  max-width: 520px;
  font-weight: 400;
}

.cta-button {
  font-size: 17px;
  font-weight: 600;
  padding: 16px 40px;
  border-radius: var(--radius-md);
  height: 56px;
  margin-top: 8px;
}

@media (max-width: 768px) {
  .cta {
    padding: 56px 20px;
  }

  .cta-content {
    padding: 40px 28px;
  }

  .cta-button {
    font-size: 16px;
    padding: 14px 32px;
    height: 52px;
  }
}

@media (max-width: 600px) {
  .cta-content {
    padding: 32px 24px;
    gap: 16px;
  }

  .cta-button {
    width: 100%;
    max-width: 320px;
    font-size: 15px;
    padding: 8px;
  }
}
</style>
