<template>
  <footer class="footer" id="privacy-policy">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-brand">
          <Logo :compact="true" />
          <p class="footer-description">
            Transform audio into accurate text with our powerful Chrome extension. Free, fast, and secure.
          </p>
        </div>
        <div class="footer-links">
          <div class="footer-column">
            <h4 class="footer-heading">Legal</h4>
            <a href="/privacy" class="footer-link">Privacy Policy</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p class="footer-copyright">
          &copy; {{ currentYear }} Audio To Text Transcription. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import Logo from './Logo.vue';

const currentYear = new Date().getFullYear();
</script>

<style scoped>
.footer {
  background: transparent;
  border-top: 1px solid var(--color-border);
  padding: 48px 0 28px;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 48px;
  flex-wrap: wrap;
  margin-bottom: 32px;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.footer-description {
  font-size: 0.95rem;
  color: var(--color-text-muted);
  line-height: 1.65;
  max-width: 360px;
  font-weight: 400;
}

.footer-links {
  display: flex;
  align-items: center;
  gap: 48px;
}

.footer-column {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 140px;
}

.footer-heading {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0;
  font-family: 'Inter', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.footer-link {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color 0.2s ease;
  font-weight: 400;
}

.footer-link:hover {
  color: var(--accent-primary);
}

.footer-bottom {
  padding-top: 24px;
  border-top: 1px solid var(--color-border);
  text-align: center;
}

.footer-copyright {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  font-weight: 400;
}

@media (max-width: 768px) {
  .footer {
    padding: 36px 0 24px;
  }

  .footer-content {
    flex-direction: column;
    gap: 28px;
    margin-bottom: 24px;
  }
}
</style>
