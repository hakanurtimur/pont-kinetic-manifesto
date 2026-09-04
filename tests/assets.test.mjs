import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

test('the responsive logo uses a raster-free SVG mask', () => {
  const svgPath = new URL('../public/pont-logo.svg', import.meta.url);
  const css = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');

  assert.equal(existsSync(svgPath), true, 'the vector logo asset must exist');
  assert.match(css, /mask: url\('\/pont-logo\.svg'\)/);

  const svg = readFileSync(svgPath, 'utf8');
  assert.doesNotMatch(svg, /<image\b|data:image\//i);
  assert.match(svg, /<path\b/);
});

test('the capital scene shares one architectural grid in both orientations', () => {
  const css = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');

  assert.match(css, /\.scene-capital\s*{[^}]*--capital-grid-left:\s*55px;[^}]*--capital-grid-width:\s*860px;/s);
  assert.match(css, /\.capital-building\s*{[^}]*left:\s*var\(--capital-grid-left\);[^}]*width:\s*var\(--capital-grid-width\);/s);
  assert.match(css, /\.capital-partners\s*{[^}]*left:\s*var\(--capital-grid-left\);[^}]*width:\s*var\(--capital-grid-width\);/s);
  assert.match(css, /@media \(orientation:\s*portrait\)[\s\S]*\.scene-capital\s*{[^}]*--capital-grid-left:\s*42px;[^}]*--capital-grid-width:\s*600px;/s);
});

test('the university scene has an orientation-aware inversion field', () => {
  const css = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');

  assert.match(css, /\.university-field\s*{[^}]*width:\s*860px;[^}]*height:\s*300px;/s);
  assert.match(css, /@media \(orientation:\s*portrait\)[\s\S]*\.university-field\s*{[^}]*width:\s*600px;[^}]*height:\s*520px;/s);
});

test('the university uses a single SVG network and the founder-first diagram has no strike-through', () => {
  const source = readFileSync(new URL('../app/components/PitchStage.tsx', import.meta.url), 'utf8');

  assert.match(source, /className="university-network"/);
  assert.doesNotMatch(source, /founder-first-wrong/);
});

test('the vision core renders the supplied vector logo asset directly', () => {
  const source = readFileSync(new URL('../app/components/PitchStage.tsx', import.meta.url), 'utf8');

  assert.match(source, /<Image\s+className="vision-core-mark"\s+src="\/pont-logo\.svg"/);
});

test('the founder-first system has a portrait-specific operating field', () => {
  const css = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');

  assert.match(css, /\.founder-first-field\s*{[^}]*width:\s*860px;[^}]*height:\s*330px;/s);
  assert.match(css, /@media \(orientation:\s*portrait\)[\s\S]*\.founder-first-field\s*{[^}]*width:\s*600px;[^}]*height:\s*580px;/s);
});

test('the traveling model switches from horizontal to vertical routing', () => {
  const css = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');

  assert.match(css, /\.model-field\s*{[^}]*width:\s*860px;[^}]*height:\s*320px;/s);
  assert.match(css, /@media \(orientation:\s*portrait\)[\s\S]*\.model-field\s*{[^}]*width:\s*600px;[^}]*height:\s*590px;/s);
});

test('the final vision has an orientation-aware transformation field', () => {
  const css = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');

  assert.match(css, /\.vision-field\s*{[^}]*width:\s*860px;[^}]*height:\s*320px;/s);
  assert.match(css, /@media \(orientation:\s*portrait\)[\s\S]*\.vision-field\s*{[^}]*width:\s*600px;[^}]*height:\s*600px;/s);
});

test('the founder connector fan converges all three ecosystems into PONT', () => {
  const css = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');

  assert.match(css, /\.founder-roof\s*{[^}]*right:\s*104px;[^}]*left:\s*55px;[^}]*width:\s*auto;/s);
  assert.match(css, /\.founder-roof-line\s*{[^}]*width:\s*34\.5%;/s);
  assert.match(css, /\.founder-roof-line--left\s*{[^}]*left:\s*16\.3%;[^}]*rotate:\s*5deg;[^}]*transform-origin:\s*left center;/s);
  assert.match(css, /\.founder-roof-line--right\s*{[^}]*right:\s*16\.3%;[^}]*rotate:\s*-5deg;[^}]*transform-origin:\s*right center;/s);
  assert.match(css, /\.founder-trace--1,\s*\.founder-trace--3\s*{[^}]*display:\s*none;/s);
});
