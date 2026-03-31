import { useRef, useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import { PLAYLISTS, SECTION_TITLES } from '../data/content';

interface TiltCardProps {
  title: string;
  description: string;
  href: string;
  gradient: string;
  index: number;
}

function TiltCard({ title, description, href, gradient, index }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setTimeout(() => setVisible(true), index * 120);
    }, { threshold: 0.2 });
    if (cardRef.current) obs.observe(cardRef.current);
    return () => obs.disconnect();
  }, [index]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 16;
    setTilt({ x, y });
  }

  return (
    <div
      ref={cardRef}
      className="gradient-border-wrap"
      style={{
        flex: '1 1 280px',
        maxWidth: 360,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s ease ${index * 0.12}s`,
      }}
    >
      <div className="gradient-border-inner">
        <div
          className="glass-card h-full"
          style={{
            borderRadius: 'calc(1.25rem - 1.5px)',
            transform: hovered
              ? `perspective(800px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale(1.03)`
              : 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)',
            transition: hovered ? 'transform 0.08s ease' : 'transform 0.4s ease',
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
        >
          {/* Gradient thumbnail */}
          <div
            className={`relative flex items-center justify-center bg-gradient-to-br ${gradient}`}
            style={{ height: 160, borderRadius: 'calc(1.25rem - 1.5px) calc(1.25rem - 1.5px) 0 0' }}
          >
            {/* Grid overlay */}
            <svg
              width="100%" height="100%"
              style={{ position: 'absolute', inset: 0, opacity: 0.12 }}
              preserveAspectRatio="none"
            >
              <defs>
                <pattern id={`grid-${index}`} width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#grid-${index})`} />
            </svg>

            {/* Play icon */}
            <div
              style={{
                width: 56, height: 56,
                background: 'rgba(255,255,255,0.22)',
                backdropFilter: 'blur(8px)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '2px solid rgba(255,255,255,0.5)',
                transform: hovered ? 'scale(1.12)' : 'scale(1)',
                transition: 'transform 0.3s ease',
              }}
            >
              <Play size={22} fill="white" stroke="none" style={{ marginRight: -2 }} />
            </div>

            {/* YouTube badge */}
            <div
              style={{
                position: 'absolute', bottom: 10, right: 12,
                background: 'rgba(0,0,0,0.45)',
                backdropFilter: 'blur(6px)',
                borderRadius: 6,
                padding: '2px 8px',
                color: 'white',
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: 0.5,
              }}
            >
              YouTube ▶
            </div>
          </div>

          {/* Card body */}
          <div className="p-5">
            <h3 className="font-bold text-gray-900 mb-1" style={{ fontSize: '1rem', lineHeight: 1.4 }}>
              {title}
            </h3>
            <p className="text-gray-500 text-sm mb-4" style={{ lineHeight: 1.6 }}>
              {description}
            </p>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-btn"
              style={{ fontSize: '0.8rem', padding: '0.4rem 0.9rem' }}
            >
              לצפייה ←
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Playlists() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true);
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`fade-section${visible ? ' visible' : ''} py-16 px-6 relative`}
      style={{ zIndex: 1 }}
    >
      <div className="text-center mb-10">
        <h2
          className="gradient-text font-black inline-block"
          style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)' }}
        >
          {SECTION_TITLES.playlists}
        </h2>
        <div
          className="mx-auto mt-2 rounded-full"
          style={{ height: 3, width: 60, background: 'linear-gradient(90deg,#6366f1,#06b6d4)' }}
        />
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1.25rem',
          justifyContent: 'center',
          maxWidth: 1100,
          margin: '0 auto',
        }}
      >
        {PLAYLISTS.map((p, i) => (
          <TiltCard key={p.id} {...p} index={i} />
        ))}
      </div>
    </section>
  );
}
