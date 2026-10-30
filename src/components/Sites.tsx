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
        .site-card { position: relative; display: flex; flex-direction: column; gap: 16px; height: 100%; padding-top: clamp(46px, 4.4vw, 58px); }
        /* איור קו קטן לכל אתר, יוצא מהפינה של חלון הדפדפן */
        .site-doodle { position: absolute; top: 0; inset-inline-end: 4px; z-index: 2; width: clamp(62px, 5.6vw, 76px); height: auto; pointer-events: none;
                       transition: transform .4s var(--ease-out); }
        @media (hover: hover) and (pointer: fine) { .site-card:hover .site-doodle { transform: rotate(-8deg) translateY(-4px); } }
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
                <SiteDoodle id={s.id} />
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

/** איור לכל אתר, לפי מה שהוא: לוטוס לנומי, לב לעין טובה, נורה לעין יעל, טלפון עם וי להצבעה, עגלה לקניות */
function SiteDoodle({ id }: { id: string }) {
  if (id === 'numi') {
    return (
      <LineDraw viewBox="0 0 100 100" className="site-doodle">
        <path className="lf" d="M50 78 C30 74 16 60 16 46 C30 48 40 54 50 30 C60 54 70 48 84 46 C84 60 70 74 50 78 Z" />
        <path className="ld" d="M50 78 C38 62 40 42 50 28 C60 42 62 62 50 78 Z" />
        <path className="ld" d="M50 78 C30 74 18 60 16 46 C30 48 44 58 50 78 C56 58 70 48 84 46 C82 60 70 74 50 78" />
        <path className="ld" d="M24 88 Q50 94 76 88" />
        <path className="ld" d="M68 12 H78 L68 22 H78 M84 2 H90 L84 8 H90" stroke="#4A90D9" strokeWidth={3.5} />
      </LineDraw>
    );
  }
  if (id === 'ein-tova') {
    return (
      <LineDraw viewBox="0 0 100 100" className="site-doodle">
        <path className="lf" d="M50 86 C22 66 12 50 18 36 C24 22 42 20 50 36 C58 20 76 22 82 36 C88 50 78 66 50 86 Z" />
        <path className="ld" d="M50 86 C22 66 12 50 18 36 C24 22 42 20 50 36 C58 20 76 22 82 36 C88 50 78 66 50 86 Z" />
        <path className="ld" d="M14 16 C8 12 7 7 10 5 C12 3 14 5 14 7 C14 5 17 3 19 5 C22 7 20 12 14 16 Z" stroke="#4A90D9" strokeWidth={3.5} />
        <path className="ld" d="M84 6 L86 14 M94 12 L88 18 M96 26 L90 25" stroke="#4A90D9" strokeWidth={3.5} />
      </LineDraw>
    );
  }
  if (id === 'ein-yael') {
    return (
      <LineDraw viewBox="0 0 100 100" className="site-doodle">
        <path className="lf" d="M38 68 C26 60 22 48 24 38 C27 24 38 16 50 16 C62 16 73 24 76 38 C78 48 74 60 62 68 Z" />
        <path className="ld" d="M38 68 C26 60 22 48 24 38 C27 24 38 16 50 16 C62 16 73 24 76 38 C78 48 74 60 62 68 V76 H38 Z M41 84 H59 M45 92 H55" />
        <path className="ld" d="M34 44 H42 L46 34 L52 56 L56 44 H66" stroke="#4A90D9" strokeWidth={3.5} />
        <path className="ld" d="M50 2 V8 M14 12 L19 17 M86 12 L81 17" stroke="#4A90D9" strokeWidth={3.5} />
      </LineDraw>
    );
  }
  if (id === 'kfar-etzion') {
    return (
      <LineDraw viewBox="0 0 100 100" className="site-doodle">
        <path className="lf" d="M36 10 H64 Q70 10 70 16 V84 Q70 90 64 90 H36 Q30 90 30 84 V16 Q30 10 36 10 Z" />
        <path className="ld" d="M36 10 H64 Q70 10 70 16 V84 Q70 90 64 90 H36 Q30 90 30 84 V16 Q30 10 36 10 Z M45 80 H55" />
        <path className="ld" d="M39 48 L47 57 L62 36" stroke="#4A90D9" strokeWidth={5} />
        <path className="ld" d="M86 18 L88 12 L90 18 L96 20 L90 22 L88 28 L86 22 L80 20 Z" stroke="#4A90D9" strokeWidth={3} />
      </LineDraw>
    );
  }
  return (
    <LineDraw viewBox="0 0 100 100" className="site-doodle">
      <path className="lf" d="M22 34 H88 L80 64 H30 Z" />
      <path className="ld" d="M6 20 H16 L30 64 H80 L88 34 H20 M30 64 L26 74 H82" />
      <path className="ld" d="M34 84 a5 5 0 1 0 .1 0 M74 84 a5 5 0 1 0 .1 0" />
      <path className="ld" d="M44 34 C42 22 50 14 58 18 C64 21 62 30 56 34 M66 34 L70 18" stroke="#4A90D9" strokeWidth={3.5} />
    </LineDraw>
  );
}
