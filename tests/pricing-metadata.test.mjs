import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');

test('visible FAQ explains billing periods, quota refills, upgrades and cancellation', () => {
  assert.match(html, /Is Audio To Text Transcription free to use\?/);
  assert.match(html, /200 minutes per week/);
  assert.match(html, /How do paid plan minute allowances work\?/);
  assert.match(html, /Unused minutes do not roll over/);
  assert.match(html, /What happens when I upgrade\?/);
  assert.match(html, /Pro and Max also use 33% fewer minutes in High Accuracy mode/);
  assert.doesNotMatch(html, /A paid plan gives you[\s\S]*reduced minute usage in High Accuracy mode/);
  assert.match(html, /Can I cancel my subscription\?/);
  assert.match(html, /14-day money-back guarantee/);
  assert.match(html, /every 30 days/);
  assert.match(html, /full year upfront/);
  assert.match(html, /unused paid monthly minutes.*Extra Minutes/);
  assert.match(html, /500 Extra Minutes for \$4\.99 or 1,500 for \$9\.99/);
});

test('JSON-LD publishes both billing periods with full annual charge amounts', () => {
  const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(match, 'JSON-LD script is missing');
  const jsonLd = JSON.parse(match[1]);
  const software = jsonLd['@graph'].find((item) => item['@type'] === 'SoftwareApplication');
  const faq = jsonLd['@graph'].find((item) => item['@type'] === 'FAQPage');

  assert.deepEqual(
    software.offers.map(({ name, price, priceCurrency }) => ({ name, price, priceCurrency })),
    [
      { name: 'Free', price: '0', priceCurrency: 'USD' },
      { name: 'Basic — monthly', price: '6.99', priceCurrency: 'USD' },
      { name: 'Basic — yearly', price: '74.99', priceCurrency: 'USD' },
      { name: 'Pro — monthly', price: '12.99', priceCurrency: 'USD' },
      { name: 'Pro — yearly', price: '119.99', priceCurrency: 'USD' },
      { name: 'Max — monthly', price: '19.99', priceCurrency: 'USD' },
      { name: 'Max — yearly', price: '189.99', priceCurrency: 'USD' },
    ],
  );
  for (const offer of software.offers.slice(1)) {
    assert.equal(offer.priceSpecification.price, offer.price);
    assert.equal(offer.priceSpecification.billingDuration, offer.name.endsWith('yearly') ? 'P1Y' : 'P1M');
  }
  const faqText = JSON.stringify(faq);
  assert.match(faqText, /Is Audio To Text Transcription free to use\?/);
  assert.match(faqText, /200 minutes per week/);
  assert.match(faqText, /Unused minutes do not roll over/);
  assert.match(faqText, /Pro and Max also use 33% fewer minutes in High Accuracy mode/);
  assert.doesNotMatch(faqText, /The extension is free to install and use\./);
});
