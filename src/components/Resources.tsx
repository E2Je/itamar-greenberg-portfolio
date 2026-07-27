import { FileText, Sparkles, ArrowLeft, BookOpen } from 'lucide-react';
import { RESOURCES } from '../data/content';

const ICON_MAP: Record<string, React.ReactNode> = {
  'file-text': <FileText size={21} />,
  sparkles: <Sparkles size={21} />,
};

const ACCENTS = ['var(--accent)', 'var(--gold-deep)'];

export default function Resources() {
  return (
    <section id="resources" className="sec sec-alt">
      <div className="wrap narrow">
        <div className="sec-head center reveal">
          <span className="eyebrow">
            <BookOpen size={13} style={{ verticalAlign: '-2px', marginInlineEnd: 5 }} />
            מאמרים
          </span>
          <h2>תכנים כתובים ומאמרים</h2>
          <div className="rule" />
        </div>

        <div className="reveal-group" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {RESOURCES.map((r, i) => {
            const accent = ACCENTS[i % ACCENTS.length];
            return (
              <a
                key={r.id}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card card-hover"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '16px 20px',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                <span
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 13,
                    flexShrink: 0,
                    background: 'var(--surface-alt)',
                    border: '1px solid var(--line)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: accent,
                  }}
                >
                  {ICON_MAP[r.icon]}
                </span>
                <span
                  style={{
                    flex: 1,
                    fontFamily: 'var(--ff-title)',
                    color: 'var(--ink)',
                    fontSize: 16.5,
                  }}
                >
                  {r.title}
                </span>
                <ArrowLeft size={17} style={{ color: 'var(--muted)', flexShrink: 0 }} />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
