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

test('the first paint uses an architectural split-panel intro', () => {
  const source = readFileSync(new URL('../app/components/PitchStage.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');

  assert.match(source, /className="intro-mask"/);
  assert.match(source, /intro-panel intro-panel--top/);
  assert.match(source, /intro-panel intro-panel--bottom/);
  assert.match(source, /className="intro-scan"/);
  assert.match(source, /<PontMark\s+className="intro-mark"\s*\/>/);
  assert.doesNotMatch(source, /intro-signature/);
  assert.match(css, /\.intro-panel--top\s*{[^}]*animation:\s*pont-intro-panel-top 280ms 500ms/s);
  assert.match(css, /\.intro-panel--bottom\s*{[^}]*animation:\s*pont-intro-panel-bottom 280ms 500ms/s);
  assert.match(css, /\.intro-scan\s*{[^}]*background:\s*#ff5a42;/i);
  assert.match(css, /\.intro-mark \.pont-mark__base\s*{[^}]*background:\s*#ff5a42;/i);
  assert.match(css, /\.intro-mask\s*{[^}]*animation:\s*pont-intro-cleanup 1ms 780ms/s);
  assert.match(css, /@media \(prefers-reduced-motion:\s*reduce\)[\s\S]*\.intro-mask\s*{[^}]*visibility:\s*hidden/s);
});

test('the capital scene shares one architectural grid in both orientations', () => {
  const css = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');

  assert.match(css, /\.scene-capital\s*{[^}]*--capital-grid-left:\s*55px;[^}]*--capital-grid-width:\s*860px;/s);
  assert.match(css, /\.capital-building\s*{[^}]*left:\s*var\(--capital-grid-left\);[^}]*width:\s*var\(--capital-grid-width\);/s);
  assert.match(css, /\.capital-partners\s*{[^}]*left:\s*var\(--capital-grid-left\);[^}]*width:\s*var\(--capital-grid-width\);/s);
  assert.match(css, /@media \(orientation:\s*portrait\)[\s\S]*\.scene-capital\s*{[^}]*--capital-grid-left:\s*42px;[^}]*--capital-grid-width:\s*600px;/s);
});

test('the desktop capital connector terminates at the moved investor card edge', () => {
  const css = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');

  assert.match(css, /\.capital-connection\s*{[^}]*left:\s*260px;[^}]*width:\s*406px;/s);
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
  assert.match(source, /<strong>IN PARTNERSHIP WITH THE STACK<\/strong>/);
  assert.match(css, /\.business-value-current i\s*{[^}]*top:\s*22px;[^}]*bottom:\s*auto;/s);
  assert.match(css, /@media \(orientation:\s*portrait\)[\s\S]*\.founder-first-startup-token\s*{[^}]*left:\s*calc\(50% - 54px\);/s);
  assert.match(source, /THE PHYSICAL HOME OF[\s\S]*EUROPE&apos;S NEXT[\s\S]*TECHNOLOGICAL ERA\./);
});

test('the acting state replaces the full heading with responsive two-line copy', () => {
  const source = readFileSync(new URL('../app/components/PitchStage.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');

  assert.match(source, /act-copy__lead[^>]*>NOW AI IS LEARNING</);
  assert.match(source, /act-copy__accent[^>]*>HOW TO ACT\.</);
  assert.match(css, /\.act-mask\s*{[^}]*top:\s*0;[^}]*width:\s*100%;/s);
  assert.match(css, /@media \(orientation:\s*portrait\)[\s\S]*\.act-copy__lead\s*{[^}]*font-size:/s);
});

test('the desktop home copy uses the open right column above the blueprint', () => {
  const css = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');

  assert.match(css, /@media \(orientation:\s*landscape\) and \(min-height:\s*561px\)[\s\S]*?\.home-argument\s*{[^}]*top:\s*112px;[^}]*right:\s*55px;[^}]*bottom:\s*auto;[^}]*left:\s*auto;[^}]*width:\s*300px;[^}]*text-align:\s*right;/s);
});

test('section 23 separates its blueprint and copy in compact mobile landscape', () => {
  const css = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');
  const source = readFileSync(new URL('../app/components/PitchStage.tsx', import.meta.url), 'utf8');

  assert.match(source, /TO ACCELERATE[\s\S]*WHAT’S MISSING[\s\S]*IN EUROPE\./);
  assert.match(css, /@media \(orientation:\s*landscape\) and \(max-height:\s*560px\) and \(max-width:\s*1100px\)[\s\S]*?\.home-blueprint\s*{[^}]*top:\s*190px;[^}]*left:\s*40px;[^}]*width:\s*650px;[^}]*height:\s*430px;[^}]*}[\s\S]*?\.home-final\s*{[^}]*top:\s*190px;[^}]*left:\s*720px;[^}]*width:\s*360px;[^}]*}[\s\S]*?\.home-argument\s*{[^}]*top:\s*350px;[^}]*right:\s*auto;[^}]*bottom:\s*auto;[^}]*left:\s*720px;[^}]*width:\s*350px;/s);
});

