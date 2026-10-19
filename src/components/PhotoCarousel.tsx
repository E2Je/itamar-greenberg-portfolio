import { useEffect, useRef } from 'react';
import { PHOTOS } from '../data/content';
import LineDraw from './LineDraw';

/** כמה שניות לוקח לרצועה לעבור את כל התמונות פעם אחת */
const LOOP_SECONDS = 60;

/**
 * רצועת תמונות מההרצאות שנעה לאט לבד, ואפשר לגרור אותה ביד (אצבע או עכבר) או עם החצים במקלדת.
 * הרצועה משוכפלת כדי שהלולאה תהיה רציפה. התנועה האוטומטית נעצרת כשמחזיקים או כשהעכבר עליה,
 * בתנועה מופחתת, וכשבתפריט הנגישות בוחרים "עצירת אנימציות". הגרירה עובדת תמיד.
 */
export default function PhotoCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const strip = [...PHOTOS, ...PHOTOS];

  useEffect(() => {
    const viewport = viewportRef.current, track = trackRef.current;
    if (!viewport || !track) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let x = 0, velocity = 0, dragging = false, hovering = false, lastX = 0, lastT = 0, raf = 0, prev = performance.now();
    const half = () => track.scrollWidth / 2;
    const wrapX = () => { const h = half(); if (h > 0) x = ((x % h) + h) % h; };
    const render = () => { track.style.transform = `translate3d(${x}px, 0, 0)`; };
    const stopped = () => reduce || document.documentElement.classList.contains('a11y-motion');

    const tick = (now: number) => {
      const dt = Math.min(now - prev, 64) / 1000;
      prev = now;
      if (!dragging) {
        if (Math.abs(velocity) > 5) {            // תאוצה אחרי שעוזבים
          x += velocity * dt;
          velocity *= Math.pow(.05, dt);
        } else if (!hovering && !stopped()) {    // תנועה אוטומטית איטית
          velocity = 0;
          x += (half() / LOOP_SECONDS) * dt;
        }
        wrapX();
        render();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const down = (e: PointerEvent) => {
      dragging = true; velocity = 0; lastX = e.clientX; lastT = e.timeStamp;
      viewport.setPointerCapture(e.pointerId);
      viewport.classList.add('dragging');
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX, dt = Math.max(e.timeStamp - lastT, 1);
      x += dx;
      velocity = (dx / dt) * 1000;
      lastX = e.clientX; lastT = e.timeStamp;
      wrapX(); render();
    };
    const up = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      if (e.timeStamp - lastT > 80) velocity = 0;  // החזיק בלי לזוז - בלי תאוצה
      viewport.classList.remove('dragging');
    };
    const key = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      e.preventDefault();
      velocity = (e.key === 'ArrowRight' ? 1 : -1) * 1400;
    };
    const enter = (e: PointerEvent) => { if (e.pointerType === 'mouse') hovering = true; };
    const leave = () => { hovering = false; };

    viewport.addEventListener('pointerdown', down);
    viewport.addEventListener('pointermove', move);
    viewport.addEventListener('pointerup', up);
    viewport.addEventListener('pointercancel', up);
    viewport.addEventListener('pointerenter', enter);
    viewport.addEventListener('pointerleave', leave);
    viewport.addEventListener('keydown', key);
    return () => {
      cancelAnimationFrame(raf);
      viewport.removeEventListener('pointerdown', down);
      viewport.removeEventListener('pointermove', move);
      viewport.removeEventListener('pointerup', up);
      viewport.removeEventListener('pointercancel', up);
      viewport.removeEventListener('pointerenter', enter);
      viewport.removeEventListener('pointerleave', leave);
      viewport.removeEventListener('keydown', key);
    };
  }, []);

  return (
    <section id="gallery" className="sec gallery">
      <style>{`
        .gallery { background: var(--paper-2); overflow: hidden; }
        .gal-head { margin-bottom: clamp(28px, 3.4vw, 44px); }
        .gal-sub { color: var(--ink); font-size: clamp(18px, 1.7vw, 21px); margin: 10px 0 0; }
        /* גרירה אופקית ביד; גלילה אנכית של הדף ממשיכה לעבוד */
        .gal-viewport { touch-action: pan-y; cursor: grab; user-select: none; -webkit-user-select: none; }
        .gal-viewport.dragging { cursor: grabbing; }
        .gal-viewport:focus-visible { outline: 3px solid var(--blue); outline-offset: 4px; }
        .gal-track { display: flex; gap: 16px; width: max-content; will-change: transform; }
        .gal-track img { height: clamp(220px, 28vw, 380px); width: auto; flex-shrink: 0; object-fit: cover; pointer-events: none; }
      `}</style>

      <div className="wrap gal-head sec-head reveal">
        <div className="sec-head-text">
          <span className="eyebrow">גלריה</span>
          <h2 data-fit>הרצאות וסדנאות</h2>
          <p className="gal-sub">תיעוד מהרצאות, סדנאות וכנסים בתחום ה-AI</p>
        </div>
        <LineDraw viewBox="0 0 170 130" label="מיקרופון על במה" className="sec-draw">
          <path className="lf" d="M66 12 Q66 4 74 4 H96 Q104 4 104 12 V52 Q104 60 96 60 H74 Q66 60 66 52 Z" />
          <path className="ld" d="M66 12 Q66 4 74 4 H96 Q104 4 104 12 V52 Q104 60 96 60 H74 Q66 60 66 52 Z M74 20 H96 M74 32 H96" />
          <path className="ld" d="M54 44 Q54 80 85 80 Q116 80 116 44 M85 80 V104 M60 106 H110" />
          <path className="ld" d="M16 40 Q4 52 16 64 M30 32 Q12 52 30 72 M154 40 Q166 52 154 64 M140 32 Q158 52 140 72" stroke="#4A90D9" />
          <path className="ld" d="M20 124 H150" />
        </LineDraw>
      </div>

      <div className="gal-viewport" ref={viewportRef} tabIndex={0} role="region"
           aria-label="תמונות מהרצאות וסדנאות. אפשר לגרור, או להזיז עם החצים במקלדת">
        <div className="gal-track" ref={trackRef}>
          {strip.map((src, i) => (
            <img
              key={`${src}-${i}`}
              src={src}
              alt={i < PHOTOS.length ? `הרצאה ${i + 1}` : ''}
              aria-hidden={i >= PHOTOS.length}
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
