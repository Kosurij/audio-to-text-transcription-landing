<template>
  <footer class="footer">
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
            <h4 class="footer-heading">Product</h4>
            <a href="#features" class="footer-link">Features</a>
            <a href="#how-it-works" class="footer-link">How It Works</a>
            <a href="#faq" class="footer-link">FAQ</a>
          </div>
          <div class="footer-column">
            <h4 class="footer-heading">Legal</h4>
            <a href="/privacy" class="footer-link">Privacy Policy</a>
            <a href="/terms" class="footer-link">Terms of Service</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p class="footer-copyright">
          © {{ currentYear }} Audio To Text Transcription. All rights reserved.
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
  background: var(--gradient-bg-subtle);
  border-top: 1px solid var(--color-border);
  padding: 80px 20px 40px;
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 80px;
  margin-bottom: 60px;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.footer-description {
  font-size: 16px;
  color: var(--color-text-secondary);
  line-height: 1.7;
  max-width: 400px;
  font-weight: 400;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 48px;
}

.footer-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.footer-heading {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 4px;
  font-family: 'Space Grotesk', sans-serif;
}

.footer-link {
  font-size: 15px;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: all 0.2s ease;
  font-weight: 400;
}

.footer-link:hover {
  color: var(--accent-primary);
  transform: translateX(4px);
}

.footer-bottom {
  padding-top: 40px;
  border-top: 1px solid var(--color-border);
  text-align: center;
}

.footer-copyright {
  font-size: 14px;
  color: var(--color-text-muted);
  font-weight: 400;
}

@media (max-width: 768px) {
  .footer {
    padding: 60px 20px 32px;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 48px;
  }

  .footer-links {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
</style>
