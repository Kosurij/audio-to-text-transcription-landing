<template>
  <section class="testimonials" id="testimonials">
    <div class="testimonials-container">
      <div class="section-header">
        <h2 class="section-title">What Our Users Say</h2>
      </div>
      <div class="testimonials-masonry">
        <div class="testimonials-col" v-for="(col, ci) in columns" :key="ci">
          <div class="testimonial-card" v-for="testimonial in col" :key="testimonial.name">
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
    </div>
  </section>
</template>

<script setup lang="ts">
const testimonials = [
  {
    name: 'James K.',
    role: 'Journalist',
    text: 'As a journalist I record interviews constantly. This extension transcribes an hour-long interview in under a minute. The timestamp feature is essential — I can jump to any quote instantly. Highly recommended for anyone who works with audio professionally.',
  },
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
  {
    name: 'Anna R.',
    role: 'Legal Assistant',
    text: 'We use this to transcribe client consultations. The privacy-first approach matters to us — no data stored, quick results. The 90+ language support is a bonus since we work with international clients.',
  },
];

// Explicit column assignment for visual balance:
// Col 1 (1 card — tall):  James K. (longest quote)
// Col 2 (2 cards — short pair): Sarah M. + Tom W.
// Col 3 (2 cards — short+medium pair): Priya S. + Marco D.
// Col 4 (1 card — medium): Anna R.
// Mirrors Tactiq's 1+2+2+1 distribution pattern
const columns = [
  [testimonials[0]],               // James K.
  [testimonials[1], testimonials[2]], // Sarah M. + Tom W.
  [testimonials[3], testimonials[4]], // Priya S. + Marco D.
  [testimonials[5]],               // Anna R.
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
}

.testimonials-masonry {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  /* align-items: stretch (default) — all columns same height */
}

.testimonials-col {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.testimonial-card {
  flex: 1; /* equal share of column height → same height as Tactiq */
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
  color: #F59E0B; /* amber — hardcoded intentionally, same in light/dark */
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
  .testimonials-masonry {
    grid-template-columns: repeat(3, 1fr);
  }

  /* On 3-col, col 4 drops to row 2 spanning first column */
}

@media (max-width: 600px) {
  .testimonials-masonry {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 400px) {
  .testimonials-masonry {
    grid-template-columns: 1fr;
  }
}
</style>
