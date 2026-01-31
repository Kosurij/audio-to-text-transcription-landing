<template>
  <nav :class="['navbar', { scrolled: isScrolled }]">
    <div class="navbar-inner">
      <a
        href="/"
        class="branding"
      >
        <Logo />
      </a>

      <nav class="desktop-nav">
        <a href="/#features" class="nav-link" @click.prevent="navigateToSection('features')">Features</a>
        <a href="/#how-it-works" class="nav-link" @click.prevent="navigateToSection('how-it-works')">How it Works</a>
        <a href="/#faq" class="nav-link" @click.prevent="navigateToSection('faq')">FAQ</a>
      </nav>

      <div class="navbar-right">
        <button
          class="theme-toggle"
          @click="toggleTheme"
          :aria-label="currentTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'"
        >
          <svg
            v-if="currentTheme === 'dark'"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
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
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
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

        <InstallButton :compact="true" class="navbar-cta" />

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
    </div>

    <transition name="fade">
      <div v-if="isMenuOpen" class="mobile-menu">
        <a href="/#features" class="mobile-link" @click.prevent="handleMobileNavigate('features')">
          Features
        </a>
        <a href="/#how-it-works" class="mobile-link" @click.prevent="handleMobileNavigate('how-it-works')">
          How it Works
        </a>
        <a href="/#faq" class="mobile-link" @click.prevent="handleMobileNavigate('faq')">
          FAQ
        </a>
        <div class="mobile-cta">
          <InstallButton />
        </div>
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
  background: var(--navbar-bg);
  border-bottom: 1px solid transparent;
  transition: all 0.3s ease;
}

.navbar.scrolled {
  border-bottom-color: var(--color-border);
  box-shadow: var(--shadow-sm);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.9);
}

html[data-theme='dark'] .navbar.scrolled {
  background: rgba(26, 22, 20, 0.9);
}

.navbar-inner {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 72px;
  padding: 0 32px;
}

.branding {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s ease;
  flex-shrink: 0;
}

.branding:hover {
  opacity: 0.85;
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: 36px;
}

.nav-link {
  font-size: 15px;
  font-weight: 500;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color 0.2s ease;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 100%;
  height: 2px;
  background: var(--accent-primary);
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.2s ease;
}

.nav-link:hover {
  color: var(--color-text);
}

.nav-link:hover::after {
  transform: scaleX(1);
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: color 0.2s ease;
  padding: 0;
  border-radius: var(--radius-sm);
}

.theme-toggle:hover {
  color: var(--color-text);
}

.navbar-cta {
  /* Visible on desktop */
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
  cursor: pointer;
}

.burger-button span {
  display: block;
  height: 2px;
  background: var(--color-text);
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
  top: 72px;
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
  font-weight: 500;
  color: var(--color-text);
  text-decoration: none;
  padding: 16px 24px;
  border-bottom: 1px solid var(--color-border-light);
  transition: background 0.2s ease;
}

.mobile-link:last-of-type {
  border-bottom: none;
}

.mobile-link:hover {
  background: var(--accent-primary-light);
}

.mobile-cta {
  padding: 16px 24px;
  border-top: 1px solid var(--color-border-light);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .navbar-inner {
    padding: 0 20px;
    min-height: 64px;
  }

  .desktop-nav {
    display: none;
  }

  .navbar-cta {
    display: none;
  }

  .burger-button {
    display: flex;
  }

  .mobile-menu {
    top: 64px;
  }
}
</style>
