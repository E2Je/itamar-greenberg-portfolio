import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { WhatsAppIcon } from './LineIcons';
import { PERSONAL } from '../data/content';

const NAV_LINKS = [
  { label: 'אודות', href: '#about' },
  { label: 'פרויקטים', href: '#projects' },
  { label: 'הדרכות', href: '#videos' },
  { label: 'תכנים', href: '#resources' },
  { label: 'גלריה', href: '#gallery' },
];


/**
 * מבנה של J Scott (Prof C): פס הודעה צבעוני למעלה, ומתחתיו שורה עם קישורים בצד אחד,
 * השם באמצע, ובצד השני כפתורים עגולים לרשתות + כפתור פנייה בולט.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <style>{`
        .site-header { position: fixed; top: 0; inset-inline: 0; z-index: 150; background: var(--white);
}
        .site-header.scrolled { background: var(--white); }
        .nav-row { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 12px; height: 81px; }
        .nav-links { display: none; gap: 14px; }
        .nav-links a { font-size: 17px; color: var(--ink); }
        @media (hover: hover) and (pointer: fine) { .nav-links a:hover { color: var(--blue-ink); } }
        .nav-name { font-family: var(--ff-title); font-size: clamp(18px, 2vw, 22px); color: var(--ink); white-space: nowrap; }
        .nav-end { display: flex; justify-content: flex-end; align-items: center; gap: 8px; }
        .nav-cta { display: none; margin-inline-start: 28px; }
        .nav-toggle { position: relative; z-index: 1; display: grid; place-items: center; width: 44px; height: 44px;
                      border-radius: 50%; border: 0; background: var(--paper-2); color: var(--ink); justify-self: start; }
        .mobile-panel { position: absolute; top: 100%; inset-inline: 0; background: var(--paper-2);
                        padding: 12px var(--gutter) 20px; display: flex; flex-direction: column;
                        animation: panelIn .2s var(--ease-out); }
        .mobile-panel a { font-family: var(--ff-title); font-size: 22px; color: var(--ink); padding: 10px 0; }
        @keyframes panelIn { from { opacity: 0; transform: translateY(-6px); } }
        @media (min-width: 1000px) {
          .nav-links { display: flex; }
          .nav-cta { display: inline-flex; }
          .nav-toggle { display: none; }
        }
      `}</style>

      <div className="wrap">
        <div className="nav-row">
          <nav className="nav-links" aria-label="ניווט ראשי">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </nav>
          <button
            className="nav-toggle"
            onClick={() => setMenuOpen(o => !o)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'סגירת תפריט' : 'פתיחת תפריט'}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <a href="#top" className="nav-name">{PERSONAL.name}</a>

          <div className="nav-end">
            <a className="lbtn lbtn-strong nav-cta" href={PERSONAL.whatsapp} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={20} />דברו איתי</a>
          </div>
        </div>
      </div>

      {menuOpen && (
        <nav className="mobile-panel" aria-label="ניווט ראשי">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
          ))}
          <a href={PERSONAL.whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>
            דברו איתי בוואטסאפ
          </a>
        </nav>
      )}
    </header>
  );
}
