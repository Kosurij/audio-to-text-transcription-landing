<template>
  <section class="faq" id="faq">
    <div class="faq-container">
      <div class="section-header">
        <h2 class="section-title">Your questions, answered.</h2>
        <p class="section-subtitle">
          If you have any further questions, <a href="mailto:kosurij.dm@gmail.com" class="contact-link">Get in touch</a> with our friendly team
        </p>
      </div>

      <div class="faq-list">
        <div
          class="faq-item"
          v-for="(item, index) in faqs"
          :key="index"
          :class="{ active: activeIndex === index }"
        >
          <button class="faq-question" @click="toggle(index)">
            <svg
              class="faq-icon"
              :class="{ active: activeIndex === index }"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <line x1="10" y1="4" x2="10" y2="16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <line x1="4" y1="10" x2="16" y2="10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <span>{{ item.question }}</span>
          </button>
          <div class="faq-answer" :class="{ open: activeIndex === index }">
            <div class="faq-answer-inner">
              <div class="faq-answer-content">
                <p>{{ item.answer }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeIndex = ref<number | null>(null);

const toggle = (index: number) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};

const faqs = [
  {
    question: 'What is Audio To Text Transcription?',
    answer: 'Audio To Text Transcription is a Chrome extension that turns any audio—from meetings, lectures, podcasts, or browser tabs—into searchable text powered by Groq + Whisper AI.'
  },
  {
    question: 'What recording modes are available?',
    answer: 'You can upload an audio file, capture audio from your microphone, record the current browser tab, or combine microphone + tab recording. Switch between modes instantly.'
  },
  {
    question: 'Which transcription engine do you use?',
    answer: 'We run Groq together with Whisper AI under the hood to deliver fast, high-quality transcripts—even for long sessions and diverse accents.'
  },
  {
    question: 'Does the extension support themes?',
    answer: 'Yes. Audio To Text Transcription adapts to both light and dark themes automatically, and you can toggle them manually in the settings.'
  },
  {
    question: 'Which audio/video formats are supported?',
    answer: 'We support the following audio and video formats: FLAC, MP3, MP4, MPEG, MPGA, M4A, OGG, OPUS, WAV, and WEBM. The extension can extract and transcribe audio from video files as well.'
  },
  {
    question: 'Can I edit transcripts inside the extension?',
    answer: 'Yes, users can edit transcripts. You will see both the original and edited versions side by side.'
  },
  {
    question: 'How accurate are the results?',
    answer: 'Accuracy depends on the recording quality. The Groq + Whisper AI stack delivers excellent results for clear speech with minimal background noise.'
  }
];
</script>

<style scoped>
.faq {
  padding: 100px 0;
  background: transparent;
}

.faq-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 48px;
}

.section-header {
  text-align: center;
  margin-bottom: 64px;
}

.section-title {
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 600;
  text-align: center;
  margin-top: 0;
  margin-bottom: 16px;
  color: var(--color-text);
  letter-spacing: -0.02em;
}

.section-subtitle {
  font-size: 1.05rem;
  text-align: center;
  color: var(--color-text-secondary);
  max-width: 580px;
  margin: 0 auto;
  font-weight: 400;
  line-height: 1.6;
}

.contact-link {
  color: var(--color-text);
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color 0.2s ease;
}

.contact-link:hover {
  color: var(--accent-primary);
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.faq-item {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: all 0.3s ease;
}

.faq-item:hover {
  border-color: var(--accent-primary);
  box-shadow: var(--shadow-sm);
}

.faq-item.active {
  border-color: var(--accent-primary);
  box-shadow: var(--shadow-md);
}

.faq-question {
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 16px;
  padding: 20px 24px;
  background: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
  transition: color 0.2s ease;
  font-family: 'Inter', sans-serif;
}

.faq-question span {
  flex: 1;
  text-align: left;
}

.faq-question:hover {
  color: var(--accent-primary);
}

.faq-icon {
  flex-shrink: 0;
  color: var(--color-text);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-top: 2px;
}

.faq-icon.active {
  transform: rotate(45deg);
}

.faq-answer {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.faq-answer.open {
  grid-template-rows: 1fr;
}

.faq-answer-inner {
  overflow: hidden;
}

.faq-answer-content {
  padding: 0 24px 24px;
  color: var(--color-text-secondary);
  line-height: 1.7;
  font-size: 0.95rem;
  font-weight: 400;
  opacity: 0;
  transform: translateY(-8px);
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.faq-answer.open .faq-answer-content {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.1s;
}

@media (max-width: 768px) {
  .faq {
    padding: 64px 0;
  }

  .faq-container {
    padding: 0 24px;
  }

  .section-header {
    margin-bottom: 40px;
  }

  .faq-question {
    font-size: 0.95rem;
    padding: 18px 20px;
  }

  .faq-answer-content {
    padding: 0 20px 20px;
    font-size: 0.9rem;
  }
}
</style>
