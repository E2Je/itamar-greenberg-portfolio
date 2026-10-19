import { useEffect, useRef } from 'react';
import { PERSONAL } from '../data/content';
import { MailIcon, WhatsAppIcon } from './LineIcons';
import { SIGN_D, SIGNATURE_PATHS, startHeroMorph } from './heroMorph';

/**
 * המסך הראשון: טקסט מימין, ומשמאל קו כחול אחד שמשנה צורה (heroMorph.ts):
 * אק"ג -> שיחה -> רעיון -> מחשב -> תהליך -> רובוט -> לייק -> AI can do it.
 * בלי JS או בתנועה מופחתת: עומדת החתימה הגמורה.
 */
export default function Hero() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    return startHeroMorph(svg);
  }, []);

  return (
    <>
      <section id="top" className="hero">
        <style>{`
          .hero { background: var(--white); padding-top: var(--header-h); }
          .hero-inner { max-width: 1309px; margin-inline: auto; padding: clamp(24px, 4vw, 48px) var(--gutter) clamp(32px, 5vw, 64px);
                        display: grid; gap: 12px; align-items: center; grid-template-columns: minmax(0, 1fr); }
          @media (min-width: 960px) { .hero-inner { grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); min-height: min(640px, calc(100svh - var(--header-h))); } }
          .hero-name { font-family: var(--ff-title); font-weight: 400; color: var(--ink); font-size: clamp(40px, 6vw, 88px); line-height: 1.05; margin: 0; }
          .hero-sub { font-family: var(--ff-title); font-size: clamp(20px, 2vw, 28px); color: var(--ink); margin: 16px 0 30px; }
          .hero-ctas { display: flex; flex-wrap: wrap; gap: 10px; }
          .hero-art { min-width: 0; }
          /* בטלפון: הציור (שמתחיל באק"ג) קודם, ואחריו הטקסט */
          @media (max-width: 959px) { .hero-art { order: -1; max-width: 520px; width: 100%; margin-inline: auto; } }
          .hero-art svg { display: block; width: 100%; height: auto; overflow: hidden; }

        `}</style>

        <div className="hero-inner">
          <div className="stagger">
            <h1 className="hero-name" data-fit>{PERSONAL.name}</h1>
            <p className="hero-sub" data-fit>
              מוביל <span className="hl">טרנספורמציה דיגיטלית</span> ו<span className="hl">הטמעות AI</span>
            </p>
            <div className="hero-ctas">
              <a href={`mailto:${PERSONAL.email}`} className="lbtn lbtn-strong"><MailIcon />שלח מייל</a>
              <a href={PERSONAL.whatsapp} target="_blank" rel="noopener noreferrer" className="lbtn"><WhatsAppIcon />וואטסאפ</a>
            </div>
          </div>

          <div className="hero-art">
            <svg ref={svgRef} viewBox="140 30 540 430" role="img"
                 aria-label="קו כחול אחד שמשנה צורה: אק״ג, בועת שיחה, נורה, מחשב, גלגל שיניים, רובוט, לייק, ובסוף AI can do it">
              <path className="hm-patch" fill="#C9E2F8" stroke="none" transform="translate(14 12)" opacity="0" />
              <g className="hm-acc" fill="none" stroke="#4A90D9" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              <path className="hm-line" d={SIGN_D} fill="none" stroke="#2F6FB5" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
              <g transform="translate(186 196) scale(.95) skewX(-8)" fill="none" stroke="#2F6FB5" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round">
                {SIGNATURE_PATHS.map(d => <path key={d} className="hm-sig" d={d} />)}
              </g>
            </svg>
          </div>
        </div>
      </section>

    </>
  );
}
