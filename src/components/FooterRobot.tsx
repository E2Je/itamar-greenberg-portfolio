import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * הרובוט מהסרטון (אותו ראש בדיוק) עם גוף מלא, בתחתית העמוד ליד כפתורי הקשר.
 * כניסה (פעם אחת): ידיים נאחזות בקצה הימני של המסך, מתח עם הראש, נכנס ועומד במקום הקבוע שלו.
 * אחר כך הוא לא עומד סטטי: במחזור - מנופף שלום, מצביע קדימה-אחורה על שלושת כפתורי הקשר,
 * ומסמן "בוא" עם האצבע. לחיצה עליו - מנופף. בלי JS או בתנועה מופחתת: עומד ומצביע.
 *
 * יחידות: הרגליים ב-y=0, הראש למעלה (y שלילי). כל כף יד מצוירת במערכת משלה: "קדימה" = כיוון היד.
 */
const DEEP = '#2F6FB5', INK = '#1E3A56', PATCH = '#C9E2F8', BLUE = '#4A90D9', WHITE = '#FFFFFF';
const SH_L = [-90, -245] as const, SH_R = [90, -245] as const;   // כתפיים
const HAND_L = [-140, -128] as const, HAND_R = [140, -128] as const; // כפות במנוחה (ידיים ארוכות)
const ANG_L = 112.8, ANG_R = 67.2;                                    // כיוון היד במנוחה (מעלות)
const WAVE_ROT = -128, POINT_ROT = 52;
const HALF_W = 180; // חצי רוחב ה-viewBox

/** אצבע/אגודל: קפסולה עם מתאר כחול ומילוי לבן */
function Digit({ x1, y1, x2, y2, w = 11 }: { x1: number; y1: number; x2: number; y2: number; w?: number }) {
  const d = `M${x1} ${y1} L${x2} ${y2}`;
  return <><path d={d} stroke={DEEP} strokeWidth={w + 7} /><path d={d} stroke={WHITE} strokeWidth={w} /></>;
}

/** כף פתוחה: כף, ארבע אצבעות קדימה ואגודל בצד */
function OpenHand() {
  return (
    <g>
      {[-15, -5, 5, 15].map((a, i) => {
        const r = (a * Math.PI) / 180, y0 = -12 + i * 8;
        return <Digit key={a} x1={18} y1={y0} x2={18 + 30 * Math.cos(r)} y2={y0 + 30 * Math.sin(r)} />;
      })}
      <Digit x1={6} y1={-12} x2={14} y2={-34} />
      <rect x="-8" y="-20" width="34" height="40" rx="14" fill={WHITE} stroke={DEEP} strokeWidth="6" />
    </g>
  );
}

/** אגרוף עם אצבע מורה קדימה (לסמן "בוא" האצבע מתכופפת סביב המפרק) */
function PointHand({ curl = false }: { curl?: boolean }) {
  return (
    <g>
      <g className={curl ? 'rb-curl' : undefined}>
        <Digit x1={18} y1={-10} x2={46} y2={-10} w={10} />
      </g>
      <rect x="-8" y="-18" width="32" height="36" rx="13" fill={WHITE} stroke={DEEP} strokeWidth="6" />
      <path d="M22 -2 Q14 0 22 6 M22 8 Q14 10 22 14" stroke={DEEP} strokeWidth="4" />
      <Digit x1={4} y1={-16} x2={14} y2={-26} w={9} />
    </g>
  );
}

/** כף במנוחה: אגרוף רפוי */
function RestHand() {
  return (
    <g>
      <rect x="-8" y="-17" width="32" height="34" rx="14" fill={WHITE} stroke={DEEP} strokeWidth="6" />
      <path d="M20 -6 Q14 -3 20 2 M20 6 Q14 9 20 12" stroke={DEEP} strokeWidth="4" />
    </g>
  );
}

const handAt = ([x, y]: readonly [number, number], ang: number) => `translate(${x} ${y}) rotate(${ang}) scale(1.35)`;

