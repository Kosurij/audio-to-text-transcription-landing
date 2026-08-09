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
