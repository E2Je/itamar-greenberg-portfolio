import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Mail, MessageCircle } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Showcase from './components/Showcase';
import Playlists from './components/Playlists';
import Resources from './components/Resources';
import PhotoCarousel from './components/PhotoCarousel';
import { PERSONAL } from './data/content';
import { useReveal } from './hooks/useReveal';

function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setPct(max > 0 ? el.scrollTop / max : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <div className="scroll-progress" style={{ transform: `scaleX(${pct})` }} />;
}

export default function App() {
  useReveal();

  return (
    <>
      <a href="#main" className="skip-link">
        דילוג לתוכן
      </a>
      <Analytics />
      <ScrollProgress />
      <Navbar />

      <main id="main">
        <Hero />
        <About />
        <Showcase />
        <Playlists />
        <Resources />
        <PhotoCarousel />
      </main>

      <footer className="sec sec-dusk" style={{ paddingBottom: 32 }}>
        <div className="wrap narrow center">
          <p
            style={{
              fontFamily: 'var(--ff-title)',
              fontSize: 'clamp(20px,4.5vw,26px)',
              color: 'var(--gold-soft)',
              marginBottom: 4,
            }}
          >
            AI can do it ✦
          </p>
          <p style={{ color: 'var(--on-dark-muted)', fontSize: 15, marginBottom: 28 }}>
            בינה מלאכותית וחשיבה יצירתית
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 10,
              marginBottom: 28,
            }}
          >
            <a href={`mailto:${PERSONAL.email}`} className="pill pill-sm pill-ghost-dark pill-icon-left">
              <Mail size={14} />
              <span className="ltr">{PERSONAL.email}</span>
            </a>
            <a
              href={PERSONAL.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="pill pill-sm pill-ghost-dark pill-icon-left"
            >
              <MessageCircle size={14} />
              <span className="ltr">{PERSONAL.phone}</span>
            </a>
            <a
              href={PERSONAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="pill pill-sm pill-ghost-dark pill-icon-left"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              LinkedIn
            </a>
          </div>

          <div
            style={{
              borderTop: '1px solid rgba(255,255,255,.12)',
              paddingTop: 18,
              color: 'var(--on-dark-muted)',
              fontSize: 13,
            }}
          >
            איתמר גרינברג © 2026
          </div>
        </div>
      </footer>
    </>
  );
}
