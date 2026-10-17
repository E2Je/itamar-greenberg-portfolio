import { useState } from 'react';
import { PHOTOS } from '../data/content';
import LineDraw from './LineDraw';

/**
 * במקום שורת הלוגואים של J Scott ("I have spoken with hundreds of groups"): רצועת תמונות מההרצאות
 * שנעה לאט לאורך המסך (התמונה הנעה של הדף). הרצועה משוכפלת כדי שהלולאה תהיה רציפה;
 * בתנועה מופחתת היא עומדת וניתנת לגלילה ביד.
 */
export default function PhotoCarousel() {
  const [paused, setPaused] = useState(false);
  const strip = [...PHOTOS, ...PHOTOS];
  return (
    <section id="gallery" className="sec gallery">
      <style>{`
        .gallery { background: var(--paper-2); overflow: hidden; }
        .gal-head { margin-bottom: clamp(28px, 3.4vw, 44px); }
        .gal-sub { color: var(--ink); font-size: clamp(18px, 1.7vw, 21px); margin: 10px 0 0; }
        .gal-track { display: flex; gap: 16px; width: max-content; animation: drift 60s linear infinite; }
        .gal-track:hover, .gal.paused .gal-track { animation-play-state: paused; }
        .gal-pause { display: block; margin: 14px auto 0; font: inherit; font-family: var(--ff-title); font-size: 15px; color: var(--blue-ink);
                     background: var(--white); border: 0; border-radius: 999px; padding: 10px 20px; min-height: 44px; cursor: pointer; }
        @media (prefers-reduced-motion: reduce) { .gal-pause { display: none; } }
        .gal-track img { height: clamp(220px, 28vw, 380px); width: auto; flex-shrink: 0; object-fit: cover; }
        @keyframes drift { to { transform: translateX(50%); } }
        @media (prefers-reduced-motion: reduce) {
          .gal-viewport { overflow-x: auto; }
          .gal-track { animation: none; }
        }
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

      <div className={`gal-viewport gal${paused ? ' paused' : ''}`}>
        <div className="gal-track">
          {strip.map((src, i) => (
            <img
              key={`${src}-${i}`}
              src={src}
              alt={i < PHOTOS.length ? `הרצאה ${i + 1}` : ''}
              aria-hidden={i >= PHOTOS.length}
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      </div>
      <button type="button" className="gal-pause" aria-pressed={paused} onClick={() => setPaused(v => !v)}>
        {paused ? 'להמשיך את התנועה' : 'לעצור את התנועה'}
      </button>
    </section>
  );
}
