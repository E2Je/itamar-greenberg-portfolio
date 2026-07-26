import { useEffect, useState } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { PERSONAL } from '../data/content';

const NAV_LINKS = [
  { label: 'אודות', href: '#about' },
  { label: 'פרויקטים', href: '#projects' },
  { label: 'הדרכות', href: '#videos' },
  { label: 'תכנים', href: '#resources' },
  { label: 'גלריה', href: '#gallery' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // סגירת התפריט ב-Esc
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <style>{`
        .site-header { position: fixed; top: 0; inset-inline: 0; z-index: 150; }
        /* הרקע המטושטש יושב על שכבה נפרדת עם pointer-events:none -
           מונע את הבאג ב-iOS Safari שבו backdrop-filter על מיכל בולע נגיעות בכפתור שבתוכו */
        .site-header::before {
          content: ""; position: absolute; inset: 0; z-index: -1; pointer-events: none;
          opacity: 0; transition: opacity .3s;
          background: rgba(255, 252, 248, .88);
          backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 2px 18px rgba(34, 56, 78, .07);
        }
        .site-header.scrolled::before { opacity: 1; }

        .header-inner {
          position: relative; display: flex; align-items: center;
          justify-content: space-between; gap: 12px;
          height: var(--header-h);
        }
        .brand { font-family: var(--ff-title); font-size: 17px; color: var(--ink); }
        .brand span { color: var(--accent-deep); }

        .main-nav { display: none; gap: 2px; align-items: center; }
        .main-nav a {
          font-family: var(--ff-title); font-size: 14.5px; color: var(--ink);
          padding: 7px 12px; border-radius: 10px; transition: color .2s, background .2s;
        }
        .main-nav a:hover { color: var(--accent-deep); background: var(--accent-soft); }

        .nav-toggle {
          position: relative; z-index: 1;
          display: flex; align-items: center; justify-content: center;
          width: 40px; height: 40px; border-radius: 12px;
          background: var(--card); border: 1px solid var(--line); color: var(--ink);
        }
        .nav-cta { display: none; }

        .mobile-panel {
          position: absolute; top: calc(var(--header-h) - 4px); inset-inline: clamp(18px, 5vw, 32px);
          background: var(--card); border: 1px solid var(--line);
          border-radius: var(--radius-sm); box-shadow: var(--shadow-float);
          padding: 10px; display: flex; flex-direction: column;
          animation: modalIn .25s var(--ease-spring);
        }
        .mobile-panel a {
          font-family: var(--ff-title); font-size: 16px; color: var(--ink);
          padding: 11px 14px; border-radius: 12px;
        }
        .mobile-panel a:hover { background: var(--surface-alt); }
        .mobile-panel .panel-cta {
          margin-top: 6px; border-top: 1px solid var(--line-soft); padding-top: 10px;
        }

        @media (min-width: 900px) {
          .main-nav { display: flex; }
          .nav-toggle { display: none; }
          .nav-cta { display: inline-flex; }
        }
      `}</style>

      <div className="wrap">
        <div className="header-inner">
          <a href="#top" className="brand">
            איתמר <span>גרינברג</span>
          </a>

          <nav className="main-nav" aria-label="ניווט ראשי">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <a
              href={PERSONAL.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="pill pill-sm pill-green nav-cta"
            >
              <MessageCircle size={14} />
              דברו איתי
            </a>

            <button
              className="nav-toggle"
              onClick={() => setMenuOpen(o => !o)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'סגירת תפריט' : 'פתיחת תפריט'}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-panel">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          ))}
          <div className="panel-cta">
            <a
              href={PERSONAL.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              style={{ color: 'var(--green-deep)' }}
            >
              דברו איתי בוואטסאפ
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
