import { useRef, useState, useEffect } from 'react';
import { Play, PlayCircle } from 'lucide-react';
import { PLAYLISTS } from '../data/content';

function NoiseTexture({ id }: { id: string }) {
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.07, pointerEvents: 'none' }}>
      <filter id={`noise-${id}`}>
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter={`url(#noise-${id})`} />
    </svg>
  );
}

function GridLines({ id }: { id: string }) {
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.08, pointerEvents: 'none' }}>
      <defs>
        <pattern id={`grid-${id}`} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.7" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#grid-${id})`} />
    </svg>
  );
}

function PlaylistCard({
  title, description, href, gradient, accent, index, featured,
}: typeof PLAYLISTS[0] & { index: number }) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setTimeout(() => setVisible(true), index * 90);
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [index]);

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        textDecoration: 'none',
        borderRadius: '1.5rem',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        height: '100%',
        minHeight: featured ? 320 : 200,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(32px) scale(0.97)',
        transition: `opacity 0.55s ease ${index * 0.1}s, transform 0.55s ease ${index * 0.1}s, box-shadow 0.3s ease`,
        boxShadow: hovered
          ? `0 28px 70px ${accent}66, 0 0 0 2px ${accent}99`
          : `0 8px 30px ${accent}28`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Gradient background */}
      <div
        className={`bg-gradient-to-br ${gradient}`}
        style={{
          position: 'absolute', inset: 0,
          transform: hovered ? 'scale(1.06)' : 'scale(1)',
          transition: 'transform 0.5s ease',
        }}
      />

      <NoiseTexture id={`pl-${index}`} />
      <GridLines id={`pl-${index}`} />

      {/* Glow orb */}
      <div style={{
        position: 'absolute',
        top: hovered ? '10%' : '20%',
        right: hovered ? '10%' : '15%',
        width: featured ? 220 : 120,
        height: featured ? 220 : 120,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.12)',
        filter: 'blur(50px)',
        transition: 'all 0.5s ease',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 1,
        padding: featured ? 'clamp(1.8rem,4vw,2.8rem)' : '1.6rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        gap: '1rem',
      }}>
        {/* Top: badge + play */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 5,
            background: 'rgba(0,0,0,0.28)',
            backdropFilter: 'blur(8px)',
            borderRadius: 999,
            padding: '4px 11px',
            color: 'rgba(255,255,255,0.9)',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: 0.3,
          }}>
            <PlayCircle size={12} />
            <span>YouTube</span>
          </div>

          {/* Pulsing play button */}
          <div style={{
            width: hovered ? 58 : 48,
            height: hovered ? 58 : 48,
            borderRadius: '50%',
            background: hovered ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.18)',
            backdropFilter: 'blur(12px)',
            border: `2px solid rgba(255,255,255,${hovered ? 0.7 : 0.4})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.3s ease',
            boxShadow: hovered ? '0 0 40px rgba(255,255,255,0.35)' : 'none',
            flexShrink: 0,
          }}>
            <Play
              size={hovered ? 22 : 18}
              fill="white" stroke="none"
              style={{ marginRight: -2, transition: 'all 0.3s ease' }}
            />
          </div>
        </div>

        {/* Bottom: title + desc + CTA */}
        <div>
          <h3 style={{
            color: 'white',
            fontSize: featured ? 'clamp(1.5rem,3.5vw,2.2rem)' : 'clamp(1.1rem,2.5vw,1.3rem)',
            fontWeight: 900,
            lineHeight: 1.2,
            marginBottom: '0.5rem',
            textShadow: '0 2px 16px rgba(0,0,0,0.3)',
          }}>
            {title}
          </h3>

          <p style={{
            color: 'rgba(255,255,255,0.78)',
            fontSize: featured ? '0.95rem' : '0.83rem',
            lineHeight: 1.55,
          }}>
            {description}
          </p>

          {/* CTA */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            marginTop: '1.2rem',
            transform: hovered ? 'translateX(-4px)' : 'translateX(0)',
            transition: 'transform 0.3s ease',
          }}>
            <span style={{
              color: 'white', fontWeight: 800,
              fontSize: featured ? '0.95rem' : '0.82rem',
            }}>
              לצפייה
            </span>
            <div style={{
              height: 1.5, flex: 1, maxWidth: 40,
              background: 'rgba(255,255,255,0.5)',
              borderRadius: 999,
              transform: hovered ? 'scaleX(1.5)' : 'scaleX(1)',
              transformOrigin: 'right',
              transition: 'transform 0.3s ease',
            }} />
            <span style={{ color: 'white', fontSize: '1.1rem' }}>←</span>
          </div>
        </div>
      </div>
    </a>
  );
}

export default function Playlists() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const [featured, ...rest] = PLAYLISTS;

  return (
    <section
      ref={ref}
      className={`fade-section${visible ? ' visible' : ''}`}
      style={{ padding: '4rem 1.5rem 5rem', position: 'relative', zIndex: 1 }}
    >
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h2 className="gradient-text" style={{ fontSize: 'clamp(1.5rem,4vw,2.2rem)', fontWeight: 900, display: 'inline-block' }}>
          סרטוני YouTube
        </h2>
        <div style={{ height: 3, width: 60, background: 'linear-gradient(90deg,#6366f1,#06b6d4)', borderRadius: 999, margin: '0.5rem auto 0' }} />
        <p style={{ color: '#6b7280', marginTop: '0.6rem', fontSize: '0.9rem' }}>בחרו פלייליסט וצאו לדרך</p>
      </div>

      {/* Bento grid */}
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        {/*
          CSS grid-template-areas:
          Desktop: featured on right (RTL), 2 small on left stacked
          Mobile: all stacked
        */}
        <style>{`
          .bento-grid {
            display: grid;
            gap: 1.2rem;
            grid-template-columns: 1fr;
            grid-template-areas:
              "feat"
              "s1"
              "s2";
          }
          @media (min-width: 640px) {
            .bento-grid {
              grid-template-columns: 1fr 1.7fr;
              grid-template-rows: 1fr 1fr;
              grid-template-areas:
                "s1 feat"
                "s2 feat";
            }
          }
          .bento-feat { grid-area: feat; }
          .bento-s1   { grid-area: s1; }
          .bento-s2   { grid-area: s2; }
        `}</style>

        <div className="bento-grid" style={{ minHeight: 420 }}>
          <div className="bento-feat" style={{ minHeight: 320 }}>
            <PlaylistCard {...featured} index={0} />
          </div>
          {rest.map((p, i) => (
            <div key={p.id} className={`bento-s${i + 1}`} style={{ minHeight: 190 }}>
              <PlaylistCard {...p} index={i + 1} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
