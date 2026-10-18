import { SITES } from '../data/sites';
import { ArrowLeftIcon } from './LineIcons';
import LineDraw from './LineDraw';

const base = import.meta.env.BASE_URL;

/**
 * אתרים שבניתי: לכל אתר צילום מסך בתוך חלון דפדפן מצויר בקו, וכפתור לאתר החי.
 * מובייל: החלקה לצד כמו בפרויקטים.
 */
export default function Sites() {
  return (
    <section id="sites" className="sec sites">
      <style>{`
        .sites { background: var(--paper-1); }
        .sites-head { margin-bottom: clamp(28px, 3.4vw, 44px); }
        .site-list { display: grid; gap: 16px; grid-auto-flow: column; grid-auto-columns: 86%; overflow-x: auto;
                     scroll-snap-type: x mandatory; overscroll-behavior-x: contain; scrollbar-width: none;
                     list-style: none; margin: 0 calc(-1 * var(--gutter)); padding: 4px var(--gutter) 16px; }
        .site-list::-webkit-scrollbar { display: none; }
        .site-list > li { scroll-snap-align: start; }
        @media (min-width: 680px) {
          .site-list { grid-auto-flow: row; grid-auto-columns: auto; overflow: visible; margin: 0; padding: 0;
                       gap: clamp(20px, 2.4vw, 32px); grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (min-width: 1100px) { .site-list { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
        .site-card { display: flex; flex-direction: column; gap: 16px; height: 100%; }
        .site-shot { position: relative; display: block; aspect-ratio: 320 / 230; }
        .site-frame { position: absolute; inset: 0; width: 100%; height: 100%; }
        .site-shot img { position: absolute; top: 14%; left: 2.4%; right: 2.4%; bottom: 3.6%; width: 95.2%; height: 82.4%;
                         object-fit: cover; object-position: top; border-radius: 0 0 9px 9px; z-index: 1;
                         transition: transform .4s var(--ease-out); }
        .site-body { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
        .site-body h3 { font-size: clamp(20px, 1.8vw, 24px); margin: 0; }
        .site-body .lbtn { font-size: 17px; min-height: 48px; padding: 10px 20px; }
        @media (hover: hover) and (pointer: fine) {
          .site-shot:hover img { transform: translateY(-4px); }
          .site-card:hover .lbtn svg { transform: translateX(-4px); }
        }
        .site-body .lbtn svg { transition: transform .2s var(--ease-out); }
      `}</style>

      <div className="wrap">
        <div className="sites-head sec-head reveal">
          <div className="sec-head-text">
            <span className="eyebrow">אתרים</span>
            <h2 data-fit>כמה דוגמאות לאתרים שבניתי עם ידידי ה-AI</h2>
          </div>
          <LineDraw viewBox="0 0 190 120" label="חלון דפדפן עם לב" className="sec-draw">
            <path className="lf" d="M12 22 Q12 10 24 10 H166 Q178 10 178 22 V96 Q178 108 166 108 H24 Q12 108 12 96 Z" />
            <path className="ld" d="M12 22 Q12 10 24 10 H166 Q178 10 178 22 V96 Q178 108 166 108 H24 Q12 108 12 96 Z M12 32 H178" />
            <path className="ld" d="M26 21 h.1 M38 21 h.1 M50 21 h.1" strokeWidth={6} />
            <path className="ld" d="M95 92 C70 76 62 64 66 54 C70 44 86 42 95 56 C104 42 120 44 124 54 C128 64 120 76 95 92 Z" stroke="#4A90D9" />
          </LineDraw>
        </div>

        <ul className="site-list stagger">
          {SITES.map((s, i) => (
            <li key={s.id}>
              <article className="site-card">
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="site-shot" tabIndex={-1} aria-hidden="true">
                  <LineDraw viewBox="0 0 320 230" className="site-frame" stretch>
                    <path className="lf" d="M14 6 H306 Q314 6 314 14 V216 Q314 224 306 224 H14 Q6 224 6 216 V14 Q6 6 14 6 Z" />
                    <path className="ld" vectorEffect="non-scaling-stroke"
                          d="M14 6 H306 Q314 6 314 14 V216 Q314 224 306 224 H14 Q6 224 6 216 V14 Q6 6 14 6 Z M6 30 H314" />
                    <path className="ld" vectorEffect="non-scaling-stroke" d="M18 18 h.1 M28 18 h.1 M38 18 h.1" strokeWidth={7} />
                  </LineDraw>
                  <img
                    src={`${base}sites/${s.id}.webp`}
                    alt=""
                    width={960}
                    height={600}
                    loading={i < 3 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </a>
                <div className="site-body">
                  <h3>{s.title}</h3>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="lbtn"
                     aria-label={`כניסה לאתר ${s.title} (נפתח בחלון חדש)`}>
                    כניסה לאתר
                    <ArrowLeftIcon />
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
