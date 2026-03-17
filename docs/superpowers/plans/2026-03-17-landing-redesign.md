# Landing Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Полный редизайн лендинга: Minimal стиль (белый/slate, синий акцент), split hero с превью расширения, новые секции SocialProofBar / CompatibilitySection / TestimonialsSection, alternating features layout, многоколоночный footer.

**Architecture:** Каждая секция — отдельный Vue 3 SFC (Single File Component) в `src/components/`. Страница `src/pages/index.astro` собирает компоненты в нужном порядке. Темизация через CSS-переменные в `Layout.astro` (уже существует, нужно обновить значения).

**Tech Stack:** Astro 4, Vue 3 (Composition API, `<script setup>`), scoped CSS, CSS-переменные для тем.

**Spec:** `docs/superpowers/specs/2026-03-17-landing-redesign.md`

**Визуальные материалы:** Во время разработки используются цветные блоки-заглушки (`background: #e2e8f0`, `border-radius: 8px`). Заменить на реальные GIF/скриншоты перед финальным QA.

**Проверка:** Так как проекте нет test suite для UI, каждая задача завершается визуальной проверкой:
```bash
npm run dev
# открыть http://localhost:4321, проверить light и dark темы
```

---

## Chunk 1: Foundation + Hero

### Task 1: Обновить глобальные CSS-переменные (Layout.astro)

Убрать синий градиент как глобальный фон, перейти на белый/slate под Minimal стиль.

**Files:**
- Modify: `src/layouts/Layout.astro`

- [ ] **Step 1: Заменить критические стили в `<head>` (`<style>` без атрибутов)**

Найти инлайн-блок `<style>` в `<head>` (примерно строки 280–312) и **заменить его целиком**:

```html
<style>
  html {
    scroll-behavior: smooth;
    background: #ffffff;
    overflow-x: hidden;
    margin: 0;
    padding: 0;
    width: 100%;
  }

  body {
    background: #ffffff;
    color: #202124;
    font-family: 'Google Sans', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding: 0;
    margin: 0;
    overflow-x: hidden;
  }

  .landing-page {
    min-height: 100vh;
    background: transparent;
    overflow-x: hidden;
    margin: 0;
    padding: 0;
    width: 100%;
  }
</style>
```

> Здесь используется `#ffffff` хардкодом (не переменная), потому что это критический CSS — он рендерится до загрузки CSS-переменных. `html[data-theme='dark']` обработает тёмную тему через JavaScript (уже есть в Layout.astro).

- [ ] **Step 2: Обновить `:root` и `html[data-theme='dark']` в `<style is:global>`**

В блоке `<style is:global>` заменить `:root` полностью:

```css
:root {
  --color-text: #202124;
  --color-text-secondary: #5F6368;
  --color-text-muted: #80868B;
  --color-background: #FFFFFF;
  --color-surface: #F8F9FA;
  --color-surface-elevated: #FFFFFF;
  --color-border: #E2E8F0;        /* было #DADCE0 — изменение глобальное, затронет все компоненты */
  --color-border-strong: #CBD5E1; /* было #BDC1C6 */
  --accent-primary: #2563EB;
  --accent-primary-hover: #1D4ED8;
  --accent-secondary: #0EA5E9;
  --accent-blue: #2563EB;
  --gradient-primary: linear-gradient(135deg, #2563EB 0%, #0EA5E9 100%);
  --gradient-primary-hover: linear-gradient(135deg, #1D4ED8 0%, #0284C7 100%);
  --gradient-bg: #FFFFFF;
  --gradient-bg-subtle: #F8FAFC;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.05);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.08), 0 4px 6px rgba(0, 0, 0, 0.04);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.08), 0 8px 10px rgba(0, 0, 0, 0.04);
  /* --navbar-bg и --navbar-blur удалены — NavigationBar больше не использует их после Task 2 */
}

html[data-theme='dark'] {
  --color-text: #F1F5F9;
  --color-text-secondary: #94A3B8;
  --color-text-muted: #64748B;
  --color-background: #0F172A;
  --color-surface: #1E293B;
  --color-surface-elevated: #1E293B;
  --color-border: #334155;
  --color-border-strong: #475569;
  --accent-primary: #3B82F6;
  --accent-primary-hover: #60A5FA;
  --accent-secondary: #38BDF8;
  --accent-blue: #3B82F6;
  --gradient-primary: linear-gradient(135deg, #3B82F6 0%, #38BDF8 100%);
  --gradient-primary-hover: linear-gradient(135deg, #60A5FA 0%, #7DD3FC 100%);
  --gradient-bg: #0F172A;
  --gradient-bg-subtle: #1E293B;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.4), 0 2px 4px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.5), 0 4px 6px rgba(0, 0, 0, 0.3);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.6), 0 8px 10px rgba(0, 0, 0, 0.4);
}
```

