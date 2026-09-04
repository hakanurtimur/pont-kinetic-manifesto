export const COMPACT_CONTROL_RESERVED_HEIGHT = 64;
export const CONTROL_RAIL_RESERVED_WIDTH = 64;

export function controlLayoutForViewport(width, height) {
  const portrait = height > width;
  const tabletPortrait = portrait && width >= 600 && width <= 1100;
  const constrainedLandscape = !portrait && width <= 1100;

  return tabletPortrait || constrainedLandscape ? 'rail' : 'dock';
}

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
  const controlsLayout = controlLayoutForViewport(width, height);
  const base = mode === 'portrait'
    ? { width: 744, height: 1133 }
    : { width: 1133, height: 744 };
  const availableWidth = Math.max(
    1,
    width - (controlsLayout === 'rail' ? CONTROL_RAIL_RESERVED_WIDTH : 0),
  );
  const reservesBottomDock = profile === 'compact-landscape' && controlsLayout === 'dock';
  const availableHeight = Math.max(
    1,
    height - (reservesBottomDock ? COMPACT_CONTROL_RESERVED_HEIGHT : 0),
  );

  if (profile !== 'compact-landscape') {
    return {
      ...base,
      scale: Math.min(availableWidth / base.width, availableHeight / base.height),
      sceneOffsetX: 0,
      centerX: availableWidth / 2,
      centerY: availableHeight / 2,
      controlsLayout,
      mode,
      profile,
    };
  }

  const stageHeight = base.height;
  const scale = availableHeight / stageHeight;
  const stageWidth = availableWidth / scale;

  return {
    width: stageWidth,
    height: stageHeight,
    scale,
    sceneOffsetX: (stageWidth - base.width) / 2,
    centerX: availableWidth / 2,
    centerY: availableHeight / 2,
    controlsLayout,
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

export function worldsConvergenceExitMotion(mode) {
  return {
    scale: mode === 'portrait' ? 7.8 : 6.4,
    autoAlpha: 0,
  };
}

export function worldsDomainConvergenceMotion(mode) {
  if (mode === 'portrait') {
    return {
      left: { x: 0, y: 185 },
      right: { x: 0, y: -185 },
      titles: { scale: 0.84 },
      axis: { y: 55 },
      orb: { y: 55 },
    };
  }

  return {
    left: { x: 140, y: 0 },
    right: { x: -140, y: 0 },
    titles: { scale: 1 },
    axis: { y: 55 },
    orb: { y: 55 },
  };
}

export function spaceCardExitMotion(mode) {
  return {
    scale: mode === 'portrait' ? 0.7 : 0.64,
    x: mode === 'portrait' ? -150 : -80,
    y: mode === 'portrait' ? 60 : 32,
    autoAlpha: 0,
  };
}

export function founderRoofVisibility(visible) {
  return { autoAlpha: visible ? 1 : 0 };
}

export function communityPremiseExitMotion(mode) {
  return {
    y: mode === 'portrait' ? -8 : -12,
    autoAlpha: 0,
  };
}

export function communityHomeFrameGeometry() {
  const width = 480;
  const height = 430;
  const inset = 34;
  const apex = { x: width / 2, y: 64 };
  const leftEave = { x: inset, y: 128 };
  const rightEave = { x: width - inset, y: 128 };
  const leftFloor = { x: inset, y: 423 };
  const rightFloor = { x: width - inset, y: 423 };
  const roofRun = apex.x - leftEave.x;
  const roofRise = leftEave.y - apex.y;
  const roofWidth = Math.hypot(roofRun, roofRise);
  const roofAngle = Math.atan2(roofRise, roofRun) * (180 / Math.PI);
  const wallWidth = leftFloor.y - leftEave.y;
  const wallTop = ((leftEave.y + leftFloor.y) / 2) - 1;

  return {
    anchors: { apex, leftEave, rightEave, leftFloor, rightFloor },
    roofLeft: {
      top: apex.y - 1,
      left: apex.x - roofWidth,
      width: roofWidth,
      rotate: `${-roofAngle}deg`,
    },
    roofRight: {
      top: apex.y - 1,
      left: apex.x,
      width: roofWidth,
      rotate: `${roofAngle}deg`,
    },
    wallLeft: {
      top: wallTop,
      left: leftEave.x - (wallWidth / 2),
      width: wallWidth,
      rotate: '90deg',
    },
    wallRight: {
      top: wallTop,
      right: (width - rightEave.x) - (wallWidth / 2),
      width: wallWidth,
      rotate: '90deg',
    },
    floor: {
      bottom: height - leftFloor.y,
      left: leftFloor.x,
      width: rightFloor.x - leftFloor.x,
    },
    label: { right: inset, bottom: -18 },
  };
}

export function businessRailMotion(profile) {
  const portrait = profile === 'portrait' || profile === 'compact-portrait';

  return {
    deskY: portrait ? 260 : profile === 'compact-landscape' ? 158 : 182,
    valueBottom: -13,
  };
}

export function homeBlueprintGeometry(mode) {
  if (mode === 'portrait') {
    return {
      viewBox: '0 0 650 430',
      route: 'M88 343 V253 M214 253 V101 H274 V191 H382 V61 H570 V301 H325 V430',
    };
  }

  return {
    viewBox: '0 0 980 300',
    route: 'M108 242 V190 M265 190 V78 H492 V142 H646 V54 H806 V243 H960',
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
