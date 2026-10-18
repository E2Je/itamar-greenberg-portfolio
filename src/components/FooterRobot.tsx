import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * הרובוט מהסרטון (אותו ראש בדיוק) עם גוף מלא, בתחתית העמוד ליד כפתורי הקשר.
 * כניסה (פעם אחת): ידיים נאחזות בקצה הימני של המסך, מתח עם הראש, נכנס ועומד במקום הקבוע שלו.
 * אחר כך שני סבבים לסירוגין, עם הפסקות:
 *   רגיל  - מנופף שלום, מצביע על כל אחד משלושת כפתורי הקשר, ומסמן "בוא" בכף יד פתוחה.
 *   מצחיק - קופץ פעמיים ומנופף בשתי הידיים מעל הראש כדי למשוך תשומת לב, ואז מצביע על הכפתורים.
 * בלי JS או בתנועה מופחתת: עומד ומצביע.
 *
 * יחידות: הרגליים ב-y=0, הראש למעלה (y שלילי).
 * כל כף יד מצוירת במערכת משלה: +x = לאן שהיד מכוונת (האצבעות), -y = צד האגודל.
 * כף שמאל משוקפת, כך שכשהוא מצביע שמאלה האגודל למעלה - כמו אצל אדם.
 */
const DEEP = '#2F6FB5', INK = '#1E3A56', PATCH = '#C9E2F8', BLUE = '#4A90D9', WHITE = '#FFFFFF';
const SH_L = [-90, -245] as const, SH_R = [90, -245] as const;       // כתפיים
const HAND_L = [-140, -128] as const, HAND_R = [140, -128] as const; // כפות במנוחה
const ANG_L = 112.8, ANG_R = 67.2;                                    // כיוון היד במנוחה (מעלות)
const RAISE = 128;      // כמה מעלות מרימים יד לנפנוף מעל הראש
const BECKON_ROT = 84;  // יד שמאל קדימה אל העמוד, כף פתוחה כלפי מעלה
const POINT_ROT = 52;
const HALF_W = 180;     // חצי רוחב ה-viewBox
const SMILE = 'M-42 -330 Q0 -300 42 -330', BIG_SMILE = 'M-46 -334 Q0 -284 46 -334', WOW = 'M-30 -330 Q0 -270 30 -330';

/** אצבע/אגודל: קפסולה עם מתאר כחול ומילוי לבן */
function Digit({ x1, y1, x2, y2, w = 11 }: { x1: number; y1: number; x2: number; y2: number; w?: number }) {
  const d = `M${x1} ${y1} L${x2} ${y2}`;
  return <><path d={d} stroke={DEEP} strokeWidth={w + 7} /><path d={d} stroke={WHITE} strokeWidth={w} /></>;
}

/** כף פתוחה: ארבע אצבעות קדימה (מתקפלות ב"בוא"), אגודל בצד */
function OpenHand() {
  return (
    <g>
      <g className="rb-fingers">
        {[-12, -4, 4, 12].map((y0, i) => <Digit key={y0} x1={16} y1={y0} x2={44 - Math.abs(i - 1.5) * 3} y2={y0 * 1.25} w={9} />)}
      </g>
      <Digit x1={4} y1={-14} x2={12} y2={-34} w={9} />
      <rect x="-8" y="-19" width="32" height="38" rx="14" fill={WHITE} stroke={DEEP} strokeWidth="6" />
    </g>
  );
}

