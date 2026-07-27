import { useState } from 'react';
import { LayoutGrid } from 'lucide-react';
import { PROJECTS, type Project } from '../data/projects';
import PhoneShot from './PhoneShot';
import ProjectModal from './ProjectModal';

export default function Showcase() {
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <section id="apps" className="sec sec-alt">
      <style>{`
        .showcase-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(16px, 2.2vw, 24px);
        }
        @media (max-width: 900px) { .showcase-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .showcase-grid { grid-template-columns: 1fr; } }

        .project-card {
          display: flex; flex-direction: column;
          text-align: right; padding: 0; overflow: hidden;
          border: 1px solid var(--line-soft);
          background: var(--card);
          border-radius: var(--radius-card);
          box-shadow: var(--shadow-card);
          transition: transform .3s var(--ease-spring), box-shadow .3s;
        }
        .project-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-float); }

        /* הבאר שבה הנייד יושב - הוא גבוה ממנה, כך שהתחתית נחתכת */
        .shot-well {
          position: relative;
          height: 232px;
          display: flex; justify-content: center; align-items: flex-start;
          padding-top: 22px;
          overflow: hidden;
        }
        .shot-well .phone-shot {
          filter: drop-shadow(0 14px 26px rgba(34, 56, 78, .22));
          transition: transform .35s var(--ease-spring);
        }
        .project-card:hover .shot-well .phone-shot { transform: translateY(-8px); }

        .card-body {
          padding: 16px 18px 18px;
          border-top: 1px solid var(--line-soft);
          display: flex; flex-direction: column; gap: 4px; flex: 1;
        }
        .card-body h3 { font-size: 17px; line-height: 1.45; }
        .card-desc {
          font-size: 14.5px; line-height: 1.7; color: var(--body);
          margin: 4px 0 0;
        }
      `}</style>

      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">
            <LayoutGrid size={13} style={{ verticalAlign: '-2px', marginInlineEnd: 5 }} />
            פרויקטים
          </span>
          <h2>אפליקציות שפיתחתי</h2>
          <div className="rule" />
          <p style={{ marginTop: 14 }}>כלים דיגיטליים לצוותים רפואיים</p>
        </div>

        <div className="showcase-grid reveal-group">
          {PROJECTS.map((p, i) => (
            <button
              key={p.id}
              className="project-card"
              onClick={() => setOpen(p)}
              aria-label={`פרטים על ${p.title}`}
            >
              <div
                className="shot-well"
                style={{ background: `linear-gradient(180deg, ${p.accent}1A, ${p.accent}05)` }}
              >
                <PhoneShot id={p.id} title={p.title} height={330} eager={i < 3} />
              </div>

              <div className="card-body">
                <h3>{p.title}</h3>
                <p className="card-desc">{p.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {open && <ProjectModal project={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
