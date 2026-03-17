<template>
  <section class="upload-record">
    <div class="upload-record-container">

      <!-- Two action cards -->
      <div class="cards">

        <!-- Upload Card -->
        <a :href="storeUrl" target="_blank" rel="noopener noreferrer" class="card">
          <div class="card-header">
            <div class="card-icon-wrap">
              <!-- Heroicons: cloud-arrow-up -->
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
              </svg>
            </div>
            <div class="card-heading">
              <h3 class="card-title">Upload a file</h3>
              <p class="card-subtitle">MP3, WAV, M4A, OGG, MP4, FLAC, WEBM, AAC and more</p>
            </div>
          </div>
          <div class="card-body">
            <div class="drop-zone">
              <!-- Heroicons: folder-open -->
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="drop-icon">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
              </svg>
              <span class="drop-text">Click to upload and transcribe for free</span>
            </div>
            <p class="dev-note">[Screenshot: extension upload UI with drag-and-drop area]</p>
          </div>
        </a>

        <!-- Record Card -->
        <a :href="storeUrl" target="_blank" rel="noopener noreferrer" class="card">
          <div class="card-header">
            <div class="card-icon-wrap">
              <!-- Heroicons: microphone -->
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
              </svg>
            </div>
            <div class="card-heading">
              <h3 class="card-title">Record audio live</h3>
              <p class="card-subtitle">Capture mic or browser tab in real time</p>
            </div>
          </div>
          <div class="card-body">
            <div class="waveform-zone">
              <div class="record-dot"></div>
              <div class="waveform">
                <span class="bar" style="--h: 8px"></span>
                <span class="bar" style="--h: 20px"></span>
                <span class="bar" style="--h: 32px"></span>
                <span class="bar" style="--h: 14px"></span>
                <span class="bar" style="--h: 26px"></span>
                <span class="bar" style="--h: 36px"></span>
                <span class="bar" style="--h: 18px"></span>
                <span class="bar" style="--h: 28px"></span>
                <span class="bar" style="--h: 10px"></span>
                <span class="bar" style="--h: 22px"></span>
                <span class="bar" style="--h: 34px"></span>
                <span class="bar" style="--h: 16px"></span>
                <span class="bar" style="--h: 24px"></span>
              </div>
            </div>
            <p class="dev-note">[Screenshot: extension record UI with waveform and Record button]</p>
          </div>
        </a>

      </div>

      <!-- Compatibility strip -->
      <div class="compat-strip">
        <p class="compat-label">Works with recordings from any app or website</p>
        <div class="compat-logos">
          <div v-for="platform in platforms" :key="platform.name" class="logo-item">
            <div class="logo-wrap">
              <img :src="platform.img" :alt="platform.name" width="32" height="32" loading="lazy" />
            </div>
            <span class="logo-name">{{ platform.name }}</span>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
const storeUrl = 'https://chromewebstore.google.com/detail/audio-to-text-transcription/pkfoaaglghblmjjjpbniicjcpehfbmgd?hl=en&utm_source=site&utm_medium=cpc'

// Logo images via Clearbit Logo API — replace with local files for production
const platforms = [
  { name: 'Google Meet',  img: 'https://logo.clearbit.com/meet.google.com' },
  { name: 'Zoom',         img: 'https://logo.clearbit.com/zoom.us' },
  { name: 'MS Teams',     img: 'https://logo.clearbit.com/teams.microsoft.com' },
  { name: 'YouTube',      img: 'https://logo.clearbit.com/youtube.com' },
  { name: 'Spotify',      img: 'https://logo.clearbit.com/spotify.com' },
  { name: 'Loom',         img: 'https://logo.clearbit.com/loom.com' },
]
</script>

<style scoped>
.upload-record {
  padding: 48px 0;
  background: var(--color-background);
}

.upload-record-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Cards */
.cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.card {
  background: var(--color-surface-elevated);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 28px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: 20px;
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
  cursor: pointer;
}

.card:hover {
  box-shadow: 0 8px 32px rgba(37, 99, 235, 0.12);
  border-color: var(--accent-primary);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 14px;
}

.card-icon-wrap {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--accent-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.card-heading {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.card-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0;
}

.card-subtitle {
  font-size: 13px;
  color: var(--color-text-muted);
  margin: 0;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Upload drop zone */
.drop-zone {
  border: 2px dashed var(--color-border);
  border-radius: 12px;
  padding: 28px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  transition: border-color 0.2s ease;
}

.card:hover .drop-zone {
  border-color: var(--accent-primary);
}

.drop-icon {
  width: 36px;
  height: 36px;
  color: var(--accent-primary);
}

.drop-text {
  font-size: 13px;
  color: var(--color-text-secondary);
  text-align: center;
}

/* Record waveform zone */
.waveform-zone {
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 24px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.record-dot {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #ef4444;
  flex-shrink: 0;
  box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4);
  animation: pulse 1.8s infinite;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
  100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
}

.waveform {
  display: flex;
  align-items: center;
  gap: 3px;
  height: 44px;
}

.bar {
  display: block;
  width: 4px;
  height: var(--h, 16px);
  background: var(--accent-primary);
  border-radius: 2px;
  animation: wave 1.2s ease-in-out infinite alternate;
  opacity: 0.7;
}

.bar:nth-child(odd)  { animation-delay: 0s; }
.bar:nth-child(even) { animation-delay: 0.3s; }
.bar:nth-child(3n)   { animation-delay: 0.6s; }

@keyframes wave {
  0%   { transform: scaleY(0.4); }
  100% { transform: scaleY(1); }
}

/* Developer placeholder note */
.dev-note {
  font-size: 11px;
  color: var(--color-text-muted);
  text-align: center;
  font-style: italic;
  margin: 0;
}

/* Compatibility strip */
.compat-strip {
  margin-top: 32px;
  padding-top: 28px;
  border-top: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.compat-label {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0;
}

.compat-logos {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: center;
}

.logo-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.logo-wrap {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-surface-elevated);
  border: 1px solid var(--color-border);
}

.logo-wrap img {
  width: 32px;
  height: 32px;
  object-fit: contain;
  border-radius: 4px;
}

.logo-name {
  font-size: 11px;
  color: var(--color-text-muted);
  white-space: nowrap;
}

@media (max-width: 640px) {
  .cards {
    grid-template-columns: 1fr;
  }

  .upload-record {
    padding: 36px 0;
  }

  .compat-logos {
    gap: 16px;
  }
}
</style>
