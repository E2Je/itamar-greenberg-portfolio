import { useRef, useState, useEffect } from 'react';
import { Play, PlayCircle } from 'lucide-react';
import { PLAYLISTS } from '../data/content';

function NoiseTexture({ id }: { id: string }) {
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.08 }}>
      <filter id={`noise-${id}`}>
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter={`url(#noise-${id})`} />
    </svg>
  );
}

function PlaylistCard({
  title, description, href, gradient, accent, index, featured,
}: {
  title: string; description: string; href: string;
  gradient: string; accent: string; index: number; featured: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setTimeout(() => setVisible(true), index * 100);
    }, { threshold: 0.15 });
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
        display: 'block',
        textDecoration: 'none',
        borderRadius: '1.5rem',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(36px) scale(0.97)',
        transition: `opacity 0.55s ease ${index * 0.1}s, transform 0.55s ease ${index * 0.1}s, box-shadow 0.3s ease`,
        boxShadow: hovered
          ? `0 24px 64px ${accent}55, 0 0 0 2px ${accent}88`
          : `0 8px 32px ${accent}22`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Gradient bg */}
      <div
        className={`bg-gradient-to-br ${gradient}`}
        style={{
          position: 'absolute', inset: 0,
          transition: 'transform 0.4s ease',
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
        }}
      />

      {/* Noise texture */}
      <NoiseTexture id={`pl-${index}`} />

      {/* Grid lines */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.07 }}>
        <defs>
          <pattern id={`grid-${index}`} width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${index})`} />
      </svg>

      {/* Glow orb */}
      <div style={{
        position: 'absolute',
        top: hovered ? '20%' : '30%',
        right: hovered ? '15%' : '20%',
        width: featured ? 200 : 140,
        height: featured ? 200 : 140,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.15)',
        filter: 'blur(40px)',
        transition: 'all 0.5s ease',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 1,
        padding: featured ? 'clamp(1.5rem,4vw,2.5rem)' : '1.5rem',
        height: '100%',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        minHeight: featured ? 280 : 200,
      }}>
        {/* Top row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          {/* YouTube badge */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 5,
            background: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(8px)',
            borderRadius: 999,
            padding: '4px 10px',
            color: 'white',
            fontSize: '0.72rem',
            fontWeight: 700,
          }}>
            <PlayCircle size={13} />
            <span>YouTube</span>
          </div>

          {/* Play button */}
          <div style={{
            width: hovered ? 56 : 48,
            height: hovered ? 56 : 48,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.25)',
            backdropFilter: 'blur(12px)',
            border: '2px solid rgba(255,255,255,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.3s ease',
            boxShadow: hovered ? '0 0 30px rgba(255,255,255,0.4)' : 'none',
          }}>
            <Play
              size={hovered ? 22 : 18}
              fill="white" stroke="none"
              style={{ marginRight: -2, transition: 'all 0.3s ease' }}
            />
          </div>
        </div>

        {/* Title + description */}
        <div>
          <h3 style={{
            color: 'white',
            fontSize: featured ? 'clamp(1.4rem,3.5vw,2rem)' : 'clamp(1.1rem,2.5vw,1.35rem)',
            fontWeight: 900,
            lineHeight: 1.2,
            marginBottom: '0.5rem',
            textShadow: '0 2px 12px rgba(0,0,0,0.25)',
          }}>
            {title}
          </h3>
          <p style={{
            color: 'rgba(255,255,255,0.82)',
            fontSize: '0.88rem',
            lineHeight: 1.5,
            fontWeight: 400,
          }}>
            {description}
          </p>

          {/* CTA bar */}
          <div style={{
            marginTop: '1.2rem',
            display: 'flex', alignItems: 'center', gap: 8,
            transform: hovered ? 'translateY(0)' : 'translateY(6px)',
            opacity: hovered ? 1 : 0.75,
            transition: 'all 0.3s ease',
          }}>
            <div style={{
              flex: 1, height: 1.5,
              background: 'rgba(255,255,255,0.4)',
              borderRadius: 999,
            }} />
            <span style={{
              color: 'white', fontSize: '0.82rem', fontWeight: 700,
              whiteSpace: 'nowrap',
            }}>
              לצפייה ←
            </span>
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
        <h2 className="gradient-text" style={{ fontSize: 'clamp(1.4rem,4vw,2rem)', fontWeight: 900, display: 'inline-block' }}>
          סרטוני YouTube
        </h2>
        <div style={{ height: 3, width: 60, background: 'linear-gradient(90deg,#6366f1,#06b6d4)', borderRadius: 999, margin: '0.5rem auto 0' }} />
        <p style={{ color: '#6b7280', marginTop: '0.6rem', fontSize: '0.9rem' }}>
          בחרו פלייליסט וצאו לדרך
        </p>
      </div>

      {/* Bento grid */}
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        {/* Desktop: featured left + 2 stacked right / Mobile: stack all */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gridTemplateRows: 'auto',
          gap: '1.25rem',
        }}>
          {/* Featured — spans 2 rows on desktop */}
          <div style={{
            gridRow: 'span 2',
          }}>
            <PlaylistCard {...featured} index={0} />
          </div>

          {rest.map((p, i) => (
            <PlaylistCard key={p.id} {...p} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
