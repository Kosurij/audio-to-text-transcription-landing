# Mobile Sliders Design Spec
**Date:** 2026-03-18
**Status:** Draft

## Overview

Add mobile-only carousel/slider behaviour to two existing sections:
1. **HowItWorksSection** — Embla carousel with continuous progress bar
2. **TestimonialsSection** — Embla swipe-only slider with peek

Desktop layouts remain completely unchanged.

---

## 1. Dependencies

Add to `package.json`:
- `embla-carousel` — core carousel engine (~7kb gzip)

`embla-carousel-vue` is NOT used. Both components use the vanilla Embla JS API directly inside `onMounted` / `onUnmounted`.

---

## 2. How It Works Carousel

### Trigger
- Shown at `≤768px` via CSS (`display: block`)
- Desktop grid (`.steps`) hidden at `≤768px` via CSS (`display: none`)
- Note: `.steps` already collapses to single-column at `≤900px` — the 900px rule stays intact; the carousel only replaces the layout below 768px

### Behaviour
- One card visible at a time, 100% width
- Navigation: swipe only (no arrows)
- Loop: disabled (`loop: false`)

### Cards
- Same `.step` card structure as desktop rendered via `v-for` over the existing `steps` array
- Each step object already has `title`, `description`, and `mediaLabel` properties — no data changes needed
- **Media placeholder is shown** inside the slider. The existing `@media (max-width: 768px) { .step-media { display: none } }` rule must be **removed** and replaced with `.steps .step-media { display: none }` (scoped to the desktop grid only). This ensures media is visible inside the carousel.

### Progress Bar
- Positioned below the Embla viewport, full container width
- Track: `4px` height, `border-radius: 2px`, background `var(--color-border)`
- Fill: `var(--accent-primary)`, width = `progress%`
- `progress` starts at `0` and is updated on every Embla `scroll` event via `embla.scrollProgress() * 100`
- At rest on slide 1: fill = 0%. After swiping to last slide: fill = 100%

### Markup
```html
<!-- mobile only, hidden on desktop -->
<div class="hiw-carousel">
  <div class="embla__viewport" ref="emblaViewportRef">
    <div class="embla__container">
      <div class="embla__slide" v-for="(step, index) in steps" :key="step.title">
        <div class="step">
          <div class="step-media">
            <div class="media-placeholder">
              <span class="media-placeholder-label">{{ step.mediaLabel }}</span>
            </div>
          </div>
          <div class="step-content">
            <div class="step-number">{{ index + 1 }}.</div>
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-description">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="hiw-progress-track">
    <div class="hiw-progress-fill" :style="{ width: progress + '%' }"></div>
  </div>
</div>
```

### Script
```ts
import EmblaCarousel from 'embla-carousel'
import type { EmblaCarouselType } from 'embla-carousel'

const emblaViewportRef = ref<HTMLElement | null>(null)
const progress = ref(0)
let embla: EmblaCarouselType | null = null

onMounted(() => {
  if (!emblaViewportRef.value) return
  embla = EmblaCarousel(emblaViewportRef.value, { loop: false })
  embla.on('scroll', () => {
    progress.value = Math.round((embla?.scrollProgress() ?? 0) * 100)
  })
})

onUnmounted(() => {
  embla?.destroy()
  embla = null
})
```

### CSS additions
```css
/* Mobile carousel wrapper — hidden on desktop */
.hiw-carousel {
  display: none;
}
@media (max-width: 768px) {
  /* Hide desktop grid */
  .steps {
    display: none;
  }
  /* Show carousel */
  .hiw-carousel {
    display: block;
  }
  /* Embla required styles */
  .hiw-carousel .embla__viewport {
    overflow: hidden;
    touch-action: pan-y;
  }
  .hiw-carousel .embla__container {
    display: flex;
  }
  .hiw-carousel .embla__slide {
    flex: 0 0 100%;
    min-width: 0;
  }
  /* Progress bar */
  .hiw-progress-track {
    margin-top: 16px;
    height: 4px;
    border-radius: 2px;
    background: var(--color-border);
    overflow: hidden;
  }
  .hiw-progress-fill {
    height: 100%;
    border-radius: 2px;
    background: var(--accent-primary);
    transition: width 0.1s ease;
  }
  /* Scope the media hide rule to desktop grid only */
  .steps .step-media {
    display: none;
  }
}
```

