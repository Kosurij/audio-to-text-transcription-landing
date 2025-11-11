<template>
  <div class="welcome-page">
    <!-- Большая заметная подсказка к пазлу -->
    <div class="puzzle-hint">
      <div class="hint-content">
        <div class="hint-icon-container">
          <img :src="puzzleIcon" alt="Puzzle icon" class="puzzle-icon" />
        </div>
        <div class="hint-text-container">
          <div class="hint-title">Click the puzzle icon</div>
          <div class="hint-subtitle">in your browser toolbar</div>
        </div>
      </div>
      <div class="big-arrow">
        <svg width="40" height="80" viewBox="0 0 40 80" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: rotate(180deg);">
          <defs>
            <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color:#1A73E8;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#4285F4;stop-opacity:1" />
            </linearGradient>
          </defs>
          <path d="M20 5L20 60L8 50L20 60L32 50" stroke="url(#arrowGradient)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        </svg>
      </div>
    </div>
    <header class="welcome-header">
      <h1 class="title">🎉 Welcome to Audio To Text Transcription</h1>
      <p class="subtitle">Get started in just a few simple steps</p>
    </header>

    <main class="welcome-content">
      <div class="gif-container">
        <img src="/welcome.gif" alt="How to use Audio To Text Transcription" class="welcome-gif" />
      </div>
      <div class="welcome-text">
        <p>
          Click the puzzle icon in your browser toolbar, then pin <strong>Audio To Text Transcription</strong> to keep it easily accessible.
        </p>
        <p>
          Once pinned, click the extension icon to start transcribing audio files or recording from your microphone.
        </p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useConfetti } from '../composables/useConfetti'
import puzzleIcon from '../assets/puzzle.svg?url'

const { launchConfetti } = useConfetti()

onMounted(launchConfetti)
</script>

<style scoped>
/* === Большая заметная подсказка к пазлу === */
.puzzle-hint {
  position: fixed;
  top: 100px;
  right: 20px;
  z-index: 1000;
  background: var(--gradient-primary);
  color: white;
  padding: 24px 28px;
  border-radius: 20px;
  box-shadow: 0 12px 40px rgba(26, 115, 232, 0.4), 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: fadeIn 0.6s ease-out, bounceUpDown 2s ease-in-out infinite 0.6s;
  backdrop-filter: blur(10px);
  min-width: 280px;
}

html[data-theme='dark'] .puzzle-hint {
  box-shadow: 0 12px 40px rgba(138, 180, 248, 0.4), 0 4px 12px rgba(0, 0, 0, 0.3);
}

.hint-content {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
}

.hint-icon-container {
  background: rgba(255, 255, 255, 0.2);
  padding: 12px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.puzzle-icon {
  width: 28px;
  height: 28px;
  filter: brightness(0) invert(1);
  flex-shrink: 0;
  color: white;
}

.hint-text-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.hint-title {
  font-size: 18px;
  font-weight: 800;
  line-height: 1.2;
  white-space: nowrap;
}

.hint-subtitle {
  font-size: 14px;
  font-weight: 500;
  opacity: 0.9;
  line-height: 1.2;
  white-space: nowrap;
}

.big-arrow {
  position: absolute;
  top: -90px;
  right: 25%;
  transform: translateX(50%);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: arrowBounce 2s ease-in-out infinite 0.6s;
  filter: drop-shadow(0 6px 16px rgba(26, 115, 232, 0.4));
}

html[data-theme='dark'] .big-arrow {
  filter: drop-shadow(0 6px 16px rgba(138, 180, 248, 0.4));
}

.big-arrow svg {
  width: 40px;
  height: 80px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounceUpDown {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}

@keyframes arrowBounce {
  0%, 100% {
    transform: translateX(50%) translateY(0);
  }
  50% {
    transform: translateX(50%) translateY(-6px);
  }
}

/* Адаптивность для мобильных устройств */
@media (max-width: 768px) {
  .puzzle-hint {
    top: 80px;
    right: 15px;
    padding: 20px 24px;
    min-width: 240px;
  }
  
  .hint-content {
    gap: 12px;
  }
  
  .hint-icon-container {
    padding: 10px;
  }
  
  .puzzle-icon {
    width: 24px;
    height: 24px;
  }
  
  .hint-title {
    font-size: 16px;
  }
  
  .hint-subtitle {
    font-size: 13px;
  }
  
  .big-arrow {
    top: -70px;
    right: 50%;
    transform: translateX(50%);
  }
  
  .big-arrow svg {
    width: 36px;
    height: 70px;
  }
}

.welcome-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 16px 120px 32px;
  color: var(--color-text);
  min-height: 100vh;
  background: var(--gradient-bg);
}

.welcome-header {
  text-align: center;
  margin-bottom: 48px;
}

.title {
  font-size: 48px;
  font-weight: 800;
  color: var(--color-text);
  line-height: 1.2;
  letter-spacing: -0.01em;
  word-break: break-word;
  margin-bottom: 16px;
}

.subtitle {
  font-size: 20px;
  color: var(--color-text-secondary);
  font-weight: 400;
  margin: 0;
}

@media (max-width: 768px) {
  .title {
    font-size: 28px;
  }

  .subtitle {
    font-size: 18px;
  }
}

.welcome-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  width: 100%;
  max-width: 1080px;
}

.gif-container {
  width: 100%;
  max-width: 900px;
  background: var(--color-surface-elevated);
  padding: 24px;
  border-radius: 16px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-border);
}

.welcome-gif {
  width: 100%;
  height: auto;
  border-radius: 12px;
  display: block;
  box-shadow: var(--shadow-sm);
}

.welcome-text {
  text-align: center;
  max-width: 700px;
}

.welcome-text p {
  font-size: 18px;
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin: 0 0 20px 0;
}

.welcome-text p:last-child {
  margin-bottom: 0;
}

.welcome-text strong {
  color: var(--color-text);
  font-weight: 600;
}

@media (min-width: 768px) {
  .welcome-text {
    text-align: left;
  }

  .welcome-text p {
    font-size: 19px;
  }
}

@media (min-width: 1280px) {
  .welcome-text p {
    font-size: 20px;
  }
}
</style>

