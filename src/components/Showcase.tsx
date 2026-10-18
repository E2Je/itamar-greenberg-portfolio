import { PROJECTS } from '../data/projects';
import LineDraw from './LineDraw';

const base = import.meta.env.BASE_URL;

/**
 * הסקשן של "THREE WAYS TO WORK WITH ME" אצל J Scott: בלוקים עם תמונה למעלה, כותרת וטקסט.
 * כאן: 12 הכלים. מאחורי כל טלפון קו כחול מצייר את עצמו כשהכרטיס נכנס למסך (שלוש וריאציות שמתחלפות).
 */
export default function Showcase() {
  return (
    <section id="projects" className="sec work">
      <style>{`
        .work { background: var(--paper-2); }
        .work-head { margin-bottom: clamp(28px, 3.4vw, 44px); }

        /* מובייל: כרטיסים בהחלקה לצד במקום 12 כרטיסים גבוהים זה מתחת לזה */
        .blocks { display: grid; gap: 16px; grid-auto-flow: column; grid-auto-columns: 82%; overflow-x: auto;
                  scroll-snap-type: x mandatory; overscroll-behavior-x: contain; scrollbar-width: none;
                  list-style: none; margin: 0 calc(-1 * var(--gutter)); padding: 4px var(--gutter) 12px; }
        .blocks::-webkit-scrollbar { display: none; }
        .blocks > li { scroll-snap-align: start; }
        @media (min-width: 680px) {
          .blocks { grid-auto-flow: row; grid-auto-columns: auto; overflow: visible; margin: 0; padding: 0;
                    gap: clamp(16px, 2vw, 24px); grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (min-width: 1100px) { .blocks { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
        .block { background: var(--white); height: 100%; display: flex; flex-direction: column;
                 transition: background-color .3s, transform .3s var(--ease-out); }
        .block-shot { position: relative; height: 220px; overflow: hidden; display: flex; justify-content: center; align-items: flex-start;
                      padding-top: 24px; background: var(--paper-1); }
        .block-shot img { position: relative; z-index: 1; height: 320px; width: auto; transition: transform .4s var(--ease-out); }
        .shot-doodle { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 0; }
        @media (hover: hover) and (pointer: fine) {
          .block:hover { transform: translateY(-4px); }
          .block:hover .block-shot img { transform: translateY(-12px); }
        }
        .block-body { padding: 18px 20px 22px; }
        .block-body h3 { font-size: clamp(19px, 1.6vw, 22px); margin-bottom: 8px; }
        .block-body p { font-size: 16px; line-height: 1.65; margin: 0; color: var(--ink); }
      `}</style>

      <div className="wrap">
        <div className="work-head sec-head reveal">
          <div className="sec-head-text">
            <span className="eyebrow">פרויקטים</span>
            <h2 data-fit>כמה דוגמאות לפתרונות שפיתחתי</h2>
          </div>
          <LineDraw viewBox="0 0 190 120" label="חלון של כלי עם סמן עכבר וניצוץ" className="sec-draw">
            <path className="lf" d="M14 22 Q14 12 24 12 H136 Q146 12 146 22 V84 Q146 94 136 94 H24 Q14 94 14 84 Z" />
            <path className="ld" d="M14 22 Q14 12 24 12 H136 Q146 12 146 22 V84 Q146 94 136 94 H24 Q14 94 14 84 Z M14 32 H146" />
            <path className="ld" d="M34 52 H96 M34 68 H74" stroke="#4A90D9" strokeWidth={6} />
            <path className="ld" fill="#FFFFFF" d="M104 58 L104 104 L115 93 L124 112 L132 108 L123 90 L138 89 Z" />
            <path className="ld" d="M166 28 L170 16 L174 28 L186 32 L174 36 L170 48 L166 36 L154 32 Z" stroke="#4A90D9" />
          </LineDraw>
        </div>

        <ul className="blocks stagger" tabIndex={0} aria-label="רשימת הפרויקטים">
          {PROJECTS.map((p, i) => (
            <li key={p.id} id={`tool-${p.id}`}>
              <article className="block">
                <div className="block-shot">
                  <ShotDoodle variant={i % 3} />
                  <img
                    src={`${base}projects/${p.id}.webp`}
                    alt={`מסך מתוך ${p.title}`}
                    width={560}
                    height={1155}
                    loading={i < 3 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </div>
                <div className="block-body">
                  <h3 data-fit>{p.title}</h3>
                  <p>{p.description}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** קו מסביב לטלפון: לולאה, ניצוצות וגל, או קרני אור. מאחורי התמונה, בלי להסתיר אותה. */
function ShotDoodle({ variant }: { variant: number }) {
  if (variant === 0) {
    return (
      <LineDraw viewBox="0 0 300 220" className="shot-doodle">
        <path className="lf" d="M150 30 C226 28 272 74 268 126 C264 182 212 208 150 206 C86 204 32 180 34 122 C36 66 84 32 150 30 Z" />
        <path className="ld" d="M150 22 C230 18 282 70 276 128 C270 190 210 214 150 212 C82 210 24 184 26 120 C28 62 84 26 166 30" />
      </LineDraw>
    );
  }
  if (variant === 1) {
    return (
      <LineDraw viewBox="0 0 300 220" className="shot-doodle">
        <path className="ld" d="M48 50 L52 38 L56 50 L68 54 L56 58 L52 70 L48 58 L36 54 Z" />
        <path className="ld" d="M250 120 L253 111 L256 120 L265 123 L256 126 L253 135 L250 126 L241 123 Z" stroke="#4A90D9" />
        <path className="ld" d="M22 170 q12 -14 24 0 t24 0 t24 0" />
        <path className="ld" d="M216 60 q12 -14 24 0 t24 0" stroke="#4A90D9" />
      </LineDraw>
    );
  }
  return (
    <LineDraw viewBox="0 0 300 220" className="shot-doodle">
      <path className="ld" d="M82 70 L58 50 M96 50 L84 24 M218 70 L242 50 M204 50 L216 24" />
      <path className="lf" d="M30 150 a16 16 0 1 0 .1 0 Z" />
      <path className="ld" d="M30 150 a16 16 0 1 0 .1 0" />
      <path className="ld" d="M252 150 L284 170 L252 190 Z" stroke="#4A90D9" />
    </LineDraw>
  );
}
