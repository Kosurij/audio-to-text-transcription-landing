<template>
  <nav :class="['navbar', { scrolled: isScrolled }]">
    <div class="navbar-left">
      <a href="/" class="branding">
        <Logo loading="eager" />
        <span class="product-name">Audio To Text Transcription</span>
      </a>

      <nav class="desktop-nav">
        <a href="/#features" class="nav-link" @click.prevent="navigateToSection('features')">Features</a>
        <a href="/#how-it-works" class="nav-link" @click.prevent="navigateToSection('how-it-works')">How it works</a>
        <a href="/#pricing" class="nav-link" @click.prevent="navigateToSection('pricing')">Pricing</a>
        <a href="/#faq" class="nav-link" @click.prevent="navigateToSection('faq')">FAQ</a>
      </nav>
    </div>

    <div class="navbar-right">
      <InstallButton class="navbar-cta">+ Add to Chrome</InstallButton>

      <button
        class="burger-button"
        :class="{ open: isMenuOpen }"
        @click="isMenuOpen = !isMenuOpen"
        aria-label="Toggle navigation"
      >
        <span />
        <span />
        <span />
      </button>
    </div>

    <transition name="fade">
      <div v-if="isMenuOpen" class="mobile-menu">
        <a href="/#features" class="mobile-link" @click.prevent="handleMobileNavigate('features')">
          Features
        </a>
        <a href="/#how-it-works" class="mobile-link" @click.prevent="handleMobileNavigate('how-it-works')">
          How it works
        </a>
        <a href="/#pricing" class="mobile-link" @click.prevent="handleMobileNavigate('pricing')">
          Pricing
        </a>
        <a href="/#faq" class="mobile-link" @click.prevent="handleMobileNavigate('faq')">
          FAQ
        </a>
      </div>
    </transition>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Logo from './Logo.vue';
import InstallButton from './InstallButton.vue';

const isScrolled = ref(false);
const isMenuOpen = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 8;
};

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const navigateToSection = (sectionId: string) => {
  if (typeof window === 'undefined') return;
  const currentPath = window.location.pathname;
  if (currentPath === '/' || currentPath === '/index.html') {
    scrollToSection(sectionId);
  } else {
    window.location.href = `/#${sectionId}`;
  }
};

const handleMobileNavigate = (sectionId: string) => {
  isMenuOpen.value = false;
  navigateToSection(sectionId);
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 88px;
  padding: 0 40px;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
  transition: background 0.2s ease;
}

html[data-theme='dark'] .navbar {
  background: rgba(15, 23, 42, 0.88);
  border-bottom: 1px solid rgba(51, 65, 85, 0.8);
}

.navbar.scrolled {
  box-shadow: var(--shadow-md);
}

.navbar-left,
.navbar-right {
  display: flex;
  align-items: center;
}

.navbar-left {
  gap: 32px;
  flex: 1;
}

.branding {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 1;
  min-width: 0;
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s ease;
}

.branding:hover {
  opacity: 0.9;
}

.product-name {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-text);
  letter-spacing: -0.01em;
  white-space: nowrap;
}

.desktop-nav {
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

.navbar-right {
  justify-content: flex-end;
  flex: 0 0 auto;
  gap: 16px;
}

.navbar-cta {
  font-size: 14px;
  font-weight: 600;
  padding: 8px 20px;
  height: 38px;
  border-radius: 100px !important;
}

.burger-button {
  position: relative;
  width: 24px;
  height: 18px;
  display: none;
  flex-direction: column;
  justify-content: space-between;
  border: none;
  background: none;
  padding: 0;
  margin-left: 0;
  cursor: pointer;
}

.burger-button span {
  display: block;
  height: 2px;
  background: var(--accent-primary);
  border-radius: 999px;
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform-origin: center;
}

.burger-button.open span:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.burger-button.open span:nth-child(2) {
  opacity: 0;
}

.burger-button.open span:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

.mobile-menu {
  position: absolute;
  top: 88px;
  right: 0;
  left: 0;
  background: var(--color-background);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 999;
}

.mobile-link {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text);
  text-decoration: none;
  padding: 18px 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  transition: background 0.2s ease, color 0.2s ease;
}

html[data-theme='dark'] .mobile-link {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.mobile-link:last-child {
  border-bottom: none;
}

.mobile-link:hover {
  background: rgba(37, 99, 235, 0.08);
  color: var(--accent-primary);
}

html[data-theme='dark'] .mobile-link:hover {
  background: rgba(59, 130, 246, 0.15);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 1024px) {
  .navbar-left {
    gap: 32px;
  }

  .desktop-nav {
    gap: 24px;
  }
}

@media (max-width: 768px) {
  .navbar {
    padding: 0 20px;
    min-height: 56px;
  }

  .mobile-menu {
    top: 56px;
  }

  .desktop-nav {
    display: none;
  }

  .burger-button {
    display: flex;
  }

  .product-name {
    font-size: 18px;
    white-space: normal;
  }

  .navbar-cta {
    display: none !important;
  }

  .navbar-right {
    gap: 0;
  }
}

@media (max-width: 640px) {
  .navbar {
    padding: 0 16px;
  }

  .navbar-left {
    gap: 16px;
  }

  .branding {
    gap: 6px;
  }

  .product-name {
    font-size: 16px;
    line-height: 1.25;
  }

  .navbar-right {
    gap: 8px;
  }
}

@media (max-width: 480px) {
  .branding {
    gap: 10px;
  }

  .product-name {
    font-size: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 190px;
  }
}
</style>