Также обновить `html` и `body` в `<style is:global>` (удалить `background-attachment: fixed` и gradient):
```css
html {
  scroll-behavior: smooth;
  background: var(--color-background);
  overflow-x: hidden;
  margin: 0;
  padding: 0;
  width: 100%;
}

body {
  background: var(--color-background);
  color: var(--color-text);
  /* остальные свойства оставить */
}
```

> ⚠️ `--color-border` меняется с `#DADCE0` на `#E2E8F0` — это затрагивает все компоненты, использующие `var(--color-border)`. После применения нужна визуальная проверка всей страницы.
>
> ⚠️ После этого коммита `--navbar-bg` перестаёт существовать. Navbar будет визуально сломан (прозрачный фон) **до применения Task 2**. Либо применяй Task 1 и Task 2 вместе без промежуточного коммита, либо делай коммит только после завершения обоих шагов.

- [ ] **Step 3: Проверить визуально**

```bash
npm run dev
```

Открыть http://localhost:4321. Фон — белый в light, `#0F172A` в dark. Переключить тему. Прокрутить страницу и убедиться, что границы и тени во всех секциях выглядят корректно (изменился `--color-border`).

- [ ] **Step 4: Commit (только вместе с Task 2)**

```bash
git add src/layouts/Layout.astro src/components/NavigationBar.vue
git commit -m "feat: update CSS variables to minimal white/slate theme and fix navbar blur"
```

---

### Task 2: NavigationBar — добавить backdrop blur

**Files:**
- Modify: `src/components/NavigationBar.vue`

> ⚠️ **Task 2 применять вместе с Task 1** (один коммит). После удаления `--navbar-bg` в Task 1 навбар будет прозрачным до применения этого таска.

- [ ] **Step 1: Найти и полностью заменить блок `.navbar` в NavigationBar.vue**

В `<style scoped>` найти существующий блок `.navbar { ... }` и **заменить его целиком** (не добавлять после, а именно заменить):

```css
.navbar {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
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
```

> Примечание: `html[data-theme='dark'] .navbar` в `<style scoped>` работает корректно — Vue применяет scoped-атрибут к последнему селектору (`.navbar`), поэтому правило компилируется в `html[data-theme='dark'] .navbar[data-v-xxx]` и матчится правильно. Этот паттерн уже используется в файле для других элементов.

- [ ] **Step 2: Удалить строки с `var(--navbar-bg)` в NavigationBar.vue**

После замены `.navbar` проверить, что в файле не осталось других обращений к `var(--navbar-bg)` (например, в `.mobile-menu`). Заменить `background: var(--navbar-bg)` на `background: var(--color-background)` везде где встречается.

- [ ] **Step 3: Commit (вместе с Layout.astro из Task 1)**

```bash
git add src/layouts/Layout.astro src/components/NavigationBar.vue
git commit -m "feat: update CSS variables to minimal white/slate theme and fix navbar blur"
```

- [ ] **Step 4: Проверить визуально**

```bash
npm run dev
```

Прокрутить страницу — навбар полупрозрачный с blur, обе темы корректны.

---

### Task 3: HeroSection — полная переработка

Заменить текущий full-screen hero с фоновым видео на split layout: текст/CTA/stats слева, floating panel справа.

**Files:**
- Modify: `src/components/HeroSection.vue`

- [ ] **Step 1: Полностью заменить шаблон HeroSection.vue**

