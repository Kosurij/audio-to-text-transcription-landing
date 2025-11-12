<template>
  <nav :class="['navbar', { scrolled: isScrolled }]">
    <div class="navbar-left">
      <a
        href="https://audio-to-text-transcription.com"
        class="branding"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Logo />
        <span class="product-name">Audio To Text Transcription</span>
      </a>

      <nav class="desktop-nav">
        <a href="#features" class="nav-link">Features</a>
        <a href="#how-it-works" class="nav-link">How it works</a>
        <a href="#faq" class="nav-link">FAQ</a>
      </nav>
    </div>

    <div class="navbar-right">
      <button
        class="theme-toggle"
        @click="toggleTheme"
        :aria-label="currentTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'"
      >
        <svg
          v-if="currentTheme === 'dark'"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2" />
          <path
            d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
        <svg
          v-else
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

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
        <a href="#features" class="mobile-link" @click.prevent="handleMobileNavigate('features')">
          Features
        </a>
        <a href="#how-it-works" class="mobile-link" @click.prevent="handleMobileNavigate('how-it-works')">
          How it works
        </a>
        <a href="#faq" class="mobile-link" @click.prevent="handleMobileNavigate('faq')">
          FAQ
        </a>
      </div>
    </transition>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Logo from './Logo.vue';

const isScrolled = ref(false);
const isMenuOpen = ref(false);
const currentTheme = ref<'light' | 'dark'>('light');
let mediaQuery: MediaQueryList | null = null;
let mediaQueryListener: ((event: MediaQueryListEvent) => void) | null = null;

const applyTheme = (theme: 'light' | 'dark') => {
  currentTheme.value = theme;
  document.documentElement.setAttribute('data-theme', theme);
};

const setTheme = (theme: 'light' | 'dark') => {
  applyTheme(theme);
  localStorage.setItem('theme', theme);
};

const toggleTheme = () => {
  const nextTheme = currentTheme.value === 'dark' ? 'light' : 'dark';
  setTheme(nextTheme);
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 8;
};

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const handleMobileNavigate = (sectionId: string) => {
  isMenuOpen.value = false;
  scrollToSection(sectionId);
};

onMounted(() => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    if (savedTheme === 'dark' || savedTheme === 'light') {
      applyTheme(savedTheme);
    } else {
      applyTheme(mediaQuery.matches ? 'dark' : 'light');
    }

    mediaQueryListener = (event: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        applyTheme(event.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', mediaQueryListener);
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
  if (mediaQuery && mediaQueryListener) {
    mediaQuery.removeEventListener('change', mediaQueryListener);
  }
});
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

.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border: none;
  background: transparent;
  color: var(--color-text);
  cursor: pointer;
  transition: color 0.2s ease;
  padding: 0;
}

.theme-toggle:hover {
  color: var(--accent-primary);
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
  background: var(--navbar-bg);
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
  background: rgba(26, 115, 232, 0.08);
  color: var(--accent-primary);
}

html[data-theme='dark'] .mobile-link:hover {
  background: rgba(138, 180, 248, 0.15);
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

  .theme-toggle {
    width: 44px;
    height: 44px;
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
  .product-name {
    font-size: 15px;
  }
}
</style>
