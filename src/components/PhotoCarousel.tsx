import { useRef, useEffect, useState } from 'react';
import { PHOTOS, SECTION_TITLES } from '../data/content';

const CARD_WIDTH = 288; // px
const GAP = 16;
const SPEED = 0.5; // px per frame

export default function PhotoCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const rafRef = useRef<number>(0);
  const pausedRef = useRef(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Duplicate for seamless loop
  const photos = [...PHOTOS, ...PHOTOS];
  const totalWidth = PHOTOS.length * (CARD_WIDTH + GAP);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true);
    }, { threshold: 0.15 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    function tick() {
      if (!pausedRef.current && trackRef.current) {
        posRef.current += SPEED;
        if (posRef.current >= totalWidth) posRef.current = 0;
        trackRef.current.style.transform = `translateX(${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [totalWidth]);

  return (
    <section
      ref={sectionRef}
      className={`fade-section${visible ? ' visible' : ''} py-16 px-4 relative`}
      style={{ zIndex: 1 }}
    >
      {/* Section title */}
      <div className="text-center mb-10">
        <h2
          className="gradient-text font-black inline-block"
          style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)' }}
        >
          {SECTION_TITLES.carousel}
        </h2>
        <div
          className="mx-auto mt-2 rounded-full"
          style={{ height: 3, width: 60, background: 'linear-gradient(90deg,#6366f1,#06b6d4)' }}
        />
      </div>

      {/* Carousel wrapper — clips overflow */}
      <div
        style={{ overflow: 'hidden', width: '100%', direction: 'ltr' }}
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
        onTouchStart={() => { pausedRef.current = true; }}
        onTouchEnd={() => { pausedRef.current = false; }}
      >
        {/* Fade edges */}
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute', top: 0, right: 0, bottom: 0, width: 80,
            background: 'linear-gradient(to left, #f9fafb, transparent)',
            zIndex: 2, pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', top: 0, left: 0, bottom: 0, width: 80,
            background: 'linear-gradient(to right, #f9fafb, transparent)',
            zIndex: 2, pointerEvents: 'none',
          }} />

          <div
            ref={trackRef}
            className="carousel-track"
            style={{ willChange: 'transform' }}
          >
            {photos.map((src, i) => (
              <div
                key={i}
                className="glass-card rounded-2xl overflow-hidden flex-shrink-0"
                style={{ width: CARD_WIDTH, height: 192 }}
              >
                <img
                  src={src}
                  alt={`הרצאה ${(i % PHOTOS.length) + 1}`}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
