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
      sceneOffsetX: 0,
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
    sceneOffsetX: (stageWidth - base.width) / 2,
    mode,
    profile,
  };
}

export function scienceLockupRecedeMotion(mode) {
  return {
    x: 0,
    y: mode === 'portrait' ? -34 : -26,
    scale: 0.92,
    autoAlpha: 0.28,
  };
}

export function homeBlueprintGeometry(mode) {
  if (mode === 'portrait') {
    return {
      viewBox: '0 0 650 430',
      route: 'M0 343 H88 V253 H214 V101 H274 V191 H382 V61 H570 V301 H325 V430',
    };
  }

  return {
    viewBox: '0 0 980 300',
    route: 'M20 242 H170 V190 H328 V78 H492 V142 H646 V54 H806 V243 H960',
  };
}

export function homeHeadingBlueprintMotion(mode) {
  return {
    y: mode === 'portrait' ? -24 : -16,
    autoAlpha: 0,
  };
}

export function homeSeedBlueprintMotion(mode) {
  return {
    scale: 0.16,
    x: mode === 'portrait' ? -270 : -430,
    y: mode === 'portrait' ? -56 : 2,
    autoAlpha: 0,
  };
}

export function capitalInsideMotion(mode) {
  return {
    heading: {
      y: mode === 'portrait' ? -22 : -12,
      autoAlpha: 0,
    },
    founder: {
      x: mode === 'portrait' ? 86 : 130,
      y: 0,
    },
    investor: {
      x: mode === 'portrait' ? -120 : -309,
      y: 0,
    },
  };
}

export function universityNetworkGeometry(mode) {
  if (mode === 'portrait') {
    return {
      viewBox: '0 0 600 520',
      routes: [
        'M192 81 L226 235',
        'M192 260 H226',
        'M192 439 L226 285',
        'M408 81 L374 235',
        'M408 260 H374',
        'M408 439 L374 285',
      ],
    };
  }

  return {
    viewBox: '0 0 860 300',
    routes: [
      'M210 25 L350 125',
      'M210 150 H350',
      'M210 275 L350 175',
      'M650 25 L510 125',
      'M650 150 H510',
      'M650 275 L510 175',
    ],
  };
}

export function resolveTheme(savedTheme, prefersDark) {
  if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
  return prefersDark ? 'dark' : 'light';
}
