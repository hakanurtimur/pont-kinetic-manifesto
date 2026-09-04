import test from 'node:test';
import assert from 'node:assert/strict';

import {
  pageIndexForProgress,
  resolveTheme,
  stageGeometryForViewport,
  timelineValueForProgress,
  viewportMode,
  viewportProfile,
} from '../src/lib/experience.mjs';

test('pageIndexForProgress resolves only whole-page states', () => {
  assert.equal(pageIndexForProgress(0, 9), 0);
  assert.equal(pageIndexForProgress(0.07, 9), 1);
  assert.equal(pageIndexForProgress(0.51, 9), 4);
  assert.equal(pageIndexForProgress(1, 9), 8);
});

test('viewportMode treats portrait as a first-class layout', () => {
  assert.equal(viewportMode(1133, 744), 'landscape');
  assert.equal(viewportMode(744, 1133), 'portrait');
  assert.equal(viewportMode(800, 800), 'landscape');
});

test('viewportProfile reserves a compact layout for short landscape screens', () => {
  assert.equal(viewportProfile(568, 320), 'compact-landscape');
  assert.equal(viewportProfile(844, 390), 'compact-landscape');
  assert.equal(viewportProfile(1440, 560), 'compact-landscape');
  assert.equal(viewportProfile(320, 568), 'compact-portrait');
  assert.equal(viewportProfile(1024, 768), 'landscape');
  assert.equal(viewportProfile(390, 844), 'portrait');
});

test('compact landscape stage fills wide phones without side letterboxing', () => {
  const geometry = stageGeometryForViewport(844, 390);

  assert.equal(geometry.profile, 'compact-landscape');
  assert.equal(geometry.height, 744);
  assert.ok(Math.abs(geometry.width * geometry.scale - 844) < 0.001);
  assert.ok(Math.abs(geometry.height * geometry.scale - 390) < 0.001);
});

test('resolveTheme honors a valid saved theme and otherwise follows the system', () => {
  assert.equal(resolveTheme('light', true), 'light');
  assert.equal(resolveTheme('dark', false), 'dark');
  assert.equal(resolveTheme(null, true), 'dark');
  assert.equal(resolveTheme('invalid', false), 'light');
});

test('timelineValueForProgress scrubs continuously and lands exactly on scene labels', () => {
  const labels = [0, 2, 5];
  assert.equal(timelineValueForProgress(0, labels), 0);
  assert.equal(timelineValueForProgress(0.25, labels), 1);
  assert.equal(timelineValueForProgress(0.5, labels), 2);
  assert.equal(timelineValueForProgress(0.75, labels), 3.5);
  assert.equal(timelineValueForProgress(1, labels), 5);
});
