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
          gap: clamp(24px, 5vw, 48px); align-items: center; justify-items: center;
        }
        .about-photo {
          width: clamp(180px, 42vw, 230px); aspect-ratio: 1;
          border-radius: 50%; overflow: hidden;
          border: 5px solid var(--card);
          box-shadow: var(--shadow-float);
        }
        .about-photo img { width: 100%; height: 100%; object-fit: cover; object-position: center top; }
        .about-text { text-align: center; }
        @media (min-width: 820px) {
          .about-grid { grid-template-columns: auto 1fr; justify-items: initial; }
          .about-text { text-align: initial; }
        }
      `}</style>

      <div className="wrap narrow">
        <div className="about-grid">
          <div className="about-photo reveal-pop">
            <img src={`${base}profile.jpg`} alt={PERSONAL.name} />
          </div>

          <div className="about-text reveal">
            <h2 style={{ marginBottom: 6 }}>נעים להכיר</h2>
            <h3 style={{ marginBottom: 4 }}>{PERSONAL.name}</h3>
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
