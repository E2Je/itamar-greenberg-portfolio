import { useEffect } from 'react';

const SELECTOR = '[data-fit]';
/** מתחת לגודל הזה עדיף שורה שנייה על פני כותרת זעירה */
const MIN_PX = 12;

/**
 * כל אלמנט עם data-fit נשאר בשורה אחת. הגודל מה-CSS הוא המקסימום;
 * אם הטקסט רחב מהמקום שלו, הפונט מוקטן בדיוק כדי להיכנס.
 * רץ אחרי טעינת הפונטים (רוחב Secular One שונה מפונט החלופה) ובכל שינוי רוחב.
 */
export function useFitHeadings() {
  useEffect(() => {
    const fitGroups = () => {
      // קבוצה (data-fit-group): כל הילדים באותו גודל - הגודל שבו גם הארוך ביותר נכנס בשורה אחת
      document.querySelectorAll<HTMLElement>('[data-fit-group]').forEach(group => {
        const items = [...group.children] as HTMLElement[];
        items.forEach(el => { el.style.fontSize = ''; el.style.whiteSpace = 'nowrap'; });
        const sizes = items.map(el => {
          const max = parseFloat(getComputedStyle(el).fontSize);
          return el.scrollWidth > el.clientWidth && el.clientWidth > 0
            ? Math.floor(max * (el.clientWidth / el.scrollWidth) * 0.98) : max;
        });
        const size = Math.max(MIN_PX, Math.min(...sizes));
        items.forEach(el => { el.style.fontSize = `${size}px`; });
      });
    };

    const fitAll = () => {
      fitGroups();
      document.querySelectorAll<HTMLElement>(SELECTOR).forEach(el => {
        el.style.fontSize = '';
        el.style.whiteSpace = 'nowrap';
        const available = el.clientWidth;
        const needed = el.scrollWidth;
        if (needed <= available || available === 0) return;
        const max = parseFloat(getComputedStyle(el).fontSize);
        const fitted = Math.floor(max * (available / needed) * 0.98);
        if (fitted < MIN_PX) {
          el.style.whiteSpace = 'normal';
          return;
        }
        el.style.fontSize = `${fitted}px`;
      });
    };

    let frame = 0;
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(fitAll);
    };

    fitAll();
    document.fonts?.ready.then(fitAll).catch(() => {});
    const resize = new ResizeObserver(schedule);
    resize.observe(document.documentElement);

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
    };
  }, []);
}
