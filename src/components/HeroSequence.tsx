import { useEffect, useRef, useState } from 'react';

const base = import.meta.env.BASE_URL;

/** מספר הפריימים בתיקייה public/hero-seq */
const MAX_FRAMES = 63;

/** הפריים האחרון - משמש גם כתמונת נפילה אם הרצף לא נטען */
const LAST_FRAME = `${base}hero-seq/f${String(MAX_FRAMES).padStart(2, '0')}.webp`;

const frameSrc = (i: number) => `${base}hero-seq/f${String(i).padStart(2, '0')}.webp`;

/**
 * רצף הפריימים של ההירו. ההורה (Hero) מחזיק את ה-track הנעוץ ומעביר
 * לכאן את ה-ref שלו; ההתקדמות נמדדת לפי כמה נגלל מאז שההירו ננעץ,
 * בדיוק כמו ScrollWalk באתר תרגול המתמטיקה.
 *
 * אם הטעינה נכשלת או שהמשתמש ביקש תנועה מופחתת, מוצג הפריים האחרון
 * כתמונה סטטית - כך שתמיד רואים את "AI can do it" ולא ריבוע ריק.
 */
export default function HeroSequence({
  trackRef,
  scrubDistance,
}: {
  trackRef: React.RefObject<HTMLElement | null>;
  scrubDistance: number;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [ready, setReady] = useState(false);
  const [broken, setBroken] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let cancelled = false;
    let loadedCount = 0;
    const frames: HTMLImageElement[] = [];

    const loadFrom = (i: number) => {
      if (cancelled || i > MAX_FRAMES) {
        finish();
        return;
      }
      const img = new Image();
      img.onload = () => {
        if (cancelled) return;
        frames[i - 1] = img;
        loadedCount = i;
        loadFrom(i + 1);
      };
      img.onerror = finish;
      img.src = frameSrc(i);
    };

    const finish = () => {
      if (cancelled || loadedCount < 2) return;
      setReady(true);
      window.addEventListener('scroll', update, { passive: true });
      update();
    };

    // עדכון ישיר בתוך מאזין הגלילה. אין כאן requestAnimationFrame בכוונה:
    // הפריימים כבר מפוענחים בזיכרון, ההחלפה היא השמה אחת זולה, וכך הסקראב
    // לא תלוי בכך שלולאת הפריימים של הדפדפן רצה.
    let lastIdx = -1;
    function update() {
      const track = trackRef.current;
      if (!track) return;
      // 0 ברגע שההירו ננעץ לראש המסך, 1 אחרי scrubDistance פיקסלים נוספים
      const progress = -track.getBoundingClientRect().top / scrubDistance;
      const p = Math.min(1, Math.max(0, progress));
      const idx = Math.round(p * (loadedCount - 1));
      if (idx === lastIdx) return;
      const frame = frames[idx];
      if (frame && imgRef.current) {
        imgRef.current.src = frame.src;
        lastIdx = idx;
      }
    }

    loadFrom(1);

    return () => {
      cancelled = true;
      window.removeEventListener('scroll', update);
    };
  }, [trackRef, scrubDistance]);

  return (
    <div className="hero-seq">
      <style>{`
        .hero-seq { width: min(86vw, 560px); }
        .hero-seq img, .hero-seq video {
          width: 100%;
          border-radius: var(--radius-card);
          box-shadow: var(--shadow-float);
          border: 1px solid var(--line-soft);
          background: var(--card);
        }
      `}</style>

      {broken ? (
        // נפילה אחרונה: אם רצף הפריימים לא נגיש, חוזרים לווידאו המקורי
        <video
          src={`${base}hero-video.mp4`}
          autoPlay
          loop
          muted
          playsInline
          aria-label="AI can do it - איתמר גרינברג"
        />
      ) : (
        <img
          ref={imgRef}
          src={ready ? frameSrc(1) : LAST_FRAME}
          width={960}
          height={540}
          alt="AI can do it - איתמר גרינברג"
          decoding="async"
          onError={() => setBroken(true)}
        />
      )}
    </div>
  );
}
