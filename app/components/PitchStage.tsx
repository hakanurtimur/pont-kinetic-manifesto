'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

import { BEATS } from '@/src/lib/progress.mjs';
import {
  pageIndexForProgress,
  resolveTheme,
  timelineValueForProgress,
  viewportMode,
} from '@/src/lib/experience.mjs';
import {
  COVER,
  ROBOT_TECHNOLOGIES,
  SCENES,
  THERAPY_DISCIPLINES,
} from '@/src/content/pitch.mjs';
import { PontMark } from './PontMark';

const LANDSCAPE_STAGE = { width: 1133, height: 744 };
const PORTRAIT_STAGE = { width: 744, height: 1133 };

type Theme = 'light' | 'dark';
type Orientation = 'landscape' | 'portrait';

function useStageGeometry() {
  const [geometry, setGeometry] = useState({ scale: 1, mode: 'landscape' as Orientation });

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const visual = window.visualViewport;
        const width = visual?.width ?? window.innerWidth;
        const height = visual?.height ?? window.innerHeight;
        const mode = viewportMode(width, height) as Orientation;
        const stage = mode === 'portrait' ? PORTRAIT_STAGE : LANDSCAPE_STAGE;
        setGeometry({ scale: Math.min(width / stage.width, height / stage.height), mode });
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

function useTheme() {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const saved = window.localStorage.getItem('pont-theme');
    const initial = resolveTheme(saved, prefersDark) as Theme;
    document.documentElement.dataset.theme = initial;
    const frame = requestAnimationFrame(() => setTheme(initial));
    return () => cancelAnimationFrame(frame);
  }, []);

  const toggle = () => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      window.localStorage.setItem('pont-theme', next);
      return next;
    });
  };

  return { theme, toggle };
}

