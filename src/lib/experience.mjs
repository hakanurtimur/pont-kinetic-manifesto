export function pageIndexForProgress(progress, pageCount) {
  const count = Math.max(1, Math.floor(pageCount));
  const normalized = Number.isFinite(progress)
    ? Math.min(1, Math.max(0, progress))
    : 0;
  return Math.round(normalized * (count - 1));
}

export function viewportMode(width, height) {
  return height > width ? 'portrait' : 'landscape';
}

export function resolveTheme(savedTheme, prefersDark) {
  if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
  return prefersDark ? 'dark' : 'light';
}
