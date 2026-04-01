import { useEffect, useState } from 'react';
import FloatingShapes from './components/FloatingShapes';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Playlists from './components/Playlists';
import Resources from './components/Resources';
import PhotoCarousel from './components/PhotoCarousel';
import MagneticCursor from './components/MagneticCursor';
import { PERSONAL } from './data/content';
import { Mail, MessageCircle } from 'lucide-react';

function EKGProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setPct(max > 0 ? el.scrollTop / max : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const W = 1000, H = 28, mid = H / 2;
  let d = `M0,${mid}`;
  for (let i = 0; i < 5; i++) {
    const b = i * 200, s = b + 80;
    d += ` L${s - 15},${mid} L${s},${mid + 7} L${s + 8},${mid - 15} L${s + 16},${mid + 9} L${s + 24},${mid} L${b + 200},${mid}`;
  }

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: H, pointerEvents: 'none', overflow: 'hidden' }}>
      <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="ekgG" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <filter id="ekgF" x="-5%" y="-80%" width="110%" height="260%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <clipPath id="ekgC">
            <rect x="0" y="0" width={W * pct} height={H} />
          </clipPath>
        </defs>
        {/* Ghost line */}
        <path d={d} fill="none" stroke="rgba(99,102,241,0.1)" strokeWidth="1.5" />
        {/* Live line */}
        <path d={d} fill="none" stroke="url(#ekgG)" strokeWidth="2.5" clipPath="url(#ekgC)" filter="url(#ekgF)" />
        {/* Leading dot */}
        {pct > 0.01 && pct < 0.99 && (
          <circle cx={W * pct} cy={mid} r="3.5" fill="#8b5cf6" filter="url(#ekgF)" />
        )}
      </svg>
    </div>
  );
}

export default function App() {
  const [creative, setCreative] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('energy-creative', creative);
  }, [creative]);

  return (
    <div className="aurora-bg" style={{ position: 'relative' }}>
      <MagneticCursor />
      <EKGProgress />
      <FloatingShapes isCreative={creative} />
      <Navbar isCreative={creative} onToggleCreative={() => setCreative(c => !c)} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Hero />

        <div style={{ height: 1, margin: '0 8%', background: 'linear-gradient(90deg,transparent,rgba(99,102,241,0.2),transparent)' }} />
        <Playlists />
        <Resources />

        <div style={{ height: 1, margin: '0 8%', background: 'linear-gradient(90deg,transparent,rgba(99,102,241,0.15),transparent)' }} />
        <PhotoCarousel />

        {/* Footer */}
        <footer style={{
          background: 'linear-gradient(180deg,#0f0f1e 0%,#080812 100%)',
          borderTop: '1px solid rgba(99,102,241,0.15)',
          padding: '3rem 1.5rem 2.5rem',
          position: 'relative', zIndex: 1, overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', bottom: -80, left: '50%', transform: 'translateX(-50%)',
            width: 500, height: 200,
            background: 'radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
            <p style={{
              fontSize: 'clamp(1.1rem,3vw,1.4rem)', fontWeight: 900,
              background: 'linear-gradient(90deg,#6366f1,#8b5cf6,#06b6d4)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              marginBottom: '0.3rem',
            }}>AI can do it ✦</p>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem', marginBottom: '2rem' }}>
              בינה מלאכותית וחשיבה יצירתית
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
              <a href={`mailto:${PERSONAL.email}`} style={footerLinkStyle}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.18)'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)'; e.currentTarget.style.color = '#a5b4fc'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(209,213,219,0.7)'; }}>
                <Mail size={14} />{PERSONAL.email}
              </a>
              <a href={PERSONAL.whatsapp} target="_blank" rel="noopener noreferrer" style={footerLinkStyle}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(37,211,102,0.12)'; e.currentTarget.style.borderColor = 'rgba(37,211,102,0.4)'; e.currentTarget.style.color = '#4ade80'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(209,213,219,0.7)'; }}>
                <MessageCircle size={14} />{PERSONAL.phone}
              </a>
              <a href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer" style={footerLinkStyle}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(10,102,194,0.15)'; e.currentTarget.style.borderColor = 'rgba(10,102,194,0.5)'; e.currentTarget.style.color = '#60a5fa'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(209,213,219,0.7)'; }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                LinkedIn
              </a>
            </div>
            <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: '1.5rem' }} />
            <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem' }}>איתמר גרינברג © 2026</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

const footerLinkStyle: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 7,
  color: 'rgba(209,213,219,0.7)', background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)', borderRadius: 999,
  padding: '0.4rem 1rem', fontSize: '0.82rem', fontWeight: 500,
  textDecoration: 'none', transition: 'all 0.2s ease',
};
