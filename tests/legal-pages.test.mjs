import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const home = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
const footerStart = home.indexOf('<footer');
const footerEnd = home.indexOf('</footer>') + '</footer>'.length;
const footer = home.slice(footerStart, footerEnd);

test('footer shows the SHIFT LLC entity, not the old Kazakhstan entity', () => {
  assert.match(footer, /SHIFT LLC/);
  assert.match(footer, /5, Street 17, Argel, Nor Hachn, Kotayk region, 2404, RA/);
  assert.doesNotMatch(footer, /PE Yuri Kosenko/);
  assert.doesNotMatch(footer, /Pavlodar/);
});

test('footer support column links to Terms of Service and Refund Policy', () => {
  assert.match(footer, /<a href="\/terms"[^>]*>Terms of Service<\/a>/);
  assert.match(footer, /<a href="\/refund"[^>]*>Refund Policy<\/a>/);
});

test('global Organization JSON-LD uses the SHIFT LLC entity and Armenia address', () => {
  const match = home.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(match, 'JSON-LD script is missing');
  const jsonLd = JSON.parse(match[1]);
  const org = jsonLd['@graph'].find((item) => item['@type'] === 'Organization');

  assert.equal(org.legalName, 'SHIFT LLC');
  assert.deepEqual(org.address, {
    '@type': 'PostalAddress',
    streetAddress: '5, Street 17, Argel',
    addressLocality: 'Nor Hachn',
    addressRegion: 'Kotayk',
    postalCode: '2404',
    addressCountry: 'AM',
  });
  assert.equal(org.founder.name, 'Yuri Kosenko');
});

const privacy = await readFile(new URL('../dist/privacy/index.html', import.meta.url), 'utf8');

test('privacy page names SHIFT LLC as the operating entity', () => {
  assert.match(privacy, /Last Updated: August 9, 2026/);
  assert.match(
    privacy,
    /Audio To Text Transcription is operated by SHIFT LLC, a company registered in the Republic of Armenia at 5, Street 17, Argel, Nor Hachn, Kotayk region, 2404, RA\./,
  );
});
