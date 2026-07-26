import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { PHOTOS } from '../data/content';

const AUTO_MS = 4500;

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

  const arrowStyle = (side: 'right' | 'left'): React.CSSProperties => ({
    position: 'absolute',
    top: '50%',
    [side]: -16,
    transform: 'translateY(-50%)',
    width: 42,
    height: 42,
    borderRadius: '50%',
    border: '1px solid var(--line)',
    background: 'var(--card)',
    color: 'var(--accent-deep)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'var(--shadow-card)',
    zIndex: 2,
  });

  return (
    <section id="gallery" className="sec">
      <div className="wrap">
        <div className="sec-head center reveal">
          <h2>הרצאות וסדנאות</h2>
          <p>תיעוד מהרצאות, סדנאות וכנסים בתחום ה-AI</p>
        </div>

        <div className="reveal" style={{ maxWidth: 820, margin: '0 auto', position: 'relative' }}>
          <div
            className="card"
            style={{ overflow: 'hidden', aspectRatio: '16 / 9', position: 'relative' }}
          >
            <img
              src={PHOTOS[current]}
              alt={`הרצאה ${current + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                opacity: fading ? 0 : 1,
                transition: 'opacity .22s ease',
              }}
            />
            <span
              style={{
                position: 'absolute',
                bottom: 12,
                insetInlineStart: 12,
                color: '#fff',
                fontSize: 12.5,
                fontWeight: 600,
                background: 'rgba(34,56,78,.55)',
                backdropFilter: 'blur(6px)',
                padding: '3px 10px',
                borderRadius: 999,
              }}
            >
              {current + 1} / {PHOTOS.length}
            </span>
          </div>

          <button onClick={() => step(-1)} style={arrowStyle('right')} aria-label="התמונה הקודמת">
            <ChevronRight size={18} />
          </button>
          <button onClick={() => step(1)} style={arrowStyle('left')} aria-label="התמונה הבאה">
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
