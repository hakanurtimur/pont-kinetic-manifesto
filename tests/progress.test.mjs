import test from 'node:test';
import assert from 'node:assert/strict';

import {
  BEATS,
  clampProgress,
  nearestBeat,
  progressForBeat,
} from '../src/lib/progress.mjs';

test('clampProgress limits timeline input to the normalized range', () => {
  assert.equal(clampProgress(-0.4), 0);
  assert.equal(clampProgress(0.42), 0.42);
  assert.equal(clampProgress(1.6), 1);
});

test('beat positions increase from the first to the last beat', () => {
  assert.deepEqual(BEATS.slice(-27), [
    'hard-tech-premise',
    'hard-tech-infrastructure',
    'space-shell',
    'ecosystem-product',
    'founder-streams',
    'one-roof',
    'empty-building',
    'community-first',
    'one-square-metre',
    'ten-thousand-square-metres',
    'intelligence-layer',
    'intelligence-body',
    'rent-floor',
    'revenue-engines',
    'tenant-enters',
    'flywheel-compounds',
    'capital-outside',
    'capital-inside',
    'two-way-bridge',
    'university-outside',
    'university-inside',
    'university-shifts',
    'founder-first-system',
    'amsterdam-prototype',
    'model-travels',
    'vision-convergence',
    'europe-future',
  ]);
  assert.equal(progressForBeat(0), 0);
  assert.equal(progressForBeat(BEATS.length - 1), 1);

  for (let index = 1; index < BEATS.length; index += 1) {
    assert.ok(progressForBeat(index) > progressForBeat(index - 1));
  }
});

test('nearestBeat selects the closest settled beat', () => {
  const midpoint =
    (progressForBeat(2) + progressForBeat(3)) / 2;

  assert.equal(nearestBeat(midpoint - 0.001), 2);
  assert.equal(nearestBeat(midpoint + 0.001), 3);
});

test('the Europe sequence explains the infrastructure gap before introducing PONT', () => {
  assert.equal(BEATS.includes('domains'), false);
  assert.equal(BEATS.includes('stay'), false);
  assert.deepEqual(BEATS.slice(3, 9), [
    'science',
    'companies',
    'infrastructure-gap',
    'pont-comes-in',
    'convergence',
    'future',
  ]);
  assert.equal(BEATS.length, 40);
});

test('the bridge sequence removes the standalone talent-outflow slide', () => {
  assert.equal(BEATS.includes('talent-outflow'), false);
  assert.equal(BEATS[31], 'two-way-bridge');
});
