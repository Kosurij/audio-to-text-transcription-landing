<template>
  <section class="testimonials" id="testimonials">
    <div class="testimonials-container">
      <div class="section-header">
        <h2 class="section-title">What Our Users Say</h2>
      </div>
      <div class="testimonials-masonry">
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
// Placeholder testimonials — replace with final text before QA
const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Project Manager',
    text: 'I use this every day for team meetings. The accuracy is impressive — even with background noise. Saves me at least an hour daily.',
  },
  {
    name: 'James K.',
    role: 'Journalist',
    text: 'As a journalist I record interviews constantly. This extension transcribes an hour-long interview in under a minute. The timestamp feature is essential — I can jump to any quote instantly. Highly recommended for anyone who works with audio professionally.',
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
  {
    name: 'Tom W.',
    role: 'Podcast Producer',
    text: 'Transcribing podcast episodes used to take hours. Now it takes minutes.',
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

.testimonials-masonry {
  columns: 4;
  column-gap: 20px;
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
  break-inside: avoid;
  margin-bottom: 20px;
}

.testimonial-stars {
  font-size: 16px;
  color: #F59E0B; /* amber — hardcoded intentionally, same in light/dark (stars are always yellow) */
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
    columns: 3;
  }
}

@media (max-width: 600px) {
  .testimonials-masonry {
    columns: 2;
  }
}

@media (max-width: 400px) {
  .testimonials-masonry {
    columns: 1;
  }
}
</style>
