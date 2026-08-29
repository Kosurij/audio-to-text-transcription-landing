import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');

test('visible FAQ explains free use, monthly plan allowances, upgrades and cancellation', () => {
  assert.match(html, /Is Audio To Text Transcription free to use\?/);
  assert.match(html, /200 minutes per week/);
  assert.match(html, /How do paid plan minute allowances work\?/);
  assert.match(html, /Unused minutes do not roll over/);
  assert.match(html, /What happens when I upgrade\?/);
  assert.match(html, /Pro and Max also use 33% fewer minutes in High Accuracy mode/);
  assert.doesNotMatch(html, /A paid plan gives you[\s\S]*reduced minute usage in High Accuracy mode/);
  assert.match(html, /Can I cancel my subscription\?/);
  assert.match(html, /30-day money-back guarantee/);
});

test('JSON-LD publishes four USD offers and matching subscription FAQ', () => {
  const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(match, 'JSON-LD script is missing');
  const jsonLd = JSON.parse(match[1]);
  const software = jsonLd['@graph'].find((item) => item['@type'] === 'SoftwareApplication');
  const faq = jsonLd['@graph'].find((item) => item['@type'] === 'FAQPage');

  assert.deepEqual(
    software.offers.map(({ name, price, priceCurrency }) => ({ name, price, priceCurrency })),
    [
      { name: 'Free', price: '0', priceCurrency: 'USD' },
      { name: 'Basic', price: '6.99', priceCurrency: 'USD' },
      { name: 'Pro', price: '12.99', priceCurrency: 'USD' },
      { name: 'Max', price: '19.99', priceCurrency: 'USD' },
    ],
  );
  const faqText = JSON.stringify(faq);
  assert.match(faqText, /Is Audio To Text Transcription free to use\?/);
  assert.match(faqText, /200 minutes per week/);
  assert.match(faqText, /Unused minutes do not roll over/);
  assert.match(faqText, /Pro and Max also use 33% fewer minutes in High Accuracy mode/);
  assert.doesNotMatch(faqText, /The extension is free to install and use\./);
});
