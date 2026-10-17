import { Analytics } from '@vercel/analytics/react';
import LineDraw from './components/LineDraw';
import { LinkedInIcon, MailIcon, WhatsAppIcon } from './components/LineIcons';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Showcase from './components/Showcase';
import Playlists from './components/Playlists';
import Resources from './components/Resources';
import PhotoCarousel from './components/PhotoCarousel';
import About from './components/About';
import { PERSONAL } from './data/content';
import { SIGNATURE_PATHS, SIGNATURE_VIEWBOX } from './data/signature';
import { useReveal } from './hooks/useReveal';
import { useFitHeadings } from './hooks/useFitHeadings';
import { useAnchorScroll } from './hooks/useAnchorScroll';

export default function App() {
  useReveal();
  useFitHeadings();
  useAnchorScroll();

  return (
    <>
      <a href="#main" className="skip-link">
        דילוג לתוכן
      </a>
      <Analytics />
      <Navbar />

      <main id="main">
        <Hero />
        <About />
        <Showcase />
        <Playlists />
        <Resources />
        <PhotoCarousel />

      </main>

      <footer className="site-footer">
        <style>{`
          .site-footer { background: var(--white); padding: clamp(64px, 8vw, 112px) 0 28px; overflow: hidden; }
          .foot-word { width: min(100%, 760px); height: auto; margin: 0; transform: skewX(-8deg); transform-origin: 100% 100%; }
          .foot-word .ld { transition-duration: .45s !important; }
          .foot-swoosh { width: min(100%, 900px); height: clamp(18px, 3vw, 40px); margin: 6px 0 0 auto; }
          .foot-sub { font-size: clamp(18px, 2vw, 24px); color: var(--blue-ink); margin: 14px 0 clamp(28px, 4vw, 44px); }
          .foot-links { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: clamp(48px, 7vw, 88px); }
          .foot-copy { color: var(--muted); font-size: 14px; margin: 0; }
        `}</style>
        <div className="wrap">
          <p className="visually-hidden">AI can do it</p>
          <LineDraw viewBox={SIGNATURE_VIEWBOX} className="foot-word" stroke="#1E3A56">
            {SIGNATURE_PATHS.map(d => <path key={d} className="ld" d={d} strokeWidth={7} />)}
          </LineDraw>
          <LineDraw viewBox="0 0 900 44" className="foot-swoosh" stretch>
            <path className="ld" d="M890 24 C700 8 520 36 330 20 C210 10 110 30 12 18" />
          </LineDraw>
          <p className="foot-sub">בינה מלאכותית וחשיבה יצירתית</p>

          <div className="foot-links">
            <a href={`mailto:${PERSONAL.email}`} className="lbtn"><MailIcon /><span className="ltr">{PERSONAL.email}</span></a>
            <a href={PERSONAL.whatsapp} target="_blank" rel="noopener noreferrer" className="lbtn"><WhatsAppIcon /><span className="ltr">{PERSONAL.phone}</span></a>
            <a href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer" className="lbtn">
              <LinkedInIcon />
              LinkedIn
            </a>
          </div>

          <p className="foot-copy">איתמר גרינברג © 2026</p>
        </div>
      </footer>
    </>
  );
}
