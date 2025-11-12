<template>
  <section class="how-it-works" id="how-it-works">
    <div class="how-it-works-container">
      <div class="section-header">
        <h2 class="section-title">
          Get started in <span class="gradient-text">three simple steps</span>
        </h2>
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
  padding: 120px 20px;
  background: var(--gradient-bg);
  position: relative;
}

.how-it-works-container {
  max-width: 1000px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 80px;
}

.section-title {
  font-size: clamp(40px, 6vw, 64px);
  font-weight: 800;
  text-align: center;
  color: var(--color-text);
  letter-spacing: -0.03em;
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
  flex-direction: column;
  gap: 32px;
}

.step {
  display: flex;
  gap: 32px;
  align-items: flex-start;
  background: var(--color-surface-elevated);
  background-image: var(--gradient-bg-subtle);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 40px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.step::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--gradient-primary);
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.4s ease;
}

.step:hover::before {
  transform: scaleY(1);
}

.step:hover {
  transform: translateX(12px);
  box-shadow: var(--shadow-xl);
  border-color: var(--accent-primary);
}

.step-number {
  width: 64px;
  height: 64px;
  background: var(--gradient-primary);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 800;
  color: white;
  flex-shrink: 0;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease;
}

.step:hover .step-number {
  transform: scale(1.1) rotate(5deg);
}

.step-content {
  flex: 1;
  padding-top: 4px;
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
    padding: 40px 20px;
  }

  .section-header {
    margin-bottom: 48px;
  }

  .step {
    flex-direction: column;
    text-align: center;
    padding: 32px;
    gap: 24px;
  }

  .step:hover {
    transform: translateY(-4px);
  }

  .step-number {
    margin: 0 auto;
  }
}
</style>
