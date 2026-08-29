import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
const pricingStart = html.indexOf('<section id="pricing"');
const pricingEnd = html.indexOf('<section class="faq"', pricingStart);
const pricing = pricingStart >= 0 && pricingEnd > pricingStart
  ? html.slice(pricingStart, pricingEnd)
  : '';

test('pricing section exposes every approved plan and benefit', () => {
  assert.notEqual(pricing, '', 'rendered pricing section is missing');
  assert.match(pricing, /Start free, then upgrade when your workflow grows/);
  assert.match(pricing, /Free[\s\S]*\$0[\s\S]*200 minutes \/ week/);
  assert.match(pricing, /Basic[\s\S]*\$6\.99[\s\S]* \/ month[\s\S]*2,400 minutes \/ month/);
  assert.match(pricing, /Pro[\s\S]*\$12\.99[\s\S]* \/ month[\s\S]*7,200 minutes \/ month/);
  assert.match(pricing, /Max[\s\S]*\$19\.99[\s\S]* \/ month[\s\S]*14,000 minutes \/ month/);
  assert.match(pricing, /3× the minutes/);
  assert.match(pricing, /9× the minutes/);
  assert.match(pricing, /17\.5× the minutes/);
  const basicCard = pricing.slice(pricing.indexOf('Basic'), pricing.indexOf('Pro'));
  const proCard = pricing.slice(pricing.indexOf('Pro'), pricing.indexOf('Max'));
  const maxCard = pricing.slice(pricing.indexOf('Max'));

  assert.doesNotMatch(basicCard, /High Accuracy uses 33% fewer minutes/);
  assert.match(proCard, /High Accuracy uses 33% fewer minutes/);
  assert.match(maxCard, /High Accuracy uses 33% fewer minutes/);
  assert.doesNotMatch(pricing, /High Accuracy uses (?:2|3)×/);
  assert.ok((pricing.match(/chromewebstore\.google\.com/g) ?? []).length >= 4);
  assert.equal((pricing.match(/Get started/g) ?? []).length, 4);
  assert.doesNotMatch(pricing, /class="icon"/);
});

test('rendered home page exposes pricing in the approved order and navigation', () => {
  const testimonialsIndex = html.indexOf('class="testimonials"');
  const pricingIndex = html.indexOf('id="pricing"');
  const faqIndex = html.indexOf('id="faq"');

  assert.ok(testimonialsIndex >= 0 && testimonialsIndex < pricingIndex);
  assert.ok(pricingIndex < faqIndex);
  assert.equal((html.match(/href="\/#pricing"/g) ?? []).length, 1);
});