/** אגרוף עם אצבע מורה קדימה ואגודל למעלה */
function PointHand() {
  return (
    <g>
      <Digit x1={16} y1={-9} x2={40} y2={-9} w={9} />
      <rect x="-8" y="-17" width="30" height="34" rx="13" fill={WHITE} stroke={DEEP} strokeWidth="6" />
      <path d="M20 -1 Q13 1 20 6 M20 8 Q13 10 20 14" stroke={DEEP} strokeWidth="4" />
      <Digit x1={2} y1={-15} x2={14} y2={-21} w={8} />
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

const handAt = ([x, y]: readonly [number, number], ang: number, mirror = false) =>
  `translate(${x} ${y}) rotate(${ang}) scale(1.35 ${mirror ? -1.35 : 1.35})`;

export default function FooterRobot() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const svg = wrap?.querySelector('svg');
    if (!wrap || !svg) return;
    const q = gsap.utils.selector(wrap);
    const hand = (side: 'l' | 'r', kind: 'rest' | 'open' | 'point') => {
      gsap.set(q(`.rb-${side}-rest, .rb-${side}-open, .rb-${side}-point`), { opacity: 0 });
      gsap.set(q(`.rb-${side}-${kind}`), { opacity: 1 });
    };
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(q('.rb-arm-l'), { rotation: POINT_ROT, svgOrigin: SH_L.join(' ') });
      hand('l', 'point');
      return;
    }

    let io: IntersectionObserver | undefined;
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

      const armL = q('.rb-arm-l'), armR = q('.rb-arm-r');
      gsap.set(armL, { rotation: 0, svgOrigin: SH_L.join(' ') });
      gsap.set(armR, { rotation: 0, svgOrigin: SH_R.join(' ') });
      gsap.set(q('.rb-fingers'), { transformOrigin: '0% 50%' });
      hand('l', 'rest'); hand('r', 'rest');
      gsap.set(q('.rb-robot'), { x: () => edge() + 220 });
      gsap.set(q('.rb-body'), { opacity: 0 });
      gsap.set(q('.rb-grips'), { x: () => edge() + 60, opacity: 0 });

      // שלום: יד ימין עולה, כף פתוחה, נפנוף רך
      const wave = () => gsap.timeline()
        .call(() => hand('r', 'open'))
        .to(armR, { rotation: -RAISE, duration: .45, ease: 'power2.out' })
        .to(armR, { rotation: -RAISE + 20, duration: .32, ease: 'sine.inOut', yoyo: true, repeat: 3 })
        .to(armR, { rotation: 0, duration: .45, ease: 'power2.inOut' })
        .call(() => hand('r', 'rest'));

      // מצביע על כל כפתור, דחיפה קטנה אחת של האצבע, והכפתור קופץ
      const point = () => {
        const tl = gsap.timeline().call(() => hand('l', 'point')).to(q('.rb-eyes'), { x: -10, duration: .3 }, 0);
        buttons.forEach(btn => {
          tl.to(armL, { rotation: () => aimAt(btn), duration: .5, ease: 'power2.inOut' })
            .to(q('.rb-l-point'), { x: 6, duration: .2, yoyo: true, repeat: 1, ease: 'power1.inOut' })
            .to(btn, { y: -6, duration: .18, yoyo: true, repeat: 1, ease: 'power2.out' }, '<')
            .to({}, { duration: .2 });
        });
        if (!buttons.length) tl.to(armL, { rotation: POINT_ROT, duration: .5 }).to({}, { duration: 1 });
        return tl.to(armL, { rotation: 0, duration: .5, ease: 'power2.inOut' })
          .to(q('.rb-eyes'), { x: 0, duration: .3 }, '<')
          .call(() => hand('l', 'rest'));
      };

      // "בוא": יד שמאל קדימה אל העמוד, כף פתוחה כלפי מעלה, האצבעות מתקפלות אליו
      const beckon = () => gsap.timeline()
        .call(() => hand('l', 'open'))
        .to(armL, { rotation: BECKON_ROT, duration: .45, ease: 'power2.out' })
        .to(q('.rb-l-open .rb-fingers'), { scaleX: .35, duration: .32, ease: 'sine.inOut', yoyo: true, repeat: 5 })
        .to(q('.rb-head'), { rotation: -5, svgOrigin: '0 -270', duration: .5, yoyo: true, repeat: 1, ease: 'sine.inOut' }, '<')
        .to(armL, { rotation: 0, duration: .45, ease: 'power2.inOut' })
        .call(() => hand('l', 'rest'));

      // מצחיק: קופץ פעמיים ומנופף בשתי הידיים מעל הראש, פה פתוח, ואז מצביע
      const funny = () => {
        const tl = gsap.timeline()
          .call(() => { hand('l', 'open'); hand('r', 'open'); })
          .to(q('.rb-mouth'), { attr: { d: WOW }, duration: .2 })
          .to(armL, { rotation: RAISE, duration: .3, ease: 'back.out(1.6)' }, '<')
          .to(armR, { rotation: -RAISE, duration: .3, ease: 'back.out(1.6)' }, '<');
        for (let i = 0; i < 2; i++) {
          tl.to(q('.rb-robot'), { y: -70, duration: .28, ease: 'power2.out' })
            .to(armL, { rotation: RAISE - 26, duration: .14, yoyo: true, repeat: 1, ease: 'sine.inOut' }, '<')
            .to(armR, { rotation: -RAISE + 26, duration: .14, yoyo: true, repeat: 1, ease: 'sine.inOut' }, '<.07')
            .to(q('.rb-robot'), { y: 0, duration: .26, ease: 'power2.in' })
            .to(q('.rb-robot'), { scaleY: .9, scaleX: 1.07, svgOrigin: '0 0', duration: .09, yoyo: true, repeat: 1, ease: 'power1.out' });
        }
        tl.to(armL, { rotation: RAISE - 24, duration: .2, yoyo: true, repeat: 3, ease: 'sine.inOut' })
          .to(armR, { rotation: -RAISE + 24, duration: .2, yoyo: true, repeat: 3, ease: 'sine.inOut' }, '<.1')
          .to(armL, { rotation: 0, duration: .4, ease: 'power2.inOut' })
          .to(armR, { rotation: 0, duration: .4, ease: 'power2.inOut' }, '<')
          .to(q('.rb-mouth'), { attr: { d: BIG_SMILE }, duration: .2 }, '<')
          .call(() => { hand('l', 'rest'); hand('r', 'rest'); })
          .add(point(), '+=.1');
        return tl;
      };

      const loop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 2.5 })
        .addLabel('wave').add(wave())
        .addLabel('point', '+=.4').add(point(), 'point')
        .addLabel('beckon', '+=.4').add(beckon(), 'beckon')
        .addLabel('funny', '+=2.2').add(funny(), 'funny');
      // לבדיקות בפיתוח בלבד
      if (import.meta.env.DEV) Object.assign(window, { __robotLoop: loop, __robotEnter: () => enter });

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
        .to(q('.rb-mouth'), { attr: { d: BIG_SMILE }, duration: .25 }, 2.2);

      function idle() {
        gsap.to(q('.rb-upper'), { y: -5, duration: 1.6, ease: 'sine.inOut', yoyo: true, repeat: -1 });
        gsap.timeline({ repeat: -1, repeatDelay: 3.4 })
          .to(q('.rb-eye'), { scaleY: .15, transformOrigin: '50% 50%', duration: .08, yoyo: true, repeat: 1 });
      }

      io = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        enter.play();
        io?.disconnect();
      }, { threshold: .5 });
      io.observe(wrap);
    }, wrap);

    return () => { io?.disconnect(); ctx.revert(); };
  }, []);

  return (
    <div className="foot-robot" ref={wrapRef} aria-hidden="true">
      <svg viewBox={`${-HALF_W} -580 ${HALF_W * 2} 600`} fill="none" stroke={DEEP} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
        {/* ידיים שנאחזות בקצה המסך (רק בכניסה) */}
        <g className="rb-grips" opacity="0">
          {[-430, -300].map(y => (
            <g key={y} transform={`translate(0 ${y}) scale(1.2)`}><RestHand /></g>
          ))}
        </g>

        <g className="rb-robot">
          <g className="rb-upper">
            <g className="rb-body">
              {/* רגליים */}
              <g className="rb-leg-l"><path d="M-40 -130 L-40 -16" strokeWidth="11" /><rect x="-66" y="-20" width="52" height="22" rx="8" fill={WHITE} strokeWidth="6" /></g>
              <g className="rb-leg-r"><path d="M40 -130 L40 -16" strokeWidth="11" /><rect x="14" y="-20" width="52" height="22" rx="8" fill={WHITE} strokeWidth="6" /></g>
              {/* יד שמאל (של הצופה): מנוחה / מצביעה / פתוחה. משוקפת כדי שהאגודל יהיה למעלה */}
              <g className="rb-arm-l">
                <path d={`M${SH_L[0]} ${SH_L[1]} L${HAND_L[0]} ${HAND_L[1]}`} strokeWidth="11" />
                <g transform={handAt(HAND_L, ANG_L, true)}>
                  <g className="rb-l-rest"><RestHand /></g>
                  <g className="rb-l-point" opacity="0"><PointHand /></g>
                  <g className="rb-l-open" opacity="0"><OpenHand /></g>
                </g>
              </g>
              {/* יד ימין: מנוחה / פתוחה לנפנוף */}
              <g className="rb-arm-r">
                <path d={`M${SH_R[0]} ${SH_R[1]} L${HAND_R[0]} ${HAND_R[1]}`} strokeWidth="11" />
                <g transform={handAt(HAND_R, ANG_R)}>
                  <g className="rb-r-rest"><RestHand /></g>
                  <g className="rb-r-open" opacity="0"><OpenHand /></g>
                  <g className="rb-r-point" opacity="0"><PointHand /></g>
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
              <path className="rb-mouth" d={SMILE} stroke={INK} />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
