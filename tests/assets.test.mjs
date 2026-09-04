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

test('the first paint is covered by a short theme-aware intro', () => {
  const source = readFileSync(new URL('../app/components/PitchStage.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');

  assert.match(source, /className="intro-mask"/);
  assert.match(source, /<PontMark\s+className="intro-mark"\s*\/>/);
  assert.match(css, /\.intro-mask\s*{[^}]*animation:\s*pont-intro-exit 300ms/s);
  assert.match(css, /@media \(prefers-reduced-motion:\s*reduce\)[\s\S]*\.intro-mask\s*{[^}]*visibility:\s*hidden/s);
});

test('the capital scene shares one architectural grid in both orientations', () => {
  const css = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');

  assert.match(css, /\.scene-capital\s*{[^}]*--capital-grid-left:\s*55px;[^}]*--capital-grid-width:\s*860px;/s);
  assert.match(css, /\.capital-building\s*{[^}]*left:\s*var\(--capital-grid-left\);[^}]*width:\s*var\(--capital-grid-width\);/s);
  assert.match(css, /\.capital-partners\s*{[^}]*left:\s*var\(--capital-grid-left\);[^}]*width:\s*var\(--capital-grid-width\);/s);
  assert.match(css, /@media \(orientation:\s*portrait\)[\s\S]*\.scene-capital\s*{[^}]*--capital-grid-left:\s*42px;[^}]*--capital-grid-width:\s*600px;/s);
});

test('section 30 keeps its two-line heading clear of the diagram in compact landscape', () => {
  const css = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');

  assert.match(css, /@media \(orientation:\s*landscape\) and \(max-height:\s*560px\)[\s\S]*?\.capital-heading\s*{[^}]*top:\s*58px;[^}]*font-size:\s*48px;[^}]*}[\s\S]*?\.capital-heading \.line-inner\s*{[^}]*white-space:\s*nowrap;/s);
});

test('section 15 removes the obsolete connector and clears its compact mobile verdict', () => {
  const source = readFileSync(new URL('../app/components/PitchStage.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');

  assert.doesNotMatch(source, /hard-limit/);
  assert.match(css, /@media \(orientation:\s*landscape\) and \(max-height:\s*560px\) and \(max-width:\s*1100px\)[\s\S]*?\.hard-verdict\s*{[^}]*top:\s*535px;[^}]*bottom:\s*auto;/s);
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

test('every PONT lockup follows the active accent with theme-aware contrast', () => {
  const source = readFileSync(new URL('../app/components/PitchStage.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');
  const svg = readFileSync(new URL('../public/pont-logo.svg', import.meta.url), 'utf8');

  assert.match(source, /<PontMark\s+className="vision-core-mark"\s*\/>/);
  assert.doesNotMatch(source, /<Image\s+className="vision-core-mark"/);
  assert.doesNotMatch(css, /--brand-logo-coral:/i);
  assert.match(css, /\.pont-mark__base[\s\S]*?background:\s*var\(--coral\)/);
  assert.match(css, /\.pont-mark__contrast\s*{[^}]*background:\s*var\(--logo-contrast\)/s);
  assert.match(css, /\.vision-core\s*{[^}]*background:\s*var\(--bg\)/s);
  assert.match(svg, /#ff5a42/i);
  assert.doesNotMatch(svg, /#c43a2b/i);
  assert.match(svg, /#01004a/i);
  assert.doesNotMatch(svg, /#fefdfd/i);
});

test('section 40 reuses the same unmodified PONT mark as the other lockups', () => {
  const source = readFileSync(new URL('../app/components/PitchStage.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');

  assert.match(source, /<div className="vision-core"><PontMark className="vision-core-mark"\s*\/><\/div>/);
  assert.doesNotMatch(source, /vision-core"><PontMark[^\n]*ONE TECHNOLOGICAL ECOSYSTEM/);
  assert.doesNotMatch(css, /\.vision-core span\s*{/);
});

test('the latest visual polish rules keep labels and connector axes aligned', () => {
  const source = readFileSync(new URL('../app/components/PitchStage.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');

  assert.doesNotMatch(source, />10,000</);
  assert.match(source, />10\.000</);
  assert.match(css, /\.business-value-current i\s*{[^}]*top:\s*22px;[^}]*bottom:\s*auto;/s);
  assert.match(css, /@media \(orientation:\s*portrait\)[\s\S]*\.founder-first-startup-token\s*{[^}]*left:\s*calc\(50% - 54px\);/s);
  assert.match(source, /THE PHYSICAL HOME OF[\s\S]*EUROPE&apos;S NEXT[\s\S]*TECHNOLOGICAL ERA\./);
});

test('the desktop home copy uses the open right column above the blueprint', () => {
  const css = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');

  assert.match(css, /@media \(orientation:\s*landscape\) and \(min-height:\s*561px\)[\s\S]*?\.home-argument\s*{[^}]*top:\s*112px;[^}]*right:\s*55px;[^}]*bottom:\s*auto;[^}]*left:\s*auto;[^}]*width:\s*300px;[^}]*text-align:\s*right;/s);
});

test('the Europe finale settles its heading before revealing separated portrait copy', () => {
  const source = readFileSync(new URL('../app/components/PitchStage.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');

  assert.match(source, /\.fromTo\(\$\('\.europe-argument'\)[\s\S]*?\},\s*'>'\)/);
  assert.match(css, /@media \(orientation:\s*portrait\)[\s\S]*?\.stay-line\s*{[^}]*bottom:\s*210px;/s);
  assert.match(css, /@media \(orientation:\s*portrait\)[\s\S]*?\.europe-argument\s*{[^}]*bottom:\s*70px;/s);
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
