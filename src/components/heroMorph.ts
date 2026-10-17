import gsap from 'gsap';
import { SIGNATURE_PATHS } from '../data/signature';

/**
 * הקו שמשנה צורה: אותו קו כחול מתכופף מסצנה לסצנה (בלי דהייה), 10 שניות בלולאה.
 * אק"ג -> בועת שיחה -> נורה -> מחשב -> גלגל שיניים מתגלגל -> רובוט -> לייק -> AI can do it.
 * כל צורה נדגמת ל-N נקודות, והקו עובר נקודה-נקודה מהצורה הקודמת לבאה.
 */
const NS = 'http://www.w3.org/2000/svg';
const N = 360;
type Pt = [number, number];
type Shape = { id: string; closed: boolean; d: string; pts?: Pt[] };

const gearPath = (() => {
  let d = '';
  const cx = 400, cy = 230, n = 10;
  for (let i = 0; i < n * 2; i++) {
    const a0 = Math.PI + (i / (n * 2)) * Math.PI * 2, a1 = Math.PI + ((i + 1) / (n * 2)) * Math.PI * 2, r = i % 2 ? 108 : 134;
    d += `${i ? 'L' : 'M'}${cx + r * Math.cos(a0)} ${cy + r * Math.sin(a0)} L${cx + r * Math.cos(a1)} ${cy + r * Math.sin(a1)} `;
  }
  return d + 'Z';
})();

const thumbsPath = (() => {
  const p = [[560,300],[610,300],[640,300],[660,260],[662,220],[664,170],[690,140],[712,150],[740,162],[734,220],[716,268],[800,268],
    [830,268],[832,312],[806,314],[834,318],[832,360],[806,362],[830,368],[826,404],[802,406],[822,412],[816,446],[792,446],[640,446],[610,440],[560,440]];
  return 'M' + p.map(([x, y]) => `${(x - 300) * 1.05} ${(y - 60) * 1.05}`).join(' L') + ' Z';
})();

export const ECG_D = 'M40 260 L150 260 L160 248 L170 260 L185 260 L195 280 L210 150 L225 320 L238 260 L260 260 L272 244 L284 260 L330 260 L340 248 L350 260 L365 260 L375 280 L390 150 L405 320 L418 260 L440 260 L452 244 L464 260 L760 260';
export const SIGN_D = 'M170 300 C300 286 500 314 650 292';

const SHAPES: Shape[] = [
  { id: 'ecg', closed: false, d: ECG_D },
  { id: 'chat', closed: true, d: 'M250 160 Q250 140 270 140 L530 140 Q550 140 550 160 L550 300 Q550 320 530 320 L310 320 L250 370 L270 320 Q250 320 250 300 Z' },
  { id: 'bulb', closed: true, d: 'M290 200 C290 140 340 90 400 90 C460 90 510 140 510 200 C510 245 480 280 440 300 L440 330 L360 330 L360 300 C320 280 290 245 290 200 Z' },
  { id: 'laptop', closed: true, d: 'M230 130 Q230 120 240 120 L560 120 Q570 120 570 130 L570 330 L620 370 L180 370 L230 330 Z' },
  { id: 'gear', closed: true, d: gearPath },
  { id: 'robot', closed: true, d: 'M290 160 Q290 130 320 130 L392 130 L392 86 L408 86 L408 130 L480 130 Q510 130 510 160 L510 200 L532 200 L532 252 L510 252 L510 320 Q510 350 480 350 L320 350 Q290 350 290 320 L290 252 L268 252 L268 200 L290 200 Z' },
  { id: 'like', closed: true, d: thumbsPath },
  { id: 'sign', closed: false, d: SIGN_D },
];

/** פרטים קטנים שמצטיירים אחרי שהקו התיישב בצורה */
export const ACCENTS: Record<string, string[]> = {
  chat: ['M340 228 L340 230', 'M400 228 L400 230', 'M460 228 L460 230'],
  bulb: ['M380 330 L385 250 Q392 230 400 248 Q408 230 415 250 L420 330', 'M368 352 L432 352', 'M378 372 L422 372',
         'M400 58 L400 34', 'M318 98 L302 80', 'M482 98 L498 80', 'M268 160 L246 152', 'M532 160 L554 152'],
  laptop: ['M270 170 L420 170', 'M290 210 L500 210', 'M270 250 L380 250', 'M290 290 L470 290'],
  gear: ['M400 194 A36 36 0 1 1 399.9 194'],
  robot: ['M360 220 L360 236', 'M440 220 L440 236', 'M362 285 Q400 312 438 285', 'M400 74 A12 12 0 1 1 399.9 74'],
  like: ['M540 110 L556 92', 'M572 140 L592 128', 'M500 92 L506 70'],
};

function sampleShapes(svg: SVGSVGElement) {
  const probe = document.createElementNS(NS, 'path');
  svg.appendChild(probe);
  for (const s of SHAPES) {
    probe.setAttribute('d', s.d);
    const L = probe.getTotalLength();
    s.pts = Array.from({ length: N }, (_, i) => { const p = probe.getPointAtLength((i / (N - 1)) * L); return [p.x, p.y] as Pt; });
  }
  probe.remove();
  // צורה סגורה מתחילה מהנקודה הקרובה לתחילת הקודמת, בכיוון שזז הכי פחות - כדי שהקו יתכופף ולא יסתבך
  for (let i = 1; i < SHAPES.length; i++) {
    const s = SHAPES[i], prev = SHAPES[i - 1].pts!;
    if (!s.closed) continue;
    const ring = s.pts!.slice(0, -1);
    let best: { cost: number; r: Pt[]; k: number } | null = null;
    for (const dir of [1, -1]) {
      const r = dir === 1 ? ring : [...ring].reverse();
      for (let k = 0; k < r.length; k += 3) {
        let cost = 0;
        for (let j = 0; j < N; j += 12) { const q = r[(k + j) % r.length], p = prev[j]; cost += Math.hypot(q[0] - p[0], q[1] - p[1]); }
        if (!best || cost < best.cost) best = { cost, r, k };
      }
    }
    const rot = [...best!.r.slice(best!.k), ...best!.r.slice(0, best!.k)];
    s.pts = Array.from({ length: N }, (_, j) => rot[Math.round((j * rot.length) / N) % rot.length]);
  }
}

