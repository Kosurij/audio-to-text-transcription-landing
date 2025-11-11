<template>
  <nav class="navbar">
    <div class="navbar-left">
      <div class="branding">
        <Logo />
        <span class="product-name">Audio To Text Transcription</span>
      </div>

      <div class="nav-links">
        <a href="#features" class="nav-link">Features</a>
        <a href="#how-it-works" class="nav-link">How it works</a>
        <a href="#faq" class="nav-link">FAQ</a>
      </div>
    </div>

    <div class="navbar-right">
      <InstallButton variant="outline" class="nav-button">
        Install Now
      </InstallButton>
    </div>
  </nav>
</template>

<script setup lang="ts">
import InstallButton from './InstallButton.vue';
import Logo from './Logo.vue';
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 88px;
  padding: 0 40px;
  background: var(--navbar-bg);
  border-bottom: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

.navbar-left,
.navbar-right {
  display: flex;
  align-items: center;
}

.navbar-left {
  gap: 48px;
  flex: 1;
}

.branding {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
}

.product-name {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-text);
  letter-spacing: -0.01em;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 32px;
}

.nav-link {
  position: relative;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color 0.2s ease, opacity 0.2s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -10px;
  width: 100%;
  height: 2px;
  background: var(--accent-primary);
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.2s ease;
  opacity: 0.8;
}

.nav-link:hover {
  color: var(--accent-primary);
}

.nav-link:hover::after {
  transform: scaleX(1);
  opacity: 1;
}

.nav-button {
  font-size: 17px;
  padding: 14px 32px;
  height: 48px;
  border-radius: 8px;
  font-weight: 500;
}

.navbar-right {
  justify-content: flex-end;
  flex: 0 0 auto;
}

@media (max-width: 1024px) {
  .navbar-left {
    gap: 32px;
  }
}

@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    align-items: stretch;
    padding: 16px 20px;
    gap: 20px;
  }

  .navbar-left {
    flex-direction: column;
    align-items: center;
    gap: 16px;
    width: 100%;
  }

  .branding {
    justify-content: center;
  }

  .nav-links {
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
  }

  .nav-button {
    width: 100%;
  }

  .navbar-right {
    width: 100%;
  }
}
</style>
