import { useEffect, useState } from 'react';
import FloatingShapes from './components/FloatingShapes';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PhotoCarousel from './components/PhotoCarousel';
import Playlists from './components/Playlists';
import { LINKS } from './data/content';
import { ExternalLink, Mail, MessageCircle, Users, FileText } from 'lucide-react';

const ICONS: Record<string, React.ReactNode> = {
  'external-link': <ExternalLink size={14} />,
  mail:            <Mail size={14} />,
  'message-circle':<MessageCircle size={14} />,
  users:           <Users size={14} />,
  'file-text':     <FileText size={14} />,
};

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
        <Hero />

        <div style={{ height: 1, margin: '0 8%', background: 'linear-gradient(90deg,transparent,rgba(99,102,241,0.2),transparent)' }} />
        <PhotoCarousel />

        <div style={{ height: 1, margin: '0 8%', background: 'linear-gradient(90deg,transparent,rgba(139,92,246,0.18),transparent)' }} />
        <Playlists />

        {/* Footer */}
        <footer style={{
          position: 'relative', zIndex: 1,
          padding: '2.5rem 1.5rem 3rem',
          textAlign: 'center',
          borderTop: '1px solid rgba(99,102,241,0.1)',
        }}>
          <p className="gradient-text" style={{ fontWeight: 900, fontSize: '1.1rem', marginBottom: '1.2rem' }}>
            AI can do it ✦
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            {LINKS.map(link => (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-btn"
                style={{ fontSize: '0.8rem' }}
              >
                {ICONS[link.icon]}
                {link.label}
              </a>
            ))}
          </div>
          <p style={{ color: '#9ca3af', fontSize: '0.78rem' }}>
            איתמר גרינברג © 2026
          </p>
        </footer>
      </div>
    </div>
  );
}
