import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

test('link previews receive explicit current PONT metadata', () => {
  const layout = readFileSync(new URL('../app/layout.tsx', import.meta.url), 'utf8');

  assert.match(layout, /metadataBase:/);
  assert.match(layout, /alternates:/);
  assert.match(layout, /openGraph:/);
  assert.match(layout, /twitter:/);
  assert.match(layout, /card:\s*'summary_large_image'/);
  assert.match(layout, /PONT \u2014 Building Europe\u2019s Physical Future/);
});

test('Open Graph and Twitter use a purpose-built 1200 by 630 brand image', () => {
  const openGraphPath = new URL('../app/opengraph-image.tsx', import.meta.url);
  const twitterPath = new URL('../app/twitter-image.tsx', import.meta.url);

  assert.equal(existsSync(openGraphPath), true);
  assert.equal(existsSync(twitterPath), true);

  const openGraph = readFileSync(openGraphPath, 'utf8');
  assert.match(openGraph, /ImageResponse/);
  assert.match(openGraph, /width:\s*1200/);
  assert.match(openGraph, /height:\s*630/);
  assert.match(openGraph, /#FF5A42/i);
  assert.match(openGraph, /THE PHYSICAL HOME OF/);
  assert.match(openGraph, /TECHNOLOGICAL ERA\./);
  assert.match(openGraph, /COMMUNITY × ACADEMY/);
});

test('the local 127.0.0.1 preview may load Next development assets', () => {
  const config = readFileSync(new URL('../next.config.ts', import.meta.url), 'utf8');

  assert.match(config, /allowedDevOrigins:\s*\[\s*'127\.0\.0\.1'\s*\]/);
});
