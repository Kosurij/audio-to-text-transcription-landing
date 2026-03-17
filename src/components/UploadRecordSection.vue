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

// SVG paths from Simple Icons (simpleicons.org) — CC0 license
const platforms = [
  {
    name: 'Google Meet',
    bg: '#e0f2f1',
    color: '#00897B',
    path: 'M5.53 2.13 0 7.75h5.53zm.398 0v5.62h7.608v3.65l5.47-4.45c-.014-1.22.031-2.25-.025-3.46-.148-1.09-1.287-1.47-2.236-1.36zM23.1 4.32c-.802.295-1.358.995-2.047 1.49-2.506 2.05-4.982 4.12-7.468 6.19 3.025 2.59 6.04 5.18 9.065 7.76 1.218.671 1.428-.814 1.328-1.64v-13a.828.828 0 0 0-.877-.825zM.038 8.15v7.7h5.53v-7.7zm13.577 8.1H6.008v5.62c3.864-.006 7.737.011 11.58-.009 1.02-.07 1.618-1.12 1.468-2.07v-2.51l-5.47-4.68v3.65zm-13.577 0c.02 1.44-.041 2.88.033 4.31.162.948 1.158 1.43 2.047 1.31h3.464v-5.62z',
  },
  {
    name: 'Zoom',
    bg: '#e3f2fd',
    color: '#0B5CFF',
    path: 'M5.033 14.649H.743a.74.74 0 0 1-.686-.458.74.74 0 0 1 .16-.808L3.19 10.41H1.06A1.06 1.06 0 0 1 0 9.35h3.957c.301 0 .57.18.686.458a.74.74 0 0 1-.161.808L1.51 13.59h2.464c.585 0 1.06.475 1.06 1.06zM24 11.338c0-1.14-.927-2.066-2.066-2.066-.61 0-1.158.265-1.537.686a2.061 2.061 0 0 0-1.536-.686c-1.14 0-2.066.926-2.066 2.066v3.311a1.06 1.06 0 0 0 1.06-1.06v-2.251a1.004 1.004 0 0 1 2.013 0v2.251c0 .586.474 1.06 1.06 1.06v-3.311a1.004 1.004 0 0 1 2.012 0v2.251c0 .586.475 1.06 1.06 1.06zM16.265 12a2.728 2.728 0 1 1-5.457 0 2.728 2.728 0 0 1 5.457 0zm-1.06 0a1.669 1.669 0 1 0-3.338 0 1.669 1.669 0 0 0 3.338 0zm-4.82 0a2.728 2.728 0 1 1-5.458 0 2.728 2.728 0 0 1 5.457 0zm-1.06 0a1.669 1.669 0 1 0-3.338 0 1.669 1.669 0 0 0 3.338 0z',
  },
  {
    name: 'Discord',
    bg: '#eef0fd',
    color: '#5865F2',
    path: 'M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z',
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
    color: '#1ED760',
    path: 'M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z',
  },
  {
    name: 'Loom',
    bg: '#ede7f6',
    color: '#625DF5',
    path: 'M24 10.665h-7.018l6.078-3.509-1.335-2.312-6.078 3.509 3.508-6.077L16.843.94l-3.508 6.077V0h-2.67v7.018L7.156.94 4.844 2.275l3.509 6.077-6.078-3.508L.94 7.156l6.078 3.509H0v2.67h7.017L.94 16.844l1.335 2.313 6.077-3.508-3.509 6.077 2.312 1.335 3.509-6.078V24h2.67v-7.017l3.508 6.077 2.312-1.335-3.509-6.078 6.078 3.509 1.335-2.313-6.077-3.508h7.017v-2.67H24zm-12 4.966a3.645 3.645 0 1 1 0-7.29 3.645 3.645 0 0 1 0 7.29z',
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
