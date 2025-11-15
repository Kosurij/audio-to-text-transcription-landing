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
        <p class="cta-note">
          Free forever • No credit card required • Install in seconds
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import InstallButton from './InstallButton.vue';
</script>

<style scoped>
.cta {
  padding: 120px 20px;
  position: relative;
  background: var(--gradient-bg);
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
  width: 1200px;
  height: 1200px;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.1) 50%, transparent 70%);
  border-radius: 50%;
  filter: blur(60px);
}

.cta-container {
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.cta-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
  background: var(--color-surface-elevated);
  background-image: var(--gradient-bg-subtle);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 80px 60px;
  box-shadow: var(--shadow-md);
}

.cta-title {
  font-size: clamp(36px, 6vw, 56px);
  font-weight: 800;
  color: var(--color-text);
  margin: 0;
  letter-spacing: -0.03em;
}

.cta-subtitle {
  font-size: 20px;
  color: var(--color-text-secondary);
  line-height: 1.6;
  max-width: 600px;
  font-weight: 400;
}

.cta-button {
  font-size: 20px;
  font-weight: 600;
  padding: 20px 48px;
  border-radius: 16px;
  height: 64px;
  margin-top: 8px;
}

.cta-note {
  font-size: 14px;
  color: var(--color-text-muted);
  font-weight: 500;
  margin-top: 8px;
}

@media (max-width: 768px) {
  .cta {
    padding: 40px 20px;
  }

  .cta-content {
    padding: 48px 32px;
  }

  .cta-title {
    font-size: 32px;
  }

  .cta-subtitle {
    font-size: 18px;
  }

  .cta-button {
    font-size: 18px;
    padding: 18px 36px;
    height: 56px;
  }
}

@media (max-width: 600px) {
  .cta-content {
    padding: 40px 24px;
    gap: 28px;
  }

  .cta-button {
    width: 100%;
    max-width: 320px;
    font-size: 16px;
    padding: 8px;
  }
}
</style>
