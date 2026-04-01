import { useEffect, useState } from 'react';
import FloatingShapes from './components/FloatingShapes';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Playlists from './components/Playlists';
import Resources from './components/Resources';
import PhotoCarousel from './components/PhotoCarousel';
import { PERSONAL } from './data/content';
import { Mail, MessageCircle } from 'lucide-react';

function ScrollProgress() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    function onScroll() {
      const el = document.documentElement;
      setWidth(el.scrollHeight - el.clientHeight > 0
        ? (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100
        : 0);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div id="scroll-progress" style={{ width: `${width}%` }} aria-hidden="true" />;
}

export default function App() {
  return (
    <div className="aurora-bg" style={{ position: 'relative' }}>
      <ScrollProgress />
      <FloatingShapes />
      <Navbar />

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Hero ── */}
        <Hero />

        {/* ── Divider ── */}
        <div style={{ height: 1, margin: '0 8%', background: 'linear-gradient(90deg,transparent,rgba(99,102,241,0.2),transparent)' }} />

        {/* ── YouTube Playlists (dark section, primary focus) ── */}
        <Playlists />

        {/* ── Written Resources ── */}
        <Resources />

        {/* ── Photo Carousel / Gallery ── */}
        <div style={{ height: 1, margin: '0 8%', background: 'linear-gradient(90deg,transparent,rgba(99,102,241,0.15),transparent)' }} />
        <PhotoCarousel />

        {/* ── Footer ── */}
        <footer style={{
          background: 'linear-gradient(180deg,#0f0f1e 0%,#080812 100%)',
          borderTop: '1px solid rgba(99,102,241,0.15)',
          padding: '3rem 1.5rem 2.5rem',
          position: 'relative',
          zIndex: 1,
          overflow: 'hidden',
        }}>
          {/* Glow orb behind footer */}
          <div style={{
            position: 'absolute', bottom: -80, left: '50%', transform: 'translateX(-50%)',
            width: 500, height: 200,
            background: 'radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
            {/* Brand */}
            <p style={{
              fontSize: 'clamp(1.1rem,3vw,1.4rem)',
              fontWeight: 900,
              background: 'linear-gradient(90deg,#6366f1,#8b5cf6,#06b6d4)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '0.3rem',
            }}>
              AI can do it ✦
            </p>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem', marginBottom: '2rem' }}>
              בינה מלאכותית וחשיבה יצירתית
            </p>

            {/* Contact row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
              <a
                href={`mailto:${PERSONAL.email}`}
                style={footerLinkStyle}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.18)'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)'; e.currentTarget.style.color = '#a5b4fc'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(209,213,219,0.7)'; }}
              >
                <Mail size={14} />
                {PERSONAL.email}
              </a>

              <a
                href={PERSONAL.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                style={footerLinkStyle}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(37,211,102,0.12)'; e.currentTarget.style.borderColor = 'rgba(37,211,102,0.4)'; e.currentTarget.style.color = '#4ade80'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(209,213,219,0.7)'; }}
              >
                <MessageCircle size={14} />
                {PERSONAL.phone}
              </a>

              <a
                href={PERSONAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={footerLinkStyle}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(10,102,194,0.15)'; e.currentTarget.style.borderColor = 'rgba(10,102,194,0.5)'; e.currentTarget.style.color = '#60a5fa'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(209,213,219,0.7)'; }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                LinkedIn
              </a>
            </div>

            <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: '1.5rem' }} />

            <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem' }}>
              איתמר גרינברג © 2026
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

const footerLinkStyle: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 7,
  color: 'rgba(209,213,219,0.7)',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 999,
  padding: '0.4rem 1rem',
  fontSize: '0.82rem',
  fontWeight: 500,
  textDecoration: 'none',
  transition: 'all 0.2s ease',
};
