import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';

async function loadThemes() {
  return import('../src/lib/theme.mjs').catch(() => ({}));
}

function relativeLuminance(hex) {
  const channels = hex
    .replace('#', '')
    .match(/.{2}/g)
    .map((channel) => Number.parseInt(channel, 16) / 255)
    .map((channel) => (
      channel <= 0.04045
        ? channel / 12.92
        : ((channel + 0.055) / 1.055) ** 2.4
    ));

  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

function contrastRatio(first, second) {
  const firstLuminance = relativeLuminance(first);
  const secondLuminance = relativeLuminance(second);
  return (
    (Math.max(firstLuminance, secondLuminance) + 0.05)
    / (Math.min(firstLuminance, secondLuminance) + 0.05)
  );
}

test('the original PONT light and dark neutrals are preserved', async () => {
  const { THEME_TOKENS } = await loadThemes();

  assert.equal(THEME_TOKENS.dark['--bg'], '#101629');
  assert.equal(THEME_TOKENS.dark['--fg'], '#F4F4EF');
  assert.equal(THEME_TOKENS.dark['--logo-contrast'], '#F4F4EF');
  assert.equal(THEME_TOKENS.light['--bg'], '#EFEEE7');
  assert.equal(THEME_TOKENS.light['--fg'], '#101629');
  assert.equal(THEME_TOKENS.light['--logo-contrast'], '#000C5C');
});

test('four project palettes expose the same semantic accent roles', async () => {
  const { PALETTE_TOKENS, PALETTES } = await loadThemes();

  assert.equal(PALETTES.length, 4);
  assert.deepEqual(PALETTES.map(({ id }) => id), ['pont', 'green', 'cobalt', 'violet']);
  for (const palette of Object.values(PALETTE_TOKENS)) {
    assert.deepEqual(Object.keys(palette.light), Object.keys(palette.dark));
  }
});

test('changing palette never changes theme neutrals', async () => {
  const { appearanceTokensFor, PALETTES, THEME_TOKENS } = await loadThemes();

  for (const theme of ['dark', 'light']) {
    for (const { id } of PALETTES) {
      const tokens = appearanceTokensFor(theme, id);
      for (const role of ['--bg', '--fg', '--muted', '--logo-contrast', '--control-surface', '--control-text']) {
        assert.equal(tokens[role], THEME_TOKENS[theme][role]);
      }
    }
  }
});

test('theme text and navigation controls meet WCAG AA contrast', async () => {
  const { THEME_TOKENS } = await loadThemes();

  for (const tokens of Object.values(THEME_TOKENS)) {
    for (const foreground of ['--fg', '--muted']) {
      assert.ok(contrastRatio(tokens[foreground], tokens['--bg']) >= 4.5);
    }
    assert.ok(contrastRatio(tokens['--control-text'], tokens['--control-surface']) >= 4.5);
    assert.ok(contrastRatio(tokens['--control-border'], tokens['--control-surface']) >= 3);
    assert.ok(contrastRatio(tokens['--progress-track'], tokens['--control-surface']) >= 3);
  }
});

test('every palette keeps graphics, focus, and progress distinguishable', async () => {
  const { appearanceTokensFor, PALETTES } = await loadThemes();

  for (const theme of ['dark', 'light']) {
    for (const { id } of PALETTES) {
      const tokens = appearanceTokensFor(theme, id);
      assert.ok(contrastRatio(tokens['--coral'], tokens['--bg']) >= 3, `${id}/${theme} accent`);
      assert.ok(contrastRatio(tokens['--logo-coral'], tokens['--bg']) >= 3, `${id}/${theme} logo`);
      assert.ok(contrastRatio(tokens['--logo-contrast'], tokens['--bg']) >= 3, `${id}/${theme} logo contrast`);
      assert.ok(contrastRatio(tokens['--focus-ring'], tokens['--control-surface']) >= 3, `${id}/${theme} focus`);
      assert.ok(contrastRatio(tokens['--progress-fill'], tokens['--control-surface']) >= 3, `${id}/${theme} progress`);
    }
  }
});

test('unknown saved palettes fall back to original PONT', async () => {
  const { resolvePalette } = await loadThemes();

  assert.equal(resolvePalette('green'), 'green');
  assert.equal(resolvePalette('unknown'), 'pont');
  assert.equal(resolvePalette(null), 'pont');
});

test('appearance bootstrap applies saved colors and fitted stage scale before hydration', async () => {
  const { APPEARANCE_BOOTSTRAP_SCRIPT } = await loadThemes();
  const properties = new Map();
  const root = {
    dataset: {},
    style: {
      setProperty(name, value) {
        properties.set(name, value);
      },
    },
  };

  vm.runInNewContext(APPEARANCE_BOOTSTRAP_SCRIPT, {
    document: { documentElement: root },
    innerWidth: 1024,
    innerHeight: 768,
    localStorage: {
      getItem(name) {
        return name === 'pont-theme' ? 'light' : 'violet';
      },
    },
    matchMedia: () => ({ matches: false }),
  });

  assert.equal(root.dataset.theme, 'light');
  assert.equal(root.dataset.palette, 'violet');
  assert.equal(properties.get('--bg'), '#EFEEE7');
  assert.equal(properties.get('--coral'), '#6D3AB2');
  assert.equal(Number(properties.get('--stage-scale')).toFixed(6), '0.903795');
});

test('appearance bootstrap makes compact landscape stages edge-to-edge before hydration', async () => {
  const { APPEARANCE_BOOTSTRAP_SCRIPT } = await loadThemes();
  const properties = new Map();
  const root = {
    dataset: {},
    style: {
      setProperty(name, value) {
        properties.set(name, value);
      },
    },
  };

  vm.runInNewContext(APPEARANCE_BOOTSTRAP_SCRIPT, {
    document: { documentElement: root },
    innerWidth: 844,
    innerHeight: 390,
    localStorage: { getItem: () => null },
    matchMedia: () => ({ matches: false }),
  });

  assert.equal(Number(properties.get('--stage-scale')).toFixed(6), '0.438172');
  assert.equal(Number.parseFloat(properties.get('--compact-stage-width')).toFixed(3), '1926.184');
  assert.equal(Number.parseFloat(properties.get('--compact-stage-margin-left')).toFixed(3), '-963.092');
  assert.equal(Number.parseFloat(properties.get('--compact-scene-offset-x')).toFixed(3), '396.592');
  assert.equal(Number.parseFloat(properties.get('--stage-center-y')).toFixed(3), '163.000');
});
