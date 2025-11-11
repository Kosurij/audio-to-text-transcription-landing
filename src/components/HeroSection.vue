<template>
  <section class="hero">
    <div class="hero-background">
      <video 
        class="hero-video" 
        autoplay 
        muted 
        loop 
        playsinline
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>
      <div class="hero-gradient"></div>
      <div class="hero-overlay"></div>
    </div>
    <div class="hero-content">
      <h1 class="headline">
        Transform <span class="gradient-text">Audio to Text</span><br />
        in Seconds
      </h1>
      <p class="subtext">
        The most accurate Chrome extension for converting audio to text. 
        Perfect for meetings, interviews, podcasts, and lectures.
      </p>
      <div class="hero-actions">
        <InstallButton class="main-button">
          Install Audio To Text Transcription
        </InstallButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import InstallButton from './InstallButton.vue';
</script>

<style scoped>
.hero {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  overflow: hidden;
  width: 100%;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  pointer-events: none;
  width: 100%;
  height: 100%;
}

.hero-video {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  object-fit: cover;
  z-index: 0;
}

html[data-theme='dark'] .hero-video {
  display: none;
}

.hero-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  opacity: 0;
  transition: opacity 0.5s ease;
}

html[data-theme='dark'] .hero-gradient {
  opacity: 1;
  background: linear-gradient(
    135deg,
    rgb(32, 33, 36) 0%,
    rgb(41, 42, 45) 25%,
    rgb(48, 49, 52) 50%,
    rgb(41, 42, 45) 75%,
    rgb(32, 33, 36) 100%
  );
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(239, 246, 255, 0.85), rgba(219, 234, 254, 0.85), rgba(191, 219, 254, 0.85));
  z-index: 1;
}

html[data-theme='dark'] .hero-overlay {
  background: linear-gradient(135deg, rgba(32, 33, 36, 0.6), rgba(41, 42, 45, 0.6), rgba(48, 49, 52, 0.6));
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 900px;
  width: 100%;
  padding: 0 24px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  margin: 0 auto;
}

.headline {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 400;
  line-height: 1.1;
  color: var(--color-text);
  margin: 0;
  letter-spacing: -0.02em;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

html[data-theme='dark'] .headline {
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
}

.gradient-text {
  background: var(--gradient-primary);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  font-weight: 500;
  filter: drop-shadow(0 2px 4px rgba(26, 115, 232, 0.2));
}

html[data-theme='dark'] .gradient-text {
  filter: drop-shadow(0 2px 6px rgba(138, 180, 248, 0.4));
}

.subtext {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: var(--color-text);
  line-height: 1.7;
  max-width: 650px;
  font-weight: 400;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

html[data-theme='dark'] .subtext {
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.4);
}

.hero-actions {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  margin: 0;
}

.main-button {
  font-size: 18px;
  font-weight: 500;
  padding: 16px 40px;
  border-radius: 8px;
  height: 56px;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  text-transform: none;
  letter-spacing: 0;
  box-shadow: 0 4px 12px rgba(26, 115, 232, 0.3), 0 2px 4px rgba(26, 115, 232, 0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  position: relative;
}

html[data-theme='dark'] .main-button {
  box-shadow: 0 4px 16px rgba(138, 180, 248, 0.4), 0 2px 8px rgba(138, 180, 248, 0.3);
}

.main-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%);
  border-radius: 8px;
  pointer-events: none;
}

.main-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(26, 115, 232, 0.4), 0 4px 8px rgba(26, 115, 232, 0.3);
}

html[data-theme='dark'] .main-button:hover {
  box-shadow: 0 6px 24px rgba(138, 180, 248, 0.5), 0 4px 12px rgba(138, 180, 248, 0.4);
}

.main-button:active {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(26, 115, 232, 0.3), 0 1px 2px rgba(26, 115, 232, 0.2);
}

html[data-theme='dark'] .main-button:active {
  box-shadow: 0 2px 12px rgba(138, 180, 248, 0.4), 0 1px 4px rgba(138, 180, 248, 0.3);
}

@media (max-width: 768px) {
  .hero {
    height: 100vh;
  }

  .hero-content {
    gap: 32px;
    padding: 0 20px;
  }
}
</style>
