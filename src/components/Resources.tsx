import { ArrowLeftIcon } from './LineIcons';
import { RESOURCES } from '../data/content';
import LineDraw from './LineDraw';

/**
 * כמו "FREE RESOURCES" אצל J Scott: כותרת ושני בלוקים גדולים עם כפתור.
 * כאן: מאגר המדריכים והתכנים מקהילת AI CAN DO IT.
 */
export default function Resources() {
  return (
    <section id="resources" className="sec">
      <style>{`
        #resources { background: var(--white); }
        .res-grid { list-style: none; margin: clamp(28px, 3.4vw, 44px) 0 0; padding: 0; display: grid; gap: clamp(16px, 2vw, 24px);
                    grid-template-columns: minmax(0, 1fr); }
        @media (min-width: 860px) { .res-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        .res-card { display: flex; flex-direction: column; align-items: flex-start; justify-content: space-between; gap: 18px; height: 100%;
                    background: var(--paper-2); padding: clamp(24px, 2.6vw, 34px);
                    transition: background-color .2s, transform .3s var(--ease-out); }
        .res-card h3 { font-size: clamp(22px, 2.4vw, 30px); min-width: 0; align-self: stretch; }
        @media (min-width: 1100px) { .res-card { flex-direction: row; align-items: center; } .res-card h3 { flex: 1; } }
        .res-go { display: inline-grid; place-items: center; flex: none; width: 52px; height: 52px; border-radius: 50%; color: var(--white); background: var(--blue-deep); align-self: flex-end; }
        .res-go { display: inline-flex; align-items: center; gap: 8px; align-self: flex-start; font-family: var(--ff-title);
                  font-size: 17px; color: var(--white); background: var(--blue-deep); padding: 14px 22px; }
        @media (hover: hover) and (pointer: fine) {
          .res-card:hover { background: var(--paper-3); transform: translateY(-4px); }
          .res-card:hover .res-go svg { transform: translateX(-4px); }
        }
        .res-go svg { transition: transform .2s var(--ease-out); }
      `}</style>

      <div className="wrap">
        <div className="sec-head reveal">
          <div className="sec-head-text">
            <span className="eyebrow">מאמרים</span>
            <h2 data-fit>תכנים כתובים ומאמרים</h2>
          </div>
          <LineDraw viewBox="0 0 180 120" label="ספר פתוח" className="sec-draw">
            <path className="lf" d="M90 30 Q60 14 14 18 V96 Q60 92 90 108 Q120 92 166 96 V18 Q120 14 90 30 Z" />
            <path className="ld" d="M90 30 Q60 14 14 18 V96 Q60 92 90 108 Q120 92 166 96 V18 Q120 14 90 30 V108" />
            <path className="ld" d="M30 40 Q52 38 72 46 M30 58 Q52 56 72 64 M108 46 Q128 38 150 40 M108 64 Q128 56 150 58" stroke="#4A90D9" />
          </LineDraw>
        </div>
        <ul className="res-grid stagger">
          {RESOURCES.map(r => (
            <li key={r.id}>
              <a href={r.href} target="_blank" rel="noopener noreferrer" className="res-card">
                <h3 data-fit>{r.title}</h3>
                <span className="res-go"><ArrowLeftIcon size={22} /></span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