const toD = (pts: Pt[]) => 'M' + pts.map(p => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' L');

/** בונה את האנימציה על ה-svg ומחזיר פונקציית ניקוי */
export function startHeroMorph(svg: SVGSVGElement): () => void {
  const line = svg.querySelector<SVGPathElement>('.hm-line')!;
  const patch = svg.querySelector<SVGPathElement>('.hm-patch')!;
  const accG = svg.querySelector<SVGGElement>('.hm-acc')!;
  const sigEls = Array.from(svg.querySelectorAll<SVGPathElement>('.hm-sig'));
  sampleShapes(svg);
  const S = Object.fromEntries(SHAPES.map(s => [s.id, s])) as Record<string, Shape>;

  const accEls: Record<string, SVGPathElement[]> = {};
  for (const [k, list] of Object.entries(ACCENTS)) {
    accEls[k] = list.map(d => {
      const p = document.createElementNS(NS, 'path');
      p.setAttribute('d', d);
      p.setAttribute('pathLength', '1');
      if (k === 'chat') p.setAttribute('stroke-width', '18');
      accG.appendChild(p);
      return p;
    });
  }
  const allAcc = Object.values(accEls).flat();
  // פרט שעוד לא צויר שקוף לגמרי, אחרת קצה הקו העגול נשאר כנקודה
  gsap.set([...allAcc, ...sigEls], { strokeDasharray: 1, strokeDashoffset: 1, opacity: 0 });

  let cur: Pt[] = S.ecg.pts!.map(p => [...p] as Pt);
  const render = () => { const d = toD(cur); line.setAttribute('d', d); patch.setAttribute('d', d + ' Z'); };
  render();

  const tl = gsap.timeline({ repeat: -1, repeatDelay: .2 });
  const morph = (to: Shape, at: number, dur = .65) => {
    const st = { t: 0 };
    let from: Pt[] = cur;
    tl.to(st, { t: 1, duration: dur, ease: 'power2.inOut',
      onStart() { from = cur.map(p => [...p] as Pt); st.t = 0; },
      onUpdate() { const t = st.t; cur = from.map((p, i) => [p[0] + (to.pts![i][0] - p[0]) * t, p[1] + (to.pts![i][1] - p[1]) * t] as Pt); render(); } }, at);
  };
  const draw = (els: Element[], at: number, each = .04, dur = .22) =>
    tl.set(els, { opacity: 1 }, at).to(els, { strokeDashoffset: 0, duration: dur, stagger: each, ease: 'power1.out', overwrite: 'auto' }, at);
  const undraw = (els: Element[], at: number) =>
    tl.to(els, { strokeDashoffset: 1, duration: .16, ease: 'power1.in', overwrite: 'auto' }, at).set(els, { opacity: 0 }, at + .17);

  // 1. האק"ג נכתב משמאל לימין
  tl.call(() => { cur = S.ecg.pts!.map(p => [...p] as Pt); render(); }, undefined, 0)
    .set(patch, { opacity: 0 }, 0)
    .fromTo(line, { strokeDasharray: 2000, strokeDashoffset: 2000 }, { strokeDashoffset: 0, duration: 1.1, ease: 'none' }, 0)
    .set(line, { strokeDasharray: 'none' }, 1.15);

  // 2. הקו מתכופף מסצנה לסצנה
  let t = 1.2;
  let prev: string | null = null;
  const step = (id: string, hold: number, extra?: (at: number) => void) => {
    if (prev && accEls[prev]) undraw(accEls[prev], t - .05);
    tl.to(patch, { opacity: 0, duration: .15 }, t);
    morph(S[id], t);
    if (S[id].closed) tl.to(patch, { opacity: 1, duration: .25 }, t + .55);
    if (accEls[id]) draw(accEls[id], t + .6);
    extra?.(t + .6);
    t += .65 + hold;
    prev = id;
  };
  step('chat', .5);
  step('bulb', .5);
  step('laptop', .5);
  step('gear', .7, at => {
    // גלגל השיניים מתגלגל: מסובבים את הנקודות עצמן, שתי שיניים קדימה
    const st = { a: 0 };
    tl.to(st, { a: (Math.PI * 2) / 5, duration: .8, ease: 'power2.inOut',
      onUpdate() { const c = Math.cos(st.a), s = Math.sin(st.a);
        cur = S.gear.pts!.map(([x, y]) => [400 + (x - 400) * c - (y - 230) * s, 230 + (x - 400) * s + (y - 230) * c] as Pt); render(); } }, at);
  });
  step('robot', .55);
  step('like', .5);

  // 3. היד נפרמת לקו תחתון, והחתימה נכתבת
  undraw(accEls.like, t - .05);
  tl.to(patch, { opacity: 0, duration: .15 }, t);
  morph(S.sign, t, .7);
  draw(sigEls, t + .6, .12, .24);
  t += .7 + 1.9;

  // 4. חזרה: האותיות נמחקות והקו מתיישר חזרה לאק"ג
  undraw(sigEls, t);
  morph(S.ecg, t + .15, .55);

  return () => { tl.kill(); allAcc.forEach(p => p.remove()); };
}

export { SIGNATURE_PATHS };
