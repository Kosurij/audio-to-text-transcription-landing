<template>
  <section class="faq" id="faq">
    <div class="faq-container">
      <div class="section-header">
        <h2 class="section-title">
          Frequently Asked <span class="gradient-text">Questions</span>
        </h2>
        <p class="section-subtitle">
          Everything you need to know about Audio To Text Transcription
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
            <span>{{ item.question }}</span>
            <svg 
              class="faq-icon" 
              :class="{ rotated: activeIndex === index }"
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none"
            >
              <path d="M7 10L12 15L17 10H7Z" fill="currentColor"/>
            </svg>
          </button>
          <div class="faq-answer" v-show="activeIndex === index">
            <p>{{ item.answer }}</p>
          </div>
        </div>
      </div>

      <div class="faq-cta">
        <h3 class="faq-cta-title">Still have a question?</h3>
        <p class="faq-cta-subtitle">Can't find the answer you're looking for? We're here to help!</p>
        <a href="/contact" class="faq-cta-button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 6H20C20.5523 6 21 6.44772 21 7V17C21 17.5523 20.5523 18 20 18H4C3.44772 18 3 17.5523 3 17V7C3 6.44772 3.44772 6 4 6Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
            <path d="M3.5 7L12 13L20.5 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Contact support team</span>
        </a>
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
    answer: 'Audio To Text Transcription is a Chrome extension that turns any audio—from meetings, lectures, podcasts, or browser tabs—into searchable text powered by advanced AI.'
  },
  {
    question: 'What recording modes are available?',
    answer: 'You can upload an audio file, capture audio from your microphone, record the current browser tab, or combine microphone + tab recording. Switch between modes instantly.'
  },
  {
    question: 'How does the transcription work?',
    answer: 'We use advanced AI to deliver fast, high-quality transcripts—even for long sessions and diverse accents.'
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
    answer: 'Accuracy depends on the recording quality. Our AI model delivers excellent results for clear speech with minimal background noise.'
  },
  {
    question: 'Is Audio To Text Transcription free to use?',
    answer: 'Yes. The Free plan includes 200 minutes per week. Optional paid subscriptions add larger weekly limits, priority processing and priority support.'
  },
  {
    question: 'How do weekly minute limits work?',
    answer: 'Your minute allowance resets every week. Unused minutes do not roll over into the next week.'
  },
  {
    question: 'What happens when I upgrade?',
    answer: 'A paid plan gives you a larger weekly allowance, reduced minute usage in High Accuracy mode, priority processing and priority support.'
  },
  {
    question: 'Can I cancel my subscription?',
    answer: 'Yes. You can cancel a paid subscription at any time, and every paid plan includes a 30-day money-back guarantee.'
  }
];
</script>

<style scoped>
.faq {
  padding: 80px 0;
  background: var(--color-surface);
}

.faq-container {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 24px;
}

.section-header {
  text-align: center;
  margin-bottom: 64px;
}

.section-title {
  font-size: clamp(40px, 6vw, 64px);
  font-weight: 800;
  text-align: center;
  margin-bottom: 24px;
  color: var(--color-text);
  letter-spacing: -0.03em;
}

.gradient-text {
  background: var(--gradient-primary);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.section-subtitle {
  font-size: 20px;
  text-align: center;
  color: var(--color-text-secondary);
  font-weight: 400;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.faq-cta {
  margin-top: 64px;
  text-align: center;
}

.faq-cta-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 12px;
}

.faq-cta-subtitle {
  font-size: 16px;
  color: var(--color-text-secondary);
  margin-bottom: 24px;
}

.faq-cta-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  background: var(--color-surface-elevated);
  color: var(--color-text);
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  box-shadow: var(--shadow-sm);
  transition: border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
}

.faq-cta-button:hover {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
  box-shadow: var(--shadow-md);
}

.faq-cta-button svg {
  flex-shrink: 0;
}

.faq-item {
  background: var(--color-surface-elevated);
  background-image: var(--gradient-bg-subtle);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.faq-item:hover {
  border-color: var(--accent-primary);
  box-shadow: var(--shadow-md);
}

.faq-item.active {
  border-color: var(--accent-primary);
  box-shadow: var(--shadow-lg);
}

.faq-question {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 28px;
  background: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text);
  transition: color 0.2s ease;
}

.faq-question:hover {
  color: var(--accent-primary);
}

.faq-icon {
  flex-shrink: 0;
  margin-left: 16px;
  color: var(--accent-primary);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.faq-icon.rotated {
  transform: rotate(180deg);
}

.faq-answer {
  padding: 0 28px 28px;
  color: var(--color-text-secondary);
  line-height: 1.7;
  font-size: 16px;
  font-weight: 400;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .faq {
    padding: 60px 0;
  }

  .section-header {
    margin-bottom: 48px;
  }

  .faq-question {
    font-size: 16px;
    padding: 20px;
  }

  .faq-answer {
    padding: 0 20px 20px;
    font-size: 15px;
  }

  .faq-cta {
    margin-top: 48px;
  }

  .faq-cta-title {
    font-size: 22px;
  }
}
</style>
