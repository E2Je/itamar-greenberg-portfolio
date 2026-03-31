import { useEffect, useState } from 'react';
import FloatingShapes from './components/FloatingShapes';
import Hero from './components/Hero';
import PhotoCarousel from './components/PhotoCarousel';
import Playlists from './components/Playlists';

function ScrollProgress() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    function onScroll() {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setWidth(total > 0 ? (scrolled / total) * 100 : 0);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div
      id="scroll-progress"
      style={{ width: `${width}%` }}
      aria-hidden="true"
    />
  );
}

export default function App() {
  return (
    <div className="aurora-bg" style={{ position: 'relative' }}>
      <ScrollProgress />
      <FloatingShapes />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Hero />

        <div
          style={{
            height: 1,
            margin: '0 10%',
            background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.25), transparent)',
          }}
        />

        <PhotoCarousel />

        <div
          style={{
            height: 1,
            margin: '0 10%',
            background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.20), transparent)',
          }}
        />

        <Playlists />

        {/* Footer */}
        <footer
          className="text-center py-8 text-sm text-gray-400"
          style={{ zIndex: 1, position: 'relative' }}
        >
          <span className="gradient-text font-bold">AI can do it</span>
          <span className="mx-2 text-gray-300">·</span>
          <span>איתמר גרינברג © 2026</span>
        </footer>
      </div>
    </div>
  );
}
