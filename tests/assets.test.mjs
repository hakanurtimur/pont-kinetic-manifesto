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
