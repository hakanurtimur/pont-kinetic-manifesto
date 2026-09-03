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
  assert.ok(BEATS.length >= 7);
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
