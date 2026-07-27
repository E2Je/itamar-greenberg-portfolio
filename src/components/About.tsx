import { PERSONAL } from '../data/content';

const BIO_TEXT =
  'נשוי באושר, אבא, אח ומרכז תחום דיגיטל בבית חולים, מרצה לבינה מלאכותית וחשיבה יצירתית, אוהב ללמוד וללמד על דברים חדשים ואוהב לפתור בעיות.';

const base = import.meta.env.BASE_URL;

export default function About() {
  return (
    <section id="about" className="sec">
      <style>{`
        .about-grid {
          display: grid; grid-template-columns: 1fr;
          gap: clamp(24px, 5vw, 52px); align-items: center; justify-items: center;
        }

        .about-photo {
          position: relative;
          width: clamp(190px, 44vw, 240px); aspect-ratio: 1;
          flex-shrink: 0;
        }
        /* טבעת דקה שנושמת לאט מאחורי התמונה - תנועה אחת ואיטית,
           לא זרקור. 9 שניות למחזור כדי שתישאר ברקע התודעה. */
        .about-photo::before {
          content: ""; position: absolute; inset: -10px;
          border-radius: 50%;
          border: 1px solid var(--accent);
          opacity: .22;
          animation: aboutBreathe 9s ease-in-out infinite;
        }
        .about-photo::after {
          content: ""; position: absolute; inset: -10px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 20%, rgba(232,163,61,.16), transparent 62%);
          pointer-events: none;
        }
        @keyframes aboutBreathe {
          0%, 100% { transform: scale(1);    opacity: .20; }
          50%      { transform: scale(1.04); opacity: .38; }
        }

        .about-photo img {
          position: relative; z-index: 1;
          width: 100%; height: 100%;
          border-radius: 50%; object-fit: cover; object-position: center top;
          border: 5px solid var(--card);
          box-shadow: var(--shadow-float);
          transition: transform .6s var(--ease-spring);
        }
        .about-photo:hover img { transform: scale(1.03); }

        .about-text { text-align: center; }
        @media (min-width: 820px) {
          .about-grid { grid-template-columns: auto 1fr; justify-items: initial; }
          .about-text { text-align: initial; }
        }
        @media (prefers-reduced-motion: reduce) {
          .about-photo::before { animation: none; }
        }
      `}</style>

      <div className="wrap narrow">
        <div className="about-grid">
          <div className="about-photo reveal-pop">
            <img
              src={`${base}profile.webp`}
              alt={PERSONAL.name}
              width={480}
              height={480}
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="about-text reveal">
            <h2 style={{ marginBottom: 6 }}>נעים להכיר</h2>
            <div className="rule" />
            <h3 style={{ margin: '14px 0 4px' }}>{PERSONAL.name}</h3>
            <p style={{ color: 'var(--accent-deep)', fontFamily: 'var(--ff-title)', fontSize: 16 }}>
              {PERSONAL.title}
            </p>
            <p style={{ fontSize: 16.5, lineHeight: 1.9, marginBottom: 0 }}>{BIO_TEXT}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