export function PitchStage() {
  const shellRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const beatRef = useRef(0);
  const [activeBeat, setActiveBeat] = useState(0);
  const geometry = useStageGeometry();
  const { theme, toggle: toggleTheme } = useTheme();

  const goToBeat = useCallback((index: number) => {
    const safeIndex = Math.min(BEATS.length - 1, Math.max(0, index));
    const shell = shellRef.current;
    if (!shell) return;
    shell.scrollTo({
      top: safeIndex * shell.clientHeight,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  }, []);

  useLayoutEffect(() => {
    const shell = shellRef.current;
    const stage = stageRef.current;
    if (!shell || !stage || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const isPortrait = geometry.mode === 'portrait';
    let animationFrame = 0;
    let snapWatchFrame = 0;
    let snapTween: gsap.core.Tween | null = null;
    let isPointerActive = false;
    let isSettling = false;
    let timelineInstance: gsap.core.Timeline | null = null;

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' } });
      const $ = gsap.utils.selector(stage);

      gsap.set($('.scene'), { autoAlpha: 0 });
      gsap.set($('.scene-cover'), { autoAlpha: 1 });
      gsap.set($('.cover-mark'), { autoAlpha: 1, scale: 1 });

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
        .to($('.science-lockup'), { x: isPortrait ? -54 : -110, autoAlpha: 0.16, duration: 0.56 })
        .fromTo($('.escape-line'), { scaleX: 0 }, { scaleX: 1, duration: 0.56 }, '<')
        .fromTo($('.companies-line .line-inner'), { xPercent: 110 }, { xPercent: 0, duration: 0.58, stagger: 0.05, ease: 'power2.out' }, '<0.08')
        .addLabel('companies')
        .to($('.companies-lockup'), { y: isPortrait ? -72 : -96, scale: isPortrait ? 0.82 : 0.74, transformOrigin: 'left top', duration: 0.58 })
        .to($('.escape-line'), { scaleX: 0, autoAlpha: 0, transformOrigin: 'right center', duration: 0.38 }, '<')
        .fromTo($('.stay-line .line-inner'), { yPercent: 120 }, { yPercent: 0, duration: 0.62, stagger: 0.06, ease: 'power2.out' }, '<0.12')
        .fromTo($('.europe-argument'), { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.44 }, '<0.12')
        .addLabel('stay')
        .to($('.scene-europe'), { yPercent: -12, autoAlpha: 0, duration: 0.58 })
        .set($('.scene-worlds'), { autoAlpha: 1 }, '<0.16')
        .fromTo($('.domain--left'), { x: isPortrait ? 0 : -130, y: isPortrait ? -100 : 0, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, duration: 0.58, ease: 'power2.out' }, '<0.08')
        .fromTo($('.domain--right'), { x: isPortrait ? 0 : 130, y: isPortrait ? 100 : 0, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, duration: 0.58, ease: 'power2.out' }, '<')
        .fromTo($('.world-axis'), { scaleX: 0 }, { scaleX: 1, duration: 0.58 }, '<0.04')
        .set($('.scene-europe'), { autoAlpha: 0 }, '>')
        .addLabel('domains')
        .to($('.domain--left'), { x: isPortrait ? 0 : 236, y: isPortrait ? 185 : 0, duration: 0.64 })
        .to($('.domain--right'), { x: isPortrait ? 0 : -236, y: isPortrait ? -185 : 0, duration: 0.64 }, '<')
        .fromTo($('.convergence-orb'), { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.64, ease: 'power2.out' }, '<0.08')
        .addLabel('convergence')
        .to($('.domain'), { scale: 0.44, autoAlpha: 0, duration: 0.54 })
        .to($('.world-axis'), { scaleX: 0, duration: 0.42 }, '<0.04')
        .to($('.convergence-orb'), { scale: isPortrait ? 7.8 : 6.4, autoAlpha: 0.08, duration: 0.7 }, '<')
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
        .addLabel('therapy-ecosystem');

      const initialBeat = Math.min(BEATS.length - 1, Math.max(0, beatRef.current));
      beatRef.current = initialBeat;
      setActiveBeat(initialBeat);
      timeline.seek(BEATS[initialBeat], false);
    }, stage);

    const updateFromScroll = () => {
      if (!timelineInstance) return;
      const maxScroll = Math.max(1, shell.scrollHeight - shell.clientHeight);
      const progress = shell.scrollTop / maxScroll;
      const labelValues = BEATS.map((beat) => timelineInstance?.labels[beat] ?? 0);
      timelineInstance.time(timelineValueForProgress(progress, labelValues), false);

      const currentBeat = pageIndexForProgress(progress, BEATS.length);
      if (currentBeat !== beatRef.current) {
        beatRef.current = currentBeat;
        setActiveBeat(currentBeat);
      }
    };

    const settleToNearestBeat = () => {
      if (isPointerActive || isSettling) return;

      const pageHeight = shell.clientHeight;
      const maxScroll = Math.max(1, shell.scrollHeight - pageHeight);
      const progress = shell.scrollTop / maxScroll;
      const targetIndex = pageIndexForProgress(progress, BEATS.length);
      const targetTop = targetIndex * pageHeight;
      const distance = Math.abs(targetTop - shell.scrollTop);

      if (distance < 0.5) {
        shell.scrollTop = targetTop;
        shell.classList.remove('is-scrolling');
        return;
      }

      isSettling = true;
      snapTween = gsap.to(shell, {
        scrollTop: targetTop,
        duration: gsap.utils.clamp(0.48, 0.78, 0.32 + (distance / pageHeight) * 0.8),
        ease: 'power2.inOut',
        overwrite: 'auto',
        onComplete: () => {
          snapTween = null;
          isSettling = false;
          shell.classList.remove('is-scrolling');
        },
      });
    };

    const releaseSnap = () => {
      cancelAnimationFrame(snapWatchFrame);
      if (isPointerActive || isSettling) return;

      let lastScrollTop = shell.scrollTop;
      let stableFrames = 0;
      const watchForRest = () => {
        if (isPointerActive || isSettling) return;

        const currentScrollTop = shell.scrollTop;
        stableFrames = Math.abs(currentScrollTop - lastScrollTop) < 0.25
          ? stableFrames + 1
          : 0;
        lastScrollTop = currentScrollTop;

        if (stableFrames >= 4) {
          settleToNearestBeat();
          return;
        }

        snapWatchFrame = requestAnimationFrame(watchForRest);
      };

      snapWatchFrame = requestAnimationFrame(watchForRest);
    };

    const holdSnap = () => {
      cancelAnimationFrame(snapWatchFrame);
      snapTween?.kill();
      snapTween = null;
      isSettling = false;
      shell.classList.add('is-scrolling');
    };

    const onScroll = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(updateFromScroll);
      releaseSnap();
    };

    const onWheel = () => {
      holdSnap();
      releaseSnap();
    };

    const onPointerDown = () => {
      isPointerActive = true;
      holdSnap();
    };

    const onPointerEnd = () => {
      isPointerActive = false;
      releaseSnap();
    };

    shell.addEventListener('scroll', onScroll, { passive: true });
    shell.addEventListener('wheel', onWheel, { passive: true });
    shell.addEventListener('pointerdown', onPointerDown, { passive: true });
    shell.addEventListener('pointerup', onPointerEnd, { passive: true });
    shell.addEventListener('pointercancel', onPointerEnd, { passive: true });
    shell.scrollTop = beatRef.current * shell.clientHeight;
    updateFromScroll();

    return () => {
      cancelAnimationFrame(animationFrame);
      cancelAnimationFrame(snapWatchFrame);
      snapTween?.kill();
      shell.classList.remove('is-scrolling');
      shell.removeEventListener('scroll', onScroll);
      shell.removeEventListener('wheel', onWheel);
      shell.removeEventListener('pointerdown', onPointerDown);
      shell.removeEventListener('pointerup', onPointerEnd);
      shell.removeEventListener('pointercancel', onPointerEnd);
      context.revert();
    };
  }, [geometry.mode]);

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
        <div
          className="pitch-stage"
          data-orientation={geometry.mode}
          ref={stageRef}
          style={{ '--stage-scale': geometry.scale } as React.CSSProperties}
        >
          <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
            {theme === 'dark' ? (
              <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
            ) : (
              <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M20.8 15.1A8.5 8.5 0 0 1 8.9 3.2 8.5 8.5 0 1 0 20.8 15.1Z" /></svg>
            )}
          </button>

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
              <span className="mask-line companies-line"><span className="line-inner">IT KEEPS LOSING</span></span>
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
                <strong>01</strong>
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
                <strong>01</strong>
                <span className="therapy-core__label">THERAPY</span>
              </div>
              {THERAPY_DISCIPLINES.map((discipline, index) => (
                <span className={`therapy-node therapy-node--${index + 1}`} key={discipline}>{discipline}</span>
              ))}
            </div>

            <div className="therapy-result display-heading display-heading--medium">
              <span className="mask-line"><span className="line-inner">HUNDREDS OF</span></span>
              <span className="mask-line"><span className="line-inner accent">DISCIPLINES.</span></span>
            </div>
            <p className="scene-argument therapy-argument">{SCENES[4].argument}</p>
            <p className="therapy-principle">SCIENCE BECOMES INDUSTRY THROUGH COLLABORATION.</p>
          </section>

          <section className="reduced-summary" aria-label="PONT story summary">
            {SCENES.map((scene) => <article key={scene.id}><span>{scene.index}</span><p>{scene.statements.at(-1)}</p></article>)}
          </section>

          <nav className="pagination-dots" aria-label="Story chapters">
            {BEATS.map((beat, index) => (
              <button
                className={index === activeBeat ? 'is-active' : ''}
                key={beat}
                type="button"
                onClick={() => goToBeat(index)}
                aria-label={`Go to moment ${index + 1}`}
                aria-current={index === activeBeat ? 'step' : undefined}
              />
            ))}
          </nav>

          <nav className="stage-controls" aria-label="Story navigation">
            <button type="button" onClick={() => goToBeat(activeBeat - 1)} aria-label="Previous moment">↑</button>
            <button type="button" onClick={() => goToBeat(activeBeat + 1)} aria-label="Next moment">↓</button>
          </nav>
        </div>
      </div>

      <div className="pagination-rail" aria-hidden="true">
        {BEATS.map((beat) => <section className="scroll-page" key={beat} />)}
      </div>

    </main>
  );
}
