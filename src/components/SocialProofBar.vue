<template>
  <section class="social-proof">
    <div class="social-proof-inner">
      <div class="stats-row">
        <div class="stat">
          <span class="stat-value">1,000+</span>
          <span class="stat-label">Active Users</span>
        </div>
        <div class="stat-divider" />
        <div class="stat">
          <span class="stat-value">4.9 <span class="star">&#9733;</span></span>
          <span class="stat-label">Chrome Web Store</span>
        </div>
        <div class="stat-divider" />
        <div class="stat">
          <span class="stat-value">95%+</span>
          <span class="stat-label">Transcription Accuracy</span>
        </div>
      </div>
      <p class="trust-line">Trusted by students, professionals, and teams worldwide</p>
    </div>
  </section>
</template>

<style scoped>
.social-proof {
  background: var(--color-background-alt);
  border-top: 1px solid var(--color-border-light);
  border-bottom: 1px solid var(--color-border-light);
  padding: 48px 0;
}

.social-proof-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.stats-row {
  display: flex;
  align-items: center;
  gap: 48px;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stat-value {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 700;
  color: var(--accent-primary);
  letter-spacing: -0.02em;
}

.star {
  font-size: 0.8em;
}

.stat-label {
  font-size: 14px;
  font-weight: 400;
  color: var(--color-text-secondary);
}

.stat-divider {
  width: 1px;
  height: 48px;
  background: var(--color-border);
}

.trust-line {
  font-size: 14px;
  color: var(--color-text-muted);
  margin: 0;
}

@media (max-width: 600px) {
  .social-proof {
    padding: 36px 0;
  }

  .stats-row {
    flex-direction: column;
    gap: 24px;
  }

  .stat-divider {
    width: 48px;
    height: 1px;
  }
}
</style>
