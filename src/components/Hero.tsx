import { useEffect, useState } from 'react';
import { ExternalLink, Mail, MessageCircle, Users, FileText } from 'lucide-react';
import { HERO, LINKS, TERMINAL_LINES } from '../data/content';

const ICON_MAP: Record<string, React.ReactNode> = {
  linkedin:         <ExternalLink size={15} />,
  mail:             <Mail size={15} />,
  'message-circle': <MessageCircle size={15} />,
  users:            <Users size={15} />,
  'file-text':      <FileText size={15} />,
};

function useTyping(text: string, speed = 45, startDelay = 400) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed('');
    setDone(false);
    const t = setTimeout(() => {
      let i = 0;
      const iv = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(iv); setDone(true); }
      }, speed);
      return () => clearInterval(iv);
    }, startDelay);
    return () => clearTimeout(t);
  }, [text, speed, startDelay]);
  return { displayed, done };
}

function Terminal() {
  const [lines, setLines] = useState<string[]>([]);
  const [current, setCurrent] = useState('');
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (lineIdx >= TERMINAL_LINES.length) { setFinished(true); return; }
    const line = TERMINAL_LINES[lineIdx];
    if (charIdx < line.length) {
      const t = setTimeout(() => {
        setCurrent(line.slice(0, charIdx + 1));
        setCharIdx(c => c + 1);
      }, 28);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setLines(prev => [...prev, line]);
        setCurrent('');
        setCharIdx(0);
        setLineIdx(i => i + 1);
      }, 180);
      return () => clearTimeout(t);
    }
  }, [lineIdx, charIdx]);

  return (
    <div
      className="glass-card rounded-2xl p-4 text-right mt-6"
      style={{ fontFamily: 'monospace', fontSize: '0.8rem', lineHeight: 1.7, maxWidth: 320, direction: 'ltr', textAlign: 'left' }}
    >
      {lines.map((l, i) => (
        <div key={i} style={{ color: l.includes('✓') ? '#10b981' : '#6b7280' }}>{l}</div>
      ))}
      {!finished && (
        <div style={{ color: '#6366f1' }}>
          {current}<span className="cursor-blink">▌</span>
        </div>
      )}
    </div>
  );
}

export default function Hero() {
  const { displayed, done } = useTyping(HERO.title, 42, 600);
  const [showSub, setShowSub] = useState(false);

  useEffect(() => {
    if (done) setTimeout(() => setShowSub(true), 200);
  }, [done]);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center"
      style={{ zIndex: 1 }}
    >
      {/* Profile photo */}
      <div className="relative mb-6">
        <div
          className="pulse-ring rounded-full overflow-hidden border-4 border-white"
          style={{ width: 130, height: 130 }}
        >
          <img
            src={HERO.profilePhoto}
            alt={HERO.name}
            loading="eager"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
          />
        </div>
        {/* AI badge */}
        <div
          className="absolute -bottom-2 -left-2 rounded-full px-2 py-0.5 text-white text-xs font-bold"
          style={{ background: 'linear-gradient(135deg, #6366f1, #06b6d4)', fontSize: '0.65rem' }}
        >
          AI ✦
        </div>
      </div>

      {/* Name */}
      <p className="text-gray-500 font-medium mb-1 text-sm tracking-wide">{HERO.name}</p>

      {/* Typed title */}
      <h1
        className="gradient-text font-black leading-tight mb-2"
        style={{ fontSize: 'clamp(1.6rem, 5vw, 2.8rem)', minHeight: '2.5em' }}
      >
        {displayed}
        {!done && <span className="cursor-blink" style={{ WebkitTextFillColor: '#6366f1' }}>|</span>}
      </h1>

      {/* Subtitle */}
      <div
        style={{
          opacity: showSub ? 1 : 0,
          transform: showSub ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}
      >
        <p className="text-2xl font-extrabold text-indigo-600 mb-1">{HERO.subtitle}</p>
        <p className="text-gray-500 font-medium text-base">{HERO.tagline}</p>
      </div>

      {/* Terminal */}
      <div
        style={{
          opacity: showSub ? 1 : 0,
          transition: 'opacity 0.6s ease 0.3s',
        }}
      >
        <Terminal />
      </div>

      {/* Link buttons */}
      <div
        className="flex flex-wrap justify-center gap-2 mt-7"
        style={{
          opacity: showSub ? 1 : 0,
          transition: 'opacity 0.6s ease 0.5s',
        }}
      >
        {LINKS.map(link => (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="link-btn"
          >
            {ICON_MAP[link.icon]}
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
}