```vue
<template>
  <section class="hero">
    <div class="hero-container">

      <!-- Левая колонка -->
      <div class="hero-left">
        <div class="hero-badge">
          ✦ Powered by Groq + Whisper AI
        </div>

        <h1 class="hero-title">
          Audio to Text<br />
          <span class="gradient-text">in seconds.</span>
        </h1>

        <p class="hero-subtitle">
          Chrome extension for meetings, interviews and lectures.
          Upload audio files, record mic or browser tab — get accurate text instantly.
        </p>

        <div class="hero-cta">
          <InstallButton class="hero-install-btn">
            + Add to Chrome — It's free
          </InstallButton>
          <p class="hero-cta-hint">No account required · Works in Chrome</p>
        </div>

        <div class="hero-stats">
          <div class="stat">
            <span class="stat-value">10k+</span>
            <span class="stat-label">Users</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-value">★ 4.8</span>
            <span class="stat-label">Chrome Store</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-value">95%+</span>
            <span class="stat-label">Accuracy</span>
          </div>
        </div>
      </div>

      <!-- Правая колонка: floating panel -->
      <div class="hero-right">
        <div class="hero-panel">
          <!-- Заглушка: заменить на реальный GIF расширения -->
          <div class="hero-panel-placeholder">
            <div class="placeholder-label">Extension UI Preview</div>
            <div class="placeholder-note">Replace with actual GIF/screenshot</div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import InstallButton from './InstallButton.vue';
</script>

<style scoped>
.hero {
  padding: 80px 0 60px;
  background: var(--color-background);
  overflow: hidden;
}

.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  gap: 64px;
}

/* Левая колонка */
.hero-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #EFF6FF;
  border: 1px solid #BFDBFE;
  border-radius: 100px;
  padding: 5px 14px;
  font-size: 13px;
  font-weight: 600;
  color: #2563EB;
  width: fit-content;
}

html[data-theme='dark'] .hero-badge {
  background: rgba(59, 130, 246, 0.1);
  border-color: rgba(59, 130, 246, 0.25);
  color: #60A5FA;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.04em;
  color: var(--color-text);
  margin: 0;
}

.gradient-text {
  background: var(--gradient-primary);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.hero-subtitle {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
  max-width: 480px;
  margin: 0;
}

.hero-cta {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.hero-install-btn {
  font-size: 16px;
  font-weight: 700;
  padding: 14px 28px;
  border-radius: 8px;
  width: fit-content;
  height: auto; /* override InstallButton's internal height: 36px */
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.3);
}

html[data-theme='dark'] .hero-install-btn {
  box-shadow: 0 4px 14px rgba(59, 130, 246, 0.35);
}

.hero-cta-hint {
  font-size: 13px;
  color: var(--color-text-muted);
  margin: 0;
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: 20px;
  padding-top: 20px;
  border-top: 1px solid var(--color-border);
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stat-value {
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--color-text);
}

.stat-label {
  font-size: 12px;
  color: var(--color-text-muted);
}

.stat-divider {
  width: 1px;
  height: 32px;
  background: var(--color-border);
}

/* Правая колонка */
.hero-right {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-panel {
  background: var(--color-surface-elevated);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%;
  max-width: 440px;
}

html[data-theme='dark'] .hero-panel {
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.4);
}

/* Заглушка — заменить на img с реальным GIF */
.hero-panel-placeholder {
  aspect-ratio: 3 / 4;
  background: var(--color-surface);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.placeholder-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-secondary);
}

.placeholder-note {
  font-size: 12px;
  color: var(--color-text-muted);
}

/* Mobile */
@media (max-width: 768px) {
  .hero {
    padding: 60px 0 40px;
  }

  .hero-container {
    flex-direction: column;
    gap: 40px;
  }

  .hero-left {
    gap: 20px;
  }

  .hero-title {
    font-size: 2.25rem;
  }

  .hero-install-btn {
    width: 100%;
    max-width: 320px;
    text-align: center;
    justify-content: center;
  }

  .hero-right {
    width: 100%;
  }

  .hero-panel {
    max-width: 100%;
  }
}
</style>
```

- [ ] **Step 2: Проверить визуально**

```bash
npm run dev
```

Открыть http://localhost:4321. Убедиться:
- Split layout работает на десктопе
- На мобильном (<768px) колонки складываются вертикально
- Заглушка правой панели видна
- Light и dark темы корректны

- [ ] **Step 3: Commit**

```bash
git add src/components/HeroSection.vue
git commit -m "feat: redesign HeroSection — split layout, stats bar, floating panel placeholder"
```

---

## Chunk 2: Trust Sections

> **Prerequisite:** Chunk 1 (Tasks 1–3) должен быть полностью применён перед началом этих задач. Все CSS-переменные, используемые в Tasks 4–6, определены в Task 1 (`Layout.astro`). Без Chunk 1 цвета и тени не будут работать.

### Task 4: SocialProofBar — новый компонент

**Files:**
- Create: `src/components/SocialProofBar.vue`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Создать SocialProofBar.vue**

```vue
<template>
  <section class="social-proof">
    <div class="social-proof-container">
      <div class="proof-item">
        <span class="proof-value">10,000+</span>
        <span class="proof-label">Users</span>
      </div>
      <div class="proof-divider"></div>
      <div class="proof-item">
        <span class="proof-value">★ 4.8</span>
        <span class="proof-label">Average Rating</span>
      </div>
      <div class="proof-divider"></div>
      <div class="proof-item">
        <span class="proof-value">500+</span>
        <span class="proof-label">Reviews on Chrome Web Store</span>
      </div>
      <div class="proof-divider"></div>
      <div class="proof-item proof-item--badge">
        <!-- Chrome icon — взять SVG path с simpleicons.org/icons/googlechrome (CC0).
             fill="#4285F4" — hardcoded Google blue, намеренно не адаптируется к dark mode (бренд-цвет). -->
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.001h-.002l-5.344 9.257c.206.01.413.016.621.016 6.627 0 12-5.373 12-12 0-1.54-.29-3.011-.818-4.364zM12 13.636a1.636 1.636 0 1 1 0-3.273 1.636 1.636 0 0 1 0 3.273z" fill="#4285F4"/>
        </svg>
        <span class="proof-label">Chrome Web Store</span>
      </div>
      <!-- Product Hunt badge: намеренно не добавляется — включать только при наличии активной страницы на Product Hunt (per spec). -->
    </div>
  </section>
</template>

<style scoped>
.social-proof {
  padding: 20px 0;
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.social-proof-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  flex-wrap: wrap;
}

.proof-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.proof-value {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-text);
  letter-spacing: -0.02em;
}

.proof-label {
  font-size: 13px;
  color: var(--color-text-secondary);
}

.proof-divider {
  width: 1px;
  height: 24px;
  background: var(--color-border);
}

@media (max-width: 600px) {
  .social-proof-container {
    gap: 16px;
  }

  .proof-divider {
    display: none;
  }

  .proof-item {
    flex-direction: column;
    gap: 2px;
    text-align: center;
  }
}
</style>
```

