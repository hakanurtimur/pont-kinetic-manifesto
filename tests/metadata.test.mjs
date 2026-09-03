import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('link previews receive explicit current PONT metadata', () => {
  const layout = readFileSync(new URL('../app/layout.tsx', import.meta.url), 'utf8');

  assert.match(layout, /metadataBase:/);
  assert.match(layout, /alternates:/);
  assert.match(layout, /openGraph:/);
  assert.match(layout, /twitter:/);
  assert.match(layout, /PONT \u2014 Building Europe\u2019s Physical Future/);
});
