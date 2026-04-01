import { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { PHOTOS } from '../data/content';

export default function PhotoCarousel() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const startAuto = () => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => go('right'), 4500);
  };
  useEffect(() => { startAuto(); return () => { if (autoRef.current) clearInterval(autoRef.current); }; }, []);

  function go(dir: 'left' | 'right') {
    if (transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(c => dir === 'right' ? (c + 1) % PHOTOS.length : (c - 1 + PHOTOS.length) % PHOTOS.length);
      setTransitioning(false);
    }, 250);
    startAuto();
  }

  const BtnStyle = (side: 'right' | 'left') => ({
    position: 'absolute' as const,
    top: '50%', [side]: -18,
    transform: 'translateY(-50%)',
    width: 42, height: 42, borderRadius: '50%',
    border: '1.5px solid rgba(99,102,241,0.25)',
    background: 'rgba(255,255,255,0.88)',
    backdropFilter: 'blur(8px)',
    cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 4px 14px rgba(99,102,241,0.18)',
    transition: 'all 0.2s ease',
    color: '#6366f1',
    zIndex: 2,
  });

  return (
    <section
      id="gallery"
      ref={ref}
      className={`fade-section${visible ? ' visible' : ''}`}
      style={{ padding: '5rem 1.5rem', position: 'relative', zIndex: 1 }}
    >
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <h2 className="gradient-text" style={{ fontSize: 'clamp(1.4rem,4vw,2rem)', fontWeight: 900, display: 'inline-block' }}>
          הרצאות וסדנאות
        </h2>
        <div style={{ height: 3, width: 50, background: 'linear-gradient(90deg,#6366f1,#06b6d4)', borderRadius: 999, margin: '0.5rem auto 0' }} />
        <p style={{ color: '#9ca3af', marginTop: '0.6rem', fontSize: '0.88rem' }}>
          תיעוד מהרצאות, סדנאות וכנסים בתחום ה-AI
        </p>
      </div>

      <div style={{ maxWidth: 780, margin: '0 auto', position: 'relative', paddingTop: '1.5rem' }}>
        {/* Main image */}
        <div className="glass-card" style={{ borderRadius: '1.5rem', overflow: 'hidden', aspectRatio: '16/9', position: 'relative' }}>
          <img
            key={current}
            src={PHOTOS[current]}
            alt={`הרצאה ${current + 1}`}
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center top',
              opacity: transitioning ? 0 : 1,
              transition: 'opacity 0.25s ease',
            }}
          />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)',
          }} />
          <div style={{
            position: 'absolute', bottom: 14, left: 14,
            color: 'white', fontSize: '0.78rem', fontWeight: 600,
            background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(6px)',
            padding: '2px 9px', borderRadius: 999,
          }}>
            {current + 1} / {PHOTOS.length}
          </div>
        </div>

        {/* Arrows */}
        <button
          onClick={() => go('left')}
          style={BtnStyle('right')}
          onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(135deg,#6366f1,#8b5cf6)'; e.currentTarget.style.color = 'white'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.88)'; e.currentTarget.style.color = '#6366f1'; }}
        >
          <ChevronRight size={18} />
        </button>
        <button
          onClick={() => go('right')}
          style={BtnStyle('left')}
          onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(135deg,#6366f1,#8b5cf6)'; e.currentTarget.style.color = 'white'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.88)'; e.currentTarget.style.color = '#6366f1'; }}
        >
          <ChevronLeft size={18} />
        </button>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: '1rem' }}>
          {PHOTOS.map((_, i) => (
            <button
              key={i}
              onClick={() => { if (!transitioning) { setTransitioning(true); setTimeout(() => { setCurrent(i); setTransitioning(false); }, 250); startAuto(); } }}
              style={{
                width: i === current ? 22 : 8, height: 8, borderRadius: 999,
                border: 'none', cursor: 'pointer', padding: 0,
                background: i === current ? 'linear-gradient(90deg,#6366f1,#8b5cf6)' : 'rgba(99,102,241,0.22)',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
