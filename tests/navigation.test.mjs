import test from 'node:test';
import assert from 'node:assert/strict';

async function loadNavigation() {
  return import('../src/lib/navigation.mjs').catch(() => ({}));
}

test('wheel movement advances exactly one step regardless of delta strength', async () => {
  const { wheelStepTarget } = await loadNavigation();

  assert.equal(typeof wheelStepTarget, 'function');
  assert.equal(wheelStepTarget(4, 12, 0, 10), 5);
  assert.equal(wheelStepTarget(4, 1200, 0, 10), 5);
  assert.equal(wheelStepTarget(4, -12, 0, 10), 3);
  assert.equal(wheelStepTarget(4, -1200, 0, 10), 3);
});

test('wheel movement ignores noise and horizontal trackpad gestures', async () => {
  const { wheelStepTarget } = await loadNavigation();

  assert.equal(typeof wheelStepTarget, 'function');
  assert.equal(wheelStepTarget(4, 1, 0, 10), 4);
  assert.equal(wheelStepTarget(4, 20, 60, 10), 4);
});

test('wheel movement cannot pass the first or last step', async () => {
  const { wheelStepTarget } = await loadNavigation();

  assert.equal(typeof wheelStepTarget, 'function');
  assert.equal(wheelStepTarget(0, -60, 0, 10), 0);
  assert.equal(wheelStepTarget(9, 60, 0, 10), 9);
});

test('touch preview follows the finger but remains inside the adjacent step', async () => {
  const { dragPreviewPosition } = await loadNavigation();

  assert.equal(typeof dragPreviewPosition, 'function');
  assert.equal(dragPreviewPosition(4, 0, 800, 10), 4);
  assert.equal(dragPreviewPosition(4, 400, 800, 10), 4.32);
  assert.equal(dragPreviewPosition(4, -400, 800, 10), 3.68);
});

test('touch release commits one directional step after an intentional drag', async () => {
  const { swipeStepTarget } = await loadNavigation();

  assert.equal(typeof swipeStepTarget, 'function');
  assert.equal(swipeStepTarget(4, 17, 10), 4);
  assert.equal(swipeStepTarget(4, 18, 10), 5);
  assert.equal(swipeStepTarget(4, 600, 10), 5);
  assert.equal(swipeStepTarget(4, -18, 10), 3);
  assert.equal(swipeStepTarget(4, -600, 10), 3);
});
