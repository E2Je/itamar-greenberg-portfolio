import { useRef, useState, useEffect } from 'react';
import { FileText, Sparkles, ArrowLeft } from 'lucide-react';
import { RESOURCES } from '../data/content';

const ICON_MAP: Record<string, React.ReactNode> = {
  'file-text': <FileText size={22} />,
  sparkles: <Sparkles size={22} />,
};

const CARD_COLORS = [
  { bg: 'rgba(99,102,241,0.08)', icon: '#6366f1', border: 'rgba(99,102,241,0.2)' },
  { bg: 'rgba(139,92,246,0.08)', icon: '#8b5cf6', border: 'rgba(139,92,246,0.2)' },
];

export default function Resources() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="resources"
      ref={ref}
      className={`fade-section${visible ? ' visible' : ''}`}
      style={{ padding: '5rem 1.5rem', position: 'relative', zIndex: 1 }}
    >
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 className="gradient-text" style={{ fontSize: 'clamp(1.4rem,4vw,2rem)', fontWeight: 900, display: 'inline-block' }}>
            תכנים כתובים ומאמרים
          </h2>
          <div style={{ height: 3, width: 50, background: 'linear-gradient(90deg,#6366f1,#06b6d4)', borderRadius: 999, margin: '0.5rem auto 0' }} />
        </div>

        {/* Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {RESOURCES.map((r, i) => {
            const color = CARD_COLORS[i % CARD_COLORS.length];
            return (
              <a
                key={r.id}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '1.2rem 1.5rem',
                  borderRadius: '1rem',
                  textDecoration: 'none',
                  gap: '1rem',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateX(0)'; }}
              >
                <div style={{
                  width: 46, height: 46, borderRadius: '0.75rem', flexShrink: 0,
                  background: color.bg, border: `1px solid ${color.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: color.icon,
                }}>
                  {ICON_MAP[r.icon]}
                </div>
                <span style={{ flex: 1, color: '#374151', fontWeight: 600, fontSize: '0.95rem' }}>
                  {r.title}
                </span>
                <ArrowLeft size={16} style={{ color: '#9ca3af', flexShrink: 0 }} />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
