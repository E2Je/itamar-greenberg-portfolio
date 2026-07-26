import { useEffect } from 'react';

const SELECTOR = '.reveal, .reveal-group, .reveal-pop';

/** אחרי הזמן הזה, אם שום אלמנט לא נחשף - מבטלים את ההסתרה לגמרי */
const FAILSAFE_MS = 1500;

/**
 * מוסיף .in לאלמנטים כשהם נכנסים למסך - אותו מנגנון כמו באתר ההצבעה.
 *
 * ההסתרה עצמה חיה ב-CSS תחת html.reveal-ready, שנוסף כאן בלבד. כך
 * שדפדפן בלי IntersectionObserver, JS שנפל, או סביבה שלא מרנדרת
 * פריימים - כולם מקבלים אתר גלוי במקום מסך ריק.
 */
export function useReveal() {
  useEffect(() => {
    const root = document.documentElement;
    if (!('IntersectionObserver' in window)) return;

    root.classList.add('reveal-ready');

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );

    const observeAll = () => {
      document.querySelectorAll(SELECTOR).forEach(el => {
        if (!el.classList.contains('in')) observer.observe(el);
      });
    };

    observeAll();

    const mutation = new MutationObserver(observeAll);
    mutation.observe(document.body, { childList: true, subtree: true });

    // רשת ביטחון: אם המנגנון לא ירה על כלום, מחזירים את הכל לגלוי
    const failsafe = window.setTimeout(() => {
      if (!document.querySelector('.in')) root.classList.remove('reveal-ready');
    }, FAILSAFE_MS);

    return () => {
      window.clearTimeout(failsafe);
      observer.disconnect();
      mutation.disconnect();
      root.classList.remove('reveal-ready');
    };
  }, []);
}
