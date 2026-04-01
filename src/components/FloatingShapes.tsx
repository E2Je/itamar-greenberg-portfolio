export default function FloatingShapes({ isCreative = false }: { isCreative?: boolean }) {
  return (
    <div
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}
    >
      {/* Large hexagonal ring — top right */}
      <svg
        width="520" height="520" viewBox="0 0 520 520"
        style={{ position: 'absolute', top: '-60px', right: '-80px', opacity: isCreative ? 0.18 : 0.08, filter: 'blur(2px)', transition: 'opacity 0.6s ease' }}
      >
        <polygon points="260,20 480,140 480,380 260,500 40,380 40,140" fill="none" stroke="#6366f1" strokeWidth="3" />
        <polygon points="260,60 440,165 440,355 260,460 80,355 80,165" fill="none" stroke="#8b5cf6" strokeWidth="1.5" />
      </svg>

      {/* Medium blurred circle — bottom left */}
      <svg
        width="440" height="440" viewBox="0 0 440 440"
        style={{ position: 'absolute', bottom: '-80px', left: '-60px', opacity: isCreative ? 0.16 : 0.07, filter: 'blur(4px)', transition: 'opacity 0.6s ease' }}
      >
        <circle cx="220" cy="220" r="200" fill="none" stroke="#8b5cf6" strokeWidth="40" />
        <circle cx="220" cy="220" r="140" fill="none" stroke="#06b6d4" strokeWidth="2" />
      </svg>

      {/* Dot grid — top left */}
      <svg
        width="200" height="200" viewBox="0 0 200 200"
        style={{ position: 'absolute', top: '120px', left: '5%', opacity: isCreative ? 0.18 : 0.10, transition: 'opacity 0.6s ease' }}
      >
        {Array.from({ length: 7 }, (_, row) =>
          Array.from({ length: 7 }, (_, col) => (
            <circle key={`${row}-${col}`} cx={col * 30 + 10} cy={row * 30 + 10} r="2.5" fill="#6366f1" />
          ))
        )}
      </svg>

      {/* Small ring — mid right */}
      <svg
        width="120" height="120" viewBox="0 0 120 120"
        style={{ position: 'absolute', top: '45%', right: '6%', opacity: isCreative ? 0.18 : 0.09, filter: 'blur(1px)', transition: 'opacity 0.6s ease' }}
      >
        <circle cx="60" cy="60" r="55" fill="none" stroke="#06b6d4" strokeWidth="2" />
        <circle cx="60" cy="60" r="40" fill="none" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="6 4" />
      </svg>

      {/* Cross accent — mid-left */}
      <svg
        width="40" height="40" viewBox="0 0 40 40"
        style={{ position: 'absolute', top: '38%', left: '8%', opacity: isCreative ? 0.26 : 0.14, transition: 'opacity 0.6s ease' }}
      >
        <line x1="20" y1="2" x2="20" y2="38" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
        <line x1="2" y1="20" x2="38" y2="20" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
      </svg>

      {/* ── Creative mode extras ── */}
      {isCreative && (
        <>
          {/* Spinning morphing blob — center-left */}
          <div style={{
            position: 'absolute', top: '25%', left: '3%',
            width: 220, height: 220,
            border: '1.5px solid rgba(99,102,241,0.35)',
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
            animation: 'morphSpin 14s linear infinite',
            opacity: 0.4,
          }} />
          {/* Triangle — bottom right */}
          <svg width="180" height="160" viewBox="0 0 180 160"
            style={{ position: 'absolute', bottom: '15%', right: '4%', opacity: 0.2, animation: 'floatY 8s ease-in-out infinite alternate' }}>
            <polygon points="90,10 170,150 10,150" fill="none" stroke="#8b5cf6" strokeWidth="1.5" />
            <polygon points="90,35 148,140 32,140" fill="none" stroke="#06b6d4" strokeWidth="1" strokeDasharray="5 4" />
          </svg>
          {/* Extra dot grid — bottom center */}
          <svg width="180" height="180" viewBox="0 0 180 180"
            style={{ position: 'absolute', bottom: '8%', left: '35%', opacity: 0.14, animation: 'floatY 11s ease-in-out infinite alternate-reverse' }}>
            {Array.from({ length: 5 }, (_, r) =>
              Array.from({ length: 5 }, (_, c) => (
                <circle key={`e-${r}-${c}`} cx={c * 36 + 10} cy={r * 36 + 10} r="2" fill="#6366f1" />
              ))
            )}
          </svg>
          {/* Glowing orb — top center */}
          <div style={{
            position: 'absolute', top: '5%', left: '45%',
            width: 300, height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(139,92,246,0.18) 0%, transparent 70%)',
            filter: 'blur(20px)',
            animation: 'floatY 10s ease-in-out infinite alternate',
          }} />
        </>
      )}

      <style>{`
        @keyframes morphSpin {
          0%   { transform: rotate(0deg)   scale(1);    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
          33%  { transform: rotate(120deg) scale(1.08); border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%; }
          66%  { transform: rotate(240deg) scale(0.94); border-radius: 50% 50% 30% 70% / 30% 70% 70% 30%; }
          100% { transform: rotate(360deg) scale(1);    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
        }
        @keyframes floatY {
          0%   { transform: translateY(0px); }
          100% { transform: translateY(-22px); }
        }
      `}</style>
    </div>
  );
}