- [ ] **Step 2: Добавить в index.astro**

В `src/pages/index.astro` импортировать и вставить после HeroSection:

```astro
import SocialProofBar from '../components/SocialProofBar.vue';
// ...
<HeroSection client:load />
<SocialProofBar client:load />
```

- [ ] **Step 3: Проверить визуально**

```bash
npm run dev
```

Полоса со статистикой должна отображаться сразу под hero. Проверить mobile wrap.

- [ ] **Step 4: Commit**

```bash
git add src/components/SocialProofBar.vue src/pages/index.astro
git commit -m "feat: add SocialProofBar with stats"
```

---

### Task 5: CompatibilitySection — новый компонент

**Files:**
- Create: `src/components/CompatibilitySection.vue`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Создать CompatibilitySection.vue**

Логотипы платформ через SVG inline (Simple Icons / официальные бренд-киты — CC0/MIT лицензия):

```vue
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
// SVG paths взяты с simpleicons.org (CC0 license). Проверить актуальность перед релизом.
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
```

- [ ] **Step 2: Добавить в index.astro**

```astro
import CompatibilitySection from '../components/CompatibilitySection.vue';
// ...
<SocialProofBar client:load />
<CompatibilitySection client:load />
```

- [ ] **Step 3: Проверить визуально**

```bash
npm run dev
```

Убедиться, что логотипы выстраиваются в ряд, на мобильном — wrapping.

- [ ] **Step 4: Commit**

```bash
git add src/components/CompatibilitySection.vue src/pages/index.astro
git commit -m "feat: add CompatibilitySection with platform logos"
```

---

### Task 6: TestimonialsSection — новый компонент

**Files:**
- Create: `src/components/TestimonialsSection.vue`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Создать TestimonialsSection.vue**

Отзывы — статичный контент, написанный вручную (placeholder до готовности финального текста):

```vue
<template>
  <section class="testimonials" id="testimonials">
    <div class="testimonials-container">
      <div class="section-header">
        <h2 class="section-title">What Our Users Say</h2>
        <p class="section-subtitle">Thousands of professionals and students trust Audio to Text every day</p>
      </div>
      <div class="testimonials-grid">
        <div class="testimonial-card" v-for="testimonial in testimonials" :key="testimonial.name">
          <div class="testimonial-stars">★★★★★</div>
          <p class="testimonial-text">"{{ testimonial.text }}"</p>
          <div class="testimonial-author">
            <div class="author-avatar">{{ testimonial.name[0] }}</div>
            <div>
              <div class="author-name">{{ testimonial.name }}</div>
              <div class="author-role">{{ testimonial.role }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Placeholder testimonials — заменить на финальный текст перед QA
const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Project Manager',
    text: 'I use this extension every day to transcribe our team meetings. The accuracy is impressive — even with multiple speakers. Saves me at least an hour of work daily.',
  },
  {
    name: 'James K.',
    role: 'Journalist',
    text: 'As a journalist, I record interviews constantly. This extension transcribes an hour-long interview in under a minute. The SRT export is perfect for captions.',
  },
  {
    name: 'Priya S.',
    role: 'PhD Student',
    text: 'I transcribe my research interviews with this extension. The accuracy for academic content is excellent, and the export to DOCX saves so much editing time.',
  },
  {
    name: 'Marco D.',
    role: 'Content Creator',
    text: 'Game changer for my YouTube workflow. I record my commentary, transcribe it instantly, and use the SRT file directly for subtitles. Simple and accurate.',
  },
  {
    name: 'Anna R.',
    role: 'Legal Assistant',
    text: 'We use this to transcribe client consultations. The privacy-first approach is important for us — no data stored, quick results. Highly recommended.',
  },
  {
    name: 'Tom W.',
    role: 'Podcast Producer',
    text: 'Transcribing podcast episodes used to take hours. Now it takes minutes. The tab recording feature is especially useful — I can capture audio directly from the browser.',
  },
];
</script>

<style scoped>
.testimonials {
  padding: 80px 0;
  background: var(--color-surface);
}

.testimonials-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.section-header {
  text-align: center;
  margin-bottom: 56px;
}

.section-title {
  font-size: clamp(1.75rem, 4vw, 2.75rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--color-text);
  margin-bottom: 12px;
}

.section-subtitle {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  max-width: 560px;
  margin: 0 auto;
  line-height: 1.6;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.testimonial-card {
  background: var(--color-surface-elevated);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: var(--shadow-sm);
}

.testimonial-stars {
  font-size: 16px;
  color: #F59E0B; /* amber — hardcoded намеренно, одинаково в light/dark (звёзды всегда жёлтые) */
  letter-spacing: 2px;
}

.testimonial-text {
  font-size: 15px;
  line-height: 1.7;
  color: var(--color-text-secondary);
  flex: 1;
  margin: 0;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 12px;
}

.author-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--gradient-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  flex-shrink: 0;
}

.author-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
}

.author-role {
  font-size: 12px;
  color: var(--color-text-muted);
}

@media (max-width: 900px) {
  .testimonials-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .testimonials-grid {
    grid-template-columns: 1fr;
  }

  .testimonials {
    padding: 60px 0;
  }
}
</style>
```

