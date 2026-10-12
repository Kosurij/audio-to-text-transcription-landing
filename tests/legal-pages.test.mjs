import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const home = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
const footerStart = home.indexOf('<footer');
const footerEnd = home.indexOf('</footer>') + '</footer>'.length;
const footer = home.slice(footerStart, footerEnd);

test('footer shows the Kobaltstack LLC entity, not a previous entity', () => {
  assert.match(footer, /Kobaltstack LLC/);
  assert.match(footer, /447 Broadway, 2nd Floor, 3436, New York, NY 10013, New York, US/);
  assert.doesNotMatch(footer, /PE Yuri Kosenko/);
  assert.doesNotMatch(footer, /Pavlodar/);
  assert.doesNotMatch(footer, /SHIFT LLC|Argel|Kotayk/);
});

test('footer support column links to Terms of Service and Refund Policy', () => {
  assert.match(footer, /<a href="\/terms\/"[^>]*>Terms of Service<\/a>/);
  assert.match(footer, /<a href="\/refund\/"[^>]*>Refund Policy<\/a>/);
});

test('footer publishes the general information email address', () => {
  assert.match(
    footer,
    /<a href="mailto:info@audio-to-text-transcription\.com"[^>]*>info@audio-to-text-transcription\.com<\/a>/,
  );
  assert.doesNotMatch(footer, /support@audio-to-text-transcription\.com/);
});

test('global Organization JSON-LD uses the Kobaltstack LLC entity and US address', () => {
  const match = home.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(match, 'JSON-LD script is missing');
  const jsonLd = JSON.parse(match[1]);
  const org = jsonLd['@graph'].find((item) => item['@type'] === 'Organization');

  assert.equal(org.legalName, 'Kobaltstack LLC');
  assert.deepEqual(org.address, {
    '@type': 'PostalAddress',
    streetAddress: '447 Broadway, 2nd Floor, 3436',
    addressLocality: 'New York',
    addressRegion: 'New York',
    postalCode: '10013',
    addressCountry: 'US',
  });
  assert.equal(org.founder, undefined);
});

const privacy = await readFile(new URL('../dist/privacy/index.html', import.meta.url), 'utf8');

test('privacy page names Kobaltstack LLC as the operating entity', () => {
  assert.match(
    privacy,
    /Audio To Text Transcription is operated by Kobaltstack LLC, with its address at 447 Broadway, 2nd Floor, 3436, New York, NY 10013, New York, US\./,
  );
  assert.match(privacy, /European Economic Area \(GDPR\)/);
  assert.match(privacy, /California Residents \(CCPA\)/);
  assert.match(privacy, /Cookies and Similar Technologies/);
  assert.match(privacy, /Chrome Web Store Limited Use Disclosure/);
  assert.match(privacy, /We do not retain recordings or completed transcripts on our servers/);
});

const terms = await readFile(new URL('../dist/terms/index.html', import.meta.url), 'utf8');

test('terms page covers the Kobaltstack LLC entity, service description, and drops Promotions', () => {
  assert.match(terms, /<h1[^>]*>Terms of Service<\/h1>/);
  assert.match(terms, /Last Updated: September 15, 2026/);
  assert.match(terms, /operated under Kobaltstack LLC/);
  assert.match(terms, /Chrome extension, which convert uploaded or recorded audio and video into text/);
  assert.match(terms, /governed by the laws applicable to Kobaltstack LLC/);
  assert.match(terms, /support@audio-to-text-transcription\.com/);
  assert.doesNotMatch(terms, />Promotions</);
  assert.doesNotMatch(terms, /SHIFT LLC|Armenia|American Arbitration Association/);
  assert.match(terms, /If unresolved within 60 days/);
});

const refund = await readFile(new URL('../dist/refund/index.html', import.meta.url), 'utf8');

test('refund page promises a 30-day guarantee and 7-business-day processing', () => {
  assert.match(refund, /<h1[^>]*>Refund Policy<\/h1>/);
  assert.match(refund, /Last Updated: September 15, 2026/);
  assert.match(refund, /30-day money-back guarantee/);
  assert.match(refund, /paid subscriptions and one-time minute-pack purchases/);
  assert.match(refund, /within 7 business days/);
  assert.doesNotMatch(refund, /20-day/);
  assert.match(refund, /within 30 days of the relevant charge/);
  assert.match(refund, /within 2 business days/);
  assert.match(refund, /statutory consumer rights/);
  assert.match(refund, /reason is optional/);
  assert.doesNotMatch(refund, /within 14 days/);
});

const sitemap = await readFile(new URL('../dist/sitemap.xml', import.meta.url), 'utf8');
const llmsTxt = await readFile(new URL('../dist/llms.txt', import.meta.url), 'utf8');

test('sitemap lists only canonical trailing-slash URLs for indexable pages', () => {
  for (const path of ['privacy', 'terms', 'refund', 'contact']) {
    assert.match(sitemap, new RegExp(`<loc>https://audio-to-text-transcription\\.com/${path}/</loc>`));
    assert.doesNotMatch(sitemap, new RegExp(`<loc>https://audio-to-text-transcription\\.com/${path}</loc>`));
  }

  const privacyBlock = sitemap.match(/<url>\s*<loc>https:\/\/audio-to-text-transcription\.com\/privacy\/<\/loc>[\s\S]*?<\/url>/)[0];
  assert.match(privacyBlock, /<lastmod>2026-09-15<\/lastmod>/);
});

test('rendered internal links do not advertise redirecting page URLs', () => {
  for (const page of [home, refund]) {
    assert.doesNotMatch(page, /href="\/(?:privacy|terms|refund|contact)"/);
  }
});

test('llms.txt lists Terms of Service and Refund Policy under Legal', () => {
  const legalSection = llmsTxt.slice(llmsTxt.indexOf('## Legal'), llmsTxt.indexOf('## Support'));
  assert.match(legalSection, /\[Terms of Service\]\(https:\/\/audio-to-text-transcription\.com\/terms\/\)/);
  assert.match(legalSection, /\[Refund Policy\]\(https:\/\/audio-to-text-transcription\.com\/refund\/\)/);
});
