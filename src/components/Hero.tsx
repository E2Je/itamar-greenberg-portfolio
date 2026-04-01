import { Mail, MessageCircle, Play } from 'lucide-react';
import { PERSONAL } from '../data/content';

export default function Hero() {
  return (
    <section style={{
      position: 'relative', zIndex: 1,
      minHeight: '100svh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '7rem 1.5rem 5rem',
      textAlign: 'center',
    }}>
      {/* AI badge */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        background: 'rgba(99,102,241,0.1)',
        border: '1px solid rgba(99,102,241,0.3)',
        borderRadius: 999,
        padding: '5px 14px',
        marginBottom: '1.5rem',
        fontSize: '0.78rem',
        fontWeight: 700,
        color: '#6366f1',
        letterSpacing: 0.5,
      }}>
        <span style={{ fontSize: '0.7rem' }}>✦</span>
        AI Implementation Expert
      </div>

      {/* Name */}
      <h1 style={{
        fontSize: 'clamp(2.2rem, 7vw, 4.5rem)',
        fontWeight: 900,
        lineHeight: 1.1,
        color: '#111827',
        marginBottom: '1rem',
        letterSpacing: '-1px',
      }}>
        {PERSONAL.name}
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
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: 'white',
            borderRadius: 999,
            padding: '0.75rem 1.6rem',
            fontWeight: 700,
            fontSize: '0.95rem',
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
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#25D366',
            color: 'white',
            borderRadius: 999,
            padding: '0.75rem 1.6rem',
            fontWeight: 700,
            fontSize: '0.95rem',
            textDecoration: 'none',
            boxShadow: '0 8px 24px rgba(37,211,102,0.35)',
            transition: 'transform 0.2s, box-shadow 0.2s',
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
            background: 'white',
            color: '#374151',
            borderRadius: 999,
            padding: '0.75rem 1.6rem',
            fontWeight: 700,
            fontSize: '0.95rem',
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
    </section>
  );
}