- [ ] **Step 2: Добавить в index.astro (после HowItWorksSection, до FAQSection)**

```astro
import TestimonialsSection from '../components/TestimonialsSection.vue';
// ...
<HowItWorksSection client:load />
<TestimonialsSection client:load />
```

- [ ] **Step 3: Проверить визуально**

```bash
npm run dev
```

Проверить 3-колоночную сетку на десктопе, 2 колонки на планшете, 1 на мобильном.

- [ ] **Step 4: Commit**

```bash
git add src/components/TestimonialsSection.vue src/pages/index.astro
git commit -m "feat: add TestimonialsSection with static review cards"
```

---

## Chunk 3: Content Sections

> **Prerequisite:** Chunk 1 (Tasks 1–3) должен быть применён первым.

### Task 7: FeaturesSection — alternating layout с медиа

Переработать существующий `BenefitsSection.vue` в alternating layout.

> **Важно:** Файл остаётся с именем `BenefitsSection.vue` — не переименовывать. Имя CSS-классов внутри будет `features`, но файл и его импорт в `index.astro` не меняются.

**Files:**
- Modify: `src/components/BenefitsSection.vue`

- [ ] **Step 1: Полностью заменить BenefitsSection.vue**

```vue
<template>
  <section class="features" id="features">
    <div class="features-container">
      <div class="section-header">
        <h2 class="section-title">Everything you need to transcribe</h2>
        <p class="section-subtitle">Powerful features that make audio-to-text conversion fast and effortless</p>
      </div>

      <div class="features-list">
        <div
          class="feature-row"
          v-for="(feature, index) in features"
          :key="feature.title"
          :class="{ 'feature-row--reversed': index % 2 === 1 }"
        >
          <!-- Text -->
          <div class="feature-text">
            <div class="feature-icon">{{ feature.emoji }}</div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-description">{{ feature.description }}</p>
          </div>

          <!-- Media -->
          <div class="feature-media">
            <!-- Заглушка: заменить на <img :src="feature.media" :alt="feature.title" /> -->
            <div class="media-placeholder">
              <span class="media-placeholder-label">{{ feature.mediaLabel }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// mediaLabel — убрать после замены заглушек на реальные GIF/скриншоты
const features = [
  {
    emoji: '⚡',
    title: 'Lightning Fast Transcription',
    description: 'Upload any audio file and get accurate text in seconds. Powered by Groq + Whisper AI — one of the fastest transcription engines available. No waiting, no delays.',
    mediaLabel: 'GIF: Upload file → transcript appears',
  },
  {
    emoji: '🎙',
    title: 'Record Mic or Browser Tab',
    description: 'Transcribe live audio directly in Chrome. Record from your microphone for in-person meetings, or capture any browser tab audio — perfect for online meetings, webinars, and podcasts.',
    mediaLabel: 'GIF: Click record → waveform → text',
  },
  {
    emoji: '📄',
    title: 'Export in Any Format',
    description: 'Copy text to clipboard, or export as TXT, DOCX, or SRT. The SRT format is ideal for video subtitles — just upload and you\'re done.',
    mediaLabel: 'Screenshot: Export buttons TXT/DOCX/SRT',
  },
  {
    emoji: '🔒',
    title: 'Privacy First',
    description: 'Your audio is processed via the Groq API and never stored. We don\'t save recordings, transcripts, or personal data. What you transcribe stays yours.',
    mediaLabel: 'Illustration or icon (no GIF needed)',
  },
];
</script>

<style scoped>
.features {
  padding: 80px 0;
  background: var(--color-background);
}

.features-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.section-header {
  text-align: center;
  margin-bottom: 72px;
}

.section-title {
  font-size: clamp(1.75rem, 4vw, 2.75rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--color-text);
  margin-bottom: 12px;
}

.section-subtitle {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  max-width: 520px;
  margin: 0 auto;
  line-height: 1.6;
}

.features-list {
  display: flex;
  flex-direction: column;
  gap: 80px;
}

.feature-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}

.feature-row--reversed {
  direction: rtl;
}

.feature-row--reversed > * {
  direction: ltr;
}

/* Dark mode: обрабатывается через CSS-переменные в Layout.astro — дополнительных правил здесь не нужно */

.feature-text {
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: left; /* явно, чтобы не зависеть от RTL-наследования */
}

.feature-icon {
  font-size: 2rem;
  line-height: 1;
}

.feature-title {
  font-size: 1.625rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-text);
  margin: 0;
  text-align: left; /* явно — защита от RTL-наследования */
}

.feature-description {
  font-size: 1.0625rem;
  line-height: 1.75;
  color: var(--color-text-secondary);
  margin: 0;
  text-align: left; /* явно — защита от RTL-наследования */
}

.feature-media {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

/* Заглушка — убрать после замены на реальные img */
.media-placeholder {
  aspect-ratio: 16 / 10;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.media-placeholder-label {
  font-size: 13px;
  color: var(--color-text-muted);
  text-align: center;
  line-height: 1.5;
}

/* Mobile */
@media (max-width: 768px) {
  .features {
    padding: 60px 0;
  }

  .feature-row {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .feature-row--reversed {
    direction: ltr;
  }

  .features-list {
    gap: 56px;
  }
}
</style>
```

