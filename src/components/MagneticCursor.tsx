import { useEffect, useRef, useState } from 'react';

export default function MagneticCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');
  const [active, setActive] = useState(false);
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
      const els = document.querySelectorAll('[data-magnetic]');
      let pulled = false;
      els.forEach(el => {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const threshold = Math.max(r.width, r.height) * 0.5 + 55;
        if (Math.hypot(e.clientX - cx, e.clientY - cy) < threshold) {
          mouse.current = { x: cx + (e.clientX - cx) * 0.28, y: cy + (e.clientY - cy) * 0.28 };
          setLabel(el.getAttribute('data-magnetic') ?? '');
          setActive(true);
          pulled = true;
        }
      });
      if (!pulled) { setActive(false); setLabel(''); }
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
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  if (!ready) return null;

  return (
    <>
      {/* Lagging ring */}
      <div ref={ringRef} style={{
        position: 'fixed', pointerEvents: 'none', zIndex: 9999,
        transform: 'translate(-50%,-50%)',
        width: active ? 68 : 28, height: active ? 68 : 28,
        borderRadius: '50%',
        border: `1.5px solid rgba(99,102,241,${active ? 0.75 : 0.4})`,
        background: active ? 'rgba(99,102,241,0.09)' : 'transparent',
        backdropFilter: active ? 'blur(4px)' : 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'width 0.38s cubic-bezier(.34,1.56,.64,1), height 0.38s cubic-bezier(.34,1.56,.64,1), background 0.25s, border-color 0.25s',
        willChange: 'left, top',
      }}>
        {active && label && (
          <span style={{ color: '#6366f1', fontSize: '0.58rem', fontWeight: 800, letterSpacing: 0.8, whiteSpace: 'nowrap' }}>
            {label}
          </span>
        )}
      </div>
      {/* Instant dot */}
      <div ref={dotRef} style={{
        position: 'fixed', pointerEvents: 'none', zIndex: 9999,
        transform: 'translate(-50%,-50%)',
        width: active ? 3 : 5, height: active ? 3 : 5,
        borderRadius: '50%', background: '#6366f1',
        transition: 'width 0.2s, height 0.2s',
        willChange: 'left, top',
      }} />
    </>
  );
}
