'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { gsap } from 'gsap';

import { BEATS } from '@/src/lib/progress.mjs';
import {
  businessRailMotion,
  capitalInsideMotion,
  communityHomeFrameGeometry,
  communityPremiseExitMotion,
  founderRoofVisibility,
  homeBlueprintGeometry,
  homeHeadingBlueprintMotion,
  homeSeedBlueprintMotion,
  pageIndexForProgress,
  resolveTheme,
  scienceLockupRecedeMotion,
  stageGeometryForViewport,
  spaceCardExitMotion,
  timelineValueForProgress,
  universityNetworkGeometry,
  worldsDomainConvergenceMotion,
  worldsConvergenceExitMotion,
} from '@/src/lib/experience.mjs';
import {
  appearanceTokensFor,
  PALETTES,
  resolvePalette,
} from '@/src/lib/theme.mjs';
import {
  BRIDGE_ROUTES,
  CAPITAL_PARTNERS,
  COMMUNITY_GROUPS,
  COVER,
  ECOSYSTEM_SERVICES,
  FLYWHEEL_LAYERS,
  FLYWHEEL_STEPS,
  FOUNDER_FIRST_FEATURES,
  FOUNDERS,
  HARD_INFRASTRUCTURE,
  HOME_LAYERS,
  MODEL_LAYERS,
  REVENUE_ENGINES,
  ROBOT_TECHNOLOGIES,
  SCENES,
  STACK_TRANSITIONS,
  UNIVERSITY_LAYERS,
  UNIVERSITY_MODES,
  VISION_TRANSFORMATIONS,
} from '@/src/content/pitch.mjs';
import { THERAPY_NODE_LAYOUT } from '@/src/content/therapy-layout.mjs';
import { PontMark } from './PontMark';

const SCROLL_SCRUB_DURATION = 1.1;
const SCROLL_SCRUB_EASE = 'power3.out';

type Theme = 'light' | 'dark';
type Palette = 'pont' | 'green' | 'cobalt' | 'violet';
type Orientation = 'landscape' | 'portrait';
type ViewportProfile = 'landscape' | 'compact-landscape' | 'compact-portrait' | 'portrait';

function applyAppearanceTokens(theme: Theme, palette: Palette) {
  const root = document.documentElement;
  const tokens = appearanceTokensFor(theme, palette) as Record<string, string>;
  root.dataset.theme = theme;
  root.dataset.palette = palette;
  for (const [token, value] of Object.entries(tokens)) {
    root.style.setProperty(token, value);
  }
}

function useStageGeometry() {
  const [geometry, setGeometry] = useState({
    scale: 1,
    mode: 'landscape' as Orientation,
    profile: 'landscape' as ViewportProfile,
  });

  useLayoutEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const visual = window.visualViewport;
        const width = visual?.width ?? window.innerWidth;
        const height = visual?.height ?? window.innerHeight;
        const stage = stageGeometryForViewport(width, height);
        const mode = stage.mode as Orientation;
        const profile = stage.profile as ViewportProfile;
        const scale = stage.scale;
        document.documentElement.dataset.controlsLayout = stage.controlsLayout;
        document.documentElement.style.setProperty('--stage-scale', String(scale));
        document.documentElement.style.setProperty('--stage-center-x', `${stage.centerX}px`);
        document.documentElement.style.setProperty('--stage-center-y', `${stage.centerY}px`);
        document.documentElement.style.setProperty('--compact-stage-width', `${stage.width}px`);
        document.documentElement.style.setProperty('--compact-stage-margin-left', `${stage.width / -2}px`);
        document.documentElement.style.setProperty('--compact-scene-offset-x', `${stage.sceneOffsetX}px`);
        setGeometry({ scale, mode, profile });
      });
    };

    update();
    window.addEventListener('resize', update, { passive: true });
    window.addEventListener('orientationchange', update, { passive: true });
    window.visualViewport?.addEventListener('resize', update, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
      window.visualViewport?.removeEventListener('resize', update);
    };
  }, []);

  return geometry;
}

function useAppearance() {
  const [appearance, setAppearance] = useState<{ theme: Theme; palette: Palette }>({
    theme: 'dark',
    palette: 'pont',
  });

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const saved = window.localStorage.getItem('pont-theme');
    const theme = resolveTheme(saved, prefersDark) as Theme;
    const palette = resolvePalette(window.localStorage.getItem('pont-palette')) as Palette;
    applyAppearanceTokens(theme, palette);
    const frame = requestAnimationFrame(() => setAppearance({ theme, palette }));
    return () => cancelAnimationFrame(frame);
  }, []);

  const toggleTheme = () => {
    setAppearance((current) => {
      const theme = current.theme === 'dark' ? 'light' : 'dark';
      applyAppearanceTokens(theme, current.palette);
      window.localStorage.setItem('pont-theme', theme);
      return { ...current, theme };
    });
  };

  const selectPalette = (palette: Palette) => {
    setAppearance((current) => {
      applyAppearanceTokens(current.theme, palette);
      window.localStorage.setItem('pont-palette', palette);
      return { ...current, palette };
    });
  };

  return { ...appearance, toggleTheme, selectPalette };
}