- [ ] **Step 2: Проверить визуально**

```bash
npm run dev
```

Нечётные строки: текст слева, медиа справа. Чётные — наоборот. На мобильном — одна колонка.

- [ ] **Step 3: Commit**

```bash
git add src/components/BenefitsSection.vue
git commit -m "feat: redesign BenefitsSection — alternating layout with media placeholders"
```

---

### Task 8: HowItWorksSection — убрать YouTube, добавить шаги с GIF

**Files:**
- Modify: `src/components/HowItWorksSection.vue`

> **Важно:** Существующий файл содержит IntersectionObserver для ленивой загрузки YouTube iframe, `ref`, `onMounted`, `onUnmounted`. Весь этот код удаляется вместе с iframe — намеренно. Новая реализация не нуждается в реактивной логике.

> **Layout:** В DOM `step-media` стоит перед `step-content`. Без RTL (нечётные шаги) медиа оказывается в левой колонке, текст — в правой. Для чётных шагов `direction: rtl` меняет порядок: текст слева, медиа справа. Это согласованный чередующийся layout с медиа-первым в DOM.

- [ ] **Step 1: Полностью заменить HowItWorksSection.vue**

```vue
<template>
  <section class="how-it-works" id="how-it-works">
    <div class="how-it-works-container">
      <div class="section-header">
        <h2 class="section-title">How it works</h2>
        <p class="section-subtitle">Get your first transcription in under 2 minutes</p>
      </div>

      <div class="steps">
        <div class="step" v-for="(step, index) in steps" :key="index">
          <div class="step-media">
            <!-- Заглушка: заменить на <img :src="step.media" :alt="step.title" /> -->
            <div class="media-placeholder">
              <span>{{ step.mediaLabel }}</span>
            </div>
          </div>
          <div class="step-content">
            <div class="step-number">{{ index + 1 }}</div>
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-description">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const steps = [
  {
    title: 'Install the Extension',
    description: 'Add Audio to Text to Chrome with one click — no account or sign-up required. The extension appears in your toolbar instantly.',
    mediaLabel: 'Screenshot: Chrome Web Store install page',
  },
  {
    title: 'Upload or Record Audio',
    description: 'Drag and drop an audio file (MP3, WAV, M4A, OGG and more), or click Record to capture your microphone or any browser tab in real time.',
    mediaLabel: 'GIF: Upload file or click Record button',
  },
  {
    title: 'Get Your Transcription',
    description: 'Accurate text appears in seconds. Edit if needed, then copy to clipboard or export as TXT, DOCX, or SRT — ready to use immediately.',
    mediaLabel: 'GIF: Text appearing, copy/export buttons',
  },
];
</script>

<style scoped>
.how-it-works {
  padding: 80px 0;
  background: var(--color-surface);
}

.how-it-works-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.section-header {
  text-align: center;
  margin-bottom: 64px;
}

.section-title {
  font-size: clamp(1.75rem, 4vw, 2.75rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--color-text);
  margin-bottom: 12px;
}

.section-subtitle {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  max-width: 480px;
  margin: 0 auto;
}

/* Dark mode: обрабатывается через CSS-переменные в Layout.astro — дополнительных правил здесь не нужно */

.steps {
  display: flex;
  flex-direction: column;
  gap: 72px;
}

.step {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}

.step:nth-child(even) {
  direction: rtl;
}

.step:nth-child(even) > * {
  direction: ltr;
}


.step-media {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.media-placeholder {
  aspect-ratio: 16 / 10;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-size: 13px;
  color: var(--color-text-muted);
  text-align: center;
}

.step-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: left; /* явно — защита от RTL-наследования */
}

.step-number {
  width: 44px;
  height: 44px;
  background: var(--gradient-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 800;
  color: white;
  flex-shrink: 0;
}

.step-title {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-text);
  margin: 0;
  text-align: left; /* явно — защита от RTL-наследования */
}

.step-description {
  font-size: 1.0625rem;
  line-height: 1.75;
  color: var(--color-text-secondary);
  margin: 0;
  text-align: left; /* явно — защита от RTL-наследования */
}

@media (max-width: 768px) {
  .how-it-works {
    padding: 60px 0;
  }

  .step {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .step:nth-child(even) {
    direction: ltr;
  }

  .steps {
    gap: 52px;
  }
}
</style>
```

