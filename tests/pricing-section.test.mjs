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
  assert.match(pricing, /More minutes, every week/);
  assert.match(pricing, /Free[\s\S]*\$0[\s\S]*200 minutes \/ week/);
  assert.match(pricing, /Basic[\s\S]*\$6\.99[\s\S]*600 minutes \/ week/);
  assert.match(pricing, /Pro[\s\S]*\$12\.99[\s\S]*1,800 minutes \/ week/);
  assert.match(pricing, /Business[\s\S]*\$19\.99[\s\S]*3,500 minutes \/ week/);
  assert.match(pricing, /3× the weekly minutes/);
  assert.match(pricing, /9× the weekly minutes/);
  assert.match(pricing, /17\.5× the weekly minutes/);
  assert.match(pricing, /Reduced minute usage in High Accuracy mode/);
  assert.doesNotMatch(pricing, /High Accuracy uses (?:2|3)×/);
  assert.ok((pricing.match(/chromewebstore\.google\.com/g) ?? []).length >= 4);
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
