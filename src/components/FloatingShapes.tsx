export default function FloatingShapes() {
  return (
    <div
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}
    >
      {/* Large hexagonal ring — top right */}
      <svg
        width="520" height="520"
        viewBox="0 0 520 520"
        style={{ position: 'absolute', top: '-60px', right: '-80px', opacity: 0.08, filter: 'blur(2px)' }}
      >
        <polygon
          points="260,20 480,140 480,380 260,500 40,380 40,140"
          fill="none"
          stroke="#6366f1"
          strokeWidth="3"
        />
        <polygon
          points="260,60 440,165 440,355 260,460 80,355 80,165"
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="1.5"
        />
      </svg>

      {/* Medium blurred circle — bottom left */}
      <svg
        width="440" height="440"
        viewBox="0 0 440 440"
        style={{ position: 'absolute', bottom: '-80px', left: '-60px', opacity: 0.07, filter: 'blur(4px)' }}
      >
        <circle cx="220" cy="220" r="200" fill="none" stroke="#8b5cf6" strokeWidth="40" />
        <circle cx="220" cy="220" r="140" fill="none" stroke="#06b6d4" strokeWidth="2" />
      </svg>

      {/* Dot grid — top left area */}
      <svg
        width="200" height="200"
        viewBox="0 0 200 200"
        style={{ position: 'absolute', top: '120px', left: '5%', opacity: 0.10 }}
      >
        {Array.from({ length: 7 }, (_, row) =>
          Array.from({ length: 7 }, (_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={col * 30 + 10}
              cy={row * 30 + 10}
              r="2.5"
              fill="#6366f1"
            />
          ))
        )}
      </svg>

      {/* Small floating ring — mid right */}
      <svg
        width="120" height="120"
        viewBox="0 0 120 120"
        style={{ position: 'absolute', top: '45%', right: '6%', opacity: 0.09, filter: 'blur(1px)' }}
      >
        <circle cx="60" cy="60" r="55" fill="none" stroke="#06b6d4" strokeWidth="2" />
        <circle cx="60" cy="60" r="40" fill="none" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="6 4" />
      </svg>

      {/* Cross / plus accent — mid-left */}
      <svg
        width="40" height="40"
        viewBox="0 0 40 40"
        style={{ position: 'absolute', top: '38%', left: '8%', opacity: 0.14 }}
      >
        <line x1="20" y1="2" x2="20" y2="38" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
        <line x1="2" y1="20" x2="38" y2="20" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}
