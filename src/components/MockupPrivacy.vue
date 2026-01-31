<template>
  <div class="privacy-mockup">
    <div class="shield-container">
      <div class="shield-glow" />
      <svg class="shield-icon" width="120" height="140" viewBox="0 0 120 140" fill="none">
        <path
          d="M60 8L10 32V64C10 100.5 30.5 124 60 134C89.5 124 110 100.5 110 64V32L60 8Z"
          fill="var(--accent-primary-light)"
          stroke="var(--accent-primary)"
          stroke-width="2.5"
        />
        <path
          d="M60 44V76M60 76L44 60M60 76L76 60"
          stroke="var(--accent-primary)"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
          opacity="0"
        />
        <rect x="46" y="58" width="28" height="24" rx="4" stroke="var(--accent-primary)" stroke-width="2.5" fill="none" />
        <path d="M52 58V50C52 45.5817 55.5817 42 60 42C64.4183 42 68 45.5817 68 50V58" stroke="var(--accent-primary)" stroke-width="2.5" stroke-linecap="round" />
        <circle cx="60" cy="69" r="3" fill="var(--accent-primary)" />
      </svg>

      <div class="badge badge-top-right">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M20 6L9 17l-5-5" stroke="#28C840" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>No data collection</span>
      </div>

      <div class="badge badge-bottom-left">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M20 6L9 17l-5-5" stroke="#28C840" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>You own your data</span>
      </div>

      <div class="badge badge-bottom-right">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M20 6L9 17l-5-5" stroke="#28C840" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>Transparent policy</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.privacy-mockup {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.shield-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 280px;
  height: 260px;
}

.shield-glow {
  position: absolute;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: var(--accent-primary);
  opacity: 0.08;
  filter: blur(40px);
}

.shield-icon {
  position: relative;
  z-index: 1;
}

.badge {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-md);
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text);
  white-space: nowrap;
  z-index: 2;
}

.badge-top-right {
  top: 16px;
  right: 0;
}

.badge-bottom-left {
  bottom: 32px;
  left: -10px;
}

.badge-bottom-right {
  bottom: 0;
  right: 8px;
}

@media (max-width: 480px) {
  .shield-container {
    width: 240px;
    height: 220px;
  }

  .shield-icon {
    width: 96px;
    height: 112px;
  }

  .badge {
    font-size: 11px;
    padding: 4px 10px;
  }
}
</style>