---

## 3. Testimonials Slider

### Trigger
- Shown at `≤768px` via CSS (`display: block`)
- Desktop grid (`.testimonials-grid`) hidden at `≤768px` via CSS (`display: none`)
- The existing `@media (max-width: 900px)` rule must be **kept** — it handles the 769–900px range where the desktop grid still shows (2-column → reset inline placement)
- The existing `@media (max-width: 480px)` rule can be **removed** — it becomes redundant since the grid is hidden below 768px

### Behaviour
- One card visible at a time
- Navigation: swipe only — no dots, no arrows
- Loop: disabled
- **Peek:** next card shows ~16px to signal swipeability
  - Slide width: `calc(100% - 32px)`, gap between slides: `16px` → 16px of next slide visible
  - `containScroll: 'keepSnaps'` on Embla options (prevents over-scrolling blank space at last slide while still enabling peek)
  - Viewport: `overflow: hidden`; wrapper: `overflow: visible`

### Cards
- Flatten into a single `allTestimonials` array: `[...tall, ...short]` — tall cards first (James K., Anna R.), then 4 short cards. This is the intentional mobile swipe order.
- On mobile, tall cards: `card-photo` and `card-photo-placeholder` hidden via scoped CSS inside the slider context
- All cards same auto height (driven by content)

### Markup
```html
<!-- mobile only, hidden on desktop -->
<div class="testimonials-slider">
  <div class="embla__viewport" ref="sliderViewportRef">
    <div class="embla__container">
      <div class="embla__slide" v-for="item in allTestimonials" :key="item.name">
        <div class="card">
          <div class="card-stars">★★★★★</div>
          <p class="card-text">"{{ item.text }}"</p>
          <div class="card-author">
            <img v-if="item.avatar" :src="item.avatar" :alt="item.name" class="author-img" />
            <div v-else class="author-initials">{{ item.name[0] }}</div>
            <div>
              <div class="author-name">{{ item.name }}</div>
              <div class="author-role">{{ item.role }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

### Script additions
```ts
import EmblaCarousel from 'embla-carousel'
import type { EmblaCarouselType } from 'embla-carousel'

// Flat ordered array for slider
const allTestimonials = [...tall, ...short]

const sliderViewportRef = ref<HTMLElement | null>(null)
let slider: EmblaCarouselType | null = null

onMounted(() => {
  if (!sliderViewportRef.value) return
  slider = EmblaCarousel(sliderViewportRef.value, {
    loop: false,
    containScroll: 'keepSnaps',
  })
})

onUnmounted(() => {
  slider?.destroy()
  slider = null
})
```

### CSS additions
```css
/* Mobile slider wrapper — hidden on desktop */
.testimonials-slider {
  display: none;
}
@media (max-width: 768px) {
  /* Hide desktop grid */
  .testimonials-grid {
    display: none;
  }
  /* Show slider */
  .testimonials-slider {
    display: block;
    overflow: visible; /* allows peek */
  }
  /* Embla required styles */
  .testimonials-slider .embla__viewport {
    overflow: hidden;
    touch-action: pan-y;
  }
  .testimonials-slider .embla__container {
    display: flex;
    gap: 16px;
  }
  .testimonials-slider .embla__slide {
    flex: 0 0 calc(100% - 32px);
    min-width: 0;
  }
  /* Hide photo blocks inside slider cards */
  .testimonials-slider .card-photo,
  .testimonials-slider .card-photo-placeholder {
    display: none;
  }
}
```

---

## 4. Out of Scope

- Auto-advance / autoplay
- Keyboard navigation
- Accessibility enhancements (ARIA) beyond Embla defaults
- Any desktop layout changes
