import { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { PHOTOS } from '../data/content';

export default function PhotoCarousel() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);
  const [animDir, setAnimDir] = useState<'left' | 'right' | null>(null);
  const ref = useRef<HTMLElement>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const startAuto = () => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => go('right'), 4000);
  };

  useEffect(() => { startAuto(); return () => { if (autoRef.current) clearInterval(autoRef.current); }; }, []);

  function go(dir: 'left' | 'right') {
    setAnimDir(dir);
    setTimeout(() => {
      setCurrent(c => dir === 'right' ? (c + 1) % PHOTOS.length : (c - 1 + PHOTOS.length) % PHOTOS.length);
      setAnimDir(null);
    }, 220);
    startAuto();
  }

  return (
    <section
      ref={ref}
      className={`fade-section${visible ? ' visible' : ''}`}
      style={{ padding: '4rem 1.5rem', position: 'relative', zIndex: 1 }}
    >
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h2 className="gradient-text" style={{ fontSize: 'clamp(1.4rem,4vw,2rem)', fontWeight: 900, display: 'inline-block' }}>
          מהרצאות שלי
        </h2>
        <div style={{ height: 3, width: 60, background: 'linear-gradient(90deg,#6366f1,#06b6d4)', borderRadius: 999, margin: '0.5rem auto 0' }} />
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative' }}>
        {/* Main photo */}
        <div
          className="glass-card"
          style={{
            borderRadius: '1.5rem',
            overflow: 'hidden',
            aspectRatio: '16/9',
            position: 'relative',
          }}
        >
          <img
            key={current}
            src={PHOTOS[current]}
            alt={`הרצאה ${current + 1}`}
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              opacity: animDir ? 0 : 1,
              transform: animDir === 'right' ? 'translateX(-20px)' : animDir === 'left' ? 'translateX(20px)' : 'translateX(0)',
              transition: 'opacity 0.22s ease, transform 0.22s ease',
            }}
          />

          {/* Gradient overlay bottom */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%',
            background: 'linear-gradient(to top, rgba(17,24,39,0.6), transparent)',
          }} />

          {/* Counter */}
          <div style={{
            position: 'absolute', bottom: 14, left: 14,
            color: 'white', fontSize: '0.8rem', fontWeight: 600,
            background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(8px)',
            padding: '3px 10px', borderRadius: 999,
          }}>
            {current + 1} / {PHOTOS.length}
          </div>
        </div>

        {/* Prev / Next buttons */}
        {[
          { dir: 'right' as const, side: 'right', Icon: ChevronLeft },
          { dir: 'left'  as const, side: 'left',  Icon: ChevronRight },
        ].map(({ dir, side, Icon }) => (
          <button
            key={dir}
            onClick={() => go(dir)}
            style={{
              position: 'absolute', top: '50%',
              [side]: -16,
              transform: 'translateY(-50%)',
              width: 40, height: 40,
              borderRadius: '50%',
              border: '1.5px solid rgba(99,102,241,0.3)',
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(8px)',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(99,102,241,0.2)',
              transition: 'all 0.2s ease',
              color: '#6366f1',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'linear-gradient(135deg,#6366f1,#8b5cf6)', e.currentTarget.style.color = 'white')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.85)', e.currentTarget.style.color = '#6366f1')}
          >
            <Icon size={18} />
          </button>
        ))}

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: '1rem' }}>
          {PHOTOS.map((_, i) => (
            <button
              key={i}
              onClick={() => { setAnimDir('right'); setTimeout(() => { setCurrent(i); setAnimDir(null); }, 220); startAuto(); }}
              style={{
                width: i === current ? 22 : 8, height: 8,
                borderRadius: 999,
                border: 'none', cursor: 'pointer',
                background: i === current
                  ? 'linear-gradient(90deg,#6366f1,#8b5cf6)'
                  : 'rgba(99,102,241,0.25)',
                transition: 'all 0.3s ease',
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