- [ ] **Step 2: Проверить визуально**

```bash
npm run dev
```

3 шага с чередующимися колонками. YouTube iframe должен исчезнуть.

- [ ] **Step 3: Commit**

```bash
git add src/components/HowItWorksSection.vue
git commit -m "feat: redesign HowItWorksSection — remove YouTube, add 3-step layout with media placeholders"
```

---

## Chunk 4: Supporting Sections + Wiring

> **Prerequisite:** Chunks 1–3 должны быть применены перед началом этих задач.

### Task 9: FAQSection — обновить стиль

**Files:**
- Modify: `src/components/FAQSection.vue`

- [ ] **Step 1: Обновить стили FAQSection под новую цветовую схему**

Структуру HTML и вопросы не трогать. Внести следующие точечные правки:

**1. Убрать font-family override на `.faq-question`** (строка ~162):
```css
/* Удалить эту строку: */
font-family: 'Space Grotesk', sans-serif;
```
Шрифт должен наследоваться из глобального Layout.astro.

**2. Заменить background `.faq` на `var(--color-surface)`** (строка ~85):
```css
/* Было: */
background: var(--gradient-bg-subtle);

/* Стало: */
background: var(--color-surface);
```
Оба значения дают схожий результат, но `--color-surface` — семантически правильная переменная для фона секций.

**3. Остальные переменные** (`--color-surface-elevated`, `--shadow-md`, `--shadow-lg`, `--accent-primary`, `--gradient-primary`, `--color-text`, `--color-text-secondary`, `--color-border`) — уже определены в новом `:root` из Task 1, менять не нужно.

- [ ] **Step 2: Проверить визуально**

```bash
npm run dev
```

FAQ должен открываться/закрываться и выглядеть консистентно с остальным лендингом.

- [ ] **Step 3: Commit**

```bash
git add src/components/FAQSection.vue
git commit -m "feat: update FAQSection styles to new theme variables"
```

---

### Task 10: CTASection — обновить стиль

**Files:**
- Modify: `src/components/CTASection.vue`

- [ ] **Step 1: Полностью заменить CTASection.vue**

Текущий файл содержит абсолютно-позиционированный `<div class="cta-background">` с радиальным градиентом и белую карточку `.cta-content`. Оба создают конфликт с новым solid-фоном — нужно заменить файл целиком:

```vue
<template>
  <section class="cta">
    <div class="cta-container">
      <h2 class="cta-title">Ready to transcribe your audio?</h2>
      <p class="cta-subtitle">
        Join thousands of professionals and students. Install free — no account required.
      </p>
      <InstallButton class="cta-button">
        + Add to Chrome — It's free
      </InstallButton>
      <p class="cta-hint">Works in Chrome · No sign-up needed</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import InstallButton from './InstallButton.vue';
</script>

<style scoped>
.cta {
  padding: 80px 0;
  background: var(--accent-primary);
  text-align: center;
}

html[data-theme='dark'] .cta {
  background: var(--color-surface); /* в dark mode — поверхность, чтобы выделяться на #0F172A фоне */
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.cta-container {
  max-width: 680px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.cta-title {
  font-size: clamp(1.75rem, 4vw, 2.75rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #FFFFFF;
  margin: 0;
}

html[data-theme='dark'] .cta-title {
  color: var(--color-text);
}

.cta-subtitle {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
  max-width: 480px;
  margin: 0;
}

html[data-theme='dark'] .cta-subtitle {
  color: var(--color-text-secondary);
}

.cta-button {
  font-size: 16px;
  font-weight: 700;
  padding: 14px 28px;
  border-radius: 8px;
  height: auto; /* override InstallButton's internal height: 36px */
  background: #FFFFFF;
  color: var(--accent-primary);
}

html[data-theme='dark'] .cta-button {
  background: var(--accent-primary);
  color: #FFFFFF;
}

.cta-hint {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.65);
  margin: 0;
}

html[data-theme='dark'] .cta-hint {
  color: var(--color-text-muted);
}

@media (max-width: 600px) {
  .cta {
    padding: 60px 0;
  }

  .cta-button {
    width: 100%;
    max-width: 320px;
  }
}
</style>
```

- [ ] **Step 2: Проверить визуально**

```bash
npm run dev
```

CTA секция должна выделяться как финальный призыв к действию.

- [ ] **Step 3: Commit**

```bash
git add src/components/CTASection.vue
git commit -m "feat: update CTASection to solid accent background"
```

---

### Task 11: AppFooter — многоколоночный layout

**Files:**
- Modify: `src/components/AppFooter.vue`

- [ ] **Step 1: Полностью заменить AppFooter.vue**

