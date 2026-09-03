const WHEEL_NOISE_THRESHOLD = 2;
const SWIPE_COMMIT_DISTANCE = 18;
const MAX_DRAG_PREVIEW = 0.32;

function clampStep(index, stepCount) {
  const lastStep = Math.max(0, Math.floor(stepCount) - 1);
  const safeIndex = Number.isFinite(index) ? Math.round(index) : 0;
  return Math.min(lastStep, Math.max(0, safeIndex));
}

function adjacentStep(currentStep, direction, stepCount) {
  const current = clampStep(currentStep, stepCount);
  const offset = direction === 0 ? 0 : direction > 0 ? 1 : -1;
  return clampStep(current + offset, stepCount);
}

export function wheelStepTarget(currentStep, deltaY, deltaX, stepCount) {
  const vertical = Number.isFinite(deltaY) ? deltaY : 0;
  const horizontal = Number.isFinite(deltaX) ? deltaX : 0;

  if (
    Math.abs(vertical) < WHEEL_NOISE_THRESHOLD
    || Math.abs(vertical) < Math.abs(horizontal)
  ) {
    return clampStep(currentStep, stepCount);
  }

  return adjacentStep(currentStep, vertical, stepCount);
}

export function dragPreviewPosition(currentStep, dragDistance, viewportHeight, stepCount) {
  const current = clampStep(currentStep, stepCount);
  const height = Math.max(1, Number.isFinite(viewportHeight) ? viewportHeight : 1);
  const distance = Number.isFinite(dragDistance) ? dragDistance : 0;
  const previewOffset = Math.min(
    MAX_DRAG_PREVIEW,
    Math.max(-MAX_DRAG_PREVIEW, distance / height),
  );

  return Math.min(stepCount - 1, Math.max(0, current + previewOffset));
}

export function swipeStepTarget(currentStep, dragDistance, stepCount) {
  const distance = Number.isFinite(dragDistance) ? dragDistance : 0;
  if (Math.abs(distance) < SWIPE_COMMIT_DISTANCE) {
    return clampStep(currentStep, stepCount);
  }

  return adjacentStep(currentStep, distance, stepCount);
}
