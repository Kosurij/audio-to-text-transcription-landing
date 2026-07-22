<template>
  <section class="testimonials" id="testimonials">
    <div class="testimonials-container">
      <div class="section-header">
        <h2 class="section-title">What Our Users Say</h2>
      </div>

      <!--
        Grid layout: [tall] [short] [short] [short]
                            [short] [short] [short]
      -->
      <div class="testimonials-grid">

        <!-- Col 1 — TALL (spans 2 rows) -->
        <div class="card card-tall" style="grid-column: 1">
          <div class="card-stars">★★★★★</div>
          <p class="card-text">"{{ tall[0].text }}"</p>
          <div v-if="tall[0].photo" class="card-photo">
            <img :src="tall[0].photo" :alt="tall[0].name" loading="lazy" />
          </div>
          <div v-else class="card-photo-placeholder"></div>
          <div class="card-author">
            <div>
              <div class="author-name">{{ tall[0].name }}</div>
              <div class="author-role">{{ tall[0].role }}</div>
            </div>
          </div>
        </div>

        <!-- Col 2 — SHORT row 1 -->
        <div class="card" style="grid-column: 2; grid-row: 1">
          <div class="card-stars">★★★★★</div>
          <p class="card-text">"{{ short[0].text }}"</p>
          <div class="card-author">
            <img v-if="short[0].avatar" :src="short[0].avatar" :alt="short[0].name" class="author-img" loading="lazy" width="36" height="36" />
            <div v-else class="author-initials">{{ short[0].name[0] }}</div>
            <div>
              <div class="author-name">{{ short[0].name }}</div>
              <div class="author-role">{{ short[0].role }}</div>
            </div>
          </div>
        </div>

        <!-- Col 2 — SHORT row 2 -->
        <div class="card" style="grid-column: 2; grid-row: 2">
          <div class="card-stars">★★★★★</div>
          <p class="card-text">"{{ short[1].text }}"</p>
          <div class="card-author">
            <img v-if="short[1].avatar" :src="short[1].avatar" :alt="short[1].name" class="author-img" loading="lazy" width="36" height="36" />
            <div v-else class="author-initials">{{ short[1].name[0] }}</div>
            <div>
              <div class="author-name">{{ short[1].name }}</div>
              <div class="author-role">{{ short[1].role }}</div>
            </div>
          </div>
        </div>

        <!-- Col 3 — SHORT row 1 -->
        <div class="card" style="grid-column: 3; grid-row: 1">
          <div class="card-stars">★★★★★</div>
          <p class="card-text">"{{ short[2].text }}"</p>
          <div class="card-author">
            <img v-if="short[2].avatar" :src="short[2].avatar" :alt="short[2].name" class="author-img" loading="lazy" width="36" height="36" />
            <div v-else class="author-initials">{{ short[2].name[0] }}</div>
            <div>
              <div class="author-name">{{ short[2].name }}</div>
              <div class="author-role">{{ short[2].role }}</div>
            </div>
          </div>
        </div>

        <!-- Col 3 — SHORT row 2 -->
        <div class="card" style="grid-column: 3; grid-row: 2">
          <div class="card-stars">★★★★★</div>
          <p class="card-text">"{{ short[3].text }}"</p>
          <div class="card-author">
            <img v-if="short[3].avatar" :src="short[3].avatar" :alt="short[3].name" class="author-img" loading="lazy" width="36" height="36" />
            <div v-else class="author-initials">{{ short[3].name[0] }}</div>
            <div>
              <div class="author-name">{{ short[3].name }}</div>
              <div class="author-role">{{ short[3].role }}</div>
            </div>
          </div>
        </div>

        <!-- Col 4 — SHORT row 1 -->
        <div class="card" style="grid-column: 4; grid-row: 1">
          <div class="card-stars">★★★★★</div>
          <p class="card-text">"{{ short[4].text }}"</p>
          <div class="card-author">
            <img v-if="short[4].avatar" :src="short[4].avatar" :alt="short[4].name" class="author-img" loading="lazy" width="36" height="36" />
            <div v-else class="author-initials">{{ short[4].name[0] }}</div>
            <div>
              <div class="author-name">{{ short[4].name }}</div>
              <div class="author-role">{{ short[4].role }}</div>
            </div>
          </div>
        </div>

        <!-- Col 4 — SHORT row 2 -->
        <div class="card" style="grid-column: 4; grid-row: 2">
          <div class="card-stars">★★★★★</div>
          <p class="card-text">"{{ short[5].text }}"</p>
          <div class="card-author">
            <img v-if="short[5].avatar" :src="short[5].avatar" :alt="short[5].name" class="author-img" loading="lazy" width="36" height="36" />
            <div v-else class="author-initials">{{ short[5].name[0] }}</div>
            <div>
              <div class="author-name">{{ short[5].name }}</div>
              <div class="author-role">{{ short[5].role }}</div>
            </div>
          </div>
        </div>

      </div>

      <!-- Mobile slider — hidden on desktop via CSS -->
      <div class="testimonials-slider">
        <div class="embla__viewport" ref="sliderViewportRef">
          <div class="embla__container">
            <div class="embla__slide" v-for="item in allTestimonials" :key="item.name">
              <div class="card">
                <div class="card-stars">★★★★★</div>
                <p class="card-text">"{{ item.text }}"</p>
                <div class="card-author">
                  <img v-if="item.avatar" :src="item.avatar" :alt="item.name" class="author-img" loading="lazy" width="36" height="36" />
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
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import EmblaCarousel from 'embla-carousel'
import type { EmblaCarouselType } from 'embla-carousel'