```vue
<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-main">

        <!-- Колонка 1: Бренд -->
        <div class="footer-brand">
          <div class="footer-logo">
            <Logo />
            <span class="footer-logo-text">Audio to Text</span>
          </div>
          <p class="footer-tagline">
            Chrome extension for instant audio transcription. Powered by Groq + Whisper AI.
          </p>
        </div>

        <!-- Колонка 2: Product -->
        <div class="footer-col">
          <h4 class="footer-col-title">Product</h4>
          <ul class="footer-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#how-it-works">How it works</a></li>
            <li><a href="#testimonials">Reviews</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>

        <!-- Колонка 3: Legal & Support -->
        <div class="footer-col">
          <h4 class="footer-col-title">Support</h4>
          <ul class="footer-links">
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/uninstall">Uninstall</a></li>
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

.footer-copyright {
  font-size: 13px;
  color: var(--color-text-muted);
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
```

- [ ] **Step 2: Проверить визуально**

```bash
npm run dev
```

Footer: 3 колонки на десктопе, 2 на планшете (бренд во всю ширину), 1 на мобильном. Ссылки кликабельны, `/privacy` и `/uninstall` ведут на существующие страницы.

- [ ] **Step 3: Commit**

```bash
git add src/components/AppFooter.vue
git commit -m "feat: redesign AppFooter — multi-column layout"
```

---

### Task 12: Обновить index.astro — финальный порядок секций

**Files:**
- Modify: `src/pages/index.astro`

> **client:load:** Все компоненты используют `client:load` для простоты — лендинг небольшой и гидрация не критична по производительности. Можно оптимизировать до `client:visible` для компонентов ниже fold позже, но это не входит в scope.

> **CSS-сброс:** Текущий `index.astro` содержит `margin: 0; padding: 0; width: 100%` на `.landing-page` и `body { margin: 0; padding: 0 }`. Эти правила уже обрабатываются в `Layout.astro` через глобальные стили (Task 1), поэтому в новом шаблоне они не повторяются. Убедитесь, что Task 1 применён перед этим шагом.

- [ ] **Step 1: Привести index.astro к финальному виду**

```astro
---
import Layout from '../layouts/Layout.astro';
import NavigationBar from '../components/NavigationBar.vue';
import HeroSection from '../components/HeroSection.vue';
import SocialProofBar from '../components/SocialProofBar.vue';
import CompatibilitySection from '../components/CompatibilitySection.vue';
import BenefitsSection from '../components/BenefitsSection.vue';
import HowItWorksSection from '../components/HowItWorksSection.vue';
import TestimonialsSection from '../components/TestimonialsSection.vue';
import FAQSection from '../components/FAQSection.vue';
import CTASection from '../components/CTASection.vue';
import AppFooter from '../components/AppFooter.vue';

const title = 'Audio To Text Transcription - Convert Audio to Text Instantly | Chrome Extension';
const description = 'Convert audio and video to text instantly with our Chrome extension. Upload files, record from microphone or browser tab. Powered by Groq + Whisper AI. Edit transcripts and export to multiple formats.';
---

<Layout title={title} description={description}>
  <NavigationBar client:load />
  <main class="landing-page">
    <HeroSection client:load />
    <SocialProofBar client:load />
    <CompatibilitySection client:load />
    <BenefitsSection client:load />
    <HowItWorksSection client:load />
    <TestimonialsSection client:load />
    <FAQSection client:load />
    <CTASection client:load />
    <AppFooter client:load />
  </main>
</Layout>

<style>
  .landing-page {
    min-height: 100vh;
    background: transparent;
    overflow-x: hidden;
  }
</style>
```

- [ ] **Step 2: Финальная визуальная проверка всей страницы**

```bash
npm run dev
```

Прокрутить всю страницу от начала до конца:
- [ ] NavigationBar: sticky, blur, обе темы
- [ ] Hero: split layout, заглушка панели, stats
- [ ] SocialProofBar: статистика
- [ ] CompatibilitySection: логотипы платформ
- [ ] BenefitsSection: 4 фичи, чередующийся layout
- [ ] HowItWorksSection: 3 шага, без YouTube
- [ ] TestimonialsSection: 6 карточек
- [ ] FAQSection: аккордеон
- [ ] CTASection: контрастный фон
- [ ] AppFooter: 3 колонки

Проверить mobile (dev tools → responsive mode, 375px).

- [ ] **Step 3: Финальный commit**

```bash
git add src/pages/index.astro
git commit -m "feat: wire all redesigned sections in index.astro"
```

---

## После реализации: замена заглушек на реальные материалы

Когда визуальные материалы будут готовы:

1. `src/components/HeroSection.vue` — заменить `.hero-panel-placeholder` на:
   ```html
   <img src="/hero-demo.gif" alt="Audio to Text extension in action" loading="eager" />
   ```

2. `src/components/BenefitsSection.vue` — для каждой фичи добавить `media` поле в `features` и заменить `.media-placeholder` на `<img>`.

3. `src/components/HowItWorksSection.vue` — аналогично для каждого шага.

4. Добавить `loading="lazy"` для GIF ниже первого экрана.

5. Commit: `feat: replace media placeholders with real GIFs and screenshots`
