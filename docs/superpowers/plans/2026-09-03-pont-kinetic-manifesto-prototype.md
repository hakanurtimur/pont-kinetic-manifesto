# PONT Kinetic Manifesto Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first three Kinetic Manifesto scenes as a vertically scrolled, fixed-viewport web presentation optimized for iPad mini 6 landscape.

**Architecture:** A single React page owns a fixed 1133 x 744 presentation stage and a separate scroll rail. A pure scene-progress module maps normalized progress to narrative beats; GSAP ScrollTrigger drives one master timeline while presentation controls seek to the same beat positions.

**Tech Stack:** React, TypeScript, Vite/Sites scaffold, GSAP ScrollTrigger, Vitest, CSS transforms.

**Spec:** `docs/superpowers/specs/2026-09-03-pont-kinetic-manifesto-prototype-design.md`

## Global Constraints

- Primary target is iPad mini 6 in landscape on a 1133 x 744 logical canvas.
- Physical input is native vertical scrolling; the visual stage stays fixed.
- Animate transform and opacity only during scroll.
- Do not add WebGL, video, backdrop blur, or layout animation.
- Preserve the exact manifesto statements defined in the spec.
- Support portrait orientation and `prefers-reduced-motion`.

---

### Task 1: Scaffold and scene-progress contract

**Files:**
- Create: `package.json` and generated Vite/Sites support files
- Create: `src/lib/progress.ts`
- Test: `src/lib/progress.test.ts`

**Interfaces:**
- Produces: `BEATS`, `clampProgress(value)`, `nearestBeat(progress)`, and `progressForBeat(index)`.

- [ ] Write tests that assert progress clamps to 0–1, every beat has an increasing normalized position, and nearest-beat selection is stable at segment boundaries.
- [ ] Run the progress tests and verify they fail because the module is missing.
- [ ] Implement the smallest pure progress module that passes the tests.
- [ ] Run the progress tests and verify they pass.

### Task 2: Fixed-stage semantic structure

**Files:**
- Create: `src/content/pitch.ts`
- Create: `src/components/PitchStage.tsx`
- Create: `src/components/ProgressRail.tsx`
- Modify: `src/App.tsx`
- Test: `src/content/pitch.test.ts`

**Interfaces:**
- Consumes: `BEATS` and `progressForBeat(index)` from `src/lib/progress.ts`.
- Produces: three scene groups with stable `data-scene` and `data-beat` identifiers.

- [ ] Write tests that assert the three required scenes, exact statements, and beat labels exist in order.
- [ ] Run the content tests and verify they fail because pitch content is missing.
- [ ] Add the exact content model and semantic stage structure.
- [ ] Run the content and progress tests and verify they pass.

### Task 3: Kinetic master timeline

**Files:**
- Create: `src/animation/createPitchTimeline.ts`
- Create: `src/hooks/usePitchTimeline.ts`
- Modify: `src/components/PitchStage.tsx`
- Test: `src/animation/createPitchTimeline.test.ts`

**Interfaces:**
- Consumes: the stage root element and ordered beat positions.
- Produces: `createPitchTimeline(root): gsap.core.Timeline` with labels matching every beat ID.

- [ ] Write a test that verifies the exported timeline factory is defined and its label manifest matches the content beat IDs.
- [ ] Run the animation test and verify it fails because the factory is missing.
- [ ] Build one GSAP timeline, attach one ScrollTrigger, and sequence transforms with labels rather than per-element delays.
- [ ] Run all unit tests and verify they pass.

### Task 4: iPad mini 6 presentation styling and controls

**Files:**
- Modify: `src/index.css`
- Modify: `src/components/PitchStage.tsx`
- Modify: `src/components/ProgressRail.tsx`

**Interfaces:**
- Consumes: scene/beat attributes and normalized beat positions.
- Produces: a stable landscape composition, portrait prompt, touch-safe controls, and reduced-motion fallback.

- [ ] Implement the 1133 x 744 logical stage scaled with a single transform to fit the stable viewport.
- [ ] Apply the PONT palette, typography hierarchy, safe-area spacing, and scene-specific layouts.
- [ ] Add tap/keyboard navigation that seeks the same scroll positions as native scrolling.
- [ ] Add portrait and reduced-motion media-query behavior.
- [ ] Run unit tests and production build.

### Task 5: Device-ratio verification

**Files:**
- Modify only files required by verified defects.

**Interfaces:**
- Consumes: the running production-equivalent preview.
- Produces: a visually verified first-three-scene prototype.

- [ ] Open the built page at an iPad mini 6 landscape-sized viewport.
- [ ] Verify the cover, paradox, and convergence compositions at their settled beat positions.
- [ ] Verify vertical scrolling, reverse scrolling, navigation controls, portrait prompt, and reduced-motion behavior.
- [ ] Run the full test suite and production build again after any fix.
