import { ExternalLink } from 'lucide-react';

const APPS = [
  {
    title: 'אפליקציה לניהול ידע במלר"ד',
    url: 'https://nehmad-bamalrad.vercel.app/',
    color: '#6366f1',
    shadow: 'rgba(99,102,241,0.28)',
  },
  {
    title: "אפליקציה לצ'קליסט דיגיטלי להכנה לאינטובציה",
    url: 'https://e2je.github.io/intubation-/',
    color: '#0ea5e9',
    shadow: 'rgba(14,165,233,0.28)',
  },
  {
    title: 'אפליקציה לתרגול החייאה',
    url: 'https://tzofan-2222.vercel.app/',
    color: '#10b981',
    shadow: 'rgba(16,185,129,0.28)',
  },
  {
    title: 'אפליקציה לתרגול צוות בהחייאה',
    url: 'https://tzofenaistudio.vercel.app/',
    color: '#f59e0b',
    shadow: 'rgba(245,158,11,0.28)',
  },
];

export default function Apps() {
  return (
    <section id="apps" style={{ padding: '5rem 1.5rem', position: 'relative', zIndex: 1, direction: 'rtl' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <h2 style={{
          fontSize: 'clamp(1.6rem,4vw,2.4rem)',
          fontWeight: 900,
          color: '#111827',
          marginBottom: '0.4rem',
          letterSpacing: '-1px',
        }}>
          אפליקציות שפיתחתי
        </h2>
        <p style={{ color: '#6b7280', fontSize: '1rem', marginBottom: '2.5rem' }}>
          כלים דיגיטליים לצוותים רפואיים
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '1.1rem',
        }}>
          {APPS.map((app) => (
            <a
              key={app.url}
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: 'white',
                border: '1.5px solid #e5e7eb',
                borderRadius: '1.1rem',
                padding: '1.4rem 1.3rem',
                textDecoration: 'none',
                boxShadow: `0 4px 18px ${app.shadow}`,
                transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
                minHeight: 130,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = `0 12px 32px ${app.shadow}`;
                e.currentTarget.style.borderColor = app.color;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 4px 18px ${app.shadow}`;
                e.currentTarget.style.borderColor = '#e5e7eb';
              }}
            >
              <p style={{
                fontSize: '1rem',
                fontWeight: 700,
                color: '#111827',
                lineHeight: 1.4,
                marginBottom: '1rem',
              }}>
                {app.title}
              </p>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                fontSize: '0.82rem',
                fontWeight: 600,
                color: app.color,
              }}>
                פתח אפליקציה <ExternalLink size={13} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
