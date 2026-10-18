import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * הרובוט מהסרטון (אותו ראש בדיוק) עם גוף מלא, בתחתית העמוד ליד כפתורי הקשר. לפי הסטוריבורד שאושר:
 * 1. ידיים נאחזות בקצה הימני של המסך  2. מתח: רק הידיים והראש, מחייך
 * 3. נכנס ועומד - זה המקום הקבוע שלו  4. מנופף שלום  5. מצביע באצבע על כפתורי הקשר.
 * רץ פעם אחת כשמגיעים לתחתית. לחיצה עליו - מנופף שוב. בלי JS או בתנועה מופחתת: עומד ומצביע.
 *
 * יחידות: הרגליים ב-y=0, הראש למעלה (y שלילי), כמו בסטוריבורד.
 */
const DEEP = '#2F6FB5', INK = '#1E3A56', PATCH = '#C9E2F8', BLUE = '#4A90D9', WHITE = '#FFFFFF';
const WAVE_ROT = -128;   // יד ימין (של הצופה) עולה לנפנוף
const POINT_ROT = 52;    // יד שמאל עולה ומצביעה אל הכפתורים

export default function FooterRobot() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const svg = wrap?.querySelector('svg');
    if (!wrap || !svg) return;
    const q = gsap.utils.selector(wrap);
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointPose = () => {
      gsap.set(q('.rb-arm-l'), { rotation: POINT_ROT, svgOrigin: '-90 -245' });
      gsap.set(q('.rb-point'), { opacity: 1 });
      gsap.set(q('.rb-rest-l'), { opacity: 0 });
    };
    if (reduce) { pointPose(); return; }

    let io: IntersectionObserver | undefined;
    let wave: gsap.core.Timeline | null = null;
    const ctx = gsap.context(() => {
      // כמה יחידות SVG יש מהקצה הימני של הרובוט עד קצה המסך
      const unit = () => svg.getBoundingClientRect().width / 300;
      const edge = () => 150 + (window.innerWidth - svg.getBoundingClientRect().right) / unit();

      gsap.set(q('.rb-arm-l'), { rotation: 0, svgOrigin: '-90 -245' });
      gsap.set(q('.rb-arm-r'), { rotation: 0, svgOrigin: '90 -245' });
      gsap.set(q('.rb-open, .rb-point'), { opacity: 0 });
      gsap.set(q('.rb-robot'), { x: () => edge() + 200 });
      gsap.set(q('.rb-body'), { opacity: 0 });
      gsap.set(q('.rb-grips'), { x: () => edge() + 60, opacity: 0 });

      wave = gsap.timeline({ paused: true })
        .set(q('.rb-open'), { opacity: 1 }).set(q('.rb-rest-r'), { opacity: 0 })
        .to(q('.rb-arm-r'), { rotation: WAVE_ROT, duration: .35, ease: 'back.out(1.6)' })
        .to(q('.rb-arm-r'), { rotation: WAVE_ROT + 22, duration: .18, ease: 'sine.inOut', yoyo: true, repeat: 5 })
        .to(q('.rb-arm-r'), { rotation: 0, duration: .35, ease: 'power2.inOut' })
        .set(q('.rb-open'), { opacity: 0 }).set(q('.rb-rest-r'), { opacity: 1 });

      const tl = gsap.timeline({ paused: true, onComplete: idle });
      // 1. הידיים נאחזות בקצה המסך
      tl.to(q('.rb-grips'), { x: () => edge() - 6, opacity: 1, duration: .4, ease: 'power3.out' })
      // 2. מתח: הראש עולה מעבר לקצה, רק ראש וידיים
        .fromTo(q('.rb-robot'), { x: () => edge() + 200, y: 120 },
          { x: () => edge() - 30, y: 0, duration: .8, ease: 'power2.out' }, .45)
        .to(q('.rb-robot'), { y: 14, duration: .16, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 1.25)
      // 3. נכנס ועומד במקום הקבוע שלו
        .to(q('.rb-grips'), { x: () => edge() + 70, opacity: 0, duration: .3, ease: 'power2.in' }, 1.6)
        .to(q('.rb-body'), { opacity: 1, duration: .25 }, 1.65)
        .to(q('.rb-robot'), { x: 0, duration: .7, ease: 'back.out(1.4)' }, 1.65)
        .to(q('.rb-leg-l'), { rotation: -14, svgOrigin: '-40 -130', duration: .17, yoyo: true, repeat: 3 }, 1.7)
        .to(q('.rb-leg-r'), { rotation: 14, svgOrigin: '40 -130', duration: .17, yoyo: true, repeat: 3 }, 1.78)
      // 4. שלום
        .add(() => { wave?.restart(); }, 2.5)
        .to(q('.rb-mouth'), { attr: { d: 'M-46 -332 Q0 -286 46 -332' }, duration: .25 }, 2.5)
      // 5. מצביע באצבע על שלושת כפתורי הקשר, אחד אחרי השני; כל כפתור קופץ קצת כשהוא מצביע עליו
        .set(q('.rb-point'), { opacity: 1 }, 4.75)
        .set(q('.rb-rest-l'), { opacity: 0 }, 4.75)
        .to(q('.rb-eyes'), { x: -10, duration: .3 }, 4.8);
      const buttons = Array.from(document.querySelectorAll<HTMLElement>('.foot-links .lbtn')).slice(0, 3);
      buttons.forEach((btn, i) => {
        const at = 4.75 + i * .75;
        tl.to(q('.rb-arm-l'), { rotation: () => aimAt(btn), duration: .4, ease: i ? 'power2.inOut' : 'back.out(2)' }, at)
          .to(btn, { y: -6, duration: .16, yoyo: true, repeat: 1, ease: 'power2.out' }, at + .3);
      });
      if (!buttons.length) tl.to(q('.rb-arm-l'), { rotation: POINT_ROT, duration: .45, ease: 'back.out(2)' }, 4.75);

      // הזווית שבה האצבע מכוונת למרכז הכפתור (המצב הרגיל של היד: 113 מעלות, למטה ושמאלה)
      function aimAt(btn: HTMLElement) {
        const m = svg!.getScreenCTM();
        if (!m) return POINT_ROT;
        const sh = new DOMPoint(-90, -245).matrixTransform(m);
        const r = btn.getBoundingClientRect();
        const deg = (Math.atan2(r.top + r.height / 2 - sh.y, r.left + r.width / 2 - sh.x) * 180) / Math.PI;
        return deg - 112.8;
      }

      function idle() {
        gsap.to(q('.rb-upper'), { y: -5, duration: 1.5, ease: 'sine.inOut', yoyo: true, repeat: -1 });
        gsap.timeline({ repeat: -1, repeatDelay: 3.2 })
          .to(q('.rb-eye'), { scaleY: .15, transformOrigin: '50% 50%', duration: .08, yoyo: true, repeat: 1 });
      }

      io = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        tl.play();
        io?.disconnect();
      }, { threshold: .5 });
      io.observe(wrap);
    }, wrap);

    const onTap = () => wave?.restart();
    wrap.addEventListener('click', onTap);
    return () => { io?.disconnect(); wrap.removeEventListener('click', onTap); ctx.revert(); };
  }, []);

  const s = { stroke: DEEP, strokeWidth: 7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return (
    <div className="foot-robot" ref={wrapRef} aria-hidden="true">
      <svg viewBox="-150 -570 300 590" fill="none" {...s}>
        {/* ידיים שנאחזות בקצה המסך (רק בכניסה) */}
        <g className="rb-grips" opacity="0">
          {[-430, -300].map(y => (
            <g key={y}>
              <circle cx="0" cy={y} r="26" fill={WHITE} />
              {[-14, 0, 14].map(k => <path key={k} d={`M-20 ${y + k} L4 ${y + k}`} strokeWidth="5" />)}
            </g>
          ))}
        </g>

        <g className="rb-robot">
          <g className="rb-upper">
            <g className="rb-body">
              {/* רגליים */}
              <g className="rb-leg-l"><path d="M-40 -130 L-40 -16" strokeWidth="11" /><rect x="-66" y="-20" width="52" height="22" rx="8" fill={WHITE} strokeWidth="6" /></g>
              <g className="rb-leg-r"><path d="M40 -130 L40 -16" strokeWidth="11" /><rect x="14" y="-20" width="52" height="22" rx="8" fill={WHITE} strokeWidth="6" /></g>
              {/* יד שמאל (של הצופה): מנוחה, ואז מצביעה באצבע */}
              <g className="rb-arm-l">
                <path d="M-90 -245 L-130 -150" strokeWidth="11" />
                <circle className="rb-rest-l" cx="-130" cy="-150" r="20" fill={WHITE} />
                <g className="rb-point" opacity="0">
                  <path d="M-130 -150 L-142 -122" strokeWidth="13" />
                  <path d="M-130 -150 L-142 -122" stroke={WHITE} strokeWidth="5" />
                  <circle cx="-130" cy="-150" r="20" fill={WHITE} />
                  <circle cx="-124" cy="-158" r="5" strokeWidth="4" /><circle cx="-118" cy="-148" r="5" strokeWidth="4" />
                </g>
              </g>
              {/* יד ימין: מנוחה, ואז כף פתוחה עם אצבעות לנפנוף */}
              <g className="rb-arm-r">
                <path d="M90 -245 L130 -150" strokeWidth="11" />
                <circle className="rb-rest-r" cx="130" cy="-150" r="20" fill={WHITE} />
                <g className="rb-open" opacity="0">
                  {[-60, -25, 10, 45].map(k => {
                    const a = ((67 + k) * Math.PI) / 180;
                    return <g key={k}>
                      <path d={`M${130 + 16 * Math.cos(a)} ${-150 + 16 * Math.sin(a)} L${130 + 46 * Math.cos(a)} ${-150 + 46 * Math.sin(a)}`} strokeWidth="14" />
                      <path d={`M${130 + 16 * Math.cos(a)} ${-150 + 16 * Math.sin(a)} L${130 + 46 * Math.cos(a)} ${-150 + 46 * Math.sin(a)}`} stroke={WHITE} strokeWidth="6" />
                    </g>;
                  })}
                  <circle cx="130" cy="-150" r="22" fill={WHITE} />
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
