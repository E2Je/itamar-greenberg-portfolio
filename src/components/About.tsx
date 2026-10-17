import { PERSONAL } from '../data/content';
import LineDraw from './LineDraw';

const base = import.meta.env.BASE_URL;

const BIO_TEXT =
  'נשוי באושר, אבא, אח ומרכז תחום הדיגיטל ומדיה בבית חולים, מרצה לבינה מלאכותית ולחשיבה יצירתית. אוהב ללמוד, לשתף ידע, לגלות עולמות חדשים ולהפוך אתגרים לפתרונות.';

/**
 * כמו "I FOLLOW THE PAPER TRAIL" אצל J Scott: תמונה בצד אחד, כותרת וטקסט בצד השני.
 * התמונה בגודל בינוני - לא במרכז הדף.
 */
export default function About() {
  return (
    <section id="about" className="sec about">
      <style>{`
        .about { background: var(--paper-1); }
        .about-grid { display: grid; gap: clamp(28px, 4vw, 64px); align-items: center; grid-template-columns: minmax(0, 1fr); }
        @media (min-width: 860px) { .about-grid { grid-template-columns: minmax(0, 380px) minmax(0, 1fr); } }
        /* תמונה בלי רקע שיוצאת מעיגול תכלת: הראש עולה מעל העיגול, והקו המצויר עובר מאחוריו */
        .about-fig { position: relative; width: 100%; max-width: 400px; aspect-ratio: 400 / 470; margin: 0 auto; }
        .about-disc { position: absolute; inset: auto 0 0 0; aspect-ratio: 1; border-radius: 50%; background: var(--paper-3); }
        .about-ring { position: absolute; inset: auto -16px -16px -16px; aspect-ratio: 1; width: calc(100% + 32px); height: auto; }
        .about-cut { position: absolute; inset: 0; overflow: hidden; border-radius: 0 0 50% 50% / 0 0 42.55% 42.55%; }
        .about-photo { position: absolute; bottom: 0; left: 50%; height: 100%; width: auto; max-width: none; transform: translateX(-50%); }
        .about-name { font-size: clamp(24px, 2.6vw, 32px); margin: 14px 0 8px; }
        .about-role { font-size: clamp(18px, 1.8vw, 22px); color: var(--blue-deep); margin: 0; }
        .about-bio { font-size: clamp(18px, 1.6vw, 22px); line-height: 1.65; color: var(--ink); margin: 18px 0 0; max-width: 640px; }
      `}</style>
      <div className="wrap">
        <div className="about-grid">
          <figure className="about-fig reveal">
            <div className="about-disc" />
            <LineDraw viewBox="0 0 400 400" className="about-ring">
              <path className="ld" d="M200 14 C306 10 388 86 386 196 C384 304 306 388 198 386 C92 384 14 306 16 198 C18 98 92 18 214 20" />
              <path className="ld" d="M352 40 L358 22 L364 40 L382 46 L364 52 L358 70 L352 52 L334 46 Z" stroke="#4A90D9" />
              <path className="ld" d="M8 330 q12 -14 24 0 t24 0" />
              <path className="ld" d="M378 300 L396 292 M374 322 L396 326" stroke="#4A90D9" />
            </LineDraw>
            <div className="about-cut">
              <img className="about-photo" src={`${base}profile-cutout.webp`} alt={PERSONAL.name} width={520} height={839} loading="lazy" />
            </div>
          </figure>
          <div className="stagger">
            <h2 data-fit>נעים להכיר</h2>
            <h3 className="about-name">{PERSONAL.name}</h3>
            <p className="about-role">{PERSONAL.title}</p>
            <p className="about-bio">{BIO_TEXT}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
