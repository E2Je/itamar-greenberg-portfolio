import { Mail, MessageCircle, Play } from 'lucide-react';
import { PERSONAL } from '../data/content';
import { useCipherText } from '../hooks/useCipherText';

export default function Hero() {
  const cipherName = useCipherText(PERSONAL.name, 300);

  return (
    <section style={{
      position: 'relative', zIndex: 1,
      minHeight: '100svh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '7rem 1.5rem 5rem',
      textAlign: 'center',
    }}>

      {/* Name */}
      <h1 style={{
        fontSize: 'clamp(2.4rem, 8vw, 5rem)',
        fontWeight: 900,
        lineHeight: 1.05,
        color: '#111827',
        marginBottom: '1rem',
        letterSpacing: '-2px',
      }}>
        <span style={{ fontVariantNumeric: 'tabular-nums', letterSpacing: '-1px' }}>{cipherName}</span>
      </h1>

      {/* Title */}
      <p style={{
        fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
        color: '#6b7280',
        fontWeight: 500,
        marginBottom: '0.5rem',
        maxWidth: 500,
      }}>
        {PERSONAL.title}
      </p>

      {/* Tagline */}
      <p style={{
        fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
        color: '#9ca3af',
        marginBottom: '2.5rem',
      }}>
        {PERSONAL.subtitle} — {PERSONAL.tagline}
      </p>

      {/* CTA buttons */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
        <a
          href={`mailto:${PERSONAL.email}`}
          data-magnetic="MAIL"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: 'white', borderRadius: 999,
            padding: '0.75rem 1.6rem', fontWeight: 700, fontSize: '0.95rem',
            textDecoration: 'none',
            boxShadow: '0 8px 24px rgba(99,102,241,0.35)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(99,102,241,0.45)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(99,102,241,0.35)'; }}
        >
          <Mail size={16} />
          שלח מייל
        </a>

        <a
          href={PERSONAL.whatsapp}
          target="_blank" rel="noopener noreferrer"
          data-magnetic="CHAT"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#25D366', color: 'white', borderRadius: 999,
            padding: '0.75rem 1.6rem', fontWeight: 700, fontSize: '0.95rem',
            textDecoration: 'none',
            boxShadow: '0 8px 24px rgba(37,211,102,0.35)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            animation: 'waPulse 3s ease-in-out infinite',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          <MessageCircle size={16} />
          וואטסאפ
        </a>

        <a
          href="#videos"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'white', color: '#374151', borderRadius: 999,
            padding: '0.75rem 1.6rem', fontWeight: 700, fontSize: '0.95rem',
            textDecoration: 'none',
            border: '1.5px solid #e5e7eb',
            boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
            transition: 'transform 0.2s, border-color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = '#6366f1'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#e5e7eb'; }}
        >
          <Play size={15} fill="#6366f1" stroke="none" />
          צפייה בתכנים
        </a>
      </div>

      {/* Scroll cue */}
      <div style={{
        position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
        opacity: 0.35,
        animation: 'scrollBounce 2s ease-in-out infinite',
      }}>
        <div style={{ width: 1.5, height: 28, background: 'linear-gradient(to bottom,transparent,#6366f1)', borderRadius: 999 }} />
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#6366f1' }} />
      </div>

      <style>{`
        @keyframes waPulse {
          0%, 100% { box-shadow: 0 8px 24px rgba(37,211,102,0.35); }
          50% { box-shadow: 0 8px 32px rgba(37,211,102,0.6); }
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(6px); }
        }
      `}</style>
    </section>
  );
}
