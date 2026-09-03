'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

import { BEATS } from '@/src/lib/progress.mjs';
import { pageIndexForProgress, resolveTheme, viewportMode } from '@/src/lib/experience.mjs';
import { SCENES } from '@/src/content/pitch.mjs';
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
    document.querySelector<HTMLElement>(`[data-page-index="${safeIndex}"]`)?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    });
  }, []);

  useLayoutEffect(() => {
    const shell = shellRef.current;
    const stage = stageRef.current;
    if (!shell || !stage || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const isPortrait = geometry.mode === 'portrait';
    let observer: IntersectionObserver | undefined;

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ paused: true, defaults: { ease: 'power3.inOut' } });
      const $ = gsap.utils.selector(stage);

      gsap.set($('.scene'), { autoAlpha: 0 });
      gsap.set($('.scene-cover'), { autoAlpha: 1 });
      gsap.set($('.cover-mark'), { autoAlpha: 1, scale: 1 });

      timeline.addLabel('cover', 0);
      timeline
        .to($('.cover-mark'), { scale: 1.42, y: -36, autoAlpha: 0, duration: 0.72 }, 0.18)
        .to($('.cover-rule'), { scaleX: 0, duration: 0.52, transformOrigin: 'right center' }, 0.2)
        .set($('.scene-cover'), { autoAlpha: 0 }, 0.94)
        .set($('.scene-era'), { autoAlpha: 1 }, 0.35)
        .fromTo($('.think-line .line-inner'), { yPercent: 120 }, { yPercent: 0, duration: 0.62, stagger: 0.07 }, 0.44)
        .addLabel('think', 1)
        .to($('.think-line--top'), { x: isPortrait ? 0 : -30, color: 'var(--muted)', duration: 0.58 }, 1.1)
        .to($('.think-word'), { yPercent: -120, autoAlpha: 0, duration: 0.5 }, 1.18)
        .fromTo($('.act-word'), { yPercent: 120, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.58 }, 1.26)
        .to($('.era-orbit'), { scale: 1, autoAlpha: 1, rotate: 180, duration: 0.72 }, 1.18)
        .fromTo($('.physical-statement .line-inner'), { yPercent: 120 }, { yPercent: 0, duration: 0.58, stagger: 0.06 }, 1.48)
        .addLabel('act', 2)
        .to($('.scene-era'), { xPercent: isPortrait ? 0 : -16, yPercent: isPortrait ? -10 : 0, autoAlpha: 0, duration: 0.64 }, 2.22)
        .set($('.scene-era'), { autoAlpha: 0 }, 2.9)
        .set($('.scene-europe'), { autoAlpha: 1 }, 2.38)
        .fromTo($('.europe-rule'), { scaleY: 0 }, { scaleY: 1, duration: 0.62 }, 2.42)
        .fromTo($('.science-line .line-inner'), { yPercent: 115 }, { yPercent: 0, duration: 0.62, stagger: 0.06 }, 2.52)
        .addLabel('science', 3)
        .to($('.science-lockup'), { x: isPortrait ? -54 : -110, autoAlpha: 0.16, duration: 0.6 }, 3.16)
        .fromTo($('.escape-line'), { scaleX: 0 }, { scaleX: 1, duration: 0.62 }, 3.16)
        .fromTo($('.companies-line .line-inner'), { xPercent: 110 }, { xPercent: 0, duration: 0.62, stagger: 0.05 }, 3.28)
        .addLabel('companies', 4)
        .to($('.companies-lockup'), { y: isPortrait ? -72 : -96, scale: isPortrait ? 0.82 : 0.74, transformOrigin: 'left top', duration: 0.62 }, 4.14)
        .fromTo($('.stay-line .line-inner'), { yPercent: 120 }, { yPercent: 0, duration: 0.7, stagger: 0.06 }, 4.28)
        .addLabel('stay', 5)
        .to($('.scene-europe'), { yPercent: -12, autoAlpha: 0, duration: 0.68 }, 5.18)
        .set($('.scene-europe'), { autoAlpha: 0 }, 5.9)
        .set($('.scene-worlds'), { autoAlpha: 1 }, 5.34)
        .fromTo($('.domain--left'), { x: isPortrait ? 0 : -130, y: isPortrait ? -100 : 0, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, duration: 0.64 }, 5.42)
        .fromTo($('.domain--right'), { x: isPortrait ? 0 : 130, y: isPortrait ? 100 : 0, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, duration: 0.64 }, 5.42)
        .fromTo($('.world-axis'), { scaleX: 0 }, { scaleX: 1, duration: 0.66 }, 5.5)
        .addLabel('domains', 6)
        .to($('.domain--left'), { x: isPortrait ? 0 : 236, y: isPortrait ? 185 : 0, duration: 0.72 }, 6.18)
        .to($('.domain--right'), { x: isPortrait ? 0 : -236, y: isPortrait ? -185 : 0, duration: 0.72 }, 6.18)
        .fromTo($('.convergence-orb'), { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.72 }, 6.28)
        .to($('.domain-title'), { letterSpacing: '0.02em', duration: 0.54 }, 6.3)
        .addLabel('convergence', 7)
        .to($('.domain'), { scale: 0.44, autoAlpha: 0, duration: 0.58 }, 7.16)
        .to($('.world-axis'), { scaleX: 0, duration: 0.44 }, 7.2)
        .to($('.convergence-orb'), { scale: isPortrait ? 7.8 : 6.4, autoAlpha: 0.08, duration: 0.78 }, 7.16)
        .fromTo($('.future-line .line-inner'), { yPercent: 120 }, { yPercent: 0, duration: 0.68, stagger: 0.07 }, 7.3)
        .addLabel('future', 8);

      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const initialBeat = pageIndexForProgress(window.scrollY / maxScroll, BEATS.length);
      beatRef.current = initialBeat;
      setActiveBeat(initialBeat);
      timeline.time(initialBeat);

      const settleAt = (index: number) => {
        if (index === beatRef.current) return;
        beatRef.current = index;
        setActiveBeat(index);
        timeline.tweenTo(BEATS[index], {
          duration: 0.82,
          ease: 'power3.inOut',
          overwrite: true,
        });
      };

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) settleAt(Number((entry.target as HTMLElement).dataset.pageIndex));
          });
        },
        { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
      );

      document.querySelectorAll<HTMLElement>('.scroll-page').forEach((page) => observer?.observe(page));
    }, stage);

    return () => {
      observer?.disconnect();
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
    return () => window.removeEventListener('keydown', onKeyDown);
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

          <section className="scene scene-cover" aria-label="PONT Kinetic Manifesto">
            <PontMark className="cover-mark" />
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
          </section>

          <section className="reduced-summary" aria-label="PONT manifesto summary">
            {SCENES.map((scene) => <article key={scene.id}><span>{scene.index}</span><p>{scene.statements.at(-1)}</p></article>)}
          </section>

          <nav className="pagination-dots" aria-label="Manifesto pages">
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

          <nav className="stage-controls" aria-label="Manifesto navigation">
            <button type="button" onClick={() => goToBeat(activeBeat - 1)} aria-label="Previous moment">↑</button>
            <button type="button" onClick={() => goToBeat(activeBeat + 1)} aria-label="Next moment">↓</button>
          </nav>
        </div>
      </div>

      <div className="pagination-rail" aria-hidden="true">
        {BEATS.map((beat, index) => <section className="scroll-page" data-page-index={index} key={beat} />)}
      </div>
    </main>
  );
}
