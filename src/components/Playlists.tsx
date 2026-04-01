import { useRef, useState, useEffect } from 'react';
import { Play, PlayCircle, ExternalLink } from 'lucide-react';
import { PLAYLISTS } from '../data/content';

function GridLines({ id }: { id: string }) {
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.09, pointerEvents: 'none' }}>
      <defs>
        <pattern id={`grid-${id}`} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.7" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#grid-${id})`} />
    </svg>
  );
}

function PlaylistCard({ title, description, href, gradient, accent, index, featured }: typeof PLAYLISTS[0] & { index: number }) {
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
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        textDecoration: 'none',
        borderRadius: '1.25rem',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        height: '100%',
        minHeight: featured ? 300 : 190,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.5s ease ${index * 0.08}s, transform 0.5s ease ${index * 0.08}s, box-shadow 0.3s ease`,
        boxShadow: hovered
          ? `0 24px 60px ${accent}55, 0 0 0 1.5px ${accent}77`
          : `0 6px 24px rgba(0,0,0,0.25)`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Gradient bg */}
      <div
        className={`bg-gradient-to-br ${gradient}`}
        style={{
          position: 'absolute', inset: 0,
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.5s ease',
        }}
      />
      <GridLines id={`pl-${index}`} />

      {/* Glow */}
      <div style={{
        position: 'absolute',
        top: hovered ? '8%' : '18%', right: hovered ? '8%' : '15%',
        width: featured ? 200 : 110, height: featured ? 200 : 110,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.1)',
        filter: 'blur(45px)',
        transition: 'all 0.5s ease',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 1,
        padding: featured ? 'clamp(1.6rem,3.5vw,2.4rem)' : '1.4rem',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', height: '100%', gap: '0.8rem',
      }}>
        {/* Top */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 5,
            background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(8px)',
            borderRadius: 999, padding: '3px 10px',
            color: 'rgba(255,255,255,0.88)', fontSize: '0.68rem', fontWeight: 700,
          }}>
            <PlayCircle size={11} />
            YouTube
          </div>
          <div style={{
            width: hovered ? 52 : 44, height: hovered ? 52 : 44,
            borderRadius: '50%',
            background: hovered ? 'rgba(255,255,255,0.28)' : 'rgba(255,255,255,0.16)',
            backdropFilter: 'blur(12px)',
            border: `2px solid rgba(255,255,255,${hovered ? 0.65 : 0.35})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.3s ease',
            boxShadow: hovered ? '0 0 30px rgba(255,255,255,0.3)' : 'none',
            flexShrink: 0,
          }}>
            <Play size={hovered ? 20 : 16} fill="white" stroke="none" style={{ marginRight: -2, transition: 'all 0.3s ease' }} />
          </div>
        </div>

        {/* Bottom */}
        <div>
          <h3 style={{
            color: 'white',
            fontSize: featured ? 'clamp(1.3rem,3vw,1.9rem)' : 'clamp(1rem,2.5vw,1.2rem)',
            fontWeight: 900, lineHeight: 1.2, marginBottom: '0.4rem',
            textShadow: '0 2px 14px rgba(0,0,0,0.3)',
          }}>
            {title}
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.82rem', lineHeight: 1.5 }}>
            {description}
          </p>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6, marginTop: '1rem',
            opacity: hovered ? 1 : 0.65, transition: 'opacity 0.3s',
          }}>
            <span style={{ color: 'white', fontWeight: 700, fontSize: '0.85rem' }}>לצפייה</span>
            <div style={{ height: 1.5, width: 28, background: 'rgba(255,255,255,0.5)', borderRadius: 999 }} />
            <span style={{ color: 'white' }}>←</span>
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
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.06 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const [featured, ...rest] = PLAYLISTS;

  return (
    <section
      id="videos"
      ref={ref}
      className={`fade-section${visible ? ' visible' : ''}`}
      style={{
        padding: '5rem 1.5rem',
        position: 'relative', zIndex: 1,
        background: 'linear-gradient(180deg, #0a0a12 0%, #0f0f1e 100%)',
      }}
    >
      {/* Title row */}
      <div style={{
        maxWidth: 960, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '1rem',
        marginBottom: '2.5rem',
      }}>
        <div>
          <h2 style={{ color: 'white', fontSize: 'clamp(1.5rem,4vw,2.2rem)', fontWeight: 900, margin: 0 }}>
            הדרכות ותכנים
          </h2>
          <div style={{ height: 3, width: 50, background: 'linear-gradient(90deg,#6366f1,#06b6d4)', borderRadius: 999, marginTop: 8 }} />
        </div>
        <a
          href="https://www.youtube.com/@itamargreenberg"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            color: '#a5b4fc', textDecoration: 'none',
            fontSize: '0.88rem', fontWeight: 600,
            border: '1px solid rgba(165,180,252,0.25)',
            borderRadius: 999, padding: '6px 14px',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(165,180,252,0.1)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
        >
          <ExternalLink size={13} />
          ערוץ YouTube
        </a>
      </div>

      {/* Bento grid */}
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <style>{`
          .bento-grid {
            display: grid;
            gap: 1rem;
            grid-template-columns: 1fr;
            grid-template-areas: "feat" "s1" "s2";
          }
          @media (min-width: 640px) {
            .bento-grid {
              grid-template-columns: 1fr 1.6fr;
              grid-template-rows: 1fr 1fr;
              grid-template-areas: "s1 feat" "s2 feat";
              min-height: 380px;
            }
          }
          .bento-feat { grid-area: feat; }
          .bento-s1   { grid-area: s1; }
          .bento-s2   { grid-area: s2; }
        `}</style>
        <div className="bento-grid">
          <div className="bento-feat"><PlaylistCard {...featured} index={0} /></div>
          {rest.map((p, i) => (
            <div key={p.id} className={`bento-s${i + 1}`}>
              <PlaylistCard {...p} index={i + 1} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
