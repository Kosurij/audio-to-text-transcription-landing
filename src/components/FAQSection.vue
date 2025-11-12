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
    question: 'Which audio formats are supported?',
    answer: 'All popular formats are supported: FLAC, MP3, M4A, MPEG, MPGA, OGG, WAV, WEBM, and more.'
  },
  {
    question: 'Can I edit transcripts inside the extension?',
    answer: 'Inline editing is not available. You can copy the transcript to the clipboard or download it as a .txt file. The last 10 transcripts are saved automatically in your history.'
  },
  {
    question: 'How accurate are the results?',
    answer: 'Accuracy depends on the recording quality. The Groq + Whisper AI stack delivers excellent results for clear speech with minimal background noise.'
  }
];
</script>

<style scoped>
.faq {
  padding: 120px 20px;
  background: var(--gradient-bg-subtle);
}

.faq-container {
  max-width: 900px;
  margin: 0 auto;
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
  font-family: 'Space Grotesk', sans-serif;
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
    padding: 40px 20px;
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
}
</style>
