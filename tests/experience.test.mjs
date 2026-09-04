import test from 'node:test';
import assert from 'node:assert/strict';

import {
  CONTROL_RAIL_RESERVED_WIDTH,
  controlLayoutForViewport,
  pageIndexForProgress,
  resolveTheme,
  scienceLockupRecedeMotion,
  stageGeometryForViewport,
  timelineValueForProgress,
  capitalInsideMotion,
  universityNetworkGeometry,
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

test('constrained tablets and landscape phones use a side control rail', () => {
  assert.equal(controlLayoutForViewport(768, 1024), 'rail');
  assert.equal(controlLayoutForViewport(1024, 768), 'rail');
  assert.equal(controlLayoutForViewport(844, 390), 'rail');
  assert.equal(controlLayoutForViewport(390, 844), 'dock');
  assert.equal(controlLayoutForViewport(1440, 900), 'dock');
});

test('iPad Mini portrait reserves the rail without shrinking the stage height', () => {
  const geometry = stageGeometryForViewport(768, 1024);

  assert.equal(geometry.controlsLayout, 'rail');
  assert.equal(geometry.centerX, (768 - CONTROL_RAIL_RESERVED_WIDTH) / 2);
  assert.equal(geometry.centerY, 512);
  assert.ok(Math.abs(geometry.scale - (1024 / 1133)) < 0.001);
  assert.ok(
    geometry.centerX + ((geometry.width * geometry.scale) / 2)
      <= 768 - CONTROL_RAIL_RESERVED_WIDTH,
  );
});

test('compact landscape fills the full height beside the side rail', () => {
  const geometry = stageGeometryForViewport(844, 390);

  assert.equal(geometry.profile, 'compact-landscape');
  assert.equal(geometry.controlsLayout, 'rail');
  assert.equal(geometry.height, 744);
  assert.ok(Math.abs(geometry.height * geometry.scale - 390) < 0.001);
  assert.equal(geometry.centerX, (844 - CONTROL_RAIL_RESERVED_WIDTH) / 2);
  assert.equal(geometry.centerY, 195);
});

test('compact landscape centers the fixed scene grid beside the rail', () => {
  for (const [width, height] of [[844, 390], [568, 320]]) {
    const geometry = stageGeometryForViewport(width, height);
    const leftGutter = geometry.sceneOffsetX * geometry.scale;
    const availableWidth = width - CONTROL_RAIL_RESERVED_WIDTH;
    const rightGutter = availableWidth - ((geometry.sceneOffsetX + 1133) * geometry.scale);
    const sceneBottom = geometry.centerY + ((geometry.height * geometry.scale) / 2);

    assert.ok(Math.abs(geometry.sceneOffsetX - ((geometry.width - 1133) / 2)) < 0.001);
    assert.ok(leftGutter >= 0);
    assert.ok(Math.abs(leftGutter - rightGutter) < 0.001);
    assert.ok(Math.abs(sceneBottom - height) < 0.001);
  }
});

test('science statement recedes without crossing the Europe section spine', () => {
  assert.deepEqual(scienceLockupRecedeMotion('portrait'), {
    x: 0,
    y: -34,
    scale: 0.92,
    autoAlpha: 0.28,
  });
  assert.deepEqual(scienceLockupRecedeMotion('landscape'), {
    x: 0,
    y: -26,
    scale: 0.92,
    autoAlpha: 0.28,
  });
});

test('portrait home blueprint route follows the portrait program grid', async () => {
  const experience = await import('../src/lib/experience.mjs');

  assert.deepEqual(experience.homeBlueprintGeometry?.('portrait'), {
    viewBox: '0 0 650 430',
    route: 'M0 343 H88 V253 H214 V101 H274 V191 H382 V61 H570 V301 H325 V430',
  });
});

test('landscape home blueprint route reaches the community node', async () => {
  const experience = await import('../src/lib/experience.mjs');

  assert.deepEqual(experience.homeBlueprintGeometry?.('landscape'), {
    viewBox: '0 0 980 300',
    route: 'M20 242 H170 V190 H328 V78 H492 V142 H646 V54 H806 V243 H960',
  });
});

test('the setup heading clears before the blueprint becomes primary', async () => {
  const experience = await import('../src/lib/experience.mjs');

  assert.deepEqual(experience.homeHeadingBlueprintMotion?.('portrait'), {
    y: -24,
    autoAlpha: 0,
  });
  assert.deepEqual(experience.homeHeadingBlueprintMotion?.('landscape'), {
    y: -16,
    autoAlpha: 0,
  });
});

test('the one-square-metre seed clears before the full blueprint appears', async () => {
  const experience = await import('../src/lib/experience.mjs');

  assert.deepEqual(experience.homeSeedBlueprintMotion?.('portrait'), {
    scale: 0.16,
    x: -270,
    y: -56,
    autoAlpha: 0,
  });
  assert.deepEqual(experience.homeSeedBlueprintMotion?.('landscape'), {
    scale: 0.16,
    x: -430,
    y: 2,
    autoAlpha: 0,
  });
});

test('capital converges on one horizontal axis in both orientations', () => {
  assert.deepEqual(capitalInsideMotion('landscape'), {
    heading: { y: -12, autoAlpha: 0 },
    founder: { x: 130, y: 0 },
    investor: { x: -309, y: 0 },
  });
  assert.deepEqual(capitalInsideMotion('portrait'), {
    heading: { y: -22, autoAlpha: 0 },
    founder: { x: 86, y: 0 },
    investor: { x: -120, y: 0 },
  });
});

test('all six university routes terminate on the central engine', () => {
  assert.deepEqual(universityNetworkGeometry('landscape'), {
    viewBox: '0 0 860 300',
    routes: [
      'M210 25 L350 125',
      'M210 150 H350',
      'M210 275 L350 175',
      'M650 25 L510 125',
      'M650 150 H510',
      'M650 275 L510 175',
    ],
  });
  assert.deepEqual(universityNetworkGeometry('portrait'), {
    viewBox: '0 0 600 520',
    routes: [
      'M192 81 L226 235',
      'M192 260 H226',
      'M192 439 L226 285',
      'M408 81 L374 235',
      'M408 260 H374',
      'M408 439 L374 285',
    ],
  });
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
