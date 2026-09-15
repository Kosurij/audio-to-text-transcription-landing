import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import test from 'node:test';

const origin = 'https://audio-to-text-transcription.com';
const readPage = async (path = '') => {
  const html = await readFile(new URL(`../dist/${path ? path + '/' : ''}index.html`, import.meta.url), 'utf8');
  const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(match);
  assert.ok(html.indexOf(match[0]) < html.indexOf('</head>'));
  return { html, graph: JSON.parse(match[1])['@graph'] };
};
const text = (value) => value.replace(/<[^>]+>/g, '').replace(/&#39;|&#x27;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();

test('inner pages describe their own content instead of repeating the landing page schemas', async () => {
  for (const path of ['privacy', 'terms', 'refund', 'contact', 'welcome', 'uninstall']) {
    const { graph } = await readPage(path);
    assert.ok(!graph.some(x => ['SoftwareApplication', 'FAQPage', 'HowTo'].includes(x['@type'])), path);
    const page = graph.find(x => ['WebPage', 'ContactPage'].includes(x['@type']));
    assert.equal(page.url, `${origin}/${path}/`);
    assert.equal(page['@type'], path === 'contact' ? 'ContactPage' : 'WebPage');
    const crumbs = graph.find(x => x['@type'] === 'BreadcrumbList').itemListElement;
    assert.equal(crumbs.length, 2);
    assert.equal(crumbs[1].item, page.url);
  }
});

test('FAQ structured data exactly matches the rendered questions and answers', async () => {
  const { html, graph } = await readPage();
  const faq = graph.find(x => x['@type'] === 'FAQPage');
  const questions = [...html.matchAll(/<button[^>]*class="faq-question"[^>]*>[\s\S]*?<span[^>]*>([\s\S]*?)<\/span>/g)].map(m => text(m[1]));
  const answers = [...html.matchAll(/<div[^>]*class="faq-answer"[^>]*>\s*<p[^>]*>([\s\S]*?)<\/p>/g)].map(m => text(m[1]));
  assert.ok(questions.length > 0);
  assert.deepEqual(faq.mainEntity.map(x => x.name), questions);
  assert.deepEqual(faq.mainEntity.map(x => x.acceptedAnswer.text), answers);
});

test('entity graph uses a real logo and does not invent ownership or search features', async () => {
  const { graph } = await readPage();
  const org = graph.find(x => x['@type'] === 'Organization');
  const site = graph.find(x => x['@type'] === 'WebSite');
  const app = graph.find(x => x['@type'] === 'SoftwareApplication');
  assert.equal(org.name, 'Kobaltstack LLC');
  assert.equal(org.founder, undefined);
  assert.equal(org.sameAs, undefined);
  assert.equal(site.publisher['@id'], org['@id']);
  assert.ok(site['@id']);
  assert.equal(site.potentialAction, undefined);
  assert.equal(app.browserRequirements, undefined);
  assert.equal(app.softwareVersion, undefined);
  assert.equal(app.datePublished, undefined);
  assert.ok(app.sameAs.length >= 3);
  await access(new URL(`../dist${new URL(org.logo.url).pathname}`, import.meta.url));
  assert.doesNotMatch(JSON.stringify(graph), /no data collection|we don't store or share your data|Offline Functionality|Real-time Transcription|above 95%/);
});

test('rating metadata matches the visible rating and count', async () => {
  const { html, graph } = await readPage();
  const rating = graph.find(x => x['@type'] === 'SoftwareApplication').aggregateRating;
  const body = html.slice(html.indexOf('<body'));
  assert.match(body, new RegExp(`>${rating.ratingValue.replace('.', '\\.')}<`));
  assert.match(text(body), new RegExp(`${rating.ratingCount} ratings`));
});