export default function FooterRobot() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const svg = wrap?.querySelector('svg');
    if (!wrap || !svg) return;
    const q = gsap.utils.selector(wrap);
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const show = (on: string[], off: string[]) => { gsap.set(q(on.join(',')), { opacity: 1 }); gsap.set(q(off.join(',')), { opacity: 0 }); };
    if (reduce) {
      gsap.set(q('.rb-arm-l'), { rotation: POINT_ROT, svgOrigin: SH_L.join(' ') });
      show(['.rb-l-point'], ['.rb-l-rest']);
      return;
    }

    let io: IntersectionObserver | undefined;
    let wave: gsap.core.Timeline | null = null;
    const ctx = gsap.context(() => {
      const unit = () => svg.getBoundingClientRect().width / (HALF_W * 2);
      const edge = () => HALF_W + (window.innerWidth - svg.getBoundingClientRect().right) / unit();
      const buttons = Array.from(document.querySelectorAll<HTMLElement>('.foot-links .lbtn')).slice(0, 3);
      // הזווית שבה האצבע מכוונת למרכז הכפתור
      const aimAt = (btn: HTMLElement) => {
        const m = svg.getScreenCTM();
        if (!m) return POINT_ROT;
        const sh = new DOMPoint(SH_L[0], SH_L[1]).matrixTransform(m);
        const r = btn.getBoundingClientRect();
        return (Math.atan2(r.top + r.height / 2 - sh.y, r.left + r.width / 2 - sh.x) * 180) / Math.PI - ANG_L;
      };

      gsap.set(q('.rb-arm-l'), { rotation: 0, svgOrigin: SH_L.join(' ') });
      gsap.set(q('.rb-arm-r'), { rotation: 0, svgOrigin: SH_R.join(' ') });
      gsap.set(q('.rb-curl'), { rotation: 0, svgOrigin: '18 -10' });
      show(['.rb-l-rest', '.rb-r-rest'], ['.rb-l-point', '.rb-r-open']);
      gsap.set(q('.rb-robot'), { x: () => edge() + 220 });
      gsap.set(q('.rb-body'), { opacity: 0 });
      gsap.set(q('.rb-grips'), { x: () => edge() + 60, opacity: 0 });

      // שלום: יד ימין עולה עם כף פתוחה ומנופפת
      const waveTl = () => gsap.timeline()
        .call(() => show(['.rb-r-open'], ['.rb-r-rest']))
        .to(q('.rb-arm-r'), { rotation: WAVE_ROT, duration: .35, ease: 'back.out(1.6)' })
        .to(q('.rb-arm-r'), { rotation: WAVE_ROT + 24, duration: .17, ease: 'sine.inOut', yoyo: true, repeat: 5 })
        .to(q('.rb-arm-r'), { rotation: 0, duration: .35, ease: 'power2.inOut' })
        .call(() => show(['.rb-r-rest'], ['.rb-r-open']));
      wave = gsap.timeline({ paused: true }).add(waveTl());

      // מצביע על כל כפתור ודוחף את האצבע קדימה-אחורה; הכפתור קופץ
      const pointTl = () => {
        const tl = gsap.timeline()
          .call(() => show(['.rb-l-point'], ['.rb-l-rest']))
          .to(q('.rb-eyes'), { x: -10, duration: .25 }, 0);
        buttons.forEach((btn, i) => {
          tl.to(q('.rb-arm-l'), { rotation: () => aimAt(btn), duration: .35, ease: i ? 'power2.inOut' : 'back.out(1.8)' })
            .to(q('.rb-l-point'), { x: 9, duration: .12, yoyo: true, repeat: 3, ease: 'power1.inOut' })
            .to(btn, { y: -6, duration: .14, yoyo: true, repeat: 1, ease: 'power2.out' }, '<');
        });
        return tl.to(q('.rb-arm-l'), { rotation: 0, duration: .4, ease: 'power2.inOut' })
          .to(q('.rb-eyes'), { x: 0, duration: .25 }, '<')
          .call(() => show(['.rb-l-rest'], ['.rb-l-point']));
      };

      // "בוא!": היד שפונה לעמוד מורמת אל המבקר, והאצבע מתכופפת אליו שוב ושוב
      const beckonTl = () => gsap.timeline()
        .call(() => show(['.rb-l-point'], ['.rb-l-rest']))
        .to(q('.rb-arm-l'), { rotation: POINT_ROT + 34, duration: .35, ease: 'power2.out' })
        .to(q('.rb-curl'), { rotation: 100, duration: .2, ease: 'sine.inOut', yoyo: true, repeat: 5 })
        .to(q('.rb-head'), { rotation: -5, svgOrigin: '0 -270', duration: .3, yoyo: true, repeat: 1, ease: 'sine.inOut' }, '<')
        .to(q('.rb-arm-l'), { rotation: 0, duration: .35, ease: 'power2.inOut' })
        .call(() => show(['.rb-l-rest'], ['.rb-l-point']));

      const loop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.2 })
        .add(waveTl())
        .add(pointTl(), '+=.3')
        .add(beckonTl(), '+=.3');

      const enter = gsap.timeline({ paused: true, onComplete: () => { idle(); loop.play(); } });
      // 1. הידיים נאחזות בקצה המסך
      enter.to(q('.rb-grips'), { x: () => edge() - 6, opacity: 1, duration: .4, ease: 'power3.out' })
      // 2. מתח: רק הראש והידיים, מחייך
        .fromTo(q('.rb-robot'), { x: () => edge() + 220, y: 120 }, { x: () => edge() - 30, y: 0, duration: .8, ease: 'power2.out' }, .45)
        .to(q('.rb-robot'), { y: 14, duration: .16, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 1.25)
      // 3. נכנס ועומד במקום הקבוע שלו
        .to(q('.rb-grips'), { x: () => edge() + 70, opacity: 0, duration: .3, ease: 'power2.in' }, 1.6)
        .to(q('.rb-body'), { opacity: 1, duration: .25 }, 1.65)
        .to(q('.rb-robot'), { x: 0, duration: .7, ease: 'back.out(1.4)' }, 1.65)
        .to(q('.rb-leg-l'), { rotation: -14, svgOrigin: '-40 -130', duration: .17, yoyo: true, repeat: 3 }, 1.7)
        .to(q('.rb-leg-r'), { rotation: 14, svgOrigin: '40 -130', duration: .17, yoyo: true, repeat: 3 }, 1.78)
        .to(q('.rb-mouth'), { attr: { d: 'M-46 -332 Q0 -286 46 -332' }, duration: .25 }, 2.2);

      function idle() {
        gsap.to(q('.rb-upper'), { y: -5, duration: 1.5, ease: 'sine.inOut', yoyo: true, repeat: -1 });
        gsap.timeline({ repeat: -1, repeatDelay: 3.2 })
          .to(q('.rb-eye'), { scaleY: .15, transformOrigin: '50% 50%', duration: .08, yoyo: true, repeat: 1 });
      }

      io = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        enter.play();
        io?.disconnect();
      }, { threshold: .5 });
      io.observe(wrap);
    }, wrap);

    const onTap = () => wave?.restart();
    wrap.addEventListener('click', onTap);
    return () => { io?.disconnect(); wrap.removeEventListener('click', onTap); ctx.revert(); };
  }, []);

  return (
    <div className="foot-robot" ref={wrapRef} aria-hidden="true">
      <svg viewBox={`${-HALF_W} -580 ${HALF_W * 2} 600`} fill="none" stroke={DEEP} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
        {/* ידיים שנאחזות בקצה המסך (רק בכניסה) */}
        <g className="rb-grips" opacity="0">
          {[-430, -300].map(y => (
            <g key={y} transform={`translate(0 ${y})`}><PointHand /></g>
          ))}
        </g>

        <g className="rb-robot">
          <g className="rb-upper">
            <g className="rb-body">
              {/* רגליים */}
              <g className="rb-leg-l"><path d="M-40 -130 L-40 -16" strokeWidth="11" /><rect x="-66" y="-20" width="52" height="22" rx="8" fill={WHITE} strokeWidth="6" /></g>
              <g className="rb-leg-r"><path d="M40 -130 L40 -16" strokeWidth="11" /><rect x="14" y="-20" width="52" height="22" rx="8" fill={WHITE} strokeWidth="6" /></g>
              {/* יד שמאל (של הצופה): מנוחה / מצביעה */}
              <g className="rb-arm-l">
                <path d={`M${SH_L[0]} ${SH_L[1]} L${HAND_L[0]} ${HAND_L[1]}`} strokeWidth="11" />
                <g transform={handAt(HAND_L, ANG_L)}>
                  <g className="rb-l-rest"><RestHand /></g>
                  <g className="rb-l-point" opacity="0"><PointHand curl /></g>
                </g>
              </g>
              {/* יד ימין: מנוחה / שלום / בוא */}
              <g className="rb-arm-r">
                <path d={`M${SH_R[0]} ${SH_R[1]} L${HAND_R[0]} ${HAND_R[1]}`} strokeWidth="11" />
                <g transform={handAt(HAND_R, ANG_R)}>
                  <g className="rb-r-rest"><RestHand /></g>
                  <g className="rb-r-open" opacity="0"><OpenHand /></g>
                </g>
              </g>
              {/* גוף עם אק"ג קטן */}
              <rect x="-78" y="-248" width="184" height="140" rx="26" fill={PATCH} stroke="none" />
              <rect x="-92" y="-260" width="184" height="140" rx="26" fill={WHITE} />
              <path d="M-56 -190 L-26 -190 L-16 -212 L0 -160 L14 -206 L24 -190 L56 -190" stroke={BLUE} strokeWidth="6" />
            </g>
            {/* הראש - בדיוק כמו בסרטון */}
            <g className="rb-head">
              <path d="M0 -490 L0 -534" />
              <circle cx="0" cy="-548" r="14" fill={PATCH} strokeWidth="6" />
              <rect x="-96" y="-478" width="220" height="220" rx="30" fill={PATCH} stroke="none" />
              <rect x="-132" y="-420" width="22" height="52" rx="6" fill={WHITE} strokeWidth="6" />
              <rect x="110" y="-420" width="22" height="52" rx="6" fill={WHITE} strokeWidth="6" />
              <rect x="-110" y="-490" width="220" height="220" rx="30" fill={WHITE} />
              <g className="rb-eyes" stroke={INK} strokeWidth="9">
                <path className="rb-eye" d="M-40 -404 L-40 -380" />
                <path className="rb-eye" d="M40 -404 L40 -380" />
              </g>
              <path className="rb-mouth" d="M-42 -330 Q0 -300 42 -330" stroke={INK} />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
