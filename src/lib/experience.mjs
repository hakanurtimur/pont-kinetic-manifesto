export function pageIndexForProgress(progress, pageCount) {
  const count = Math.max(1, Math.floor(pageCount));
  const normalized = Number.isFinite(progress)
    ? Math.min(1, Math.max(0, progress))
    : 0;
  return Math.round(normalized * (count - 1));
}

export function timelineValueForProgress(progress, labelValues) {
  if (!Array.isArray(labelValues) || labelValues.length === 0) return 0;
  if (labelValues.length === 1) return labelValues[0];

  const normalized = Number.isFinite(progress)
    ? Math.min(1, Math.max(0, progress))
    : 0;
  const segmentPosition = normalized * (labelValues.length - 1);
  const segmentIndex = Math.min(labelValues.length - 2, Math.floor(segmentPosition));
  const segmentProgress = segmentPosition - segmentIndex;
  const start = labelValues[segmentIndex];
  const end = labelValues[segmentIndex + 1];

  return start + (end - start) * segmentProgress;
}

export function viewportMode(width, height) {
  return height > width ? 'portrait' : 'landscape';
}

export function resolveTheme(savedTheme, prefersDark) {
  if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
  return prefersDark ? 'dark' : 'light';
}
