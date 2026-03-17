<template>
  <section class="compatibility">
    <div class="compatibility-container">
      <p class="compatibility-title">Works anywhere you record audio</p>
      <div class="compatibility-logos">
        <div class="logo-item" v-for="platform in platforms" :key="platform.name">
          <div class="logo-icon" :style="{ color: platform.color }" v-html="platform.svg"></div>
          <span class="logo-name">{{ platform.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// SVG strings are static literals — never populate from user input or external sources (v-html XSS risk).
// SVG paths from simpleicons.org (CC0 license).
const platforms = [
  {
    name: 'Google Meet',
    color: '#00897B',
    // Path: simpleicons.org/icons/googlemeet
    svg: `<svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M22.323 6.053l-2.488 2.372V5.5A1.5 1.5 0 0020.5 4h-17A1.5 1.5 0 002 5.5v13A1.5 1.5 0 003.5 20h17a1.5 1.5 0 001.5-1.5v-2.926l2.323 2.225c.523.5 1.177.201 1.177-.45V6.5c0-.649-.652-.95-1.177-.447zM20 18.5H4v-13h16V9l-5 4.793L20 18v.5z"/></svg>`,
  },
  {
    name: 'Zoom',
    color: '#2D8CFF',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.5 1.665V9.1a1.35 1.35 0 0 0-1.35-1.35H6.788A1.35 1.35 0 0 0 5.438 9.1v5.8a1.35 1.35 0 0 0 1.35 1.35h6.924a1.35 1.35 0 0 0 1.35-1.35v-.813l2.5 1.665a.45.45 0 0 0 .7-.374V8.622a.45.45 0 0 0-.7-.374z"/></svg>`,
  },
  {
    name: 'MS Teams',
    color: '#6264A7',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M20.625 7.5h-7.5v7.5h7.5V7.5zM9 9.375a2.625 2.625 0 1 0 0-5.25 2.625 2.625 0 0 0 0 5.25zm9 .375a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5zM9 10.5C6.51 10.5 1.5 11.748 1.5 14.25V15.75h15V14.25C16.5 11.748 11.49 10.5 9 10.5z"/></svg>`,
  },
  {
    name: 'YouTube',
    color: '#FF0000',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>`,
  },
  {
    name: 'Spotify',
    color: '#1DB954',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>`,
  },
  {
    name: 'Any MP3/WAV',
    color: '#64748B',
    svg: `<svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6zm-2 16a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/></svg>`,
  },
];
</script>

<style scoped>
.compatibility {
  padding: 40px 0;
  background: var(--color-background);
}

.compatibility-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  text-align: center;
}

.compatibility-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 24px;
}

.compatibility-logos {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
}

.logo-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.logo-item:hover {
  opacity: 1;
}

.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-name {
  font-size: 12px;
  color: var(--color-text-muted);
  white-space: nowrap;
}

@media (max-width: 600px) {
  .compatibility-logos {
    gap: 24px;
  }
}
</style>
