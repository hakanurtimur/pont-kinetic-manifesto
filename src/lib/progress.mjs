export const BEATS = Object.freeze([
  'cover',
  'think',
  'act',
  'science',
  'companies',
  'infrastructure-gap',
  'pont-comes-in',
  'convergence',
  'future',
  'robot-core',
  'robot-ecosystem',
  'therapy-core',
  'therapy-ecosystem',
  'hard-tech-premise',
  'hard-tech-infrastructure',
  'space-shell',
  'ecosystem-product',
  'founder-streams',
  'one-roof',
  'empty-building',
  'community-first',
  'one-square-metre',
  'ten-thousand-square-metres',
  'intelligence-layer',
  'intelligence-body',
  'rent-floor',
  'revenue-engines',
  'tenant-enters',
  'flywheel-compounds',
  'capital-outside',
  'capital-inside',
  'two-way-bridge',
  'university-outside',
  'university-inside',
  'university-shifts',
  'founder-first-system',
  'amsterdam-prototype',
  'model-travels',
  'vision-convergence',
  'europe-future',
]);

export function clampProgress(value) {
  return Math.min(1, Math.max(0, value));
}

export function progressForBeat(index) {
  const safeIndex = Math.min(BEATS.length - 1, Math.max(0, index));
  return safeIndex / (BEATS.length - 1);
}

export function nearestBeat(progress) {
  return Math.round(clampProgress(progress) * (BEATS.length - 1));
}
