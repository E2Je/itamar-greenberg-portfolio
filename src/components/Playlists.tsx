import { useRef, useState, useEffect } from 'react';
import { ExternalLink, PlayCircle } from 'lucide-react';
import { PLAYLISTS } from '../data/content';

const ACCENTS = [
  { from: '#06b6d4', to: '#3b82f6' },   // cyan → blue
  { from: '#a855f7', to: '#ec4899' },   // violet → pink
  { from: '#6366f1', to: '#8b5cf6' },   // indigo → violet
];

function PlaylistCard({ title, description, href, index }: typeof PLAYLISTS[0] & { index: number }) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const accent = ACCENTS[index % ACCENTS.length];

  // Extract playlist ID from href
  const playlistId = href.split('list=')[1] ?? '';
  const embedUrl = `https://www.youtube.com/embed/videoseries?list=${playlistId}&rel=0&modestbranding=1`;

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setTimeout(() => setVisible(true), index * 120);
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      style={{
        borderRadius: '1.25rem',
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.7)',
        border: '1px solid rgba(99,102,241,0.12)',
        backdropFilter: 'blur(12px)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.55s ease ${index * 0.1}s, transform 0.55s ease ${index * 0.1}s, box-shadow 0.3s ease`,
        boxShadow: hovered
          ? `0 20px 50px ${accent.from}44, 0 0 0 1px ${accent.from}33`
          : '0 4px 20px rgba(0,0,0,0.3)',
        display: 'flex', flexDirection: 'column',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* YouTube iframe */}
      <div style={{ position: 'relative', paddingBottom: '56.25%', background: '#000' }}>
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            border: 'none',
          }}
        />
      </div>

      {/* Gradient accent bar */}
      <div style={{
        height: 3,
        background: `linear-gradient(90deg, ${accent.from}, ${accent.to})`,
        transition: 'opacity 0.3s',
        opacity: hovered ? 1 : 0.6,
      }} />

      {/* Card info */}
      <div style={{ padding: '1.2rem 1.4rem 1.4rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.8rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: '0.5rem' }}>
            <PlayCircle size={14} style={{ color: accent.from, flexShrink: 0 }} />
            <span style={{ color: '#9ca3af', fontSize: '0.68rem', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>YouTube Playlist</span>
          </div>
          <h3 style={{
            color: '#111827', fontWeight: 800,
            fontSize: 'clamp(1rem,2.5vw,1.15rem)',
            lineHeight: 1.3, marginBottom: '0.4rem',
          }}>
            {title}
          </h3>
          <p style={{ color: '#6b7280', fontSize: '0.82rem', lineHeight: 1.55 }}>
            {description}
          </p>
        </div>

        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            color: accent.from,
            fontSize: '0.82rem', fontWeight: 700,
            textDecoration: 'none',
            border: `1px solid ${accent.from}44`,
            borderRadius: 999, padding: '0.35rem 0.9rem',
            alignSelf: 'flex-start',
            transition: 'all 0.2s',
            background: `${accent.from}10`,
          }}
          onMouseEnter={e => { e.currentTarget.style.background = `${accent.from}22`; e.currentTarget.style.borderColor = `${accent.from}88`; }}
          onMouseLeave={e => { e.currentTarget.style.background = `${accent.from}10`; e.currentTarget.style.borderColor = `${accent.from}44`; }}
        >
          <ExternalLink size={12} />
          פתח בYouTube
        </a>
      </div>
    </div>
  );
}

export default function Playlists() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="videos"
      ref={ref}
      className={`fade-section${visible ? ' visible' : ''}`}
      style={{
        padding: '5rem 1.5rem',
        position: 'relative', zIndex: 1,
        background: 'transparent',
      }}
    >
      <style>{`
        .playlists-grid {
          display: grid;
          gap: 1.25rem;
          grid-template-columns: 1fr;
        }
        @media (min-width: 768px) {
          .playlists-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>

      {/* Title row */}
      <div style={{
        maxWidth: 1000, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '1rem',
        marginBottom: '2.5rem',
      }}>
        <div>
          <h2 style={{ color: '#111827', fontSize: 'clamp(1.5rem,4vw,2.2rem)', fontWeight: 900, margin: 0 }}>
            הדרכות ותכנים
          </h2>
          <div style={{ height: 3, width: 50, background: 'linear-gradient(90deg,#6366f1,#06b6d4)', borderRadius: 999, marginTop: 8 }} />
        </div>
        <a
          href="https://www.youtube.com/@itamargreenberg"
          target="_blank" rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            color: '#6366f1', textDecoration: 'none',
            fontSize: '0.88rem', fontWeight: 600,
            border: '1px solid rgba(99,102,241,0.25)',
            borderRadius: 999, padding: '6px 14px',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.08)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
        >
          <ExternalLink size={13} />
          ערוץ YouTube
        </a>
      </div>

      {/* 3-column grid */}
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div className="playlists-grid">
          {PLAYLISTS.map((p, i) => (
            <PlaylistCard key={p.id} {...p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
