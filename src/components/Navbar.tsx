import { PERSONAL } from '../data/content';

const NAV_LINKS = [
  { label: 'אודות', href: '#about' },
  { label: 'הדרכות', href: '#videos' },
  { label: 'תכנים', href: '#resources' },
  { label: 'גלריה', href: '#gallery' },
];

interface NavbarProps {
  isCreative: boolean;
  onToggleCreative: () => void;
}

export default function Navbar({ isCreative, onToggleCreative }: NavbarProps) {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: 'rgba(10,10,18,0.92)',
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
    }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        padding: '0 1.5rem', height: 58,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <a href="#" style={{ textDecoration: 'none' }}>
          <span style={{ color: '#e5e7eb', fontWeight: 800, fontSize: '1rem' }}>איתמר{' '}</span>
          <span className="gradient-text" style={{ fontWeight: 900, fontSize: '1rem' }}>גרינברג</span>
        </a>

        {/* Nav links */}
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          {NAV_LINKS.map(l => (
            <a
              key={l.href}
              href={l.href}
              style={{ color: 'rgba(209,213,219,0.85)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#a5b4fc')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(209,213,219,0.85)')}
            >
              {l.label}
            </a>
          ))}

          {/* Energy toggle */}
          <button
            onClick={onToggleCreative}
            data-magnetic={isCreative ? 'PRO' : 'ENERGY'}
            title={isCreative ? 'Switch to Professional' : 'Switch to Creative'}
            style={{
              background: isCreative
                ? 'linear-gradient(135deg,#6366f1,#8b5cf6)'
                : 'rgba(99,102,241,0.12)',
              border: '1px solid rgba(99,102,241,0.4)',
              color: isCreative ? 'white' : '#a5b4fc',
              borderRadius: 999,
              padding: '0.3rem 0.85rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: 0.5,
              transition: 'all 0.4s cubic-bezier(.34,1.56,.64,1)',
            }}
          >
            {isCreative ? '✦ PRO' : '⚡ CREATIVE'}
          </button>

          <a
            href={PERSONAL.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              background: 'rgba(10,102,194,0.15)', color: '#60a5fa', borderRadius: 999,
              padding: '0.35rem 1rem', fontSize: '0.82rem', fontWeight: 700,
              textDecoration: 'none', border: '1px solid rgba(10,102,194,0.3)',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            LinkedIn
          </a>
          <a
            href={PERSONAL.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#25D366', color: 'white', borderRadius: 999,
              padding: '0.35rem 1rem', fontSize: '0.82rem', fontWeight: 700,
              textDecoration: 'none', transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            WhatsApp
          </a>
        </div>
      </div>
    </nav>
  );
}
