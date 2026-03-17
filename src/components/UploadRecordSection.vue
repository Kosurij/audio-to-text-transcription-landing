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
        <p class="compat-label">Works with recordings from any app</p>
        <div class="compat-logos">
          <div v-for="platform in platforms" :key="platform.name" class="logo-item">
            <div class="logo-wrap" :style="{ background: platform.bg }">
              <svg viewBox="0 0 24 24" fill="currentColor" :style="{ color: platform.color }" width="20" height="20">
                <path :d="platform.path" />
              </svg>
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

const platforms = [
  {
    name: 'Google Meet',
    bg: '#e8f5e9',
    color: '#1a73e8',
    // Simple Icons: Google Meet
    path: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 14.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 9.5 12 9.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zm0-2c.28 0 .5-.22.5-.5s-.22-.5-.5-.5-.5.22-.5.5.22.5.5.5zm5.5 1.5v-4l-3 2 3 2z',
  },
  {
    name: 'Zoom',
    bg: '#e3f2fd',
    color: '#2D8CFF',
    // Zoom camera icon
    path: 'M4 6C2.9 6 2 6.9 2 8v8c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-2.5l4 4v-11l-4 4V8c0-1.1-.9-2-2-2H4zm0 2h12v8H4V8z',
  },
  {
    name: 'MS Teams',
    bg: '#ede7f6',
    color: '#6264A7',
    // Microsoft Teams T icon
    path: 'M19.95 4.68h-3.23v-.45C16.72 1.9 14.82 0 12.5 0S8.28 1.9 8.28 4.23v.45H5.05C3.37 4.68 2 6.05 2 7.73v11.59C2 21 3.37 22.36 5.05 22.36h14.9c1.68 0 3.05-1.37 3.05-3.05V7.73c0-1.68-1.37-3.05-3.05-3.05zM10 4.23c0-1.38 1.12-2.5 2.5-2.5S15 2.85 15 4.23v.45H10v-.45zm9.95 15.09c0 .58-.47 1.05-1.05 1.05H5.05C4.47 20.36 4 19.9 4 19.32V7.73c0-.58.47-1.05 1.05-1.05h14.9c.58 0 1.05.47 1.05 1.05v11.59zm-9.2-9.68H8.5V8.36h6.95v1.28h-2.25v5.86H10.7V9.64z',
  },
  {
    name: 'YouTube',
    bg: '#ffebee',
    color: '#FF0000',
    path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  },
  {
    name: 'Spotify',
    bg: '#e8f5e9',
    color: '#1DB954',
    path: 'M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z',
  },
  {
    name: 'Loom',
    bg: '#f3e5f5',
    color: '#625DF5',
    // Loom play/record circle
    path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z',
  },
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
  display: flex;
  align-items: center;
  justify-content: center;
  /* brand bg intentional; darken in dark mode */
  filter: none;
}

html[data-theme='dark'] .logo-wrap {
  filter: brightness(0.25) saturate(1.5);
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
