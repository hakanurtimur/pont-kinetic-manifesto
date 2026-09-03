# PONT Kinetic Manifesto Prototype Design

## Goal

Build a browser-based prototype of the first three PONT manifesto scenes. The primary presentation device is an iPad mini 6 held in landscape. The presenter scrolls vertically while one viewport-sized stage remains visually fixed and transitions between beats.

## Primary device and interaction

- Primary display: iPad mini 6 landscape, designed on a 1133 x 744 logical canvas.
- Input: native vertical touch scrolling; mouse wheel and keyboard arrows are secondary controls.
- Rendering: a fixed stage driven by a separate vertical scroll rail. The experience is not a horizontal carousel.
- Viewport: stable small-viewport height prevents Safari toolbar changes from resizing the composition during a scroll gesture.
- Orientation: portrait shows a minimal rotate-device message rather than a broken layout.
- Accessibility: reduced-motion mode uses immediate crossfades and preserves every statement in reading order.

## Narrative scope

### Scene 1 — Cover to Physical Era

1. PONT appears as the only object on a navy field.
2. The logo expands and resolves into the statement “AI LEARNED TO THINK.”
3. THINK compresses and becomes ACT.
4. Supporting line appears: “THE NEXT ERA IS PHYSICAL.”

### Scene 2 — The European Paradox

1. “EUROPE MAKES THE SCIENCE.” arrives and locks to the stage.
2. “IT KEEPS LOSING THE COMPANIES.” is pulled out of frame.
3. A coral trajectory reverses the movement.
4. “BUILD SOMETHING WORTH STAYING FOR.” locks into the frame.

### Scene 3 — Two Worlds, One Physical Future

1. PHYSICAL AI and LIFE SCIENCES occupy opposite sides.
2. Their capability words move toward a central circular PONT connector.
3. Shared concepts align through the connector.
4. The final statement reads “TWO WORLDS. ONE PHYSICAL FUTURE.”

## Visual system

- Background: `#101629`
- PONT coral: `#ff5a42`
- Primary text: `#f4f4ef`
- Secondary text: `#8992a7`
- Line/grid: `rgba(244, 244, 239, 0.14)`
- Typography: one high-impact grotesk stack with tabular numerals; no editorial serif and no decorative monospace.
- Composition: one dominant statement per beat, hard edges, minimal chrome, large negative space.
- Brand motif: the circular O acts as aperture, lock, and connector.

## Motion system

- One GSAP master timeline with named labels for all beats.
- ScrollTrigger attaches only to the master timeline.
- Native vertical scroll maps deterministically to timeline progress.
- Motion uses `x`, `y`, `scale`, `rotation`, and opacity; no animated layout properties.
- The stage itself is not pinned by ScrollTrigger. It remains fixed independently to avoid iOS pin jitter.
- Scrub lag is subtle enough to feel weighted without disconnecting touch from motion.
- Snap points align with the seven readable beats across the three scenes.
- Decorative particles are capped and use transforms only.

## Performance budget

- No WebGL, shaders, full-screen video, backdrop blur, or continuous filters.
- No runtime image dependency in the first-three-scene prototype.
- Only active elements receive `will-change`, and it is removed outside the active scene.
- No layout reads during scroll.
- Visual validation is performed at the iPad mini 6 landscape aspect ratio and at desktop fallback sizes.

## Prototype acceptance criteria

- A vertical swipe advances the fixed stage through all three scenes.
- Reverse scrolling reconstructs the previous state without flashes or stale elements.
- Every major beat settles into a readable composition.
- Text remains inside the safe area at the primary device ratio.
- Portrait orientation displays a rotate prompt.
- Reduced-motion mode exposes the same narrative without scrub-dependent effects.
- Automated tests validate content, progress segmentation, and beat selection.
- The production build completes without errors.
