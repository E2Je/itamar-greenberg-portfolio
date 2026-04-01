import { useEffect, useRef, useState } from 'react';

export default function MagneticCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const mouse = useRef({ x: -300, y: -300 });
  const smooth = useRef({ x: -300, y: -300 });
  const raf = useRef<number>(0);

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return undefined;

    const style = document.createElement('style');
    style.id = 'cursor-none';
    style.textContent = '*, *:hover, a, button { cursor: none !important; }';
    document.head.appendChild(style);
    setReady(true);

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const tick = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.11;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.11;
      if (ringRef.current) {
        ringRef.current.style.left = smooth.current.x + 'px';
        ringRef.current.style.top = smooth.current.y + 'px';
      }
      if (dotRef.current) {
        dotRef.current.style.left = mouse.current.x + 'px';
        dotRef.current.style.top = mouse.current.y + 'px';
      }
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf.current = requestAnimationFrame(tick);

    return () => {
      document.getElementById('cursor-none')?.remove();
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  if (!ready) return null;

  return (
    <>
      {/* Lagging ring */}
      <div ref={ringRef} style={{
        position: 'fixed', pointerEvents: 'none', zIndex: 9999,
        transform: 'translate(-50%,-50%)',
        width: 28, height: 28, borderRadius: '50%',
        border: '1.5px solid rgba(99,102,241,0.4)',
        willChange: 'left, top',
      }} />
      {/* Instant dot */}
      <div ref={dotRef} style={{
        position: 'fixed', pointerEvents: 'none', zIndex: 9999,
        transform: 'translate(-50%,-50%)',
        width: 5, height: 5, borderRadius: '50%',
        background: '#6366f1',
        willChange: 'left, top',
      }} />
    </>
  );
}