interface Testimonial {
  name: string
  role: string
  text: string
  photo?: string   // URL of large in-card photo (tall cards only)
  avatar?: string  // URL of small avatar image
}

// TALL cards — col 1, spans full height, supports large photo
const tall: Testimonial[] = [
  {
    name: 'Emma R.',
    role: 'Student',
    text: 'This extension is awesome. You can either record audio from your microphone, web tab, or both; or upload an audio file to convert it into a full transcript. Highly recommend for people who don\'t feel like watching lecture videos and would rather copy the transcript into ChatGPT and ask it to make a study guide out of it ;)',
    photo: '/reviews/review-emma.webp',
  },
]

// SHORT cards — cols 2, 3, 4, two per column, equal height
const short: Testimonial[] = [
  {
    name: 'Mariana C.',
    role: 'Translator',
    text: 'Simples e fácil de utilizar. Recomendado!',
  },
  {
    name: 'Sergei S.',
    role: 'Software Engineer',
    text: 'I loved this extension. The audio-to-text conversion is accurate. The browser tab recording feature is especially useful. I recommend it to everyone!',
    avatar: '/reviews/review-sergei-s.webp',
  },
  {
    name: 'Camila B.',
    role: 'Journalist',
    text: 'Muito bom',
    avatar: '/reviews/review-camila.webp',
  },
  {
    name: 'David K.',
    role: 'Student',
    text: '생각보다 괜찮네?? 외국 강의 들으면서 이해하기 좋을듯.',
  },
  {
    name: 'Priya S.',
    role: 'Researcher',
    text: 'I transcribe research interviews with this extension. Accuracy for academic content is excellent.',
  },
  {
    name: 'Sofia D.',
    role: 'Content Creator',
    text: 'Game changer for my YouTube workflow. I record commentary, transcribe it instantly, and use the TXT file for descriptions and subtitles. Simple and accurate.',
    avatar: '/reviews/review-sofia-d.webp',
  },
]

// Flat ordered array for mobile slider: tall cards first, then short
const allTestimonials = [...tall, ...short]

const sliderViewportRef = ref<HTMLElement | null>(null)
let slider: EmblaCarouselType | null = null

onMounted(() => {
  if (!sliderViewportRef.value) return
  slider = EmblaCarousel(sliderViewportRef.value, {
    loop: true,
    align: 'center',
    containScroll: false,
  })
})

onUnmounted(() => {
  slider?.destroy()
  slider = null
})
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
}

/* Grid: 4 cols, 2 equal rows */
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr 1fr;
  gap: 20px;
}

/* Base card */
.card {
  background: var(--color-surface-elevated);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-shadow: var(--shadow-sm);
}

/* Tall card: spans both rows */
.card-tall {
  grid-row: 1 / 3;
}

.card-stars {
  font-size: 16px;
  color: #F59E0B;
  letter-spacing: 2px;
  flex-shrink: 0;
}

.card-text {
  font-size: 15px;
  line-height: 1.7;
  color: var(--color-text-secondary);
  margin: 0;
  flex: 1; /* pushes photo + author to bottom */
}

/* Large photo inside tall card */
.card-photo {
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
}

.card-photo img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
  border-radius: 12px;
}

/* Placeholder until real photo is provided */
.card-photo-placeholder {
  border-radius: 12px;
  background: var(--color-surface);
  border: 1px dashed var(--color-border);
  padding: 20px;
  font-size: 11px;
  color: var(--color-text-muted);
  font-style: italic;
  text-align: center;
  flex-shrink: 0;
}

.card-author {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

/* Small avatar — circle with photo */
.author-img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

/* Fallback: initials circle (Google-style neutral gray) */
.author-initials {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #9AA0A6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
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
  color: var(--color-text-secondary);
}

/* Responsive */
@media (max-width: 900px) {
  .testimonials-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: unset;
  }

  /* Reset explicit placement — let grid auto-flow */
  .card {
    grid-column: unset !important;
    grid-row: unset !important;
  }
}

/* Mobile slider — hidden by default */
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
    overflow: visible;
  }

  /* Embla core */
  .testimonials-slider .embla__viewport {
    overflow: hidden;
    touch-action: pan-y;
  }
  .testimonials-slider .embla__container {
    display: flex;
  }
  .testimonials-slider .embla__slide {
    flex: 0 0 calc(100% - 48px);
    min-width: 0;
    display: flex;
    padding: 0 8px;
  }
  .testimonials-slider .card {
    flex: 1;
  }

  /* Hide photo blocks (no real photos yet) */
  .testimonials-slider .card-photo,
  .testimonials-slider .card-photo-placeholder {
    display: none;
  }
}
</style>
