import { useRef, useState, useEffect } from 'react';
import { PERSONAL } from '../data/content';

const BIO_TEXT = 'נשוי באושר, אבא, אח ומרכז תחום דיגיטל בבית חולים, מרצה לבינה מלאכותית וחשיבה יצירתית, אוהב ללמוד וללמד על דברים חדשים ואוהב לפתור בעיות.';

export default function About() {
  const [visible, setVisible] = useState(false);
  const [imgHovered, setImgHovered] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const base = import.meta.env.BASE_URL;

  return (
    <section
      id="about"
      ref={ref}
      className={`fade-section${visible ? ' visible' : ''}`}
      style={{ padding: '5rem 1.5rem', position: 'relative', zIndex: 1 }}
    >
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="gradient-text" style={{ fontSize: 'clamp(1.4rem,4vw,2rem)', fontWeight: 900, display: 'inline-block' }}>
            נעים להכיר
          </h2>
          <div style={{ height: 3, width: 50, background: 'linear-gradient(90deg,#6366f1,#06b6d4)', borderRadius: 999, margin: '0.5rem auto 0' }} />
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'center', justifyContent: 'center' }}>

          {/* Photo side */}
          <div
            style={{ position: 'relative', flexShrink: 0 }}
            onMouseEnter={() => setImgHovered(true)}
            onMouseLeave={() => setImgHovered(false)}
          >
            {/* Rotating gradient ring */}
            <div style={{
              position: 'absolute', inset: -6,
              borderRadius: '50%',
              background: 'conic-gradient(from 0deg, #6366f1, #8b5cf6, #06b6d4, #6366f1)',
              animation: 'spinRing 6s linear infinite',
              opacity: imgHovered ? 1 : 0.55,
              transition: 'opacity 0.4s ease',
            }} />
            {/* White gap */}
            <div style={{
              position: 'absolute', inset: -2,
              borderRadius: '50%',
              background: '#f9fafb',
            }} />
            {/* Photo */}
            <div style={{
              position: 'relative',
              width: 220, height: 220,
              borderRadius: '50%',
              overflow: 'hidden',
              transform: imgHovered ? 'scale(1.04)' : 'scale(1)',
              transition: 'transform 0.45s cubic-bezier(0.34,1.56,0.64,1)',
            }}>
              <img
                src={`${base}profile.jpg`}
                alt="איתמר גרינברג"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
              />
              {/* Subtle gradient overlay on hover */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, rgba(99,102,241,0.18) 0%, transparent 60%)',
                opacity: imgHovered ? 1 : 0,
                transition: 'opacity 0.4s ease',
              }} />
            </div>

          </div>

          {/* Text side */}
          <div style={{ flex: 1, minWidth: 260 }}>
            <h3 style={{
              fontSize: 'clamp(1.3rem,3vw,1.7rem)', fontWeight: 900,
              color: '#111827', marginBottom: '0.3rem',
            }}>
              {PERSONAL.name}
            </h3>
            <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '1.6rem' }}>
              {PERSONAL.title}
            </p>

            {/* Bio text */}
            <p style={{
              color: '#4b5563',
              fontSize: 'clamp(0.95rem,2vw,1.05rem)',
              lineHeight: 1.85,
              maxWidth: 440,
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(14px)',
              transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s',
            }}>
              {BIO_TEXT}
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spinRing {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
