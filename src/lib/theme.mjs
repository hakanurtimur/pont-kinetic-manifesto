const DARK_TOKENS = Object.freeze({
  '--bg': '#101629',
  '--fg': '#F4F4EF',
  '--muted': '#8992A7',
  '--logo-contrast': '#F4F4EF',
  '--hairline': 'rgba(244, 244, 239, 0.18)',
  '--ghost': 'rgba(244, 244, 239, 0.13)',
  '--control-surface': '#171F34',
  '--control-border': '#737E96',
  '--control-text': '#F4F4EF',
  '--control-muted': '#B6BDCC',
  '--progress-track': '#737E96',
});

const LIGHT_TOKENS = Object.freeze({
  '--bg': '#EFEEE7',
  '--fg': '#101629',
  '--muted': '#646B7D',
  '--logo-contrast': '#000C5C',
  '--hairline': 'rgba(16, 22, 41, 0.20)',
  '--ghost': 'rgba(16, 22, 41, 0.11)',
  '--control-surface': '#FFFFFF',
  '--control-border': '#687187',
  '--control-text': '#101629',
  '--control-muted': '#515B70',
  '--progress-track': '#687187',
});

export const THEME_TOKENS = Object.freeze({
  dark: DARK_TOKENS,
  light: LIGHT_TOKENS,
});

export const PALETTES = Object.freeze([
  Object.freeze({ id: 'pont', label: 'PONT Coral', swatch: '#FF5A42' }),
  Object.freeze({ id: 'green', label: 'Signal Green', swatch: '#2FD477' }),
  Object.freeze({ id: 'cobalt', label: 'Cobalt Blue', swatch: '#3E8BFF' }),
  Object.freeze({ id: 'violet', label: 'Future Violet', swatch: '#A86EF2' }),
]);

export const PALETTE_TOKENS = Object.freeze({
  pont: Object.freeze({
    dark: Object.freeze({
      '--coral': '#FF5A42',
      '--logo-coral': '#FF835F',
      '--glow': 'rgba(255, 90, 66, 0.08)',
      '--focus-ring': '#FF8B73',
      '--progress-fill': '#FF5A42',
    }),
    light: Object.freeze({
      '--coral': '#C43A2B',
      '--logo-coral': '#D94E3D',
      '--glow': 'rgba(196, 58, 43, 0.11)',
      '--focus-ring': '#B92F24',
      '--progress-fill': '#C43A2B',
    }),
  }),
  green: Object.freeze({
    dark: Object.freeze({
      '--coral': '#2FD477',
      '--logo-coral': '#48E78D',
      '--glow': 'rgba(47, 212, 119, 0.10)',
      '--focus-ring': '#65EDA0',
      '--progress-fill': '#2FD477',
    }),
    light: Object.freeze({
      '--coral': '#087D49',
      '--logo-coral': '#087D49',
      '--glow': 'rgba(8, 125, 73, 0.11)',
      '--focus-ring': '#087D49',
      '--progress-fill': '#087D49',
    }),
  }),
  cobalt: Object.freeze({
    dark: Object.freeze({
      '--coral': '#63A7FF',
      '--logo-coral': '#63A7FF',
      '--glow': 'rgba(99, 167, 255, 0.10)',
      '--focus-ring': '#8BBCFF',
      '--progress-fill': '#63A7FF',
    }),
    light: Object.freeze({
      '--coral': '#1765C1',
      '--logo-coral': '#1765C1',
      '--glow': 'rgba(23, 101, 193, 0.11)',
      '--focus-ring': '#1765C1',
      '--progress-fill': '#1765C1',
    }),
  }),
  violet: Object.freeze({
    dark: Object.freeze({
      '--coral': '#C59BFF',
      '--logo-coral': '#C59BFF',
      '--glow': 'rgba(197, 155, 255, 0.10)',
      '--focus-ring': '#D4B5FF',
      '--progress-fill': '#C59BFF',
    }),
    light: Object.freeze({
      '--coral': '#6D3AB2',
      '--logo-coral': '#6D3AB2',
      '--glow': 'rgba(109, 58, 178, 0.11)',
      '--focus-ring': '#6D3AB2',
      '--progress-fill': '#6D3AB2',
    }),
  }),
});

export function resolvePalette(value) {
  return PALETTES.some(({ id }) => id === value) ? value : 'pont';
}

export function appearanceTokensFor(theme, palette) {
  const safeTheme = theme === 'light' ? 'light' : 'dark';
  const safePalette = resolvePalette(palette);
  return {
    ...THEME_TOKENS[safeTheme],
    ...PALETTE_TOKENS[safePalette][safeTheme],
  };
}
