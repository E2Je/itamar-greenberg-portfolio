import { PERSONAL } from '../data/content';

const NAV_LINKS = [
  { label: 'הדרכות', href: '#videos' },
  { label: 'תכנים', href: '#resources' },
  { label: 'גלריה', href: '#gallery' },
];

export default function Navbar() {
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
        padding: '0 1.5rem',
        height: 58,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <a href="#" style={{ textDecoration: 'none' }}>
          <span style={{ color: '#e5e7eb', fontWeight: 800, fontSize: '1rem' }}>
            איתמר{' '}
          </span>
          <span className="gradient-text" style={{ fontWeight: 900, fontSize: '1rem' }}>
            גרינברג
          </span>
        </a>

        {/* Nav links */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {NAV_LINKS.map(l => (
            <a
              key={l.href}
              href={l.href}
              style={{
                color: 'rgba(209,213,219,0.85)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#a5b4fc')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(209,213,219,0.85)')}
            >
              {l.label}
            </a>
          ))}
          <a
            href={PERSONAL.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#25D366',
              color: 'white',
              borderRadius: 999,
              padding: '0.35rem 1rem',
              fontSize: '0.82rem',
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'opacity 0.2s',
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
