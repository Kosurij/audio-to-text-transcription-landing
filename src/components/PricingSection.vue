<template>
  <section id="pricing" class="pricing" aria-labelledby="pricing-title">
    <div class="pricing-container">
      <header class="section-header">
        <h2 id="pricing-title" class="section-title">Pricing</h2>
        <p class="section-subtitle">Start free, then upgrade when your workflow grows</p>
      </header>

      <div class="billing-control" :data-interval="billingInterval" role="group" aria-label="Billing period">
        <button type="button" :aria-pressed="billingInterval === 'month'" @click="billingInterval = 'month'">Monthly</button>
        <button type="button" :aria-pressed="billingInterval === 'year'" @click="billingInterval = 'year'">Yearly</button>
      </div>

      <div class="pricing-grid" aria-live="polite" aria-atomic="false">
        <article
          v-for="plan in displayedPlans"
          :key="plan.name"
          class="pricing-card"
          :class="{ popular: plan.popular }"
        >
          <Transition name="savings">
            <span v-if="plan.savings !== null" class="popular-badge">Save {{ plan.savings }}%</span>
          </Transition>
          <h3 class="plan-name">{{ plan.name }}</h3>
          <p class="plan-description">{{ plan.description }}</p>
          <div class="plan-price-slot">
            <Transition name="price-swap">
              <p :key="plan.price" class="plan-price">
                {{ plan.price }}<span v-if="plan.monthlyPrice"> / month</span>
              </p>
            </Transition>
          </div>
          <p class="plan-limit">{{ plan.minutes }} minutes / {{ plan.minutesPeriod }}</p>
          <p class="plan-charge">{{ plan.charge || 'No payment required' }}</p>
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
            Cancel anytime · 14-day money-back guarantee
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import InstallButton from './InstallButton.vue';
import { plans } from '../data/pricing';

const billingInterval = ref<'month' | 'year'>('year');
const displayedPlans = computed(() => plans.map(plan => ({
  ...plan,
  price: plan.monthlyPrice === 0 ? '$0' : `$${(billingInterval.value === 'year'
    ? plan.annualPrice! / 12 : plan.monthlyPrice).toFixed(2)}`,
  charge: plan.annualPrice === undefined ? '' : billingInterval.value === 'year'
    ? `$${plan.annualPrice.toFixed(2)} billed annually` : 'Billed monthly',
  savings: billingInterval.value === 'year' && plan.annualPrice !== undefined
    ? Math.round((1 - plan.annualPrice / (plan.monthlyPrice * 12)) * 100) : null,
})));
</script>

<style scoped>
.pricing {
  padding: var(--section-padding) 0;
  background: var(--color-background);
}

.pricing-container {
  width: min(1440px, calc(100% - 48px));
  margin: 0 auto;
}

.section-header {
  max-width: 720px;
  margin: 0 auto 24px;
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

.billing-control {
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  width: fit-content;
  margin: 0 auto 40px;
  padding: 4px;
  gap: 4px;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background: var(--color-surface-elevated);
}

.billing-control::before {
  content: '';
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: 4px;
  width: calc((100% - 12px) / 2);
  border-radius: 999px;
  background: var(--color-background);
  box-shadow: var(--shadow-sm);
  transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;
}

.billing-control[data-interval='year']::before {
  transform: translateX(calc(100% + 4px));
}

.billing-control button {
  position: relative;
  border: 0;
  border-radius: 999px;
  padding: 9px 18px;
  background: transparent;
  color: var(--color-text-secondary);
  font: inherit;
  font-size: 0.875rem;
  cursor: pointer;
  transition: color 160ms ease;
}

.billing-control button[aria-pressed='true'] {
  color: var(--color-text);
}

.billing-control button:focus-visible {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
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

.plan-price-slot {
  position: relative;
}

.price-swap-enter-active,
.price-swap-leave-active {
  transition: opacity 160ms ease, transform 160ms ease;
}

.price-swap-leave-active {
  position: absolute;
  top: 0;
  left: 0;
}

.price-swap-enter-from {
  opacity: 0;
  transform: translateY(4px);
}

.price-swap-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

.savings-enter-active,
.savings-leave-active {
  transition: opacity 160ms ease, transform 160ms ease;
}

.savings-enter-from,
.savings-leave-to {
  opacity: 0;
  transform: translate(-50%, 4px);
}

@media (prefers-reduced-motion: reduce) {
  .billing-control::before,
  .billing-control button,
  .price-swap-enter-active,
  .price-swap-leave-active,
  .savings-enter-active,
  .savings-leave-active {
    transition: none;
  }
}

.plan-price span {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0;
}

.plan-limit {
  margin: 6px 0 0;
  color: var(--accent-primary);
  font-size: 0.875rem;
  font-weight: 800;
  text-transform: uppercase;
}

.plan-charge {
  margin: 12px 0 10px;
  min-height: 1.5em;
  color: var(--color-text-secondary);
  font-size: 0.8125rem;
  line-height: 1.5;
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
    padding: var(--section-padding) 0;
  }

  .pricing-container {
    width: min(calc(100% - 32px), 520px);
  }

  .section-header {
    margin-bottom: 24px;
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
