import test from 'node:test';
import assert from 'node:assert/strict';

import { THERAPY_NODE_LAYOUT } from '../src/content/therapy-layout.mjs';

const VIEWPORTS = Object.freeze({
  landscape: { width: 650, height: 580 },
  portrait: { width: 700, height: 610 },
});

function boxesFor(mode) {
  const viewport = VIEWPORTS[mode];

  return THERAPY_NODE_LAYOUT.map(({ label, width, [mode]: point }) => ({
    label,
    left: (point.x / 100) * viewport.width,
    top: (point.y / 100) * viewport.height,
    right: (point.x / 100) * viewport.width + width,
    bottom: (point.y / 100) * viewport.height + 42,
  }));
}

function overlaps(a, b) {
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}

test('therapy badges form a varied orbit instead of rigid columns', () => {
  assert.equal(THERAPY_NODE_LAYOUT.length, 11);
  assert.ok(new Set(THERAPY_NODE_LAYOUT.map(({ width }) => width)).size >= 5);
  assert.ok(THERAPY_NODE_LAYOUT.some(({ rotation }) => rotation < 0));
  assert.ok(THERAPY_NODE_LAYOUT.some(({ rotation }) => rotation > 0));

  for (const mode of Object.keys(VIEWPORTS)) {
    const xs = THERAPY_NODE_LAYOUT.map(({ [mode]: point }) => point.x);
    const ys = THERAPY_NODE_LAYOUT.map(({ [mode]: point }) => point.y);
    assert.ok(new Set(xs).size >= 9, `${mode} should not collapse into vertical columns`);
    assert.ok(new Set(ys).size >= 9, `${mode} should not collapse into horizontal rows`);
  }
});

test('therapy badges stay inside the network and do not overlap', () => {
  for (const [mode, viewport] of Object.entries(VIEWPORTS)) {
    const boxes = boxesFor(mode);

    for (const box of boxes) {
      assert.ok(box.left >= 0 && box.top >= 0, `${mode}: ${box.label} starts outside`);
      assert.ok(box.right <= viewport.width, `${mode}: ${box.label} ends outside`);
      assert.ok(box.bottom <= viewport.height, `${mode}: ${box.label} ends outside`);
      assert.ok(box.right <= viewport.width - 100, `${mode}: ${box.label} enters the pagination lane`);
    }

    for (let index = 0; index < boxes.length; index += 1) {
      for (let other = index + 1; other < boxes.length; other += 1) {
        assert.equal(
          overlaps(boxes[index], boxes[other]),
          false,
          `${mode}: ${boxes[index].label} overlaps ${boxes[other].label}`,
        );
      }
    }
  }
});