test('section 33 omits the redundant accent helper copy', () => {
  const source = readFileSync(new URL('../app/components/PitchStage.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');

  assert.doesNotMatch(source, /bridge-network/);
  assert.doesNotMatch(css, /\.bridge-network/);
});

test('the bridge revision removes the outflow slide and leads with the global connection message', () => {
  const source = readFileSync(new URL('../app/components/PitchStage.tsx', import.meta.url), 'utf8');

  assert.doesNotMatch(source, /className="bridge-heading/);
  assert.doesNotMatch(source, /className="bridge-outflow/);
  assert.doesNotMatch(source, /addLabel\('talent-outflow'\)/);
  assert.match(source, /PONT CONNECTS WHAT THE/);
  assert.match(source, /WORLD BUILDS BEST\./);
});

test('section 35 removes the obsolete startup-to-university transition', () => {
  const source = readFileSync(new URL('../app/components/PitchStage.tsx', import.meta.url), 'utf8');

  assert.doesNotMatch(source, /addLabel\('university-shifts'\)/);
  assert.doesNotMatch(source, /className="founder-first-heading/);
  assert.doesNotMatch(source, /className="founder-first-direction/);
  assert.match(source, /className="founder-first-operating"/);
});

test('all visible university copy is replaced by academy copy', () => {
  const source = readFileSync(new URL('../app/components/PitchStage.tsx', import.meta.url), 'utf8');

  assert.doesNotMatch(source, />UNIVERSITY</);
  assert.doesNotMatch(source, /UNIVERSITY × COMPANIES/);
  assert.doesNotMatch(source, /NOT ANOTHER UNIVERSITY|PUT THE UNIVERSITY|THE UNIVERSITY/);
  assert.doesNotMatch(source, /aria-label="[^"]*university/i);
  assert.match(source, /NOT ANOTHER ACADEMY/);
  assert.match(source, /PUT THE ACADEMY/);
  assert.match(source, /ACADEMY × COMPANIES/);
  assert.match(source, /THE ACADEMY/);
});

test('the flywheel entry uses the tenant token without the obsolete arrow', () => {
  const source = readFileSync(new URL('../app/components/PitchStage.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');

  assert.match(source, /className="flywheel-entrant"/);
  assert.doesNotMatch(source, /flywheel-entry-line/);
  assert.doesNotMatch(css, /\.flywheel-entry-line/);
});

test('the portrait vision uses only one connector above the PONT lockup', () => {
  const css = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');

  assert.match(css, /@media \(orientation:\s*portrait\)[\s\S]*?\.vision-core::before\s*{[^}]*display:\s*none;/s);
});

test('section 31 gives its closing copy breathing room in compact landscape', () => {
  const css = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');

  assert.match(css, /@media \(orientation:\s*landscape\) and \(max-height:\s*560px\) and \(max-width:\s*1100px\)[\s\S]*?\.capital-building\s*{[^}]*height:\s*270px;[^}]*}[\s\S]*?\.capital-old-relation\s*{[^}]*top:\s*486px;[^}]*}[\s\S]*?\.capital-final\s*{[^}]*top:\s*522px;[^}]*}[\s\S]*?\.capital-outcome\s*{[^}]*top:\s*582px;/s);
});

test('the Europe sequence replaces the stay slogan with connected problem and solution states', () => {
  const source = readFileSync(new URL('../app/components/PitchStage.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');

  assert.doesNotMatch(source, /BUILD SOMETHING|WORTH <em>STAYING/);
  assert.match(source, /europe-gap-title[\s\S]*THE INFRASTRUCTURE[\s\S]*GAP\./);
  assert.match(source, /europe-solution-title[\s\S]*THIS IS WHERE[\s\S]*PONT[\s\S]*COMES IN\./);
  assert.match(source, /addLabel\('companies'\)[\s\S]*addLabel\('infrastructure-gap'\)[\s\S]*addLabel\('pont-comes-in'\)/);
  assert.match(css, /@media \(orientation:\s*portrait\)[\s\S]*?\.europe-narrative-state\s*{[^}]*left:\s*72px;[^}]*width:\s*624px;/s);
});

test('the founder-first system has a portrait-specific operating field', () => {
  const source = readFileSync(new URL('../app/components/PitchStage.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');

  assert.match(source, /A COST-EFFECTIVE HYBRID MODEL/);
  assert.match(source, /founder-first-model-title/);
  assert.match(source, /mode\.detail/);
  assert.match(css, /\.founder-first-field\s*{[^}]*width:\s*860px;[^}]*height:\s*330px;/s);
  assert.match(css, /@media \(orientation:\s*portrait\)[\s\S]*\.founder-first-field\s*{[^}]*width:\s*600px;[^}]*height:\s*580px;/s);
});

test('the traveling model switches from horizontal to vertical routing', () => {
  const css = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');

  assert.match(css, /\.model-field\s*{[^}]*width:\s*860px;[^}]*height:\s*320px;/s);
  assert.match(css, /@media \(orientation:\s*portrait\)[\s\S]*\.model-field\s*{[^}]*width:\s*600px;[^}]*height:\s*590px;/s);
});

test('the final vision has an orientation-aware transformation field', () => {
  const source = readFileSync(new URL('../app/components/PitchStage.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');

  assert.doesNotMatch(source, /EUROPE HAS THE <em>SCIENCE\.<\/em>/);
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
