<template>
  <section class="testimonials" id="testimonials">
    <div class="testimonials-container">
      <div class="section-header">
        <h2 class="section-title">What Our Users Say</h2>
      </div>

      <!--
        Grid layout: [tall] [short] [tall] [short]
                               [short]        [short]
        grid-template-rows: 1fr 1fr → both rows equal height
        tall cards span 2 rows → same total height as 2 stacked shorts
      -->
      <div class="testimonials-grid">

        <!-- Col 1 — TALL (spans 2 rows) -->
        <div class="card card-tall" style="grid-column: 1">
          <div class="card-stars">★★★★★</div>
          <p class="card-text">"{{ tall[0].text }}"</p>
          <!-- Large photo: fills bottom, replaces avatar circle -->
          <div v-if="tall[0].photo" class="card-photo">
            <img :src="tall[0].photo" :alt="tall[0].name" />
          </div>
          <div v-else class="card-photo-placeholder">
            [Photo: {{ tall[0].name }}, {{ tall[0].role }}]
          </div>
          <!-- tall cards: never show circle — photo or placeholder fills that role -->
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
            <img v-if="short[0].avatar" :src="short[0].avatar" :alt="short[0].name" class="author-img" />
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
            <img v-if="short[1].avatar" :src="short[1].avatar" :alt="short[1].name" class="author-img" />
            <div v-else class="author-initials">{{ short[1].name[0] }}</div>
            <div>
              <div class="author-name">{{ short[1].name }}</div>
              <div class="author-role">{{ short[1].role }}</div>
            </div>
          </div>
        </div>

        <!-- Col 3 — TALL (spans 2 rows) -->
        <div class="card card-tall" style="grid-column: 3">
          <div class="card-stars">★★★★★</div>
          <p class="card-text">"{{ tall[1].text }}"</p>
          <div v-if="tall[1].photo" class="card-photo">
            <img :src="tall[1].photo" :alt="tall[1].name" />
          </div>
          <div v-else class="card-photo-placeholder">
            [Photo: {{ tall[1].name }}, {{ tall[1].role }}]
          </div>
          <div class="card-author">
            <div>
              <div class="author-name">{{ tall[1].name }}</div>
              <div class="author-role">{{ tall[1].role }}</div>
            </div>
          </div>
        </div>

        <!-- Col 4 — SHORT row 1 -->
        <div class="card" style="grid-column: 4; grid-row: 1">
          <div class="card-stars">★★★★★</div>
          <p class="card-text">"{{ short[2].text }}"</p>
          <div class="card-author">
            <img v-if="short[2].avatar" :src="short[2].avatar" :alt="short[2].name" class="author-img" />
            <div v-else class="author-initials">{{ short[2].name[0] }}</div>
            <div>
              <div class="author-name">{{ short[2].name }}</div>
              <div class="author-role">{{ short[2].role }}</div>
            </div>
          </div>
        </div>

        <!-- Col 4 — SHORT row 2 -->
        <div class="card" style="grid-column: 4; grid-row: 2">
          <div class="card-stars">★★★★★</div>
          <p class="card-text">"{{ short[3].text }}"</p>
          <div class="card-author">
            <img v-if="short[3].avatar" :src="short[3].avatar" :alt="short[3].name" class="author-img" />
            <div v-else class="author-initials">{{ short[3].name[0] }}</div>
            <div>
              <div class="author-name">{{ short[3].name }}</div>
              <div class="author-role">{{ short[3].role }}</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Testimonial {
  name: string
  role: string
  text: string
  photo?: string   // URL of large in-card photo (tall cards only)
  avatar?: string  // URL of small avatar image
}

// TALL cards — cols 1 and 3, span full height, support large photo
const tall: Testimonial[] = [
  {
    name: 'James K.',
    role: 'Journalist',
    text: 'As a journalist I record interviews constantly. This extension transcribes an hour-long interview in under a minute. The timestamp feature is essential — I can jump to any quote instantly. Highly recommended for anyone who works with audio professionally.',
    // photo: '/photos/james.jpg',  // uncomment and set real path when ready
  },
  {
    name: 'Anna R.',
    role: 'Legal Assistant',
    text: 'We use this to transcribe client consultations. The privacy-first approach matters to us — no data stored, quick results. The 90+ language support is a bonus since we work with international clients.',
    // photo: '/photos/anna.jpg',
  },
]

// SHORT cards — cols 2 and 4, two per column, equal height
const short: Testimonial[] = [
  {
    name: 'Sarah M.',
    role: 'Project Manager',
    text: 'I use this every day for team meetings. The accuracy is impressive — even with background noise. Saves me at least an hour daily.',
  },
  {
    name: 'Tom W.',
    role: 'Podcast Producer',
    text: 'Transcribing podcast episodes used to take hours. Now it takes minutes.',
  },
  {
    name: 'Priya S.',
    role: 'PhD Student',
    text: 'I transcribe research interviews with this extension. Accuracy for academic content is excellent.',
  },
  {
    name: 'Marco D.',
    role: 'Content Creator',
    text: 'Game changer for my YouTube workflow. I record commentary, transcribe it instantly, and use the TXT file for descriptions and subtitles. Simple and accurate.',
  },
]
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

/* Fallback: initials circle */
.author-initials {
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

@media (max-width: 480px) {
  .testimonials-grid {
    grid-template-columns: 1fr;
  }
}
</style>
