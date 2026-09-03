import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const componentPath = new URL('../app/components/PitchStage.tsx', import.meta.url);
const stylesPath = new URL('../app/globals.css', import.meta.url);

test('the presentation uses a real native scroll rail with mandatory one-stop snapping', async () => {
  const [component, styles] = await Promise.all([
    readFile(componentPath, 'utf8'),
    readFile(stylesPath, 'utf8'),
  ]);

  assert.match(component, /className="pagination-rail"/);
  assert.match(component, /className="scroll-page"/);
  assert.match(component, /addEventListener\('scroll'/);
  assert.doesNotMatch(component, /addEventListener\('wheel'/);
  assert.match(styles, /overflow-y:\s*auto/);
  assert.match(styles, /scroll-snap-type:\s*y mandatory/);
  assert.match(styles, /scroll-snap-stop:\s*always/);
});
