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

export function viewportProfile(width, height) {
  if (height > width) {
    return height <= 700 && width <= 430 ? 'compact-portrait' : 'portrait';
  }
  if (height <= 560) return 'compact-landscape';
  return 'landscape';
}

export function stageGeometryForViewport(width, height) {
  const mode = viewportMode(width, height);
  const profile = viewportProfile(width, height);
  const base = mode === 'portrait'
    ? { width: 744, height: 1133 }
    : { width: 1133, height: 744 };

  if (profile !== 'compact-landscape') {
    return {
      ...base,
      scale: Math.min(width / base.width, height / base.height),
      mode,
      profile,
    };
  }

  const stageHeight = base.height;
  const stageWidth = stageHeight * (width / height);

  return {
    width: stageWidth,
    height: stageHeight,
    scale: height / stageHeight,
    mode,
    profile,
  };
}

export function resolveTheme(savedTheme, prefersDark) {
  if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
  return prefersDark ? 'dark' : 'light';
}
