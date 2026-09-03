export const BEATS = Object.freeze([
  'cover',
  'think',
  'act',
  'science',
  'companies',
  'stay',
  'domains',
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
