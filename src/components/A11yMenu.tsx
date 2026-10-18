import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { PERSONAL } from '../data/content';

/**
 * תפריט הנגישות מאתר ההצבעה של כפר עציון, בסגנון "קו אחד", והצהרת נגישות בחלון.
 * ההגדרות נשמרות בדפדפן. "עצירת אנימציות" עוצרת גם את ה-GSAP (המסך הראשון והרובוט).
 */
type Flag = 'contrast' | 'links' | 'readable' | 'motion' | 'bigcursor';
type State = Partial<Record<Flag, boolean>> & { font?: number };

const KEY = 'itamar_a11y';
const FLAGS: { key: Flag; label: string }[] = [
  { key: 'contrast', label: 'ניגודיות גבוהה' },
  { key: 'links', label: 'הדגשת קישורים' },
  { key: 'readable', label: 'גופן קריא' },
  { key: 'motion', label: 'עצירת אנימציות' },
  { key: 'bigcursor', label: 'סמן גדול' },
];

function load(): State {
  try { return JSON.parse(localStorage.getItem(KEY) ?? '{}') ?? {}; } catch { return {}; }
}

function apply(state: State) {
  const root = document.documentElement;
  FLAGS.forEach(({ key }) => root.classList.toggle(`a11y-${key}`, !!state[key]));
  // zoom ולא font-size: רוב הגדלים באתר ב-px וב-clamp, ו-font-size על html לא היה משפיע עליהם
  root.style.zoom = state.font ? String(1 + state.font * 0.12) : '';
  if (state.motion) gsap.globalTimeline.pause(); else gsap.globalTimeline.resume();
}

