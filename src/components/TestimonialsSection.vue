<template>
  <section class="testimonials" id="testimonials">
    <div class="testimonials-container">
      <div class="section-header">
        <h2 class="section-title">What Our Users Say</h2>
        <p class="section-description">Real reviews from the Chrome Web Store</p>
      </div>

      <div class="testimonials-grid">
        <article
          v-for="(testimonial, index) in testimonials"
          :key="testimonial.text"
          class="card"
          :class="{ 'card-tall': index === 0 }"
        >
          <div class="card-stars" aria-label="5 out of 5 stars">★★★★★</div>
          <p class="card-text">“{{ testimonial.text }}”</p>
          <div class="card-author">
            <img
              v-if="testimonial.avatar"
              :src="testimonial.avatar"
              :alt="testimonial.name"
              class="author-img"
              loading="lazy"
              width="44"
              height="44"
            />
            <div v-else class="author-initials" aria-hidden="true">{{ testimonial.name[0] }}</div>
            <div class="author-name">{{ testimonial.name }}</div>
          </div>
        </article>
      </div>

      <div class="testimonials-slider">
        <div class="embla__viewport" ref="sliderViewportRef">
          <div class="embla__container">
            <div class="embla__slide" v-for="testimonial in testimonials" :key="testimonial.text">
              <article class="card">
                <div class="card-stars" aria-label="5 out of 5 stars">★★★★★</div>
                <p class="card-text">“{{ testimonial.text }}”</p>
                <div class="card-author">
                  <img
                    v-if="testimonial.avatar"
                    :src="testimonial.avatar"
                    :alt="testimonial.name"
                    class="author-img"
                    loading="lazy"
                    width="44"
                    height="44"
                  />
                  <div v-else class="author-initials" aria-hidden="true">{{ testimonial.name[0] }}</div>
                  <div class="author-name">{{ testimonial.name }}</div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>

      <a
        class="reviews-link"
        href="https://chromewebstore.google.com/detail/audio-to-text-transcripti/pkfoaaglghblmjjjpbniicjcpehfbmgd/reviews?hl=en"
        target="_blank"
        rel="noopener noreferrer"
      >
        Read all reviews
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import EmblaCarousel from 'embla-carousel'
import type { EmblaCarouselType } from 'embla-carousel'

interface Testimonial {
  name: string
  text: string
  avatar?: string
}

const testimonials: Testimonial[] = [
  {
    name: 'Robert Edge',
    text: "This extension is awesome. You can either record audio from your microphone, web tab, or both; or upload an audio file to convert the file or audio recording into a full transcript. Highly recommend for people who don't feel like watching their lecture videos and would rather copy and paste the transcript into chat gpt and ask it to make a study guide out of it ;)",
    avatar: '/reviews/robert-edge.webp',
  },
  {
    name: 'Ana Muravchik',
    text: "I've been looking for many days for an extension/app like this, and none of them worked. This one is AMAZING. I'm thrilled and really thankful. Also, it's FREE. Absolutely love it.",
    avatar: '/reviews/ana-muravchik.webp',
  },
  {
    name: 'Andrii Stepura',
    text: 'It transcribes audio to text wonderfully. I didn’t expect such high quality.',
    avatar: '/reviews/andrii-stepura.webp',
  },
  {
    name: 'Vanessa Bianchi',
    text: 'Muito bom',
    avatar: '/reviews/vanessa-bianchi.webp',
  },
  {
    name: '포도원',
    text: '생각보다 괜찮네?? 외국 강의 들으면서 이해하기 좋을듯.',
    avatar: '/reviews/podowon.webp',
  },
  {
    name: 'Ilaiya Oliveira',
    text: 'muito bom!!!',
    avatar: '/reviews/ilaiya-oliveira.webp',
  },
  {
    name: 'Sergei Semenov',
    text: 'I loved this extension. The audio-to-text conversion is accurate. The browser tab recording feature is especially useful. I recommend it to everyone!',
    avatar: '/reviews/sergei-semenov.webp',
  },
]

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
  margin: 0;
  font-size: clamp(1.75rem, 4vw, 2.75rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--color-text);
}

.section-description {
  margin: 12px 0 0;
  font-size: 17px;
  color: var(--color-text-secondary);
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-template-rows: repeat(2, minmax(0, 1fr));
  align-items: stretch;
  gap: 20px;
}

.card {
  min-width: 0;
  background: var(--color-surface-elevated);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-shadow: var(--shadow-sm);
}

.card-tall {
  grid-row: 1 / 3;
}

.card-stars {
  color: #f59e0b;
  font-size: 16px;
  letter-spacing: 2px;
  line-height: 1;
}

.card-text {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 15px;
  line-height: 1.7;
  overflow-wrap: anywhere;
  flex: 1;
}

.card-author {
  display: flex;
  align-items: center;
  gap: 12px;
}

.author-img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
}

.author-initials {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  background: color-mix(in srgb, var(--color-primary) 12%, var(--color-surface));
  border: 1px solid color-mix(in srgb, var(--color-primary) 22%, var(--color-border));
  color: var(--color-primary);
  font-size: 15px;
  font-weight: 700;
}

.author-name {
  color: var(--color-text);
  font-size: 14px;
  font-weight: 700;
}

.testimonials-slider {
  display: none;
}

.reviews-link {
  width: fit-content;
  margin: 32px auto 0;
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--color-primary);
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
}

.reviews-link:hover {
  text-decoration: underline;
}

@media (max-width: 900px) {
  .testimonials-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: auto;
  }

  .card-tall {
    grid-row: auto;
  }
}

@media (max-width: 768px) {
  .testimonials {
    padding: 64px 0;
  }

  .section-header {
    margin-bottom: 36px;
  }

  .testimonials-grid {
    display: none;
  }

  .testimonials-slider {
    display: block;
  }

  .testimonials-slider .embla__viewport {
    overflow: hidden;
    touch-action: pan-y;
  }

  .testimonials-slider .embla__container {
    display: flex;
  }

  .testimonials-slider .embla__slide {
    min-width: 0;
    flex: 0 0 calc(100% - 40px);
    display: flex;
    padding: 0 8px;
  }

  .testimonials-slider .card {
    flex: 1;
    min-height: 280px;
  }
}
</style>
