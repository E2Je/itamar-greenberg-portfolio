import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronRight, ChevronLeft, Camera } from 'lucide-react';
import { PHOTOS } from '../data/content';

const AUTO_MS = 5000;

export default function PhotoCarousel() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((next: number) => {
    setFading(true);
    setTimeout(() => {
      setCurrent((next + PHOTOS.length) % PHOTOS.length);
      setFading(false);
    }, 220);
  }, []);

  const restartAuto = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => setCurrent(c => (c + 1) % PHOTOS.length), AUTO_MS);
  }, []);

  useEffect(() => {
    restartAuto();
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [restartAuto]);

  const step = (delta: number) => { goTo(current + delta); restartAuto(); };

  return (
    <section id="gallery" className="sec">
      <style>{`
        .gallery-stage {
          position: relative;
          height: clamp(340px, 58vw, 540px);
          border-radius: var(--radius-card);
          overflow: hidden;
          background: var(--dusk);
          box-shadow: var(--shadow-card);
          border: 1px solid var(--line-soft);
        }
        /* עותק מטושטש של אותה תמונה ממלא את הרקע, כך שהתמונה עצמה
           נכנסת שלמה (contain) ולא נחתכת - התמונות כאן מעורבות,
           חלקן לרוחב וחלקן לאורך */
        .gallery-blur {
          position: absolute; inset: -8%;
          width: 116%; height: 116%;
          object-fit: cover;
          filter: blur(26px) saturate(1.25) brightness(.62);
          transform: scale(1.06);
        }
        .gallery-photo {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: contain;
          transition: opacity .22s ease;
        }
        .gallery-counter {
          position: absolute; bottom: 12px; inset-inline-start: 12px;
          color: #fff; font-size: 12.5px; font-weight: 600;
          background: rgba(34,56,78,.55);
          backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
          padding: 3px 10px; border-radius: 999px;
        }
        .gallery-arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 42px; height: 42px; border-radius: 50%;
          border: 1px solid var(--line); background: var(--card);
          color: var(--accent-deep);
          display: flex; align-items: center; justify-content: center;
          box-shadow: var(--shadow-card); z-index: 2;
          transition: background .2s, color .2s;
        }
        .gallery-arrow:hover { background: var(--accent-deep); color: #fff; border-color: transparent; }
        .gallery-arrow.prev { inset-inline-end: -14px; }
        .gallery-arrow.next { inset-inline-start: -14px; }
        @media (max-width: 560px) {
          .gallery-arrow.prev { inset-inline-end: 8px; }
          .gallery-arrow.next { inset-inline-start: 8px; }
        }
      `}</style>

      <div className="wrap">
        <div className="sec-head center reveal">
          <span className="eyebrow">
            <Camera size={13} style={{ verticalAlign: '-2px', marginInlineEnd: 5 }} />
            גלריה
          </span>
          <h2>הרצאות וסדנאות</h2>
          <p>תיעוד מהרצאות, סדנאות וכנסים בתחום ה-AI</p>
        </div>

        <div className="reveal" style={{ maxWidth: 860, margin: '0 auto', position: 'relative' }}>
          <div className="gallery-stage">
            <img className="gallery-blur" src={PHOTOS[current]} alt="" aria-hidden="true" />
            <img
              className="gallery-photo"
              src={PHOTOS[current]}
              alt={`הרצאה ${current + 1}`}
              style={{ opacity: fading ? 0 : 1 }}
            />
            <span className="gallery-counter">
              {current + 1} / {PHOTOS.length}
            </span>
          </div>

          <button className="gallery-arrow prev" onClick={() => step(-1)} aria-label="התמונה הקודמת">
            <ChevronRight size={18} />
          </button>
          <button className="gallery-arrow next" onClick={() => step(1)} aria-label="התמונה הבאה">
            <ChevronLeft size={18} />
          </button>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 16 }}>
            {PHOTOS.map((_, i) => (
              <button
                key={i}
                onClick={() => { goTo(i); restartAuto(); }}
                aria-label={`מעבר לתמונה ${i + 1}`}
                aria-current={i === current}
                style={{
                  width: i === current ? 24 : 8,
                  height: 8,
                  borderRadius: 999,
                  border: 'none',
                  padding: 0,
                  background: i === current ? 'var(--accent)' : 'var(--line)',
                  transition: 'width .3s ease, background .3s ease',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