export function PitchStage() {
  const shellRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const beatRef = useRef(0);
  const navigationRef = useRef<(index: number) => void>(() => undefined);
  const [activeBeat, setActiveBeat] = useState(0);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const geometry = useStageGeometry();
  const businessRail = businessRailMotion(geometry.profile);
  const communityFrame = communityHomeFrameGeometry();
  const homeBlueprint = homeBlueprintGeometry(geometry.mode);
  const universityNetwork = universityNetworkGeometry(geometry.mode);
  const { theme, palette, toggleTheme, selectPalette } = useAppearance();

  const goToBeat = useCallback((index: number) => {
    navigationRef.current(index);
  }, []);

  useEffect(() => {
    if (!paletteOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPaletteOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [paletteOpen]);

  useLayoutEffect(() => {
    const shell = shellRef.current;
    const stage = stageRef.current;
    if (!shell || !stage) return;

    const isPortrait = geometry.mode === 'portrait';
    const worldsConvergence = worldsDomainConvergenceMotion(geometry.mode);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationFrame = 0;
    let initialFrame = 0;
    let timelineInstance: gsap.core.Timeline | null = null;

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' } });
      const $ = gsap.utils.selector(stage);

      gsap.set($('.scene'), { autoAlpha: 0 });
      gsap.set($('.scene-cover'), { autoAlpha: 1 });
      gsap.set($('.cover-mark'), { autoAlpha: 1, scale: 1 });
      gsap.set($('.founder-roof'), founderRoofVisibility(false));

      timelineInstance = timeline;
      timeline.addLabel('cover', 0);
      timeline
        .to($('.cover-mark'), { scale: 1.42, y: -36, autoAlpha: 0, duration: 0.62 }, 0.08)
        .to($('.cover-copy'), { y: -18, autoAlpha: 0, duration: 0.42 }, '<')
        .to($('.cover-rule'), { scaleX: 0, duration: 0.46, transformOrigin: 'right center' }, '<0.04')
        .set($('.scene-era'), { autoAlpha: 1 }, '<0.16')
        .fromTo($('.think-line .line-inner'), { yPercent: 120 }, { yPercent: 0, duration: 0.58, stagger: 0.06, ease: 'power2.out' }, '<0.08')
        .set($('.scene-cover'), { autoAlpha: 0 }, '>')
        .addLabel('think')
        .to($('.think-line--top'), { x: isPortrait ? 0 : -30, color: 'var(--muted)', duration: 0.52 })
        .to($('.think-word'), { yPercent: -120, autoAlpha: 0, duration: 0.46 }, '<0.04')
        .fromTo($('.act-word'), { yPercent: 120, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.52, ease: 'power2.out' }, '<0.08')
        .to($('.era-orbit'), { scale: 1, autoAlpha: 1, rotate: 180, duration: 0.62 }, '<')
        .fromTo($('.physical-statement .line-inner'), { yPercent: 120 }, { yPercent: 0, duration: 0.56, stagger: 0.06, ease: 'power2.out' }, '<0.12')
        .fromTo($('.era-argument'), { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.44 }, '<0.08')
        .addLabel('act')
        .to($('.scene-era'), { xPercent: isPortrait ? 0 : -16, yPercent: isPortrait ? -10 : 0, autoAlpha: 0, duration: 0.58 })
        .set($('.scene-europe'), { autoAlpha: 1 }, '<0.18')
        .fromTo($('.europe-rule'), { scaleY: 0 }, { scaleY: 1, duration: 0.5 }, '<0.02')
        .fromTo($('.science-line .line-inner'), { yPercent: 115 }, { yPercent: 0, duration: 0.56, stagger: 0.05, ease: 'power2.out' }, '<0.08')
        .set($('.scene-era'), { autoAlpha: 0 }, '>')
        .addLabel('science')
        .to($('.science-lockup'), {
          ...scienceLockupRecedeMotion(isPortrait ? 'portrait' : 'landscape'),
          duration: 0.56,
          transformOrigin: 'left top',
        })
        .fromTo($('.escape-line'), { scaleX: 0 }, { scaleX: 1, duration: 0.56 }, '<')
        .fromTo($('.companies-line .line-inner'), { xPercent: 110 }, { xPercent: 0, duration: 0.58, stagger: 0.05, ease: 'power2.out' }, '<0.08')
        .addLabel('companies')
        .to($('.companies-lockup'), { y: isPortrait ? -72 : -96, scale: isPortrait ? 0.82 : 0.74, transformOrigin: 'left top', duration: 0.58 })
        .to($('.escape-line'), { scaleX: 0, autoAlpha: 0, transformOrigin: 'right center', duration: 0.38 }, '<')
        .fromTo($('.stay-line .line-inner'), { yPercent: 120 }, { yPercent: 0, duration: 0.62, stagger: 0.06, ease: 'power2.out' }, '<0.12')
        .fromTo($('.europe-argument'), { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.44 }, '>')
        .addLabel('stay')
        .to($('.scene-europe'), { yPercent: -12, autoAlpha: 0, duration: 0.58 })
        .set($('.scene-worlds'), { autoAlpha: 1 }, '<0.16')
        .fromTo($('.domain--left'), { x: isPortrait ? 0 : -130, y: isPortrait ? -100 : 0, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, duration: 0.58, ease: 'power2.out' }, '<0.08')
        .fromTo($('.domain--right'), { x: isPortrait ? 0 : 130, y: isPortrait ? 100 : 0, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, duration: 0.58, ease: 'power2.out' }, '<')
        .fromTo($('.world-axis'), { scaleX: 0 }, { scaleX: 1, duration: 0.58 }, '<0.04')
        .set($('.scene-europe'), { autoAlpha: 0 }, '>')
        .addLabel('domains')
        .to($('.domain--left'), { ...worldsConvergence.left, duration: 0.64 })
        .to($('.domain--right'), { ...worldsConvergence.right, duration: 0.64 }, '<')
        .to($('.domain-title'), { ...worldsConvergence.titles, duration: 0.64 }, '<')
        .to($('.world-axis'), { ...worldsConvergence.axis, duration: 0.64 }, '<')
        .fromTo($('.convergence-orb'), { scale: 0, y: 0, autoAlpha: 0 }, { scale: 1, ...worldsConvergence.orb, autoAlpha: 1, duration: 0.64, ease: 'power2.out' }, '<0.08')
        .addLabel('convergence')
        .to($('.domain'), { scale: 0.44, autoAlpha: 0, duration: 0.54 })
        .to($('.world-axis'), { scaleX: 0, duration: 0.42 }, '<0.04')
        .to($('.convergence-orb'), { ...worldsConvergenceExitMotion(isPortrait ? 'portrait' : 'landscape'), duration: 0.7 }, '<')
        .fromTo($('.future-line .line-inner'), { yPercent: 120 }, { yPercent: 0, duration: 0.62, stagger: 0.06, ease: 'power2.out' }, '<0.12')
        .fromTo($('.worlds-argument'), { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.44 }, '<0.12')
        .addLabel('future')
        .to($('.scene-worlds'), { scale: 0.92, autoAlpha: 0, duration: 0.58 })
        .set($('.scene-robot'), { autoAlpha: 1 }, '<0.18')
        .fromTo($('.robot-heading .line-inner'), { yPercent: 120 }, { yPercent: 0, duration: 0.58, ease: 'power2.out' }, '<0.08')
        .fromTo($('.robot-core'), { scale: 0.24, rotate: -45, autoAlpha: 0 }, { scale: 1, rotate: 0, autoAlpha: 1, duration: 0.66, ease: 'power3.out' }, '<0.02')
        .fromTo($('.robot-orbit'), { scale: 0.5, rotate: -90, autoAlpha: 0 }, { scale: 1, rotate: 0, autoAlpha: 1, duration: 0.66 }, '<')
        .set($('.scene-worlds'), { autoAlpha: 0 }, '>')
        .addLabel('robot-core')
        .fromTo($('.robot-link'), { scaleX: 0 }, { scaleX: 1, duration: 0.5, stagger: 0.025, ease: 'power2.out' })
        .fromTo($('.robot-node'), { scale: 0.72, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.5, stagger: 0.045, ease: 'back.out(1.35)' }, '<0.08')
        .fromTo($('.robot-result .line-inner'), { yPercent: 120 }, { yPercent: 0, duration: 0.58, stagger: 0.06, ease: 'power2.out' }, '<0.12')
        .fromTo($('.robot-argument'), { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.44 }, '<0.12')
        .fromTo($('.robot-principle'), { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.46 }, '<0.08')
        .addLabel('robot-ecosystem')
        .to($('.scene-robot'), { scale: 0.92, autoAlpha: 0, duration: 0.58 })
        .set($('.scene-therapy'), { autoAlpha: 1 }, '<0.18')
        .fromTo($('.therapy-heading .line-inner'), { yPercent: 120 }, { yPercent: 0, duration: 0.58, ease: 'power2.out' }, '<0.08')
        .fromTo($('.therapy-core'), { scale: 0.16, rotate: -36, autoAlpha: 0 }, { scale: 1, rotate: 0, autoAlpha: 1, duration: 0.7, ease: 'power3.out' }, '<0.02')
        .fromTo($('.therapy-ring'), { scale: 0.35, rotate: -70, autoAlpha: 0 }, { scale: 1, rotate: 0, autoAlpha: 1, duration: 0.7, stagger: 0.06 }, '<')
        .set($('.scene-robot'), { autoAlpha: 0 }, '>')
        .addLabel('therapy-core')
        .fromTo($('.therapy-node'), { scale: 0.7, y: 16, autoAlpha: 0 }, { scale: 1, y: 0, autoAlpha: 1, duration: 0.48, stagger: 0.038, ease: 'back.out(1.3)' })
        .fromTo($('.therapy-result .line-inner'), { yPercent: 120 }, { yPercent: 0, duration: 0.58, stagger: 0.06, ease: 'power2.out' }, '<0.12')
        .fromTo($('.therapy-argument'), { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.44 }, '<0.12')
        .fromTo($('.therapy-principle'), { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.46 }, '<0.08')
        .addLabel('therapy-ecosystem')
        .to($('.scene-therapy'), { scale: 0.92, autoAlpha: 0, duration: 0.58 })
        .set($('.scene-hard'), { autoAlpha: 1 }, '<0.18')
        .fromTo($('.hard-heading .line-inner'), { yPercent: 120 }, { yPercent: 0, duration: 0.58, stagger: 0.05, ease: 'power2.out' }, '<0.08')
        .fromTo($('.hard-start'), { y: 28, scale: 0.88, autoAlpha: 0 }, { y: 0, scale: 1, autoAlpha: 1, duration: 0.62, ease: 'power3.out' }, '<0.02')
        .fromTo($('.hard-anywhere'), { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.44 }, '<0.12')
        .set($('.scene-therapy'), { autoAlpha: 0 }, '>')
        .addLabel('hard-tech-premise')
        .to($('.hard-start'), { x: isPortrait ? -40 : -90, scale: 0.86, autoAlpha: 0.16, duration: 0.56 })
        .to($('.hard-anywhere'), { autoAlpha: 0.28, duration: 0.42 }, '<')
        .fromTo($('.hard-limit'), { scaleX: 0 }, { scaleX: 1, duration: 0.52, transformOrigin: 'left center' }, '<0.02')
        .fromTo($('.hard-module'), { x: isPortrait ? 0 : 56, y: isPortrait ? 28 : 0, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.07, ease: 'power2.out' }, '<0.08')
        .fromTo($('.hard-verdict .line-inner'), { yPercent: 120 }, { yPercent: 0, duration: 0.58, stagger: 0.05, ease: 'power2.out' }, '<0.1')
        .fromTo($('.hard-argument'), { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.44 }, '<0.12')
        .addLabel('hard-tech-infrastructure')
        .to($('.scene-hard'), { xPercent: isPortrait ? 0 : -10, yPercent: isPortrait ? -7 : 0, autoAlpha: 0, duration: 0.58 })
        .set($('.scene-space'), { autoAlpha: 1 }, '<0.18')
        .fromTo($('.space-heading .line-inner'), { yPercent: 120 }, { yPercent: 0, duration: 0.58, stagger: 0.05, ease: 'power2.out' }, '<0.08')
        .fromTo($('.square-metre'), { scale: 0.72, rotate: -5, autoAlpha: 0 }, { scale: 1, rotate: 0, autoAlpha: 1, duration: 0.62, ease: 'power3.out' }, '<0.02')
        .fromTo($('.space-argument'), { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.44 }, '<0.12')
        .set($('.scene-hard'), { autoAlpha: 0 }, '>')
        .addLabel('space-shell')
        .to($('.square-metre'), { ...spaceCardExitMotion(geometry.mode), duration: 0.58 })
        .to($('.space-argument'), { autoAlpha: 0, duration: 0.4 }, '<')
        .fromTo($('.ecosystem-core'), { scale: 0.35, rotate: -28, autoAlpha: 0 }, { scale: 1, rotate: 0, autoAlpha: 1, duration: 0.62, ease: 'power3.out' }, '<0.04')
        .fromTo($('.ecosystem-spoke'), { scaleX: 0 }, { scaleX: 1, duration: 0.48, stagger: 0.025, transformOrigin: 'left center' }, '<0.04')
        .fromTo($('.ecosystem-node'), { scale: 0.72, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.46, stagger: 0.035, ease: 'back.out(1.28)' }, '<0.08')
        .fromTo($('.ecosystem-verdict .line-inner'), { yPercent: 120 }, { yPercent: 0, duration: 0.58, stagger: 0.05, ease: 'power2.out' }, '<0.12')
        .fromTo($('.ecosystem-principle'), { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.44 }, '<0.1')
        .addLabel('ecosystem-product')
        .to($('.scene-space'), { scale: 0.92, autoAlpha: 0, duration: 0.58 })
        .set($('.scene-founders'), { autoAlpha: 1 }, '<0.18')
        .fromTo($('.founders-heading .line-inner'), { yPercent: 120 }, { yPercent: 0, duration: 0.58, stagger: 0.05, ease: 'power2.out' }, '<0.08')
        .fromTo($('.founder-card'), { y: 42, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.54, stagger: 0.09, ease: 'power3.out' }, '<0.04')
        .fromTo($('.founder-origin'), { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.44 }, '<0.1')
        .set($('.scene-space'), { autoAlpha: 0 }, '>')
        .addLabel('founder-streams')
        .to($('.founder-card'), { scale: 0.94, autoAlpha: 0.58, duration: 0.48, stagger: 0.04 })
        .fromTo($('.founder-trace'), { scaleY: 0 }, { scaleY: 1, duration: 0.48, stagger: 0.05, transformOrigin: 'bottom center' }, '<0.04')
        .set($('.founder-roof'), founderRoofVisibility(true), '<')
        .fromTo($('.founder-roof-line'), { scaleX: 0 }, { scaleX: 1, duration: 0.54, stagger: 0.08, ease: 'power2.out' }, '<0.04')
        .fromTo($('.founder-final .line-inner'), { yPercent: 120 }, { yPercent: 0, duration: 0.58, stagger: 0.05, ease: 'power2.out' }, '<0.1')
        .fromTo($('.founder-argument'), { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.44 }, '<0.12')
        .addLabel('one-roof')
        .to($('.scene-founders'), { scale: 0.92, autoAlpha: 0, duration: 0.58 })
        .set($('.scene-community'), { autoAlpha: 1 }, '<0.18')
        .fromTo($('.community-premise .line-inner'), { yPercent: 120 }, { yPercent: 0, duration: 0.58, stagger: 0.05, ease: 'power2.out' }, '<0.08')
        .fromTo($('.community-empty-shell'), { scale: 0.82, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.64, ease: 'power3.out' }, '<0.04')
        .fromTo($('.empty-grid-line'), { scale: 0 }, { scale: 1, duration: 0.42, stagger: 0.035, transformOrigin: 'center center' }, '<0.12')
        .fromTo($('.empty-building-copy'), { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.44 }, '<0.08')
        .set($('.scene-founders'), { autoAlpha: 0 }, '>')
        .addLabel('empty-building')
        .to($('.community-premise'), { ...communityPremiseExitMotion(geometry.mode), duration: 0.52 })
        .to($('.community-empty-shell'), { scale: 0.84, autoAlpha: 0, duration: 0.54 }, '<')
        .fromTo($('.community-link'), { scaleX: 0, autoAlpha: 0 }, { scaleX: 1, autoAlpha: 1, duration: 0.42, stagger: 0.04, transformOrigin: 'left center' }, '<0.08')
        .fromTo($('.community-node'), { scale: 0.62, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.48, stagger: 0.055, ease: 'back.out(1.3)' }, '<0.08')
        .fromTo($('.community-core'), { scale: 0.4, rotate: -22, autoAlpha: 0 }, { scale: 1, rotate: 0, autoAlpha: 1, duration: 0.56, ease: 'power3.out' }, '<0.06')
        .fromTo($('.community-home-line'), { scaleX: 0 }, { scaleX: 1, duration: 0.48, stagger: 0.055, ease: 'power2.out' }, '<0.12')
        .fromTo($('.community-home-label'), { y: 8, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.36 }, '<0.12')
        .fromTo($('.community-final .line-inner'), { yPercent: 120 }, { yPercent: 0, duration: 0.58, stagger: 0.05, ease: 'power2.out' }, '<0.08')
        .fromTo($('.community-principle'), { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.46 }, '<0.1')
        .fromTo($('.community-argument'), { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.44 }, '<0.1')
        .addLabel('community-first')
        .to($('.scene-community'), { scale: 0.92, autoAlpha: 0, duration: 0.58 })
        .set($('.scene-home'), { autoAlpha: 1 }, '<0.18')
        .fromTo($('.home-heading .line-inner'), { yPercent: 120 }, { yPercent: 0, duration: 0.58, ease: 'power2.out' }, '<0.08')
        .fromTo($('.home-crosshair'), { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.54, stagger: 0.05 }, '<0.04')
        .fromTo($('.home-seed'), { scale: 0.12, rotate: -45, autoAlpha: 0 }, { scale: 1, rotate: 0, autoAlpha: 1, duration: 0.7, ease: 'power3.out' }, '<0.02')
        .fromTo($('.home-location'), { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.44 }, '<0.12')
        .set($('.scene-community'), { autoAlpha: 0 }, '>')
        .addLabel('one-square-metre')
        .to($('.home-heading'), { ...homeHeadingBlueprintMotion(isPortrait ? 'portrait' : 'landscape'), duration: 0.5 })
        .to($('.home-seed'), { ...homeSeedBlueprintMotion(isPortrait ? 'portrait' : 'landscape'), duration: 0.58 }, '<')
        .to($('.home-crosshair'), { scale: 1.4, autoAlpha: 0, duration: 0.48 }, '<')
        .to($('.home-location'), { autoAlpha: 0, duration: 0.38 }, '<')
        .fromTo($('.home-blueprint'), { scale: 0.16, transformOrigin: 'left center', autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.72, ease: 'power3.out' }, '<0.04')
        .fromTo($('.home-grid-line'), { scale: 0 }, { scale: 1, duration: 0.44, stagger: 0.018, transformOrigin: 'center center' }, '<0.12')
        .fromTo($('.home-route'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.92, ease: 'power2.inOut' }, '<0.08')
        .fromTo($('.home-program'), { scale: 0.82, y: 16, autoAlpha: 0 }, { scale: 1, y: 0, autoAlpha: 1, duration: 0.46, stagger: 0.055, ease: 'back.out(1.25)' }, '<0.12')
        .fromTo($('.home-number'), { x: isPortrait ? -70 : -120, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.62, ease: 'power3.out' }, '<0.02')
        .fromTo($('.home-final .line-inner'), { yPercent: 120 }, { yPercent: 0, duration: 0.56, stagger: 0.05, ease: 'power2.out' }, '<0.08')
        .fromTo($('.home-argument'), { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.42 }, '<0.1')
        .addLabel('ten-thousand-square-metres')
        .to($('.scene-home'), { scale: 0.92, autoAlpha: 0, duration: 0.58 })
        .set($('.scene-stack'), { autoAlpha: 1 }, '<0.18')
        .fromTo($('.stack-eyebrow'), { y: -16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.44 }, '<0.08')
        .fromTo($('.stack-source .line-inner'), { yPercent: 120 }, { yPercent: 0, duration: 0.58, stagger: 0.05, ease: 'power2.out' }, '<0.04')
        .fromTo($('.stack-outline-word'), { y: -86, scale: 0.94, autoAlpha: 0 }, { y: 0, scale: 1, autoAlpha: 1, duration: 0.72, ease: 'power3.out' }, '<0.02')
        .fromTo($('.stack-particle'), { y: -38, scale: 0, autoAlpha: 0 }, { y: 0, scale: 1, autoAlpha: 1, duration: 0.46, stagger: 0.035, ease: 'back.out(1.3)' }, '<0.08')
        .fromTo($('.stack-weightless'), { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4 }, '<0.1')
        .set($('.scene-home'), { autoAlpha: 0 }, '>')
        .addLabel('intelligence-layer')
        .to($('.stack-source, .stack-eyebrow'), { y: isPortrait ? -18 : -12, autoAlpha: 0.14, duration: 0.46 })
        .to($('.stack-particle'), { y: isPortrait ? 150 : 104, scale: 0.5, autoAlpha: 0, duration: 0.52, stagger: 0.018 })
        .to($('.stack-outline-word'), { y: isPortrait ? 44 : 54, duration: 0.58, ease: 'power3.in' }, '<')
        .to($('.stack-weightless'), { y: 44, autoAlpha: 0, duration: 0.38 }, '<')
        .fromTo($('.stack-body-word'), { y: isPortrait ? 96 : 108, scaleY: 0.62, autoAlpha: 0 }, { y: isPortrait ? 44 : 54, scaleY: 1, autoAlpha: 1, duration: 0.54, transformOrigin: 'bottom center', ease: 'power3.out' }, '<0.22')
        .fromTo($('.stack-impact-line'), { scaleX: 0, autoAlpha: 0 }, { scaleX: 1, autoAlpha: 1, duration: 0.62, transformOrigin: 'center center', ease: 'power3.out' }, '<0.12')
        .fromTo($('.stack-impact-label'), { x: -20, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.38 }, '<0.16')
        .fromTo($('.stack-transitions'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.28 }, '<0.02')
        .fromTo($('.stack-transition'), { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.46, stagger: 0.09, ease: 'power2.out' }, '<0.06')
        .fromTo($('.stack-final .line-inner'), { yPercent: 120 }, { yPercent: 0, duration: 0.58, stagger: 0.05, ease: 'power2.out' }, '<0.08')
        .fromTo($('.stack-proof'), { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.42 }, '<0.1')
        .addLabel('intelligence-body')
        .to($('.scene-stack'), { scale: 0.92, autoAlpha: 0, duration: 0.58 })
        .set($('.scene-business'), { autoAlpha: 1 }, '<0.18')
        .fromTo($('.business-premise .line-inner'), { yPercent: 120 }, { yPercent: 0, duration: 0.58, stagger: 0.05, ease: 'power2.out' }, '<0.08')
        .fromTo($('.business-desk-top'), { scaleX: 0 }, { scaleX: 1, duration: 0.5, transformOrigin: 'center center' }, '<0.04')
        .fromTo($('.business-desk-leg'), { scaleY: 0 }, { scaleY: 1, duration: 0.46, stagger: 0.06, transformOrigin: 'top center' }, '<0.04')
        .fromTo($('.rent-token'), { y: isPortrait ? -210 : -170, rotate: -90, autoAlpha: 0 }, { y: 0, rotate: 0, autoAlpha: 1, duration: 0.72, ease: 'bounce.out' }, '<0.06')
        .fromTo($('.rent-caption'), { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4 }, '<0.18')
        .set($('.scene-stack'), { autoAlpha: 0 }, '>')
        .addLabel('rent-floor')
        .to($('.business-premise'), { y: isPortrait ? -24 : -14, autoAlpha: 0.14, duration: 0.46 })
        .to($('.rent-token'), { x: isPortrait ? -248 : -444, y: isPortrait ? 260 : 182, scale: 0.42, autoAlpha: 0.48, duration: 0.56 }, '<')
        .to($('.business-desk-leg'), { scaleY: 0, autoAlpha: 0, duration: 0.38 }, '<')
        .to($('.business-desk-top'), { scaleX: isPortrait ? 3.2 : 5.25, y: businessRail.deskY, duration: 0.62, ease: 'power3.inOut' }, '<')
        .to($('.rent-caption'), { autoAlpha: 0, duration: 0.32 }, '<')
        .fromTo($('.revenue-stream'), { scaleY: 0 }, { scaleY: 1, duration: 0.54, stagger: 0.055, transformOrigin: 'bottom center', ease: 'power2.out' }, '<0.16')
        .fromTo($('.revenue-engine-copy'), { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.46, stagger: 0.055, ease: 'power2.out' }, '<0.08')
        .fromTo($('.business-value-current'), { scaleX: 0 }, { scaleX: 1, duration: 0.64, transformOrigin: 'left center' }, '<0.08')
        .fromTo($('.business-final .line-inner'), { yPercent: 120 }, { yPercent: 0, duration: 0.58, stagger: 0.05, ease: 'power2.out' }, '<0.06')
        .fromTo($('.business-argument'), { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4 }, '<0.1')
        .addLabel('revenue-engines')
        .to($('.scene-business'), { scale: 0.92, autoAlpha: 0, duration: 0.58 })
        .set($('.scene-flywheel'), { autoAlpha: 1 }, '<0.18')
        .fromTo($('.flywheel-heading .line-inner'), { yPercent: 120 }, { yPercent: 0, duration: 0.58, stagger: 0.05, ease: 'power2.out' }, '<0.08')
        .fromTo($('.flywheel-ring'), { scale: 0.55, rotate: -80, autoAlpha: 0 }, { scale: 1, rotate: 0, autoAlpha: 1, duration: 0.62, stagger: 0.06, ease: 'power3.out' }, '<0.04')
        .fromTo($('.flywheel-core'), { scale: 0.25, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.56, ease: 'back.out(1.25)' }, '<0.08')
        .fromTo($('.flywheel-entry-line'), { scaleX: 0 }, { scaleX: 1, duration: 0.5, transformOrigin: 'left center' }, '<0.08')
        .fromTo($('.flywheel-entrant'), { x: isPortrait ? -170 : -280, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.62, ease: 'power3.out' }, '<0.04')
        .set($('.scene-business'), { autoAlpha: 0 }, '>')
        .addLabel('tenant-enters')
        .to($('.flywheel-heading'), { y: isPortrait ? -20 : -12, autoAlpha: 0.14, duration: 0.44 })
        .to($('.flywheel-ring--1'), { rotate: 150, duration: 0.72, ease: 'power2.inOut' }, '<')
        .to($('.flywheel-ring--2'), { rotate: -125, duration: 0.72, ease: 'power2.inOut' }, '<')
        .to($('.flywheel-ring--3'), { rotate: 95, duration: 0.72, ease: 'power2.inOut' }, '<')
        .to($('.flywheel-entrant'), { x: isPortrait ? 164 : 210, scale: 0.72, autoAlpha: 0, duration: 0.58 }, '<0.08')
        .fromTo($('.flywheel-step'), { scale: 0.72, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.4, stagger: 0.045, ease: 'back.out(1.2)' }, '<0.08')
        .fromTo($('.flywheel-value'), { x: -24, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.44, stagger: 0.07, ease: 'power2.out' }, '<0.04')
        .fromTo($('.flywheel-final .line-inner'), { yPercent: 120 }, { yPercent: 0, duration: 0.58, stagger: 0.05, ease: 'power2.out' }, '<0.08')
        .addLabel('flywheel-compounds')
        .to($('.scene-flywheel'), { scale: 0.92, autoAlpha: 0, duration: 0.58 })
        .set($('.scene-capital'), { autoAlpha: 1 }, '<0.18')
        .fromTo($('.capital-heading .line-inner'), { yPercent: 120 }, { yPercent: 0, duration: 0.58, stagger: 0.05, ease: 'power2.out' }, '<0.08')
        .fromTo($('.capital-building-shell'), { scaleY: 0 }, { scaleY: 1, duration: 0.58, transformOrigin: 'bottom center', ease: 'power3.out' }, '<0.04')
        .fromTo($('.capital-floor'), { scaleX: 0 }, { scaleX: 1, duration: 0.44, stagger: 0.045, transformOrigin: 'left center' }, '<0.08')
        .fromTo($('.capital-shaft'), { scaleY: 0 }, { scaleY: 1, duration: 0.5, transformOrigin: 'top center' }, '<0.02')
        .fromTo($('.capital-founder'), { x: -40, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.48 }, '<0.12')
        .fromTo($('.capital-investor'), { x: 40, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.48 }, '<0.04')
        .fromTo($('.capital-exit-line'), { scaleX: 0 }, { scaleX: 1, duration: 0.52, transformOrigin: 'left center' }, '<0.08')
        .set($('.scene-flywheel'), { autoAlpha: 0 }, '>')
        .addLabel('capital-outside')
        .to($('.capital-heading'), { ...capitalInsideMotion(geometry.mode).heading, duration: 0.44 })
        .to($('.capital-exit-line'), { scaleX: 0, autoAlpha: 0, duration: 0.4, transformOrigin: 'left center' }, '<')
        .fromTo($('.capital-partner'), { y: -72, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.44, stagger: 0.055, ease: 'power2.out' }, '<0.08')
        .fromTo($('.capital-car'), { y: isPortrait ? -290 : -218, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.72, ease: 'power3.out' }, '<0.04')
        .to($('.capital-founder'), { ...capitalInsideMotion(geometry.mode).founder, duration: 0.58, ease: 'power2.inOut' }, '<0.2')
        .to($('.capital-investor'), { ...capitalInsideMotion(geometry.mode).investor, duration: 0.58, ease: 'power2.inOut' }, '<')
        .fromTo($('.capital-connection'), { scaleX: 0 }, { scaleX: 1, duration: 0.5, transformOrigin: 'center center' }, '<0.08')
        .fromTo($('.capital-old-relation'), { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4 }, '<0.06')
        .fromTo($('.capital-strike'), { scaleX: 0 }, { scaleX: 1, duration: 0.42, transformOrigin: 'left center' }, '<0.12')
        .fromTo($('.capital-final .line-inner'), { yPercent: 120 }, { yPercent: 0, duration: 0.58, stagger: 0.05, ease: 'power2.out' }, '<0.06')
        .fromTo($('.capital-outcome'), { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.42 }, '<0.08')
        .fromTo($('.capital-argument'), { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4 }, '<0.06')
        .addLabel('capital-inside')
        .to($('.scene-capital'), { scale: 0.92, autoAlpha: 0, duration: 0.58 })
        .set($('.scene-bridge'), { autoAlpha: 1 }, '<0.18')
        .set($('.bridge-route, .bridge-gate, .bridge-final, .bridge-network, .bridge-argument'), { autoAlpha: 0 }, '<')
        .fromTo($('.bridge-heading .line-inner'), { yPercent: 120 }, { yPercent: 0, duration: 0.58, stagger: 0.05, ease: 'power2.out' }, '<0.08')
        .fromTo($('.bridge-frame'), { scaleX: isPortrait ? 1 : 0, scaleY: isPortrait ? 0 : 1 }, { scaleX: 1, scaleY: 1, duration: 0.58, transformOrigin: isPortrait ? 'center top' : 'left center', ease: 'power3.out' }, '<0.04')
        .fromTo($('.bridge-outflow-node'), { scale: 0.72, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.44, stagger: 0.08 }, '<0.08')
        .fromTo($('.bridge-outflow-line'), { scaleX: isPortrait ? 1 : 0, scaleY: isPortrait ? 0 : 1 }, { scaleX: 1, scaleY: 1, duration: 0.58, transformOrigin: isPortrait ? 'center top' : 'left center', ease: 'power2.inOut' }, '<0.04')
        .fromTo($('.bridge-leak'), { x: 0, y: 0, scale: 0, autoAlpha: 0 }, {
          x: (index) => isPortrait ? 0 : 225 + (index * 76),
          y: (index) => isPortrait ? 48 + (index * 52) : 0,
          scale: 1,
          autoAlpha: 1,
          duration: 0.66,
          stagger: 0.065,
          ease: 'power2.out',
        }, '<0.1')
        .set($('.scene-capital'), { autoAlpha: 0 }, '>')
        .addLabel('talent-outflow')
        .to($('.bridge-heading'), { y: isPortrait ? -22 : -12, autoAlpha: 0.14, duration: 0.44 })
        .to($('.bridge-outflow'), { autoAlpha: 0, duration: 0.42 }, '<')
        .to($('.bridge-leak'), { x: isPortrait ? 0 : 390, y: isPortrait ? 210 : 0, scale: 0.2, autoAlpha: 0, duration: 0.48, stagger: 0.025 }, '<')
        .fromTo($('.bridge-gate'), { scale: 0.16, rotate: isPortrait ? 90 : 0, autoAlpha: 0 }, { scale: 1, rotate: 0, autoAlpha: 1, duration: 0.62, ease: 'power3.out' }, '<0.08')
        .fromTo($('.bridge-route'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.28 }, '<0.06')
        .fromTo($('.bridge-route-line--retain'), { scaleX: isPortrait ? 1 : 0, scaleY: isPortrait ? 0 : 1 }, { scaleX: 1, scaleY: 1, duration: 0.68, transformOrigin: isPortrait ? 'center top' : 'left center', ease: 'power3.inOut' }, '<0.02')
        .fromTo($('.bridge-route-line--arrival'), { scaleX: isPortrait ? 1 : 0, scaleY: isPortrait ? 0 : 1 }, { scaleX: 1, scaleY: 1, duration: 0.68, transformOrigin: isPortrait ? 'center bottom' : 'right center', ease: 'power3.inOut' }, '<')
        .fromTo($('.bridge-route-copy'), { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.42, stagger: 0.06 }, '<0.18')
        .fromTo($('.bridge-flow--retain'), { x: 0, y: 0, autoAlpha: 0 }, { x: isPortrait ? 0 : 220, y: isPortrait ? 120 : 0, autoAlpha: 1, duration: 0.58, ease: 'power2.out' }, '<0.06')
        .fromTo($('.bridge-flow--arrival'), { x: 0, y: 0, autoAlpha: 0 }, { x: isPortrait ? 0 : -220, y: isPortrait ? -120 : 0, autoAlpha: 1, duration: 0.58, ease: 'power2.out' }, '<')
        .set($('.bridge-final'), { autoAlpha: 1 }, '<')
        .fromTo($('.bridge-final .line-inner'), { yPercent: 120 }, { yPercent: 0, duration: 0.58, stagger: 0.05, ease: 'power2.out' }, '<0.08')
        .fromTo($('.bridge-network'), { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.42 }, '<0.08')
        .fromTo($('.bridge-argument'), { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4 }, '<0.06')
        .addLabel('two-way-bridge')
        .to($('.scene-bridge'), { scale: 0.92, autoAlpha: 0, duration: 0.58 })
        .set($('.scene-university'), { autoAlpha: 1 }, '<0.18')
        .set($('.university-engine, .university-layer, .university-spoke, .university-final, .university-subline, .university-argument'), { autoAlpha: 0 }, '<')
        .fromTo($('.university-heading .line-inner'), { yPercent: 120 }, { yPercent: 0, duration: 0.58, stagger: 0.05, ease: 'power2.out' }, '<0.08')
        .fromTo($('.university-campus-shell'), { scaleX: isPortrait ? 1 : 0, scaleY: isPortrait ? 0 : 1 }, { scaleX: 1, scaleY: 1, duration: 0.64, transformOrigin: isPortrait ? 'center top' : 'left center', ease: 'power3.out' }, '<0.04')
        .fromTo($('.university-campus-label'), { y: -18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.42 }, '<0.18')
        .fromTo($('.university-isolated-core'), { scale: 0.5, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.58, ease: 'back.out(1.2)' }, '<0.06')
        .fromTo($('.university-distance'), { scaleX: isPortrait ? 1 : 0, scaleY: isPortrait ? 0 : 1 }, { scaleX: 1, scaleY: 1, duration: 0.5, transformOrigin: isPortrait ? 'center top' : 'left center' }, '<0.08')
        .set($('.scene-bridge'), { autoAlpha: 0 }, '>')
        .addLabel('university-outside')
        .to($('.university-heading'), { y: isPortrait ? -24 : -12, autoAlpha: 0.12, duration: 0.44 })
        .to($('.university-campus-shell'), { scale: isPortrait ? 0.28 : 0.23, rotate: 90, autoAlpha: 0.28, transformOrigin: 'center center', duration: 0.68, ease: 'power3.inOut' }, '<')
        .to($('.university-campus-label, .university-isolated-core, .university-distance'), { scale: 0.45, autoAlpha: 0, duration: 0.42 }, '<')
        .fromTo($('.university-engine'), { scale: 0.18, rotate: -45, autoAlpha: 0 }, { scale: 1, rotate: 0, autoAlpha: 1, duration: 0.68, ease: 'back.out(1.18)' }, '<0.16')
        .fromTo($('.university-spoke'), { strokeDashoffset: 1, autoAlpha: 0 }, { strokeDashoffset: 0, autoAlpha: 1, duration: 0.52, stagger: 0.045, ease: 'power2.inOut' }, '<0.08')
        .fromTo($('.university-layer'), { scale: 0.7, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.4, stagger: 0.055, ease: 'back.out(1.25)' }, '<0.06')
        .set($('.university-final'), { autoAlpha: 1 }, '<0.08')
        .fromTo($('.university-final .line-inner'), { yPercent: 120 }, { yPercent: 0, duration: 0.58, stagger: 0.05, ease: 'power2.out' }, '<0.04')
        .fromTo($('.university-subline'), { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.42 }, '<0.1')
        .fromTo($('.university-argument'), { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4 }, '<0.06')
        .addLabel('university-inside')
        .to($('.scene-university'), { scale: 0.92, autoAlpha: 0, duration: 0.58 })
        .set($('.scene-founder-first'), { autoAlpha: 1 }, '<0.18')
        .set($('.founder-first-operating, .founder-first-final, .founder-first-argument'), { autoAlpha: 0 }, '<')
        .fromTo($('.founder-first-heading .line-inner'), { yPercent: 120 }, { yPercent: 0, duration: 0.58, stagger: 0.05, ease: 'power2.out' }, '<0.08')
        .fromTo($('.founder-first-campus, .founder-first-company'), { scale: 0.72, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out' }, '<0.06')
        .fromTo($('.founder-first-direction-line'), { scaleX: isPortrait ? 1 : 0, scaleY: isPortrait ? 0 : 1 }, { scaleX: 1, scaleY: 1, duration: 0.58, transformOrigin: isPortrait ? 'center bottom' : 'right center' }, '<0.05')
        .fromTo($('.founder-first-startup-token'), { x: 0, y: 0, autoAlpha: 0 }, { x: isPortrait ? 0 : -420, y: isPortrait ? -245 : 0, autoAlpha: 1, duration: 0.72, ease: 'power3.inOut' }, '<0.1')
        .set($('.scene-university'), { autoAlpha: 0 }, '>')
        .addLabel('university-shifts')
        .to($('.founder-first-heading'), { y: isPortrait ? -22 : -12, autoAlpha: 0.12, duration: 0.44 })
        .to($('.founder-first-direction'), { autoAlpha: 0, duration: 0.42 }, '<')
        .set($('.founder-first-operating'), { autoAlpha: 1 }, '<0.12')
        .fromTo($('.founder-first-mode'), { scaleY: 0 }, { scaleY: 1, autoAlpha: 1, duration: 0.58, stagger: 0.08, transformOrigin: 'bottom center', ease: 'power3.out' }, '<')
        .fromTo($('.founder-first-core'), { scale: 0.3, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.62, ease: 'back.out(1.16)' }, '<0.06')
        .fromTo($('.founder-first-pulse'), { scaleX: isPortrait ? 1 : 0, scaleY: isPortrait ? 0 : 1 }, { scaleX: 1, scaleY: 1, duration: 0.52, transformOrigin: isPortrait ? 'center top' : 'left center' }, '<0.08')
        .fromTo($('.founder-first-feature'), { x: isPortrait ? 0 : 24, y: isPortrait ? 16 : 0, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, duration: 0.42, stagger: 0.045, ease: 'power2.out' }, '<0.08')
        .set($('.founder-first-final'), { autoAlpha: 1 }, '<0.08')
        .fromTo($('.founder-first-final .line-inner'), { yPercent: 120 }, { yPercent: 0, duration: 0.58, stagger: 0.05, ease: 'power2.out' }, '<0.04')
        .fromTo($('.founder-first-argument'), { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4 }, '<0.08')
        .addLabel('founder-first-system')
        .to($('.scene-founder-first'), { scale: 0.92, autoAlpha: 0, duration: 0.58 })
        .set($('.scene-model'), { autoAlpha: 1 }, '<0.18')
        .set($('.model-network, .model-final, .model-argument'), { autoAlpha: 0 }, '<')
        .fromTo($('.model-heading .line-inner'), { yPercent: 120 }, { yPercent: 0, duration: 0.58, stagger: 0.05, ease: 'power2.out' }, '<0.08')
        .fromTo($('.model-prototype-shell'), { scaleY: 0 }, { scaleY: 1, duration: 0.62, transformOrigin: 'bottom center', ease: 'power3.out' }, '<0.04')
        .fromTo($('.model-prototype-layer'), { scaleX: 0 }, { scaleX: 1, duration: 0.46, stagger: 0.065, transformOrigin: 'left center' }, '<0.08')
        .fromTo($('.model-prototype-label'), { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.42 }, '<0.14')
        .set($('.scene-founder-first'), { autoAlpha: 0 }, '>')
        .addLabel('amsterdam-prototype')
        .to($('.model-heading'), { y: isPortrait ? -22 : -12, autoAlpha: 0.12, duration: 0.44 })
        .to($('.model-prototype'), { scale: isPortrait ? 0.42 : 0.36, x: isPortrait ? 0 : -252, y: isPortrait ? -180 : 0, autoAlpha: 0, duration: 0.62, transformOrigin: 'center center', ease: 'power3.inOut' }, '<')
        .set($('.model-network'), { autoAlpha: 1 }, '<0.14')
        .fromTo($('.model-route'), { scaleX: isPortrait ? 1 : 0, scaleY: isPortrait ? 0 : 1 }, { scaleX: 1, scaleY: 1, duration: 0.7, transformOrigin: isPortrait ? 'center top' : 'left center', ease: 'power3.inOut' }, '<')
        .fromTo($('.model-station'), { scale: 0.55, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.46, stagger: 0.11, ease: 'back.out(1.15)' }, '<0.08')
        .fromTo($('.model-traveler'), { x: 0, y: 0, autoAlpha: 0 }, { x: isPortrait ? 0 : 650, y: isPortrait ? 390 : 0, autoAlpha: 1, duration: 0.9, ease: 'power2.inOut' }, '<0.02')
        .fromTo($('.model-invariant'), { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.44 }, '<0.24')
        .set($('.model-final'), { autoAlpha: 1 }, '<0.06')
        .fromTo($('.model-final .line-inner'), { yPercent: 120 }, { yPercent: 0, duration: 0.58, stagger: 0.05, ease: 'power2.out' }, '<0.04')
        .fromTo($('.model-argument'), { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4 }, '<0.08')
        .addLabel('model-travels')
        .to($('.scene-model'), { scale: 0.92, autoAlpha: 0, duration: 0.58 })
        .set($('.scene-vision'), { autoAlpha: 1 }, '<0.18')
        .set($('.vision-final-state'), { autoAlpha: 0 }, '<')
        .fromTo($('.vision-heading .line-inner'), { yPercent: 120 }, { yPercent: 0, duration: 0.58, stagger: 0.05, ease: 'power2.out' }, '<0.08')
        .fromTo($('.vision-transform'), { x: isPortrait ? -24 : -48, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.44, stagger: 0.07, ease: 'power2.out' }, '<0.05')
        .fromTo($('.vision-transform-line'), { scaleX: 0 }, { scaleX: 1, duration: 0.48, stagger: 0.06, transformOrigin: 'left center' }, '<0.06')
        .fromTo($('.vision-core'), { scale: 0.25, rotate: -30, autoAlpha: 0 }, { scale: 1, rotate: 0, autoAlpha: 1, duration: 0.64, ease: 'back.out(1.16)' }, '<0.06')
        .fromTo($('.vision-spine'), { scaleY: 0 }, { scaleY: 1, duration: 0.58, transformOrigin: 'top center' }, '<0.02')
        .fromTo($('.vision-argument'), { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4 }, '<0.1')
        .set($('.scene-model'), { autoAlpha: 0 }, '>')
        .addLabel('vision-convergence')
        .to($('.vision-heading'), { y: isPortrait ? -26 : -14, autoAlpha: 0, duration: 0.44 })
        .to($('.vision-field, .vision-argument'), { scale: 0.72, autoAlpha: 0, duration: 0.48 }, '<')
        .set($('.vision-final-state'), { autoAlpha: 1 }, '<0.16')
        .fromTo($('.vision-final-mark'), { scale: 0.36, y: isPortrait ? 110 : 70, autoAlpha: 0 }, { scale: 1, y: 0, autoAlpha: 1, duration: 0.72, ease: 'power3.out' }, '<')
        .fromTo($('.vision-final-rule'), { scaleX: 0 }, { scaleX: 1, duration: 0.58, transformOrigin: 'center center' }, '<0.18')
        .fromTo($('.vision-closing .line-inner'), { yPercent: 120 }, { yPercent: 0, duration: 0.64, stagger: 0.08, ease: 'power3.out' }, '<0.08')
        .fromTo($('.vision-pillars'), { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.44 }, '<0.1')
        .addLabel('europe-future');

      const initialBeat = Math.min(BEATS.length - 1, Math.max(0, beatRef.current));
      beatRef.current = initialBeat;
      setActiveBeat(initialBeat);
      timeline.seek(BEATS[initialBeat], false);
    }, stage);

    const labelValues = BEATS.map((beat) => timelineInstance?.labels[beat] ?? 0);
    const playhead = { time: 0 };
    let hasRenderedInitialScroll = false;
    const scrubTo = gsap.quickTo(playhead, 'time', {
      duration: SCROLL_SCRUB_DURATION,
      ease: SCROLL_SCRUB_EASE,
      onUpdate: () => {
        timelineInstance?.time(playhead.time, false);
      },
    });

    const updateFromScroll = () => {
      if (!timelineInstance) return;
      const maxScroll = Math.max(1, shell.scrollHeight - shell.clientHeight);
      const progress = Math.min(1, Math.max(0, shell.scrollTop / maxScroll));
      const targetTime = timelineValueForProgress(progress, labelValues);

      if (reduceMotion || !hasRenderedInitialScroll) {
        scrubTo.tween.pause();
        playhead.time = targetTime;
        timelineInstance.time(targetTime, false);
        hasRenderedInitialScroll = true;
      } else {
        scrubTo(targetTime);
      }

      const currentBeat = pageIndexForProgress(progress, BEATS.length);
      if (currentBeat !== beatRef.current) {
        beatRef.current = currentBeat;
        setActiveBeat(currentBeat);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(updateFromScroll);
    };

    navigationRef.current = (index: number) => {
      const target = Math.min(BEATS.length - 1, Math.max(0, Math.round(index)));
      shell.scrollTo({
        top: target * shell.clientHeight,
        behavior: reduceMotion ? 'auto' : 'smooth',
      });
    };

    shell.addEventListener('scroll', onScroll, { passive: true });
    initialFrame = requestAnimationFrame(() => {
      shell.scrollTop = beatRef.current * shell.clientHeight;
      updateFromScroll();
    });

    return () => {
      cancelAnimationFrame(animationFrame);
      cancelAnimationFrame(initialFrame);
      scrubTo.tween.kill();
      navigationRef.current = () => undefined;
      shell.removeEventListener('scroll', onScroll);
      context.revert();
    };
  }, [businessRail.deskY, geometry.mode]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', ' '].includes(event.key)) return;
      event.preventDefault();
      const direction = event.key === 'ArrowUp' || event.key === 'PageUp' ? -1 : 1;
      goToBeat(beatRef.current + direction);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [goToBeat]);

  return (
    <main className="pitch-shell" ref={shellRef}>
      <div className="pitch-viewport">
        <div className="intro-mask" aria-hidden="true">
          <PontMark className="intro-mark" />
        </div>
        <div
          className="pitch-stage"
          data-orientation={geometry.mode}
          data-viewport-profile={geometry.profile}
          ref={stageRef}
        >
          <section className="scene scene-cover" aria-label="PONT introduction">
            <div className="cover-content">
              <PontMark className="cover-mark" />
              <div className="cover-copy">
                <p className="cover-proposition">{COVER.proposition}</p>
                <p className="cover-pillars">{COVER.pillars.join(' \u00d7 ')}</p>
              </div>
            </div>
            <span className="cover-rule" />
          </section>

          <section className="scene scene-era" aria-label={SCENES[0].eyebrow}>
            <div className="era-orbit" aria-hidden="true"><span /></div>
            <h1 className="era-heading display-heading">
              <span className="mask-line think-line think-line--top"><span className="line-inner">AI LEARNED TO</span></span>
              <span className="mask-line think-line"><span className="line-inner think-word">THINK.</span></span>
              <span className="mask-line act-mask"><span className="line-inner act-word">ACT.</span></span>
            </h1>
            <p className="physical-statement">
              <span className="mask-line"><span className="line-inner">THE NEXT ERA</span></span>
              <span className="mask-line"><span className="line-inner accent">IS PHYSICAL.</span></span>
            </p>
            <p className="scene-argument era-argument">{SCENES[0].argument}</p>
          </section>

          <section className="scene scene-europe" aria-label={SCENES[1].eyebrow}>
            <span className="europe-rule" />
            <div className="science-lockup display-heading display-heading--medium">
              <span className="mask-line science-line"><span className="line-inner">EUROPE MAKES</span></span>
              <span className="mask-line science-line"><span className="line-inner accent">THE SCIENCE.</span></span>
            </div>
            <span className="escape-line" aria-hidden="true"><i /></span>
            <div className="companies-lockup display-heading display-heading--medium">
              <span className="mask-line companies-line"><span className="line-inner">BUT IT KEEPS LOSING</span></span>
              <span className="mask-line companies-line"><span className="line-inner">THE COMPANIES.</span></span>
            </div>
            <div className="stay-line display-heading display-heading--medium">
              <span className="mask-line"><span className="line-inner">BUILD SOMETHING</span></span>
              <span className="mask-line"><span className="line-inner">WORTH <em>STAYING</em> FOR.</span></span>
            </div>
            <p className="scene-argument europe-argument">{SCENES[1].argument}</p>
          </section>

          <section className="scene scene-worlds" aria-label={SCENES[2].eyebrow}>
            <span className="world-axis" aria-hidden="true" />
            <article className="domain domain--left">
              <h2 className="domain-title">PHYSICAL<br />AI</h2>
            </article>
            <article className="domain domain--right">
              <h2 className="domain-title">LIFE<br />SCIENCES</h2>
            </article>
            <div className="convergence-orb" aria-label="Convergence"><span /></div>
            <div className="future-line display-heading display-heading--future">
              <span className="mask-line"><span className="line-inner">TWO WORLDS.</span></span>
              <span className="mask-line"><span className="line-inner">ONE PHYSICAL <em>FUTURE.</em></span></span>
            </div>
            <p className="scene-argument worlds-argument">{SCENES[2].argument}</p>
          </section>

          <section className="scene scene-robot" aria-label={SCENES[3].eyebrow}>
            <h2 className="robot-heading display-heading display-heading--medium">
              <span className="mask-line"><span className="line-inner">ONE <em>ROBOT.</em></span></span>
            </h2>

            <div className="robot-network" aria-label="Technologies inside a modern robot">
              <span className="robot-orbit" aria-hidden="true" />
              {ROBOT_TECHNOLOGIES.map((technology, index) => (
                <span className={`robot-link robot-link--${index + 1}`} aria-hidden="true" key={`link-${technology}`} />
              ))}
              <div className="robot-core">
                <strong>1</strong>
                <span>ROBOT</span>
              </div>
              {ROBOT_TECHNOLOGIES.map((technology, index) => (
                <span className={`robot-node robot-node--${index + 1}`} key={technology}>{technology}</span>
              ))}
            </div>

            <div className="robot-result display-heading display-heading--medium">
              <span className="mask-line"><span className="line-inner">HUNDREDS OF</span></span>
              <span className="mask-line"><span className="line-inner accent">TECHNOLOGIES.</span></span>
            </div>
            <p className="scene-argument robot-argument">{SCENES[3].argument}</p>
            <p className="robot-principle">NO SINGLE COMPANY BUILDS THE PHYSICAL AI FUTURE ALONE.</p>
          </section>

          <section className="scene scene-therapy" aria-label={SCENES[4].eyebrow}>
            <h2 className="therapy-heading display-heading display-heading--medium">
              <span className="mask-line"><span className="line-inner">ONE <em>THERAPY.</em></span></span>
            </h2>

            <div className="therapy-network" aria-label="Disciplines inside a modern therapy">
              <span className="therapy-ring therapy-ring--outer" aria-hidden="true" />
              <span className="therapy-ring therapy-ring--middle" aria-hidden="true" />
              <span className="therapy-ring therapy-ring--inner" aria-hidden="true" />
              <div className="therapy-core" aria-label="One therapy">
                <span className="therapy-cell therapy-cell--large" />
                <span className="therapy-cell therapy-cell--medium" />
                <span className="therapy-cell therapy-cell--small" />
                <strong>1</strong>
                <span className="therapy-core__label">THERAPY</span>
              </div>
              {THERAPY_NODE_LAYOUT.map(({ label, width, rotation, landscape, portrait }) => {
                const point = geometry.mode === 'portrait' ? portrait : landscape;

                return (
                  <span
                    className="therapy-node"
                    key={label}
                    style={{
                      top: `${point.y}%`,
                      left: `${point.x}%`,
                      width,
                      '--node-rotation': `${rotation}deg`,
                    } as CSSProperties}
                  >
                    {label}
                  </span>
                );
              })}
            </div>

            <div className="therapy-result display-heading display-heading--medium">
              <span className="mask-line"><span className="line-inner">HUNDREDS OF</span></span>
              <span className="mask-line"><span className="line-inner accent">DISCIPLINES.</span></span>
            </div>
            <p className="scene-argument therapy-argument">{SCENES[4].argument}</p>
            <p className="therapy-principle">SCIENCE BECOMES INDUSTRY THROUGH COLLABORATION.</p>
          </section>

          <section className="scene scene-hard" aria-label={SCENES[5].eyebrow}>
            <h2 className="hard-heading display-heading display-heading--medium">
              <span className="mask-line"><span className="line-inner">HARD TECH NEEDS</span></span>
              <span className="mask-line"><span className="line-inner accent">HARD INFRASTRUCTURE.</span></span>
            </h2>

            <div className="hard-start" aria-label="Laptop and coffee shop">
              <div className="hard-laptop" aria-hidden="true">
                <span>SOFTWARE</span>
                <i />
              </div>
              <div className="hard-coffee" aria-hidden="true"><span /></div>
            </div>
            <p className="hard-anywhere">SOFTWARE CAN START ANYWHERE.</p>
            <span className="hard-limit" aria-hidden="true" />

            <div className="hard-stack" aria-label="Infrastructure for Physical AI and Life Sciences">
              {HARD_INFRASTRUCTURE.map(({ name, detail }, index) => (
                <article className="hard-module" key={name}>
                  <span>0{index + 1}</span>
                  <h3>{name}</h3>
                  <p>{detail}</p>
                </article>
              ))}
            </div>

            <p className="hard-verdict display-heading display-heading--medium">
              <span className="mask-line"><span className="line-inner">DEEP TECH</span></span>
              <span className="mask-line"><span className="line-inner accent">CANNOT.</span></span>
            </p>
            <p className="scene-argument hard-argument">{SCENES[5].argument}</p>
          </section>

          <section className="scene scene-space" aria-label={SCENES[6].eyebrow}>
            <h2 className="space-heading display-heading display-heading--medium">
              <span className="mask-line"><span className="line-inner">SPACE IS NOT</span></span>
              <span className="mask-line"><span className="line-inner accent">THE PRODUCT.</span></span>
            </h2>

            <div className="square-metre" aria-label="Square metres are infrastructure">
              <strong>M<sup>2</sup></strong>
              <span>SQUARE METRES</span>
              <i>INFRASTRUCTURE</i>
            </div>
            <p className="scene-argument space-argument">{SCENES[6].argument}</p>

            <div className="ecosystem-map" aria-label="PONT founder ecosystem">
              {ECOSYSTEM_SERVICES.map((service, index) => (
                <span
                  className="ecosystem-spoke"
                  key={`spoke-${service}`}
                  style={{ '--spoke-angle': `${index * 36}deg` } as CSSProperties}
                  aria-hidden="true"
                />
              ))}
              <div className="ecosystem-core"><strong>PONT</strong><span>ECOSYSTEM</span></div>
              {ECOSYSTEM_SERVICES.map((service, index) => (
                <span className={`ecosystem-node ecosystem-node--${index + 1}`} key={service}>{service}</span>
              ))}
            </div>

            <p className="ecosystem-verdict display-heading display-heading--medium">
              <span className="mask-line"><span className="line-inner">ECOSYSTEM IS</span></span>
              <span className="mask-line"><span className="line-inner accent">THE PRODUCT.</span></span>
            </p>
            <p className="ecosystem-principle">EVERYTHING A FOUNDER NORMALLY SEARCHES FOR OUTSIDE, WE BRING INSIDE.</p>
          </section>

          <section className="scene scene-founders" aria-label={SCENES[7].eyebrow}>
            <h2 className="founders-heading display-heading display-heading--medium">
              <span className="mask-line"><span className="line-inner">PONT DIDN&apos;T START</span></span>
              <span className="mask-line"><span className="line-inner accent">WITH A BUILDING.</span></span>
            </h2>
            <p className="founder-origin">IT STARTED WITH <em>THREE ECOSYSTEMS.</em></p>

            <div className="founder-streams" aria-label="PONT founders">
              {FOUNDERS.map(({ name, focus }, index) => (
                <article className={`founder-card founder-card--${index + 1}`} key={name}>
                  <span>0{index + 1}</span>
                  <h3>{name}</h3>
                  <p>{focus}</p>
                </article>
              ))}
              {FOUNDERS.map(({ name }, index) => (
                <span className={`founder-trace founder-trace--${index + 1}`} aria-hidden="true" key={`trace-${name}`} />
              ))}
            </div>

            <div className="founder-roof" aria-hidden="true">
              <span className="founder-roof-line founder-roof-line--left" />
              <span className="founder-roof-line founder-roof-line--right" />
              <i>PONT</i>
            </div>

            <p className="founder-final display-heading display-heading--medium">
              <span className="mask-line"><span className="line-inner">WHAT WE BUILT SEPARATELY,</span></span>
              <span className="mask-line"><span className="line-inner accent">WE NOW BRING UNDER ONE ROOF.</span></span>
            </p>
            <p className="scene-argument founder-argument">{SCENES[7].argument}</p>
          </section>

          <section className="scene scene-community" aria-label={SCENES[8].eyebrow}>
            <h2 className="community-premise display-heading display-heading--medium">
              <span className="mask-line"><span className="line-inner">MOST CAMPUSES BUILD A BUILDING</span></span>
              <span className="mask-line"><span className="line-inner">THEN SEARCH FOR <em>A COMMUNITY.</em></span></span>
            </h2>

            <div className="community-empty-shell" aria-label="An empty building searching for a community">
              <span className="empty-grid-line empty-grid-line--v1" aria-hidden="true" />
              <span className="empty-grid-line empty-grid-line--v2" aria-hidden="true" />
              <span className="empty-grid-line empty-grid-line--v3" aria-hidden="true" />
              <span className="empty-grid-line empty-grid-line--h1" aria-hidden="true" />
              <span className="empty-grid-line empty-grid-line--h2" aria-hidden="true" />
              <p className="empty-building-copy"><span>01 / BUILDING FIRST</span><strong>EMPTY SHELL</strong><i>SEARCHING FOR COMMUNITY…</i></p>
            </div>

            <div className="community-home" aria-label="An existing community given a physical home">
              {COMMUNITY_GROUPS.map((group, index) => (
                <span
                  className="community-link"
                  key={`community-link-${group}`}
                  style={{ '--community-angle': `${index * 60 - 90}deg` } as CSSProperties}
                  aria-hidden="true"
                />
              ))}
              <div className="community-core"><strong>THOUSANDS</strong><span>ALREADY CONNECTED</span></div>
              {COMMUNITY_GROUPS.map((group, index) => (
                <span className={`community-node community-node--${index + 1}`} key={group}>{group}</span>
              ))}
              <span className="community-home-line community-home-line--roof-left" style={communityFrame.roofLeft} aria-hidden="true" />
              <span className="community-home-line community-home-line--roof-right" style={communityFrame.roofRight} aria-hidden="true" />
              <span className="community-home-line community-home-line--wall-left" style={communityFrame.wallLeft} aria-hidden="true" />
              <span className="community-home-line community-home-line--wall-right" style={communityFrame.wallRight} aria-hidden="true" />
              <span className="community-home-line community-home-line--floor" style={communityFrame.floor} aria-hidden="true" />
              <i className="community-home-label" style={communityFrame.label}>PHYSICAL HOME</i>
            </div>

            <p className="community-final display-heading display-heading--medium">
              <span className="mask-line"><span className="line-inner">WE BUILT THE</span></span>
              <span className="mask-line"><span className="line-inner accent">COMMUNITY FIRST.</span></span>
            </p>
            <p className="community-principle">COMMUNITY IS <em>INFRASTRUCTURE.</em></p>
            <p className="scene-argument community-argument">{SCENES[8].argument}</p>
          </section>

          <section className="scene scene-home" aria-label={SCENES[9].eyebrow}>
            <h2 className="home-heading display-heading">
              <span className="mask-line"><span className="line-inner">THE <em>HOME.</em></span></span>
            </h2>

            <div className="home-seed-field" aria-label="Ten thousand square metres becoming a physical footprint">
              <span className="home-crosshair home-crosshair--horizontal" aria-hidden="true" />
              <span className="home-crosshair home-crosshair--vertical" aria-hidden="true" />
              <div className="home-seed"><strong>10.000</strong><span>M²</span></div>
              <p className="home-location"><strong>THE STACK</strong><span>AMSTERDAM OOST · FIRST PHYSICAL FOOTPRINT</span></p>
            </div>

            <p className="home-number" aria-label="Ten thousand square metres"><strong>10.000</strong><span>M²</span></p>

            <div className="home-blueprint" aria-label="PONT physical layers inside The Stack">
              {Array.from({ length: 7 }, (_, index) => (
                <span className="home-grid-line home-grid-line--vertical" style={{ left: `${(index + 1) * 12.5}%` }} key={`home-v-${index}`} aria-hidden="true" />
              ))}
              {Array.from({ length: 4 }, (_, index) => (
                <span className="home-grid-line home-grid-line--horizontal" style={{ top: `${(index + 1) * 20}%` }} key={`home-h-${index}`} aria-hidden="true" />
              ))}
              <svg className="home-circuit" aria-hidden="true" viewBox={homeBlueprint.viewBox} preserveAspectRatio="none">
                <path className="home-route" pathLength="1" d={homeBlueprint.route} />
              </svg>
              {HOME_LAYERS.map((layer, index) => (
                <span className={`home-program home-program--${index + 1}`} key={layer}><i>0{index + 1}</i>{layer}</span>
              ))}
              <span className="home-blueprint-label">THE STACK × PONT / PHYSICAL LAYER ONLINE</span>
            </div>

            <p className="home-final display-heading display-heading--medium">
              <span className="mask-line"><span className="line-inner">TO BUILD WHAT</span></span>
              <span className="mask-line"><span className="line-inner">EUROPE IS <em>MISSING.</em></span></span>
              <span className="mask-line home-final-sub"><span className="line-inner">AN ECOSYSTEM INSIDE AN ECOSYSTEM.</span></span>
            </p>
            <p className="scene-argument home-argument">{SCENES[9].argument}</p>
          </section>

          <section className="scene scene-stack" aria-label={SCENES[10].eyebrow}>
            <p className="stack-eyebrow">THE STACK <em>×</em> PONT</p>
            <h2 className="stack-source display-heading display-heading--medium">
              <span className="mask-line"><span className="line-inner">THE STACK BUILDS THE</span></span>
              <span className="mask-line"><span className="line-inner">INTELLIGENCE LAYER.</span></span>
            </h2>

            <div className="stack-intelligence" aria-label="Intelligence gaining a physical body">
              {Array.from({ length: 12 }, (_, index) => <span className={`stack-particle stack-particle--${index + 1}`} key={`stack-particle-${index}`} aria-hidden="true" />)}
              <strong className="stack-outline-word">INTELLIGENCE</strong>
              <strong className="stack-body-word">INTELLIGENCE</strong>
              <i className="stack-weightless">WEIGHTLESS / SOFTWARE LAYER</i>
            </div>

            <span className="stack-impact-line" aria-hidden="true"><i className="stack-impact-label">IMPACT / PHYSICAL LAYER</i></span>

            <div className="stack-transitions" aria-label="The Stack and PONT complementary layers">
              {STACK_TRANSITIONS.map(({ from, to }, index) => (
                <p className={`stack-transition stack-transition--${index + 1}`} key={from}>
                  <span>{from}</span><i aria-hidden="true">→</i><strong>{to}</strong>
                </p>
              ))}
            </div>

            <p className="stack-final display-heading display-heading--medium">
              <span className="mask-line"><span className="line-inner">PONT GIVES INTELLIGENCE</span></span>
              <span className="mask-line"><span className="line-inner">A <em>BODY.</em></span></span>
            </p>
            <p className="stack-proof"><span>SIGNED MOU</span> TECHLEAP × PONT · {SCENES[10].argument}</p>
          </section>

          <section className="scene scene-business" aria-label={SCENES[11].eyebrow}>
            <h2 className="business-premise display-heading display-heading--medium">
              <span className="mask-line"><span className="line-inner">WE DON&apos;T MONETISE</span></span>
              <span className="mask-line"><span className="line-inner accent">DESKS.</span></span>
            </h2>

            <div className="business-desk" aria-label="A desk reduced to a rent floor">
              <span className="business-desk-top" />
              <span className="business-desk-leg business-desk-leg--left" />
              <span className="business-desk-leg business-desk-leg--right" />
              <strong className="rent-token">RENT</strong>
              <p className="rent-caption">RENT PAYS THE FLOOR.</p>
            </div>

            <div className="revenue-field" aria-label="Six interconnected revenue engines">
              {REVENUE_ENGINES.map(({ name, detail }, index) => (
                <article className={`revenue-engine revenue-engine--${index + 1}`} key={name}>
                  <span className="revenue-stream" aria-hidden="true" />
                  <div className="revenue-engine-copy"><i>0{index + 1}</i><h3>{name}</h3><p>{detail}</p></div>
                </article>
              ))}
              <span className="business-value-current" style={{ bottom: businessRail.valueBottom }}><i>VALUE CREATED BY THE ECOSYSTEM →</i></span>
            </div>

            <p className="business-final display-heading display-heading--medium">
              <span className="mask-line"><span className="line-inner">WE MONETISE</span></span>
              <span className="mask-line"><span className="line-inner accent">THE ECOSYSTEM.</span></span>
            </p>
            <p className="scene-argument business-argument">{SCENES[11].argument} PARTICIPATE ECONOMICALLY IN THE VALUE IT CREATES.</p>
          </section>

          <section className="scene scene-flywheel" aria-label={SCENES[12].eyebrow}>
            <h2 className="flywheel-heading display-heading display-heading--medium">
              <span className="mask-line"><span className="line-inner">EVERY COMPANY CAN CREATE</span></span>
              <span className="mask-line"><span className="line-inner">MORE THAN <em>RENT.</em></span></span>
            </h2>

            <div className="flywheel-entry" aria-label="A tenant entering the economic flywheel">
              <span className="flywheel-entry-line" aria-hidden="true" />
              <strong className="flywheel-entrant">TENANT</strong>
            </div>

            <div className="flywheel-machine" aria-label="PONT economic flywheel">
              <span className="flywheel-ring flywheel-ring--1" />
              <span className="flywheel-ring flywheel-ring--2" />
              <span className="flywheel-ring flywheel-ring--3" />
              <span className="flywheel-ring flywheel-ring--4" />
              <div className="flywheel-core"><strong>PONT</strong><span>COMPOUNDS VALUE</span></div>
              {FLYWHEEL_STEPS.map((step, index) => (
                <span className={`flywheel-step flywheel-step--${index + 1}`} key={step}>{step}</span>
              ))}
            </div>

            <div className="flywheel-values">
              {FLYWHEEL_LAYERS.map((layer, index) => <p className="flywheel-value" key={layer}><i>0{index + 1}</i>{layer}</p>)}
            </div>

            <p className="flywheel-final display-heading display-heading--medium">
              <span className="mask-line"><span className="line-inner">EQUITY CAPTURES</span></span>
              <span className="mask-line"><span className="line-inner accent">THE UPSIDE.</span></span>
            </p>
          </section>

          <section className="scene scene-capital" aria-label={SCENES[13].eyebrow}>
            <h2 className="capital-heading display-heading display-heading--medium">
              <span className="mask-line"><span className="line-inner">FOUNDERS SHOULDN&apos;T HAVE TO</span></span>
              <span className="mask-line"><span className="line-inner">LEAVE THE BUILDING TO FIND <em>INVESTORS.</em></span></span>
            </h2>

            <div className="capital-building" aria-label="Capital elevator inside PONT">
              <span className="capital-building-shell" aria-hidden="true" />
              {Array.from({ length: 3 }, (_, index) => <span className={`capital-floor capital-floor--${index + 1}`} key={`capital-floor-${index}`} aria-hidden="true" />)}
              <span className="capital-shaft" aria-hidden="true" />
              <div className="capital-car"><strong>CAPITAL</strong><span>INSIDE</span></div>
              <p className="capital-founder"><i>BUILD / 02</i><strong>FOUNDER</strong></p>
              <p className="capital-investor"><i>OUTSIDE</i><strong>INVESTOR</strong></p>
              <span className="capital-exit-line"><i>SEARCHING OUTSIDE →</i></span>
              <span className="capital-connection" aria-hidden="true" />
            </div>

            <div className="capital-partners" aria-label="Capital partners inside PONT">
              {CAPITAL_PARTNERS.map((partner, index) => <span className={`capital-partner capital-partner--${index + 1}`} key={partner}>{partner}</span>)}
            </div>

            <p className="capital-old-relation">LANDLORD <i>+</i> TENANT<span className="capital-strike" /></p>
            <p className="capital-final display-heading display-heading--medium">
              <span className="mask-line"><span className="line-inner">FOUNDER <em>+</em> INVESTOR.</span></span>
            </p>
            <p className="capital-outcome">DISCOVERED. <em>FINANCED.</em> SCALED. — WITHOUT LEAVING THE BUILDING.</p>
            <p className="scene-argument capital-argument">{SCENES[13].argument}</p>
          </section>

          <section className="scene scene-bridge" aria-label={SCENES[14].eyebrow}>
            <h2 className="bridge-heading display-heading display-heading--medium">
              <span className="mask-line"><span className="line-inner">KEEP EUROPEAN TALENT <em>IN.</em></span></span>
              <span className="mask-line"><span className="line-inner">BRING GLOBAL TALENT <em>IN.</em></span></span>
            </h2>

            <div className="bridge-field" aria-label="PONT two-way bridge between Europe and the world">
              <span className="bridge-frame" aria-hidden="true" />

              <div className="bridge-outflow">
                <p className="bridge-outflow-node bridge-outflow-node--origin"><i>01</i><strong>EUROPE</strong><span>TALENT ORIGIN</span></p>
                <span className="bridge-outflow-line" aria-hidden="true">
                  {Array.from({ length: 4 }, (_, index) => <i className={`bridge-leak bridge-leak--${index + 1}`} key={`bridge-leak-${index}`} />)}
                </span>
                <p className="bridge-outflow-node bridge-outflow-node--exit"><i>OUT</i><strong>OUTFLOW</strong><span>ONE-WAY SYSTEM</span></p>
              </div>

              {BRIDGE_ROUTES.map((route, index) => (
                <div className={`bridge-route bridge-route--${index === 0 ? 'retain' : 'arrival'}`} key={route.origin}>
                  <span className={`bridge-route-line bridge-route-line--${index === 0 ? 'retain' : 'arrival'}`} aria-hidden="true" />
                  <p className="bridge-route-copy bridge-route-copy--origin"><i>{index === 0 ? 'KEEP' : 'BRING'}</i><strong>{route.origin}</strong></p>
                  <p className="bridge-route-copy bridge-route-copy--destination"><i>VIA {route.via}</i><strong>{route.destination}</strong></p>
                  <span className={`bridge-flow bridge-flow--${index === 0 ? 'retain' : 'arrival'}`} aria-hidden="true" />
                </div>
              ))}

              <div className="bridge-gate"><strong>PONT</strong><span>TWO-WAY BRIDGE</span></div>
            </div>

            <p className="bridge-final display-heading display-heading--medium">
              <span className="mask-line"><span className="line-inner">EUROPE NEEDS TO BECOME</span></span>
              <span className="mask-line"><span className="line-inner">THE <em>DESTINATION.</em></span></span>
            </p>
            <p className="bridge-network">{SCENES[14].network}</p>
            <p className="scene-argument bridge-argument">{SCENES[14].argument}</p>
          </section>

          <section className="scene scene-university" aria-label={SCENES[15].eyebrow}>
            <h2 className="university-heading display-heading display-heading--medium">
              <span className="mask-line"><span className="line-inner">NOT ANOTHER UNIVERSITY</span></span>
              <span className="mask-line"><span className="line-inner">AROUND <em>ENTREPRENEURSHIP.</em></span></span>
            </h2>

            <div className="university-field" aria-label="The university moving from outside to inside the PONT ecosystem">
              <div className="university-campus-shell">
                <p className="university-campus-label"><i>TRADITIONAL MODEL / OUTSIDE</i><strong>UNIVERSITY</strong></p>
                <div className="university-isolated-core"><span>ISOLATED</span><strong>STARTUP</strong><i>PROGRAMME</i></div>
                <span className="university-distance"><i>DISTANCE FROM PRODUCTION</i></span>
              </div>

              <div className="university-engine"><strong>UNIVERSITY</strong><span>INSIDE PONT</span></div>
              <svg className="university-network" viewBox={universityNetwork.viewBox} preserveAspectRatio="none" aria-hidden="true">
                {universityNetwork.routes.map((route, index) => (
                  <path className="university-spoke" d={route} pathLength="1" key={`university-route-${index}`} />
                ))}
              </svg>
              {UNIVERSITY_LAYERS.map((layer, index) => (
                <div className={`university-system university-system--${index + 1}`} key={layer}>
                  <p className="university-layer"><i>0{index + 1}</i>{layer}</p>
                </div>
              ))}
            </div>

            <p className="university-final display-heading display-heading--medium">
              <span className="mask-line"><span className="line-inner">PUT THE UNIVERSITY</span></span>
              <span className="mask-line"><span className="line-inner">INSIDE THE <em>ECOSYSTEM.</em></span></span>
            </p>
            <p className="university-subline">A FOUNDER-FIRST UNIVERSITY.</p>
            <p className="scene-argument university-argument">{SCENES[15].argument}</p>
          </section>

          <section className="scene scene-founder-first" aria-label={SCENES[16].eyebrow}>
            <h2 className="founder-first-heading display-heading display-heading--medium">
              <span className="mask-line"><span className="line-inner">DON&apos;T BRING STARTUPS</span></span>
              <span className="mask-line"><span className="line-inner">INTO THE <em>UNIVERSITY.</em></span></span>
            </h2>

            <div className="founder-first-field">
              <div className="founder-first-direction" aria-label="The old direction from startups into a university">
                <div className="founder-first-campus"><i>OLD MODEL</i><strong>UNIVERSITY</strong><span>THEORY FIRST</span></div>
                <span className="founder-first-direction-line" aria-hidden="true" />
                <div className="founder-first-company"><i>REAL ECONOMY</i><strong>COMPANIES</strong><span>BUILD · FINANCE · SOLVE</span><b className="founder-first-startup-token">STARTUPS</b></div>
              </div>

              <div className="founder-first-operating" aria-label="Founder-first university operating system">
                <div className="founder-first-modes">
                  {UNIVERSITY_MODES.map((mode) => <div className={`founder-first-mode founder-first-mode--${mode.label.toLowerCase()}`} key={mode.label}><strong>{mode.value}</strong><span>{mode.label}</span></div>)}
                </div>
                <div className="founder-first-core"><i>LEARN WHERE YOU</i><strong>BUILD.</strong><span>UNIVERSITY × COMPANIES</span></div>
                <span className="founder-first-pulse" aria-hidden="true" />
                <div className="founder-first-features">
                  {FOUNDER_FIRST_FEATURES.map((feature, index) => <p className="founder-first-feature" key={feature}><i>0{index + 1}</i>{feature}</p>)}
                </div>
              </div>
            </div>

            <p className="founder-first-final display-heading display-heading--medium">
              <span className="mask-line"><span className="line-inner">THE UNIVERSITY</span></span>
              <span className="mask-line"><span className="line-inner">INSIDE THE <em>COMPANIES.</em></span></span>
            </p>
            <p className="scene-argument founder-first-argument">{SCENES[16].argument}</p>
          </section>

          <section className="scene scene-model" aria-label={SCENES[17].eyebrow}>
            <h2 className="model-heading display-heading display-heading--medium">
              <span className="mask-line"><span className="line-inner">ONE BUILDING <em>NOW.</em></span></span>
              <span className="mask-line"><span className="line-inner">A MODEL THAT CAN TRAVEL.</span></span>
            </h2>

            <div className="model-field" aria-label="The PONT model traveling beyond Amsterdam">
              <div className="model-prototype">
                <span className="model-prototype-shell" aria-hidden="true" />
                <div className="model-prototype-layers">
                  {MODEL_LAYERS.map((layer, index) => <span className={`model-prototype-layer model-prototype-layer--${index + 1}`} key={layer}>{layer}</span>)}
                </div>
                <p className="model-prototype-label"><i>PROTOTYPE / 01</i><strong>AMSTERDAM</strong><span>THE STARTING POINT</span></p>
              </div>

              <div className="model-network">
                <span className="model-route" aria-hidden="true" />
                <span className="model-traveler" aria-hidden="true" />
                {['AMSTERDAM', 'CITY 02', 'CITY 03', 'CITY 04'].map((city, index) => (
                  <div className={`model-station model-station--${index + 1}`} key={city}>
                    <span className="model-station-building">{MODEL_LAYERS.map((layer) => <i key={layer} />)}</span>
                    <strong>{city}</strong>
                    <small>{index === 0 ? 'PROVEN HERE' : 'LOCAL STRENGTH'}</small>
                  </div>
                ))}
                <p className="model-invariant"><i>THE ARCHITECTURE REMAINS</i>{MODEL_LAYERS.join(' + ')}</p>
              </div>
            </div>

            <p className="model-final display-heading display-heading--medium">
              <span className="mask-line"><span className="line-inner">BUILD ONCE. <em>LEARN.</em></span></span>
              <span className="mask-line"><span className="line-inner">THEN MAKE IT TRAVEL.</span></span>
            </p>
            <p className="scene-argument model-argument">{SCENES[17].argument}</p>
          </section>

          <section className="scene scene-vision" aria-label={SCENES[18].eyebrow}>
            <h2 className="vision-heading display-heading display-heading--medium">
              <span className="mask-line"><span className="line-inner">THE PHYSICAL HOME OF</span></span>
              <span className="mask-line"><span className="line-inner">EUROPE&apos;S NEXT</span></span>
              <span className="mask-line"><span className="line-inner"><em>TECHNOLOGICAL ERA.</em></span></span>
            </h2>

            <div className="vision-field" aria-label="PONT turns European capability into physical outcomes">
              <div className="vision-transformations">
                {VISION_TRANSFORMATIONS.map((item, index) => (
                  <div className={`vision-transform vision-transform--${index + 1}`} key={item.from}>
                    <span>{item.from}</span><i className="vision-transform-line" /><strong>{item.to}</strong>
                  </div>
                ))}
              </div>
              <span className="vision-spine" aria-hidden="true" />
              <div className="vision-core"><PontMark className="vision-core-mark" /><span>ONE TECHNOLOGICAL ECOSYSTEM</span></div>
            </div>
            <p className="scene-argument vision-argument">{SCENES[18].argument}</p>

            <div className="vision-final-state">
              <PontMark className="vision-final-mark" />
              <span className="vision-final-rule" aria-hidden="true" />
              <p className="vision-closing display-heading display-heading--medium">
                <span className="mask-line"><span className="line-inner">EUROPE HAS THE <em>SCIENCE.</em></span></span>
                <span className="mask-line"><span className="line-inner">NOW LET&apos;S BUILD THE ENVIRONMENT</span></span>
                <span className="mask-line"><span className="line-inner">THAT TURNS IT INTO THE <em>FUTURE.</em></span></span>
              </p>
              <p className="vision-pillars">{COVER.pillars.join(' × ')}</p>
            </div>
          </section>

          <section className="reduced-summary" aria-label="PONT story summary">
            {SCENES.map((scene) => <article key={scene.id}><span>{scene.index}</span><p>{scene.statements.at(-1)}</p></article>)}
          </section>
        </div>

          <div className="experience-controls">
            <div className="palette-control">
              <button
                className="palette-toggle"
                type="button"
                onClick={() => setPaletteOpen((current) => !current)}
                aria-label="Choose color palette"
                aria-expanded={paletteOpen}
                aria-controls="palette-options"
              >
                <span className="palette-toggle__mark" aria-hidden="true">
                  <i /><i /><i />
                </span>
              </button>

              {paletteOpen && (
                <fieldset className="palette-options" id="palette-options">
                  <legend className="sr-only">Project color palette</legend>
                  {PALETTES.map((option) => (
                    <button
                      className="palette-option"
                      key={option.id}
                      type="button"
                      aria-pressed={palette === option.id}
                      aria-label={option.label}
                      title={option.label}
                      onClick={() => {
                        selectPalette(option.id as Palette);
                        setPaletteOpen(false);
                      }}
                      style={{ '--swatch': option.swatch } as CSSProperties}
                    >
                      <span className="palette-option__swatch" aria-hidden="true" />
                    </button>
                  ))}
                </fieldset>
              )}
            </div>

            <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
              {theme === 'dark' ? (
                <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
              ) : (
                <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M20.8 15.1A8.5 8.5 0 0 1 8.9 3.2 8.5 8.5 0 1 0 20.8 15.1Z" /></svg>
              )}
            </button>

            <div
              className="chapter-progress"
            >
              <span className="chapter-progress__count" aria-hidden="true">
                <strong>{String(activeBeat + 1).padStart(2, '0')}</strong>
                <span>/ {String(BEATS.length).padStart(2, '0')}</span>
              </span>
              <span className="chapter-progress__meter">
                <progress
                  className="chapter-progress__track"
                  max={BEATS.length}
                  value={activeBeat + 1}
                  aria-label="Story progress"
                  aria-valuetext={`Moment ${activeBeat + 1} of ${BEATS.length}: ${BEATS[activeBeat].replaceAll('-', ' ')}`}
                />
                <span
                  className="chapter-progress__thumb"
                  style={{ '--progress': `${((activeBeat + 1) / BEATS.length) * 100}%` } as CSSProperties}
                  aria-hidden="true"
                />
              </span>
            </div>

            <nav className="stage-controls" aria-label="Story navigation">
              <button type="button" onClick={() => goToBeat(activeBeat - 1)} aria-label="Previous moment" disabled={activeBeat === 0}>
                <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m7 14 5-5 5 5" /></svg>
              </button>
              <button type="button" onClick={() => goToBeat(activeBeat + 1)} aria-label="Next moment" disabled={activeBeat === BEATS.length - 1}>
                <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m7 10 5 5 5-5" /></svg>
              </button>
            </nav>
          </div>
      </div>

      <div className="pagination-rail" aria-hidden="true">
        {BEATS.map((beat) => <section className="scroll-page" key={beat} />)}
      </div>

    </main>
  );
}
