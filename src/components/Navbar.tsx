import { ExternalLink, Mail, MessageCircle, Users, FileText } from 'lucide-react';
import { LINKS } from '../data/content';

const ICONS: Record<string, React.ReactNode> = {
  'external-link': <ExternalLink size={14} />,
  mail:            <Mail size={14} />,
  'message-circle':<MessageCircle size={14} />,
  users:           <Users size={14} />,
  'file-text':     <FileText size={14} />,
};

export default function Navbar() {
  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        zIndex: 50,
        background: 'rgba(249,250,251,0.80)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderBottom: '1px solid rgba(99,102,241,0.12)',
      }}
    >
      <div
        style={{
          maxWidth: 1100, margin: '0 auto',
          padding: '0.6rem 1.5rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '0.5rem',
        }}
      >
        {/* Logo */}
        <span
          className="gradient-text font-black"
          style={{ fontSize: '1.05rem', letterSpacing: '-0.5px' }}
        >
          AI can do it ✦
        </span>

        {/* Links */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {LINKS.map(link => (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-btn"
              style={{ fontSize: '0.78rem', padding: '0.35rem 0.85rem' }}
            >
              {ICONS[link.icon]}
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