export default function A11yMenu() {
  const [state, setState] = useState<State>(load);
  const [open, setOpen] = useState(false);
  const statementRef = useRef<HTMLDialogElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    apply(state);
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* מצב פרטי: ההגדרה תחול רק בביקור הזה */ }
  }, [state]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); fabRef.current?.focus(); } };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // הכפתור "הצהרת נגישות" בתחתית (App.tsx) פותח את אותו חלון
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('[data-a11y-statement]')) statementRef.current?.showModal();
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const toggle = (key: Flag) => setState(s => ({ ...s, [key]: !s[key] }));
  const setFont = (delta: number) => setState(s => ({ ...s, font: Math.max(-2, Math.min(4, (s.font ?? 0) + delta)) }));
  const openStatement = () => { setOpen(false); statementRef.current?.showModal(); };

  return (
    <>
      <style>{`
        .a11y-fab { position: fixed; bottom: 18px; inset-inline-end: 18px; z-index: 160; width: 56px; height: 56px; padding: 0;
                    display: grid; place-items: center; border: 0; border-radius: 50%; background: var(--white); color: var(--blue-deep);
                    box-shadow: 0 0 0 2.5px var(--blue-deep), 5px 5px 0 2.5px var(--paper-3); cursor: pointer;
                    transition: transform .18s var(--ease-out); }
        .a11y-fab:active { transform: translate(2px, 2px); }
        .a11y-panel { position: fixed; bottom: 88px; inset-inline-end: 18px; z-index: 161; width: min(320px, calc(100vw - 36px));
                      background: var(--white); border-radius: 18px; padding: 16px;
                      box-shadow: 0 0 0 2.5px var(--blue-deep), 8px 8px 0 2.5px var(--paper-3); }
        .a11y-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;
                     font-family: var(--ff-title); font-size: 20px; color: var(--ink); }
        .a11y-x { width: 44px; height: 44px; border: 0; background: none; font-size: 28px; line-height: 1; color: var(--blue-ink); cursor: pointer; }
        .a11y-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .a11y-grid button { min-height: 48px; padding: 10px 8px; font: inherit; font-size: 15px; color: var(--ink); cursor: pointer;
                            background: var(--paper-1); border: 2px solid var(--paper-3); border-radius: 12px;
                            transition: border-color .2s, background-color .2s; }
        .a11y-grid button[aria-pressed="true"] { border-color: var(--blue-deep); background: var(--paper-3); }
        @media (hover: hover) and (pointer: fine) { .a11y-grid button:hover { border-color: var(--blue-deep); } }
        .a11y-grid .a11y-reset { grid-column: 1 / -1; }
        .a11y-link { display: block; width: 100%; min-height: 44px; margin-top: 8px; border: 0; background: none; font: inherit; font-size: 15px;
                     color: var(--blue-ink); text-decoration: underline; cursor: pointer; }
        .a11y-statement { width: min(640px, calc(100vw - 32px)); max-height: calc(100dvh - 48px); padding: clamp(20px, 4vw, 36px);
                          border: 0; border-radius: 18px; color: var(--ink); background: var(--white);
                          box-shadow: 0 0 0 2.5px var(--blue-deep), 10px 10px 0 2.5px var(--paper-3); }
        .a11y-statement::backdrop { background: rgba(20, 40, 70, .45); }
        .a11y-statement h2 { font-size: clamp(24px, 3vw, 32px); margin: 0 0 14px; }
        .a11y-statement p, .a11y-statement li { font-size: 16px; line-height: 1.7; }
        .a11y-statement ul { padding-inline-start: 20px; margin: 0 0 12px; }
        .a11y-statement a { color: var(--blue-ink); text-decoration: underline; }
        .a11y-statement .fine { color: var(--muted); font-size: 14px; }
        .a11y-statement form { position: sticky; top: 0; float: inline-end; margin: -8px -8px 0 0; }
        .foot-a11y { border: 0; background: none; padding: 0; min-height: 44px; font: inherit; font-size: 14px; color: var(--muted);
                     text-decoration: underline; cursor: pointer; }

        html.a11y-contrast { filter: contrast(1.35); }
        html.a11y-links a { text-decoration: underline !important; text-underline-offset: 3px; }
        html.a11y-readable, html.a11y-readable * { font-family: Arial, "Heebo", sans-serif !important; letter-spacing: .2px; }
        html.a11y-bigcursor, html.a11y-bigcursor * { cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath d='M6 2l26 14-11 3-5 12z' fill='%23000' stroke='%23fff' stroke-width='2'/%3E%3C/svg%3E") 4 2, auto !important; }
        html.a11y-motion *, html.a11y-motion *::before, html.a11y-motion *::after { animation-play-state: paused !important; transition: none !important; scroll-behavior: auto !important; }
        html.a11y-motion .reveal, html.a11y-motion .stagger > * { opacity: 1 !important; transform: none !important; }
        html.a11y-motion .ldraw .ld { stroke-dashoffset: 0 !important; }
        html.a11y-motion .ldraw .lf { opacity: 1 !important; transform: translate(8px, 7px) !important; }
      `}</style>

      <button ref={fabRef} type="button" className="a11y-fab" aria-label="תפריט נגישות" aria-expanded={open} aria-controls="a11y-panel"
              onClick={() => setOpen(o => !o)}>
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="16" cy="6.5" r="2.6" />
          <path d="M6 11.5 C12 13 20 13 26 11.5 M16 13 V19 M16 19 L11.5 27.5 M16 19 L20.5 27.5" />
        </svg>
      </button>

      {open && (
        <div id="a11y-panel" className="a11y-panel" role="dialog" aria-label="אפשרויות נגישות">
          <div className="a11y-head">
            נגישות
            <button type="button" className="a11y-x" aria-label="סגירת תפריט הנגישות" onClick={() => { setOpen(false); fabRef.current?.focus(); }}>×</button>
          </div>
          <div className="a11y-grid">
            <button type="button" onClick={() => setFont(1)}>א+ הגדלת טקסט</button>
            <button type="button" onClick={() => setFont(-1)}>א- הקטנת טקסט</button>
            {FLAGS.map(f => (
              <button key={f.key} type="button" aria-pressed={!!state[f.key]} onClick={() => toggle(f.key)}>{f.label}</button>
            ))}
            <button type="button" className="a11y-reset" onClick={() => setState({})}>איפוס</button>
          </div>
          <button type="button" className="a11y-link" onClick={openStatement}>הצהרת נגישות</button>
        </div>
      )}

      <dialog ref={statementRef} className="a11y-statement" aria-labelledby="a11y-title">
        <form method="dialog"><button className="a11y-x" aria-label="סגירת הצהרת הנגישות">×</button></form>
        <h2 id="a11y-title">הצהרת נגישות</h2>
        <p>
          אתר זה שואף לאפשר שימוש נוח וגישה שוויונית לכלל המשתמשים, לרבות אנשים עם מוגבלות, בהתאם לתקנות שוויון זכויות לאנשים
          עם מוגבלות (התאמות נגישות לשירות), התשע"ג-2013, ולתקן הישראלי <span className="ltr">IS 5568</span> ברמה <span className="ltr">AA</span>.
        </p>
        <p>מה נעשה באתר:</p>
        <ul>
          <li>תפריט נגישות (הכפתור בפינת המסך): הגדלת והקטנת טקסט, ניגודיות גבוהה, הדגשת קישורים, גופן קריא, עצירת אנימציות וסמן גדול.</li>
          <li>ניווט מלא במקלדת, קישור "דילוג לתוכן" וסימון ברור של הרכיב שבפוקוס.</li>
          <li>טקסט חלופי לתמונות, מבנה כותרות תקין וניגודיות צבעים לפי התקן.</li>
          <li>כפתור לעצירת רצועת התמונות שזזה, והתחשבות בהגדרת "הפחתת תנועה" של המכשיר.</li>
        </ul>
        <p>
          הסרטונים מוטמעים מ-<span className="ltr">YouTube</span>, והנגישות שלהם (כתוביות ונגן) תלויה בפלטפורמה.
        </p>
        <p>
          אם נתקלתם בקושי בנגישות, נשמח שתעדכנו. רכז הנגישות: {PERSONAL.name},{' '}
          <a className="ltr" href={`tel:${PERSONAL.phone.replace(/-/g, '')}`}>{PERSONAL.phone}</a>,{' '}
          <a className="ltr" href={`mailto:${PERSONAL.email}`}>{PERSONAL.email}</a>.
        </p>
        <p className="fine">עודכן: אוקטובר <span className="ltr">2026</span>.</p>
      </dialog>

    </>
  );
}

