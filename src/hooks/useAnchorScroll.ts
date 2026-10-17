import { useEffect } from 'react';

/**
 * קישורים פנימיים (#projects וכו') גוללים בעצמם למקום, מתחת להדר הקבוע.
 * בלי זה, בתוך מסגרת (כמו דף התצוגה) הקישור מנסה לנווט לכתובת אחרת ולא קורה כלום.
 */
export function useAnchorScroll() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link) return;
      const id = link.getAttribute('href')!.slice(1);
      const target = id ? document.getElementById(id) : document.body;
      if (!target) return;
      e.preventDefault();
      const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 0;
      const top = id === 'top' || !id ? 0 : target.getBoundingClientRect().top + window.scrollY - header + 1;
      const smooth = !matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top, behavior: smooth ? 'smooth' : 'auto' });
      if (target.tabIndex < 0 && id && id !== 'top') target.setAttribute('tabindex', '-1');
      if (id && id !== 'top') target.focus({ preventScroll: true });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
}
