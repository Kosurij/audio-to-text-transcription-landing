<template>
  <section id="pricing" class="pricing" aria-labelledby="pricing-title">
    <div class="pricing-container">
      <header class="section-header">
        <h2 id="pricing-title" class="section-title">Pricing</h2>
        <p class="section-subtitle">Start free, then upgrade when your workflow grows</p>
      </header>

      <div class="pricing-grid">
        <article
          v-for="plan in plans"
          :key="plan.name"
          class="pricing-card"
          :class="{ popular: plan.popular }"
        >
          <span v-if="plan.popular" class="popular-badge">Most popular</span>
          <h3 class="plan-name">{{ plan.name }}</h3>
          <p class="plan-description">{{ plan.description }}</p>
          <p class="plan-price">
            {{ plan.price }}<span v-if="plan.period"> / {{ plan.period }}</span>
          </p>
          <p class="plan-limit">{{ plan.minutes }} minutes / {{ plan.minutesPeriod }}</p>
          <InstallButton
            :variant="plan.popular ? 'primary' : 'outline'"
            :show-icon="false"
            class="plan-button"
          >
            {{ plan.cta }}
          </InstallButton>
          <div class="plan-divider" />
          <p class="benefit-heading">{{ plan.benefitHeading }}</p>
          <ul class="benefit-list">
            <li v-for="benefit in plan.benefits" :key="benefit">
              <span aria-hidden="true">✓</span>
              <span>{{ benefit }}</span>
            </li>
          </ul>
          <p v-if="plan.guarantee" class="guarantee">
            Cancel anytime · 30-day money-back guarantee
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import InstallButton from './InstallButton.vue';

interface Plan {
  name: string;
  description: string;
  price: string;
  period?: string;
  minutes: string;
  minutesPeriod: string;
  cta: string;
  benefitHeading: string;
  benefits: string[];
  popular?: boolean;
  guarantee?: boolean;
}

const paidBenefits = [
  'Priority processing',
  'Priority support',
];

const discountedAccuracyBenefit = 'High Accuracy uses 33% fewer minutes';

const plans: Plan[] = [
  {
    name: 'Free',
    description: 'Everything you need to start transcribing',
    price: '$0',
    minutes: '200',
    minutesPeriod: 'week',
    cta: 'Get started',
    benefitHeading: 'What you can do:',
    benefits: [
      'Balanced and High Accuracy modes',
      'Record browser tabs or your microphone',
      'Upload 14 audio and video formats up to 500 MB',
      'Transcribe in 90+ languages',
      'Create AI-powered summaries',
      'Edit, export and revisit transcripts',
    ],
  },
  {
    name: 'Basic',
    description: 'For regular monthly transcription',
    price: '$6.99',
    period: 'month',
    minutes: '2,400',
    minutesPeriod: 'month',
    cta: 'Get started',
    benefitHeading: 'Everything in Free, plus:',
    benefits: ['3× the minutes', ...paidBenefits],
    guarantee: true,
  },
  {
    name: 'Pro',
    description: 'For frequent and longer recordings',
    price: '$12.99',
    period: 'month',
    minutes: '7,200',
    minutesPeriod: 'month',
    cta: 'Get started',
    benefitHeading: 'Everything in Free, plus:',
    benefits: ['9× the minutes', discountedAccuracyBenefit, ...paidBenefits],
    popular: true,
    guarantee: true,
  },
  {
    name: 'Max',
    description: 'For high-volume transcription workflows',
    price: '$19.99',
    period: 'month',
    minutes: '14,000',
    minutesPeriod: 'month',
    cta: 'Get started',
    benefitHeading: 'Everything in Free, plus:',
    benefits: ['17.5× the minutes', discountedAccuracyBenefit, ...paidBenefits],
    guarantee: true,
  },
];
</script>

<style scoped>
.pricing {
  padding: 96px 0;
  background: var(--color-background);
}

.pricing-container {
  width: min(1440px, calc(100% - 48px));
  margin: 0 auto;
}

.section-header {
  max-width: 720px;
  margin: 0 auto 56px;
  text-align: center;
}

.section-title {
  margin: 0 0 16px;
  color: var(--color-text);
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  letter-spacing: -0.04em;
}

.section-subtitle {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 1.25rem;
  line-height: 1.6;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
  align-items: stretch;
}

.pricing-card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 620px;
  padding: 32px 28px;
  border: 1px solid var(--color-border);
  border-radius: 20px;
  background: var(--color-surface-elevated);
  box-shadow: var(--shadow-sm);
}

.pricing-card.popular {
  border: 2px solid var(--accent-primary);
  box-shadow: var(--shadow-lg);
}

.popular-badge {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  padding: 7px 16px;
  border-radius: 999px;
  background: linear-gradient(135deg, #7C3AED 0%, #EC4899 100%);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 800;
  white-space: nowrap;
}

.plan-name {
  margin: 0;
  color: var(--color-text);
  font-size: 1.5rem;
  font-weight: 800;
}

.plan-description {
  min-height: 48px;
  margin: 8px 0 20px;
  color: var(--color-text-secondary);
  line-height: 1.5;
}

.plan-price {
  margin: 0;
  color: var(--color-text);
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: -0.04em;
}

.plan-price span {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0;
}

.plan-limit {
  margin: 6px 0 22px;
  color: var(--accent-primary);
  font-size: 0.875rem;
  font-weight: 800;
  text-transform: uppercase;
}

.plan-button {
  width: 100%;
  height: auto;
  min-height: 48px;
  border-radius: 10px;
}

.plan-button:focus-visible {
  outline: 3px solid var(--accent-primary);
  outline-offset: 3px;
}

.plan-divider {
  height: 1px;
  margin: 24px 0 20px;
  background: var(--color-border);
}

.benefit-heading {
  margin: 0 0 16px;
  color: var(--color-text);
  font-weight: 700;
}

.benefit-list {
  display: grid;
  gap: 14px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.benefit-list li {
  display: grid;
  grid-template-columns: 18px 1fr;
  gap: 8px;
  color: var(--color-text-secondary);
  line-height: 1.5;
}

.benefit-list li > span:first-child {
  color: var(--accent-primary);
  font-weight: 800;
}

.guarantee {
  margin-top: auto;
  padding-top: 24px;
  color: var(--color-text-muted);
  font-size: 0.8125rem;
  line-height: 1.5;
  text-align: center;
}

html[data-theme='dark'] .pricing-card {
  background: var(--color-surface-elevated);
}

html[data-theme='dark'] .popular-badge {
  background: linear-gradient(135deg, #8B5CF6 0%, #F472B6 100%);
}

@media (max-width: 1100px) {
  .pricing-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .pricing {
    padding: 64px 0;
  }

  .pricing-container {
    width: min(calc(100% - 32px), 520px);
  }

  .section-header {
    margin-bottom: 44px;
  }

  .section-subtitle {
    font-size: 1.0625rem;
  }

  .pricing-grid {
    grid-template-columns: 1fr;
  }

  .pricing-card {
    min-height: auto;
    padding: 28px 22px;
  }
}

</style>
