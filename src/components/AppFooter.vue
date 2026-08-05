<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-main">

        <!-- Колонка 1: Бренд -->
        <div class="footer-brand">
          <div class="footer-logo">
            <Logo loading="lazy" />
            <span class="footer-logo-text">Audio to Text</span>
          </div>
          <p class="footer-tagline">
            Chrome extension for instant audio transcription. Powered by AI.
          </p>
          <div class="footer-badges">
            <a
              class="footer-badge"
              href="https://www.producthunt.com/products/audio-to-text-transcription?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-audio-to-text-transcription"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                class="ph-badge-light"
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1062809&theme=light"
                alt="Audio To Text Transcription - Instantly transcribe audio to text — right in your browser | Product Hunt"
                width="250"
                height="54"
                loading="lazy"
              />
              <img
                class="ph-badge-dark"
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1062809&theme=dark"
                alt="Audio To Text Transcription - Instantly transcribe audio to text — right in your browser | Product Hunt"
                width="250"
                height="54"
                loading="lazy"
              />
            </a>
            <a
              class="footer-badge"
              href="https://www.nxgntools.com/tools/audio-to-text-transcription?utm_source=audio-to-text-transcription"
              target="_blank"
              rel="noopener"
            >
              <img
                src="https://www.nxgntools.com/api/embed/audio-to-text-transcription?type=PLACED_3RD_ON"
                alt="Placed 3rd on NxGn Tools"
                width="180"
                height="48"
                loading="lazy"
              />
            </a>
          </div>
        </div>

        <!-- Колонка 2: Product -->
        <div class="footer-col">
          <h3 class="footer-col-title">Product</h3>
          <ul class="footer-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#how-it-works">How it works</a></li>
            <li><a href="#testimonials">Reviews</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>

        <!-- Колонка 3: Legal & Support -->
        <div class="footer-col">
          <h3 class="footer-col-title">Support</h3>
          <ul class="footer-links">
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li>
              <a
                href="https://chromewebstore.google.com/detail/audio-to-text-transcription/pkfoaaglghblmjjjpbniicjcpehfbmgd?hl=en"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chrome Web Store
              </a>
            </li>
          </ul>
        </div>

      </div>

      <div class="footer-bottom">
        <p class="footer-copyright">© {{ currentYear }} Audio to Text Transcription. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import Logo from './Logo.vue';
// <Logo /> без prop compact — размер иконки будет 32px (vs 40px в старом AppFooter с compact=true)
const currentYear = new Date().getFullYear();
</script>

<style scoped>
.footer {
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  padding: 56px 0 24px;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.footer-main {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 48px;
  margin-bottom: 48px;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.footer-logo-text {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-text);
}

.footer-tagline {
  font-size: 14px;
  line-height: 1.6;
  color: var(--color-text-secondary);
  max-width: 280px;
  margin: 0;
}

.footer-col-title {
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--color-text);
  margin-bottom: 16px;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-links a {
  font-size: 14px;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color 0.15s;
}

.footer-links a:hover {
  color: var(--accent-primary);
}

.footer-bottom {
  border-top: 1px solid var(--color-border);
  padding-top: 24px;
}

.footer-badges {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.footer-badge {
  display: inline-block;
  flex-shrink: 0;
}

.footer-badge img {
  display: block;
  height: 36px;
  width: auto;
}

.ph-badge-dark {
  display: none;
}

html[data-theme='dark'] .ph-badge-light {
  display: none;
}

html[data-theme='dark'] .ph-badge-dark {
  display: block;
}

.footer-copyright {
  font-size: 13px;
  color: var(--color-text-secondary);
  margin: 0;
}

@media (max-width: 768px) {
  .footer-main {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }

  .footer-brand {
    grid-column: 1 / -1;
  }
}

@media (max-width: 480px) {
  .footer-main {
    grid-template-columns: 1fr;
  }
}
</style>
