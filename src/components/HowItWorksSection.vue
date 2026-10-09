<template>
  <section class="how-it-works" id="how-it-works">
    <div class="how-it-works-container">
      <div class="section-header">
        <h2>How to use the Chrome extension</h2>
        <p>From recording to transcript in the Chrome extension</p>
      </div>
      <ol class="steps">
        <li class="step" v-for="(step, index) in steps" :key="step.title">
          <span class="step-number" aria-hidden="true">{{ index + 1 }}.</span>
          <h3>{{ step.title }}</h3>
          <p>{{ step.description }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
import { steps } from '../data/landingContent';
</script>

<style scoped>
.how-it-works { padding: 48px 0 32px; background: var(--color-surface); scroll-margin-top: 100px; }
.how-it-works-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
.section-header { text-align: center; margin-bottom: 28px; }
h2 { font-size: clamp(1.75rem, 4vw, 2.75rem); font-weight: 800; letter-spacing: -.03em; color: var(--color-text); margin: 0 0 12px; }
.section-header p, .step p { color: var(--color-text-secondary); line-height: 1.7; margin: 0; }
.steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; list-style: none; padding: 0; margin: 0; }
.step { padding: 20px; border: 1px solid var(--color-border); background: var(--color-surface-elevated); border-radius: 12px; }
.step-number { font-size: 1.75rem; font-weight: 800; color: var(--accent-primary); }
h3 { font-size: 1.15rem; color: var(--color-text); margin: 10px 0 8px; }
@media (max-width: 768px) {
  .how-it-works { padding: 40px 0 24px; }
  .how-it-works-container { padding: 0 16px; }
  .steps { grid-template-columns: 1fr; gap: 16px; }
  .step { padding: 18px; }
}
</style>
